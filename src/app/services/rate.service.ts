import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

/**
 * Service qui SIMULE l'appel à la base de données (via une API).
 * Plus tard, on remplacera le corps de getRate() par un vrai appel HttpClient :
 *   return this.http.get<number>('/api/exchange-rate');
 * Le reste de l'application (effect, reducer...) n'aura pas besoin de changer.
 */
@Injectable({ providedIn: 'root' })
export class RateService {
  getRate(): Observable<number> {
    // of(1.08) émet la valeur tout de suite ; delay(1000) simule 1 seconde de latence réseau
    return of(1.08).pipe(delay(1000));
  }
}
