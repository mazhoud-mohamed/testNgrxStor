/**
 * STATE ET REDUCER AVEC NGRX ENTITY
 * ---------------------------------
 * Problème : gérer une LISTE d'objets à la main oblige à écrire des spreads, des map(),
 * des filter() pour chaque ajout / modification / suppression.
 *
 * NgRx Entity fournit un "adapter" qui écrit ce code pour nous. Il stocke la liste sous
 * une forme normalisée :
 *   {
 *     ids: ['a1', 'b2'],                       // l'ordre
 *     entities: { a1: {...user}, b2: {...} }   // accès direct par id (rapide)
 *   }
 */
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from './user.model';
import { addUser, clearUsers, removeUser, updateUser } from './users.actions';

export const usersFeatureKey = 'users';

// EntityState<User> = { ids, entities }. On pourrait l'étendre avec nos propres champs
// (loading, error...) comme on l'a fait pour `calculation`.
export interface UsersState extends EntityState<User> {}

// L'adapter : par défaut il utilise la propriété `id` comme identifiant.
// Si ton objet utilisait un autre champ, on passerait { selectId: (u) => u.userId }.
export const usersAdapter = createEntityAdapter<User>();

// getInitialState() crée { ids: [], entities: {} }
export const initialState: UsersState = usersAdapter.getInitialState();

export const usersReducer = createReducer(
  initialState,

  // Chaque méthode de l'adapter reçoit (données, state) et retourne le NOUVEAU state.
  // Pas de spread à écrire : l'adapter gère l'immutabilité.
  on(addUser, (state, { user }) => usersAdapter.addOne(user, state)),

  // updateOne attend { id, changes } : seules les propriétés de `changes` sont modifiées
  on(updateUser, (state, { id, changes }) => usersAdapter.updateOne({ id, changes }, state)),

  on(removeUser, (state, { id }) => usersAdapter.removeOne(id, state)),

  on(clearUsers, (state) => usersAdapter.removeAll(state))
);
