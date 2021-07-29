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

  const handlePlayerStateUpdate = (state, updater) => {
    if (state) {
      const newOptions = playerClassOptions.results.filter(option => {
        return option.url !== state;
      });
      updater(randomIndex(newOptions).url);
    } else {
      updater(randomIndex(playerClassOptions.results).url);
    };
  };

  const handlePlayerRace = () => {
    handlePlayerStateUpdate(playerRaceUrl, setPlayerRaceUrl);
  };

  const handlePlayerClass = () => {
    handlePlayerStateUpdate(playerClassUrl, setPlayerClassUrl);
  };

  const handleGetPlayer = () => {
    handlePlayerClass();
    handlePlayerRace();
  };

  return (
    <div className="App">
      <button onClick={handleGetPlayer}>Randomize!</button>
    </div>
  );
}


export default App;
