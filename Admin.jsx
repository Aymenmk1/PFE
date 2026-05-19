// ============================================================
//  AtlasHost — Admin.jsx  v1.0
//  Interface Administrateur — Back-office complet
//  Design : Sidebar sombre + contenu clair, data-dense
//  Auteur : MOUKRIM Ayman — PFE BTS DAI2
// ============================================================

import { useState, useEffect, useRef } from "react";

const API      = "http://localhost:8000/api";
const getToken    = () => localStorage.getItem("atlas_token");
const jsonHeaders = () => ({ Authorization: `Bearer ${getToken()}`, Accept: "application/json" });

// ─── Données mockées ──────────────────────────────────────────

const DOSSIERS_ATTENTE = [
  {
    id: 101, prenom: "Mehdi",    nom: "Azizi",    ville: "Casablanca",
    email: "mehdi.azizi@email.com", telephone: "+212 6 11 22 33 44",
    places: 3, tarif: 320, soumis: "08 Mai 2026",
    cin: "BK789012", residence: "cert_res_azizi.pdf",
    photos: 4, description: "Appartement moderne au cœur de Casablanca, proche des transports.",
  },
  {
    id: 102, prenom: "Nadia",    nom: "Bensalem", ville: "Marrakech",
    email: "nadia.bensalem@gmail.com", telephone: "+212 6 55 66 77 88",
    places: 2, tarif: 380, soumis: "07 Mai 2026",
    cin: "Y456789",  residence: "cert_residence_bensalem.pdf",
    photos: 6, description: "Riad traditionnel en médina avec terrasse panoramique et patio fleuri.",
  },
  {
    id: 103, prenom: "Hassan",   nom: "Tazi",     ville: "Rabat",
    email: "h.tazi@hotmail.com",      telephone: "+212 6 22 33 44 55",
    places: 4, tarif: 290, soumis: "06 Mai 2026",
    cin: "AA123456", residence: "tazi_certif.pdf",
    photos: 3, description: "Villa familiale avec jardin et piscine privée dans quartier résidentiel.",
  },
  {
    id: 104, prenom: "Fatima",   nom: "Ouali",    ville: "Tanger",
    email: "fatima.ouali@email.ma",   telephone: "+212 6 99 88 77 66",
    places: 2, tarif: 260, soumis: "05 Mai 2026",
    cin: "TG567890", residence: "ouali_res.pdf",
    photos: 5, description: "Maison vue sur le détroit avec accueil chaleureux et cuisine du terroir.",
  },
];

const FAMILLES_PUBLIEES = [
  { id: 1, nom: "Famille Benali",  ville: "Marrakech",  note: 4.9, avis: 47, reservations: 62, revenus: 24800, statut: "active",   depuis: "Jan 2026" },
  { id: 2, nom: "Famille Idrissi", ville: "Casablanca", note: 4.7, avis: 29, reservations: 38, revenus: 15200, statut: "active",   depuis: "Fév 2026" },
  { id: 3, nom: "Famille Chaoui",  ville: "Rabat",      note: 4.8, avis: 61, reservations: 54, revenus: 19800, statut: "active",   depuis: "Déc 2025" },
  { id: 4, nom: "Famille Mrabet",  ville: "Tanger",     note: 4.6, avis: 18, reservations: 21, revenus: 7600,  statut: "suspendue", depuis: "Mar 2026" },
  { id: 5, nom: "Famille Tahiri",  ville: "Marrakech",  note: 5.0, avis: 83, reservations: 97, revenus: 41200, statut: "active",   depuis: "Nov 2025" },
  { id: 6, nom: "Famille Alaoui",  ville: "Casablanca", note: 4.5, avis: 34, reservations: 42, revenus: 16800, statut: "active",   depuis: "Jan 2026" },
];

const RESERVATIONS = [
  { id: "R-2892", famille: "Famille Benali",  voyageur: "Sophie Martin",  pays: "France",  ville: "Marrakech", arrivee: "12 Mai",   depart: "16 Mai",   nuits: 4, montant: 1640, commission: 164, statut: "confirmée"  },
  { id: "R-2891", famille: "Famille Idrissi", voyageur: "James Cooper",   pays: "UK",      ville: "Casablanca",arrivee: "22 Mai",   depart: "25 Mai",   nuits: 3, montant: 1050, commission: 105, statut: "en attente" },
  { id: "R-2890", famille: "Famille Tahiri",  voyageur: "Yuki Tanaka",    pays: "Japon",   ville: "Marrakech", arrivee: "3 Juin",   depart: "7 Juin",   nuits: 4, montant: 1640, commission: 164, statut: "confirmée"  },
  { id: "R-2889", famille: "Famille Chaoui",  voyageur: "Ahmed Al-Saidi", pays: "Émirats", ville: "Rabat",     arrivee: "18 Juin",  depart: "22 Juin",  nuits: 4, montant: 1280, commission: 128, statut: "confirmée"  },
  { id: "R-2888", famille: "Famille Alaoui",  voyageur: "Lucas Ferreira", pays: "Brésil",  ville: "Casablanca",arrivee: "10 Mai",   depart: "13 Mai",   nuits: 3, montant: 870,  commission: 87,  statut: "terminée"  },
  { id: "R-2887", famille: "Famille Mrabet",  voyageur: "Anna Schmidt",   pays: "All.",    ville: "Tanger",    arrivee: "28 Avr",   depart: "2 Mai",    nuits: 4, montant: 1040, commission: 104, statut: "annulée"   },
];

