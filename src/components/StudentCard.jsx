import Image from "../assets/Image.jpeg";
import "./StudentCard.css";

const etudiant = {
  prenom: "Maryem",
  nom: "Rhouma",
  email: "rhmmariem@gmail.com",
  telephone: "+216 99 999 999",
  filiere: "Génie Logiciel et Systèmes d'Information",
  anneeEtude: "2ème année",
  groupe: "GLSI 2",
  ville: "Mahdia",
  image: Image,
};

function StudentCard(props) {
  const ville = props.ville || "Non renseignée";

  const handleContact = () => {
    window.location.href = `mailto:${props.email}?subject=Contact`;
  };

  return (
    <div className="card">
      {props.image ? (
        <img src={props.image} alt="profile" className="avatar" />
      ) : (
        <div className="avatar avatar-placeholder">{props.prenom[0]}</div>
      )}
      <h1>Fiche étudiant</h1>
      <p><strong>Nom & Prénom :</strong> {props.prenom} {props.nom}</p>
      <p><strong>Email :</strong> {props.email}</p>
      <p><strong>Téléphone :</strong> {props.telephone}</p>
      <p><strong>Filière :</strong> {props.filiere}</p>
      <p><strong>Année d'étude :</strong> {props.anneeEtude}</p>
      <p><strong>Groupe :</strong> {props.groupe}</p>
      <p><strong>Ville :</strong> {ville}</p>
      <button className="btn" onClick={handleContact}>Contacter</button>
    </div>
  );
}


export default StudentCard;