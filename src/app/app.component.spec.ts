import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app.component';
import { calculationFeatureKey, calculationReducer } from './store/calculation/calculation.reducer';
import { counterFeatureKey, counterReducer } from './store/counter/counter.reducer';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideStore({
          [counterFeatureKey]: counterReducer,
          [calculationFeatureKey]: calculationReducer,
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the counter at 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.value')?.textContent).toContain('0');
  });
});