const PAIEMENTS = [
  { id: "P-441", famille: "Famille Tahiri",  mois: "Avr 2026", brut: 4100, commission: 410, net: 3690, statut: "versé",    date: "03 Mai 2026" },
  { id: "P-440", famille: "Famille Benali",  mois: "Avr 2026", brut: 3360, commission: 336, net: 3024, statut: "versé",    date: "03 Mai 2026" },
  { id: "P-439", famille: "Famille Chaoui",  mois: "Avr 2026", brut: 2880, commission: 288, net: 2592, statut: "versé",    date: "03 Mai 2026" },
  { id: "P-438", famille: "Famille Alaoui",  mois: "Avr 2026", brut: 2900, commission: 290, net: 2610, statut: "en cours", date: "—"           },
  { id: "P-437", famille: "Famille Idrissi", mois: "Avr 2026", brut: 1750, commission: 175, net: 1575, statut: "en cours", date: "—"           },
  { id: "P-436", famille: "Famille Mrabet",  mois: "Avr 2026", brut: 520,  commission: 52,  net: 468,  statut: "bloqué",   date: "—"           },
];

const STATS_VILLES = [
  { ville: "Marrakech",  familles: 52, reservations: 189, revenus: 68200, tauxOccup: 78 },
  { ville: "Casablanca", familles: 34, reservations: 121, revenus: 44100, tauxOccup: 65 },
  { ville: "Rabat",      familles: 28, reservations: 87,  revenus: 29800, tauxOccup: 59 },
  { ville: "Tanger",     familles: 19, reservations: 54,  revenus: 18400, tauxOccup: 52 },
];

const MOIS_REVENUS = [
  { mois: "Nov",  valeur: 38200 },
  { mois: "Déc",  valeur: 54600 },
  { mois: "Jan",  valeur: 41800 },
  { mois: "Fév",  valeur: 48900 },
  { mois: "Mar",  valeur: 56200 },
  { mois: "Avr",  valeur: 62400 },
];

const ACTIVITE_LOG = [
  { id: 1, type: "dossier_valide",  msg: "Dossier Famille Azizi validé et annonce publiée",      time: "il y a 10 min", icon: "✅" },
  { id: 2, type: "reservation",    msg: "Nouvelle réservation R-2892 — Famille Benali",           time: "il y a 25 min", icon: "📅" },
  { id: 3, type: "paiement",       msg: "Virement P-441 Famille Tahiri : 3 690 MAD versé",        time: "il y a 1h",     icon: "💳" },
  { id: 4, type: "dossier_rejete", msg: "Dossier ID 099 rejeté — documents non conformes",        time: "il y a 2h",     icon: "❌" },
  { id: 5, type: "avis",           msg: "Avis signalé sur Famille Mrabet — en cours d'examen",    time: "il y a 3h",     icon: "⚠️" },
  { id: 6, type: "compte",         msg: "Nouveau compte voyageur créé : yuki.tanaka@gmail.com",   time: "il y a 4h",     icon: "👤" },
];

// ─── Mapper API → format UI ───────────────────────────────────

function mapDossier(d) {
  const cinDoc      = d.documents?.find((doc) => doc.type === "cin");
  const resDoc      = d.documents?.find((doc) => doc.type === "certificat_residence");
  const photoDocs   = d.documents?.filter((doc) => doc.type === "photo") ?? [];
  const storage     = "http://localhost:8000/storage/";
  return {
    id:           d.id,
    prenom:       d.user?.prenom       ?? "",
    nom:          d.user?.nom          ?? "",
    ville:        d.ville,
    email:        d.user?.email        ?? "",
    telephone:    d.user?.telephone    ?? "N/A",
    places:       d.nombre_places,
    tarif:        d.tarif_par_nuit,
    soumis:       new Date(d.created_at).toLocaleDateString("fr-FR"),
    cinUrl:       cinDoc  ? storage + cinDoc.chemin_fichier  : null,
    residenceUrl: resDoc  ? storage + resDoc.chemin_fichier  : null,
    photos:       photoDocs.length,
    description:  d.description ?? "",
  };
}

// ─── Composants réutilisables ─────────────────────────────────

function Badge({ statut }) {
  const map = {
    confirmée:   "badge--ok",
    active:      "badge--ok",
    versé:       "badge--ok",
    "en attente":"badge--wait",
    "en cours":  "badge--wait",
    terminée:    "badge--info",
    annulée:     "badge--ko",
    suspendue:   "badge--ko",
    bloqué:      "badge--ko",
  };
  return <span className={`adm-badge ${map[statut] || "badge--info"}`}>{statut}</span>;
}

