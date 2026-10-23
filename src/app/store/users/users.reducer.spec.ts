import { User } from './user.model';
import { addUser, clearUsers, removeUser, updateUser } from './users.actions';
import { initialState, usersReducer } from './users.reducer';

const alice: User = { id: '1', name: 'Alice', email: 'alice@test.com', active: true };

describe('usersReducer', () => {
  it('addUser ajoute un utilisateur', () => {
    const state = usersReducer(initialState, addUser({ user: alice }));
    expect(state.ids).toEqual(['1']);
    expect(state.entities['1']).toEqual(alice);
  });

  it('updateUser modifie seulement les propriétés données', () => {
    const start = usersReducer(initialState, addUser({ user: alice }));
    const state = usersReducer(start, updateUser({ id: '1', changes: { active: false } }));
    expect(state.entities['1']).toEqual({ ...alice, active: false });
  });

  it('removeUser supprime l\'utilisateur', () => {
    const start = usersReducer(initialState, addUser({ user: alice }));
    expect(usersReducer(start, removeUser({ id: '1' })).ids).toEqual([]);
  });

  it('clearUsers vide la liste', () => {
    const start = usersReducer(initialState, addUser({ user: alice }));
    expect(usersReducer(start, clearUsers()).ids).toEqual([]);
  });
});
