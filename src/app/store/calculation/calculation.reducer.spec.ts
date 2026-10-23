import { calculate, calculateFailure, calculateSuccess } from './calculation.actions';
import { calculationReducer, initialState } from './calculation.reducer';

describe('calculationReducer', () => {
  it('calculate passe en chargement', () => {
    const state = calculationReducer(initialState, calculate());
    expect(state.loading).toBeTrue();
  });

  it('calculateSuccess range le taux et arrête le chargement', () => {
    const state = calculationReducer({ ...initialState, loading: true }, calculateSuccess({ rate: 1.08 }));
    expect(state).toEqual({ rate: 1.08, loading: false, error: null });
  });

  it('calculateFailure range l\'erreur et arrête le chargement', () => {
    const state = calculationReducer({ ...initialState, loading: true }, calculateFailure({ error: 'boom' }));
    expect(state).toEqual({ rate: null, loading: false, error: 'boom' });
  });
});
