/**
 * ÉTAPE 1 — LES ACTIONS
 * ---------------------
 * Une action est un simple message qui décrit CE QUI S'EST PASSÉ dans l'application
 * (ex: "l'utilisateur a cliqué sur +"). Une action ne modifie jamais le state elle-même :
 * elle est seulement "envoyée" (dispatch) au Store, qui la transmet au reducer.
 *
 * Convention de nommage : '[Source] Événement'
 *   - [Counter Page] = d'où vient l'action (ici : la page du compteur)
 *   - Increment      = ce qui s'est passé
 */
import { createAction, props } from '@ngrx/store';

// Action sans données : on sait juste "qu'on a cliqué sur +"
export const increment = createAction('[Counter Page] Increment');

// Action sans données : "on a cliqué sur -"
export const decrement = createAction('[Counter Page] Decrement');

// Action sans données : "on a cliqué sur Reset"
export const reset = createAction('[Counter Page] Reset');

// Action AVEC données (payload) : props<>() décrit le contenu transporté par l'action.
// Exemple d'utilisation : store.dispatch(incrementBy({ amount: 5 }))
export const incrementBy = createAction(
  '[Counter Page] Increment By',
  props<{ amount: number }>()
);
