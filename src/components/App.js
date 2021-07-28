import '../styles/App.css';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/use-fetch';
import { randomIndex } from '../utils.js'

function App() {
  const baseUrl = `https://www.dnd5eapi.co`
  const [playerClassUrl, setPlayerClassUrl] = useState();

  const [playerClass, playerClassLoading, playerClassError] = useFetch(`${baseUrl}${playerClassUrl}`);

  // ! New states with useFetch hook
  const [playerRaceOptions, raceOptionsLoading, raceOptionsError] = useFetch(`${baseUrl}/api/races`);
  const [playerClassOptions, classOptionsLoading, classOptionsError] = useFetch(`${baseUrl}/api/classes`);

  useEffect(() => {
    console.log(playerRaceOptions);
  }, [playerRaceOptions]);
  useEffect(() => {
    console.log(playerClassOptions);
  }, [playerClassOptions]);
  useEffect(() => {
    if (playerClass) {
      console.log(playerClass);
    }
  })

  // todo this is getting called twice, and only works on first call
  const handleGetCharacter = () => {
    if (playerClass) {
      const newOptions = playerClassOptions.results.filter(option => {
        return option.url !== playerClass.url;
      });
      console.log(newOptions);
      setPlayerClassUrl(randomIndex(newOptions.results).url);
    } else {
      setPlayerClassUrl(randomIndex(playerClassOptions.results).url);
    }
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
