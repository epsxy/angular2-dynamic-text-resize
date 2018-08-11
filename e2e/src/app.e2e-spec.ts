import { $, browser, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

import { AppPage } from './app.po';

describe('Tests for Angular2 Playground App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(() => {
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

    page.setInputText('This is the text').then(() => {
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

    page.setInputText('This is the text').then(() => {
      expect(page.getOutputText()).toEqual('This is the text');
      page.navigateTo().then(() => {
        expect(page.getInputText()).toEqual('This is the text');
        expect(page.getOutputText()).toEqual('This is the text');
      });
    });
  });

  it('should be able to set a very long text that fits', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');
    page.setInputText('This is the long long long long long text').then(() => {
      expect(page.getInputText()).toEqual('This is the long long long long long text');
      expect(page.getOutputText()).toEqual('This is the long long long long long text');
      page.checkThatTextFits();
    });
  });

  it('should refresh font size after page resize', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    page.setInputText('This is the text').then(() => {
      expect(page.getOutputText()).toEqual('This is the text');
      page.checkThatTextFits();
      browser.driver.manage().window().setSize(50, 500).then(() => {
        expect(page.getInputText()).toEqual('This is the text');
        expect(page.getOutputText()).toEqual('This is the text');
        page.checkThatTextFits();
      });
    });
  });
});
