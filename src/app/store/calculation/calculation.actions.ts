/**
 * ACTIONS DU CALCUL
 * -----------------
 * Une opération asynchrone (appel API) se décrit avec 3 actions :
 *   1. la DEMANDE   : l'utilisateur a cliqué            -> déclenche l'effect
 *   2. le SUCCÈS    : l'API a répondu                    -> transporte le résultat (props)
 *   3. l'ÉCHEC      : l'API a échoué                     -> transporte l'erreur (props)
 *
 * Le préfixe indique QUI émet l'action : la page (clic) ou l'API (réponse).
 */
import { createAction, props } from '@ngrx/store';

// Émise par le composant au clic sur "Calculer". Aucun reducer ne calcule rien ici :
// elle sert à (a) afficher le chargement et (b) déclencher l'effect qui appelle l'API.
export const calculate = createAction('[Calculation Page] Calculate');

// Émise par l'EFFECT quand le taux de change est bien reçu
export const calculateSuccess = createAction(
  '[Calculation API] Calculate Success',
  props<{ rate: number }>()
);

// Émise par l'EFFECT quand l'appel a échoué
export const calculateFailure = createAction(
  '[Calculation API] Calculate Failure',
  props<{ error: string }>()
);
