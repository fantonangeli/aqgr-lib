import { Component, OnChanges, Input, ContentChild, ContentChildren, TemplateRef, ElementRef, QueryList, ViewContainerRef, ViewChild } from '@angular/core';
import { TreeTableColumnDirective } from './tree-table-column.directive';
// import { TreeTableColumnCellDirective } from './tree-table-column-cell.directive';


@Component({
  selector: 'aqgrlib-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnChanges {

    @Input() data: any[] = [];

    @ContentChild('firstFieldAppendTpl', {static: false}) firstFieldAppendTpl: TemplateRef<ElementRef>;
    @ContentChildren(TreeTableColumnDirective) columnDefinitions: QueryList<TreeTableColumnDirective>;


    /**
     * enable the count of subnodes for each node. Default false
     * A property count will be available in the cell template
     *
     */
    @Input() enableCount = false;

    /**
     * enable the summary row. Default false
     *
     */
    @Input() summaryRow = false;


    constructor() { }


    /**
     * get the toggle icon for the template 
     *
     * @param {[]} element=[] the element
     * @returns {string} the icon
     */
    getToggleIcon(element:any=[]):string{

        if(!element._children || !element._children.length) return "";

        if(!element._toggle) return "+";

        return "-";
    }

    /**
     * close all elements in data recursively
     *
     * @param {[]} elements the elements
     *
     */
    closeAll(elements){
        if(!elements) return;

        for (var i = 0, len = elements.length; i < len; i++) {
            elements[i]._toggle=false;
            this.closeAll(elements[i]._children);
        }
    }

    /**
     * open an element and all the parents recursively
     *
     * @param {[]} element the element to open
     */
    openElement(element){
        if(!element) return;

        element._toggle=true;
        this.openElement(element._parent);
    }

    /**
     * on click action
     *
     * @param {Object} element the element to expand
     */
    onElementClick(element){
        let initialV=element._toggle;
        if(!element || !element._children) return;

        this.closeAll(this.data);

        this.openElement(element);

        if (initialV) {
            element._toggle=false;
        }
    }

  public get columnTemplates(): { [key: string]: TemplateRef<any> } {
      const columnTemplates: { [key: string]: TemplateRef<any> } = {};

      if (!this.columnDefinitions) {
          return {};
      }

      for (const columnDefinition of this.columnDefinitions.toArray()) {
          columnTemplates[columnDefinition.prop] = columnDefinition.columnTemplate;
      }
      return columnTemplates;
  }


    /**
     * add a count of nodes and subnodes to a node
     *
     * @param data the table data
     * @returns the number of subnodes
     */
    private addCountToNode(data:any):number{
        if(!data) return 0;

        if(!data._children) return 1;

        data._count=0;

        for (let i = data._children.length - 1; i >= 0; i--) {
            data._count+=this.addCountToNode(data._children[i]);
        }

        return data._count;
    }


    /**
     * add a count of subnodes to the table data
     *
     * @param {} data
     * @returns {void}
     */
    public addCount(data=[]): void {
        for (let i = 0, len = data.length; i < len; i++) {
            this.addCountToNode(data[i]);
        }
    }


    /**
     * intialize the data
     *
     * @param {[array]} data the data
     * @returns {[array]} the data initialized
     */
    initData(data=[]){
        return data.map(e=>{
            e._children=(e._children || []).map(c=>{
                c._parent=e;
                return c;
            });
            return e;
        });

    }

    ngOnChanges() {
        this.data=this.initData(this.data);
        if(this.enableCount) {
            this.addCount(this.data);
        }
    }


}
