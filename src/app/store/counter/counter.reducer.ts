/**
 * ÉTAPE 2 — LE STATE ET LE REDUCER
 * --------------------------------
 * - Le STATE  : la forme des données stockées (ici : juste un nombre).
 * - Le REDUCER: une fonction PURE qui reçoit (ancien state + action) et retourne le NOUVEAU state.
 *
 * Règles d'or du reducer :
 *   1. Jamais de modification directe du state (pas de `state.count++`) : on retourne un nouvel objet.
 *   2. Pas d'effets de bord (pas d'appel HTTP, pas de Math.random(), pas de Date.now()...).
 *   3. Même entrée => toujours même sortie.
 */
import { createReducer, on } from '@ngrx/store';
import { decrement, increment, incrementBy, reset } from './counter.actions';

// Clé sous laquelle ce morceau de state sera rangé dans le Store global (voir app.config.ts).
// Le Store global ressemblera à : { counter: { count: 0 } }
export const counterFeatureKey = 'counter';

// Le type du state de ce "feature" (compteur)
export interface CounterState {
  count: number;
}

// La valeur de départ du state, au démarrage de l'application
export const initialState: CounterState = {
  count: 0,
};

export const counterReducer = createReducer(
  initialState,

  // on(action, (stateActuel) => nouveauState)
  // On utilise `...state` (spread) pour COPIER l'ancien state, puis on écrase seulement `count`.
  on(increment, (state) => ({ ...state, count: state.count + 1 })),

  on(decrement, (state) => ({ ...state, count: state.count - 1 })),

  // Ici on ignore l'ancien state : on repart de l'état initial
  on(reset, () => initialState),

  // Le 2ème paramètre ({ amount }) est le payload transporté par l'action
  on(incrementBy, (state, { amount }) => ({ ...state, count: state.count + amount }))
);
