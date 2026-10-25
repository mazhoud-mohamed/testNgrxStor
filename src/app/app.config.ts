import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { APP_CONFIG } from './config/app-config.token';
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

    // REDUX DEVTOOLS
    // Connecte le Store à l'extension navigateur "Redux DevTools" (Chrome / Edge / Firefox).
    // Elle affiche chaque action dispatchée, le state avant/après (onglet Diff), et permet de
    // remonter dans le temps (time travel) en cliquant sur une action.
    // - maxAge     : nombre d'actions gardées en mémoire (les plus anciennes sont supprimées)
    // - logOnly    : en production, mode lecture seule (pas de time travel, plus léger et plus sûr)
    // - connectInZone : garde la détection de changements d'Angular cohérente avec les actions
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),

    // FOURNIR UNE VALEUR POUR UN TOKEN : { provide: TOKEN, useValue: valeur }
    // Cette valeur remplace celle par défaut (factory) définie dans le token.
    // Essaie de changer defaultRate ou apiDelayMs : la page Calcul s'adapte, sans toucher au service.
    { provide: APP_CONFIG, useValue: { defaultRate: 1.2, apiDelayMs: 1500 } },
  ],
};
