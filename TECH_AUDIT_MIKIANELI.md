# Audit technique pre-deploiement - Mikianeli

Date : 10 juillet 2026

## 1. Resume

Passe finale d'integration realisee sans modifier le design valide ni le hero.

Le site dispose maintenant :
- d'une route API Next.js `POST /api/contact` pour l'envoi des demandes via Resend ;
- d'un formulaire frontend raccorde a cette API ;
- d'une configuration d'environnement documentee dans `.env.example` ;
- d'une integration tarteaucitron locale pour preparer le consentement cookies ;
- de mentions legales mises a jour avec Cloudflare comme hebergeur prevu ;
- d'une politique de confidentialite mise a jour pour les traceurs conditionnels ;
- d'un rapport de deploiement Cloudflare / Infomaniak / Resend.

Etat global : pret pour une connexion GitHub `main` vers Cloudflare Workers Builds. La mise en ligne officielle reste conditionnee a la creation/configuration Resend, aux variables Cloudflare, aux DNS Resend, a la bascule Infomaniak vers Cloudflare et a un test de formulaire en production.

## 2. Fichiers modifies ou ajoutes

- `.env.example` : variables Resend, site URL et tracking public.
- `.node-version` : Node.js `22.16.0`, version reproductible de l'image Workers Builds actuelle.
- `.gitignore` : sorties OpenNext, Wrangler et variables locales Cloudflare ignorees.
- `eslint.config.mjs` : exclusion des sorties generees `.open-next/**` et `.wrangler/**`.
- `package.json` / `package-lock.json` : ajout de `@opennextjs/cloudflare@1.20.1`, `wrangler@4.110.0` et des scripts Cloudflare.
- `next.config.ts` : initialisation du contexte Cloudflare pour le developpement local.
- `wrangler.jsonc` : Worker `mikianeli`, entree OpenNext, assets, Images et compatibilite Node.js.
- `open-next.config.ts` : configuration OpenNext minimale et explicite.
- `public/_headers` : cache immuable des assets versionnes Next.js.
- `src/app/api/contact/route.ts` : API route serveur pour le formulaire.
- `src/components/forms/ContactForm.tsx` : appel `POST /api/contact`, etats loading/succes/erreur.
- `src/components/cookies/TarteaucitronConsent.tsx` : chargement client de tarteaucitron et preparation tracking.
- `src/app/layout.tsx` : inclusion globale du composant cookies.
- `src/app/globals.css` : import CSS tarteaucitron.
- `src/app/mentions-legales/page.tsx` : hebergeur Cloudflare.
- `src/app/politique-confidentialite/page.tsx` : cookies, traceurs et formulaire mis a jour.
- `public/tarteaucitron/*` : scripts et CSS tarteaucitron servis localement.
- `TECH_AUDIT_MIKIANELI.md` : rapport actualise.

## 3. Formulaire Resend

Route creee : `src/app/api/contact/route.ts`

Fonctionnement :
- methode attendue : `POST` ;
- methodes non autorisees : reponse `405` avec `Allow: POST` ;
- donnees attendues : nom, entreprise, email, telephone, site web, secteur, objectif, message ;
- validation serveur : nom requis, email requis et valide, message requis ;
- limitation de payload : `12 000` caracteres ;
- limitations champs : nom, entreprise, email, telephone, site, secteur, objectif, message ;
- nettoyage simple : suppression caracteres de controle, trim, normalisation espaces/lignes ;
- email HTML et texte brut generes cote serveur ;
- Resend utilise uniquement cote serveur avec `RESEND_API_KEY`.

Email configure :
- From : `Mikianeli <contact@mikianeli.com>` via `CONTACT_FROM_EMAIL`
- To : `iskander@mikianeli.com` via `CONTACT_TO_EMAIL`
- Reply-To : email saisi par le prospect
- Sujet : `Nouvelle demande Mikianeli - {nom ou entreprise}`

Statut Resend : code pret, mais aucun envoi reel teste sans cle API. Sans `RESEND_API_KEY`, l'API renvoie une erreur `500` propre.

## 4. Variables d'environnement

Fichier cree : `.env.example`

Variables serveur :
- `RESEND_API_KEY=`
- `CONTACT_TO_EMAIL=iskander@mikianeli.com`
- `CONTACT_FROM_EMAIL=`

