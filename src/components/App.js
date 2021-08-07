import '../styles/App.css';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/use-fetch';
import { randomIndex } from '../utils.js';

import TestProficiencies from './TestProficiencies';
import Skills from './Skills';

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

  const handlePlayerStateUpdate = (state, updater, options) => {
    // Ensure the user does not receive the same player option twice in a row
    if (state) {
      const newOptions = options.results.filter(option => {
        return option.url !== state;
      });
      updater(randomIndex(newOptions).url);
    } else {
      updater(randomIndex(options.results).url);
    };
  };

  const handlePlayerRace = () => {
    handlePlayerStateUpdate(playerRaceUrl, setPlayerRaceUrl, playerRaceOptions);
  };

  const handlePlayerClass = () => {
    handlePlayerStateUpdate(playerClassUrl, setPlayerClassUrl, playerClassOptions);
  };

  const handleGetPlayer = () => {
    handlePlayerClass();
    handlePlayerRace();
  };

  return (
    <div className="App">
      <button onClick={handleGetPlayer}>Randomize!</button>
      {/* // todo Make this more legible! */}
      {/* {playerClass && playerClass.proficiency_choices[0].from.map(skill => <p>{skill.name.split('Skill: ').pop()}</p>)} */}
      {(playerClass && playerRace) &&
        <>
          <TestProficiencies proficiencies={playerClass.proficiency_choices} />
          <Skills playerRace={playerRace}/>
        </>
      }
    </div>
  );
}


export default App;
