# MIKIANELI V3.1.1 — candidate finale, preview locale

Deux ajustements depuis la V3.1 `f3cada9`, sur `codex/site-v3-1-motion`. Aucun push, aucune fusion, aucun déploiement. `main` reste à `d75fdd9`.

**[Ouvrir la preview](http://localhost:3000/?preview=v3-1-1)** · **[Vidéo des deux ajustements](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/final-polish-desktop.webm)**

## Hero : le message avant la décoration

- Reveal conservé, raccourci de 880 à 560 ms par ligne. La première ligne commence avec 100 ms d’avance ; les deux suivantes démarrent à 0 et 60 ms, au lieu de 110 et 220 ms.
- Première ligne lisible dès le début de la séquence CSS ; les trois lignes sont déjà lisibles à 150 ms. Le texte secondaire commence à 60 ms au lieu de 240 ms.
- Le CTA est opaque et utilisable dès la première image. Son léger mouvement de 6 px accompagne la séquence sans masquer le bouton. Le focus clavier supprime ce mouvement.
- Le monogramme, le halo, les orbites et la micro-parallaxe gardent leur rythme V3.1.

Les temps ci-dessus se rapportent au début de l’animation CSS, après rendu de la page, et non au temps de téléchargement réseau.

## Un seul moment signature : la Méthode

Sur desktop, le passage de la rangée dans la zone de lecture fait avancer une ligne du diagnostic jusqu’au prochain cap. Le numéro actif reçoit un halo discret, le titre prend la couleur d’accent et son texte se met en place sur 8 px. Les étapes précédentes restent repérées et les textes déjà révélés restent en place si l’on remonte.

Le signal de progression remplace l’ancien reveal simultané de cette rangée. Aucun changement de disposition, aucune hauteur artificielle, aucun élément épinglé, aucun scroll hijacking. Le texte des quatre étapes est toujours disponible. La progression décorative ne provoque pas d’annonces répétées aux lecteurs d’écran.

À 900 px et moins, la Méthode garde son comportement V3.1 simplifié. Avec `prefers-reduced-motion`, ou sans JavaScript, elle présente ses quatre étapes normalement, sans progression animée. Les changements de largeur et de préférence pendant la visite sont pris en charge.

## Captures et vidéo

| Vue | Capture |
| --- | --- |
| Hero desktop, première image CSS | [0 ms](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/hero-0ms-1440.png) |
| Hero desktop, message révélé | [150 ms](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/hero-150ms-1440.png) |
| Méthode desktop | [01](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/methode-etape-01-1440.png) · [02](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/methode-etape-02-1440.png) · [03](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/methode-etape-03-1440.png) · [04](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/methode-etape-04-1440.png) |
| Mobile 390 px | [Hero](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/hero-390.png) · [Méthode](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/methode-390.png) |
| Mouvement réduit, desktop | [Méthode](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1-1/methode-reduced-1440.png) |

La vidéo montre le hero puis passe directement à la Méthode, avec progression avant et retour arrière. Lecture à vitesse réelle, sans effet ajouté. Les captures du hero échantillonnent les animations CSS à des temps contrôlés ; la vidéo conserve leur lecture naturelle. Le choix cookies a été refusé pour dégager l’aperçu.

## Recette

- Build Next/OpenNext, lint et 5 tests formulaire réussis.
- 13 tests navigateur réussis sur Next et sur le Worker local. Dont trois nouveaux contrôles : message/CTA dès l’entrée, progression avant/arrière au scroll natif, repli mobile/reduced-motion/sans JavaScript.
- Contrôle axe de la Méthode active sans violation WCAG AA ciblée ; contrôles existants des routes, largeurs 320/390/768/1440, clavier, formulaire et consentement conservés.
- Aucun envoi d’email ni d’analytics réels pendant les tests.
- Audit de confidentialité : 244 fichiers et 24 ressources HTTP vérifiés, aucun marqueur ciblé détecté ; ancien portrait et version optimisée en 404.
- Chiffres, textes, assets, dépendances, configurations et logique commerciale inchangés.
- Surcoût par rapport à V3.1 : **307 octets CSS gzip + 249 octets JS gzip = 556 octets**. Aucun moteur d’animation ajouté ; réutilisation du contrôleur existant, sans boucle permanente.

## Performances

Lighthouse 13.5.0, même machine, build de production local, un passage par profil :

| Indicateur | V3.1 | V3.1.1 |
| --- | --- | --- |
| Performance mobile | 96 | **97** |
| Performance desktop | 100 | **100** |
| LCP mobile | 2,7 s | 2,5 s |
| TBT mobile | 40 ms | 40 ms |
| CLS mobile / desktop | 0 / 0 | 0 / 0 |
| Accessibilité, bonnes pratiques, SEO | 100 | 100 |

Pas de régression observée. Le point d’écart mobile peut relever de la variation normale d’une mesure unique. Rapports complets, sans `runtimeError`, dans `output/site-v3-1-1/lighthouse-mobile.json` et `lighthouse-desktop.json` ; comparaison dans `performance-summary.json`. Le CLI desktop a signalé `EPERM` au nettoyage du profil temporaire Chrome après avoir produit son rapport ; la mesure est complète.

## Reprendre la preview

`npm run build`, puis `npm start`. Pour les captures et la vidéo : `node scripts/capture-v3-1-1.mjs`. Recette Worker : `npm run cf:build`, puis `npx opennextjs-cloudflare preview --port 8787`.

Cette candidate reste locale jusqu’à validation du résultat final et autorisation de publication.
