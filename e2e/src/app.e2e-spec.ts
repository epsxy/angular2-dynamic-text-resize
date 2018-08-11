import { $, browser, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

import { AppPage } from './app.po';

describe('Tests for Angular2 Playground App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('should display page title', () => {
    page.navigateTo();

    expect(page.getParagraphText()).toEqual('Angular 2 – Dynamic Text Resize');
  });

  it('should be able to set text', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    page.setInputText('This is the text').then(() => {
      expect(page.getOutputContainerClientHeight()).toEqual('50');
      expect(page.getInputText()).toEqual('This is the text');
      expect(page.getOutputText()).toEqual('This is the text');
    });
  });

  it('should be able to reset the page', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    page.setInputText('This is the text').then(function() {
      expect(page.getInputText()).toEqual('This is the text');
      expect(page.getOutputText()).toEqual('This is the text');
      page.clickResetButton().then(() => {
        expect(page.getInputText()).toEqual('');
        expect(page.getOutputText()).toEqual('');
      });
    });
  });

  it('should save input info in localstorage and persist after page refresh', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    page.setInputText('This is the text').then(function() {
      expect(page.getOutputText()).toEqual('This is the text');
      page.navigateTo().then(function() {
        expect(page.getInputText()).toEqual('This is the text');
        expect(page.getOutputText()).toEqual('This is the text');
      });
    });
  });

  it('should be able to set a very long long text that fits', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    const veryLongText = 'This is the very very very very very very very text that does not fit';
    page.setInputText(veryLongText).then(function() {
      expect(page.getOutputText()).toEqual(veryLongText);

      page.checkThatTextFits();
    });
  });

  it('should refresh font size after page resize', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    page.setInputText('This is the text quite long but not too much').then(function() {
      page.checkThatTextFits();
      browser.driver.manage().window().setSize(300, 500).then(() => {
        page.checkThatTextFits();
      });
    });
  });
});
