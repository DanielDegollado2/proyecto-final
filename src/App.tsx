import { useState, useEffect } from 'react'
import type info from "./types/info";
import { obtenerInfo } from "./services/infoService";

import './App.css'

function App() {
  const [info, setInfo] = useState<info | null>(null);

  useEffect(() => {
     obtenerInfo().then(setInfo);
  }, []);
 
  return (
    <div>
      {info ? (
        <div>
          <h1>Taskflow API</h1>
          <p>Versión: {info.version}</p>
          <p>Nombre de la aplicación: {info.app}</p>
        </div>
      ) : (
        <p>Cargando información...</p>
      )}
    </div>
  );
}

export default App
