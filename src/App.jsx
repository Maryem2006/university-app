import "./App.css";
import Image from "./assets/Image.jpeg";

function App() {
  const student = {
    nomPrenom: "Maryem Rhouma",
    email: "rhmmariem@gmail.com",
    telephone: "+216 40 133 061",
    filiere: "Génie Logiciel et Systèmes d'Information",
    anneeEtude: "2ème année",
    groupe: "GLSI 2D",
    ville: "Mahdia",
    image: Image,
  };

  const handleContact = () => {
    window.location.href = `mailto:${student.email}?subject=Contact&body=Bonjour ${student.nomPrenom},`;
  };

  return (
    <div className="card">
      <img src={student.image} alt="profile" className="avatar" />
      <h1>Fiche étudiant</h1>
      <p><strong>Nom & Prénom :</strong> {student.nomPrenom}</p>
      <p><strong>Email :</strong> {student.email}</p>
      <p><strong>Téléphone :</strong> {student.telephone}</p>
      <p><strong>Filière :</strong> {student.filiere}</p>
      <p><strong>Année d'étude :</strong> {student.anneeEtude}</p>
      <p><strong>Groupe :</strong> {student.groupe}</p>
      <p><strong>Ville :</strong> {student.ville}</p>
      <button className="btn" onClick={handleContact}>Contacter</button>
    </div>
  );
}

export default App;
