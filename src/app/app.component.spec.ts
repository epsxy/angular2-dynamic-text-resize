import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Ng5SliderModule } from 'ng5-slider';

import { INPUT_VALUE_ATTR, SLIDER_VALUE_ATTR } from '../model/const';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BrowserModule, Ng5SliderModule]
    }).compileComponents();

    const store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

  it('should return output-container width according to sliderValue', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    fixture.componentInstance.sliderValue = 67;

    expect(fixture.componentInstance.getOutputWidth()).toEqual('67%');
  }));

  it('should reset values', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    fixture.componentInstance.inputValue = 'This is the text';
    fixture.componentInstance.sliderValue = 67;
    localStorage.setItem(INPUT_VALUE_ATTR, 'This is the text');
    localStorage.setItem(SLIDER_VALUE_ATTR, '67');

    fixture.componentInstance.reset();

    expect(fixture.componentInstance.inputValue).toEqual('');
    expect(fixture.componentInstance.sliderValue).toEqual(100);
    expect(localStorage.getItem(INPUT_VALUE_ATTR)).toEqual('');
    expect(localStorage.getItem(SLIDER_VALUE_ATTR)).toEqual('100');
  }));

  it('should load values from local storage', async(() => {
    localStorage.setItem(INPUT_VALUE_ATTR, 'This is the text');
    localStorage.setItem(SLIDER_VALUE_ATTR, '67');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    fixture.componentInstance.ngOnInit();

    expect(fixture.componentInstance.inputValue).toEqual('This is the text');
    expect(fixture.componentInstance.sliderValue).toEqual(67);
  }));

  it('should render components', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    const titleElement: Element = compiled.querySelector('h1');
    const inputContainer: Element = compiled.querySelector('.input-container');
    const sliderContainer: Element = compiled.querySelector(
      '.slider-container'
    );
    const outputContainer: Element = compiled.querySelector(
      '.output-container'
    );
    const actionsContainer: Element = compiled.querySelector(
      '.actions-container'
    );

    expect(titleElement.textContent).toContain(
      'Angular 2 – Dynamic Text Resize'
    );
    expect(inputContainer.childElementCount).toEqual(1);
    expect(inputContainer.childElementCount).toEqual(1);
    expect(sliderContainer.childElementCount).toEqual(1);
    expect(outputContainer.childElementCount).toEqual(1);
    expect(actionsContainer.childElementCount).toEqual(1);
  }));

  it('should change input value when event is triggered', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    fixture.componentInstance.inputValue = 'My old value';

    const inputChangeEvent = {
      target: {
        value: 'My new value'
      }
    };
    fixture.componentInstance.onInputChange(inputChangeEvent);

    expect(fixture.componentInstance.inputValue).toEqual('My new value');
    expect(localStorage.getItem(INPUT_VALUE_ATTR)).toEqual('My new value');
  }));

  it('should store slider current value in local storage when updated', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    fixture.componentInstance.sliderValue = 10;
    localStorage.setItem(SLIDER_VALUE_ATTR, '10');

    fixture.componentInstance.sliderValue = 42;
    fixture.componentInstance.onSliderChange({});

    expect(localStorage.getItem(SLIDER_VALUE_ATTR)).toEqual('42');
  }));

  it('should compute new font when needed', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    fixture.componentInstance.fontSize = 30;
    spyOn(document, 'querySelector').and.callFake(function(arg) {
      if (arg === '.container') {
        return {
          'clientWidth': 231,
          'clientHeight': 50
        };
      } else if (arg === '.container > p ') {
        return {
          'clientWidth': 325,
          'clientHeight': 34
        };
      } else {
        return {};
      }
    });

    const newFont = fixture.componentInstance.computeMaxFont('.container');

    expect(newFont).toEqual(21);
  }));
});