function StatCard({ icon, label, value, delta, color }) {
  return (
    <div className="stat-card" style={{ "--accent": color }}>
      <div className="stat-card__icon">{icon}</div>
      <div className="stat-card__body">
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__label">{label}</div>
        {delta && <div className="stat-card__delta">{delta}</div>}
      </div>
      <div className="stat-card__glow" />
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────

function Sidebar({ active, onNav, collapsed, onToggle, dossiersCount }) {
  const links = [
    { id: "dashboard",  icon: "⬡",  label: "Tableau de bord" },
    { id: "dossiers",   icon: "📋", label: "Dossiers",        badge: dossiersCount || undefined },
    { id: "familles",   icon: "🏡", label: "Familles" },
    { id: "reservations",icon:"📅", label: "Réservations" },
    { id: "paiements",  icon: "💳", label: "Paiements" },
    { id: "statistiques",icon:"📊", label: "Statistiques" },
    { id: "moderation", icon: "🛡️", label: "Modération" },
  ];

  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-mark">A</div>
        {!collapsed && (
          <div className="sidebar__logo-text">
            <span className="sidebar__logo-main">Atlas<em>Host</em></span>
            <span className="sidebar__logo-sub">Administration</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="sidebar__nav">
        <div className="sidebar__section-label">{!collapsed && "Navigation"}</div>
        {links.map((l) => (
          <button
            key={l.id}
            className={`sidebar__link${active === l.id ? " active" : ""}`}
            onClick={() => onNav(l.id)}
            title={collapsed ? l.label : ""}
          >
            <span className="sidebar__link-icon">{l.icon}</span>
            {!collapsed && <span className="sidebar__link-label">{l.label}</span>}
            {!collapsed && l.badge && (
              <span className="sidebar__badge">{l.badge}</span>
            )}
            {collapsed && l.badge && (
              <span className="sidebar__badge sidebar__badge--dot" />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar__bottom">
        {!collapsed && (
          <div className="sidebar__admin-info">
            <div className="sidebar__admin-avatar">AD</div>
            <div>
              <div className="sidebar__admin-name">Admin LAHLOU</div>
              <div className="sidebar__admin-role">Super Administrateur</div>
            </div>
          </div>
        )}
        <button className="sidebar__collapse-btn" onClick={onToggle} title="Réduire">
          {collapsed ? "›" : "‹"}
        </button>
      </div>
    </aside>
  );
}

// ─── Topbar ───────────────────────────────────────────────────

function Topbar({ section, notifs }) {
  const labels = {
    dashboard: "Tableau de bord",
    dossiers: "Gestion des dossiers",
    familles: "Familles publiées",
    reservations: "Réservations",
    paiements: "Paiements & commissions",
    statistiques: "Statistiques & analytics",
    moderation: "Modération & sécurité",
  };

  return (
    <header className="topbar">
      <div className="topbar__left">
        <h1 className="topbar__title">{labels[section]}</h1>
        <div className="topbar__breadcrumb">AtlasHost Admin / {labels[section]}</div>
      </div>
      <div className="topbar__right">
        <div className="topbar__search">
          <span className="topbar__search-icon">⊕</span>
          <input placeholder="Rechercher…" />
          <kbd>Ctrl K</kbd>
        </div>
        <button className="topbar__icon-btn" title="Notifications">
          
          {notifs > 0 && <span className="topbar__notif-dot">{notifs}</span>}
        </button>
        <button className="topbar__icon-btn" title="Paramètres">⚙</button>
        <div className="topbar__avatar">AD</div>
      </div>
    </header>
  );
}

// ─── Section : Dashboard ──────────────────────────────────────

function Dashboard() {
  const maxRevenu = Math.max(...MOIS_REVENUS.map((m) => m.valeur));

  return (
    <div className="section-content">
      {/* KPI Cards */}
      <div className="kpi-grid">
        <StatCard icon="🏡" label="Familles actives"     value="133"       delta="▲ +12 ce mois" color="#C9923A" />
        <StatCard icon="📅" label="Réservations totales" value="451"       delta="▲ +38 ce mois" color="#7A1010" />
        <StatCard icon="💳" label="Revenus Avr. (MAD)"   value="62 400"    delta="▲ +11% vs Mars" color="#2E7D32" />
        <StatCard icon="📋" label="Dossiers en attente"  value={DOSSIERS_ATTENTE.length} delta="— 2 urgents"  color="#F57C00" />
        <StatCard icon="⭐" label="Note moyenne"          value="4.75"      delta="Top 5 %" color="#1565C0" />
        <StatCard icon="👤" label="Voyageurs inscrits"   value="1 284"     delta="▲ +94 ce mois" color="#6A1B9A" />
      </div>

      <div className="dash-grid-2">
        {/* Mini chart revenus */}
        <div className="panel">
          <div className="panel__header">
            <h3 className="panel__title">Revenus mensuels (MAD)</h3>
            <span className="panel__badge">6 derniers mois</span>
          </div>
          <div className="chart-bar">
            {MOIS_REVENUS.map((m) => (
              <div className="chart-bar__col" key={m.mois}>
                <div className="chart-bar__val">{(m.valeur / 1000).toFixed(0)}k</div>
                <div
                  className="chart-bar__bar"
                  style={{ height: `${(m.valeur / maxRevenu) * 100}%` }}
                />
                <div className="chart-bar__label">{m.mois}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activité récente */}
        <div className="panel">
          <div className="panel__header">
            <h3 className="panel__title">Activité récente</h3>
            <button className="panel__link">Tout voir</button>
          </div>
          <div className="activity-log">
            {ACTIVITE_LOG.map((a) => (
              <div className="activity-item" key={a.id}>
                <span className="activity-item__icon">{a.icon}</span>
                <div className="activity-item__body">
                  <div className="activity-item__msg">{a.msg}</div>
                  <div className="activity-item__time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats villes */}
      <div className="panel">
        <div className="panel__header">
          <h3 className="panel__title">Performance par ville</h3>
        </div>
        <div className="cities-stats">
          {STATS_VILLES.map((v) => (
            <div className="city-stat-row" key={v.ville}>
              <div className="city-stat-row__name">📍 {v.ville}</div>
              <div className="city-stat-row__fam">{v.familles} familles</div>
              <div className="city-stat-row__res">{v.reservations} rés.</div>
              <div className="city-stat-row__rev">{v.revenus.toLocaleString()} MAD</div>
              <div className="city-stat-row__bar-wrap">
                <div
                  className="city-stat-row__bar"
                  style={{ width: `${v.tauxOccup}%` }}
                />
                <span>{v.tauxOccup}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section : Dossiers ───────────────────────────────────────

function Dossiers({ onCountChange }) {
  const [dossiers,      setDossiers]      = useState([]);
  const [selected,      setSelected]      = useState(null);
  const [commentaire,   setCommentaire]   = useState("");
  const [filter,        setFilter]        = useState("Toutes");
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError,   setActionError]   = useState("");

  const fetchDossiers = async () => {
    try {
      const res  = await fetch(`${API}/admin/dossiers`, {
        headers: jsonHeaders(),
      });
      const json = await res.json();
      if (json.success) {
        const mapped = json.data.map(mapDossier);
        setDossiers(mapped);
        onCountChange?.(mapped.length);
      } else {
        setError("Impossible de charger les dossiers.");
      }
    } catch {
      setError("Serveur inaccessible. Vérifiez que le backend est démarré.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDossiers(); }, []);

  const villes = ["Toutes", "Casablanca", "Marrakech", "Rabat", "Tanger"];
  const liste  = filter === "Toutes" ? dossiers : dossiers.filter((d) => d.ville === filter);

  const doAction = async (url, onSuccess) => {
    setActionLoading(true);
    setActionError("");
    let res;
    try {
      res = await fetch(url, { method: "POST", headers: jsonHeaders() });
    } catch {
      setActionError("Erreur réseau — vérifiez que le backend est démarré et que CORS est configuré.");
      setActionLoading(false);
      return;
    }
    let json;
    try {
      json = await res.json();
    } catch {
      setActionError(`Réponse invalide du serveur (HTTP ${res.status}) — consultez storage/logs/laravel.log.`);
      setActionLoading(false);
      return;
    }
    if (json.success) {
      onSuccess();
    } else {
      const detail = json.file ? ` [${json.file}]` : "";
      const msg    = typeof json.error === "string" ? json.error : JSON.stringify(json.error);
      setActionError(`${msg}${detail}`);
    }
    setActionLoading(false);
  };

  const valider = (id) => doAction(
    `${API}/admin/dossiers/${id}/validate`,
    () => {
      setDossiers((prev) => {
        const updated = prev.filter((d) => d.id !== id);
        onCountChange?.(updated.length);
        return updated;
      });
      setSelected(null);
    }
  );

  const rejeter = (id) => doAction(
    `${API}/admin/dossiers/${id}/reject`,
    () => {
      setDossiers((prev) => {
        const updated = prev.filter((d) => d.id !== id);
        onCountChange?.(updated.length);
        return updated;
      });
      setSelected(null);
      setCommentaire("");
    }
  );

  if (loading) {
    return <div className="section-content" style={{ textAlign: "center", padding: 60, color: "var(--g-text-soft)" }}>Chargement des dossiers…</div>;
  }
  if (error) {
    return <div className="section-content" style={{ textAlign: "center", padding: 60, color: "#c0392b" }}>{error}</div>;
  }

  return (
    <div className="section-content">
      {/* Alert */}
      {dossiers.length > 0 && (
        <div className="alert-banner">
          <span>⚠️</span>
          <strong>{dossiers.length} dossier{dossiers.length > 1 ? "s" : ""} en attente</strong> de vérification — Délai moyen de traitement : 48h
        </div>
      )}

      <div className="dossiers-layout">
        {/* Liste */}
        <div className="panel dossiers-list">
          <div className="panel__header">
            <h3 className="panel__title">Dossiers reçus</h3>
            <div className="filter-pills">
              {villes.map((v) => (
                <button
                  key={v}
                  className={`filter-pill${filter === v ? " active" : ""}`}
                  onClick={() => setFilter(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="dossiers-items">
            {liste.length === 0 && (
              <div className="empty-state">
                <div className="empty-state__icon">✅</div>
                <div>Aucun dossier en attente</div>
              </div>
            )}
            {liste.map((d) => (
              <div
                key={d.id}
                className={`dossier-item${selected?.id === d.id ? " selected" : ""}`}
                onClick={() => { setSelected(d); setCommentaire(""); }}
              >
                <div className="dossier-item__avatar">
                  {d.prenom[0]}{d.nom[0]}
                </div>
                <div className="dossier-item__body">
                  <div className="dossier-item__name">{d.prenom} {d.nom}</div>
                  <div className="dossier-item__meta">📍 {d.ville} · {d.places} pl. · {d.tarif} MAD/nuit</div>
                  <div className="dossier-item__date">Soumis le {d.soumis}</div>
                </div>
                <span className="adm-badge badge--wait">En attente</span>
              </div>
            ))}
          </div>
        </div>

        {/* Détail */}
        <div className="panel dossiers-detail">
          {!selected ? (
            <div className="empty-state" style={{ minHeight: 400 }}>
              <div className="empty-state__icon">👆</div>
              <div>Sélectionnez un dossier pour le consulter</div>
            </div>
          ) : (
            <>
              <div className="panel__header">
                <h3 className="panel__title">Dossier #{selected.id}</h3>
                <Badge statut="en attente" />
              </div>

              {/* Identité */}
              <div className="detail-section">
                <div className="detail-section__title">👤 Identité</div>
                <div className="detail-grid">
                  <div><span>Nom complet</span><strong>{selected.prenom} {selected.nom}</strong></div>
                  <div><span>Email</span><strong>{selected.email}</strong></div>
                  <div><span>Téléphone</span><strong>{selected.telephone}</strong></div>
                  <div><span>Ville</span><strong>{selected.ville}</strong></div>
                </div>
              </div>

              {/* Logement */}
              <div className="detail-section">
                <div className="detail-section__title">🏡 Logement</div>
                <div className="detail-grid">
                  <div><span>Places</span><strong>{selected.places}</strong></div>
                  <div><span>Tarif / nuit</span><strong>{selected.tarif} MAD</strong></div>
                  <div><span>Net famille</span><strong>{Math.round(selected.tarif * 0.9)} MAD</strong></div>
                </div>
                <div className="detail-desc">"{selected.description}"</div>
              </div>

              {/* Documents */}
              <div className="detail-section">
                <div className="detail-section__title">📄 Documents fournis</div>
                <div className="doc-list">
                  <div className="doc-item">
                    <span className="doc-item__icon">🪪</span>
                    CIN soumise
                    {selected.cinUrl && (
                      <a href={selected.cinUrl} target="_blank" rel="noreferrer" className="doc-btn">Voir</a>
                    )}
                  </div>
                  <div className="doc-item">
                    <span className="doc-item__icon">📄</span>
                    Certificat de résidence
                    {selected.residenceUrl && (
                      <a href={selected.residenceUrl} target="_blank" rel="noreferrer" className="doc-btn">Voir</a>
                    )}
                  </div>
                  <div className="doc-item">
                    <span className="doc-item__icon">📸</span>
                    {selected.photos} photo{selected.photos !== 1 ? "s" : ""} téléversée{selected.photos !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Commentaire */}
              <div className="detail-section">
                <div className="detail-section__title">💬 Commentaire (optionnel)</div>
                <textarea
                  className="adm-textarea"
                  rows={3}
                  placeholder="Motif du rejet ou remarques pour la famille…"
                  value={commentaire}
                  onChange={(e) => setCommentaire(e.target.value)}
                />
              </div>

              {/* Actions */}
              {actionError && (
                <div style={{
                  background: "#fdecea", border: "1px solid #f5c6cb", borderRadius: 8,
                  padding: "10px 16px", marginBottom: 12, color: "#c0392b", fontSize: "0.88rem",
                }}>
                  ⚠️ {actionError}
                </div>
              )}
              <div className="detail-actions">
                <button
                  className="adm-btn adm-btn--danger"
                  onClick={() => rejeter(selected.id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? "…" : "✕ Rejeter le dossier"}
                </button>
                <button
                  className="adm-btn adm-btn--success"
                  onClick={() => valider(selected.id)}
                  disabled={actionLoading}
                >
                  {actionLoading ? "…" : "✓ Valider & Publier"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section : Familles publiées ──────────────────────────────

function FamillesPubliees() {
  const [familles, setFamilles] = useState([]);
  const [search,   setSearch]   = useState("");
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  useEffect(() => {
    fetch(`${API}/admin/familles`, { headers: jsonHeaders() })
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setFamilles(json.data);
        else setError("Impossible de charger les familles.");
      })
      .catch(() => setError("Serveur inaccessible."))
      .finally(() => setLoading(false));
  }, []);

  const toggleStatut = async (id, statut) => {
    const action = statut === "active" ? "suspend" : "reactivate";
    try {
      const res  = await fetch(`${API}/admin/familles/${id}/${action}`, { method: "POST", headers: jsonHeaders() });
      const json = await res.json();
      if (json.success) {
        setFamilles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, statut: statut === "active" ? "suspendue" : "active" } : f
          )
        );
      }
    } catch {
      // erreur silencieuse — l'UI garde son état
    }
  };

  const liste = familles.filter((f) =>
    f.nom.toLowerCase().includes(search.toLowerCase()) ||
    f.ville.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="section-content" style={{ textAlign: "center", padding: 60, color: "var(--g-text-soft)" }}>Chargement des familles…</div>;
  if (error)   return <div className="section-content" style={{ textAlign: "center", padding: 60, color: "#c0392b" }}>{error}</div>;

  return (
    <div className="section-content">
      <div className="panel">
        <div className="panel__header">
          <h3 className="panel__title">Familles certifiées ({familles.length})</h3>
          <div className="adm-search">
            <span>⊕</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher une famille…" />
          </div>
        </div>
        {liste.length === 0 ? (
          <div className="empty-state" style={{ padding: 40 }}>
            <div className="empty-state__icon">🏡</div>
            <div>Aucune famille certifiée pour le moment</div>
          </div>
        ) : (
          <div className="adm-table">
            <div className="adm-table__head" style={{ gridTemplateColumns: "2fr 1fr 0.8fr 0.8fr 1fr 1.2fr 0.8fr 1.2fr" }}>
              <div>Famille</div><div>Ville</div><div>Note</div><div>Avis</div><div>Réservations</div><div>Revenus bruts</div><div>Statut</div><div>Actions</div>
            </div>
            {liste.map((f) => (
              <div className="adm-table__row" key={f.id} style={{ gridTemplateColumns: "2fr 1fr 0.8fr 0.8fr 1fr 1.2fr 0.8fr 1.2fr" }}>
                <div>
                  <div className="row-avatar-name">
                    <div className="row-avatar">{f.nom.split(" ")[1]?.[0] || "F"}</div>
                    <div>
                      <strong>{f.nom}</strong>
                      <div className="row-sub">Depuis {f.depuis}</div>
                    </div>
                  </div>
                </div>
                <div>📍 {f.ville}</div>
                <div><span className="star-val">{f.note ? `★ ${f.note}` : "—"}</span></div>
                <div>{f.avis}</div>
                <div>{f.reservations}</div>
                <div><strong>{f.revenus.toLocaleString()} MAD</strong></div>
                <div><Badge statut={f.statut} /></div>
                <div className="row-actions">
                  <button className="adm-btn-sm adm-btn-sm--outline" onClick={() => toggleStatut(f.id, f.statut)}>
                    {f.statut === "active" ? "Suspendre" : "Réactiver"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Section : Réservations ───────────────────────────────────

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [filter,       setFilter]       = useState("Toutes");
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");

  useEffect(() => {
    fetch(`${API}/admin/reservations`, { headers: jsonHeaders() })
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setReservations(json.data);
        else setError("Impossible de charger les réservations.");
      })
      .catch(() => setError("Serveur inaccessible."))
      .finally(() => setLoading(false));
  }, []);

  const statuts = ["Toutes", "confirmed", "pending", "completed", "cancelled"];
  const statutLabels = { confirmed: "confirmée", pending: "en attente", completed: "terminée", cancelled: "annulée" };

  const liste = filter === "Toutes" ? reservations : reservations.filter((r) => r.statut === filter);
  const total_commission = liste.reduce((s, r) => s + r.commission, 0);

  if (loading) return <div className="section-content" style={{ textAlign: "center", padding: 60, color: "var(--g-text-soft)" }}>Chargement des réservations…</div>;
  if (error)   return <div className="section-content" style={{ textAlign: "center", padding: 60, color: "#c0392b" }}>{error}</div>;

  return (
    <div className="section-content">
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <StatCard icon="📅" label="Total réservations" value={reservations.length}                                            color="#7A1010" />
        <StatCard icon="✅" label="Confirmées"          value={reservations.filter((r) => r.statut === "confirmed").length}   color="#2E7D32" />
        <StatCard icon="⏳" label="En attente"          value={reservations.filter((r) => r.statut === "pending").length}     color="#F57C00" />
        <StatCard icon="💰" label="Commissions (MAD)"   value={reservations.reduce((s, r) => s + r.commission, 0) + " MAD"}  color="#C9923A" />
      </div>

      <div className="panel">
        <div className="panel__header">
          <h3 className="panel__title">Liste des réservations</h3>
          <div className="filter-pills">
            {statuts.map((s) => (
              <button key={s} className={`filter-pill${filter === s ? " active" : ""}`} onClick={() => setFilter(s)}>
                {s === "Toutes" ? "Toutes" : statutLabels[s]}
              </button>
            ))}
          </div>
        </div>
        {liste.length === 0 ? (
          <div className="empty-state" style={{ padding: 40 }}>
            <div className="empty-state__icon">📅</div>
            <div>Aucune réservation trouvée</div>
          </div>
        ) : (
          <>
            <div className="adm-table">
              <div className="adm-table__head" style={{ gridTemplateColumns: "0.8fr 1.5fr 1.5fr 0.8fr 1fr 0.7fr 1fr 1fr" }}>
                <div>Réf.</div><div>Famille</div><div>Voyageur</div><div>Ville</div><div>Dates</div><div>Nuits</div><div>Montant</div><div>Statut</div>
              </div>
              {liste.map((r) => (
                <div className="adm-table__row" key={r.id} style={{ gridTemplateColumns: "0.8fr 1.5fr 1.5fr 0.8fr 1fr 0.7fr 1fr 1fr" }}>
                  <div><code className="ref-code">{r.id}</code></div>
                  <div><strong>{r.famille}</strong></div>
                  <div>{r.voyageur}</div>
                  <div>{r.ville}</div>
                  <div className="row-sub">{r.arrivee} → {r.depart}</div>
                  <div>{r.nuits}n</div>
                  <div>
                    <strong>{r.montant} MAD</strong>
                    <div className="row-sub commission">Comm. {r.commission} MAD</div>
                  </div>
                  <div><Badge statut={statutLabels[r.statut] ?? r.statut} /></div>
                </div>
              ))}
            </div>
            <div className="table-footer">
              Total commissions filtrées : <strong>{total_commission} MAD</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Section : Paiements ──────────────────────────────────────

function Paiements() {
  const totalBrut    = PAIEMENTS.reduce((s, p) => s + p.brut, 0);
  const totalCommission = PAIEMENTS.reduce((s, p) => s + p.commission, 0);
  const totalNet     = PAIEMENTS.reduce((s, p) => s + p.net, 0);
  const enCours      = PAIEMENTS.filter((p) => p.statut === "en cours").length;

  return (
    <div className="section-content">
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <StatCard icon="📊" label="Total brut (MAD)"      value={totalBrut.toLocaleString()}       color="#7A1010" />
        <StatCard icon="💰" label="Commissions (MAD)"     value={totalCommission.toLocaleString()} color="#C9923A" />
        <StatCard icon="✅" label="Net versé (MAD)"        value={totalNet.toLocaleString()}        color="#2E7D32" />
        <StatCard icon="⏳" label="Versements en cours"   value={enCours}                          color="#F57C00" />
      </div>

      <div className="panel">
        <div className="panel__header">
          <h3 className="panel__title">Tableau des paiements — Avril 2026</h3>
          <button className="adm-btn adm-btn--primary adm-btn--sm">⬇ Exporter CSV</button>
        </div>
        <div className="adm-table">
          <div className="adm-table__head" style={{ gridTemplateColumns: "0.7fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr" }}>
            <div>Réf.</div><div>Famille</div><div>Mois</div><div>Brut</div><div>Commission</div><div>Net famille</div><div>Statut</div><div>Date versement</div>
          </div>
          {PAIEMENTS.map((p) => (
            <div className="adm-table__row" key={p.id} style={{ gridTemplateColumns: "0.7fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr" }}>
              <div><code className="ref-code">{p.id}</code></div>
              <div><strong>{p.famille}</strong></div>
              <div>{p.mois}</div>
              <div>{p.brut.toLocaleString()} MAD</div>
              <div className="commission">− {p.commission} MAD</div>
              <div><strong style={{ color: "var(--g-success)" }}>{p.net.toLocaleString()} MAD</strong></div>
              <div><Badge statut={p.statut} /></div>
              <div className="row-sub">{p.date}</div>
            </div>
          ))}
        </div>
        <div className="table-footer" style={{ justifyContent: "space-between" }}>
          <span>Total brut : <strong>{totalBrut.toLocaleString()} MAD</strong></span>
          <span>Commissions AtlasHost : <strong style={{ color: "var(--g-crimson)" }}>{totalCommission.toLocaleString()} MAD</strong></span>
          <span>Versé aux familles : <strong style={{ color: "var(--g-success)" }}>{totalNet.toLocaleString()} MAD</strong></span>
        </div>
      </div>
    </div>
  );
}

// ─── Section : Statistiques ───────────────────────────────────

function Statistiques() {
  const maxRevenu = Math.max(...MOIS_REVENUS.map((m) => m.valeur));

  return (
    <div className="section-content">
      <div className="dash-grid-2">
        {/* Revenus */}
        <div className="panel">
          <div className="panel__header">
            <h3 className="panel__title">Revenus 6 mois (MAD)</h3>
          </div>
          <div className="chart-bar chart-bar--lg">
            {MOIS_REVENUS.map((m) => (
              <div className="chart-bar__col" key={m.mois}>
                <div className="chart-bar__val">{(m.valeur / 1000).toFixed(0)}k</div>
                <div className="chart-bar__bar" style={{ height: `${(m.valeur / maxRevenu) * 100}%` }} />
                <div className="chart-bar__label">{m.mois}</div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span className="chart-legend__item chart-legend__item--gold">■ Revenus totaux</span>
          </div>
        </div>

        {/* Répartition */}
        <div className="panel">
          <div className="panel__header">
            <h3 className="panel__title">Répartition par ville</h3>
          </div>
          <div className="donut-chart">
            <svg viewBox="0 0 200 200" className="donut-svg">
              {/* Segments approximatifs */}
              <circle cx="100" cy="100" r="70" fill="none" stroke="#C9923A" strokeWidth="28"
                strokeDasharray="185 254" strokeDashoffset="0" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#7A1010" strokeWidth="28"
                strokeDasharray="121 254" strokeDashoffset="-185" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#4E0A0A" strokeWidth="28"
                strokeDasharray="87 254" strokeDashoffset="-306" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#b8822e" strokeWidth="28"
                strokeDasharray="47 254" strokeDashoffset="-393" />
              <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" className="donut-center-label">451</text>
              <text x="100" y="118" textAnchor="middle" dominantBaseline="middle" className="donut-center-sub">réservations</text>
            </svg>
            <div className="donut-legend">
              {STATS_VILLES.map((v, i) => {
                const colors = ["#C9923A", "#7A1010", "#4E0A0A", "#b8822e"];
                return (
                  <div className="donut-legend-item" key={v.ville}>
                    <span style={{ background: colors[i] }} className="donut-legend-dot" />
                    <span>{v.ville}</span>
                    <span className="donut-legend-val">{v.reservations}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tableau performance */}
      <div className="panel">
        <div className="panel__header">
          <h3 className="panel__title">Performance détaillée par destination</h3>
        </div>
        <div className="stats-table">
          <div className="stats-table__head">
            <div>Ville</div><div>Familles</div><div>Réservations</div><div>Revenus</div><div>Taux occupation</div><div>Note moy.</div>
          </div>
          {STATS_VILLES.map((v) => (
            <div className="stats-table__row" key={v.ville}>
              <div><strong>📍 {v.ville}</strong></div>
              <div>{v.familles}</div>
              <div>{v.reservations}</div>
              <div><strong>{v.revenus.toLocaleString()} MAD</strong></div>
              <div>
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{ width: `${v.tauxOccup}%` }} />
                </div>
                <span className="progress-val">{v.tauxOccup}%</span>
              </div>
              <div><span className="star-val">★ 4.7</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section : Modération ─────────────────────────────────────

function Moderation() {
  const signalements = [
    { id: 1, type: "Avis suspect",     cible: "Famille Mrabet",  signale_par: "Admin IA",     date: "09 Mai 2026", niveau: "moyen",  desc: "Avis avec langage inapproprié détecté automatiquement." },
    { id: 2, type: "Compte dupliqué",  cible: "Utilisateur #884", signale_par: "Système",      date: "08 Mai 2026", niveau: "élevé",  desc: "Deux comptes avec le même CIN détectés — possible fraude." },
    { id: 3, type: "Paiement échoué",  cible: "Réservation R-2870", signale_par: "Stripe",     date: "07 Mai 2026", niveau: "faible", desc: "Tentative de paiement refusée 3 fois. Carte potentiellement volée." },
    { id: 4, type: "Photo non conforme", cible: "Famille Bousaid", signale_par: "Modérateur",  date: "06 Mai 2026", niveau: "moyen",  desc: "Photo de profil ne correspondant pas au logement déclaré." },
  ];

  const niveauClass = { faible: "badge--info", moyen: "badge--wait", élevé: "badge--ko" };

  return (
    <div className="section-content">
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <StatCard icon="⚠️" label="Signalements ouverts"   value={signalements.length}    color="#F57C00" />
        <StatCard icon="🛡️" label="Comptes vérifiés"       value="1 284"                  color="#2E7D32" />
        <StatCard icon="🔒" label="Tentatives suspectes"   value="3"                      color="#7A1010" />
      </div>

      <div className="panel">
        <div className="panel__header">
          <h3 className="panel__title">Signalements actifs</h3>
          <button className="adm-btn adm-btn--danger adm-btn--sm">⬇ Exporter rapport</button>
        </div>
        <div className="signalements">
          {signalements.map((s) => (
            <div className="signalement-card" key={s.id}>
              <div className="signalement-card__head">
                <div>
                  <span className={`adm-badge ${niveauClass[s.niveau]}`}>{s.niveau}</span>
                  <strong className="signalement-card__type"> {s.type}</strong>
                </div>
                <div className="signalement-card__date">{s.date}</div>
              </div>
              <div className="signalement-card__cible">Cible : <strong>{s.cible}</strong> · Signalé par : {s.signale_par}</div>
              <div className="signalement-card__desc">{s.desc}</div>
              <div className="signalement-card__actions">
                <button className="adm-btn-sm adm-btn-sm--ghost">Ignorer</button>
                <button className="adm-btn-sm adm-btn-sm--outline">Enquêter</button>
                <button className="adm-btn-sm adm-btn-sm--danger">Sanctionner</button>
              </div>
            </div>  
          ))}
        </div>
      </div>

      {/* Règles de sécurité */}
      <div className="panel">
        <div className="panel__header">
          <h3 className="panel__title">Règles de sécurité actives</h3>
        </div>
        <div className="security-rules">
          {[
            { label: "Validation CIN obligatoire",                   actif: true },
            { label: "Certificat de résidence obligatoire",          actif: true },
            { label: "3 photos minimum pour publication",            actif: true },
            { label: "Détection automatique doublons (IA)",          actif: true },
            { label: "Blocage après 3 tentatives paiement échouées", actif: true },
            { label: "Modération avis avant publication",            actif: false },
          ].map((r, i) => (
            <div className="security-rule" key={i}>
              <span className={`security-rule__dot ${r.actif ? "actif" : "inactif"}`} />
              <span>{r.label}</span>
              <span className="security-rule__status">{r.actif ? "Actif" : "Inactif"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Composant Principal ───────────────────────────────────────

export default function Admin() {
  const [section,       setSection]       = useState("dashboard");
  const [collapsed,     setCollapsed]     = useState(false);
  const [dossiersCount, setDossiersCount] = useState(0);

  const sections = { dashboard: Dashboard, familles: FamillesPubliees, reservations: Reservations, paiements: Paiements, statistiques: Statistiques, moderation: Moderation };
  const ActiveSection = sections[section];

  return (
    <div className={`admin-layout${collapsed ? " sidebar-collapsed" : ""}`}>
      <Sidebar
        active={section}
        onNav={setSection}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        dossiersCount={dossiersCount}
      />
      <div className="admin-main">
        <Topbar section={section} notifs={dossiersCount} />
        <div className="admin-body">
          {section === "dossiers"
            ? <Dossiers onCountChange={setDossiersCount} />
            : <ActiveSection />
          }
        </div>
      </div>
    </div>
  );
}