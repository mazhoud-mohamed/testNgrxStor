/**
 * ÉTAPE 5 — UTILISER LE STORE DANS UN COMPOSANT
 * ---------------------------------------------
 * Le composant fait seulement 2 choses avec le Store :
 *   - LIRE   : store.selectSignal(selector) => retourne un Signal de la valeur
 *   - ÉCRIRE : store.dispatch(action)  => envoie une action au reducer
 *
 * Flux complet (à retenir) :
 *   Clic bouton -> dispatch(action) -> Reducer -> nouveau State -> Selector -> Template mis à jour
 */
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, incrementBy, reset } from '../store/counter/counter.actions';
import { selectCount, selectIsEven } from '../store/counter/counter.selectors';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  // On injecte le Store global fourni par provideStore() dans app.config.ts
  private readonly store = inject(Store);

  // `selectSignal` transforme un selector en SIGNAL Angular (lecture seule).
  // Un signal contient toujours une valeur : on la lit en l'appelant comme une fonction,
  // `count()`, et le template se met à jour tout seul quand le state change.
  // (Alternative avec Observable : `store.select(selector)` + pipe `async` dans le template.)
  count = this.store.selectSignal(selectCount);
  isEven = this.store.selectSignal(selectIsEven);

  // Chaque méthode ne fait que dispatcher une action : aucune logique métier ici,
  // elle est dans le reducer.
  onIncrement(): void {
    this.store.dispatch(increment());
  }

  onDecrement(): void {
    this.store.dispatch(decrement());
  }

  onReset(): void {
    this.store.dispatch(reset());
  }

  // Action avec payload : on passe un objet correspondant à props<{ amount: number }>()
  onIncrementByFive(): void {
    this.store.dispatch(incrementBy({ amount: 5 }));
  }
}
