import { useState } from "react";
import "./StudentCard.css";

function StudentCard(props) {
  const [coordonneesVisibles, setCoordonneesVisibles] = useState(false);
  const [enModification, setEnModification] = useState(false);
  const [nouveauPrenom, setNouveauPrenom] = useState(props.prenom);

  const ville = props.ville || "Non renseignée";

  function basculerCoordonnees() {
    setCoordonneesVisibles(!coordonneesVisibles);
  }

  function handleContact() {
    window.location.href = `mailto:${props.email}?subject=Contact`;
  }

  function handleModifier() {
    if (enModification && nouveauPrenom.trim()) {
      props.onModifier(nouveauPrenom);
    }
    setEnModification(!enModification);
  }

  return (
    <div className="card">
      {props.image ? (
        <img src={props.image} alt="profile" className="avatar" />
      ) : (
        <div className="avatar avatar-placeholder">{props.prenom[0]}</div>
      )}
      <h1>Fiche étudiant</h1>

      <p>
        <strong>Nom & Prénom :</strong>{" "}
        {enModification ? (
          <input
            value={nouveauPrenom}
            onChange={(e) => setNouveauPrenom(e.target.value)}
          />
        ) : (
          props.prenom
        )}{" "}
        {props.nom}
      </p>

      {coordonneesVisibles && (
        <>
          <p><strong>Email :</strong> {props.email}</p>
          <p><strong>Téléphone :</strong> {props.telephone}</p>
        </>
      )}

      <p><strong>Filière :</strong> {props.filiere}</p>
      <p><strong>Année d'étude :</strong> {props.anneeEtude}</p>
      <p><strong>Groupe :</strong> {props.groupe}</p>
      <p><strong>Ville :</strong> {ville}</p>

      <div className="actions">
        <button className="btn" onClick={basculerCoordonnees}>
          {coordonneesVisibles ? "Masquer les coordonnées" : "Afficher les coordonnées"}
        </button>
        <button className="btn" onClick={handleContact}>Contacter</button>
        <button className="btn" onClick={handleModifier}>
          {enModification ? "Enregistrer" : "Modifier"}
        </button>
        <button className="btn btn-danger" onClick={props.onSupprimer}>Supprimer</button>
      </div>
    </div>
  );
}

export default StudentCard;