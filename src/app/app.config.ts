import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { CounterEffects } from './store/counter/counter.effects';
import { counterFeatureKey, counterReducer } from './store/counter/counter.reducer';
import { SaveEffects } from './store/save/save.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // ÉTAPE 4 — ENREGISTRER LE STORE (état RACINE)
    // provideStore() crée le Store global de l'application. On y met ici seulement les
    // reducers dont l'état est partagé par plusieurs pages ou nécessaire dès le départ.
    // Le compteur est lu par la page Counter ET par la page Calculation : il reste donc à la racine.
    // Le state du calcul, lui, est enregistré avec sa route (voir app.routes.ts).
    provideStore({ [counterFeatureKey]: counterReducer }),

    // ÉTAPE 6 — ENREGISTRER LES EFFECTS RACINE
    // provideEffects() démarre les classes d'effects : elles commencent à écouter les actions.
    provideEffects(CounterEffects, SaveEffects),
  ],
};
