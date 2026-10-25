import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CalculationEffects } from './store/calculation/calculation.effects';
import { calculationFeatureKey, calculationReducer } from './store/calculation/calculation.reducer';
import { usersFeatureKey, usersReducer } from './store/users/users.reducer';

export const routes: Routes = [
  // La page d'accueil redirige vers le compteur
  { path: '', pathMatch: 'full', redirectTo: 'counter' },

  {
    path: 'counter',
    // loadComponent = lazy loading : le code du composant n'est téléchargé qu'à la 1ère visite
    loadComponent: () =>
      import('./counter/counter.component').then((m) => m.CounterComponent),
  },

  {
    path: 'calculation',
    loadComponent: () =>
      import('./calculation/calculation.component').then((m) => m.CalculationComponent),

    // FEATURE STATE : ces providers ne sont créés que lorsqu'on ouvre cette route.
    //  - provideState(clé, reducer) ajoute une tranche `calculation` au Store DÉJÀ existant
    //    (c'est le même Store global, on lui enregistre juste un reducer de plus).
    //  - provideEffects(...) démarre les effects de cette fonctionnalité.
    // Avant la 1ère visite de /calculation, state.calculation n'existe pas encore.
    providers: [
      provideState(calculationFeatureKey, calculationReducer),
      provideEffects(CalculationEffects),
    ],
  },

  {
    path: 'signal-store',
    loadComponent: () =>
      import('./signal-store/signal-store-counter.component').then(
        (m) => m.SignalStoreCounterComponent
      ),
  },

  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent),
    // State chargé avec la route (aucun effect nécessaire ici)
    providers: [provideState(usersFeatureKey, usersReducer)],
  },
];