Variables publiques :
- `NEXT_PUBLIC_SITE_URL=https://mikianeli.com`
- `NEXT_PUBLIC_GTM_ID=`
- `NEXT_PUBLIC_GA4_ID=`
- `NEXT_PUBLIC_META_PIXEL_ID=`
- `NEXT_PUBLIC_GOOGLE_ADS_ID=`

Important :
- ne jamais creer `NEXT_PUBLIC_RESEND_API_KEY` ;
- ne jamais committer `.env.local` ;
- les variables publiques de tracking doivent rester vides tant que les outils ne sont pas prets.

## 5. Compte Resend et domaine

Points a faire manuellement :
- creer un compte Resend avec l'email de connexion souhaite, y compris Gmail si besoin ;
- verifier `mikianeli.com` ou un sous-domaine d'envoi dans Resend ;
- recommandation : utiliser un sous-domaine type `mail.mikianeli.com` ;
- ajouter les DNS SPF/DKIM fournis par Resend dans Cloudflare DNS ;
- verifier que `CONTACT_FROM_EMAIL=contact@mikianeli.com` est coherent avec le domaine valide dans Resend ;
- tester un envoi reel en production ou preproduction avec `RESEND_API_KEY`.

## 6. Deploiement Cloudflare

Le domaine est achete chez Infomaniak mais le site est prevu pour etre gere/heberge via Cloudflare.

Configuration de deploiement retenue :
- ne pas configurer `output: "export"` ;
- ne pas transformer le projet en static export, car `/api/contact` doit rester fonctionnelle ;
- utiliser Cloudflare Workers avec `@opennextjs/cloudflare` pour Next.js App Router et les route handlers ;
- configurer les variables d'environnement cote Cloudflare avant test formulaire.

