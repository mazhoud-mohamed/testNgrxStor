/**
 * SIGNALSTORE (@ngrx/signals)
 * ---------------------------
 * Un SignalStore regroupe en UN SEUL endroit ce que le Store classique répartit sur
 * plusieurs fichiers :
 *
 *   Store classique (@ngrx/store)       SignalStore (@ngrx/signals)
 *   -----------------------------       ---------------------------
 *   state + reducer                 ->  withState(...)
 *   selectors                       ->  withComputed(...)
 *   actions + reducer + dispatch    ->  withMethods(...) + patchState(...)
 *
 * Pas d'actions, pas de reducer, pas de dispatch : on appelle directement des méthodes
 * qui modifient le state. C'est plus court, idéal pour le state d'un composant ou d'une
 * fonctionnalité. Le Store classique reste plus adapté au state global d'une grosse
 * application (traçabilité des actions, Redux DevTools, effects).
 */
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

// Le type du state
interface CounterSignalState {
  count: number;
  step: number; // de combien on incrémente / décrémente
}

// La valeur de départ
const initialState: CounterSignalState = {
  count: 0,
  step: 1,
};

export const CounterSignalStore = signalStore(
  // 1) STATE : chaque propriété devient automatiquement un SIGNAL en lecture seule.
  //    On lit donc `store.count()` et `store.step()`, sans écrire de selector.
  withState(initialState),

  // 2) COMPUTED : valeurs dérivées (équivalent des selectors dérivés).
  //    Elles reçoivent les signaux du state et sont recalculées seulement si nécessaire.
  withComputed(({ count }) => ({
    double: computed(() => count() * 2),
    isEven: computed(() => count() % 2 === 0),
  })),

  // 3) MÉTHODES : la seule façon de modifier le state depuis l'extérieur.
  //    patchState(store, ...) met à jour UNE PARTIE du state de façon immuable
  //    (comme un `{ ...state, count: ... }` automatique).
  withMethods((store) => ({
    // Forme "fonction" : reçoit le state actuel et retourne les propriétés à modifier
    increment(): void {
      patchState(store, (state) => ({ count: state.count + state.step }));
    },

    decrement(): void {
      patchState(store, (state) => ({ count: state.count - state.step }));
    },

    // Forme "objet" : on donne directement les nouvelles valeurs
    setStep(step: number): void {
      patchState(store, { step });
    },

    reset(): void {
      patchState(store, initialState);
    },
  }))
);
