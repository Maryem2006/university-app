import { useState } from "react";
import "./StudentForm.css";

const REGEX_NOM = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TEL = /^(\+216[\s-]?)?\d{2}[\s-]?\d{3}[\s-]?\d{3}$/;

function StudentForm({ onAjouterEtudiant }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [filiere, setFiliere] = useState("");
  const [anneeEtude, setAnneeEtude] = useState("");
  const [groupe, setGroupe] = useState("");
  const [ville, setVille] = useState("");
  const [image, setImage] = useState(null);
  const [erreurs, setErreurs] = useState({});
  const [succes, setSucces] = useState(false);

  function handleChange(setter, champ) {
    return (e) => {
      setter(e.target.value);
      setErreurs((prev) => ({ ...prev, [champ]: "" }));
      setSucces(false);
    };
  }

  function handleImageChange(e) {
    const fichier = e.target.files[0];
    if (!fichier) return;

    if (!fichier.type.startsWith("image/")) {
      setErreurs((prev) => ({ ...prev, image: "Le fichier doit être une image." }));
      setImage(null);
      return;
    }
    if (fichier.size > 2 * 1024 * 1024) {
      setErreurs((prev) => ({ ...prev, image: "L'image ne doit pas dépasser 2 Mo." }));
      setImage(null);
      return;
    }

    setErreurs((prev) => ({ ...prev, image: "" }));
    setImage(URL.createObjectURL(fichier));
  }

  function valider() {
    const e = {};

    if (nom.trim().length < 3) e.nom = "Le nom doit contenir au moins 3 caractères.";
    else if (!REGEX_NOM.test(nom.trim())) e.nom = "Le nom ne doit contenir que des lettres.";

    if (prenom.trim().length < 3) e.prenom = "Le prénom doit contenir au moins 3 caractères.";
    else if (!REGEX_NOM.test(prenom.trim())) e.prenom = "Le prénom ne doit contenir que des lettres.";

    if (!email.trim()) e.email = "L'email est obligatoire.";
    else if (!REGEX_EMAIL.test(email.trim())) e.email = "Adresse email invalide.";

    if (!telephone.trim()) e.telephone = "Le téléphone est obligatoire.";
    else if (!REGEX_TEL.test(telephone.trim()))
      e.telephone = "Numéro invalide (ex : 00 000 000 ou +216 00 000 000).";

    if (!filiere) e.filiere = "Veuillez choisir une filière.";
    if (!anneeEtude.trim()) e.anneeEtude = "L'année d'étude est obligatoire.";
    if (!groupe.trim()) e.groupe = "Le groupe est obligatoire.";

    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nouvellesErreurs = valider();
    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs((prev) => ({ ...nouvellesErreurs, image: prev.image }));
      setSucces(false);
      return;
    }

    const nouvelEtudiant = {
      nom: nom.trim(),
      prenom: prenom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      filiere,
      anneeEtude: anneeEtude.trim(),
      groupe: groupe.trim(),
      ville: ville.trim(),
      image,
    };

    onAjouterEtudiant(nouvelEtudiant);

    setNom("");
    setPrenom("");
    setEmail("");
    setTelephone("");
    setFiliere("");
    setAnneeEtude("");
    setGroupe("");
    setVille("");
    setImage(null);
    setErreurs({});
    setSucces(true);
    e.target.reset();
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <h2>Ajouter un étudiant</h2>

      <div className="form-group">
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          name="nom"
          maxLength={30}
          className={erreurs.nom ? "invalide" : ""}
          value={nom}
          onChange={handleChange(setNom, "nom")}
          required
        />
        {erreurs.nom && <span className="erreur">{erreurs.nom}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          maxLength={30}
          className={erreurs.prenom ? "invalide" : ""}
          value={prenom}
          onChange={handleChange(setPrenom, "prenom")}
          required
        />
        {erreurs.prenom && <span className="erreur">{erreurs.prenom}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          maxLength={60}
          className={erreurs.email ? "invalide" : ""}
          value={email}
          onChange={handleChange(setEmail, "email")}
          required
        />
        {erreurs.email && <span className="erreur">{erreurs.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="telephone">Téléphone :</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          placeholder="Ex : +216 00 000 000"
          maxLength={16}
          className={erreurs.telephone ? "invalide" : ""}
          value={telephone}
          onChange={handleChange(setTelephone, "telephone")}
          required
        />
        {erreurs.telephone && <span className="erreur">{erreurs.telephone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="filiere">Filière :</label>
        <select
          id="filiere"
          name="filiere"
          className={erreurs.filiere ? "invalide" : ""}
          value={filiere}
          onChange={handleChange(setFiliere, "filiere")}
          required
        >
          <option value="">Choisir une filière</option>
          <option value="GLSI">GLSI</option>
          <option value="DSI">DSI</option>
          <option value="RSI">RSI</option>
        </select>
        {erreurs.filiere && <span className="erreur">{erreurs.filiere}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="anneeEtude">Année d'étude :</label>
        <input
          type="text"
          id="anneeEtude"
          name="anneeEtude"
          placeholder="Ex : 2ème année"
          maxLength={20}
          className={erreurs.anneeEtude ? "invalide" : ""}
          value={anneeEtude}
          onChange={handleChange(setAnneeEtude, "anneeEtude")}
          required
        />
        {erreurs.anneeEtude && <span className="erreur">{erreurs.anneeEtude}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="groupe">Groupe :</label>
        <input
          type="text"
          id="groupe"
          name="groupe"
          placeholder="Ex : GLSI 2"
          maxLength={20}
          className={erreurs.groupe ? "invalide" : ""}
          value={groupe}
          onChange={handleChange(setGroupe, "groupe")}
          required
        />
        {erreurs.groupe && <span className="erreur">{erreurs.groupe}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="ville">Ville :</label>
        <input
          type="text"
          id="ville"
          name="ville"
          maxLength={30}
          value={ville}
          onChange={handleChange(setVille, "ville")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image :</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          className={erreurs.image ? "invalide" : ""}
          onChange={handleImageChange}
        />
        {erreurs.image && <span className="erreur">{erreurs.image}</span>}
      </div>

      {succes && <p className="succes">Étudiant ajouté avec succès ✅</p>}

      <button type="submit" className="btn">Ajouter</button>
    </form>
  );
}

export default StudentForm;