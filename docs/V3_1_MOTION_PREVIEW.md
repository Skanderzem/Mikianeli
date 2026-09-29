# MIKIANELI V3.1 — motion polish, preview locale

Branche : `codex/site-v3-1-motion`, depuis la V3 validée `c53b36f`. Aucun push, aucune fusion vers `main`, aucun déploiement. La production reste au hotfix `d75fdd9`.

**[Ouvrir l’aperçu](http://localhost:3000/?preview=v3-1)** · **[Voir la vidéo desktop](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/motion-desktop.webm)**

## Animations ajoutées

| Zone | V3.1 |
| --- | --- |
| Hero | Masque du titre en trois temps ; texte puis CTA décalés ; monogramme avec micro-parallaxe au pointeur et au scroll ; respiration du volume et du halo ; orbites et repères qui se dessinent. L’entrée autonome se termine en moins de cinq secondes. |
| Expertise | Les quatre cartes gardent leur position finale. Entrées depuis la droite, vers le haut, par masque et légère rotation. Surface indépendante de la coque sticky pour préserver l’empilement. Survol : lift de 5 px, halo et déplacement interne léger. |
| Statistiques | Séquence de blocs, traits verticaux tracés, masque sur les valeurs puis libellés. Aucun compteur, aucune valeur intermédiaire : les quatre chiffres restent identiques. |
| Résultats | Le chiffre et le texte se réaniment à chaque choix. L’item actif reçoit un trait animé et sa flèche accompagne la sélection. L’annonce accessible reste immédiate. |
| Texte et méthode | Entrées des titres, paragraphes, listes et étapes ; lignes séparatrices et liaisons de la méthode révélées progressivement. |
| FAQ | Rotation du « + », ouverture et fermeture fluides, arrivée douce de la réponse. Élément `details` natif conservé. Le navigateur utilise son comportement natif si l’interpolation de hauteur n’est pas disponible. |
| CTA | Entrée échelonnée, lumière de fond brève, arrivée de la flèche décorative ; reflet court et lift au survol du bouton. Liens soulignés progressivement. |

La version mobile limite les déplacements à 12–14 px, raccourcit les transitions et retire rotations d’entrée, micro-parallaxe et empilement sticky. Les mouvements réduits sont respectés dès le chargement et si la préférence change pendant la visite. Aucun mouvement décoratif infini, aucun scroll hijacking. Le clavier rend immédiatement lisible l’élément ciblé. Les liens avec ancre révèlent leur destination.

## Captures à l’état lisible

Les captures fixes montrent la composition finale, avec les reveals entièrement ouverts. La vidéo montre le comportement réel, à vitesse réelle, sans effet ajouté. Le choix cookies a été refusé pour ne pas masquer les sections.

| Section | Desktop 1440 | Mobile 390 |
| --- | --- | --- |
| Homepage | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/homepage-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/homepage-390.png) |
| Hero | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/hero-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/hero-390.png) |
| Statistiques | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/statistiques-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/statistiques-390.png) |
| Expertise | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/expertise-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/expertise-390.png) |
| Pain points | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/pain-points-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/pain-points-390.png) |
| Résultats | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/resultats-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/resultats-390.png) |
| Méthode | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/methode-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/methode-390.png) |
| FAQ ouverte | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/faq-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/faq-390.png) |
| CTA final | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/cta-final-1440.png) | [Capture](C:/Users/lion1/Documents/MIKIANELI/output/site-v3-1/cta-final-390.png) |

Vidéo : hero vers 0 s, statistiques vers 5 s, expertise vers 7 s, pain points vers 17 s, résultats vers 19 s, méthode vers 23 s, FAQ vers 25 s, CTA vers 28 s. Les horodatages précis sont dans `output/site-v3-1/video-chapters.json`.

## Technique et contrôle

- CSS + IntersectionObserver + requestAnimationFrame déclenché par les interactions. Aucun moteur d’animation ajouté, aucune boucle JavaScript permanente. Les lectures géométriques sont regroupées avant les écritures.
- Delta du build complet par rapport à V3 : **+2 073 octets CSS gzip et +915 octets JS gzip**, soit environ **3 Ko**. Compression gzip calculée sur les fichiers générés ; le transfert réel peut varier selon la compression du serveur.
- Build Next/OpenNext et lint réussis. **10 tests navigateur** réussis sur Next puis le Worker local, et **5 tests formulaire** réussis. Couverture : quatre largeurs, axe, clavier, FAQ et clics rapides, transitions des résultats, mouvement réduit en cours de session, navigation sans JavaScript, consentement, GA4 et formulaire.
- **244 fichiers source/générés et 24 ressources HTTP** scannés, aucun marqueur confidentiel ciblé détecté. Les chiffres, leur logique, les textes des pages, les données de preuve, les assets publics et les configurations GA4/API/Cloudflare sont inchangés. Aucun portrait ajouté.
- Rapports : `output/site-v3-1/playwright-worker-results.json`, `privacy-source-audit.json`, `privacy-worker.json`, `bundle-before.json`, `bundle-after.json`.

Lighthouse 13.5.0, même machine, profils simulés et build de production local :

| Indicateur | V3 | V3.1 |
| --- | --- | --- |
| Performance mobile | 95 | **96** |
| Performance desktop | 100 | **100** |
| LCP mobile | 2,9 s | 2,7 s |
| TBT mobile | 60 ms | 40 ms |
| CLS mobile / desktop | 0 / 0 | 0 / 0 |
| Accessibilité, bonnes pratiques, SEO | 100 | 100 |

Un passage par profil : le point d’écart mobile peut relever de la variation habituelle des mesures. Le résultat utile est l’absence de régression importante malgré le mouvement ajouté. Rapports complets, sans `runtimeError`. Le lancement mobile a signalé une erreur Windows `EPERM` au nettoyage du profil temporaire Chrome après l’écriture du rapport ; la mesure elle-même est complète. Comparaison dans `output/site-v3-1/performance-summary.json` ; il ne s’agit pas d’un audit de la V3.1 publiée.

## Reprendre l’aperçu

`npm run build`, puis `npm start`. Captures et vidéo : `node scripts/capture-v3-1.mjs` lorsque l’aperçu est actif. Recette Cloudflare locale : `npm run cf:build`, puis `npx opennextjs-cloudflare preview --port 8787` (sans `--remote`). Ne pas pousser cette branche ni déployer pour rendre l’aperçu accessible.
