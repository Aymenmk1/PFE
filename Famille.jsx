// ============================================================
//  AtlasHost — Famille.jsx  v1.0
//  Interface Famille d'accueil — Dépôt de dossier + Dashboard
//  Auteur : MOUKRIM Ayman — PFE BTS DAI2
// ============================================================

import { useState, useEffect, useRef } from "react";
import logo from "./assets/atlas-logo.png.png";
import heroBg from "./assets/bgfamille.png";
import iconChatBot from "./assets/iconChatBot.png";
//import imgAvantages from "./assets/téléchargement.jpg"; // ← image de fond
import imgSide from "./assets/avantagesfamille.jpg";      // ← image côté texte (changez si différente)
import bgFormulaire from "./assets/bgfamilleformulaire.avif";

const API         = "http://localhost:8000/api";
const getToken    = () => localStorage.getItem("atlas_token");
const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
});

// ─── Données statiques ────────────────────────────────────────

const VILLES_DISPO = ["Casablanca", "Marrakech", "Rabat", "Tanger"];



const AVANTAGES_FAMILLE = [
  {
    icon: "💰",
    titre: "Revenus complémentaires",
    desc: "Valorisez votre hospitalité naturelle. Fixez votre tarif et générez un revenu régulier sans engagement.",
  },
  {
    icon: "🛡️",
    titre: "Plateforme certifiée",
    desc: "Profil vérifié, paiements sécurisés, garantie en cas d'incident. Votre tranquillité d'esprit avant tout.",
  },
  {
    icon: "📅",
    titre: "Calendrier flexible",
    desc: "Gérez vos disponibilités en quelques clics. Acceptez ou refusez les réservations selon votre rythme.",
  },
  {
    icon: "🌍",
    titre: "Visibilité internationale",
    desc: "Votre annonce diffusée auprès de milliers de voyageurs internationaux à la recherche d'authenticité.",
  },
  {
    icon: "💳",
    titre: "Paiement garanti",
    desc: "Versement sécurisé sous 72h après le départ du voyageur. Aucun risque d'impayé.",
  },
  {
    icon: "🤝",
    titre: "Accompagnement humain",
    desc: "Une équipe dédiée vous accompagne du dépôt du dossier à votre première réservation.",
  },
];

const ETAPES_DEVENIR = [
  { num: "01", titre: "Créez votre compte",     desc: "Inscription gratuite en 2 minutes. Renseignez vos informations personnelles et de contact." },
  { num: "02", titre: "Déposez votre dossier",  desc: "CIN, certificat de résidence, photos du logement, description et tarif. Notre équipe valide sous 48h." },
  { num: "03", titre: "Annonce publiée",        desc: "Une fois certifiée, votre annonce est mise en ligne automatiquement et visible par tous les voyageurs." },
  { num: "04", titre: "Accueillez & gagnez",    desc: "Recevez les demandes, gérez votre calendrier, et touchez vos paiements en toute sécurité." },
];

const RESERVATIONS_DEMO = [
  { id: 1, voyageur: "Sophie Martin",   pays: "France",  arrivee: "12 Mai 2026", depart: "16 Mai 2026", nuits: 4, total: 1120, statut: "confirmée" },
  { id: 2, voyageur: "James Cooper",    pays: "UK",      arrivee: "22 Mai 2026", depart: "25 Mai 2026", nuits: 3, total: 840,  statut: "en attente" },
  { id: 3, voyageur: "Yuki Tanaka",     pays: "Japon",   arrivee: "03 Juin 2026", depart: "07 Juin 2026", nuits: 4, total: 1120, statut: "confirmée" },
  { id: 4, voyageur: "Ahmed Al-Saidi",  pays: "Émirats", arrivee: "18 Juin 2026", depart: "22 Juin 2026", nuits: 4, total: 1120, statut: "confirmée" },
];

const AVIS_DEMO = [
  { id: 1, auteur: "Sophie M.",  pays: "France",     note: 5, texte: "Accueil exceptionnel, repas délicieux. La famille m'a fait découvrir la médina comme aucune visite ne l'aurait fait.", date: "Avril 2026" },
  { id: 2, auteur: "James C.",   pays: "UK",         note: 5, texte: "Hospitality at its finest. Felt like home from the very first minute. Highly recommended !", date: "Mars 2026" },
  { id: 3, auteur: "Lucia R.",   pays: "Espagne",    note: 4, texte: "Très bonne expérience, chambre propre et confortable. Petit-déjeuner copieux chaque matin.", date: "Mars 2026" },
];

const PAIEMENTS_DEMO = [
  { id: 1, mois: "Avril 2026", reservations: 3, brut: 3360, commission: 336, net: 3024, statut: "versé" },
  { id: 2, mois: "Mars 2026",  reservations: 2, brut: 2240, commission: 224, net: 2016, statut: "versé" },
  { id: 3, mois: "Février 2026", reservations: 2, brut: 1960, commission: 196, net: 1764, statut: "versé" },
];

