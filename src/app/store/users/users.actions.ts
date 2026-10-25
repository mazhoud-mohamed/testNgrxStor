/**
 * ACTIONS DES UTILISATEURS avec createActionGroup
 * -----------------------------------------------
 * createActionGroup regroupe plusieurs actions qui ont la MÊME SOURCE. Au lieu d'écrire
 * '[Users Page]' dans chaque createAction, on le donne une seule fois (`source`).
 *
 * Avant (createAction) :
 *   export const addUser = createAction('[Users Page] Add User', props<{ user: User }>());
 *
 * Maintenant (createActionGroup) : la clé de `events` est le nom de l'événement, et
 * NgRx génère le créateur d'action en camelCase : 'Add User' -> UsersActions.addUser(...)
 * Le `type` produit est identique : '[Users Page] Add User'.
 *
 * Même principe que d'habitude : le payload contient les données nécessaires au reducer, et
 * le reducer reste pur. On ne génère donc PAS l'id dans le reducer : le composant le crée.
 */
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.model';

export const UsersActions = createActionGroup({
  // La source : d'où viennent ces actions (ici, la page des utilisateurs)
  source: 'Users Page',

  events: {
    // Événement avec payload : props<...>()
    'Add User': props<{ user: User }>(),

    // `changes` = uniquement les propriétés à modifier (ex: { active: false }), pas l'objet entier
    'Update User': props<{ id: string; changes: Partial<User> }>(),

    'Remove User': props<{ id: string }>(),

    // Événement SANS payload : on doit écrire emptyProps() (pas de valeur vide possible ici)
    'Clear Users': emptyProps(),
  },
});

// Utilisation :
//   store.dispatch(UsersActions.addUser({ user }));
//   on(UsersActions.addUser, (state, { user }) => ...)
//   UsersActions.addUser.type  ->  '[Users Page] Add User'
