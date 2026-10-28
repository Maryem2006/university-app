import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import StudentCard from "./components/StudentCard.jsx";
import Footer from "./components/Footer.jsx";
import Image from "./assets/Image.jpeg";
import Image2 from "./assets/image2.jpeg";
import Image3 from "./assets/image3.jpeg";

function App() {
  const [etudiants, setEtudiants] = useState([
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
    {
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
  const [formulaireVisible, setFormulaireVisible] = useState(false);
  const [nouveau, setNouveau] = useState({ prenom: "", nom: "", filiere: "" });

  function handleChange(e) {
    setNouveau({ ...nouveau, [e.target.name]: e.target.value });
  }

  function ajouterEtudiant(e) {
    e.preventDefault();
    if (!nouveau.prenom.trim()) return;

    const nouvelEtudiant = {
      prenom: nouveau.prenom,
      nom: nouveau.nom,
      email: `${nouveau.prenom.toLowerCase()}.${Date.now()}@gmail.com`,
      telephone: "+216 00 000 000",
      filiere: nouveau.filiere || "Non renseignée",
      anneeEtude: "2ème année",
      groupe: "GLSI 2",
    };

    setEtudiants([...etudiants, nouvelEtudiant]);
    setNouveau({ prenom: "", nom: "", filiere: "" });
    setFormulaireVisible(false);
  }

  function supprimerEtudiant(email) {
    setEtudiants(etudiants.filter((e) => e.email !== email));
  }

  function modifierPrenom(email, nouveauPrenom) {
    setEtudiants(
      etudiants.map((e) =>
        e.email === email ? { ...e, prenom: nouveauPrenom } : e
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

      <div className="toolbar">
        <button
          className="btn"
          onClick={() => setFormulaireVisible(!formulaireVisible)}
        >
          {formulaireVisible ? "Annuler" : "+ Ajouter un étudiant"}
        </button>
        <input
          type="text"
          placeholder="Filtrer par filière..."
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
      </div>

      {formulaireVisible && (
        <form className="form-ajout" onSubmit={ajouterEtudiant}>
          <input name="prenom" placeholder="Prénom" value={nouveau.prenom} onChange={handleChange} />
          <input name="nom" placeholder="Nom" value={nouveau.nom} onChange={handleChange} />
          <input name="filiere" placeholder="Filière" value={nouveau.filiere} onChange={handleChange} />
          <button type="submit" className="btn">Ajouter</button>
        </form>
      )}

      <main className="container">
        {etudiantsFiltres.map((etudiant) => (
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
            onSupprimer={() => supprimerEtudiant(etudiant.email)}
            onModifier={(nouveauPrenom) =>
              modifierPrenom(etudiant.email, nouveauPrenom)
            }
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default App;