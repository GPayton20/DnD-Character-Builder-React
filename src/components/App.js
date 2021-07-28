import '../styles/App.css';
import { useState, useEffect } from 'react';

function App() {

  const [playerClass, setPlayerClass] = useState(null)

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`https://www.dnd5eapi.co/api/classes/fighter`);
      const data = await response.json();
      console.log(data)
      setPlayerClass(data);
    }

    api();
  }, [])
  
  return (
    <div className="App">
      {playerClass
      ? playerClass.proficiencies.map(prof => {
        return (
          <ul>
            <li key={prof.index}>{prof.name}</li>
          </ul>
        )
      })
      : null}
    </div>
  );
}

export default App;
