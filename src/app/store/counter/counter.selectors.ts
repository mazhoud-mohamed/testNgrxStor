/**
 * ÉTAPE 3 — LES SELECTORS
 * -----------------------
 * Un selector est une fonction qui LIT une partie du state global.
 * Les composants n'accèdent jamais au state directement : ils passent par des selectors.
 * Avantages : code réutilisable, et résultats mis en cache (memoization) =>
 * le calcul n'est refait que si les données utilisées ont changé.
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState, counterFeatureKey } from './counter.reducer';

// 1) Selector "feature" : récupère la tranche `counter` du state global.
//    Il faut lui donner la même clé que celle utilisée pour enregistrer le reducer.
export const selectCounterState = createFeatureSelector<CounterState>(counterFeatureKey);

// 2) Selector simple : extrait la valeur `count` de la tranche `counter`.
export const selectCount = createSelector(selectCounterState, (state) => state.count);

// 3) Selector dérivé : calcule une nouvelle valeur à partir d'un autre selector.
//    On ne stocke JAMAIS dans le state ce qu'on peut calculer ("parité" ici).
export const selectIsEven = createSelector(selectCount, (count) => count % 2 === 0);