Variables a configurer dans Cloudflare :
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GTM_ID` si utilise
- `NEXT_PUBLIC_GA4_ID` si utilise sans GTM
- `NEXT_PUBLIC_META_PIXEL_ID` si utilise sans GTM
- `NEXT_PUBLIC_GOOGLE_ADS_ID` si utilise sans GTM

## 7. DNS / Infomaniak vers Cloudflare

Etapes manuelles :
- ajouter `mikianeli.com` dans Cloudflare ;
- recuperer les nameservers fournis par Cloudflare ;
- remplacer les nameservers chez Infomaniak par ceux de Cloudflare ;
- attendre la propagation DNS ;
- ajouter les entrees DNS necessaires au site ;
- ajouter les entrees DNS Resend SPF/DKIM une fois le domaine ou sous-domaine valide ;
- verifier HTTPS, redirections et domaine canonique apres bascule.

## 8. Mentions legales

La section hebergement indique maintenant :

Cloudflare, Inc.  
101 Townsend St  
San Francisco, CA 94107  
Etats-Unis

Formulation prudente ajoutee : le site est heberge par Cloudflare, Inc., sous reserve de la configuration finale de deploiement. Une entite Cloudflare Europe pourra etre ajustee si la configuration finale l'exige.

Les informations validees conservees :
- MIKIANELI
- Iskander Zemouri
- RCS 903 180 974 R.C.S. Paris
- SIRET 903 180 974 00029
- 61 rue de Lyon, 75012 Paris, France
- `iskander@mikianeli.com`

Aucune donnee personnelle interdite n'a ete ajoutee.

## 9. Tarteaucitron / cookies

Dependance ajoutee : `tarteaucitronjs`.

Integration :
- scripts tarteaucitron servis localement depuis `public/tarteaucitron/` ;
- CSS tarteaucitron importe globalement ;
- composant client dedie : `TarteaucitronConsent`;
- inclusion unique dans `src/app/layout.tsx` ;
- aucun chargement cote serveur ;
- pas d'erreur hydration detectee ;
- aucun tag Google/Meta charge lorsque les IDs sont absents.

Services prepares :
- Google Tag Manager : `NEXT_PUBLIC_GTM_ID`
- GA4 direct : `NEXT_PUBLIC_GA4_ID`
- Google Ads direct : `NEXT_PUBLIC_GOOGLE_ADS_ID`
- Meta Pixel direct : `NEXT_PUBLIC_META_PIXEL_ID`

Choix de tracking :
- priorite a GTM comme conteneur principal ;
- si `NEXT_PUBLIC_GTM_ID` est present, seul GTM est pousse dans tarteaucitron ;
- GA4, Ads et Meta directs ne sont pousses que si GTM est absent ;
- objectif : eviter le double tracking.

## 10. Politique de confidentialite

Section cookies mise a jour avec une formulation conditionnelle :
- le site peut utiliser des cookies ou traceurs soumis au consentement ;
- les outils envisages sont GTM, GA4, Google Ads et Meta Pixel ;
- ces outils ne doivent etre actives qu'apres consentement lorsque la loi l'exige ;
- l'utilisateur peut accepter, refuser ou modifier ses choix via le bandeau ;
- les details seront ajustes selon les outils effectivement actives.

La section formulaire indique maintenant que le formulaire transmet les demandes a Mikianeli et que l'email direct reste disponible.

## 11. Tests formulaire et API

Tests API locaux :
- `GET /api/contact` : `405`
- `POST /api/contact` avec payload vide : `400`
- `POST /api/contact` avec email invalide : `400`
- `POST /api/contact` valide sans cle Resend : `500` propre

Test navigateur local :
- formulaire rempli ;
- appel API effectue ;
- sans cle Resend, message d'erreur utilisateur affiche ;
- champs conserves en cas d'echec ;
- fallback visible vers `iskander@mikianeli.com` ;
- aucun debordement horizontal ;
- aucune erreur console.

Test avec cle Resend : non effectue, car aucune cle reelle ne doit etre inventee ni exposee.

## 12. Tests tarteaucitron

Tests locaux sans IDs :
- scripts locaux tarteaucitron charges ;
- racine du bandeau presente dans le DOM ;
- aucun script Google Tag Manager, Google Analytics, Google Ads ou Meta Pixel charge ;
- aucune erreur console ;
- aucun debordement horizontal.

Test avec IDs : non effectue, car les IDs publics ne sont pas fournis. Le code est prepare pour les activer via variables d'environnement.

## 13. Performance / build

Build Next OK avec Webpack. Le developpement local reste sur Turbopack avec `npm run dev`.

Le build de production est explicitement lance avec `next build --webpack`. Cette option Next.js officielle contourne un `ChunkLoadError` observe uniquement dans le preview `workerd` genere sous Windows avec les noms de chunks Turbopack. Le build OpenNext Linux de Workers Builds est compatible avec cette commande et le rendu applicatif n'est pas modifie.

Routes :
- statiques : `/`, `/contact`, `/mentions-legales`, `/methode`, `/politique-confidentialite`, `/robots.txt`, `/secteurs`, `/services`, `/sitemap.xml`
- dynamique : `/api/contact`

Le hero n'a pas ete modifie.

## 14. Commandes executees

| Commande | Resultat |
| --- | --- |
| `git status --short` | OK, depot non suivi integralement dans cette copie |
| `npm install resend tarteaucitronjs` | OK |
| `npm run lint` | OK |
| `npx tsc --noEmit` | OK |
| `npm run build` | OK |
| `npm run cf:build` | OK, `.open-next/worker.js` genere |
| `npm run cf:preview -- --port 8787` | OK, runtime local `workerd` |
| `npm audit --omit=dev` | 2 vulnerabilites moderees liees a `postcss` dans Next |
| Tests API `/api/contact` | OK |
| Tests assets tarteaucitron HTTP | OK, reponses `200` |
| Test navigateur formulaire | OK, erreur propre sans cle Resend |
| Test navigateur tarteaucitron sans IDs | OK, aucun tag externe charge |

## 15. Resultats de validation

`npm run lint` : OK

```text
> mikianeli-site@0.1.0 lint
> eslint .
```

`npx tsc --noEmit` : OK

`npm run build` : OK

```text
Route (app)
├ ƒ /api/contact
├ ○ /
├ ○ /contact
├ ○ /mentions-legales
├ ○ /methode
├ ○ /politique-confidentialite
├ ○ /robots.txt
├ ○ /secteurs
├ ○ /services
└ ○ /sitemap.xml
```

## 16. Audit dependances

`npm audit --omit=dev` remonte toujours :
- `postcss <8.5.10`
- severite : moderate
- chemin : `node_modules/next/node_modules/postcss`
- package lie : `next`
- correctif npm propose : `npm audit fix --force`
- probleme : npm annonce un downgrade cassant vers `next@9.3.3`

Decision : ne pas executer `npm audit fix --force`. Suivre une mise a jour saine de Next/PostCSS.

## 17. Points restants avant publication

- creer le compte Resend ;
- verifier `mikianeli.com` ou `mail.mikianeli.com` dans Resend ;
- ajouter les DNS SPF/DKIM Resend dans Cloudflare ;
- configurer `RESEND_API_KEY` dans Cloudflare ;
- configurer `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL` dans Cloudflare ;
- ajouter le domaine dans Cloudflare ;
- remplacer les nameservers Infomaniak par ceux fournis par Cloudflare ;
- connecter le depot GitHub au Worker `mikianeli` avec les reglages de la section 19 ;
- ajouter les IDs GTM/GA4/Meta/Google Ads si disponibles ;
- eviter le double tracking si GTM gere deja GA4/Ads/Meta ;
- verifier le bandeau cookies en production ;
- tester un envoi formulaire reel en production ;
- ajuster l'entite hebergeur Cloudflare si la configuration finale l'exige.

## 18. Conclusion

La passe finale est validee cote code : formulaire raccorde a une API route reelle, Resend integre cote serveur, tarteaucitron prepare, Cloudflare documente, pages legales mises a jour, lint/typecheck/build OK.

Le code et la chaine de build full-stack sont prets. Aucun deploiement Cloudflare distant n'a ete lance pendant cet audit. Resend, DNS Cloudflare, variables Cloudflare et test d'envoi reel restent a finaliser manuellement.

## 19. Cloudflare Workers et OpenNext

### Versions et runtime

- Next.js : `16.2.10`
- React / React DOM : `19.2.7`
- `@opennextjs/cloudflare` : `1.20.1`
- Wrangler : `4.110.0`
- Node.js local teste : `24.14.1`
- Node.js Workers Builds epingle : `22.16.0` via `.node-version`
- Worker : `mikianeli`

Node `22.16.0` correspond a la version par defaut documentee de l'image Workers Builds au moment de l'audit. Wrangler 4.110.0 requiert Node 22 ou plus recent. Le projet a aussi ete valide localement avec Node 24.14.1.

### Fichiers de configuration

`wrangler.jsonc` declare :

- `name: "mikianeli"` ;
- `main: ".open-next/worker.js"` ;
- `keep_vars: true` ;
- `compatibility_date: "2026-07-10"` ;
- `compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]` ;
- le Custom Domain `mikianeli.com` via `routes` et `custom_domain: true` ;
- le binding statique `ASSETS` sur `.open-next/assets` ;
- le binding local et distant Cloudflare Images `IMAGES`, requis par l'optimisation `next/image` d'OpenNext.

Aucun autre domaine personnalise, route DNS supplementaire, account ID, zone ID, token, secret, binding R2, KV, D1 ou service inutile n'est declare.

`keep_vars: true` demande a Wrangler de conserver, lors des deploiements, les variables runtime et secrets deja configures depuis le tableau de bord Cloudflare lorsqu'ils ne sont pas declares dans `wrangler.jsonc`. Les variables et secrets restent donc geres dans Cloudflare et aucune valeur sensible n'est ajoutee au depot.

`mikianeli.com` est declare comme Custom Domain de production dans `wrangler.jsonc`, qui devient la source de verite pour cette association. `www.mikianeli.com` n'est pas declare comme route Wrangler : il reste redirige vers le domaine racine par la Cloudflare Redirect Rule existante.

`open-next.config.ts` est conserve volontairement avec `defineCloudflareConfig()` sans option. Il rend l'adaptateur explicite tout en utilisant les caches factices par defaut adaptes a ce site, qui n'a actuellement ni ISR dynamique ni besoin de R2. Aucun `cloudflare-env.d.ts` n'est necessaire car le code applicatif n'accede pas directement aux bindings Wrangler.

`public/_headers` applique `Cache-Control: public,max-age=31536000,immutable` a `/_next/static/*`. `.open-next/`, `.wrangler/`, `.dev.vars*`, `.next/`, `node_modules/` et les vrais fichiers `.env*` restent exclus de Git ; `.env.example` reste suivi.

### Scripts npm

| Script | Commande | Usage |
| --- | --- | --- |
| `build` | `next build --webpack` | Build Next.js de production |
| `cf:build` | `opennextjs-cloudflare build` | Build complet OpenNext |
| `cf:preview` | `opennextjs-cloudflare build && opennextjs-cloudflare preview` | Build puis preview local `workerd` |
| `cf:deploy` | `opennextjs-cloudflare build && opennextjs-cloudflare deploy` | Deploiement futur |
| `cf:upload` | `opennextjs-cloudflare build && opennextjs-cloudflare upload` | Upload futur sans activation immediate |

Les scripts `cf:deploy` et `cf:upload` n'ont pas ete executes.

### Validation locale workerd

La commande `npm run cf:preview -- --port 8787` a demarre Wrangler 4.110.0 et le runtime `workerd`, avec `ASSETS` et `IMAGES` disponibles localement.

Routes validees :

| Route | Resultat |
| --- | --- |
| `/` | `200` |
| `/services` | `200` |
| `/methode` | `200` |
| `/secteurs` | `200` |
| `/contact` | `200` |
| `/mentions-legales` | `200` |
| `/politique-confidentialite` | `200` |
| `/robots.txt` | `200` |
| `/sitemap.xml` | `200` |
| `GET /api/contact` | `405` avec `Allow: POST` |
| `POST /api/contact` vide | `400` controle |
| `POST /api/contact` invalide | `400` avec erreurs de champs |
| `POST /api/contact` valide sans `RESEND_API_KEY` | `500` controle, service non configure |

Les assets du hero, des logos, du favicon et de tarteaucitron repondent en `200`. L'endpoint `/_next/image` repond en `200`. Les assets `/_next/static/*` recoivent le cache immuable attendu.

Verification navigateur sur `1440`, `1280`, `768`, `390` et `320` px : aucun debordement horizontal, aucune image cassee, aucune erreur console et aucun probleme de rendu du hero. Toutes les pages principales ont aussi ete controlees a `390` px.

OpenNext affiche son avertissement generique indiquant que Windows n'est pas son environnement optimal. Le build et le preview `workerd` passent apres le passage du build de production a Webpack. Workers Builds execute le build sous Ubuntu 24.04, donc cet avertissement local Windows ne concerne pas l'image de build distante.

### Reglages Cloudflare Workers Builds

Creer ou selectionner dans Cloudflare un Worker nomme exactement `mikianeli`, puis connecter le depot `Skanderzem/Mikianeli`.

| Reglage | Valeur exacte |
| --- | --- |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `npx @opennextjs/cloudflare build` |
| Deploy command | `npx @opennextjs/cloudflare deploy` |
| Node.js | `.node-version` du depot : `22.16.0` |

Pour les branches non productives, la commande OpenNext recommandee est `npx @opennextjs/cloudflare upload` si une commande personnalisee est demandee. Ne pas lancer cette commande tant que le projet Cloudflare n'est pas volontairement connecte.

Build Variables a ajouter avant un build public :

- `NEXT_PUBLIC_SITE_URL=https://mikianeli.com`
- `NEXT_PUBLIC_GTM_ID=` uniquement lorsqu'un identifiant est valide
- `NEXT_PUBLIC_GA4_ID=` uniquement lorsqu'un identifiant est valide
- `NEXT_PUBLIC_META_PIXEL_ID=` uniquement lorsqu'un identifiant est valide
- `NEXT_PUBLIC_GOOGLE_ADS_ID=` uniquement lorsqu'un identifiant est valide

Variables runtime/secrets du Worker a configurer plus tard, sans les committer :

- secret `RESEND_API_KEY`
- variable `CONTACT_TO_EMAIL=iskander@mikianeli.com`
- variable `CONTACT_FROM_EMAIL=` apres validation du domaine d'envoi Resend

`NEXT_PUBLIC_*` doit etre disponible pendant la compilation. Les variables serveur de la route `/api/contact` doivent etre configurees dans les variables et secrets du Worker. Aucun secret n'a ete ajoute au depot et aucun deploiement distant Cloudflare n'a ete execute.

Documentation de reference :

- Cloudflare Next.js / OpenNext : https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Cloudflare Workers Builds : https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- Cloudflare Build image : https://developers.cloudflare.com/workers/ci-cd/builds/build-image/
- OpenNext get started : https://opennext.js.org/cloudflare/get-started
- OpenNext CLI : https://opennext.js.org/cloudflare/cli
- OpenNext environment variables : https://opennext.js.org/cloudflare/howtos/env-vars
- OpenNext image optimization : https://opennext.js.org/cloudflare/howtos/image
