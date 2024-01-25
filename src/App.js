import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import ScreeningOptions from './ScreeningOptions';
import { SzempontOptions } from './SzempontOptions';


function App() {

  const [tanarok, setTanarok] = React.useState([]);
  const [szempontok, setSzempontok] = React.useState([]);
  const [fetchPending, setFetchPending] = React.useState(false);

  const [selectedTanar, setSelectedTanar] = React.useState("Válassz tanárt");
  const [selectedSzempont, setSelectedSzempont] = React.useState("Válassz szempontot");

  const pontSzamitas = (tanar, szempont) => {
    let output = document.getElementById('pont');

    let vane = false;
    let tanci = {};
    let osszes = 0;

    if (szempont === "Összes szempont") {
      axios.get(`https://localhost:7253/api/Getter/${tanar}`).then((response) => {
        response.data.forEach(item => {
          osszes += Number(item.végsőPont);
          output.value = osszes;
        });
      });
      return;
    } else {
      axios.get(`https://localhost:7253/api/Getter/${tanar}`).then((response) => {
        response.data.forEach(item => {
          //console.log(item.szempontNev, szempont);
          if (item.szempontNev === szempont) {
            vane = true;
            tanci = item;
            console.log(tanci);
          }
        });
        if (vane) {
          output.value = tanci.végsőPont;
        } else {
          output.value = `${tanar} nem kapott értékelést a kijelölt szempontok alapján!`;
        }
      });
    }
  }

  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Tanári értékelő</h1>} />
        </Routes>
      </BrowserRouter>
      <div className='form-group'>
        <select
          value={selectedTanar}
          onChange={(e) => {
            setSelectedTanar(e.target.value);
            if (e.target.value !== "Válassz tanárt" && selectedSzempont !== "Válassz szempontot") {
              pontSzamitas(e.target.value, selectedSzempont);
            }
          }}
          className='form-select'>
          <option disabled>Válassz tanárt</option>
          <ScreeningOptions tanarok={tanarok} setTanarok={setTanarok} fetchPending={fetchPending} setFetchPending={setFetchPending} />
        </select>
        <br />
        <select
          value={selectedSzempont}
          onChange={(e) => {
            setSelectedSzempont(e.target.value);
            if (e.target.value !== "Válassz szempontot" && selectedTanar !== "Válassz tanárt") {
              pontSzamitas(selectedTanar, e.target.value);
            }

          }}
          className='form-select'>
          <option disabled>Válassz szempontot</option>
          <SzempontOptions szempontok={szempontok} setSzempontok={setSzempontok} fetchPending={fetchPending} setFetchPending={setFetchPending} />
          <option className='fw-bold'>Összes szempont</option>
        </select>
        <br />
        <label htmlFor='pont'>Pont összesítve</label>
        <input className='form-control' key={'pont'} id='pont' readOnly></input>
      </div>
    </div>
  );
}

export default App;
