import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[aqgrlibTreeTableColumnHeader]' })
export class TreeTableColumnHeaderDirective {
  constructor(public template: TemplateRef<any>) {}
}
