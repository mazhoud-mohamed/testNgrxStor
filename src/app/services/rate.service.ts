import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { APP_CONFIG } from '../config/app-config.token';

/**
 * Service qui SIMULE l'appel à la base de données (via une API).
 * Plus tard, on remplacera le corps de getRate() par un vrai appel HttpClient :
 *   return this.http.get<number>('/api/exchange-rate');
 * Le reste de l'application (effect, reducer...) n'aura pas besoin de changer.
 */
@Injectable({ providedIn: 'root' })
export class RateService {
  // On injecte la configuration via le token : le service ne contient plus de valeurs en dur,
  // et dans un test on peut fournir une autre config (ex: apiDelayMs: 0).
  private readonly config = inject(APP_CONFIG);

  getRate(): Observable<number> {
    return of(this.config.defaultRate).pipe(delay(this.config.apiDelayMs));
  }
}
