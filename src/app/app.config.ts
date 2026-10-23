import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { CalculationEffects } from './store/calculation/calculation.effects';
import { calculationFeatureKey, calculationReducer } from './store/calculation/calculation.reducer';
import { CounterEffects } from './store/counter/counter.effects';
import { counterFeatureKey, counterReducer } from './store/counter/counter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // ÉTAPE 4 — ENREGISTRER LE STORE
    // provideStore() crée le Store global de l'application. On lui indique quels reducers
    // utiliser : chaque clé devient une "tranche" du state global.
    // Ici le state global sera : { counter: { count: 0 } }
    provideStore({
      [counterFeatureKey]: counterReducer,
      [calculationFeatureKey]: calculationReducer,
    }),

    // ÉTAPE 6 — ENREGISTRER LES EFFECTS
    // provideEffects() démarre les classes d'effects : elles commencent à écouter les actions.
    provideEffects(CounterEffects, CalculationEffects),
  ],
};
