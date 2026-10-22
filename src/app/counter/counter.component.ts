/**
 * ÉTAPE 5 — UTILISER LE STORE DANS UN COMPOSANT
 * ---------------------------------------------
 * Le composant fait seulement 2 choses avec le Store :
 *   - LIRE   : store.select(selector)  => retourne un Observable de la valeur
 *   - ÉCRIRE : store.dispatch(action)  => envoie une action au reducer
 *
 * Flux complet (à retenir) :
 *   Clic bouton -> dispatch(action) -> Reducer -> nouveau State -> Selector -> Template mis à jour
 */
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { decrement, increment, incrementBy, reset } from '../store/counter/counter.actions';
import { selectCount, selectIsEven } from '../store/counter/counter.selectors';

@Component({
  selector: 'app-counter',
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  // On injecte le Store global fourni par provideStore() dans app.config.ts
  private readonly store = inject(Store);

  // Par convention, le nom d'un Observable se termine par `$`.
  // `select` observe le state : à chaque changement de `count`, la nouvelle valeur est émise.
  // Dans le template, le pipe `async` s'abonne/se désabonne automatiquement.
  count$ = this.store.select(selectCount);
  isEven$ = this.store.select(selectIsEven);

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
