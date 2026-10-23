import { Component } from '@angular/core';
import { CalculationComponent } from './calculation/calculation.component';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent, CalculationComponent],
  template: `<app-counter /><app-calculation />`,
})
export class AppComponent {
  title = 'testNgrxStor';
}
