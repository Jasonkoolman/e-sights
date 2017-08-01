import { Component, Input, OnChanges } from '@angular/core';
import { Insights } from './insights.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'es-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnChanges {

  @Input() data: Object|Insights;

  constructor() { }

  /**
   * Detect whether a data-bound property changes.
   *
   * @param changes
   */
  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('data') && changes.data.currentValue ) {
      this.data = new Insights(this.data);
      this.load();
    }
  }

  /**
   * Load the insights data.
   */
  load() {

  }

}
