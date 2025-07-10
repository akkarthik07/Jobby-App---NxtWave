import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skills-list-items">
      <div className="skills-items">
        <img src={imageUrl} alt={name} className="skills-img" />
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillsCard
