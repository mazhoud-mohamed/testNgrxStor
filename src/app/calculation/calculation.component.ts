/**
 * Composant du calcul : il ne connaît ni l'API ni la formule.
 * Il dispatche une action au clic et affiche ce que les selectors lui donnent.
 */
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { calculate } from '../store/calculation/calculation.actions';
import {
  selectError,
  selectLoading,
  selectRate,
  selectResult,
} from '../store/calculation/calculation.selectors';
import { selectCount } from '../store/counter/counter.selectors';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrl: './calculation.component.css',
})
export class CalculationComponent {
  private readonly store = inject(Store);

  count = this.store.selectSignal(selectCount);
  rate = this.store.selectSignal(selectRate);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);
  result = this.store.selectSignal(selectResult);

  // Un clic = une action. L'effect prend ensuite le relais pour appeler l'API.
  onCalculate(): void {
    this.store.dispatch(calculate());
  }
}
