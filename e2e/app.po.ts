import { browser, by, element } from 'protractor';

export class ESightsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('es-root h1')).getText();
  }
}
