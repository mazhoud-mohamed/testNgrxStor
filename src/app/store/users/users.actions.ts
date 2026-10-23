/**
 * ACTIONS DES UTILISATEURS
 * ------------------------
 * Même principe que pour le compteur : une action décrit ce qui s'est passé.
 * Le payload contient les données nécessaires au reducer.
 *
 * Important : le reducer doit rester pur. On ne génère donc PAS l'id dans le reducer
 * (un id aléatoire serait différent à chaque appel) : le composant le crée et le met dans l'action.
 */
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const addUser = createAction('[Users Page] Add User', props<{ user: User }>());

// `changes` = uniquement les propriétés à modifier (ex: { active: false }), pas l'objet entier
export const updateUser = createAction(
  '[Users Page] Update User',
  props<{ id: string; changes: Partial<User> }>()
);

export const removeUser = createAction('[Users Page] Remove User', props<{ id: string }>());

export const clearUsers = createAction('[Users Page] Clear Users');
