import { createAction } from '@ngrx/store';

// Émise par le bouton "Save" du footer. Elle ne change aucun state : elle exprime seulement
// l'intention "sauvegarder". C'est l'effect (save.effects.ts) qui fait le travail.
export const save = createAction('[Footer] Save');
