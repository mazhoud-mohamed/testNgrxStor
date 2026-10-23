/**
 * Composant des utilisateurs : il lit via des selectors et écrit via des actions.
 * Il ne manipule jamais directement la liste.
 */
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../store/users/user.model';
import { addUser, clearUsers, removeUser, updateUser } from '../store/users/users.actions';
import {
  selectActiveUsers,
  selectAllUsers,
  selectUsersTotal,
} from '../store/users/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  private readonly store = inject(Store);

  users = this.store.selectSignal(selectAllUsers);
  activeUsers = this.store.selectSignal(selectActiveUsers);
  total = this.store.selectSignal(selectUsersTotal);

  onAdd(name: string, email: string): void {
    if (!name.trim() || !email.trim()) {
      return;
    }
    // L'id est créé ici (et non dans le reducer) pour que le reducer reste pur
    const user: User = { id: crypto.randomUUID(), name: name.trim(), email: email.trim(), active: true };
    this.store.dispatch(addUser({ user }));
  }

  onToggleActive(user: User): void {
    this.store.dispatch(updateUser({ id: user.id, changes: { active: !user.active } }));
  }

  onRemove(id: string): void {
    this.store.dispatch(removeUser({ id }));
  }

  onClear(): void {
    this.store.dispatch(clearUsers());
  }
}
