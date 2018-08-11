import { AppPage } from './app.po';
import { element, by, $, ElementFinder, browser } from 'protractor';

describe('workspace-project App', () => {
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

    expect(page.getParagraphText()).toEqual('Angular 2 – Stretched Text Box');
  });
  it('should be able to set text', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    expect($('.text-input')).not.toBeNull();

    const inputElement: ElementFinder = $('.text-input');
    const outputElement: ElementFinder = $('.output-text-container');
    inputElement.sendKeys('This is the text').then(function() {
      expect(inputElement.getAttribute('value')).toEqual('This is the text');
      expect(outputElement.getText()).toEqual('This is the text');
    });
  });
  it('should be able to set a very long long text that fits', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    expect($('.text-input')).not.toBeNull();

    const inputElement: ElementFinder = $('.text-input');
    const outputElementContainer: ElementFinder = $('.output-container');
    const outputTextElement: ElementFinder = $('.output-text-container');
    const veryLongText = 'This is the very very very very very very very text that does not fit';
    inputElement.sendKeys(veryLongText).then(function() {
      expect(outputTextElement.getText()).toEqual(veryLongText);
      // FIXME: Add test on width/height
    });
  });
  it('should be able to reset the page', () => {
    page.navigateTo();
    expect(page.getInputText()).toEqual('');
    expect(page.getOutputText()).toEqual('');

    expect($('.text-input')).not.toBeNull();

    const inputElement: ElementFinder = $('.text-input');
    const outputTextElement: ElementFinder = $('.output-text-container');
    inputElement.sendKeys('This is the text').then(function() {
      expect(outputTextElement.getText()).toEqual('This is the text');
      $('button.reset').click().then(function() {
        expect(inputElement.getText()).toEqual('');
        expect(outputTextElement.getText()).toEqual('');
      });
    });
  });
  // it('should save input info in localstorage and persist after page refresh', () => {
  //   page.navigateTo();
  //   expect(page.getInputText()).toEqual('');
  //   expect(page.getOutputText()).toEqual('');

  //   expect($('.text-input')).not.toBeNull();

  //   const inputElement: ElementFinder = $('.text-input');
  //   const outputElementContainer: ElementFinder = $('.output-container');
  //   const outputTextElement: ElementFinder = $('.output-text-container');
  //   inputElement.sendKeys('This is the text').then(function() {
  //     expect(outputTextElement.getText()).toEqual('This is the text');
  //     page.navigateTo().then(function() {
  //       expect($('.text-input').getText()).toEqual('This is the text');
  //       expect($('.output-text-container').getText()).toEqual('This is the text');
  //     });
  //   });
  // });
});
