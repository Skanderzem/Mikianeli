# Mikianeli

Site personnel d’Iskander Zemouri, Media Buyer freelance. Next.js App Router, React, TypeScript et OpenNext pour Cloudflare Workers.

**V3.1.1 candidate finale en prévisualisation locale, sur `codex/site-v3-1-motion`.** La V3.1 est globalement validée ; cette passe accélère seulement le hero et ajoute une progression à la Méthode. Aucun push, aucune fusion ni publication dans cette phase ; la production et `main` restent au hotfix de confidentialité `d75fdd9`. Voir `docs/V3_1_1_FINAL_CANDIDATE.md` pour la revue actuelle, `docs/V3_1_MOTION_PREVIEW.md` pour la passe motion précédente et `docs/V3_PREVIEW_2026-09-29.md` pour la V3 de référence.

## Développement et recette

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm start
# Dans un second terminal ; Chrome doit être installé.
npm run test:e2e
```

Les tests du formulaire utilisent un transport simulé, sans email réel. Les tests navigateur interceptent Google et l’API contact pour ne pas polluer la production. Les contrôles couvrent les pages à 320/390/768/1440 px, les erreurs serveur (y compris les préchargements RSC), axe, consentement, pages vues, validation, échec, reprise et double clic.

```sh
npm run cf:build
npx opennextjs-cloudflare preview --port 8787
# Tester aussi le bundle Worker local via TEST_BASE_URL=http://localhost:8787.
```

Le build Cloudflare utilise le runtime déclaré dans `.node-version`. Le cache webpack de production est désactivé pour éviter les caches binaires obsolètes entre Windows et Linux. La résolution `undici: 7.30.0` corrige l’avis GHSA-3wwx-pv8p-q78v des outils Cloudflare ; réévaluer cet override lors de la prochaine mise à jour de Wrangler.

Les pages publiques sont prérendues et servies par le cache Static Assets d’OpenNext, avec interception avant le serveur Next. Cette configuration réduit le CPU et corrige les erreurs 1102 observées en production sans cache. Elle convient à ce site sans revalidation dynamique : un changement de contenu exige un build. L’API contact reste dynamique. Voir la [configuration SSG OpenNext](https://opennext.js.org/cloudflare/caching).

## Configuration serveur

Trois variables restent dans Cloudflare : `RESEND_API_KEY` (secret), `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Le domaine expéditeur doit être vérifié dans Resend. Ne jamais préfixer ces variables par `NEXT_PUBLIC_`. `keep_vars: true` conserve les valeurs existantes au déploiement.

Le binding `CONTACT_RATE_LIMITER` applique cinq demandes par minute et par IP au niveau Cloudflare (compteurs locaux au point de présence, protection de base, pas plafond global). Le formulaire vérifie l’origine, la taille du flux, les champs, un honeypot et un temps minimal. Un identifiant stable et l’idempotence Resend réduisent les doublons lors des reprises. Un reçu Resend est obligatoire avant d’afficher le succès ; il confirme l’acceptation par le transport, pas une livraison garantie dans la boîte de réception.

## Mesure et consentement

Un seul GA4 : `G-2FLSSCDYLW`. Aucun chargement Google avant acceptation. Choix mémorisé 180 jours ; retrait depuis le pied de page. Événements `page_view`, `contact_click`, `generate_lead` ; ce dernier uniquement après confirmation serveur et avec consentement. Aucune valeur du formulaire n’est placée dans les événements. Les UTM acceptés ne contiennent que lettres, chiffres, tirets et underscores. Ne jamais mettre de données personnelles dans les liens de campagne.

Les mesures améliorées GA4 doivent rester désactivées pour éviter les doublons avec les pages vues manuelles. Ne pas réactiver une injection GTM ou Google Tag Gateway indépendante du consentement. Les cookies `_ga` sont réglés à treize mois sans renouvellement automatique. La durée de conservation des événements dans l’administration GA4 reste une configuration distincte.

## Publication et retour arrière

Workflow existant : GitHub `Skanderzem/Mikianeli` → Cloudflare Workers Builds. La branche `main` déclenche `npx @opennextjs/cloudflare build` puis `npx @opennextjs/cloudflare deploy`. Les autres branches exécutent l’upload de version. Exiger lint, tests, build, recette Worker et contrôle Lighthouse avant de publier.

Point de retour sûr : hotfix de confidentialité `d75fdd9`, build Cloudflare `b30a5cf9-ecd9-4525-8de1-a2abda1ce350`. Ne pas réactiver une version antérieure : elle pourrait réexposer des données client et le portrait retiré. Réconcilier ensuite le dépôt sans force push. Les règles de zone Cloudflare ne sont pas restaurées par un rollback Worker.

URLs conservées : `/services`, `/contact`, mentions et confidentialité. `/methode` et `/secteurs` redirigent définitivement vers `/services#methode` et `/services#pour-qui`. Sitemap : cinq pages commerciales et deux pages légales. La règle de zone « Domaine canonique HTTPS mikianeli.com » renvoie HTTP et www vers HTTPS sans www en conservant chemin et paramètres.

## Contenus et visuels

Les preuves publiques sont anonymisées et uniquement relatives. Les quatre métriques proviennent de périmètres distincts ; leurs réserves sont conservées dans `src/lib/results.ts`. Le registre des sources reste local, dans `output/site-v3/private-source-ledger.md`, et n’est jamais importé par l’application. Aucun portrait n’est affiché. `PersonalSection` accepte un futur portrait professionnel approuvé, sans réserver d’espace vide par défaut. L’image de partage, sans portrait, se régénère avec `node scripts/build-social-image.cjs`.

Avant toute publication autorisée : exécuter `node scripts/privacy-source-audit.mjs` après le build, puis `node scripts/privacy-audit.mjs URL_DE_PREVIEW`. Ces contrôles couvrent le HTML, les scripts, les données sérialisées, les assets et le cache de pages ; compléter par la lecture des contenus et des images. Les anciens documents d’audit sont des archives internes, pas des contenus à publier.
