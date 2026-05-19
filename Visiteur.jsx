// ============================================================
//  AtlasHost — Visiteur.jsx  v2.0
//  Améliorations : menu mobile, chatbot IA réel, full-width
//  Auteur : MOUKRIM Ayman — PFE BTS DAI2
// ============================================================

import { useState, useEffect, useRef } from "react";
import logo from './assets/atlas-logo.png.png';
import heroBg from './assets/Salon-bg.jpg';
import iconChatBot from './assets/iconChatBot.png';
import touristesImg from './assets/touristes.png';

// ─── Données statiques ────────────────────────────────────────

const VILLES = [
  {
    id: "casablanca",
    nom: "Casablanca",
    tag: "La ville blanche",
    familles: 34,
    img: "https://images.unsplash.com/photo-1538230575309-59dfc388ae36?w=600&q=80",
  },
  {
    id: "marrakech",
    nom: "Marrakech",
    tag: "La ville ocre",
    familles: 52,
    img: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80",
  },
  {
    id: "rabat",
    nom: "Rabat",
    tag: "La capitale",
    familles: 28,
    img: "https://images.unsplash.com/photo-1598022124758-26d09adcb7b6?w=600&q=80",
  },
  {
    id: "tanger",
    nom: "Tanger",
    tag: "Porte de l'Afrique",
    familles: 19,
    img: "https://images.unsplash.com/photo-1582919534700-acf2374f10d3?w=600&q=80",
  },
];

const FAMILLES = [
  {
    id: 1,
    nom: "Famille Benali",
    ville: "Marrakech",
    description: "Maison traditionnelle riad au cœur de la médina. Petit-déjeuner marocain inclus chaque matin.",
    prix: 280,
    note: 4.9,
    avis: 47,
    certifiee: true,
    places: 2,
    features: ["Wi-Fi", "Petit-déj.", "Riad", "Parking"],
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80",
  },
  {
    id: 2,
    nom: "Famille Idrissi",
    ville: "Casablanca",
    description: "Appartement moderne face à l'océan, quartier Ain Diab. Accès plage privée et cuisine partagée.",
    prix: 350,
    note: 4.7,
    avis: 29,
    certifiee: true,
    places: 3,
    features: ["Wi-Fi", "Vue océan", "Plage"],
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80",
  },
  {
    id: 3,
    nom: "Famille Chaoui",
    ville: "Rabat",
    description: "Villa familiale dans le quartier Agdal. Jardins, piscine et hospitalité authentique garantie.",
    prix: 320,
    note: 4.8,
    avis: 61,
    certifiee: true,
    places: 4,
    features: ["Piscine", "Jardin", "Wi-Fi", "Parking"],
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
  },
  {
    id: 4,
    nom: "Famille Mrabet",
    ville: "Tanger",
    description: "Dar marocaine surplombant le détroit de Gibraltar. Vue panoramique et cuisine du nord.",
    prix: 260,
    note: 4.6,
    avis: 18,
    certifiee: false,
    places: 2,
    features: ["Vue mer", "Terrasse", "Wi-Fi"],
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80",
  },
  {
    id: 5,
    nom: "Famille Tahiri",
    ville: "Marrakech",
    description: "Riad-boutique en pleine médina avec hammam privatif et cours de cuisine marocaine.",
    prix: 410,
    note: 5.0,
    avis: 83,
    certifiee: true,
    places: 2,
    features: ["Hammam", "Cours cuisine", "Riad", "Wi-Fi"],
    img: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=500&q=80",
  },
  {
    id: 6,
    nom: "Famille Alaoui",
    ville: "Casablanca",
    description: "Appartement haussmannien rénové au centre-ville. Accès privilégié aux quartiers historiques.",
    prix: 290,
    note: 4.5,
    avis: 34,
    certifiee: true,
    places: 2,
    features: ["Centre-ville", "Wi-Fi", "Climatisation"],
    img: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=500&q=80",
  },
];

