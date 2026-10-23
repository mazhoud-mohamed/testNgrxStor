/**
 * EFFECT DE SAUVEGARDE
 * --------------------
 * Pour l'instant, "sauvegarder" = afficher tout le state dans la console.
 * Plus tard, on remplacera le console.log par un vrai appel API (HttpClient) : l'architecture
 * ne changera pas, seul le contenu du tap() sera remplacé.
 */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { save } from './save.actions';

@Injectable()
export class SaveEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  save$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(save),

        // On récupère le STATE GLOBAL COMPLET : `(state) => state` est un selector qui renvoie
        // tout, c'est-à-dire { counter: ..., calculation: ... }.
        // Note : la tranche `calculation` n'apparaît que si la route /calculation a déjà été
        // visitée (elle est enregistrée avec sa route).
        concatLatestFrom(() => this.store.select((state) => state)),

        tap(([, state]) => console.log('[Save] état du store :', state))
      ),
    // Aucune action n'est renvoyée au Store
    { dispatch: false }
  );
}
