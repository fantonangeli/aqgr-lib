import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[aqgrlibTreeTableColumnSummary]'
})
export class TreeTableColumnSummaryDirective {
  constructor(public template: TemplateRef<any>) {}
}

