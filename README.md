# Mikianeli

Site personnel d’Iskander Zemouri, Media Buyer freelance. Next.js App Router, React, TypeScript et OpenNext pour Cloudflare Workers.

**Base publiée : V3.1.1 (`03ff941`).** La section `#iskander` intègre désormais le portrait professionnel approuvé le 21 octobre 2026 : photo à gauche et présentation à droite sur ordinateur, disposition verticale sur mobile. Le positionnement, les preuves anonymisées et les animations validées sont conservés. Les documents `docs/V3_1_1_FINAL_CANDIDATE.md`, `docs/V3_1_MOTION_PREVIEW.md` et `docs/V3_PREVIEW_2026-09-29.md` décrivent les étapes précédentes.

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

Point de retour avant intégration du portrait : V3.1.1 `03ff941`, version Cloudflare `d6cfeefb-3b95-4d43-a93c-1795e4912a5b` (build `1addce48-8582-418c-8e6f-b0b64a3a7f39`). Revenir à cette version dans Workers → mikianeli → Deployments, puis réconcilier le dépôt par un revert sans force push. Ne pas réactiver une version antérieure au hotfix de confidentialité `d75fdd9` : elle pourrait réexposer des données client et le portrait retiré. Les règles de zone Cloudflare ne sont pas restaurées par un rollback Worker.

URLs conservées : `/services`, `/contact`, mentions et confidentialité. `/methode` et `/secteurs` redirigent définitivement vers `/services#methode` et `/services#pour-qui`. Sitemap : cinq pages commerciales et deux pages légales. La règle de zone « Domaine canonique HTTPS mikianeli.com » renvoie HTTP et www vers HTTPS sans www en conservant chemin et paramètres.

## Contenus et visuels

Les preuves publiques sont anonymisées et uniquement relatives. Les quatre métriques proviennent de périmètres distincts ; leurs réserves sont conservées dans `src/lib/results.ts`. Le registre des sources reste local, dans `output/site-v3/private-source-ledger.md`, et n’est jamais importé par l’application. `PersonalSection` utilise exclusivement le nouveau portrait approuvé, `public/iskander-portrait-bleu.webp` (1080 × 1080, environ 68 Ko). L’image entière et sa lumière bleue sont conservées, sans retouche ni recadrage ; elle est chargée à la demande avec des tailles adaptées à l’écran. Le portrait historique supprimé reste interdit et doit renvoyer 404. L’image de partage, sans portrait, se régénère avec `node scripts/build-social-image.cjs`.

Avant toute publication autorisée : exécuter `node scripts/privacy-source-audit.mjs` après le build, puis `node scripts/privacy-audit.mjs URL_DE_PREVIEW`. Ces contrôles couvrent le HTML, les scripts, les données sérialisées, les assets et le cache de pages ; compléter par la lecture des contenus et des images. Les anciens documents d’audit sont des archives internes, pas des contenus à publier.
