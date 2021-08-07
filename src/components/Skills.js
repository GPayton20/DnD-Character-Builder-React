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
    newSkills = addBonuses(newSkills);
    setPlayerSkills(newSkills);
  }, [playerRace]);

  return (
   <ul>
     <li>Strength: {playerSkills.str}</li>
     <li>Dexterity: {playerSkills.dex}</li>
     <li>Constitution: {playerSkills.con}</li>
     <li>Wisdom: {playerSkills.wis}</li>
     <li>Intelligence: {playerSkills.int}</li>
     <li>Charisma: {playerSkills.cha}</li>
   </ul>
  )
}

export default Skills;