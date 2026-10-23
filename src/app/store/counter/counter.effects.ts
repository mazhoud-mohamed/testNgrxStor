/**
 * ÉTAPE 6 — LES EFFECTS
 * ---------------------
 * Le reducer doit rester PUR (pas de console.log, pas d'HTTP, pas de localStorage...).
 * Tout ce qui est "effet de bord" va dans un EFFECT.
 *
 * Un effect écoute le flux de toutes les actions (`Actions`, un Observable) et réagit à
 * certaines d'entre elles. Il peut :
 *   - faire une opération externe (log, HTTP, localStorage...) puis éventuellement
 *   - dispatcher une NOUVELLE action (par défaut), ou rien du tout ({ dispatch: false }).
 *
 * ORDRE D'EXÉCUTION pour un dispatch(increment()) :
 *   1. le reducer met à jour le state
 *   2. ENSUITE l'effect reçoit l'action
 *   => dans l'effect, le state est donc déjà à jour.
 */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { decrement, increment, incrementBy, reset } from './counter.actions';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  // `Actions` = le flux de toutes les actions dispatchées dans l'application
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  logCount$ = createEffect(
    () =>
      this.actions$.pipe(
        // 1) ofType : ne garde que les actions qui nous intéressent (comme un filter)
        ofType(increment, decrement, incrementBy, reset),

        // 2) concatLatestFrom : ajoute la DERNIÈRE valeur d'un autre Observable (ici le Store)
        //    à côté de l'action. Sans lui, l'effect ne connaît que l'action reçue, pas le state.
        //    - Il prend une FONCTION qui retourne l'Observable à lire : () => this.store.select(...)
        //    - Il transforme la valeur émise en tableau : [action, count]
        //    - Il ne se redéclenche pas quand le state change : seule une nouvelle action
        //      déclenche l'effect (contrairement à combineLatest).
        concatLatestFrom(() => this.store.select(selectCount)),

        // 3) tap : effet de bord (ici un simple log). On destructure le tableau [action, count]
        tap(([action, count]) => console.log(`[Effect] ${action.type} -> count = ${count}`))
      ),

    // Cet effect ne renvoie aucune action : sans cette option, NgRx essaierait de dispatcher
    // la valeur émise par le flux (ici un tableau), ce qui provoquerait une erreur.
    { dispatch: false }
  );
}
