import { Component, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Insights } from './insights.model';
import { InsightsSuggestion } from './insights-suggestion.interface';
import { Chart  } from 'chart.js';
import { RESOURCE_TYPES, RESULT_MESSAGES } from '../app-constants';

@Component({
  selector: 'es-insights',
  templateUrl: './insights.component.html',
})
export class InsightsComponent implements OnChanges {

  @Input() data;

  @ViewChild('resourceChart') resourceChartElement: ElementRef;

  public insights: Insights;
  public score: number;
  public screenshot: string;
  public suggestions: Array<InsightsSuggestion>;

  private resourceChart: Chart;

  constructor() {
    Chart.defaults.global.defaultFontFamily = '"Roboto", sans-serif';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = '#fff';
    Chart.defaults.global.legend.position = 'left';
    Chart.defaults.global.legend.labels.padding = 15;
    Chart.defaults.global.legend.labels.usePointStyle = true;
  }

  /**
   * Detect whether a data-bound property changes.
   *
   * @param changes
   */
  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('data') && changes.data.currentValue) {
      this.getData();
      this.displayResourceChart();
    }
  }

  /**
   * Retrieve the insights data.
   */
  private getData() {
    this.insights = new Insights(this.data);
    this.score = this.insights.getPageSpeedScore();
    this.screenshot = this.insights.getScreenshotSource();
    this.suggestions = this.insights.getSuggestions();
  }

  /**
   * Display the resource chart.
   */
  private displayResourceChart(): void {
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

    if (this.resourceChart) {
      this.resourceChart.destroy(); // remove previous instance
    }

    this.resourceChart = new Chart(this.resourceChartElement.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [dataset]
      },
      options: {
        title: {
          display: true,
          text: `${totalBytes} bytes loaded over ${stats.numberResources} resources`,
          fontSize: 16,
          fontStyle: 300
        }
      }
    });
  }

  /**
   * Displays a message based on the score.
   *
   * @returns {string}
   */
  get resultMessage() {
    for (let i = 0, msg; msg = RESULT_MESSAGES[i]; ++i) {
      if (this.score >= msg.threshold) {
        return msg.text;
      }
    }
  }

}
