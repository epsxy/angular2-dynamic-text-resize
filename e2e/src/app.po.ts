import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getInputText() {
    return element(by.className('text-input')).getText();
  }

  getOutputText() {
    return element(by.className('output-text-container')).getText();
  }
}
