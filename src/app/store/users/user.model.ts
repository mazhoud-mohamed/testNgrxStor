// Une "entité" = un objet avec un identifiant unique (ici `id`).
// NgRx Entity s'en sert pour retrouver, modifier ou supprimer un objet de la collection.
export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}