const TEMOIGNAGES = [
  {
    id: 1,
    texte: "Une expérience inoubliable. La famille Benali nous a accueillis comme ses propres enfants. Le couscous du vendredi restera gravé dans ma mémoire.",
    auteur: "Sophie M.",
    origine: "Lyon, France",
    note: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: 2,
    texte: "J'avais des appréhensions au départ, mais AtlasHost m'a complètement rassuré. La certification des familles, la réservation simple, tout est parfait.",
    auteur: "James K.",
    origine: "London, UK",
    note: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: 3,
    texte: "Le Maroc authentique, loin des hôtels standardisés. Une immersion totale dans la culture berbère. Je reviendrai sans hésitation.",
    auteur: "Yuki T.",
    origine: "Tokyo, Japon",
    note: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
  },
];

const AVANTAGES = [
  {
    icon: "✅",
    titre: "Familles certifiées",
    desc: "Chaque famille passe par une vérification documentaire rigoureuse. CIN, certificat de résidence, dossier validé par notre équipe.",
  },
  {
    icon: "💳",
    titre: "Paiement sécurisé",
    desc: "Transaction protégée par chiffrement SSL. Remboursement garanti en cas d'annulation dans les délais.",
  },
  {
    icon: iconChatBot,
    isImage: true,
    titre: "LBEHJA 24/7",
    desc: "Notre assistant intelligent répond à toutes vos questions en temps réel, à toute heure du jour et de la nuit.",
  },
  {
    icon: "🏡",
    titre: "Expérience authentique",
    desc: "Vivez comme un Marocain — cuisine locale, traditions, partage familial. Une immersion culturelle sans égale.",
  },
  {
    icon: "📍",
    titre: "4 grandes villes",
    desc: "Casablanca, Rabat, Tanger, Marrakech — choisissez votre destination et trouvez la famille idéale.",
  },
  {
    icon: "⭐",
    titre: "Avis vérifiés",
    desc: "Chaque avis provient d'un voyageur ayant réellement séjourné. Transparence totale sur la qualité de l'accueil.",
  },
];

// ─── Navbar ───────────────────────────────────────────────────