const TEMOIGNAGES_FAMILLES = [
  { id: 1, nom: "Famille Benali",   ville: "Marrakech", texte: "AtlasHost a transformé notre maison en un véritable lieu d'échange culturel. Nous accueillons 4 à 5 familles par mois.", revenu: "+3 200 MAD/mois", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" },
  { id: 2, nom: "Famille Idrissi",  ville: "Casablanca", texte: "Plateforme sérieuse, support réactif. Le calendrier est très simple à gérer même pour ma mère qui n'est pas à l'aise avec la technologie.", revenu: "+2 800 MAD/mois", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" },
  { id: 3, nom: "Famille Chaoui",   ville: "Rabat",      texte: "Nos enfants pratiquent l'anglais avec les voyageurs, et nous gagnons un complément de revenu. Une expérience humaine inoubliable.", revenu: "+3 500 MAD/mois", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80" },
];

// ─── Navbar Famille ────────────────────────────────────────────

function NavbarFamille({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

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
    { label: "Accueil",          id: "f-accueil" },
    { label: "Dépôt de dossier", id: "f-dossier" },
    { label: "Tableau de bord",  id: "f-dashboard" },
    { label: "Calendrier",       id: "f-calendrier" },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar__logo">
          <img src={logo} alt="AtlasHost Logo" className="navbar__logo-icon" />
          <span className="navbar__logo-text">
            Atlas<span>Host</span>
            <small className="navbar__logo-sub">Espace Famille</small>
          </span>
        </div>

        {/* Liens desktop */}
        <ul className="navbar__links">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
                className={i === 0 ? "active" : ""}
              >
                {l.label}
              </a>
            </li>
          ))}
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
          <button className="btn btn--solid" onClick={() => scrollTo("f-dossier")}>
            Devenir hôte
          </button>
        </div>

        {/* Hamburger mobile */}
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

      <ul className={`navbar__mobile-menu${menuOpen ? " open" : ""}`}>
        {navLinks.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}>
              {l.label}
            </a>
          </li>
        ))}
        <li style={{ borderTop: "1px solid rgba(122,16,16,0.1)", paddingTop: 8, marginTop: 4 }}>
          <a href="/login" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>
            Mon compte
          </a>
        </li>
      </ul>
    </>
  );
}

// ─── Hero Famille ──────────────────────────────────────────────

function HeroFamille({ onCTAClick }) {
  return (
    <section className="hero hero--famille" id="f-accueil">
      <div className="hero__bg" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="hero__overlay" />

      <div className="hero__content">
        <div className="hero__badge">Devenez Famille d'Accueil · Maroc</div>
        <h1 className="hero__title">
          Partagez votre <em>hospitalité</em>, valorisez votre culture
        </h1>
        <p className="hero__subtitle">
          Rejoignez la première communauté de familles d'accueil certifiées au Maroc.
          Accueillez des voyageurs du monde entier et générez un revenu complémentaire en toute simplicité.
        </p>
        <div className="hero__actions">
          <button className="btn btn--gold btn--lg" onClick={onCTAClick}>
            Déposer mon dossier
          </button>
          <button
            className="btn btn--outline btn--lg"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
            onClick={() => document.getElementById("f-avantages")?.scrollIntoView({ behavior: "smooth" })}
          >
            Pourquoi nous rejoindre ?
          </button>
        </div>
      </div>

      <div className="hero__scroll">Découvrir</div>
    </section>
  );
}



// ─── Avantages Famille ─────────────────────────────────────────

