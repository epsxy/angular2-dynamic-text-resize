import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Options } from 'ng5-slider';
import { INPUT_VALUE_ATTR, SLIDER_VALUE_ATTR } from 'src/model/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  pageTitle = 'Angular 2 – Stretched Text Box';
  fontSize = 45;
  inputValue = '';
  sliderValue = 100;
  sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    minLimit: 1
  };
  private obs: MutationObserver;

  ngOnInit(): void {
    const inputStoredValue = localStorage.getItem(INPUT_VALUE_ATTR);
    const sliderStoredValue = localStorage.getItem(SLIDER_VALUE_ATTR);
    if (inputStoredValue != null) {
      this.inputValue = inputStoredValue;
    }
    if (sliderStoredValue != null && !isNaN(parseInt(sliderStoredValue, 10))) {
      this.sliderValue = parseInt(sliderStoredValue, 10);
    }
    // --- DOM CHANGES MUTATION OBSERVER --- //
    this.obs = new MutationObserver((mutation) => {
      console.log(mutation);
      this.fontSize = this.computeMaxFont('.output-container');
    });
    const node = document.querySelector('.output-container');
    this.obs.observe(node, { characterData: true, attributes: true, childList: false, subtree: true });
  }

  // --- RESIZE EVENT LISTENER --- //
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('Window has been resized');
    this.fontSize = this.computeMaxFont('.output-container');
  }

  ngOnDestroy(): void {
    this.obs.disconnect();
  }

  // TODO: Handle Corner cases where width = 0!
  computeMaxFont(selector: string): number {
    console.log('-- compute max font --');
    const outputContainer = document.querySelector(selector) as HTMLElement;
    const textContainer = document.querySelector(selector + ' > p ') as HTMLElement;
    const textWidth = textContainer.clientWidth;
    const textHeight = textContainer.clientHeight;
    const containerWidth = outputContainer.clientWidth;
    const containerHeight = outputContainer.clientHeight;

    console.log('textWidth: ' + textWidth + ', textHeight: ' + textHeight);
    console.log('containerWidth: ' + containerWidth + ', containerHeight: ' + containerHeight);

    // ----- FIXME INFINITE LOOP ----- //
    if (textHeight === 0 || textWidth === 0) {
      console.log('Returning default value: 1');
      this.inputValue = '';
      localStorage.setItem(INPUT_VALUE_ATTR, this.inputValue);
      return 20;
    }
    // -----------------------------------------

    const maxFontHeight = Math.floor((this.fontSize * containerHeight) / textHeight);
    const maxFontWidth = Math.floor((this.fontSize * containerWidth) / textWidth);
    console.log('maxHeight: ' + maxFontHeight + ', maxWidth: ' + maxFontWidth);
    return Math.min(maxFontHeight, maxFontWidth);
  }

  computeStyle() {
    this.fontSize = this.computeMaxFont('.output-container');
  }

  getOutputWidth() {
    return this.sliderValue + '%';
  }

  reset(): void {
    this.inputValue = '';
    this.sliderValue = 100;
    localStorage.setItem(INPUT_VALUE_ATTR, this.inputValue);
    localStorage.setItem(SLIDER_VALUE_ATTR, this.sliderValue.toString());
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
    localStorage.setItem(INPUT_VALUE_ATTR, this.inputValue);
  }

  onSliderChange(event: any) {
    localStorage.setItem(SLIDER_VALUE_ATTR, this.sliderValue.toString());
  }
}
