import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  pageTitle = 'Angular 2 – Stretched Text Box';
  fontSize = 45;
  inputValue = '';
  sliderValue = 100;
  sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    minLimit: 1
  };

  ngOnInit() {
    console.log('----- init -----');
    const inputStoredValue = localStorage.getItem('input-value');
    const sliderStoredValue = localStorage.getItem('slider-value');
    if (inputStoredValue != null) {
      this.inputValue = inputStoredValue;
    }
    if (sliderStoredValue != null && !isNaN(parseInt(sliderStoredValue, 10))) {
      this.sliderValue = parseInt(sliderStoredValue, 10);
    }
  }

  // TODO: Handle Corner cases where width = 0!
  computeMaxFont(selector: string): number {
    console.log('-- compute max font --');
    const outputContainer = document.querySelector(selector) as HTMLElement;
    const textContainer = document.querySelector(selector + ' > p ') as HTMLElement;
    const textWidth = textContainer.offsetWidth;
    const textHeight = textContainer.offsetHeight;
    const containerWidth = outputContainer.offsetWidth;
    const containerHeight = outputContainer.offsetHeight;

    // console.log('textWidth: ' + textWidth + ', textHeight: ' + textHeight);
    // console.log('containerWidth: ' + containerWidth + ', containerHeight: ' + containerHeight);

    const maxFontHeight = Math.floor((this.fontSize * containerHeight) / textHeight);
    const maxFontWidth = Math.floor((this.fontSize * containerWidth) / textWidth);
    // console.log('maxHeight: ' + maxFontHeight + ', maxWidth: ' + maxFontWidth);
    return Math.min(maxFontHeight, maxFontWidth);
  }

  computeStyle() {
    this.fontSize = this.computeMaxFont('.output-container');
  }

  // --- ISSUE VIEW NOT SYNC WITH DATA BOUND --- //
  // --- DO NOT USE THAT --- //

  // ngAfterViewInit() {
  //   console.log('view init');
  // }

  // ngAfterViewChecked() {

  // }

  getOutputWidth() {
    return this.sliderValue + '%';
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
    localStorage.setItem('input-value', this.inputValue);
  }

  onSliderChange(event: any) {
    localStorage.setItem('slider-value', this.sliderValue.toString());
  }
}
