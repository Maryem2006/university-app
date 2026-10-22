import "./App.css";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import StudentCard from "./components/StudentCard.jsx";
import Footer from "./components/Footer.jsx";
import Image from "./assets/Image.jpeg";

const etudiants = [
  {
    prenom: "Maryem",
    nom: "Rhouma",
    email: "rhmmariem@gmail.com",
    telephone: "+216 40 133 061",
    filiere: "Génie Logiciel et Systèmes d'Information",
    anneeEtude: "2ème année",
    groupe: "GLSI 2D",
    ville: "Mahdia",
    image: Image,
  },
];

function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <main className="container">
        {etudiants.map((etudiant) => (
          <StudentCard
            key={etudiant.email}
            prenom={etudiant.prenom}
            nom={etudiant.nom}
            email={etudiant.email}
            telephone={etudiant.telephone}
            filiere={etudiant.filiere}
            anneeEtude={etudiant.anneeEtude}
            groupe={etudiant.groupe}
            ville={etudiant.ville}
            image={etudiant.image}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;

