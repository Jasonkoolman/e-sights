import { Component, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js';

@Component({
  selector: 'es-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnChanges {
  @Input() data;

  constructor() { }

  ngOnChanges(changes: any) {

    if (changes.hasOwnProperty('data') && changes.data.currentValue ) {
      console.log('GOT DATA') ;

    }
  }

}
