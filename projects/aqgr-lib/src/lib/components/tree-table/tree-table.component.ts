import { Component, OnChanges, Input, ContentChild, ContentChildren, TemplateRef, ElementRef, QueryList, ViewContainerRef, ViewChild } from '@angular/core';
import { TreeTableColumnDirective } from './tree-table-column.directive';
import { TreeTableColumnCellDirective } from './tree-table-column-cell.directive';


@Component({
  selector: 'aqgrlib-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnChanges {

    @Input() data: any[] = [];
    @Input() childColumns: any[] = [];

    @ContentChild('firstFieldAppendTpl', {static: false}) firstFieldAppendTpl: TemplateRef<ElementRef>;
    @ContentChildren(TreeTableColumnDirective) columnDefinitions: QueryList<TreeTableColumnDirective>;


    /**
     * enable the total row
     *
     */
    @Input() enableTotal: boolean=false;

    totalRowData:any[]=[];

    constructor() { }


    /**
     * get the total row data
     *
     * @param {any[]} data the table data
     * @returns {any[]} the row, empty array if error
     */
    getTotalRow(data:any[]):any[]{
        let totalRow=[];

        if(!data || !data.length) return [];

        totalRow=data.reduce(
            (r, a) => 
            r.map(
                (b, i) => 
                (!i)?
                    null:
                    parseFloat(a[i].toString().replace(/,/g,"")) + parseFloat(b)
            )
        ).map(
            (e, i) =>
            (!i)?
                null:
                Number(e).toLocaleString('en-US'),
        );

        totalRow[0]="TOTAL";


        return totalRow;
    }

    /**
     * get the toggle icon for the template 
     *
     * @param {[]} element=[] the element
     * @returns {string} the icon
     */
    getToggleIcon(element:any=[]):string{

        if(!element.children || !element.children.length) return "";

        if(!element.toggle) return "+";

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
            elements[i].toggle=false;
            this.closeAll(elements[i].children);
        }
    }

    /**
     * open an element and all the parents recursively
     *
     * @param {[]} element the element to open
     */
    openElement(element){
        if(!element) return;

        element.toggle=true;
        this.openElement(element.parent);
    }

    /**
     * on click action
     *
     * @param {Object} element the element to expand
     */
    onElementClick(element){
        let initialV=element.toggle;
        if(!element || !element.children) return;

        this.closeAll(this.data);

        this.openElement(element);

        if (initialV) {
            element.toggle=false;
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
     * intialize the data
     *
     * @param {[array]} data the data
     * @returns {[array]} the data initialized
     */
    initData(data=[]){
        return data.map(e=>{
            e.children=e.children.map(c=>{
                c.parent=e;
                return c;
            });
            return e;
        });

    }

    ngOnChanges() {
        this.data=this.initData(this.data);

        if(this.enableTotal) this.totalRowData=this.getTotalRow(this.data);
    }


}
