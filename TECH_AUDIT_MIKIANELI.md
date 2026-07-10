# Audit technique pre-deploiement - Mikianeli

Date : 9 juillet 2026

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

Etat global : pret pour preproduction technique. La mise en ligne officielle reste conditionnee a la creation/configuration Resend, aux variables Cloudflare, aux DNS Resend, a la bascule Infomaniak vers Cloudflare et a un test de formulaire en production.

## 2. Fichiers modifies ou ajoutes

- `.env.example` : variables Resend, site URL et tracking public.
- `.gitignore` : `*.tsbuildinfo` ignore.
- `eslint.config.mjs` : exclusion des scripts vendor `public/tarteaucitron/**`.
- `package.json` / `package-lock.json` : ajout de `resend` et `tarteaucitronjs`.
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
- `CONTACT_FROM_EMAIL=contact@mikianeli.com`

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

Recommandation de deploiement :
- ne pas configurer `output: "export"` ;
- ne pas transformer le projet en static export, car `/api/contact` doit rester fonctionnelle ;
- utiliser une strategie Cloudflare compatible full-stack Next.js, par exemple Cloudflare Workers avec OpenNext ou equivalent compatible Next.js App Router et route handlers ;
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

Build Next OK avec Turbopack.

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
- choisir la strategie full-stack Cloudflare compatible Next.js API route ;
- ajouter les IDs GTM/GA4/Meta/Google Ads si disponibles ;
- eviter le double tracking si GTM gere deja GA4/Ads/Meta ;
- verifier le bandeau cookies en production ;
- tester un envoi formulaire reel en production ;
- ajuster l'entite hebergeur Cloudflare si la configuration finale l'exige.

## 18. Conclusion

La passe finale est validee cote code : formulaire raccorde a une API route reelle, Resend integre cote serveur, tarteaucitron prepare, Cloudflare documente, pages legales mises a jour, lint/typecheck/build OK.

Le site n'est pas encore publiable sans actions manuelles externes : Resend, DNS Cloudflare, variables Cloudflare, strategie de deploiement full-stack et test d'envoi reel restent a finaliser.
