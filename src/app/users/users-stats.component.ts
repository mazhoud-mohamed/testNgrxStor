/**
 * Petit composant de statistiques, volontairement chargé avec @defer (voir users.component.html).
 * Son code n'est téléchargé qu'au moment où le bloc @defer se déclenche.
 */
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActiveUsers, selectUsersTotal } from '../store/users/users.selectors';

@Component({
  selector: 'app-users-stats',
  template: `
    <div class="stats-box">
      <p>Total : <strong>{{ total() }}</strong></p>
      <p>Actifs : <strong>{{ active().length }}</strong></p>
      <p>Inactifs : <strong>{{ total() - active().length }}</strong></p>
    </div>
  `,
  styles: `
    .stats-box { padding: 0.75rem; background: #f1f3f5; border-radius: 8px; }
    p { margin: 0.25rem 0; }
  `,
})
export class UsersStatsComponent {
  private readonly store = inject(Store);

  total = this.store.selectSignal(selectUsersTotal);
  active = this.store.selectSignal(selectActiveUsers);
}
