// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, setStateId, isActive} = props
  const {id, language} = languageDetails

  const className = isActive ? 'button active' : 'button'

  const onClickButton = () => {
    setStateId(id)
  }

  return (
    <li>
      <button className={className} type="button" onClick={onClickButton}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
