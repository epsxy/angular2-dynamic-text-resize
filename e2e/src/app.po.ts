import { $, browser, by, element, promise } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText(): promise.Promise<string> {
    return element(by.css('app-root h1')).getText();
  }

  getInputText(): promise.Promise<string> {
    return element(by.className('text-input')).getAttribute('value');
  }

  setInputText(text: string): promise.Promise<void> {
    return $('.text-input').sendKeys(text);
  }

  getOutputText(): promise.Promise<string> {
    return element(by.className('output-text-container')).getText();
  }

  getOutputContainerClientWidth(): promise.Promise<string> {
    return $('.output-container').getAttribute('clientWidth');
  }

  getOutputContainerClientHeight(): promise.Promise<string> {
    return $('.output-container').getAttribute('clientHeight');
  }

  getOutputTextClientWidth(): promise.Promise<string> {
    return $('.output-text-container').getAttribute('clientWidth');
  }

  getOutputTextClientHeight(): promise.Promise<string> {
    return $('.output-text-container').getAttribute('clientHeight');
  }

  clickResetButton(): promise.Promise<void> {
    return $('button.reset').click();
  }

  checkThatTextFits(): void {
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
