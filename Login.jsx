import { useState } from 'react'

import atlasLogo from "./assets/atlas-logo.png.png";
import bgImage from "./assets/Salon-bg.jpg";
import "./Login.css";


export default function AtlasHostAuth({ onLogin }) {
  const [active, setActive] = useState(false);
  const [role, setRole] = useState("");
 
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siError, setSiError] = useState("");
 
  const [suName, setSuName] = useState("");
  const [suEmail, setSuEmail] = useState("");
  const [suPassword, setSuPassword] = useState("");
  const [suError, setSuError] = useState("");
  const [suSuccess, setSuSuccess] = useState("");
 
  const isValidEmail = (email) => email.includes("@") && email.includes(".");
 
  const handleLogin = (e) => {
    e.preventDefault();
    setSiError("");
 
    if (!role) { setSiError("Veuillez sélectionner votre profil."); return; }
 
    const email = siEmail.trim();
    const password = siPassword.trim();
 
    if (!email || !password) { setSiError("Veuillez remplir tous les champs."); return; }
    if (!isValidEmail(email)) { setSiError("Veuillez saisir un email valide."); return; }
    if (password.length < 6) { setSiError("Le mot de passe doit contenir au moins 6 caractères."); return; }
 
    const loginData = { email, password, role };
    console.log("Connexion AtlasHost :", loginData);
    if (onLogin) onLogin(loginData);
  };
 
  const handleRegister = (e) => {
    e.preventDefault();
    setSuError(""); setSuSuccess("");
 
    if (!role) { setSuError("Veuillez sélectionner votre profil."); return; }
 
    const name = suName.trim();
    const email = suEmail.trim();
    const password = suPassword.trim();
 
    if (!name || !email || !password) { setSuError("Veuillez remplir tous les champs."); return; }
    if (name.length < 3) { setSuError("Le nom doit contenir au moins 3 caractères."); return; }
    if (!isValidEmail(email)) { setSuError("Veuillez saisir un email valide."); return; }
    if (password.length < 6) { setSuError("Le mot de passe doit contenir au moins 6 caractères."); return; }
 
    const roleLabels = { visiteur: "Visiteur", famille: "Famille d'accueil", admin: "Administrateur" };
    console.log("Inscription AtlasHost :", { name, email, password, role });
    setSuSuccess(`Bienvenue sur AtlasHost en tant que ${roleLabels[role]} !`);
    setSuName(""); setSuEmail(""); setSuPassword("");
  };
 
  return (
    <div className="atlas-root">
      <div className="atlas-bg">
        <img src={bgImage} alt="AtlasHost — Hospitalité marocaine" />
      </div>
 
      <div className={`atlas-container${active ? " active" : ""}`}>
 
        {/* ── Panneau Inscription ── */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegister} noValidate>
            <h2 className="red-color">Rejoindre AtlasHost</h2>
            <RoleSelector selected={role} onChange={setRole} />
            <span>Sélectionner votre profil !</span>
            <input type="text"     placeholder="Nom complet"   value={suName}     onChange={(e) => setSuName(e.target.value)} />
            <input type="email"    placeholder="Email"         value={suEmail}    onChange={(e) => setSuEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe"  value={suPassword} onChange={(e) => setSuPassword(e.target.value)} />
            <button type="submit">S'inscrire</button>
            {suError   && <p className="atlas-error">{suError}</p>}
            {suSuccess && <p className="atlas-success">{suSuccess}</p>}
          </form>
        </div>
 
        {/* ── Panneau Connexion ── */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin} noValidate>
            <h2 className="red-color">Se Connecter</h2>
            <RoleSelector selected={role} onChange={setRole} />
            <span>Sélectionner votre profil !</span>
            <input type="email"    placeholder="Email"         value={siEmail}    onChange={(e) => setSiEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe"  value={siPassword} onChange={(e) => setSiPassword(e.target.value)} />
            <a href="#">Mot de passe oublié ?</a>
            <button type="submit">Se Connecter</button>
            {siError && <p className="atlas-error">{siError}</p>}
          </form>
        </div>
 
        {/* ── Panneau coulissant ── */}
        <div className="toggle-container">
          <div className="toggle">
 
            {/* Côté gauche — affiché quand inscription active */}
            <div className="toggle-panel toggle-left">
              <img src={atlasLogo} alt="AtlasHost Logo" className="toggle-logo" />
              <h1>Bon retour !</h1>
              <p>Connectez-vous pour accéder à votre espace AtlasHost et gérer vos réservations.</p>
              <button type="button" className="hidden-btn" onClick={() => setActive(false)}>
                Se Connecter
              </button>
            </div>
 
            {/* Côté droit — affiché par défaut */}
            <div className="toggle-panel toggle-right">
              <img src={atlasLogo} alt="AtlasHost Logo" className="toggle-logo" />
              <h1>Bienvenue !</h1>
              <p>Vivez une expérience authentique au sein des familles marocaines. Inscrivez-vous pour commencer.</p>
              <button type="button" className="hidden-btn" onClick={() => setActive(true)}>
                S'inscrire
              </button>
            </div>
 
          </div>
        </div>
 
      </div>
    </div>
  );
}
 
/* ── Sélecteur de rôle ── */
function RoleSelector({ selected, onChange }) {
  const roles = [
    { id: "visiteur", label: "Visiteur",  icon: "fa-solid fa-passport" },
    { id: "famille",  label: "Famille",   icon: "fa-solid fa-people-roof" },
  ];
 
  return (
    <div className="role-selector">
      {roles.map((r) => (
        <button
          key={r.id}
          type="button"
          className={`role-btn${selected === r.id ? " role-btn--active" : ""}`}
          onClick={() => onChange(r.id)}
          title={r.label}
        >
          <i className={r.icon}></i>
          <span>{r.label}</span>
        </button>
      ))}
    </div>
  );
}


