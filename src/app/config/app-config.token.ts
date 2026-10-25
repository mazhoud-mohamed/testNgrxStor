/**
 * INJECTION TOKEN
 * ---------------
 * L'injection de dépendances d'Angular identifie normalement ce qu'on injecte par sa CLASSE
 * (inject(RateService)). Mais une interface ou une simple valeur (objet de config, chaîne, nombre)
 * n'existe pas à l'exécution : on ne peut pas l'utiliser comme clé.
 * Un InjectionToken est une clé unique qu'on crée nous-mêmes pour injecter ce genre de valeur.
 */
import { InjectionToken } from '@angular/core';

// 1) Le TYPE de la valeur qu'on veut injecter
export interface AppConfig {
  /** Taux de change renvoyé par l'API simulée */
  defaultRate: number;
  /** Latence simulée de l'API, en millisecondes */
  apiDelayMs: number;
}

// 2) Le TOKEN. Le texte est seulement une description utile dans les messages d'erreur.
//    Le générique <AppConfig> donne le type de la valeur obtenue avec inject(APP_CONFIG).
//    `factory` + `providedIn: 'root'` fournissent une valeur PAR DÉFAUT : le token fonctionne
//    même si personne ne le déclare (voir app.config.ts pour la surcharger).
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG', {
  providedIn: 'root',
  factory: () => ({ defaultRate: 1.08, apiDelayMs: 1000 }),
});