function AvantagesFamille() {
  return (
    <section className="avantages-famille" id="f-avantages">
      <div
        className="avantages-famille__bg"
        style={{ backgroundImage: `url(${imgSide})` }}
      />
      <div className="avantages-famille__overlay" />

      <div className="avantages-famille__inner">

        {/* Colonne gauche — image */}
        <div className="avantages-famille__img-col">
          <div className="avantages-famille__img-wrap">
            <img src={imgSide} alt="Intérieur maison d'accueil AtlasHost" />
          </div>
        </div>

        {/* Colonne droite — texte */}
        <div className="avantages-famille__text-col">
          <div className="section-label" style={{ textAlign: "left" }}>
            Pourquoi rejoindre AtlasHost
          </div>
          <h2 className="avantages-famille__title">
            Une opportunité unique pour votre foyer
          </h2>

          <div className="avantages-famille__prose">
            <p>
              Rejoindre AtlasHost, c'est transformer votre hospitalité naturelle en une
              source de <strong>revenus complémentaires stables</strong>, sans contrainte
              ni engagement. Vous fixez librement votre tarif par nuit et gérez votre
              calendrier à votre rythme — en quelques clics seulement.
            </p>
            <p>
              Notre plateforme certifiée garantit des <strong>paiements sécurisés</strong>,
              versés sous 72 heures après le départ de chaque voyageur, sans aucun risque
              d'impayé. Votre profil est vérifié, votre annonce protégée, et notre équipe
              vous accompagne à chaque étape — du dépôt de dossier jusqu'à votre première
              réservation.
            </p>
            <p>
              En rejoignant notre communauté, votre logement bénéficie d'une
              <strong> visibilité internationale</strong> auprès de milliers de voyageurs
              en quête d'authenticité. Vous devenez ambassadeur de la culture marocaine,
              tout en vivant des échanges humains enrichissants au cœur de votre propre
              foyer.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
// ─── Comment devenir famille (4 étapes) ────────────────────────

function CommentDevenir() {
  return (
    <section className="comment-devenir" id="f-comment">
      <div className="section-label">Le processus</div>
      <h2 className="section-title">Comment devenir famille d'accueil</h2>
      

      <div className="etapes-grid">
        {ETAPES_DEVENIR.map((s) => (
          <div className="etape-card" key={s.num}>
            <div className="etape-card__num">{s.num}</div>
            <h4>{s.titre}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Dépôt de dossier (formulaire) ─────────────────────────────

function DepotDossier() {
  const [existingDossier,   setExistingDossier]   = useState(null);
  const [checkingDossier,   setCheckingDossier]   = useState(true);

  useEffect(() => {
    fetch(`${API}/family/dossier`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((json) => { if (json.success) setExistingDossier(json.data); })
      .catch(() => {})
      .finally(() => setCheckingDossier(false));
  }, []);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    // Étape 1 — Identité
    nom: "", prenom: "", cin: "", telephone: "", email: "",
    // Étape 2 — Logement
    ville: "", adresse: "", description: "", places: 2, tarif: 280,
    // Étape 3 — Documents (mock — on stocke juste les noms de fichiers)
    fichierCIN: null, fichierResidence: null, photos: [],
    accept: false,
  });

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const [submitError,   setSubmitError]   = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleFile = (k, file) => {
    if (!file) return;
    update(k, file); // stocke le vrai objet File
  };

  const handlePhotos = (files) => {
    update("photos", Array.from(files)); // stocke File[]
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    if (!form.accept) return;
    setSubmitError("");
    setSubmitLoading(true);

    const fd = new FormData();
    fd.append("adresse",        form.adresse);
    fd.append("ville",          form.ville);
    fd.append("description",    form.description);
    fd.append("tarif_par_nuit", form.tarif);
    fd.append("nombre_places",  form.places);
    fd.append("cin",            form.fichierCIN);
    fd.append("certificat_residence", form.fichierResidence);
    form.photos.forEach((p) => fd.append("photos[]", p));

    try {
      const res  = await fetch(`${API}/family/dossier`, {
        method:  "POST",
        headers: authHeaders(), // pas de Content-Type → browser gère multipart
        body:    fd,
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        const err = json.error;
        if (typeof err === "string") {
          setSubmitError(err);
        } else if (err && typeof err === "object") {
          const firstField = Object.keys(err)[0];
          const firstMsg   = Array.isArray(err[firstField]) ? err[firstField][0] : String(err[firstField]);
          setSubmitError(`${firstField} : ${firstMsg}`);
        } else {
          setSubmitError("Erreur inconnue — consultez la console.");
        }
      }
    } catch {
      setSubmitError("Impossible de joindre le serveur.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const stepValid = (() => {
    if (step === 1) return form.nom && form.prenom && form.cin.length >= 6 && form.telephone && form.email.includes("@");
    if (step === 2) return form.ville && form.adresse && form.description.length > 20 && form.tarif > 0;
    if (step === 3) return form.fichierCIN && form.fichierResidence && form.photos.length > 0 && form.accept;
    return false;
  })();

  const STATUT_INFO = {
    pending:   { badge: "badge--wait", icon: "⏳", label: "En cours de vérification", hint: "Notre équipe examine votre dossier sous 48h." },
    validated: { badge: "badge--ok",   icon: "✅", label: "Dossier certifié",          hint: "Votre annonce est publiée et visible par les voyageurs." },
    rejected:  { badge: "badge--wait", icon: "❌", label: "Dossier rejeté",            hint: "Contactez famille@atlashost.ma pour plus d'informations.", style: { background: "#c0392b", color: "#fff" } },
  };

  if (checkingDossier) {
    return (
      <section className="depot-dossier" id="f-dossier">
        <div className="depot-dossier__bg" style={{ backgroundImage: `url(${bgFormulaire})` }} />
        <div className="depot-dossier__overlay" />
        <div className="depot-success">
          <p style={{ color: "var(--text-soft)" }}>Vérification du dossier…</p>
        </div>
      </section>
    );
  }

  if (existingDossier) {
    const info = STATUT_INFO[existingDossier.statut_certif] ?? STATUT_INFO.pending;
    return (
      <section className="depot-dossier" id="f-dossier">
        <div className="depot-dossier__bg" style={{ backgroundImage: `url(${bgFormulaire})` }} />
        <div className="depot-dossier__overlay" />
        <div className="depot-success">
          <div className="depot-success__icon">{info.icon}</div>
          <h2>Dossier déjà soumis</h2>
          <div style={{ marginBottom: 12 }}>
            <span className={`badge ${info.badge}`} style={info.style ?? {}}>{info.label}</span>
          </div>
          <p>{info.hint}</p>
          <div style={{ marginTop: 8, color: "var(--text-soft)", fontSize: "0.88rem" }}>
            Ville : <strong>{existingDossier.ville}</strong> ·
            Places : <strong>{existingDossier.nombre_places}</strong> ·
            Tarif : <strong>{existingDossier.tarif_par_nuit} MAD/nuit</strong>
          </div>
          <button
            className="btn btn--solid btn--lg"
            style={{ marginTop: 20 }}
            onClick={() => document.getElementById("f-dashboard")?.scrollIntoView({ behavior: "smooth" })}
          >
            Voir mon tableau de bord
          </button>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="depot-dossier" id="f-dossier">
        <div className="depot-dossier__bg" style={{ backgroundImage: `url(${bgFormulaire})` }} />
        <div className="depot-dossier__overlay" />
        <div className="depot-success">
          <div className="depot-success__icon">✅</div>
          <h2>Dossier soumis avec succès !</h2>
          <p>
            Merci <strong>{form.prenom} {form.nom}</strong>. Notre équipe examine votre dossier
            et vous contactera sous <strong>48 heures</strong> à l'adresse <strong>{form.email}</strong>.
          </p>
          <p className="depot-success__hint">
            Vous pouvez suivre l'avancement depuis votre tableau de bord.
          </p>
          <button className="btn btn--solid btn--lg" onClick={() => document.getElementById("f-dashboard")?.scrollIntoView({ behavior: "smooth" })}>
            Accéder au tableau de bord
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="depot-dossier" id="f-dossier">
  <div className="depot-dossier__bg" style={{ backgroundImage: `url(${bgFormulaire})` }} />
  <div className="depot-dossier__overlay" />
  <div className="section-label">Candidature</div>
      <h2 className="section-title">Déposez votre dossier</h2>
      

      {/* Stepper */}
      <div className="stepper">
        {["Identité", "Logement", "Documents"].map((label, i) => {
          const n = i + 1;
          return (
            <div key={n} className={`stepper__item${step === n ? " active" : ""}${step > n ? " done" : ""}`}>
              <div className="stepper__circle">{step > n ? "✓" : n}</div>
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="depot-form">
        {/* ÉTAPE 1 */}
        {step === 1 && (
          <>
            <h3 className="depot-form__sec">Vos informations personnelles</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Nom *</label>
                <input value={form.nom} onChange={(e) => update("nom", e.target.value)} placeholder="Benali" />
              </div>
              <div className="form-group">
                <label>Prénom *</label>
                <input value={form.prenom} onChange={(e) => update("prenom", e.target.value)} placeholder="Karim" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Numéro CIN *</label>
                <input value={form.cin} onChange={(e) => update("cin", e.target.value)} placeholder="AB123456" />
              </div>
              <div className="form-group">
                <label>Téléphone *</label>
                <input value={form.telephone} onChange={(e) => update("telephone", e.target.value)} placeholder="+212 6 12 34 56 78" />
              </div>
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="vous@exemple.com" />
            </div>
          </>
        )}

        {/* ÉTAPE 2 */}
        {step === 2 && (
          <>
            <h3 className="depot-form__sec">Détails du logement</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Ville d'accueil *</label>
                <select value={form.ville} onChange={(e) => update("ville", e.target.value)}>
                  <option value="">— Choisir —</option>
                  {VILLES_DISPO.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Nombre de places *</label>
                <select value={form.places} onChange={(e) => update("places", Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} place{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Adresse complète *</label>
              <input value={form.adresse} onChange={(e) => update("adresse", e.target.value)} placeholder="Rue, quartier, ville" />
            </div>
            <div className="form-group">
              <label>Description du logement et de l'expérience proposée *</label>
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Décrivez votre logement, l'ambiance familiale, les repas, les activités proposées… (min. 20 caractères)"
              />
              <div className="form-hint">{form.description.length} caractères</div>
            </div>
            <div className="form-group">
              <label>Tarif par nuit (MAD) *</label>
              <input
                type="number"
                min={100}
                max={1500}
                value={form.tarif}
                onChange={(e) => update("tarif", Number(e.target.value))}
              />
              <div className="form-hint">Commission AtlasHost : 10 % — Vous percevrez {Math.round(form.tarif * 0.9)} MAD / nuit</div>
            </div>
          </>
        )}

        {/* ÉTAPE 3 */}
        {step === 3 && (
          <>
            <h3 className="depot-form__sec">Pièces justificatives</h3>

            <div className="upload-zone">
              <label className="upload-label">
                <div className="upload-label__icon">🪪</div>
                <div>
                  <div className="upload-label__title">Carte d'identité nationale (CIN) *</div>
                  <div className="upload-label__sub">{form.fichierCIN?.name ?? "PDF ou image — Max 5 Mo"}</div>
                </div>
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFile("fichierCIN", e.target.files[0])} hidden />
                <span className="btn btn--outline btn--sm">{form.fichierCIN ? "Changer" : "Téléverser"}</span>
              </label>

              <label className="upload-label">
                <div className="upload-label__icon">📄</div>
                <div>
                  <div className="upload-label__title">Certificat de résidence *</div>
                  <div className="upload-label__sub">{form.fichierResidence?.name ?? "Délivré par votre arrondissement — Max 5 Mo"}</div>
                </div>
                <input type="file" accept="image/*,.pdf" onChange={(e) => handleFile("fichierResidence", e.target.files[0])} hidden />
                <span className="btn btn--outline btn--sm">{form.fichierResidence ? "Changer" : "Téléverser"}</span>
              </label>

              <label className="upload-label">
                <div className="upload-label__icon">📸</div>
                <div>
                  <div className="upload-label__title">Photos du logement * (3 minimum)</div>
                  <div className="upload-label__sub">
                    {form.photos.length > 0
                      ? `${form.photos.length} photo${form.photos.length > 1 ? "s" : ""} sélectionnée${form.photos.length > 1 ? "s" : ""}`
                      : "JPG / PNG — Max 5 Mo par photo"}
                  </div>
                </div>
                <input type="file" accept="image/*" multiple onChange={(e) => handlePhotos(e.target.files)} hidden />
                <span className="btn btn--outline btn--sm">{form.photos.length > 0 ? "Modifier" : "Téléverser"}</span>
              </label>
            </div>

            <label className="form-checkbox">
              <input type="checkbox" checked={form.accept} onChange={(e) => update("accept", e.target.checked)} />
              <span>
                J'accepte les <a href="#">conditions générales</a> et la <a href="#">politique de confidentialité</a>.
                Je certifie que les informations fournies sont exactes.
              </span>
            </label>
          </>
        )}

        {/* Navigation entre étapes */}
        {submitError && (
          <div style={{
            background: "#fdecea", border: "1px solid #f5c6cb", borderRadius: 8,
            padding: "10px 16px", marginBottom: 12, color: "#c0392b", fontSize: "0.9rem",
          }}>
            ⚠️ {submitError}
          </div>
        )}
        <div className="depot-form__nav">
          {step > 1 && (
            <button className="btn btn--outline" onClick={prev} disabled={submitLoading}>← Précédent</button>
          )}
          <div style={{ flex: 1 }} />
          {step < 3 && (
            <button className="btn btn--solid" onClick={next} disabled={!stepValid}>
              Suivant →
            </button>
          )}
          {step === 3 && (
            <button
              className="btn btn--gold btn--lg"
              onClick={submit}
              disabled={!stepValid || submitLoading}
            >
              {submitLoading ? "Envoi en cours…" : "Soumettre mon dossier"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Tableau de bord (Dashboard) ───────────────────────────────

function TableauDeBord() {
  const [tab,           setTab]           = useState("reservations");
  const [dossier,       setDossier]       = useState(null);
  const [reservations,  setReservations]  = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const handleReservationAction = async (id, action) => {
    setActionLoading(id + action);
    try {
      const res  = await fetch(`${API}/family/reservations/${id}/${action}`, {
        method:  "POST",
        headers: authHeaders(),
      });
      const json = await res.json();
      if (json.success) {
        setReservations(prev =>
          prev.map(r => r.id === id
            ? { ...r, statut: action === "confirm" ? "confirmed" : "cancelled" }
            : r
          )
        );
      }
    } catch {
      // silently ignored — table state unchanged
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        const [dosRes, resRes] = await Promise.all([
          fetch(`${API}/family/dossier`,      { headers: authHeaders() }),
          fetch(`${API}/family/reservations`, { headers: authHeaders() }),
        ]);
        const dosJson = await dosRes.json();
        const resJson = await resRes.json();
        if (!cancelled) {
          if (dosJson.success) setDossier(dosJson.data);
          if (resJson.success) setReservations(resJson.data);
        }
      } catch {
        // empty state handles missing data
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, []);

  // Re-fetch dossier status each time the "Mon dossier" tab is opened
  useEffect(() => {
    if (tab !== "dossier") return;
    fetch(`${API}/family/dossier`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((json) => { if (json.success) setDossier(json.data); })
      .catch(() => {});
  }, [tab]);

  // Re-fetch reservations each time the "Réservations" tab is opened
  useEffect(() => {
    if (tab !== "reservations") return;
    setLoading(true);
    fetch(`${API}/family/reservations`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((json) => { if (json.success) setReservations(json.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tab]);

  const formatDate  = (d) => d ? new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" }) : "—";
  const nuits       = (a, b) => a && b ? Math.round((new Date(b) - new Date(a)) / 86400000) : 0;
  const statutLabel = (s) => ({ pending: "en attente", confirmed: "confirmée", cancelled: "annulée", completed: "terminée" }[s] ?? s);
  const statutBadge = (s) => ({ pending: "badge--wait", confirmed: "badge--ok", cancelled: "badge--wait", completed: "badge--ok" }[s] ?? "badge--wait");

  return (
    <section className="dashboard" id="f-dashboard">
      <div className="dashboard__bg" style={{ backgroundImage: `url(${bgFormulaire})` }} />
      <div className="dashboard__overlay" />
      <div className="section-label">Espace Hôte</div>
      <h2 className="section-title">Votre tableau de bord</h2>

      {/* Tabs */}
      <div className="dash-tabs">
        {[
          { id: "reservations", label: " Réservations" },
          { id: "avis",         label: " Avis reçus" },
          { id: "paiements",    label: " Paiements" },
          { id: "dossier",      label: " Mon dossier" },
        ].map((t) => (
          <button
            key={t.id}
            className={`dash-tab${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="dash-content">
        {tab === "reservations" && (
          <div className="dash-table">
            <div className="dash-table__head">
              <div>Voyageur</div><div>Email</div><div>Arrivée</div><div>Départ</div><div>Nuits</div><div>Total</div><div>Statut</div><div>Actions</div>
            </div>
            {loading ? (
              <div style={{ textAlign: "center", padding: 32, color: "var(--text-soft)", gridColumn: "1/-1" }}>Chargement…</div>
            ) : reservations.length === 0 ? (
              <div style={{ textAlign: "center", padding: 32, color: "var(--text-soft)", gridColumn: "1/-1" }}>Aucune réservation reçue pour le moment.</div>
            ) : reservations.map((r) => (
              <div className="dash-table__row" key={r.id}>
                <div><strong>{r.user?.prenom} {r.user?.nom}</strong></div>
                <div>{r.user?.email}</div>
                <div>{formatDate(r.date_debut)}</div>
                <div>{formatDate(r.date_fin)}</div>
                <div>{nuits(r.date_debut, r.date_fin)}</div>
                <div>{r.montant} MAD</div>
                <div><span className={`badge ${statutBadge(r.statut)}`}>{statutLabel(r.statut)}</span></div>
                <div style={{ display: "flex", gap: 6 }}>
                  {r.statut === "pending" ? (
                    <>
                      <button
                        style={{ padding: "4px 10px", fontSize: "0.78rem", background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", opacity: actionLoading ? 0.6 : 1 }}
                        disabled={!!actionLoading}
                        onClick={() => handleReservationAction(r.id, "confirm")}
                      >
                        {actionLoading === r.id + "confirm" ? "…" : "✓ Confirmer"}
                      </button>
                      <button
                        style={{ padding: "4px 10px", fontSize: "0.78rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", opacity: actionLoading ? 0.6 : 1 }}
                        disabled={!!actionLoading}
                        onClick={() => handleReservationAction(r.id, "reject")}
                      >
                        {actionLoading === r.id + "reject" ? "…" : "✕ Refuser"}
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: "0.78rem", color: "var(--text-soft)" }}>—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "avis" && (
          <div className="dash-avis">
            {AVIS_DEMO.map((a) => (
              <div className="dash-avis-card" key={a.id}>
                <div className="dash-avis-card__head">
                  <div>
                    <strong>{a.auteur}</strong>
                    <span className="dash-avis-card__pays"> · {a.pays}</span>
                  </div>
                  <div className="dash-avis-card__stars">{"★".repeat(a.note)}{"☆".repeat(5 - a.note)}</div>
                </div>
                <p>"{a.texte}"</p>
                <div className="dash-avis-card__date">{a.date}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "paiements" && (
          <div className="dash-table">
            <div className="dash-table__head dash-table__head--7">
              <div>Mois</div><div>Réservations</div><div>Brut</div><div>Commission (10%)</div><div>Net versé</div><div>Statut</div><div>Action</div>
            </div>
            {PAIEMENTS_DEMO.map((p) => (
              <div className="dash-table__row dash-table__row--7" key={p.id}>
                <div><strong>{p.mois}</strong></div>
                <div>{p.reservations}</div>
                <div>{p.brut.toLocaleString()} MAD</div>
                <div style={{ color: "var(--text-soft)" }}>– {p.commission} MAD</div>
                <div style={{ color: "var(--crimson)", fontWeight: 700 }}>{p.net.toLocaleString()} MAD</div>
                <div><span className="badge badge--ok">{p.statut}</span></div>
                <div><a href="#" className="dash-link">Reçu PDF</a></div>
              </div>
            ))}
          </div>
        )}

        {tab === "dossier" && (
          <div className="dash-dossier">
            {loading ? (
              <div style={{ textAlign: "center", padding: 40, color: "var(--text-soft)" }}>Chargement…</div>
            ) : !dossier ? (
              <div style={{ textAlign: "center", padding: 40, color: "var(--text-soft)" }}>
                Aucun dossier soumis. Déposez votre candidature via le formulaire ci-dessus.
              </div>
            ) : (
              <>
                <div className="dash-dossier__statut">
                  {dossier.statut_certif === "validated" && <span className="badge badge--ok">✓ Dossier certifié</span>}
                  {dossier.statut_certif === "pending"   && <span className="badge badge--wait">⏳ En cours de vérification</span>}
                  {dossier.statut_certif === "rejected"  && <span className="badge badge--wait" style={{ background: "#c0392b", color: "#fff" }}>✕ Dossier rejeté</span>}
                  <span style={{ marginLeft: 12, color: "var(--text-soft)", fontSize: "0.88rem" }}>
                    {dossier.statut_certif === "validated" && "Annonce publiée et visible par les voyageurs"}
                    {dossier.statut_certif === "pending"   && "Traitement sous 48h par notre équipe"}
                    {dossier.statut_certif === "rejected"  && "Contactez famille@atlashost.ma pour plus d'informations"}
                  </span>
                </div>
                <ul className="dash-checklist">
                  <li className="ok">✓ CIN soumise</li>
                  <li className="ok">✓ Certificat de résidence soumis</li>
                  <li className="ok">✓ Photos du logement soumises</li>
                  {dossier.statut_certif === "validated" && <li className="ok">✓ Annonce publiée — Visible publiquement</li>}
                  {dossier.statut_certif === "pending"   && <li>⏳ En attente de validation par l'administrateur</li>}
                  {dossier.statut_certif === "rejected"  && <li>✕ Dossier non conforme — Contactez le support</li>}
                </ul>
                <div style={{ marginTop: 16, display: "flex", gap: 24, flexWrap: "wrap", fontSize: "0.9rem", color: "var(--text-soft)" }}>
                  <span><strong>Ville :</strong> {dossier.ville}</span>
                  <span><strong>Places :</strong> {dossier.nombre_places}</span>
                  <span><strong>Tarif / nuit :</strong> {dossier.tarif_par_nuit} MAD</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Calendrier de disponibilité ───────────────────────────────

function Calendrier() {
  const today = new Date();
  const [mois,  setMois]  = useState(today.getMonth());
  const [annee, setAnnee] = useState(today.getFullYear());
  const [bloques,          setBloques]          = useState([]);
  const [reservationsData, setReservationsData] = useState([]);

  useEffect(() => {
    fetch(`${API}/family/reservations`, { headers: authHeaders() })
      .then(r => r.json())
      .then(json => { if (json.success) setReservationsData(json.data); })
      .catch(() => {});
  }, []);

  const moisNoms     = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
  const joursSemaine = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

  const nbJours     = new Date(annee, mois + 1, 0).getDate();
  const premierJour = (new Date(annee, mois, 1).getDay() + 6) % 7;

  const isReservedDay = (jour) => {
    const d = `${annee}-${String(mois + 1).padStart(2,"0")}-${String(jour).padStart(2,"0")}`;
    return reservationsData.some(r => {
      if (r.statut === "cancelled") return false;
      const start = (r.date_debut ?? "").substring(0, 10);
      const end   = (r.date_fin   ?? "").substring(0, 10);
      return d >= start && d < end;
    });
  };

  const togglePresent = (jour) => {
    if (isReservedDay(jour)) return;
    setBloques(prev => prev.includes(jour) ? prev.filter(j => j !== jour) : [...prev, jour]);
  };

  const changeMois = (delta) => {
    let nm = mois + delta, na = annee;
    if (nm < 0) { nm = 11; na--; }
    if (nm > 11) { nm = 0; na++; }
    setMois(nm); setAnnee(na);
  };

  const cellules = [];
  for (let i = 0; i < premierJour; i++) cellules.push(null);
  for (let j = 1; j <= nbJours; j++) cellules.push(j);

  return (
   <section className="calendrier" id="f-calendrier">
  <div className="calendrier__bg" style={{ backgroundImage: `url(${bgFormulaire})` }} />
  <div className="calendrier__overlay" />
  <div className="section-label">Disponibilités</div>
      <h2 className="section-title">Gérez votre calendrier</h2>
      

      <div className="cal-wrap">
        <div className="cal-head">
          <button className="cal-nav" onClick={() => changeMois(-1)}>‹</button>
          <h3>{moisNoms[mois]} {annee}</h3>
          <button className="cal-nav" onClick={() => changeMois(1)}>›</button>
        </div>

        <div className="cal-grid cal-grid--head">
          {joursSemaine.map((j) => <div key={j} className="cal-cell cal-cell--head">{j}</div>)}
        </div>

        <div className="cal-grid">
          {cellules.map((j, i) => {
            if (j === null) return <div key={`v-${i}`} className="cal-cell cal-cell--empty" />;
            const isReserve = isReservedDay(j);
            const isBloque  = !isReserve && bloques.includes(j);
            const isToday   = j === today.getDate() && mois === today.getMonth() && annee === today.getFullYear();
            return (
              <div
                key={j}
                className={`cal-cell${isReserve ? " reserve" : ""}${isBloque ? " bloque" : ""}${isToday ? " today" : ""}`}
                onClick={() => togglePresent(j)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && togglePresent(j)}
              >
                <span>{j}</span>
                {isReserve && <small>Réservé</small>}
                {isBloque  && <small>Bloqué</small>}
              </div>
            );
          })}
        </div>

        <div className="cal-legende">
          <span><i className="dot dot--available" /> Disponible</span>
          <span><i className="dot dot--bloque" /> Bloqué (vous)</span>
          <span><i className="dot dot--reserve" /> Réservé</span>
        </div>
      </div>
    </section>
  );
}

// ─── Témoignages familles ──────────────────────────────────────

function TemoignagesFamilles() {
  return (
    <section className="testimonials" style={{ background: "var(--cream-dark)" }}>
      <div className="section-label">Ils nous font confiance</div>
      <h2 className="section-title">La parole à nos hôtes</h2>
      

      <div className="testimonials__grid">
        {TEMOIGNAGES_FAMILLES.map((t) => (
          <div className="testimonial-card" key={t.id}>
            <div className="testimonial-card__stars">★★★★★</div>
            <p className="testimonial-card__text">"{t.texte}"</p>
            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">
                <img src={t.avatar} alt={t.nom} />
              </div>
              <div>
                <div className="testimonial-card__name">{t.nom}</div>
                <div className="testimonial-card__origin">{t.ville}</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.9rem" }}>{t.revenu}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-soft)" }}>en moyenne</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Chatbot (LBEHJA — version Famille) ────────────────────────

function ChatbotFamille() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Bonjour ! Je suis LBEHJA, votre assistant pour devenir famille d'accueil. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const SYSTEM_PROMPT = `Tu es l'assistant virtuel d'AtlasHost, dans l'espace réservé aux familles d'accueil.

Ton rôle :
- Aider les familles à s'inscrire et à devenir hôtes certifiés
- Expliquer le processus de dépôt de dossier (CIN, certificat de résidence, photos, description, tarif)
- Répondre aux questions sur les revenus, les commissions et les paiements
- Aider à gérer les réservations et le calendrier
- Rassurer sur la sécurité et les garanties offertes

Informations clés :
- Inscription gratuite, validation du dossier sous 48h
- Commission AtlasHost : 10 % du tarif par nuit
- Paiement versé sous 72h après le départ du voyageur
- 4 villes disponibles : Casablanca, Marrakech, Rabat, Tanger
- Documents requis : CIN, certificat de résidence, 3 photos minimum du logement
- Support hôtes : famille@atlashost.ma

Réponds en français, de façon chaleureuse, concise et professionnelle. Maximum 3 phrases par réponse.`;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { type: "user", text: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages.map((m) => ({
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
        "Le dépôt de dossier prend environ 5 minutes : il vous faut votre CIN, un certificat de résidence et au moins 3 photos du logement.",
        "Notre commission est de 10 % par réservation. Vous fixez librement votre tarif par nuit.",
        "Le paiement est versé sous 72h après le départ du voyageur, directement sur votre compte bancaire.",
        "Pour toute question spécifique, contactez notre équipe hôtes : famille@atlashost.ma",
        "La validation du dossier prend 48h en moyenne. Vous serez notifié par email.",
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
            <h5>LBEHJA — Assistant Hôtes</h5>
            <span>En ligne · spécialisé familles</span>
          </div>
          <button className="chatbot-window__close" onClick={() => setOpen(false)} aria-label="Fermer">✕</button>
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

      {!open && <div className="chatbot-bubble__tooltip">Une question ?</div>}
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

// ─── CTA Final ─────────────────────────────────────────────────

function CTAFinal() {
  return (
    <section className="cta-section">
      <div className="cta-section__inner">
        <h2 className="cta-section__title">Prêt à ouvrir votre porte au monde ?</h2>
        <p className="cta-section__sub">
          Rejoignez la communauté AtlasHost et transformez votre hospitalité en revenu durable.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn--solid btn--lg" onClick={() => document.getElementById("f-dossier")?.scrollIntoView({ behavior: "smooth" })}>
          Déposer mon dossier
          </button>
          <button className="btn btn--outline btn--lg" onClick={() => window.location.href = "/visiteur"}>
            ← Espace voyageur
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer (réutilisé) ────────────────────────────────────────

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
          <h5>Espace Hôte</h5>
          <ul>
            <li><a href="#f-accueil">Accueil</a></li>
            <li><a href="#f-dossier">Dépôt de dossier</a></li>
            <li><a href="#f-dashboard">Tableau de bord</a></li>
            <li><a href="#f-calendrier">Calendrier</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Ressources</h5>
          <ul>
            <li><a href="#">Guide de l'hôte</a></li>
            <li><a href="#">Tarification recommandée</a></li>
            <li><a href="#">Sécurité & garanties</a></li>
            <li><a href="#">Charte d'accueil</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Support</h5>
          <ul>
            <li><a href="#">FAQ Hôtes</a></li>
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="mailto:famille@atlashost.ma">famille@atlashost.ma</a></li>
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

export default function Famille() {
  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <NavbarFamille onLoginClick={handleLoginClick} />

      <main>
        <HeroFamille onCTAClick={() => document.getElementById("f-dossier")?.scrollIntoView({ behavior: "smooth" })} />
        <AvantagesFamille />
        <CommentDevenir />
        <DepotDossier />
        <TableauDeBord />
        <Calendrier />
        <TemoignagesFamilles />
        <CTAFinal />
      </main>

      <Footer />
      <ChatbotFamille />
    </>
  );
}