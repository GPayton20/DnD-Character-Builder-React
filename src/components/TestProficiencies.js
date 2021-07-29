import classes from './TestProficiencies.module.css';

const TestProficiencies = ({ proficiencies }) => {
  // todo Keep this list in a separate file along with names
  const skills = ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"]

  const choices = proficiencies[0].from.map(choice => choice.name.split('Skill: ').pop());

  return (
    <ul>
      {skills.map(skill => {
        return (
          <li className={choices.includes(skill) ? classes.proficient : ''}>
            {skill}
          </li>
        )
      })}
    </ul>
  )
}

export default TestProficiencies;