import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AqgrLibComponent } from './aqgr-lib.component';
import { TreeTableComponent } from './components/tree-table/tree-table.component';
import { TreeTableColumnDirective } from './components/tree-table/tree-table-column.directive';
import { TreeTableColumnCellDirective } from './components/tree-table/tree-table-column-cell.directive';
import { TreeTableColumnHeaderDirective } from './components/tree-table/tree-table-column-header.directive';



@NgModule({
  declarations: [
      AqgrLibComponent,
      TreeTableComponent,
      TreeTableColumnDirective,
      TreeTableColumnCellDirective,
      TreeTableColumnHeaderDirective
  ],
  imports: [
      CommonModule
  ],
  exports: [
      TreeTableComponent,
      TreeTableColumnDirective,
      TreeTableColumnCellDirective,
      TreeTableColumnHeaderDirective
  ]
})
export class AqgrLibModule {
  static forRoot(pageService): ModuleWithProviders {
    return {
      ngModule: AqgrLibModule,
      providers: [
        {provide: 'LoggingEnabled', useValue: true}
      ]
    };
  }
}
