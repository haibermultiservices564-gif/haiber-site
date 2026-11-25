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
  const P = 'assets/catalogue/';
  const PRODUCTS = [
    { id: "carte-de-visite", name: "Carte de visite", cat: "Imprimerie & Édition", price: 15000, unit: "lot de 500", badge: "Populaire",
      desc: "Cartes de visite professionnelles, recto ou recto-verso, avec finitions luxe au choix.",
      details: { Format: "90 × 54 mm", Grammage: "350 g", Quantité: "500 pièces", Autres: "Coins arrondis, vernis 3D ou pelliculage mat" },
      img: "assets/catalogue/carte-de-visite.jpg", source: "Catalogue HaiBer Multi-Services — page 4" },
    { id: "carte-scolaire", name: "Carte scolaire", cat: "Imprimerie & Édition", price: 12000, unit: "lot de 200",
      desc: "Carte scolaire plastifiée avec photo, nom et logo de l'établissement.",
      details: { Format: "90 × 54 mm", Grammage: "300 g + plastification", Quantité: "200 pièces", Autres: "Recto-verso, code QR possible" },
      img: "assets/catalogue/carte-scolaire.jpg", source: "Catalogue HaiBer Multi-Services — page 4" },
    { id: "carte-de-voeux", name: "Carte de vœux", cat: "Imprimerie & Édition", price: 18000, unit: "lot de 100",
      desc: "Carte de vœux personnalisée pour souhaiter une bonne année à vos clients et partenaires.",
      details: { Format: "105 × 148 mm", Grammage: "300 g", Quantité: "100 pièces", Autres: "Pliée, enveloppe assortie incluse" },
      img: "assets/catalogue/carte-de-voeux.jpg", source: "Catalogue HaiBer Multi-Services — page 4" },
    { id: "carte-d-invitation", name: "Carte d'invitation", cat: "Imprimerie & Édition", price: 20000, unit: "lot de 100",
      desc: "Invitation élégante pour mariages, événements et cérémonies d'entreprise.",
      details: { Format: "105 × 148 mm", Grammage: "350 g", Quantité: "100 pièces", Autres: "Personnalisation complète, dorure possible" },
      img: "assets/catalogue/carte-d-invitation.jpg", source: "Catalogue HaiBer Multi-Services — page 4" },
    { id: "depliant", name: "Dépliant", cat: "Imprimerie & Édition", price: 25000, unit: "lot de 500",
      desc: "Dépliant pour présenter vos activités, vos produits ou votre programme.",
      details: { Format: "A4 plié", Grammage: "135 g", Quantité: "500 pièces", Autres: "Pli simple, roulé ou accordéon" },
      img: "assets/catalogue/depliant.jpg", source: "Catalogue HaiBer Multi-Services — page 4" },
    { id: "flyers", name: "Flyers", cat: "Imprimerie & Édition", price: 18000, unit: "lot de 500", badge: "Populaire",
      desc: "Flyers promotionnels haute définition, du 135 g au 350 g.",
      details: { Format: "A5 (148 × 210 mm)", Grammage: "135 à 350 g", Quantité: "500 pièces", Autres: "Recto ou recto-verso" },
      img: "assets/catalogue/flyers.jpg", source: "Catalogue HaiBer Multi-Services — page 4" },
    { id: "depliant-promotionnel", name: "Dépliant promotionnel", cat: "Imprimerie & Édition", price: 26000, unit: "lot de 500",
      desc: "Dépliant grand tirage pour vos campagnes de communication et salons.",
      details: { Format: "A4 / A5", Grammage: "135 g", Quantité: "500 pièces", Autres: "Pli roulé ou accordéon, vernis mat" },
      img: "assets/catalogue/depliant-promotionnel.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "bloc-note", name: "Bloc note", cat: "Imprimerie & Édition", price: 14900, unit: "pièce", badge: "Nouveau",
      desc: "Bloc note personnalisé aux couleurs de votre marque, avec calendrier et images.",
      details: { Format: "A5 (21 × 14,8 cm)", Grammage: "90 g + dos cartonné", Quantité: "1 pièce", Autres: "50 feuillets, spirale ou agrafé" },
      img: "assets/catalogue/bloc-note.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "calendrier-de-poche", name: "Calendrier de poche", cat: "Imprimerie & Édition", price: 9000, unit: "lot de 200",
      desc: "Calendrier de poche pratique à glisser dans un portefeuille ou un sac.",
      details: { Format: "90 × 150 mm", Grammage: "350 g", Quantité: "200 pièces", Autres: "12 mois, agrafé, logo en couverture" },
      img: "assets/catalogue/calendrier-de-poche.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "cv", name: "CV professionnel", cat: "Imprimerie & Édition", price: 5000, unit: "lot de 100",
      desc: "CV mis en page et imprimé avec soin pour vos candidatures et recrutements.",
      details: { Format: "A4", Grammage: "120 g", Quantité: "100 pièces", Autres: "Recto, finition nette" },
      img: "assets/catalogue/cv.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "entete", name: "Entête personnalisée", cat: "Imprimerie & Édition", price: 12000, unit: "lot de 500",
      desc: "Papier à entête avec logo et coordonnées de votre structure.",
      details: { Format: "A4", Grammage: "100 g", Quantité: "500 pièces", Autres: "Logo, adresse, téléphone et e-mail" },
      img: "assets/catalogue/entete.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "ticket-evenement", name: "Ticket événement", cat: "Imprimerie & Édition", price: 14000, unit: "lot de 1000",
      desc: "Tickets numérotés pour concerts, conférences, tombolas et entrées payantes.",
      details: { Format: "150 × 70 mm", Grammage: "90 g", Quantité: "1000 pièces", Autres: "Numérotation et perforation" },
      img: "assets/catalogue/ticket-evenement.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "etiquettes", name: "Étiquettes", cat: "Imprimerie & Édition", price: 8000, unit: "lot de 500",
      desc: "Étiquettes adhésives pour identifier vos produits, prix ou colis.",
      details: { Format: "Sur mesure", Grammage: "Papier autocollant", Quantité: "500 pièces", Autres: "Rouleau ou planche, découpe contour" },
      img: "assets/catalogue/etiquettes.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "menu", name: "Menu", cat: "Imprimerie & Édition", price: 16000, unit: "lot de 200",
      desc: "Menu de restaurant ou de café, conçu et imprimé aux couleurs de votre établissement.",
      details: { Format: "A4 / A5", Grammage: "250 g", Quantité: "200 pièces", Autres: "Plié, pelliculage mat possible" },
      img: "assets/catalogue/menu.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "calendrier-mural", name: "Calendrier mural", cat: "Imprimerie & Édition", price: 35000, unit: "lot de 50", badge: "Coup de cœur",
      desc: "Grand calendrier mural pour vos bureaux, ateliers et points de vente.",
      details: { Format: "420 × 590 mm", Grammage: "350 g", Quantité: "50 pièces", Autres: "12 mois, bandeau personnalisé" },
      img: "assets/catalogue/calendrier-mural.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "calendrier-de-table", name: "Calendrier de table", cat: "Imprimerie & Édition", price: 18000, unit: "lot de 100",
      desc: "Calendrier de bureau avec chevalet, idéal pour vos clients et collaborateurs.",
      details: { Format: "200 × 250 mm", Grammage: "350 g", Quantité: "100 pièces", Autres: "Chevalet inclus, dos imprimé" },
      img: "assets/catalogue/calendrier-de-table.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "attestation", name: "Attestation", cat: "Imprimerie & Édition", price: 10000, unit: "lot de 50",
      desc: "Attestations et certificats nominatifs pour vos formations et événements.",
      details: { Format: "A4", Grammage: "250 g", Quantité: "50 pièces", Autres: "Personnalisation des noms et dates" },
      img: "assets/catalogue/attestation.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "facturier", name: "Facturier", cat: "Imprimerie & Édition", price: 15000, unit: "lot de 10 carnets",
      desc: "Carnets de factures numérotés pour la gestion quotidienne de votre activité.",
      details: { Format: "A4", Grammage: "80 g", Quantité: "10 carnets", Autres: "50 feuillets par carnet, triplicate" },
      img: "assets/catalogue/facturier.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "brochure", name: "Brochure", cat: "Imprimerie & Édition", price: 30000, unit: "lot de 500",
      desc: "Brochure commerciale soignée, piquée ou dos carré collé.",
      details: { Format: "A5 / A4", Grammage: "135 g", Quantité: "500 pièces", Autres: "Dos carré collé ou agrafé" },
      img: "assets/catalogue/brochure.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "kakemono", name: "Kakemono", cat: "Imprimerie & Édition", price: 45000, unit: "pièce",
      desc: "Kakemono pour vos salons, conférences et points de vente.",
      details: { Format: "600 × 1600 mm", Grammage: "Vinyle 440 g", Quantité: "1 pièce", Autres: "Supports et housse de transport inclus" },
      img: "assets/catalogue/kakemono.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "derouleur", name: "Dérouleur", cat: "Imprimerie & Édition", price: 55000, unit: "pièce",
      desc: "Dérouleur rétractable pour une installation rapide sur événement.",
      details: { Format: "850 × 2000 mm", Grammage: "Vinyle 440 g", Quantité: "1 pièce", Autres: "Cassette aluminium et housse incluses" },
      img: "assets/catalogue/derouleur.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "cadre-photo", name: "Cadre photo", cat: "Imprimerie & Édition", price: 12000, unit: "pièce",
      desc: "Cadre photo personnalisé avec impression sur aluminium ou PVC rigide.",
      details: { Format: "200 × 300 mm", Grammage: "Alu / PVC", Quantité: "1 pièce", Autres: "Impression haute définition" },
      img: "assets/catalogue/cadre-photo.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "catalogue", name: "Catalogue", cat: "Imprimerie & Édition", price: 45000, unit: "lot de 200",
      desc: "Catalogue produit complet, conçu et imprimé pour valoriser votre offre.",
      details: { Format: "A4", Grammage: "135 g", Quantité: "200 pièces", Autres: "Dos carré collé, couverture 350 g" },
      img: "assets/catalogue/catalogue.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "annales", name: "Annales", cat: "Imprimerie & Édition", price: 28000, unit: "lot de 100",
      desc: "Annales et recueils de documents pour les établissements scolaires.",
      details: { Format: "A4", Grammage: "90 g", Quantité: "100 pièces", Autres: "Relié, couverture renforcée" },
      img: "assets/catalogue/annales.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "thermos", name: "Thermos", cat: "Sérigraphie & marquage", price: 12000, unit: "pièce · min. 10",
      desc: "Thermos isotherme personnalisé, cadeau utile et durable.",
      details: { Format: "500 ml", Grammage: "Inox", Quantité: "10 pièces", Autres: "Gravure laser ou sérigraphie" },
      img: "assets/catalogue/thermos.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "usb-personnalisee", name: "USB personnalisée", cat: "Sérigraphie & marquage", price: 6500, unit: "pièce · min. 20",
      desc: "Clé USB personnalisée pour vos supports de formation et cadeaux.",
      details: { Format: "8 Go", Grammage: "Métal / plastique", Quantité: "20 pièces", Autres: "Gravure laser de votre logo" },
      img: "assets/catalogue/usb-personnalisee.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "badge", name: "Badge", cat: "Sérigraphie & marquage", price: 4000, unit: "lot de 100",
      desc: "Badges personnalisés pour événements, équipes et cadeaux.",
      details: { Format: "37 mm", Grammage: "Métal émaillé", Quantité: "100 pièces", Autres: "Épingle, impression couleur" },
      img: "assets/catalogue/badge.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "bache", name: "Bâche", cat: "Imprimerie & Édition", price: 2500, unit: "m²", badge: "Best-seller",
      desc: "Bâche PVC haute résistance pour enseignes, événements et chantiers.",
      details: { Format: "Sur mesure", Grammage: "PVC 440 g", Quantité: "1 m²", Autres: "Œillets, ourlage et impression couleur" },
      img: "assets/catalogue/bache.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "vinyl", name: "Vinyle", cat: "Imprimerie & Édition", price: 3000, unit: "m²",
      desc: "Vinyle adhésif pour vitrines, véhicules, murs et signalétique.",
      details: { Format: "Sur mesure", Grammage: "Adhésif 80 µm", Quantité: "1 m²", Autres: "Pose professionnelle possible" },
      img: "assets/catalogue/vinyl.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "livre", name: "Livre", cat: "Imprimerie & Édition", price: 35000, unit: "lot de 100",
      desc: "Livre relié imprimé sur mesure pour vos publications et ouvrages.",
      details: { Format: "A5", Grammage: "120 g", Quantité: "100 pièces", Autres: "Couverture rigide, dos carré collé" },
      img: "assets/catalogue/livre.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "couverture-de-livre", name: "Couverture de livre", cat: "Imprimerie & Édition", price: 8000, unit: "lot de 100",
      desc: "Couverture de livre personnalisée avec pelliculage mat ou brillant.",
      details: { Format: "A5", Grammage: "350 g", Quantité: "100 pièces", Autres: "Pelliculage mat ou brillant" },
      img: "assets/catalogue/couverture-de-livre.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "magazine", name: "Magazine", cat: "Imprimerie & Édition", price: 38000, unit: "lot de 500",
      desc: "Magazine agrafé avec couverture renforcée pour vos publications.",
      details: { Format: "A4", Grammage: "135 g", Quantité: "500 pièces", Autres: "Agrafé, couverture 250 g" },
      img: "assets/catalogue/magazine.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "affiche", name: "Affiche", cat: "Imprimerie & Édition", price: 3000, unit: "lot de 100",
      desc: "Affiches couleur pour votre communication visuelle et vos événements.",
      details: { Format: "A3 / A2", Grammage: "135 g", Quantité: "100 pièces", Autres: "Impression recto haute définition" },
      img: "assets/catalogue/affiche.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "micro-perforee", name: "Micro perforée", cat: "Imprimerie & Édition", price: 4000, unit: "m²",
      desc: "Vinyle micro perforé pour vitrines et habillage de véhicules.",
      details: { Format: "Sur mesure", Grammage: "Vinyle perforé", Quantité: "1 m²", Autres: "Visibilité depuis l'intérieur" },
      img: "assets/catalogue/micro-perforee.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "bon-de-commande", name: "Bon de commande", cat: "Imprimerie & Édition", price: 13000, unit: "lot de 10 carnets",
      desc: "Bons de commande numérotés pour suivre vos ventes et livraisons.",
      details: { Format: "A4", Grammage: "80 g", Quantité: "10 carnets", Autres: "Triplicate, numérotation automatique" },
      img: "assets/catalogue/bon-de-commande.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "roll-up", name: "Roll up", cat: "Imprimerie & Édition", price: 45000, unit: "pièce",
      desc: "Roll up rétractable pour vos présentations et stands.",
      details: { Format: "850 × 2000 mm", Grammage: "Vinyle 440 g", Quantité: "1 pièce", Autres: "Support rétractable inclus" },
      img: "assets/catalogue/roll-up.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "carte-pvc", name: "Carte PVC", cat: "Imprimerie & Édition", price: 18000, unit: "lot de 100",
      desc: "Cartes en PVC rigide pour badges, cartes de fidélité et cartes d'accès.",
      details: { Format: "85,6 × 54 mm", Grammage: "PVC 0,76 mm", Quantité: "100 pièces", Autres: "QR code, code-barres ou puce" },
      img: "assets/catalogue/carte-pvc.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "sticker", name: "Sticker", cat: "Imprimerie & Édition", price: 7000, unit: "lot de 100",
      desc: "Stickers adhésifs découpés aux couleurs de votre marque.",
      details: { Format: "Sur mesure", Grammage: "Vinyle adhésif", Quantité: "100 pièces", Autres: "Découpe contour, imperméable" },
      img: "assets/catalogue/sticker.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "charte-graphique", name: "Charte graphique", cat: "Sérigraphie & marquage", price: 45000, unit: "forfait", badge: "Premium",
      desc: "Charte graphique complète pour une identité de marque cohérente sur tous vos supports.",
      details: { Format: "Digital", Grammage: "—", Quantité: "1 forfait", Autres: "Logo, couleurs, typographies et règles d'usage" },
      img: "assets/catalogue/charte-graphique.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "banniere-reseau", name: "Bannière réseau", cat: "Sérigraphie & marquage", price: 15000, unit: "kit",
      desc: "Kit de bannières pour réseaux sociaux, aux formats de chaque plateforme.",
      details: { Format: "1200 × 628 px et variantes", Grammage: "Digital", Quantité: "1 kit", Autres: "Facebook, Instagram, LinkedIn, WhatsApp" },
      img: "assets/catalogue/banniere-reseau.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "declinaison", name: "Déclinaison", cat: "Sérigraphie & marquage", price: 25000, unit: "kit",
      desc: "Déclinaison de votre identité sur tous vos supports de communication.",
      details: { Format: "Multi-supports", Grammage: "Digital & print", Quantité: "1 kit", Autres: "Enseigne, véhicule, papier, réseaux" },
      img: "assets/catalogue/declinaison.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "sous-main", name: "Sous-main", cat: "Imprimerie & Édition", price: 14000, unit: "lot de 10",
      desc: "Sous-main personnalisé pour vos bureaux et espaces d'accueil.",
      details: { Format: "500 × 650 mm", Grammage: "PVC 0,5 mm", Quantité: "10 pièces", Autres: "Impression couleur de votre logo" },
      img: "assets/catalogue/sous-main.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "t-shirt", name: "T-shirt personnalisé", cat: "Sérigraphie & marquage", price: 2500, unit: "pièce · min. 10", badge: "Best-seller",
      desc: "T-shirt personnalisé par sérigraphie, DTF ou broderie, encre vibrante et durable.",
      details: { Format: "S à XXL", Grammage: "Coton 180 g", Quantité: "10 pièces", Autres: "Sérigraphie, DTF ou broderie" },
      img: "assets/catalogue/t-shirt.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "polo", name: "Polo personnalisé", cat: "Sérigraphie & marquage", price: 5500, unit: "pièce · min. 10",
      desc: "Polo d'entreprise avec logo brodé ou imprimé.",
      details: { Format: "S à XXL", Grammage: "Coton piqué 220 g", Quantité: "10 pièces", Autres: "Broderie poitrine ou sérigraphie" },
      img: "assets/catalogue/polo.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "gilet", name: "Gilet personnalisé", cat: "Sérigraphie & marquage", price: 6500, unit: "pièce · min. 10",
      desc: "Gilet de travail ou d'équipe marqué à votre couleurs.",
      details: { Format: "S à XXL", Grammage: "Polaire 280 g", Quantité: "10 pièces", Autres: "Broderie ou sérigraphie" },
      img: "assets/catalogue/gilet.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "tasse", name: "Tasse personnalisée", cat: "Sérigraphie & marquage", price: 2500, unit: "pièce · min. 10", badge: "Populaire",
      desc: "Tasse imprimée au logo, idéale pour cadeaux d'entreprise et événements.",
      details: { Format: "330 ml", Grammage: "Céramique", Quantité: "10 pièces", Autres: "Impression sublimation, lave-vaisselle" },
      img: "assets/catalogue/tasse.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "gourde", name: "Gourde isotherme", cat: "Sérigraphie & marquage", price: 9900, unit: "pièce · min. 5",
      desc: "Gourde isotherme personnalisée, cadeau utile et durable.",
      details: { Format: "500 ml", Grammage: "Inox isotherme", Quantité: "5 pièces", Autres: "Gravure laser ou sérigraphie" },
      img: "assets/catalogue/gourde.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "porte-cle", name: "Porte-clé personnalisé", cat: "Sérigraphie & marquage", price: 2500, unit: "pièce · min. 20",
      desc: "Porte-clé publicitaire en métal ou résine, avec votre logo.",
      details: { Format: "Sur mesure", Grammage: "Métal / résine", Quantité: "20 pièces", Autres: "Gravure ou impression couleur" },
      img: "assets/catalogue/porte-cle.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "broderie", name: "Broderie", cat: "Sérigraphie & marquage", price: 2000, unit: "pièce · min. 10",
      desc: "Broderie haute durabilité pour textiles et uniformes.",
      details: { Format: "Sur textile", Grammage: "Fil polyester", Quantité: "10 pièces", Autres: "Multicolore, finition nette" },
      img: "assets/catalogue/broderie.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "dtf", name: "Impression DTF", cat: "Sérigraphie & marquage", price: 1800, unit: "pièce · min. 10",
      desc: "Impression DTF haute définition sur tous types de textiles.",
      details: { Format: "Sur textile", Grammage: "Film transfert", Quantité: "10 pièces", Autres: "Couleurs vibrantes, résistant au lavage" },
      img: "assets/catalogue/dtf.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "stylo", name: "Stylo personnalisé", cat: "Sérigraphie & marquage", price: 1200, unit: "pièce · min. 100",
      desc: "Stylo avec logo pour vos kits, salons et cadeaux.",
      details: { Format: "Standard", Grammage: "Plastique / métal", Quantité: "100 pièces", Autres: "Gravure ou tampographie" },
      img: "assets/catalogue/stylo.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "tapis-de-souris", name: "Tapis de souris", cat: "Sérigraphie & marquage", price: 3500, unit: "pièce · min. 10",
      desc: "Tapis de souris personnalisé par sublimation.",
      details: { Format: "250 × 200 mm", Grammage: "Caoutchouc", Quantité: "10 pièces", Autres: "Impression sublimation" },
      img: "assets/catalogue/tapis-de-souris.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "casquette", name: "Casquette personnalisée", cat: "Sérigraphie & marquage", price: 5500, unit: "pièce · min. 10",
      desc: "Casquette brodée ou imprimée avec votre logo.",
      details: { Format: "Ajustable", Grammage: "Coton", Quantité: "10 pièces", Autres: "Broderie 3D ou sérigraphie" },
      img: "assets/catalogue/casquette.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "carton", name: "Carton personnalisé", cat: "Sérigraphie & marquage", price: 900, unit: "pièce · min. 100",
      desc: "Carton d'emballage imprimé et découpé sur mesure.",
      details: { Format: "Sur mesure", Grammage: "Carton ondulé", Quantité: "100 pièces", Autres: "Impression, découpe et pliage" },
      img: "assets/catalogue/carton.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "porte-cle-resine", name: "Porte-clé résine", cat: "Résine & objets", price: 3000, unit: "pièce · min. 20", badge: "Nouveau",
      desc: "Porte-clé en résine époxy avec inclusions et couleurs personnalisées.",
      details: { Format: "Sur mesure", Grammage: "Résine époxy", Quantité: "20 pièces", Autres: "Inclusions, pigments et formes variées" },
      img: "assets/catalogue/porte-cle-resine.jpg", source: "Catalogue HaiBer Multi-Services — page 10" },
    { id: "coque-de-telephone", name: "Coque de téléphone résine", cat: "Résine & objets", price: 5000, unit: "pièce · min. 10",
      desc: "Coque de téléphone personnalisée en résine, motif unique et protection durable.",
      details: { Format: "Sur mesure (modèle)", Grammage: "Résine / TPU", Quantité: "10 pièces", Autres: "Motif personnalisé, finition brillante" },
      img: "assets/catalogue/coque-de-telephone.jpg", source: "Catalogue HaiBer Multi-Services — page 10" },
    { id: "bloc-note-resine", name: "Bloc note résine", cat: "Résine & objets", price: 14900, unit: "pièce · min. 10",
      desc: "Bloc note avec couverture en résine personnalisée, objet design et utile.",
      details: { Format: "A6", Grammage: "Résine + papier 90 g", Quantité: "10 pièces", Autres: "Couverture résine, pages personnalisables" },
      img: "assets/catalogue/bloc-note-resine.jpg", source: "Catalogue HaiBer Multi-Services — page 10" },
    { id: "identite", name: "Identité visuelle complète", cat: "Sérigraphie & marquage", price: 45000, unit: "forfait", badge: "Premium",
      desc: "Logo, charte couleurs, typographies et déclinaisons de marque.",
      details: { Format: "Digital", Grammage: "—", Quantité: "1 forfait", Autres: "Livrable complet, fichiers sources inclus" },
      img: "assets/catalogue/identite.jpg", source: "Catalogue HaiBer Multi-Services — page 7" },
    { id: "pack-entreprise", name: "PACK ENTREPRISE", cat: "Sérigraphie & marquage", price: 75500, unit: "pack · −20 %", badge: "−20 %",
      desc: "Logo pro, entête, 100 cartes de visite, 100 flyers et 10 carnets de factures.",
      details: { Format: "Pack complet", Grammage: "—", Quantité: "1 pack", Autres: "Économie de 20 % sur les prestations réunies" },
      img: "assets/catalogue/pack-entreprise.jpg", source: "Catalogue HaiBer Multi-Services — page 6" },
    { id: "pack-gadgets", name: "PACK GADGETS", cat: "Sérigraphie & marquage", price: 150000, unit: "pack · −20 %", badge: "−20 %",
      desc: "20 t-shirts, 20 casquettes, 10 tasses, 10 porte-clés et 10 stylos personnalisés.",
      details: { Format: "Pack complet", Grammage: "—", Quantité: "1 pack", Autres: "Économie de 20 % sur les objets réunis" },
      img: "assets/catalogue/pack-gadgets.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
    { id: "pack-cadeau", name: "PACK CADEAU / CALENDAR", cat: "Imprimerie & Édition", price: 157500, unit: "pack · −20 %", badge: "−20 %",
      desc: "50 calendriers muraux, 20 de table, 100 cartes de vœux, 10 blocs-notes et 10 tasses.",
      details: { Format: "Pack complet", Grammage: "—", Quantité: "1 pack", Autres: "Idéal pour remercier clients et partenaires" },
      img: "assets/catalogue/pack-cadeau.jpg", source: "Catalogue HaiBer Multi-Services — page 5" },
    { id: "pack-premium", name: "PACK PREMIUM", cat: "Sérigraphie & marquage", price: 165000, unit: "pack · −20 %", badge: "−20 %",
      desc: "Calendriers, cartes de vœux, blocs-notes, tasses, t-shirts, casquettes et porte-clés.",
      details: { Format: "Pack complet", Grammage: "—", Quantité: "1 pack", Autres: "La formule complète pour votre marque" },
      img: "assets/catalogue/pack-premium.jpg", source: "Catalogue HaiBer Multi-Services — page 9" },
  ];

  const CATEGORIES = ["Tous", "Imprimerie & Édition", "Sérigraphie & marquage", "Résine & objets"];

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
    'Imprimerie & Édition': 'Impression',
    'Sérigraphie': 'Sérigraphie', 'Sérigraphie textile': 'Sérigraphie',
    'Sérigraphie & marquage': 'Sérigraphie',
    'Résine': 'Résine', 'Atelier résine': 'Résine', 'Résine & objets': 'Résine',
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

  function animateCounters(scope) {
    if (!scope) return;
    const targets = $$('[data-count]', scope);
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      targets.forEach(el => { el.textContent = el.dataset.count + (el.dataset.suffix || ''); });
      return;
    }
    targets.forEach(el => {
      const end = Number(el.dataset.count) || 0;
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(end * eased) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      el.textContent = '0' + suffix;
      requestAnimationFrame(tick);
    });
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
          ${p.details ? `<div class="product-specs">${Object.entries(p.details).filter(([, v]) => v && v !== '—').slice(0, 2).map(([k, v]) => `<span><b>${esc(k)} :</b> ${esc(v)}</span>`).join('')}</div>` : ''}
          <div class="product-meta"><span class="product-price">${esc(priceLabel(p.price))}</span><span class="product-unit">/ ${esc(p.unit)}</span></div>
          <div class="product-actions">
            <button class="btn btn-primary" data-add="${esc(p.id)}">${p.price == null ? 'Ajouter au panier' : 'Ajouter'}</button>
            <button class="quote-icon" data-detail-product="${esc(p.id)}" title="Voir la fiche" aria-label="Voir la fiche de ${esc(p.name)}">ⓘ</button>
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
    $$('[data-detail-product]').forEach(b => b.onclick = () => openProductDetail(b.dataset.detailProduct));
  }

  function openProductDetail(id) {
    const p = productById(id);
    if (!p) return;
    const rows = p.details ? Object.entries(p.details)
      .filter(([, v]) => v && v !== '—')
      .map(([k, v]) => `<div class="detail-row"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join('') : '';
    $('#modal-root').hidden = false;
    $('#modal-root').innerHTML = `
      <div class="product-detail">
        <button class="detail-close" id="detail-close" aria-label="Fermer">✕</button>
        <div class="detail-media"><img src="${esc(p.img)}" alt="${esc(p.name)}"></div>
        <div class="detail-copy">
          <div class="section-tag">${esc(p.cat)}</div>
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.desc)}</p>
          <div class="detail-price">${esc(priceLabel(p.price))} <small>/ ${esc(p.unit)}</small></div>
          <div class="detail-grid">${rows}</div>
          <div class="detail-source">${esc(p.source)} · prix indicatif, devis personnalisé offert.</div>
          <div class="detail-actions">
            <button class="btn btn-primary" id="detail-add">Ajouter au panier</button>
            <button class="btn btn-outline" id="detail-quote">Demander un devis</button>
          </div>
        </div>
      </div>`;
    document.body.classList.add('no-scroll');
    $('#detail-close').onclick = () => closeQuote();
    $('#detail-add').onclick = () => { closeQuote(); addToCart(p.id); };
    $('#detail-quote').onclick = () => { closeQuote(); openQuote(SERVICE_MAP[p.cat] || 'Accompagnement', p.name); };
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
    const dockQuote = $('#dock-quote');
    if (dockQuote) dockQuote.onclick = () => openQuote();
    const dockCart = $('#dock-cart');
    if (dockCart) dockCart.onclick = () => openCart();
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

    // Header & barre de progression au scroll
    const progress = $('#scroll-progress');
    const onScroll = () => {
      $('#header').classList.toggle('scrolled', window.scrollY > 12);
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const percent = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
        progress.style.width = percent.toFixed(2) + '%';
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

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
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            if (en.target.classList.contains('stats-bar')) animateCounters(en.target);
            revObs.unobserve(en.target);
          }
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
