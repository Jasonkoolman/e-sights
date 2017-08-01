import { Component, Input, OnChanges } from '@angular/core';
import { InsightsData } from './insights-data.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'es-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnChanges {
  @Input() data: Object|InsightsData;

  constructor() { }

  /**
   * Detect whether a data-bound property changes.
   *
   * @param changes
   */
  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('data') && changes.data.currentValue ) {
      console.log('Data retrieved: ', this.data);
      this.data = new InsightsData(this.data);
      this.load();
    }
  }

  /**
   * Load the insights data.
   */
  load() {
    console.log('Insights data: ', this.data);
  }

}
