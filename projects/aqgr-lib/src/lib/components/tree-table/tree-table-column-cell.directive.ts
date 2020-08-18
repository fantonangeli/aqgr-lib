import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[aqgrlibTreeTableColumnCell]' })
export class TreeTableColumnCellDirective {
  constructor(public template: TemplateRef<any>) {}
}

