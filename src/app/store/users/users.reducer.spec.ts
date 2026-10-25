import { User } from './user.model';
import { UsersActions } from './users.actions';
import { initialState, usersReducer } from './users.reducer';

const alice: User = { id: '1', name: 'Alice', email: 'alice@test.com', active: true };

describe('usersReducer', () => {
  it('addUser ajoute un utilisateur', () => {
    const state = usersReducer(initialState, UsersActions.addUser({ user: alice }));
    expect(state.ids).toEqual(['1']);
    expect(state.entities['1']).toEqual(alice);
  });

  it('updateUser modifie seulement les propriétés données', () => {
    const start = usersReducer(initialState, UsersActions.addUser({ user: alice }));
    const state = usersReducer(
      start,
      UsersActions.updateUser({ id: '1', changes: { active: false } })
    );
    expect(state.entities['1']).toEqual({ ...alice, active: false });
  });

  it('removeUser supprime l\'utilisateur', () => {
    const start = usersReducer(initialState, UsersActions.addUser({ user: alice }));
    expect(usersReducer(start, UsersActions.removeUser({ id: '1' })).ids).toEqual([]);
  });

  it('clearUsers vide la liste', () => {
    const start = usersReducer(initialState, UsersActions.addUser({ user: alice }));
    expect(usersReducer(start, UsersActions.clearUsers()).ids).toEqual([]);
  });

  // createActionGroup fabrique le même `type` qu'un createAction écrit à la main
  it('les types générés suivent le format "[Source] Événement"', () => {
    expect(UsersActions.addUser.type).toBe('[Users Page] Add User');
    expect(UsersActions.clearUsers.type).toBe('[Users Page] Clear Users');
  });
});
