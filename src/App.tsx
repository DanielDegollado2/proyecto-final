import { useState, useEffect } from 'react'
import type info from "./types/Info";

import './App.css'

function App() {
  const [info, setInfo] = useState<info | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://d3ujwk09smrk9z.cloudfront.net/info');
      const result = await response.json();
      setInfo(result);
    }

    fetchData();
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
