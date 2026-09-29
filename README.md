# Mikianeli

Site personnel d’Iskander Zemouri, Media Buyer freelance. Next.js App Router, React, TypeScript et OpenNext pour Cloudflare Workers.

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
npx wrangler dev --port 8787
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

Point de retour avant V2 : commit `66c94b49bc03dd602564aeb51c3938ff5ef9386c`, version Cloudflare `ec205c20` (identifiant affiché dans Deployments). En urgence, réactiver cette version dans Workers > mikianeli > Deployments, puis réconcilier le dépôt par un commit de revert, sans force push. Les règles de zone Cloudflare ne sont pas restaurées par un rollback Worker.

URLs conservées : `/services`, `/contact`, mentions et confidentialité. `/methode` et `/secteurs` redirigent définitivement vers `/services#methode` et `/services#pour-qui`. Sitemap : cinq pages commerciales et deux pages légales. La règle de zone « Domaine canonique HTTPS mikianeli.com » renvoie HTTP et www vers HTTPS sans www en conservant chemin et paramètres.

## Contenus et visuels

Les chiffres sont datés et leurs périmètres indiqués. Les résultats IMDM ne constituent pas une promesse ; les repères Teeps sont distincts. La photo représente réellement Iskander. Les sources, décisions et limites sont consignées dans `docs/AUDIT_V2_2026-09-29.md`. L’image de partage peut être régénérée avec `node scripts/build-social-image.cjs` depuis les actifs approuvés.
