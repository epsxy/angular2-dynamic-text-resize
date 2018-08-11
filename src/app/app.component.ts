import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Options } from 'ng5-slider';
import { INPUT_VALUE_ATTR, SLIDER_VALUE_ATTR } from 'src/model/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  pageTitle = 'Angular 2 – Dynamic Text Resize';
  fontSize = 20;
  inputValue = '';
  sliderValue = 100;
  sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    minLimit: 1
  };
  private obs: MutationObserver;

  ngOnInit(): void {
    /**
     * Retrieve value from LocalStorage
     */
    const inputStoredValue = localStorage.getItem(INPUT_VALUE_ATTR);
    const sliderStoredValue = localStorage.getItem(SLIDER_VALUE_ATTR);
    if (inputStoredValue != null) {
      this.inputValue = inputStoredValue;
    }
    if (sliderStoredValue != null && !isNaN(parseInt(sliderStoredValue, 10))) {
      this.sliderValue = parseInt(sliderStoredValue, 10);
    }

    /**
     * Watch for DOM Changes in Output Container
     */
    this.obs = new MutationObserver((mutation) => {
      this.fontSize = this.computeMaxFont('.output-container');
    });
    const outputContainer = document.querySelector('.output-container');
    this.obs.observe(outputContainer, {
      characterData: true,
      attributes: true,
      childList: false,
      subtree: true
    });
  }

  /**
   * Watch for Window:Resize event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.fontSize = this.computeMaxFont('.output-container');
  }

  /**
   * Disconnect Observer when instance is destroyed
   */
  ngOnDestroy(): void {
    this.obs.disconnect();
  }

  /**
   * Compute new font size from a CSS selector
   */
  computeMaxFont(selector: string): number {
    const outputContainer = document.querySelector(selector) as HTMLElement;
    const textContainer = document.querySelector(selector + ' > p ') as HTMLElement;
    const textWidth = textContainer.clientWidth;
    const textHeight = textContainer.clientHeight;
    const containerWidth = outputContainer.clientWidth;
    const containerHeight = outputContainer.clientHeight;

    /**
     * Lower bound issue. When new font is 0px,
     * we reset the view: inputValue='', sliderValue=100, fontSize=20
     */
    if (textHeight === 0 || textWidth === 0) {
      this.inputValue = '';
      localStorage.setItem(INPUT_VALUE_ATTR, this.inputValue);
      return 20;
    }

    const maxFontHeight = Math.floor((this.fontSize * containerHeight) / textHeight);
    const maxFontWidth = Math.floor((this.fontSize * containerWidth) / textWidth);
    return Math.min(maxFontHeight, maxFontWidth);
  }

  /**
   * @deprecated
   * Was used to force Font Size update
   */
  computeStyle(): void {
    this.fontSize = this.computeMaxFont('.output-container');
  }

  /**
   * Bind sliderValue to Output Container width
   */
  getOutputWidth(): string {
    return this.sliderValue + '%';
  }

  /**
   * Reset view button callback
   */
  reset(): void {
    this.inputValue = '';
    this.sliderValue = 100;
    localStorage.setItem(INPUT_VALUE_ATTR, this.inputValue);
    localStorage.setItem(SLIDER_VALUE_ATTR, this.sliderValue.toString());
  }

  /**
   * Input change event callback
   */
  onInputChange(event: any) {
    this.inputValue = event.target.value;
    localStorage.setItem(INPUT_VALUE_ATTR, this.inputValue);
  }

  /**
   * Watch slider changes and store new slide value in LocalStorage
   */
  onSliderChange(event: any) {
    localStorage.setItem(SLIDER_VALUE_ATTR, this.sliderValue.toString());
  }
}
