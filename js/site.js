/* ============================================================
   HaiBer Multi-Services — Site vitrine & boutique
   JavaScript autonome (aucune dépendance, fonctionne en local)
   ============================================================ */
(function () {
  'use strict';

  const WHATSAPP = 'https://wa.me/2266879710';
  const CART_KEY = 'haiber_site_cart_v1';

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const money = (n) => new Intl.NumberFormat('fr-FR').format(Math.round(n || 0));
  const priceLabel = (p) => p == null ? 'Sur devis' : money(p) + ' F';
  const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  /* ---------------- Données boutique ---------------- */
  const G = 'assets/galerie/';
  const PRODUCTS = [
    { id: 'logo', name: 'Création de logo', cat: 'Conception', price: 25000, unit: 'forfait', badge: 'Populaire', desc: 'Un signe distinctif clair, mémorable et adaptable à tous vos supports.', img: G + 'conception.jpg' },
    { id: 'plaquette', name: 'Plaquette commerciale', cat: 'Conception', price: 18000, unit: 'forfait', desc: 'Mise en page soignée pour présenter votre activité et vos offres.', img: G + 'offre-services.jpg' },
    { id: 'mise-en-page', name: 'Mise en page document', cat: 'Conception', price: 8000, unit: 'forfait', desc: 'Rapports, catalogues, bulletins et documents professionnels.', img: G + 'numerique.jpg' },
    { id: 'identite', name: 'Identité visuelle complète', cat: 'Conception', price: 45000, unit: 'forfait', badge: 'Premium', desc: 'Logo, charte couleurs, typographies et déclinaisons de marque.', img: G + 'branding.jpg' },

    { id: 'boite-350', name: 'Boîte carton 350 g', cat: 'Packaging', price: 900, unit: 'pièce · min. 100', badge: 'Best-seller', desc: 'Fond et couvercle, découpe et pliage sur mesure.', img: G + 'etiquette.jpg' },
    { id: 'boite-500', name: 'Boîte carton 500 g', cat: 'Packaging', price: 1400, unit: 'pièce · min. 100', desc: 'Carton rigide pour produits premium et cadeaux.', img: G + 'couverture.jpg' },
    { id: 'boite-kraft', name: 'Boîte papier kraft', cat: 'Packaging', price: 700, unit: 'pièce · min. 100', desc: 'Emballage naturel, personnalisable et économique.', img: G + 'etiquette.jpg' },
    { id: 'etiquette', name: 'Étiquette personnalisée', cat: 'Packaging', price: 300, unit: 'unité', desc: 'Étiquettes produit, prix ou branding, tous formats.', img: G + 'etiquette.jpg' },
    { id: 'sachet', name: 'Sachet personnalisé', cat: 'Packaging', price: 650, unit: 'm²', desc: 'Sachets imprimés pour snack, épicerie et cadeaux.', img: G + 'offre-services.jpg' },
    { id: 'depliant', name: 'Dépliant publicitaire', cat: 'Packaging', price: 500, unit: 'exemplaire', desc: 'Pliage 2 ou 3 volets pour vos campagnes.', img: G + 'offre-services.jpg' },
    { id: 'pelliculage', name: 'Pelliculage brillant / mat', cat: 'Packaging', price: 400, unit: 'm²', desc: 'Finition protectrice pour un rendu durable et élégant.', img: G + 'couverture.jpg' },
    { id: 'dorure', name: 'Dorure à chaud', cat: 'Packaging', price: 900, unit: 'm²', desc: 'Une touche métallique pour valoriser votre packaging.', img: G + 'branding.jpg' },

    { id: 'photocopie-a4', name: 'Photocopie A4', cat: 'Impression', price: 100, unit: 'page', desc: 'Copie nette et rapide pour vos documents administratifs.', img: G + 'numerique.jpg' },
    { id: 'cartes-visite', name: 'Cartes de visite (x100)', cat: 'Impression', price: 5000, unit: 'lot de 100', badge: 'Populaire', desc: 'Cartes recto ou recto-verso, avec finition au choix.', img: G + 'branding.jpg' },
    { id: 'numerique-a4', name: 'Impression numérique A4', cat: 'Impression', price: 150, unit: 'page', desc: 'Impression couleur ou noir et blanc, petit et grand tirage.', img: G + 'numerique.jpg' },
    { id: 'numerique-a3', name: 'Impression numérique A3', cat: 'Impression', price: 400, unit: 'page', desc: 'Grands formats de documents, affiches et tableaux.', img: G + 'numerique.jpg' },
    { id: 'bache', name: 'Bâche 510 g', cat: 'Impression', price: 2500, unit: 'm²', desc: 'Bâche résistante pour enseignes, événements et chantiers.', img: G + 'imprimerie.jpg' },
    { id: 'vinyle', name: 'Vinyle adhésif', cat: 'Impression', price: 3000, unit: 'm²', desc: 'Adhésif personnalisé pour vitrines, véhicules et murs.', img: G + 'imprimerie.jpg' },
    { id: 'dos-bleu', name: 'Dos bleu grand format', cat: 'Impression', price: 2000, unit: 'm²', desc: 'Support grand format économique pour affichage extérieur.', img: G + 'imprimerie.jpg' },
    { id: 'micro-perfore', name: 'Micro perforé', cat: 'Impression', price: 4000, unit: 'm²', desc: 'Vinyle micro perforé pour vitrines et habillage de véhicules.', img: G + 'imprimerie.jpg' },
    { id: 'tissu', name: 'Tissu polyester imprimé', cat: 'Impression', price: 4000, unit: 'm²', desc: 'Bannière tissu légère et réutilisable.', img: G + 'imprimerie.jpg' },
    { id: 'flyer-a5', name: 'Flyer A5', cat: 'Impression', price: null, unit: 'sur devis', desc: 'Format A5, recto ou recto-verso, idéal pour menus et contenus détaillés.', img: G + 'offre-services.jpg' },
    { id: 'flyer-sur-mesure', name: 'Flyer format sur mesure', cat: 'Impression', price: null, unit: 'sur devis', desc: 'Un format unique pour un flyer qui sort du lot.', img: G + 'offre-services.jpg' },

    { id: 'tshirt', name: 'T-shirt sérigraphié 1 couleur', cat: 'Sérigraphie', price: 2500, unit: 'pièce', badge: 'Best-seller', desc: 'Encre plastisol, coton 180 g, rendu net et durable.', img: G + 'imprimerie.jpg' },
    { id: 'serigraphie-textile', name: 'Sérigraphie textile', cat: 'Sérigraphie', price: 1200, unit: 'pièce', desc: 'Logo ou motif sur t-shirt, polo, sac et survêtement.', img: G + 'imprimerie.jpg' },
    { id: 'polo', name: 'Polo d’entreprise personnalisé', cat: 'Sérigraphie', price: null, unit: 'sur devis', desc: 'Tenue professionnelle avec logo brodé ou imprimé.', img: G + 'offre-services.jpg' },

    { id: 'plateau-resine', name: 'Plateau résine 120 × 60 cm', cat: 'Résine', price: 35000, unit: 'pièce', badge: 'Nouveau', desc: 'Plateau sur mesure, pigmenté et protégé, cure 24 h.', img: G + 'resine.jpg' },
    { id: 'resine-epoxy', name: 'Résine époxy', cat: 'Résine', price: 4200, unit: 'kg', desc: 'Résine transparente pour plateaux, bijoux et objets.', img: G + 'resine.jpg' },
    { id: 'resine-poly', name: 'Résine polyuréthane', cat: 'Résine', price: 5600, unit: 'kg', desc: 'Résine résistante pour pièces techniques et décoratives.', img: G + 'resine.jpg' },
    { id: 'resine-silicone', name: 'Silicone pour moule', cat: 'Résine', price: 6800, unit: 'kg', desc: 'Moule souple réutilisable pour formes originales.', img: G + 'resine.jpg' },

    { id: 'montage-video', name: 'Montage vidéo court', cat: 'Multi-média', price: 15000, unit: 'forfait', desc: 'Montage propre et rythmé pour réseaux sociaux ou événement.', img: G + 'offre-services.jpg' },
    { id: 'photo-produit', name: 'Photo produit', cat: 'Multi-média', price: 8000, unit: 'forfait', desc: 'Mise en scène et retouche de vos produits pour la boutique.', img: G + 'contact-visuel.jpg' },
    { id: 'animation', name: 'Animation 2D', cat: 'Multi-média', price: 25000, unit: 'forfait', desc: 'Séquence animée pour expliquer ou promouvoir votre offre.', img: G + 'offre-services.jpg' },
    { id: 'motion', name: 'Motion design', cat: 'Multi-média', price: 30000, unit: 'forfait', badge: 'Nouveau', desc: 'Logo animé, typographie et habillage en MP4, GIF ou HTML5.', img: G + 'branding.jpg' },
    { id: 'reseaux', name: 'Réseaux sociaux — mensuel', cat: 'Multi-média', price: 25000, unit: 'mois', desc: 'Création de contenus réguliers pour votre marque.', img: G + 'contact-visuel.jpg' },

    { id: 'kit1', name: 'KIT 1 — Popcorn + Bonbon + Jus', cat: 'Kits cadeaux', price: 800, unit: 'kit', desc: 'Petit kit gourmand pour événements et cadeaux.', img: G + 'couverture.jpg' },
    { id: 'kit2', name: 'KIT 2 — Popcorn + Bonbon + Jus + Haribo', cat: 'Kits cadeaux', price: 1000, unit: 'kit', desc: 'Kit gourmand agrandi, idéal pour les invités.', img: G + 'couverture.jpg' },
    { id: 'kit3', name: 'KIT 3 — Gourmandises + Chips', cat: 'Kits cadeaux', price: 1500, unit: 'kit', desc: 'Assortiment généreux pour cadeaux d’entreprise.', img: G + 'offre-services.jpg' },
    { id: 'kit4', name: 'KIT 4 — Gourmandises + Biscuit', cat: 'Kits cadeaux', price: 2000, unit: 'kit', desc: 'Kit premium pour anniversaires et célébrations.', img: G + 'offre-services.jpg' },
    { id: 'kit5', name: 'KIT 5 — Grand format cadeau', cat: 'Kits cadeaux', price: 3000, unit: 'kit', badge: 'Coup de cœur', desc: 'Le grand kit pour remercier clients et partenaires.', img: G + 'couverture.jpg' },

    { id: 'tasse-simple', name: 'Tasse personnalisée Simple', cat: 'Objets publicitaires', price: 2500, unit: 'pièce · min. 10', desc: 'Tasse imprimée au logo, idéale pour cadeaux et événements.', img: G + 'couverture.jpg' },
    { id: 'tasse-vip', name: 'Tasse personnalisée VIP', cat: 'Objets publicitaires', price: 5000, unit: 'pièce · min. 10', desc: 'Version premium pour cadeaux d’entreprise.', img: G + 'couverture.jpg' },
    { id: 'bloc-note-a5', name: 'Bloc note A5 spirale', cat: 'Objets publicitaires', price: 14900, unit: 'pièce', badge: 'Nouveau', desc: 'Images, notes et calendrier — personnalisable aux couleurs de votre marque.', img: G + 'offre-services.jpg' },
    { id: 'gourde', name: 'Gourde sublimation', cat: 'Objets publicitaires', price: 9900, unit: 'pièce · min. 1', desc: 'Gourde personnalisée en sublimation, cadeau utile et durable.', img: G + 'offre-services.jpg' },
    { id: 'tshirt-sublimation', name: 'T-shirt sublimation', cat: 'Objets publicitaires', price: 1500, unit: 'pièce · min. 10', desc: 'T-shirt inclus dans le prix, impression sublimation.', img: G + 'imprimerie.jpg' },
    { id: 'polo-dtf', name: 'Polo DTF personnalisé', cat: 'Objets publicitaires', price: 5500, unit: 'pièce · min. 10', desc: 'Polo inclus, impression DTF haute définition.', img: G + 'imprimerie.jpg' },
    { id: 'casquette', name: 'Casquette personnalisée', cat: 'Objets publicitaires', price: null, unit: 'sur devis', desc: 'Casquette brodée ou imprimée avec votre logo.', img: G + 'offre-services.jpg' },
    { id: 'porte-cle', name: 'Porte-clés personnalisé', cat: 'Objets publicitaires', price: null, unit: 'sur devis', desc: 'Petit objet publicitaire utile et original.', img: G + 'offre-services.jpg' },
    { id: 'stylo', name: 'Stylo personnalisé', cat: 'Objets publicitaires', price: null, unit: 'sur devis', desc: 'Stylo avec logo pour vos kits et événements.', img: G + 'offre-services.jpg' },

    { id: 'pack-entreprise', name: 'PACK ENTREPRISE', cat: 'Packs promotionnels', price: 75500, unit: 'pack · −20 %', badge: '−20 %', desc: 'Logo pro, entête, 100 cartes de visite, 100 flyers, 10 carnets de factures.', img: G + 'branding.jpg' },
    { id: 'pack-gadgets', name: 'PACK GADGETS', cat: 'Packs promotionnels', price: 150000, unit: 'pack · −20 %', badge: '−20 %', desc: '20 t-shirts, 20 casquettes, 10 tasses, 10 porte-clés, 10 stylos.', img: G + 'couverture.jpg' },
    { id: 'pack-cadeau', name: 'PACK CADEAU / CALENDAR', cat: 'Packs promotionnels', price: 157500, unit: 'pack · −20 %', badge: '−20 %', desc: '50 calendriers muraux, 20 de table, 100 cartes de vœux, 10 blocs-notes, 10 tasses.', img: G + 'offre-services.jpg' },
    { id: 'pack-premium', name: 'PACK PREMIUM', cat: 'Packs promotionnels', price: 165000, unit: 'pack · −20 %', badge: '−20 %', desc: 'Calendriers, cartes de vœux, blocs-notes, tasses, t-shirts, casquettes et porte-clés.', img: G + 'couverture.jpg' },

    { id: 'polycopies', name: 'Polycopiés scolaires', cat: 'Offre scolaire', price: null, unit: 'sur devis', desc: 'Cours, TD, examens et supports pédagogiques.', img: G + 'numerique.jpg' },
    { id: 'cartes-scolaires', name: 'Cartes scolaires & badges', cat: 'Offre scolaire', price: null, unit: 'sur devis', desc: 'Cartes plastifiées et badges avec photo et logo.', img: G + 'offre-services.jpg' },
    { id: 'uniformes', name: 'Uniformes scolaires', cat: 'Offre scolaire', price: null, unit: 'sur devis', desc: 'Flocage et sérigraphie des logos sur tenues.', img: G + 'imprimerie.jpg' }
  ];

  const CATEGORIES = ['Tous', 'Conception', 'Packaging', 'Impression', 'Sérigraphie', 'Résine', 'Multi-média', 'Objets publicitaires', 'Kits cadeaux', 'Packs promotionnels', 'Offre scolaire'];

  const PACKS = [
    { id: 'pack-entreprise', name: 'PACK ENTREPRISE', price: 75500, subtitle: 'Laissez-nous créer votre identité !', items: ['Création de logo professionnel', 'Conception d’une entête', '100 cartes de visite', '100 flyers', '10 carnets de factures'] },
    { id: 'pack-gadgets', name: 'PACK GADGETS', price: 150000, subtitle: 'Renforcez vos liens avec vos clients.', items: ['20 t-shirts personnalisés', '20 casquettes', '10 tasses entreprise', '10 porte-clés personnalisés', '10 stylos personnalisés'] },
    { id: 'pack-cadeau', name: 'PACK CADEAU / CALENDAR', price: 157500, subtitle: 'Un cadeau mémorable pour vos clients.', items: ['50 calendriers muraux', '20 calendriers de table', '100 cartes de vœux', '10 blocs-notes', '10 tasses entreprise'] },
    { id: 'pack-premium', name: 'PACK PREMIUM', price: 165000, subtitle: 'La formule complète pour votre marque.', items: ['50 calendriers muraux', '50 calendriers de table', '50 cartes de vœux', '20 blocs-notes', '20 tasses', '20 t-shirts', '20 casquettes', '10 porte-clés'] }
  ];

  const GADGETS = ['Tasses', 'Blocs-notes', 'Casquettes', 'T-shirts', 'Stylos', 'Porte-clés', 'Sacs', 'Gourdes', 'Emballages'];

  const BRANDING = {
    benefits: [
      'Branding véhicule complet, partiel ou total',
      'Design unique et impactant, sur mesure',
      'Matériaux supérieurs et impression résistante',
      'Lettrage adhésif, habillage vitrine et façade',
      'Pose professionnelle et garantie',
      'Intervention partout au Burkina Faso et dans la sous-région'
    ],
    steps: ['Écoute & conseil', 'Création du design', 'Impression & pose', 'Livraison ou résultat'],
    sectors: ['Restaurant', 'BTP / construction', 'Cosmétique', 'Société de nettoyage', 'Transport express', 'Événementiel']
  };

  const GRAND_FORMAT = [
    { name: 'Bâche', price: 2500, note: 'résistante, extérieur & événements' },
    { name: 'Vinyle', price: 3000, note: 'vitrines, véhicules & murs' },
    { name: 'Dos bleu', price: 2000, note: 'affichage économique' },
    { name: 'Micro perforé', price: 4000, note: 'vitrines & habillage véhicule' }
  ];

  const GALLERY = [
    { file: 'couverture.jpg', caption: 'Couverture HaiBer Multi-Services', layout: 'wide tall' },
    { file: 'branding.jpg', caption: 'Branding & identité visuelle', layout: '' },
    { file: 'conception.jpg', caption: 'Conception graphique', layout: '' },
    { file: 'numerique.jpg', caption: 'Impression numérique', layout: '' },
    { file: 'imprimerie.jpg', caption: 'Imprimerie & sérigraphie', layout: 'tall' },
    { file: 'resine.jpg', caption: 'Atelier résine', layout: '' },
    { file: 'offre-services.jpg', caption: 'Offre de services HaiBer', layout: '' },
    { file: 'etiquette.jpg', caption: 'Étiquettes & packaging', layout: 'wide' },
    { file: 'contact-visuel.jpg', caption: 'Visuel de contact', layout: '' }
  ];

  const SCHOOL_SERVICES = [
    'Photocopie de documents administratifs',
    'Impression de bulletins, fiches et convocations',
    'Reliure et plastification',
    'Polycopiés (cours, TD, examens)',
    'Cartes scolaires et badges',
    'Affiches éducatives et supports visuels',
    'Impression de sujets d’examen',
    'Mise en page de documents',
    'Impression de logos sur tenues',
    'Sérigraphie / flocage',
    'Fourniture de tee-shirts ou polos scolaires',
    'Tarifs réduits pour les gros volumes'
  ];

  /* ---------------- Configuration du devis ---------------- */
  const QUOTE = {
    'Conception': {
      icon: '🎨', qty: 1, qtyLabel: 'Nombre de forfaits',
      options: [
        { label: 'Logo', price: 25000 }, { label: 'Plaquette', price: 18000 },
        { label: 'Mise en page', price: 8000 }, { label: 'Identité visuelle', price: 45000 }
      ],
      extras: [
        { label: 'Révisions supplémentaires', price: 5000 },
        { label: 'Préflight CMYK', price: 3000 },
        { label: 'BAT validé', price: 5000 }
      ]
    },
    'Packaging': {
      icon: '📦', qty: 100, qtyLabel: 'Quantité de boîtes',
      options: [
        { label: 'Carton 350 g', price: 900 }, { label: 'Carton 500 g', price: 1400 },
        { label: 'Papier kraft', price: 700 }, { label: 'Étiquette', price: 300 }
      ],
      extras: [
        { label: 'Outillage de découpe', price: 15000 },
        { label: 'Pelliculage', price: 400 },
        { label: 'Dorure', price: 900 },
        { label: 'Optimisation sur feuille', price: 0 }
      ]
    },
    'Impression': {
      icon: '🖨️', qty: 100, qtyLabel: 'Nombre de pages / m²',
      options: [
        { label: 'Numérique A4', price: 150 }, { label: 'Numérique A3', price: 400 },
        { label: 'Bâche 510 g', price: 2500 }, { label: 'Vinyle adhésif', price: 3000 },
        { label: 'Dos bleu', price: 2000 }, { label: 'Micro perforé', price: 4000 },
        { label: 'Tissu polyester', price: 4000 },
        { label: 'Flyer A5 recto (sur devis)', price: 0 },
        { label: 'Flyer A5 recto-verso (sur devis)', price: 0 },
        { label: 'Flyer sur mesure (sur devis)', price: 0 }
      ],
      extras: [
        { label: 'Fond perdu contrôlé', price: 3000 },
        { label: 'BAT avant tirage', price: 5000 },
        { label: 'Papier 90 à 135 g/m² (distribution massive)', price: 0 },
        { label: 'Livraison / expédition (sur devis)', price: 0 }
      ]
    },
    'Sérigraphie': {
      icon: '👕', qty: 50, qtyLabel: 'Nombre de pièces',
      options: [
        { label: 'T-shirt 1 couleur', price: 2500 },
        { label: 'Sérigraphie textile', price: 1200 },
        { label: 'Sac personnalisé', price: 1800 }
      ],
      extras: [
        { label: 'Deuxième couleur', price: 1200 },
        { label: 'Impression au dos', price: 1200 },
        { label: 'Cadre sérigraphique', price: 3500 }
      ]
    },
    'Résine': {
      icon: '💎', qty: 1, qtyLabel: 'Nombre de pièces / kg',
      options: [
        { label: 'Plateau 120 × 60 cm', price: 35000 },
        { label: 'Résine époxy', price: 4200 },
        { label: 'Résine polyuréthane', price: 5600 },
        { label: 'Silicone pour moule', price: 6800 }
      ],
      extras: [
        { label: 'Moule silicone sur mesure', price: 15000 },
        { label: 'Pigment + paillettes', price: 2000 },
        { label: 'Cure 24 h contrôlée', price: 0 }
      ]
    },
    'Multi-média': {
      icon: '🎬', qty: 1, qtyLabel: 'Nombre de forfaits',
      options: [
        { label: 'Montage vidéo', price: 15000 }, { label: 'Photo produit', price: 8000 },
        { label: 'Animation 2D', price: 25000 }, { label: 'Motion design', price: 30000 },
        { label: 'Abonnement réseaux sociaux', price: 25000 }
      ],
      extras: [
        { label: 'Logo animé', price: 12000 }, { label: 'Style 3D', price: 25000 },
        { label: 'Voix off', price: 8000 }, { label: 'Sous-titres', price: 3000 },
        { label: 'Export GIF / HTML5', price: 7000 }
      ]
    },
    'Kits cadeaux': {
      icon: '🎁', qty: 10, qtyLabel: 'Nombre de kits',
      options: [
        { label: 'KIT 1 — 800 F', price: 800 }, { label: 'KIT 2 — 1 000 F', price: 1000 },
        { label: 'KIT 3 — 1 500 F', price: 1500 }, { label: 'KIT 4 — 2 000 F', price: 2000 },
        { label: 'KIT 5 — 3 000 F', price: 3000 }
      ],
      extras: [
        { label: 'Personnalisation du ruban', price: 500 },
        { label: 'Emballage cadeau premium', price: 300 }
      ]
    },
    'Objets publicitaires': {
      icon: '🎁', qty: 10, qtyLabel: 'Nombre de pièces',
      options: [
        { label: 'Tasse Simple', price: 2500 }, { label: 'Tasse VIP', price: 5000 },
        { label: 'Bloc note A5 spirale', price: 14900 }, { label: 'Gourde sublimation', price: 9900 },
        { label: 'T-shirt sublimation', price: 1500 }, { label: 'Polo DTF', price: 5500 },
        { label: 'Casquette (sur devis)', price: 0 }, { label: 'Porte-clés (sur devis)', price: 0 },
        { label: 'Stylo (sur devis)', price: 0 }
      ],
      extras: [
        { label: 'Conception gratuite', price: 0 },
        { label: 'Emballage cadeau', price: 300 },
        { label: 'Livraison / expédition (sur devis)', price: 0 }
      ]
    },
    'Packs promotionnels': {
      icon: '💥', qty: 1, qtyLabel: 'Nombre de packs',
      options: PACKS.map(p => ({ label: p.name + ' — ' + money(p.price) + ' F', price: p.price })),
      extras: [
        { label: 'Remise promo −20 % déjà incluse', price: 0 },
        { label: 'Livraison / expédition (sur devis)', price: 0 }
      ]
    },
    'Branding véhicule': {
      icon: '🚚', qty: 1, qtyLabel: 'Nombre de véhicules',
      options: [
        { label: 'Lettrage adhésif (sur devis)', price: 0 },
        { label: 'Habillage partiel (sur devis)', price: 0 },
        { label: 'Habillage complet (sur devis)', price: 0 },
        { label: 'Vitrine & façade (sur devis)', price: 0 }
      ],
      extras: [
        { label: 'Maquette & devis gratuits', price: 0 },
        { label: 'Pose professionnelle garantie', price: 0 },
        { label: 'Intervention sous-région (sur devis)', price: 0 }
      ]
    },
    'Offre scolaire': {
      icon: '📚', qty: 100, qtyLabel: 'Nombre d’exemplaires',
      options: [
        { label: 'Photocopie A4', price: 100 }, { label: 'Polycopié A4', price: 150 },
        { label: 'Carte scolaire', price: 300 }, { label: 'Uniforme personnalisé', price: 2500 }
      ],
      extras: [
        { label: 'Reliure', price: 200 },
        { label: 'Plastification', price: 150 },
        { label: 'Livraison à l’école', price: 0 }
      ]
    },
    'Accompagnement': {
      icon: '🤝', qty: 1, qtyLabel: 'Nombre de forfaits',
      options: [
        { label: 'Forfait découverte', price: 25000 },
        { label: 'Accompagnement 360°', price: 45000 }
      ],
      extras: [
        { label: 'Stratégie de marque', price: 15000 },
        { label: 'Création de contenu', price: 12000 },
        { label: 'Suivi mensuel', price: 20000 }
      ]
    }
  };

  const SERVICE_MAP = {
    'Conception': 'Conception', 'Conception graphique': 'Conception',
    'Packaging': 'Packaging', 'Impression': 'Impression',
    'Sérigraphie': 'Sérigraphie', 'Sérigraphie textile': 'Sérigraphie',
    'Résine': 'Résine', 'Atelier résine': 'Résine',
    'Multi-média': 'Multi-média', 'Objets publicitaires': 'Objets publicitaires',
    'Kits cadeaux': 'Kits cadeaux', 'Kit cadeau': 'Kits cadeaux',
    'Packs promotionnels': 'Packs promotionnels', 'Branding véhicule': 'Branding véhicule',
    'Offre scolaire': 'Offre scolaire',
    'Accompagnement': 'Accompagnement', 'Autre demande': 'Accompagnement'
  };

  /* ---------------- État ---------------- */
  let activeFilter = 'Tous';
  let activeSort = 'popular';
  let searchTerm = '';
  let cart = loadCart();
  let lightboxIndex = 0;
  let quote = freshQuote();

  function freshQuote() {
    return { step: 0, atelier: null, prestation: '', qty: 1, extras: [], express: false, notes: '', name: '', phone: '', email: '' };
  }

  function loadCart() {
    try { const v = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* stockage indisponible */ }
  }

  /* ---------------- Utilitaires DOM ---------------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  let toastTimer;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  function openWa(message) {
    window.open(WHATSAPP + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
  }

  function productById(id) { return PRODUCTS.find(p => p.id === id); }

  /* ---------------- Boutique ---------------- */
  function renderFilters() {
    $('#filters').innerHTML = CATEGORIES.map(c =>
      `<button class="filter-chip${c === activeFilter ? ' active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join('');
    $$('.filter-chip').forEach(b => b.onclick = () => {
      activeFilter = b.dataset.cat;
      renderFilters();
      renderProducts();
    });
    $$('.category-pill').forEach(b => b.classList.toggle('active', b.dataset.filter === activeFilter));
  }

  function renderProducts() {
    let list = PRODUCTS.filter(p => {
      const okCat = activeFilter === 'Tous' || p.cat === activeFilter;
      const q = normalize(searchTerm.trim());
      const okSearch = !q || normalize(p.name + ' ' + p.desc + ' ' + p.cat).includes(q);
      return okCat && okSearch;
    });

    if (activeSort === 'price-asc') list.sort((a, b) => (a.price == null ? Infinity : a.price) - (b.price == null ? Infinity : b.price));
    else if (activeSort === 'price-desc') list.sort((a, b) => (b.price == null ? -1 : b.price) - (a.price == null ? 0 : a.price));
    else if (activeSort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'fr'));

    $('#product-grid').innerHTML = list.map(p => `
      <article class="product-card">
        <div class="product-media">
          <img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">
          ${p.badge ? `<span class="product-badge${p.badge === 'Premium' || p.badge === 'Coup de cœur' ? ' pink' : p.badge === 'Nouveau' ? ' orange' : ''}">${esc(p.badge)}</span>` : ''}
        </div>
        <div class="product-body">
          <span class="product-cat">${esc(p.cat)}</span>
          <h3>${esc(p.name)}</h3>
          <p class="product-desc">${esc(p.desc)}</p>
          <div class="product-meta"><span class="product-price">${esc(priceLabel(p.price))}</span><span class="product-unit">/ ${esc(p.unit)}</span></div>
          <div class="product-actions">
            <button class="btn btn-primary" data-add="${esc(p.id)}">${p.price == null ? 'Ajouter au panier' : 'Ajouter'}</button>
            <button class="quote-icon" data-quote-product="${esc(p.id)}" title="Demander un devis" aria-label="Demander un devis pour ${esc(p.name)}">✦</button>
          </div>
        </div>
      </article>`).join('');

    $('#empty-state').hidden = list.length > 0;

    $$('[data-add]').forEach(b => b.onclick = () => addToCart(b.dataset.add));
    $$('[data-quote-product]').forEach(b => b.onclick = () => {
      const p = productById(b.dataset.quoteProduct);
      const atelier = SERVICE_MAP[p.cat] || 'Accompagnement';
      openQuote(atelier, p.name);
    });
  }

  function packOptionLabel(p) { return p.name + ' — ' + money(p.price) + ' F'; }

  function renderPromos() {
    $('#promo-grid').innerHTML = PACKS.map(p => `
      <article class="promo-card reveal">
        <div class="promo-card-top"><span class="promo-badge">−20 %</span><span class="promo-kicker">Pack complet</span></div>
        <h3>${esc(p.name)}</h3>
        <p class="promo-subtitle">${esc(p.subtitle)}</p>
        <ul class="promo-items">${p.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <div class="promo-price"><b>${money(p.price)} F</b><span>le pack</span></div>
        <div class="promo-actions">
          <button class="btn btn-primary" data-promo-add="${esc(p.id)}">Ajouter au panier</button>
          <button class="quote-icon" data-promo-quote="${esc(p.id)}" title="Demander un devis" aria-label="Demander un devis pour ${esc(p.name)}">✦</button>
        </div>
      </article>`).join('');
    $$('[data-promo-add]').forEach(b => b.onclick = () => addToCart(b.dataset.promoAdd));
    $$('[data-promo-quote]').forEach(b => b.onclick = () => {
      const p = PACKS.find(x => x.id === b.dataset.promoQuote);
      if (p) openQuote('Packs promotionnels', packOptionLabel(p));
    });
  }

  function renderGadgets() {
    $('#gadget-chips').innerHTML = GADGETS.map(g => `<span>${esc(g)}</span>`).join('');
  }

  function renderBranding() {
    $('#branding-benefits').innerHTML = BRANDING.benefits.map(b => `<div class="branding-benefit"><span>✓</span>${esc(b)}</div>`).join('');
    $('#branding-steps').innerHTML = BRANDING.steps.map((s, i) => `<div class="mini-step"><b>${String(i + 1).padStart(2, '0')}</b><span>${esc(s)}</span></div>`).join('');
    $('#branding-sectors').innerHTML = BRANDING.sectors.map(s => `<span>${esc(s)}</span>`).join('');
  }

  function renderGrandFormat() {
    $('#grandformat-list').innerHTML = GRAND_FORMAT.map(t => `
      <div class="tarif-item">
        <b>${esc(t.name)}</b>
        <span>${esc(t.note)}</span>
        <strong>${money(t.price)} F<small>/m²</small></strong>
      </div>`).join('');
  }

  /* ---------------- Panier ---------------- */
  function addToCart(id) {
    const p = productById(id);
    if (!p) return;
    const line = cart.find(x => x.id === id);
    if (line) line.qty += 1;
    else cart.push({ id, qty: 1 });
    saveCart();
    renderCart();
    openCart();
    toast(p.name + ' ajouté à votre sélection');
  }

  function changeQty(id, delta) {
    const line = cart.find(x => x.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter(x => x.id !== id);
    saveCart();
    renderCart();
  }

  function renderCart() {
    const count = cart.reduce((a, x) => a + x.qty, 0);
    $('#cart-count').dataset.count = count;

    const lines = cart.map(x => {
      const p = productById(x.id);
      if (!p) return '';
      const total = p.price == null ? 'Sur devis' : money(p.price * x.qty) + ' F';
      return `<div class="cart-line">
        <img src="${esc(p.img)}" alt="">
        <div class="cart-line-info"><b>${esc(p.name)}</b><small>${esc(p.cat)} · ${esc(priceLabel(p.price))}</small>
          <div class="qty-control"><button data-dec="${esc(p.id)}" aria-label="Diminuer">−</button><b>${x.qty}</b><button data-inc="${esc(p.id)}" aria-label="Augmenter">+</button></div>
        </div>
        <div><div class="cart-line-price">${esc(total)}</div><button class="cart-line-remove" data-remove="${esc(p.id)}">Retirer</button></div>
      </div>`;
    }).join('');

    $('#cart-items').innerHTML = lines || `<div class="cart-empty"><span>🛍️</span><h4>Votre panier est vide</h4><p>Explorez la boutique et ajoutez vos produits préférés.</p><button class="btn btn-outline" id="empty-shop">Voir la boutique</button></div>`;

    const total = cart.reduce((a, x) => { const p = productById(x.id); return a + (p && p.price != null ? p.price * x.qty : 0); }, 0);
    $('#cart-total').textContent = money(total) + ' F';

    $$('[data-inc]').forEach(b => b.onclick = () => changeQty(b.dataset.inc, 1));
    $$('[data-dec]').forEach(b => b.onclick = () => changeQty(b.dataset.dec, -1));
    $$('[data-remove]').forEach(b => b.onclick = () => { cart = cart.filter(x => x.id !== b.dataset.remove); saveCart(); renderCart(); });
    const emptyShop = $('#empty-shop');
    if (emptyShop) emptyShop.onclick = () => { closeCart(); $('#boutique').scrollIntoView({ behavior: 'smooth' }); };
  }

  function openCart() {
    $('#drawer-overlay').hidden = false;
    $('#cart-drawer').classList.add('open');
    $('#cart-drawer').setAttribute('aria-hidden', 'false');
    $('#cart-drawer').removeAttribute('inert');
    document.body.classList.add('no-scroll');
  }
  function closeCart() {
    $('#drawer-overlay').hidden = true;
    $('#cart-drawer').classList.remove('open');
    $('#cart-drawer').setAttribute('aria-hidden', 'true');
    $('#cart-drawer').setAttribute('inert', '');
    if ($('#modal-root').hidden) document.body.classList.remove('no-scroll');
  }

  function cartMessage() {
    const rows = cart.map(x => {
      const p = productById(x.id);
      return p ? `• ${p.name} × ${x.qty} — ${priceLabel(p.price)}` : '';
    }).filter(Boolean);
    return `Bonjour HaiBer, voici ma sélection :\n\n${rows.join('\n')}\n\nTotal estimé : ${$('#cart-total').textContent}\nMerci de me préparer un devis.`;
  }

  /* ---------------- Devis en ligne ---------------- */
  function openQuote(atelier, prestation) {
    quote = freshQuote();
    if (atelier && QUOTE[atelier]) {
      quote.atelier = atelier;
      quote.step = 1;
      quote.prestation = (prestation && QUOTE[atelier].options.some(o => o.label === prestation)) ? prestation : QUOTE[atelier].options[0].label;
      quote.qty = QUOTE[atelier].qty;
    }
    $('#modal-root').hidden = false;
    document.body.classList.add('no-scroll');
    renderQuoteStep();
  }

  function closeQuote() {
    $('#modal-root').hidden = true;
    $('#modal-root').innerHTML = '';
    if (!$('#cart-drawer').classList.contains('open')) document.body.classList.remove('no-scroll');
  }

  function estimate() {
    const cfg = QUOTE[quote.atelier];
    if (!cfg) return 0;
    const opt = cfg.options.find(o => o.label === quote.prestation) || cfg.options[0];
    const extras = quote.extras.reduce((a, label) => {
      const ex = cfg.extras.find(e => e.label === label);
      return a + (ex ? ex.price : 0);
    }, 0);
    let total = (opt.price * Math.max(1, quote.qty)) + extras;
    if (quote.express) total *= 1.25;
    if (quote.atelier === 'Résine') total *= 1.08;
    return Math.round(total);
  }

  function renderQuoteStep() {
    const root = $('#modal-root');
    const cfg = QUOTE[quote.atelier];
    const dots = [0, 1, 2].map(i => `<span class="quote-step-dot${quote.step > i ? ' done' : quote.step === i ? ' current' : ''}"></span>`).join('');
    let body = '';
    let foot = '';

    if (quote.step === 0) {
      body = `<p class="quote-step-title">1. Choisissez votre atelier</p>
        <div class="atelier-options">${Object.keys(QUOTE).map(k =>
          `<button class="atelier-option${quote.atelier === k ? ' selected' : ''}" data-atelier="${esc(k)}"><span>${QUOTE[k].icon}</span><b>${esc(k)}</b></button>`
        ).join('')}</div>`;
      foot = `<button class="btn btn-soft" data-quote-close>Annuler</button><button class="btn btn-primary" id="quote-next" disabled>Continuer →</button>`;
    } else if (quote.step === 1) {
      body = `<p class="quote-step-title">2. Précisez votre besoin — ${esc(quote.atelier)}</p>
        <div class="quote-form">
          <div class="form-row">
            <label>Prestation<select id="q-prestation">${cfg.options.map(o =>
              `<option${o.label === quote.prestation ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select></label>
            <label>${esc(cfg.qtyLabel)}<input id="q-qty" type="number" min="1" value="${quote.qty}"></label>
          </div>
          <label>Options complémentaires</label>
          <div class="quote-checks">${cfg.extras.map(e =>
            `<label class="quote-check"><input type="checkbox" value="${esc(e.label)}"${quote.extras.includes(e.label) ? ' checked' : ''}><span>${esc(e.label)}${e.price ? ' · +' + money(e.price) + ' F' : ' · inclus'}</span></label>`
          ).join('')}</div>
          <div class="quote-checks"><label class="quote-check"><input type="checkbox" id="q-express"${quote.express ? ' checked' : ''}><span>Expression +25 %</span></label></div>
          <label>Précisions (format, délai, couleurs…)<textarea id="q-notes" rows="3" placeholder="Ex. : 100 boîtes 24×18×8 cm, impression recto, livraison à Ouagadougou">${esc(quote.notes)}</textarea></label>
          <div class="estimate-box"><div><span>Estimation indicative</span><div class="estimate-note">Prix final confirmé après étude de votre dossier et BAT.</div></div><b id="q-estimate">${money(estimate())} FCFA</b></div>
        </div>`;
      foot = `<button class="btn btn-soft" id="quote-back">Retour</button><button class="btn btn-primary" id="quote-next">Continuer →</button>`;
    } else {
      const opt = cfg.options.find(o => o.label === quote.prestation) || cfg.options[0];
      body = `<p class="quote-step-title">3. Vos coordonnées et envoi</p>
        <div class="quote-recap"><b>${esc(quote.atelier)}</b> · ${esc(opt.label)} × ${quote.qty}${quote.extras.length ? ' · ' + esc(quote.extras.join(', ')) : ''}${quote.express ? ' · express' : ''}</div>
        <div class="quote-form" style="margin-top:16px">
          <div class="form-row">
            <label>Votre nom<input id="q-name" value="${esc(quote.name)}" placeholder="Prénom et nom"></label>
            <label>Téléphone<input id="q-phone" value="${esc(quote.phone)}" placeholder="+226 …"></label>
          </div>
          <label>E-mail (facultatif)<input id="q-email" value="${esc(quote.email)}" placeholder="vous@exemple.com"></label>
          <div class="estimate-box"><div><span>Estimation totale</span><div class="estimate-note">Elle sera jointe à votre demande WhatsApp.</div></div><b>${money(estimate())} FCFA</b></div>
        </div>`;
      foot = `<button class="btn btn-soft" id="quote-back">Retour</button><button class="btn btn-primary" id="quote-send">Envoyer sur WhatsApp →</button>`;
    }

    root.innerHTML = `<div class="quote-modal">
      <div class="quote-modal-head"><div><span class="section-tag">Devis en ligne</span><h3>Créer mon devis</h3><p>Étape ${quote.step + 1} sur 3 · Une estimation immédiate, sans engagement.</p></div><button class="icon-btn" data-quote-close aria-label="Fermer">✕</button></div>
      <div class="quote-steps">${dots}</div>
      <div class="quote-modal-body">${body}</div>
      <div class="quote-modal-foot">${foot}</div>
    </div>`;

    $$('[data-quote-close]', root).forEach(b => b.onclick = closeQuote);
    const next = $('#quote-next', root);
    if (next && quote.step === 0) next.disabled = !quote.atelier;
    if (next) next.onclick = () => {
      if (quote.step === 0) {
        if (!quote.atelier) return;
        quote.qty = QUOTE[quote.atelier].qty;
        quote.prestation = QUOTE[quote.atelier].options[0].label;
      } else {
        syncQuoteForm();
      }
      quote.step = Math.min(2, quote.step + 1);
      renderQuoteStep();
    };
    const back = $('#quote-back', root);
    if (back) back.onclick = () => { quote.step = Math.max(0, quote.step - 1); renderQuoteStep(); };

    if (quote.step === 0) {
      $$('[data-atelier]', root).forEach(b => b.onclick = () => {
        quote.atelier = b.dataset.atelier;
        $$('[data-atelier]', root).forEach(x => x.classList.toggle('selected', x === b));
        next.disabled = false;
      });
    }

    if (quote.step === 1) {
      const update = () => { syncQuoteForm(); const el = $('#q-estimate', root); if (el) el.textContent = money(estimate()) + ' FCFA'; };
      $('#q-prestation', root).onchange = update;
      $('#q-qty', root).oninput = update;
      $('#q-express', root).onchange = update;
      $$('.quote-check input[value]', root).forEach(cb => cb.onchange = update);
      $('#q-notes', root).oninput = update;
    }

    if (quote.step === 2) {
      $('#quote-send', root).onclick = () => {
        quote.name = $('#q-name', root).value.trim();
        quote.phone = $('#q-phone', root).value.trim();
        quote.email = $('#q-email', root).value.trim();
        if (!quote.name || !quote.phone) { toast('Indiquez votre nom et votre téléphone'); return; }
        const cfg2 = QUOTE[quote.atelier];
        const opt2 = cfg2.options.find(o => o.label === quote.prestation) || cfg2.options[0];
        const msg = [
          'Bonjour HaiBer, je souhaite un devis.',
          '',
          'Atelier : ' + quote.atelier,
          'Prestation : ' + opt2.label + ' × ' + quote.qty,
          quote.extras.length ? 'Options : ' + quote.extras.join(', ') : '',
          quote.express ? 'Express : oui (+25 %)' : '',
          quote.notes ? 'Précisions : ' + quote.notes : '',
          'Estimation indicative : ' + money(estimate()) + ' FCFA',
          '',
          'Nom : ' + quote.name,
          'Téléphone : ' + quote.phone,
          quote.email ? 'E-mail : ' + quote.email : ''
        ].filter(Boolean).join('\n');
        closeQuote();
        openWa(msg);
        toast('Votre devis est prêt dans WhatsApp');
      };
    }
  }

  function syncQuoteForm() {
    const root = $('#modal-root');
    const prestation = $('#q-prestation', root);
    const qty = $('#q-qty', root);
    const notes = $('#q-notes', root);
    const express = $('#q-express', root);
    if (prestation) quote.prestation = prestation.value;
    if (qty) quote.qty = Math.max(1, parseInt(qty.value, 10) || 1);
    if (notes) quote.notes = notes.value;
    if (express) quote.express = express.checked;
    quote.extras = $$('.quote-check input[value]:checked', root).map(cb => cb.value);
  }

  /* ---------------- Galerie / lightbox ---------------- */
  function renderGallery() {
    $('#gallery-grid').innerHTML = GALLERY.map((g, i) => `
      <button class="gallery-item ${g.layout}" data-gallery="${i}" aria-label="Agrandir : ${esc(g.caption)}">
        <img src="${esc(G + g.file)}" alt="${esc(g.caption)}" loading="lazy">
        <span class="gallery-caption">${esc(g.caption)}</span>
      </button>`).join('');
    $$('[data-gallery]').forEach(b => b.onclick = () => openLightbox(parseInt(b.dataset.gallery, 10)));
  }

  function openLightbox(i) {
    lightboxIndex = (i + GALLERY.length) % GALLERY.length;
    const g = GALLERY[lightboxIndex];
    $('#lightbox-img').src = G + g.file;
    $('#lightbox-img').alt = g.caption;
    $('#lightbox-caption').textContent = g.caption;
    $('#lightbox').hidden = false;
    document.body.classList.add('no-scroll');
  }
  function closeLightbox() {
    $('#lightbox').hidden = true;
    if (!$('#modal-root').hidden || $('#cart-drawer').classList.contains('open')) return;
    document.body.classList.remove('no-scroll');
  }

  /* ---------------- Initialisation ---------------- */
  function init() {
    $('#year').textContent = new Date().getFullYear();
    $('#school-list').innerHTML = SCHOOL_SERVICES.map(s => `<li>${esc(s)}</li>`).join('');

    renderFilters();
    renderProducts();
    renderPromos();
    renderGadgets();
    renderBranding();
    renderGrandFormat();
    renderCart();
    renderGallery();

    // Recherche
    $('#site-search').addEventListener('input', (e) => { searchTerm = e.target.value; renderProducts(); });
    $('#search-form').addEventListener('submit', (e) => {
      e.preventDefault();
      $('#boutique').scrollIntoView({ behavior: 'smooth' });
    });
    $('#reset-filters').onclick = () => {
      activeFilter = 'Tous'; searchTerm = ''; $('#site-search').value = '';
      renderFilters(); renderProducts();
    };
    $('#sort-products').onchange = (e) => { activeSort = e.target.value; renderProducts(); };
    $$('.category-pill').forEach(b => b.onclick = () => {
      activeFilter = b.dataset.filter;
      renderFilters(); renderProducts();
      $('#boutique').scrollIntoView({ behavior: 'smooth' });
    });

    // Panier
    $('#cart-toggle').onclick = openCart;
    $('#cart-close').onclick = closeCart;
    $('#drawer-overlay').onclick = closeCart;
    $('#cart-quote').onclick = () => {
      let atelier = 'Accompagnement';
      if (cart.length) {
        const p = productById(cart[0].id);
        atelier = (p && SERVICE_MAP[p.cat]) || 'Accompagnement';
      }
      closeCart();
      openQuote(atelier);
      const notes = $$('.quote-form textarea')[0];
      if (notes) notes.value = 'Articles du panier : ' + cart.map(x => {
        const p = productById(x.id);
        return p ? p.name + ' × ' + x.qty : '';
      }).filter(Boolean).join(', ');
      quote.notes = notes ? notes.value : '';
    };
    $('#cart-whatsapp').onclick = () => { openWa(cartMessage()); toast('Sélection envoyée dans WhatsApp'); };

    // Devis
    $('#hero-quote').onclick = () => openQuote();
    $('#open-quote').onclick = () => openQuote();
    $('#gallery-quote').onclick = () => openQuote('Conception');
    $('#branding-quote').onclick = () => openQuote('Branding véhicule');
    $$('[data-service]').forEach(b => b.onclick = () => openQuote(SERVICE_MAP[b.dataset.service] || 'Accompagnement'));

    // Galerie
    $('#lightbox-close').onclick = closeLightbox;
    $('#lightbox-prev').onclick = () => openLightbox(lightboxIndex - 1);
    $('#lightbox-next').onclick = () => openLightbox(lightboxIndex + 1);
    $('#lightbox').onclick = (e) => { if (e.target === $('#lightbox')) closeLightbox(); };

    // Formulaires
    $('#contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const data = new FormData(f);
      const msg = [
        'Bonjour HaiBer, voici ma demande depuis le site :', '',
        'Nom : ' + data.get('name'),
        'Téléphone : ' + data.get('phone'),
        data.get('email') ? 'E-mail : ' + data.get('email') : '',
        'Prestation : ' + data.get('service'), '',
        String(data.get('message') || '')
      ].filter(Boolean).join('\n');
      openWa(msg);
      toast('Message prêt dans WhatsApp');
    });
    $('#newsletter-form').addEventListener('submit', (e) => {
      e.preventDefault();
      e.currentTarget.reset();
      toast('Merci ! Vous serez informé des nouveautés HaiBer.');
    });

    // Menu mobile
    $('#menu-toggle').onclick = () => {
      const nav = $('#nav');
      nav.classList.toggle('open');
      $('#menu-toggle').setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    };
    $$('#nav a').forEach(a => a.onclick = () => {
      $('#nav').classList.remove('open');
      $('#menu-toggle').setAttribute('aria-expanded', 'false');
    });

    // Header au scroll
    const onScroll = () => $('#header').classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Liens actifs dans la navigation
    const sections = ['accueil', 'boutique', 'promotions', 'services', 'branding', 'realisations', 'devis', 'apropos', 'contact'];
    if ('IntersectionObserver' in window) {
      const navObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            $$('#nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach(id => { const el = document.getElementById(id); if (el) navObs.observe(el); });
    }

    // Animations d'apparition
    const reveals = $$('.reveal');
    if ('IntersectionObserver' in window) {
      const revObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); revObs.unobserve(en.target); }
        });
      }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => revObs.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('is-visible'));
    }

    // Clavier
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!$('#modal-root').hidden) closeQuote();
        else if (!$('#lightbox').hidden) closeLightbox();
        else if ($('#cart-drawer').classList.contains('open')) closeCart();
      }
      if (!$('#lightbox').hidden) {
        if (e.key === 'ArrowLeft') openLightbox(lightboxIndex - 1);
        if (e.key === 'ArrowRight') openLightbox(lightboxIndex + 1);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
