import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `<app-counter />`,
})
export class AppComponent {
  title = 'testNgrxStor';
}
