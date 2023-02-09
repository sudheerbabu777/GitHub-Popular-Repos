// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props

  const {
    avatarUrl,
    forksCount,
    issuesCount,
    starsCount,
    name,
  } = repositoryDetails

  return (
    <li className="item-container">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="name">{name}</h1>
      <div className="problems-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stat-image"
        />
        <p className="start">{starsCount} stars</p>
      </div>
      <div className="problems-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="forks-image"
        />
        <p className="forks">{forksCount} forks</p>
      </div>
      <div className="problems-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="issues-image"
        />
        <p className="issues">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
