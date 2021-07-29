import '../styles/App.css';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/use-fetch';
import { randomIndex } from '../utils.js'

function App() {
  const baseUrl = `https://www.dnd5eapi.co`
  const [playerRaceOptions, raceOptionsLoading, raceOptionsError] = useFetch(`${baseUrl}/api/races`);
  const [playerClassOptions, classOptionsLoading, classOptionsError] = useFetch(`${baseUrl}/api/classes`);
  
  const [playerClassUrl, setPlayerClassUrl] = useState(null);
  const [playerRaceUrl, setPlayerRaceUrl] = useState(null);

  const [playerClass, playerClassLoading, playerClassError] = useFetch(`${baseUrl}${playerClassUrl}`);
  const [playerRace, playerRaceLoading, playerRaceError] = useFetch(`${baseUrl}${playerRaceUrl}`);


  // * Solely for testing and debugging purposes
  useEffect(() => {
    if (playerClass) {
      console.log(playerClass);
    }
  }, [playerClass]);
  useEffect(() => {
    if (playerRace) {
      console.log(playerRace);
    }
  }, [playerRace]);

  const handleGetCharacter = () => {
    if (playerClassUrl) {
      const newOptions = playerClassOptions.results.filter(option => {
        return option.url !== playerClassUrl;
      });
      setPlayerClassUrl(randomIndex(newOptions).url);
    } else {
      setPlayerClassUrl(randomIndex(playerClassOptions.results).url);
    };
   
    if (playerRaceUrl) {
      const newOptions = playerRaceOptions.results.filter(option => {
        return option.url !== playerRaceUrl;
      });
      setPlayerRaceUrl(randomIndex(newOptions).url);
    } else {
      setPlayerRaceUrl(randomIndex(playerRaceOptions.results).url);
    };
  };

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
      <button onClick={handleGetCharacter}>Randomize!</button>
    </div>
  );
}


export default App;
