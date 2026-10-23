/**
 * EFFECT DU CALCUL : appeler l'API (ici simulée) pour récupérer le taux de change
 * ------------------------------------------------------------------------------
 * Flux :
 *   calculate  ->  [effect appelle RateService]  ->  calculateSuccess({ rate })
 *                                                 \-> calculateFailure({ error })
 * Ici l'effect DISPATCHE de nouvelles actions (comportement par défaut de createEffect) :
 * ce que le flux émet (une action) est renvoyé au Store.
 */
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RateService } from '../../services/rate.service';
import { calculate, calculateFailure, calculateSuccess } from './calculation.actions';

@Injectable()
export class CalculationEffects {
  private readonly actions$ = inject(Actions);
  private readonly rateService = inject(RateService);

  loadRate$ = createEffect(() =>
    this.actions$.pipe(
      // On réagit uniquement à la demande de calcul
      ofType(calculate),

      // switchMap : lance l'appel API. Si l'utilisateur reclique pendant qu'un appel est en
      // cours, l'ancien appel est ANNULÉ et seul le dernier compte.
      switchMap(() =>
        this.rateService.getRate().pipe(
          // Succès : on transforme la réponse en action, que le reducer va traiter
          map((rate) => calculateSuccess({ rate })),

          // Échec : on transforme l'erreur en action (of(...) crée un Observable d'une valeur).
          // catchError est placé À L'INTÉRIEUR du switchMap : sinon une seule erreur
          // arrêterait l'effect pour toujours et les clics suivants ne feraient plus rien.
          catchError((error: Error) => of(calculateFailure({ error: error.message })))
        )
      )
    )
  );
}
