/**
 * SELECTORS DU CALCUL
 * -------------------
 * Ici on montre la puissance des selectors : `selectResult` combine DEUX tranches du state
 * (counter + calculation). Il est recalculé uniquement quand `count` ou `rate` change.
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectCount } from '../counter/counter.selectors';
import { CalculationState, calculationFeatureKey } from './calculation.reducer';

export const selectCalculationState =
  createFeatureSelector<CalculationState>(calculationFeatureKey);

export const selectRate = createSelector(selectCalculationState, (state) => state.rate);
export const selectLoading = createSelector(selectCalculationState, (state) => state.loading);
export const selectError = createSelector(selectCalculationState, (state) => state.error);

// Selector qui combine plusieurs selectors : le dernier argument reçoit leurs résultats
// dans le même ordre. Le calcul = valeur du compteur * taux de change.
// Tant que le taux n'est pas chargé, il n'y a pas de résultat (null).
export const selectResult = createSelector(selectCount, selectRate, (count, rate) =>
  rate === null ? null : count * rate
);
