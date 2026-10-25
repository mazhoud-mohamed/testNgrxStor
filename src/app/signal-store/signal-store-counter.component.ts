/**
 * Compteur basé sur un SignalStore.
 * Comparer avec CounterComponent (Store classique) : ici le composant appelle des
 * MÉTHODES du store (store.increment()) au lieu de dispatcher des ACTIONS.
 */
import { Component, inject } from '@angular/core';
import { CounterSignalStore } from './counter.store';

@Component({
  selector: 'app-signal-store-counter',
  // `providers` sur le composant => le store est LOCAL : une nouvelle instance est créée avec
  // le composant et détruite avec lui (son state repart de 0 à chaque visite de la page).
  // Contraste avec le Store classique, qui est global.
  // Pour un store partagé par toute l'app, on écrirait signalStore({ providedIn: 'root' }, ...).
  providers: [CounterSignalStore],
  template: `
    <section class="box">
      <h2>Compteur SignalStore</h2>

      <!-- Le state et les computed sont des signaux : on les appelle avec () -->
      <p class="value">{{ store.count() }}</p>
      <p class="double">Double : {{ store.double() }}</p>
      <p class="parity">{{ store.isEven() ? 'Pair' : 'Impair' }}</p>

      <div class="buttons">
        <button (click)="store.decrement()">- {{ store.step() }}</button>
        <button (click)="store.increment()">+ {{ store.step() }}</button>
        <button class="secondary" (click)="store.reset()">Reset</button>
      </div>

      <p class="step">
        Pas :
        <button class="secondary" (click)="store.setStep(1)">1</button>
        <button class="secondary" (click)="store.setStep(5)">5</button>
        <button class="secondary" (click)="store.setStep(10)">10</button>
      </p>
    </section>
  `,
  styles: `
    .box {
      max-width: 320px;
      margin: 3rem auto 5rem;
      padding: 2rem;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      border: 1px solid #ddd;
      border-radius: 12px;
    }
    .value { font-size: 4rem; font-weight: 600; margin: 0.5rem 0; }
    .double, .parity { color: #666; margin: 0.25rem 0; }
    .buttons { display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem; }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: #3b5bdb;
      color: #fff;
      cursor: pointer;
    }
    button.secondary { background: #868e96; }
    .step button { padding: 0.25rem 0.6rem; }
  `,
})
export class SignalStoreCounterComponent {
  // On injecte le store comme n'importe quel service
  readonly store = inject(CounterSignalStore);
}