function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  const storedUser = localStorage.getItem("atlas_user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("atlas_token");
    localStorage.removeItem("atlas_user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ferme le menu mobile au resize
  useEffect(() => {
    const close = () => window.innerWidth > 900 && setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Accueil",    id: "accueil" },
    { label: "À propos",   id: "avantages" },
    { label: "Familles",   id: "familles" },
    { label: "Avis",       id: "temoignages" },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <div className="navbar__logo">
          <img src={logo} alt="AtlasHost Logo" className="navbar__logo-icon" />
          <span className="navbar__logo-text">
            Atlas<span>Host</span>
          </span>
        </div>

        {/* Liens desktop */}
        <ul className="navbar__links">
          <li>
            <a href="#accueil" onClick={(e) => { e.preventDefault(); scrollTo("accueil"); }} className="active">
              Accueil
            </a>
          </li>
          <li>
            <a href="#avantages" onClick={(e) => { e.preventDefault(); scrollTo("avantages"); }}>
              À propos
            </a>
          </li>
          <li className="navbar__dropdown">
            <a href="#villes" onClick={(e) => { e.preventDefault(); scrollTo("villes"); }}>
              Nos villes ▾
            </a>
            <ul className="navbar__dropdown-menu">
              {VILLES.map((v) => (
                <li key={v.id}>
                  <a href={`#${v.id}`} onClick={(e) => { e.preventDefault(); scrollTo("familles"); }}>
                    📍 {v.nom}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a href="#familles" onClick={(e) => { e.preventDefault(); scrollTo("familles"); }}>
              Familles
            </a>
          </li>
          <li>
            <a href="#temoignages" onClick={(e) => { e.preventDefault(); scrollTo("temoignages"); }}>
              Avis
            </a>
          </li>
        </ul>

        {/* Actions desktop */}
        <div className="navbar__actions">
          <div className="navbar__account" ref={accountRef}>
            <button
              className="btn btn--outline"
              onClick={() => user ? setAccountOpen(!accountOpen) : onLoginClick()}
            >
              Mon compte
            </button>
            {user && accountOpen && (
              <div className="navbar__account-menu">
                <div className="navbar__account-info">
                  <span className="navbar__account-name">{user.prenom} {user.nom}</span>
                  <span className="navbar__account-email">{user.email}</span>
                </div>
                <button className="navbar__account-logout" onClick={handleLogout}>
                  Déconnexion
                </button>
              </div>
            )}
          </div>
          <button className="btn btn--solid" onClick={() => scrollTo("familles")}>
            Réserver
          </button>
        </div>

        {/* Hamburger */}
        <div
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu mobile"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setMenuOpen(!menuOpen)}
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </div>
      </nav>

      {/* Menu mobile déroulant */}
      <ul className={`navbar__mobile-menu${menuOpen ? " open" : ""}`}>
        {navLinks.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}>
              {link.label}
            </a>
          </li>
        ))}
        <li style={{ borderTop: "1px solid rgba(122,16,16,0.1)", paddingTop: "8px", marginTop: "4px" }}>
          <a href="/login" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>
            Mon compte
          </a>
        </li>
      </ul>
    </>
  );
}

// ─── Hero ──────────────────────────────────────────────────────

function Hero({ onReserverClick }) {
  return (
    <section className="hero" id="accueil">
      <div className="hero__bg" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__badge">Plateforme certifiée · Maroc</div>
        <h1 className="hero__title">
          Vivez le Maroc <em>authentique</em> au sein des familles
        </h1>
        <p className="hero__subtitle">
          AtlasHost connecte les voyageurs du monde entier avec des familles marocaines certifiées.
          Une expérience humaine, culturelle et inoubliable.
        </p>
        <div className="hero__actions">
          <button className="btn btn--gold btn--lg" onClick={onReserverClick}>
            Trouver une famille
          </button>
          <button
            className="btn btn--outline btn--lg"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
            onClick={() => document.getElementById("avantages")?.scrollIntoView({ behavior: "smooth" })}
          >
            Découvrir AtlasHost
          </button>
        </div>
      </div>

      <div className="hero__scroll">Défiler</div>
    </section>
  );
}

// ─── Comment ça marche ──────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { num: "01", titre: "Choisissez votre ville", desc: "Parcourez nos 4 destinations : Casablanca, Marrakech, Rabat ou Tanger. Filtrez par date et préférences." },
    { num: "02", titre: "Sélectionnez une famille", desc: "Consultez les profils certifiés, photos, avis vérifiés et tarifs. Chaque famille est validée par notre équipe." },
    { num: "03", titre: "Réservez en ligne", desc: "Réservation sécurisée avec paiement en ligne. Confirmation instantanée par e-mail." },
    { num: "04", titre: "Vivez l'expérience", desc: "Arrivez et découvrez l'hospitalité marocaine authentique. Notre chatbot IA vous accompagne 24/7." },
  ];

  return (
    <section className="how-it-works" id="how">
      <div className="section-label">Comment ça marche</div>
      <h2 className="section-title">Simple, sécurisé, authentique</h2>
      

      <div className="how__grid">
        <div className="how__steps">
          {steps.map((s) => (
            <div className="step" key={s.num}>
              <div className="step__number">{s.num}</div>
              <div className="step__content">
                <h4>{s.titre}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="how__image">
          <div className="how__image-main">
            <img src={touristesImg} alt="Famille marocaine" />
          </div>
          <div className="how__image-accent">
            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&q=80" alt="Voyageur" />
          </div>
          <div className="how__badge">
            <div className="how__badge-num">98%</div>
            <div className="how__badge-text">Satisfaction clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Villes ────────────────────────────────────────────────────

function Villes({ onVilleSelect }) {
  return (
    <section className="cities" id="villes">
      <div className="section-label">Destinations</div>
      <h2 className="section-title">Choisissez votre ville</h2>
      <p className="section-subtitle">
        Quatre destinations emblématiques du Maroc, chacune avec ses familles certifiées et son identité unique.
      </p>

      <div className="cities__grid">
        {VILLES.map((v) => (
          <div
            className="city-card"
            key={v.id}
            onClick={() => onVilleSelect(v.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onVilleSelect(v.id)}
          >
            <div className="city-card__img">
              <img src={v.img} alt={v.nom} />
            </div>
            <div className="city-card__overlay" />
            <div className="city-card__count">{v.familles} familles</div>
            <div className="city-card__content">
              <div className="city-card__name">{v.nom}</div>
              <div className="city-card__tag">{v.tag}</div>
              <span className="city-card__btn">Explorer →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const API = "http://localhost:8000/api";
const token = () => localStorage.getItem("atlas_token");

function listingToCard(l) {
  return {
    id:        l.id,
    listingId: l.id,
    nom:       l.titre,
    ville:     l.ville,
    description: l.description,
    prix:      l.family?.tarif_par_nuit ?? 0,
    note:      0,
    avis:      0,
    certifiee: l.family?.statut_certif === "validated",
    places:    l.family?.nombre_places ?? 1,
    features:  [],
    img:       l.photos?.[0] ?? "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80",
  };
}

// ─── Listing Familles ──────────────────────────────────────────

function FamillesListing({ onReserver }) {
  const [filtreVille, setFiltreVille] = useState("Toutes");
  const [filtreSort,  setFiltreSort]  = useState("prix_asc");
  const [familles,    setFamilles]    = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    fetch(`${API}/listings`)
      .then(r => r.json())
      .then(json => {
        if (json.success) setFamilles(json.data.map(listingToCard));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const villes = ["Toutes", ...VILLES.map((v) => v.nom)];

  const familles_affichees = familles
    .filter((f) => filtreVille === "Toutes" || f.ville === filtreVille)
    .sort((a, b) => {
      if (filtreSort === "note")      return b.note - a.note;
      if (filtreSort === "prix_asc")  return a.prix - b.prix;
      if (filtreSort === "prix_desc") return b.prix - a.prix;
      return 0;
    });

  return (
    <section className="families" id="familles">
      <div className="families__header">
        <div>
          <div className="section-label">Familles d'accueil</div>
          <h2 className="section-title">Trouvez votre famille idéale</h2>
        </div>
        <p className="section-subtitle" style={{ maxWidth: 340, textAlign: "right" }}>
          Toutes nos familles sont certifiées et leur dossier validé par notre équipe.
        </p>
      </div>

      <div className="filter-bar">
        {villes.map((v) => (
          <button
            key={v}
            className={`filter-chip${filtreVille === v ? " active" : ""}`}
            onClick={() => setFiltreVille(v)}
          >
            {v}
          </button>
        ))}
        <div className="filter-separator" />
        <div className="filter-sort">
          <span>Trier :</span>
          <select value={filtreSort} onChange={(e) => setFiltreSort(e.target.value)}>
            <option value="note">Meilleures notes</option>
            <option value="prix_asc">Prix croissant</option>
            <option value="prix_desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-soft)" }}>
          Chargement des familles…
        </div>
      ) : familles_affichees.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-soft)" }}>
          Aucune famille disponible pour cette ville.
        </div>
      ) : (
        <div className="families__grid">
          {familles_affichees.map((f) => (
            <FamilleCard key={f.id} famille={f} onReserver={onReserver} />
          ))}
        </div>
      )}
    </section>
  );
}

function FamilleCard({ famille, onReserver }) {
  const [wishlist, setWishlist] = useState(false);
  const stars = "★".repeat(Math.round(famille.note)) + "☆".repeat(5 - Math.round(famille.note));

  return (
    <div className="family-card">
      <div className="family-card__img">
        <img src={famille.img} alt={famille.nom} loading="lazy" />
        {famille.certifiee && (
          <div className="family-card__certified">Certifiée AtlasHost</div>
        )}
        <div
          className="family-card__wishlist"
          onClick={() => setWishlist(!wishlist)}
          role="button"
          tabIndex={0}
          aria-label={wishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          {wishlist ? "❤️" : "🤍"}
        </div>
      </div>

      <div className="family-card__body">
        <div className="family-card__location">📍 {famille.ville} · {famille.places} place{famille.places > 1 ? "s" : ""}</div>
        <h3 className="family-card__name">{famille.nom}</h3>
        <p className="family-card__desc">{famille.description}</p>

        <div className="family-card__features">
          {famille.features.map((feat) => (
            <span className="feature-tag" key={feat}>{feat}</span>
          ))}
        </div>

        <div className="family-card__footer">
          <div className="family-card__rating">
            <span className="stars">{stars}</span>
            {famille.note} ({famille.avis} avis)
          </div>
          <div className="family-card__price">
            <div className="family-card__price-num">{famille.prix} MAD</div>
            <div className="family-card__price-label">/ nuit</div>
          </div>
        </div>
      </div>

      <div className="family-card__cta">
        <button className="btn btn--gold btn--lg" onClick={() => onReserver(famille)}>
          Réserver maintenant
        </button>
      </div>
    </div>
  );
}

// ─── Avantages ─────────────────────────────────────────────────

// ─── Avantages ─────────────────────────────────────────────────

function Avantages() {
  return (
    <section className="avantages" id="avantages">
      <div className="avantages__inner">
        <div className="section-label">Pourquoi AtlasHost</div>
        <h2 className="section-title">Une plateforme pensée pour vous</h2>

        <div className="avantages__grid">
          {AVANTAGES.map((a, i) => (
            <div className="avantage-card" key={i}>
              <h3 className="avantage-card__title">{a.titre}</h3>
              <p className="avantage-card__desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Témoignages ───────────────────────────────────────────────

function Temoignages() {
  return (
    <section className="testimonials" id="temoignages">
      <div className="section-label">Témoignages</div>
      <h2 className="section-title">Ce que disent nos voyageurs</h2>
      
      <div className="testimonials__grid">
        {TEMOIGNAGES.map((t) => (
          <div className="testimonial-card" key={t.id}>
            <div className="testimonial-card__stars">{"★".repeat(t.note)}</div>
            <p className="testimonial-card__text">"{t.texte}"</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">
                <img src={t.avatar} alt={t.auteur} />
              </div>
              <div>
                <div className="testimonial-card__name">{t.auteur}</div>
                <div className="testimonial-card__origin">{t.origine}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA Section ───────────────────────────────────────────────

function CTASection({ onReserverClick }) {
  return (
    <section className="cta-section">
      <div className="cta-section__inner">
        <h2 className="cta-section__title">Prêt à vivre l'expérience ?</h2>
        <p className="cta-section__sub">
          Rejoignez des milliers de voyageurs qui ont découvert le Maroc authentique grâce à AtlasHost.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn--solid btn--lg" onClick={onReserverClick}>
           Trouver une famille
          </button>
          <button
            className="btn btn--outline btn--lg"
            onClick={() => document.getElementById("avantages")?.scrollIntoView({ behavior: "smooth" })}
          >
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Chatbot IA (avec vraie API Anthropic) ──────────────────────

function Chatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Bonjour ! Je suis LBEHJA, l'assistant AtlasHost. Comment puis-je vous aider pour votre séjour au Maroc ?" },
  ]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'AtlasHost, la première plateforme marocaine d'hébergement chez l'habitant certifiée.

Ton rôle :
- Aider les voyageurs à trouver une famille d'accueil au Maroc
- Répondre aux questions sur les villes disponibles (Casablanca, Marrakech, Rabat, Tanger)
- Expliquer le processus de réservation et la certification des familles
- Donner des informations sur le Maroc, la culture marocaine, et les activités
- Rassurer les voyageurs sur la sécurité et le paiement

Informations clés :
- 4 villes : Casablanca (34 familles), Marrakech (52 familles), Rabat (28 familles), Tanger (19 familles)
- Prix : entre 260 et 410 MAD par nuit selon la famille
- Toutes les familles certifiées ont fourni : CIN + certificat de résidence + dossier validé
- Paiement sécurisé par SSL, remboursement possible selon conditions
- Contact support : support@atlashost.ma

Réponds toujours en français, de façon chaleureuse, concise et professionnelle. Maximum 3 phrases par réponse.`;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { type: "user", text: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages
        .filter((m) => m.type !== "system")
        .map((m) => ({
          role: m.type === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      if (!response.ok) throw new Error("Erreur API");

      const data = await response.json();
      const botText = data.content?.[0]?.text || "Désolé, je n'ai pas pu traiter votre demande.";

      setMessages((prev) => [...prev, { type: "bot", text: botText }]);
    } catch {
      const fallbacks = [
        "Je recherche les meilleures familles disponibles pour vous dans nos 4 villes.",
        "Vous pouvez filtrer par ville dans la section Familles. Souhaitez-vous voir les familles à Marrakech ?",
        "Le paiement est sécurisé par SSL. La confirmation arrivera par e-mail sous 5 minutes.",
        "Pour toute question sur votre réservation, contactez-nous à support@atlashost.ma",
        "Nos familles certifiées ont toutes fourni CIN et certificat de résidence validés par notre équipe.",
      ];
      const random = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setMessages((prev) => [...prev, { type: "bot", text: random }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-bubble">
      <div className={`chatbot-window${open ? "" : " hidden"}`}>
        <div className="chatbot-window__header">
          <div className="chatbot-window__avatar">
            <img src={iconChatBot} alt="LBEHJA" style={{ width: 38, height: 38, objectFit: "contain", borderRadius: "50%" }} />
          </div>
          <div className="chatbot-window__info">
            <h5>LBEHJA</h5>
            <span>En ligne · répond en quelques secondes</span>
          </div>
          <button className="chatbot-window__close" onClick={() => setOpen(false)} aria-label="Fermer le chat">✕</button>
        </div>

        <div className="chatbot-window__messages">
          {messages.map((m, i) => (
            <div key={i} className={`message message--${m.type}`}>{m.text}</div>
          ))}
          {loading && (
            <div className="message message--bot" style={{ opacity: 0.6 }}>
              <span>···</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-window__input">
          <input
            type="text"
            placeholder="Posez votre question…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
          />
          <button
            className="chatbot-window__send"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Envoyer"
          >
            ➤
          </button>
        </div>
      </div>

      {!open && (
        <div className="chatbot-bubble__tooltip">Besoin d'aide ?</div>
      )}
      <button
        className="chatbot-bubble__btn"
        onClick={() => setOpen(!open)}
        aria-label="Ouvrir le chatbot"
      >
        <div className="chatbot-bubble__pulse" />
        {open
          ? "✕"
          : <img src={iconChatBot} alt="LBEHJA" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: "50%" }} />
        }
      </button>
    </div>
  );
}

// ─── Modal Réservation ─────────────────────────────────────────

function ModalReservation({ famille, onClose }) {
  const [dateDebut,    setDateDebut]    = useState("");
  const [dateFin,      setDateFin]      = useState("");
  const [nbPersonnes,  setNbPersonnes]  = useState(1);
  const [message,      setMessage]      = useState("");
  const [submitted,    setSubmitted]    = useState(false);
  const [resError,     setResError]     = useState("");
  const [resLoading,   setResLoading]   = useState(false);
  const [bookedRanges, setBookedRanges] = useState([]);

  useEffect(() => {
    if (!famille) return;
    fetch(`${API}/listings/${famille.listingId}/booked-dates`)
      .then(r => r.json())
      .then(json => { if (json.success) setBookedRanges(json.data); })
      .catch(() => {});
  }, [famille?.listingId]);

  if (!famille) return null;

  const dateConflict = dateDebut && dateFin &&
    bookedRanges.some(r => dateDebut < r.date_fin && dateFin > r.date_debut);

  const nbNuits = (() => {
    if (!dateDebut || !dateFin) return 0;
    const diff = (new Date(dateFin) - new Date(dateDebut)) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  })();

  const total = nbNuits * famille.prix;

  const handleSubmit = async () => {
    if (!dateDebut || !dateFin || nbNuits === 0) return;
    setResError("");
    setResLoading(true);
    try {
      const res = await fetch(`${API}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          listing_id: famille.listingId,
          date_debut: dateDebut,
          date_fin:   dateFin,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        const err = json.error;
        setResError(typeof err === "string" ? err : "Erreur lors de la réservation.");
      }
    } catch {
      setResError("Impossible de joindre le serveur.");
    } finally {
      setResLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Réserver — {famille.nom}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        <div className="modal__body">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "36px 0" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>✅</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "var(--crimson-deep)", marginBottom: 10 }}>
                Réservation confirmée !
              </h3>
              <p style={{ color: "var(--text-soft)", marginBottom: 28, lineHeight: 1.7 }}>
                Un e-mail de confirmation vous a été envoyé. La {famille.nom} vous contactera sous 24h.
              </p>
              <button className="btn btn--solid" onClick={onClose}>Fermer</button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Date d'arrivée</label>
                  <input
                    type="date"
                    value={dateDebut}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDateDebut(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Date de départ</label>
                  <input
                    type="date"
                    value={dateFin}
                    min={dateDebut || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDateFin(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nombre de personnes</label>
                <select value={nbPersonnes} onChange={(e) => setNbPersonnes(Number(e.target.value))}>
                  {[...Array(famille.places)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} personne{i > 0 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Message à la famille (optionnel)</label>
                <textarea
                  rows={3}
                  placeholder="Présentez-vous, précisez vos besoins…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="modal__total">
                <div>
                  <div className="modal__total-label">
                    {famille.prix} MAD × {nbNuits} nuit{nbNuits > 1 ? "s" : ""}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-soft)", marginTop: 3 }}>
                    🔒 Paiement sécurisé SSL
                  </div>
                </div>
                <div className="modal__total-price">{total.toLocaleString()} MAD</div>
              </div>

              {bookedRanges.length > 0 && (
                <div style={{ background: "#fff7ed", border: "1px solid #f97316", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: "0.82rem", color: "#c2410c" }}>
                  <strong>Dates indisponibles pour cette famille :</strong>
                  <ul style={{ margin: "6px 0 0 0", paddingLeft: 18 }}>
                    {bookedRanges.map((r, i) => (
                      <li key={i}>
                        {new Date(r.date_debut).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                        {" → "}
                        {new Date(r.date_fin).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {dateConflict && (
                <p style={{ color: "#c2410c", background: "#fff1f2", border: "1px solid #fca5a5", borderRadius: 6, padding: "8px 12px", fontSize: "0.88rem", marginBottom: 8 }}>
                  ⚠️ Ces dates chevauchent une réservation existante. Veuillez choisir d'autres dates.
                </p>
              )}

              {resError && (
                <p style={{ color: "var(--crimson)", fontSize: "0.88rem", marginBottom: 8 }}>{resError}</p>
              )}
              <button
                className="btn btn--solid"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={handleSubmit}
                disabled={nbNuits === 0 || resLoading || dateConflict}
              >
                {resLoading ? "Envoi…" : "Procéder au paiement"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__logo-text">Atlas<span>Host</span></div>
          <p>
            La première plateforme marocaine d'hébergement chez l'habitant certifiée.
            Une expérience humaine, culturelle et authentique.
          </p>
        </div>

        <div className="footer__col">
          <h5>Navigation</h5>
          <ul>
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#avantages">À propos</a></li>
            <li><a href="#familles">Familles</a></li>
            <li><a href="#temoignages">Avis</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h5>Destinations</h5>
          <ul>
            {VILLES.map((v) => (
              <li key={v.id}><a href={`#${v.id}`}>{v.nom}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h5>Support</h5>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="mailto:support@atlashost.ma">Nous contacter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2025 AtlasHost — Tous droits réservés. MOUKRIM Ayman — PFE BTS DAI2</span>
        <span>Made in Morocco 🇲🇦</span>
      </div>
    </footer>
  );
}

// ─── Composant Principal ───────────────────────────────────────

export default function Visiteur() {
  const [modalFamille, setModalFamille] = useState(null);

  const handleVilleSelect = () => {
    document.getElementById("familles")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar onLoginClick={handleLoginClick} />

      <main>
        <Hero         onReserverClick={() => document.getElementById("familles")?.scrollIntoView({ behavior: "smooth" })} />
        <HowItWorks />
        <Villes       onVilleSelect={handleVilleSelect} />
        <FamillesListing onReserver={(f) => setModalFamille(f)} />
        <Avantages />
        <Temoignages />
        <CTASection   onReserverClick={() => document.getElementById("familles")?.scrollIntoView({ behavior: "smooth" })} />
      </main>

      <Footer />
      <Chatbot />

      <ModalReservation
        famille={modalFamille}
        onClose={() => setModalFamille(null)}
      />
    </>
  );
}