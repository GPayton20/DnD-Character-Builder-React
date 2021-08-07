import { useState, useEffect } from "react";


const Skills = ({ playerRace }) => {
  const [playerSkills, setPlayerSkills] = useState({});
  const { ability_bonuses } = playerRace;
  
  const skillsList = [
    'str',
    'dex',
    'con',
    'wis',
    'int',
    'cha'
  ]
  
  const assignSkills = () => {
    const standardArray = [15, 14, 13, 12, 10, 8];
    const newRandomIndex = array => Math.floor(Math.random() * array.length)
    
    const skillStats = skillsList.reduce((allSkills, currentSkill) => {
      allSkills[currentSkill] = standardArray.splice(newRandomIndex(standardArray), 1)[0];
      return allSkills;
    }, {});

    return skillStats;
  }

  const addBonuses = (skills) => {
    const currentSkills = {...skills};
    ability_bonuses.forEach(skill => {
      currentSkills[skill.ability_score.index] += skill.bonus;
    });
    return currentSkills;
  }

  useEffect(() => {
    let newSkills = assignSkills();
    console.log(newSkills);
    newSkills = addBonuses(newSkills);
    console.log({newSkills});
    // setPlayerSkills(newSkills);
  }, [playerRace]);

  return (
   <p>Nothing yet!</p>
  )
}

export default Skills;