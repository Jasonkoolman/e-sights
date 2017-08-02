import { InsightsSuggestion } from './insights-suggestion.interface';

export class Insights {

  public data: any;

  constructor(data: any) {
    this.data = data;
  }

  /**
   * Get the page speed score (0-100).
   *
   * @returns {number}
   */
  getPageSpeedScore() {
    return Number(this.data.ruleGroups.SPEED.score);
  }

  /**
   * Get the optimization suggestions.
   *
   * @return {Array<InsightsSuggestion>}
   */
  getSuggestions(): Array<InsightsSuggestion> {
    const suggestions = [];
    const ruleResults = this.data.formattedResults.ruleResults;

    for (const i in ruleResults) {
      if (!ruleResults.hasOwnProperty(i)) {
        continue;
      }

      const result = ruleResults[i];

      if (result.ruleImpact < 2) {
        continue; // ignore low-impact rules
      }

      let summary = '';
      if (result.hasOwnProperty('summary')) {
        let args = result.summary.args;
        summary = result.summary.format;

        for (const arg in args) {
          if (args.hasOwnProperty(arg)) {
            summary = summary.replace('{{' + args[arg].key + '}}', args[arg].value); // replace summary placeholders by values
          }
        }
      }

      suggestions.push({
        name: result.localizedRuleName,
        impact: result.ruleImpact,
        summary: summary
      });
    }

    suggestions.sort((a, b) => {
      return b.impact - a.impact; // sort by impact
    });

    return suggestions;
  }

  /**
   * Fixes base64 string by replacing '_' with '/' and '-' with '+'.
   *
   * @see https://groups.google.com/forum/#!topic/google-api-python-client/DjbJ0BwjbPo
   *
   * @returns {string}
   */
  getScreenshotSource() {
    let base64 = this.data.screenshot.data.replace(/_/g, '/');
        base64 = base64.replace(/-/g, '+');

    return 'data:image/jpeg;base64,' + base64;
  }

}
