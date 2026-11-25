# HaiBer Multi-Services — Site web vitrine & boutique

Site professionnel autonome, inspiré de `visibleemballage.com`, construit à partir des données réelles de l’application **HaiBer Gestion**.

## Site en ligne

**URL publique : https://haibermultiservices564-gif.github.io/haiber-site/**

Hébergement gratuit sur GitHub Pages (dépôt public `haibermultiservices564-gif/haiber-site`, branche `main`, racine). Le fichier `.nojekyll` désactive le traitement Jekyll, `robots.txt` déclare le `sitemap.xml`, et tous les chemins sont relatifs : le site fonctionne donc dans un sous-dossier. Audits Lighthouse en ligne : **Accessibilité 100/100, Bonnes pratiques 100/100, SEO 100/100**.

## Ouvrir le site

Double-cliquez sur `index.html` (Chrome, Edge ou Firefox). Aucun serveur, aucune installation et aucune connexion Internet ne sont nécessaires. Les polices Google sont utilisées si Internet est disponible ; sinon une police système équivalente prend le relais.

## Ce que contient le site

- **Boutique en ligne** : 56 produits et prestations, chacun avec son **mockup dédié** (`assets/produits/<id>.svg`) adapté à la référence — boîtes, étiquettes, flyers, bâches, t-shirts, tasses, résine, vidéo, packs, fournitures scolaires, etc. Filtres par catégorie, recherche, tri, panier persistant (`localStorage`), quantités et total estimé.
- **Devis en ligne en 3 étapes** : choix de l'atelier, options et quantités, estimation instantanée, envoi pré-rempli vers WhatsApp. Le panier peut être converti en devis en un clic.
- **5 ateliers + accompagnement** : conception, packaging, imprimerie/sérigraphie, multi-média/motion design, résine, accompagnement 360°.
- **Offres & packs** : quatre packs promotionnels (PACK ENTREPRISE, PACK GADGETS, PACK CADEAU / CALENDAR, PACK PREMIUM), présentés avec leur contenu détaillé et une remise de −20 %.
- **Branding véhicule et objets publicitaires** : habillage complet, partiel ou total, lettrage et pose ; tasses, blocs-notes, t-shirts, casquettes, stylos, porte-clés, gourdes et sacs personnalisés.
- **Galerie des 9 visuels officiels HaiBer** avec lightbox et navigation au clavier.
- **Offre scolaire** issue de l’application, avec avantages partenaires.
- **Sections complètes** : processus de production, pourquoi nous choisir, témoignages, FAQ (dont les conseils flyers : A5, recto ou recto-verso, format sur mesure, papier 90–135 g/m²), contact avec formulaire WhatsApp, newsletter, footer, bouton WhatsApp flottant.
- **Design responsive** mobile/tablette/desktop, univers blanc haute lisibilité, accents bleu/magenta/orange, motion design (barre de progression, compteurs animés, marquee, orbites, icônes flottantes, dock d'accès rapide), accessibilité et métadonnées SEO/Open Graph.

## Identité et données utilisées

Reprise directe de l’application HaiBer Gestion :

- Nom : **HaiBer Multi-Services**
- Tagline : **« Votre communication, notre mission ! »**
- Couleurs : bleu `#3A4F9E`, magenta `#E21481`, orange `#F88F25`
- Contact WhatsApp principal HaiBer : **+226 06 87 97 10** — https://wa.me/2266879710
- Autre contact HaiBer : **+226 60 28 31 31** — `tel:+22660283131`
- E-mail : **haibermultiservices@gmail.com**
- Atelier : **Cissin, non loin de la boulangerie Wend-Konta, Ouagadougou, Burkina Faso**
- Livraison : partout au Burkina Faso et dans la sous-région, **à vos frais**
- Devise : **FCFA / XOF**
- Logo et galerie : copiés depuis `HaiBerGestion/assets/`
- Conception du site et de l’application : **Touch Unique** — **+226 55 04 15 30** (https://wa.me/22655041530). Il s’agit du crédit du créateur, **pas du support HaiBer** : les clients doivent utiliser le WhatsApp HaiBer ci-dessus.

Les prix affichés proviennent des règles métier de `js/store.js` de l’application (forfaits conception, cartons, impression, sérigraphie, résine, motion design, kits cadeaux 800 → 3 000 F). Le grand format est affiché au m² : **Bâche 2 500 F / Vinyle 3 000 F / Dos bleu 2 000 F / Micro perforé 4 000 F**. Les packs promotionnels et les objets publicitaires reprennent les champs et règles structurées de l’application.

## À personnaliser avant mise en ligne

1. **E-mail de contact** : l’adresse en service est `haibermultiservices@gmail.com` (section contact et footer de `index.html`) ; l’ancienne adresse `contact@haiber.bf` ne doit plus être utilisée.
2. **Numéros et adresse** : le support HaiBer est `+226 06 87 97 10` (https://wa.me/2266879710, constante `WHATSAPP` de `js/site.js`), l’autre contact est `+226 60 28 31 31` (`tel:`), et l’atelier est à **Cissin, non loin de la boulangerie Wend-Konta, Ouagadougou**. Vérifiez ces valeurs dans `index.html`, `js/site.js` et les données structurées du site. Le numéro `+226 55 04 15 30` est réservé au crédit **Touch Unique**, créateur du site et de l’application ; ce n’est pas le support HaiBer.
3. **Domaine personnalisé** : le site est déjà en ligne sur l'URL GitHub Pages ci-dessus. Pour passer à `haiber.bf`, ajoutez le domaine dans les paramètres GitHub Pages, puis mettez à jour `sitemap.xml`, `robots.txt`, `manifest.webmanifest` et les balises Open Graph.
4. **Prix** : modifiez le tableau `PRODUCTS` et l’objet `QUOTE` dans `js/site.js` pour refléter vos tarifs définitifs. Les tarifs grand format (Bâche 2 500 F / Vinyle 3 000 F / Dos bleu 2 000 F / Micro perforé 4 000 F le m²) et les prix des packs sont à jour.
5. **Témoignages** : les avis affichés restent des **exemples** inspirés des clients de démonstration de l’application. Remplacez-les par de vrais retours clients avant publication.
6. **Tarifs textiles à confirmer** : les montants relevés dans le PDF (`Tableau tarifaire HB.pdf`) doivent être validés avant mise en ligne : quantités minimales **100 U** ou **10 U** selon les articles, techniques **vinyle**, **180 g**, **200 g plastifié**, **DTF** et **sublimation**, et remises **−15 % / −20 %**. Ne publiez pas ces tarifs comme définitifs sans confirmation de l’atelier.

## Structure

```
HaiBerSite/
├── index.html              Toutes les sections du site
├── css/styles.css          Design system, mise en page, responsive
├── js/site.js              Produits, panier, devis, galerie, formulaires
├── assets/logo.png         Logo officiel HaiBer
├── assets/logo.jpg         Version fond blanc
├── assets/galerie/         9 visuels officiels HaiBer
├── manifest.webmanifest    Installation en PWA
├── robots.txt              Autorise l'indexation et déclare le sitemap
├── sitemap.xml             URL publique à indexer
├── .nojekyll               Désactive le traitement Jekyll sur GitHub Pages
└── README.md               Ce fichier
```

## Intégration avec l’application

Le site est volontairement séparé de `HaiBerGestion` : il ne modifie aucune donnée de l’application. Les deux systèmes partagent la même identité visuelle et les mêmes référentiels tarifaires. Pour connecter le site à un futur serveur (paiements, commandes, espace client), les points d’entrée sont `js/site.js` (fonctions `openWa`, `renderCart`, envoi de devis) et le scaffold `HaiBerGestion/server/`.
