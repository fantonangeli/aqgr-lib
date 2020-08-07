import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AqgrLibComponent } from './aqgr-lib.component';
import { TreeTableComponent } from './components/tree-table/tree-table.component';



@NgModule({
  declarations: [
      AqgrLibComponent,
      TreeTableComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
      TreeTableComponent
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
