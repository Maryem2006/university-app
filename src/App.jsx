import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import StudentCard from "./components/StudentCard.jsx";
import StudentForm from "./components/StudentForm.jsx";
import Footer from "./components/Footer.jsx";
import Image from "./assets/Image.jpeg";
import Image2 from "./assets/image2.jpeg";
import Image3 from "./assets/image3.jpeg";

function App() {
  const [etudiants, setEtudiants] = useState([
    {
      id: 1,
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
    {
      id: 2,
      prenom: "Zeineb",
      nom: "Ben cheikh",
      email: "zeinebbencheikh98@gmail.com",
      telephone: "+216 99 999 999",
      filiere: "Génie Logiciel et Systèmes d'Information",
      anneeEtude: "2ème année",
      groupe: "GLSI 2",
      ville: "Mahdia",
      image: Image2,
    },
    {
      id: 3,
      prenom: "Tesnime",
      nom: "ounissi",
      email: "ounissi.tesnime2@gmail.com",
      telephone: "+216 00 000 000",
      filiere: "Génie Logiciel et Systèmes d'Information",
      anneeEtude: "2ème année",
      groupe: "GLSI 1",
      ville: "Nabeul",
      image: Image3,
    },
  ]);

  const [filtre, setFiltre] = useState("");

  function ajouterEtudiant(nouvelEtudiant) {
    const etudiantAvecId = { ...nouvelEtudiant, id: Date.now() };
    setEtudiants([...etudiants, etudiantAvecId]);
  }

  function supprimerEtudiant(id) {
    setEtudiants(etudiants.filter((e) => e.id !== id));
  }

  function modifierPrenom(id, nouveauPrenom) {
    setEtudiants(
      etudiants.map((e) =>
        e.id === id ? { ...e, prenom: nouveauPrenom } : e
      )
    );
  }

  const etudiantsFiltres = etudiants.filter((e) =>
    (e.filiere || "").toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <Navbar />

      <StudentForm onAjouterEtudiant={ajouterEtudiant} />

      <div className="toolbar">
        <input
          type="text"
          placeholder="Filtrer par filière..."
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
      </div>

      <main className="container">
        {etudiantsFiltres.map((etudiant) => (
          <StudentCard
            key={etudiant.id}
            prenom={etudiant.prenom}
            nom={etudiant.nom}
            email={etudiant.email}
            telephone={etudiant.telephone}
            filiere={etudiant.filiere}
            anneeEtude={etudiant.anneeEtude}
            groupe={etudiant.groupe}
            ville={etudiant.ville}
            image={etudiant.image}
            onSupprimer={() => supprimerEtudiant(etudiant.id)}
            onModifier={(nouveauPrenom) =>
              modifierPrenom(etudiant.id, nouveauPrenom)
            }
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;