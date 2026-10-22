/**
 * Tester un reducer est très simple car c'est une fonction pure :
 * on lui donne un state + une action, et on vérifie le state retourné.
 */
import { decrement, increment, incrementBy, reset } from './counter.actions';
import { counterReducer, initialState } from './counter.reducer';

describe('counterReducer', () => {
  it('increment ajoute 1', () => {
    expect(counterReducer(initialState, increment()).count).toBe(1);
  });

  it('decrement retire 1', () => {
    expect(counterReducer({ count: 3 }, decrement()).count).toBe(2);
  });

  it('incrementBy ajoute le montant du payload', () => {
    expect(counterReducer(initialState, incrementBy({ amount: 5 })).count).toBe(5);
  });

  it('reset revient à l\'état initial', () => {
    expect(counterReducer({ count: 42 }, reset())).toEqual(initialState);
  });
});
