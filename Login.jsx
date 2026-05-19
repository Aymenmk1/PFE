import { useState } from 'react'
import atlasLogo from "./assets/atlas-logo.png.png";
import bgImage from "./assets/Salon-bg.jpg";


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
 
  const [siLoading, setSiLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSiError("");

    const email = siEmail.trim();
    const password = siPassword.trim();

    if (!email || !password) { setSiError("Veuillez remplir tous les champs."); return; }
    if (!isValidEmail(email)) { setSiError("Veuillez saisir un email valide."); return; }
    if (password.length < 6) { setSiError("Le mot de passe doit contenir au moins 6 caractères."); return; }

    setSiLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mot_de_passe: password }),
      });

      const json = await res.json();

      if (!json.success) {
        setSiError(typeof json.error === "string" ? json.error : "Email ou mot de passe incorrect.");
        return;
      }

      const { user, token } = json.data;
      localStorage.setItem("atlas_token", token);
      localStorage.setItem("atlas_user", JSON.stringify(user));

      // Admin → redirection directe sans vérifier le rôle sélectionné
      if (user.role === "admin") {
        if (onLogin) onLogin(user);
        return;
      }

      // Visiteur / Famille → le rôle doit être sélectionné
      if (!role) {
        setSiError("Veuillez sélectionner votre profil.");
        return;
      }

      const roleMap = { visiteur: "visitor", famille: "family" };
      if (roleMap[role] !== user.role) {
        const labels = { visitor: "Visiteur", family: "Famille d'accueil" };
        setSiError(`Profil incorrect. Ce compte est enregistré en tant que "${labels[user.role]}".`);
        return;
      }

      if (onLogin) onLogin(user);

    } catch {
      setSiError("Impossible de joindre le serveur. Vérifiez que le backend est lancé.");
    } finally {
      setSiLoading(false);
    }
  };
 
  const [suLoading, setSuLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuError(""); setSuSuccess("");

    if (!role) { setSuError("Veuillez sélectionner votre profil."); return; }

    const name     = suName.trim();
    const email    = suEmail.trim();
    const password = suPassword.trim();

    if (!name || !email || !password) { setSuError("Veuillez remplir tous les champs."); return; }
    if (name.length < 3)              { setSuError("Le nom doit contenir au moins 3 caractères."); return; }
    if (!isValidEmail(email))         { setSuError("Veuillez saisir un email valide."); return; }
    if (password.length < 6)          { setSuError("Le mot de passe doit contenir au moins 6 caractères."); return; }

    // Découper "Prénom Nom" → prenom + nom
    const parts  = name.split(" ");
    const prenom = parts[0];
    const nom    = parts.slice(1).join(" ") || parts[0];

    const roleMap = { visiteur: "visitor", famille: "family" };

    setSuLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          mot_de_passe: password,
          role: roleMap[role],
        }),
      });

      const json = await res.json();

      if (!json.success) {
        const err = json.error;
        if (typeof err === "object") {
          const first = Object.values(err)[0];
          setSuError(Array.isArray(first) ? first[0] : String(first));
        } else {
          setSuError(err || "Erreur lors de l'inscription.");
        }
        return;
      }

      const roleLabels = { visitor: "Visiteur", family: "Famille d'accueil" };
      setSuSuccess(`Compte créé ! Vous pouvez vous connecter en tant que ${roleLabels[json.data.user.role]}.`);
      setSuName(""); setSuEmail(""); setSuPassword("");
      // Basculer vers le panneau connexion après 1,5s
      setTimeout(() => { setActive(false); setSuSuccess(""); }, 1500);

    } catch {
      setSuError("Impossible de joindre le serveur. Vérifiez que le backend est lancé.");
    } finally {
      setSuLoading(false);
    }
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
            <button type="submit" disabled={suLoading}>
              {suLoading ? "Inscription…" : "S'inscrire"}
            </button>
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
            <button type="submit" disabled={siLoading}>
              {siLoading ? "Connexion…" : "Se Connecter"}
            </button>
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


