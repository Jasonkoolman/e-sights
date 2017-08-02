import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Insights } from './insights.model';
import { InsightsSuggestion } from './insights-suggestion.interface';
import { Chart } from 'chart.js';

Chart.defaults.global.defaultFontColor = '#fff';
Chart.defaults.global.defaultFontFamily = '"Roboto", sans-serif';
Chart.defaults.global.defaultFontSize = 13;
Chart.defaults.global.legend.position = 'top';
Chart.defaults.global.legend.labels.padding = 15;
Chart.defaults.global.legend.labels.usePointStyle = true;

const RESOURCE_TYPES = [
  {label: 'JavaScript', field: 'javascriptResponseBytes', color: 'rgba(255, 206, 86, 0.4)'},
  {label: 'Images', field: 'imageResponseBytes', color: 'rgba(89, 178, 0, 0.4)'},
  {label: 'CSS', field: 'cssResponseBytes', color: 'rgba(0, 133, 178, 0.4)'},
  {label: 'HTML', field: 'htmlResponseBytes', color: 'rgba(255, 99, 132, 0.4)'},
  {label: 'Flash', field: 'flashResponseBytes', color: 'rgba(231, 77, 49, 0.4)'},
  {label: 'Text', field: 'textResponseBytes', color: 'rgba(28, 96, 177, 0.4)'},
  {label: 'Other', field: 'otherResponseBytes', color: 'rgba(255, 255, 255, 0.4)'},
];

@Component({
  selector: 'es-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnChanges {

  @Input() data;
  @ViewChild('resourceChart') resourceChart: ElementRef;

  public insights: Insights;
  public suggestions: Array<InsightsSuggestion>;

  constructor() { }

  /**
   * Detect whether a data-bound property changes.
   *
   * @param changes
   */
  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('data') && changes.data.currentValue ) {
      this.load();
    }
  }

  /**
   * Load the insights data.
   */
  load() {
    this.insights = new Insights(this.data);
    this.suggestions = this.insights.getSuggestions();
    this.displayResourceChart();
  }

  /**
   * Display the resource chart.
   */
  public displayResourceChart(): void {
    const stats = this.data.pageStats;
    const labels = [];
    const dataset = {
      data: [],
      backgroundColor: [],
    };

    let totalBytes = 0;
    for (let i = 0, type; type = RESOURCE_TYPES[i]; ++i) {
      if (type.field in stats) {
        const bytes = +stats[type.field];
        totalBytes += bytes;
        labels.push(type.label);
        dataset.data.push(bytes);
        dataset.backgroundColor.push(type.color);
      }
    }

    new Chart(this.resourceChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [dataset]
      },
      options: {
        title: {
          text: `${totalBytes} bytes loaded over ${stats.numberResources} resources`,
          display: true
        }
      }
    });
  }

}
