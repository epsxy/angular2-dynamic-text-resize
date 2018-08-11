import { $, browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getInputText() {
    return element(by.className('text-input')).getAttribute('value');
  }

  setInputText(text: string) {
    return $('.text-input').sendKeys(text);
  }

  getOutputText() {
    return element(by.className('output-text-container')).getText();
  }

  getOutputContainerClientWidth() {
    return $('.output-container').getAttribute('clientWidth');
  }

  getOutputContainerClientHeight() {
    return $('.output-container').getAttribute('clientHeight');
  }

  getOutputTextClientWidth() {
    return $('.output-text-container').getAttribute('clientWidth');
  }

  getOutputTextClientHeight() {
    return $('.output-text-container').getAttribute('clientHeight');
  }

  clickResetButton() {
    return $('button.reset').click();
  }

  checkThatTextFits() {
    protractor.promise.all([
      this.getOutputContainerClientWidth(),
      this.getOutputContainerClientHeight(),
      this.getOutputTextClientWidth(),
      this.getOutputTextClientHeight(),
    ]).then((res) => {
      const containerWidth = parseInt(res[0], 10);
      const containerHeight = parseInt(res[1], 0);
      const textWidth = parseInt(res[2], 0);
      const textHeight = parseInt(res[3], 0);

      expect(containerHeight).toEqual(50);
      expect(containerWidth).toBeGreaterThan(textWidth);
      expect(containerHeight).toBeGreaterThan(textHeight);
    });
  }
}
