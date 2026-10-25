import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { save } from './store/save/save.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/counter" routerLinkActive="active">Compteur</a>
      <a routerLink="/calculation" routerLinkActive="active">Calcul</a>
      <a routerLink="/users" routerLinkActive="active">Utilisateurs</a>
      <a routerLink="/signal-store" routerLinkActive="active">SignalStore</a>
    </nav>

    <router-outlet />

    <!-- Footer hors du router-outlet : il est donc visible sur toutes les pages -->
    <footer>
      <button (click)="onSave()">Save</button>
    </footer>
  `,
  styles: `
    nav {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1.5rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    a { color: #3b5bdb; text-decoration: none; }
    a.active { font-weight: 700; text-decoration: underline; }

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.75rem;
      text-align: center;
      background: #f1f3f5;
      border-top: 1px solid #ddd;
    }
    footer button {
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      background: #e8590c;
      color: #fff;
      cursor: pointer;
    }
  `,
})
export class AppComponent {
  title = 'testNgrxStor';

  private readonly store = inject(Store);

  // Le composant ne sait pas comment sauvegarder : il dispatche seulement l'action.
  onSave(): void {
    this.store.dispatch(save());
  }
}
