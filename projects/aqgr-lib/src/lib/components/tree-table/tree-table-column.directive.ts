import { Directive, TemplateRef, ContentChild, Input, OnChanges, SimpleChanges, QueryList, ContentChildren } from '@angular/core';
import { TreeTableColumnHeaderDirective } from './tree-table-column-header.directive';
import { TreeTableColumnCellDirective } from './tree-table-column-cell.directive';
import { TreeTableColumnSummaryDirective } from './tree-table-column-summary.directive';

@Directive({ selector: 'aqgrlib-tree-table-column' })
export class TreeTableColumnDirective {

  @Input() prop: string;
  @Input() cellClass='';
  @Input() summaryClass='';
  @Input() headerClass='';
  @ContentChild(TemplateRef, { read: TemplateRef, static: true }) public columnTemplate: TemplateRef<any>;
  @ContentChild(TreeTableColumnCellDirective, { read: TemplateRef, static: true }) cellTemplate: TemplateRef<any>;
  @ContentChild(TreeTableColumnSummaryDirective, { read: TemplateRef, static: true }) summaryTemplate: TemplateRef<any>;
  @ContentChild(TreeTableColumnHeaderDirective, { read: TemplateRef, static: true }) headerTemplate: TemplateRef<any>;



}
