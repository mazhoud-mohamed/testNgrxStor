/**
 * SELECTORS DES UTILISATEURS
 * --------------------------
 * L'adapter génère aussi des selectors prêts à l'emploi avec getSelectors().
 */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, usersAdapter, usersFeatureKey } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>(usersFeatureKey);

// getSelectors(selectUsersState) lie les selectors de l'adapter à notre tranche du state.
// On récupère :
//   selectAll      -> User[]  (tableau ordonné, pratique pour @for)
//   selectEntities -> { [id]: User }  (accès direct par id)
//   selectIds      -> string[]
//   selectTotal    -> number  (nombre d'utilisateurs)
export const {
  selectAll: selectAllUsers,
  selectEntities: selectUserEntities,
  selectTotal: selectUsersTotal,
} = usersAdapter.getSelectors(selectUsersState);

// Selector dérivé : on filtre à partir de selectAllUsers, sans rien stocker de plus
export const selectActiveUsers = createSelector(selectAllUsers, (users) =>
  users.filter((user) => user.active)
);
