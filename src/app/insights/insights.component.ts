import { Component, Input, OnChanges } from '@angular/core';
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

  public suggestions: Array<InsightsSuggestion>;

  constructor() { }

  /**
   * Detect whether a data-bound property changes.
   *
   * @param changes
   */
  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('data') && changes.data.currentValue ) {
      //this.data = new Insights(this.data);
      this.load();
    }
  }

  /**
   * Load the insights data.
   */
  load() {
    this.displayResourceChart();
    this.getSuggestions();
  }

  /**
   * Get the page speed score.
   *
   * @returns {number}
   */
  get pageSpeed(): number {
    return this.data.ruleGroups.SPEED.score;
  }

  /**
   * Get the optimization suggestions.
   */
  getSuggestions(): void {
    const results = [];
    const ruleResults = this.data.formattedResults.ruleResults;

    for (const i in ruleResults) {
      if (!ruleResults.hasOwnProperty(i)) {
        continue;
      }

      const result = ruleResults[i];

      if (result.ruleImpact < 2) {
        continue; // ignore low-impact rules
      }

      console.log(result);

      // replace summary arguments with values
      let summary = result.summary.format;
      const args = result.summary.args;

      for (const arg in args) {
        if (!args.hasOwnProperty(arg)) {
          continue;
        }

        summary = summary.replace('{{' + args[arg].key + '}}', args[arg].value);
      }

      results.push({
        name: result.localizedRuleName,
        impact: result.ruleImpact,
        summary: summary
      });
    }

    results.sort((a, b) => {
      return b.impact - a.impact; // sort by impact
    });

    this.suggestions = results;
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

    console.log(this.data);

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

    new Chart('resource-chart', {
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
