import '../styles/App.css';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/use-fetch';

function App() {
  const baseUrl = `https://www.dnd5eapi.co/api`

  const [playerClass, setPlayerClass] = useState(null)

  // ! New states with useFetch hook
  const [playerRaceOptions, raceOptionsLoading, raceOptionsError] = useFetch(`${baseUrl}/races`);
  const [playerClassOptions, classOptionsLoading, classOptionsError] = useFetch(`${baseUrl}/classes`)

  useEffect(() => {
    console.log(playerRaceOptions);
  }, [playerRaceOptions]);
  useEffect(() => {
    console.log(playerClassOptions);
  }, [playerClassOptions]);

  // useEffect(() => {
  //   const api = async () => {
  //     const response = await fetch(`https://www.dnd5eapi.co/api/classes/fighter`);
  //     const data = await response.json();
  //     console.log(data)
  //     setPlayerClass(data);
  //   }

  //   api();
  // }, [])
  
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
