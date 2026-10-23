/**
 * STATE ET REDUCER DU CALCUL
 * --------------------------
 * On stocke dans le state les DONNÉES BRUTES et l'ÉTAT DE L'OPÉRATION (loading, error).
 * On ne stocke PAS le résultat du calcul : il se déduit de `count * rate`, c'est le rôle
 * d'un selector (voir calculation.selectors.ts).
 */
import { createReducer, on } from '@ngrx/store';
import { calculate, calculateFailure, calculateSuccess } from './calculation.actions';

export const calculationFeatureKey = 'calculation';

export interface CalculationState {
  rate: number | null; // taux de change reçu de l'API (null = pas encore chargé)
  loading: boolean; // true pendant l'appel API -> permet d'afficher un chargement
  error: string | null; // message d'erreur éventuel
}

export const initialState: CalculationState = {
  rate: null,
  loading: false,
  error: null,
};

export const calculationReducer = createReducer(
  initialState,

  // Demande : on passe en chargement et on efface l'ancienne erreur.
  // (L'appel API lui-même est fait par l'effect, pas ici : un reducer reste pur.)
  on(calculate, (state) => ({ ...state, loading: true, error: null })),

  // Succès : on range le taux reçu dans le payload de l'action et on arrête le chargement
  on(calculateSuccess, (state, { rate }) => ({ ...state, rate, loading: false })),

  // Échec : on range le message d'erreur et on arrête le chargement
  on(calculateFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
