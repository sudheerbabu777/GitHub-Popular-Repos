import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    languageList: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatusValue.initial,
  }

  componentDidMount() {
    this.getLanguage()
  }

  getLanguage = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: apiStatusValue.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    const data = await response.json()
    if (response.ok === true) {
      const formatData = {
        popularRepos: data.popular_repos,
      }
      const {popularRepos} = formatData
      const newPopularRepos = popularRepos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
        id: each.id,
        name: each.name,
      }))
      this.setState({
        languageList: newPopularRepos,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  getLanguageId = () => {
    const {activeId} = this.state
    const languageDetails = languageFiltersData.find(
      each => each.language === activeId,
    )
    if (languageDetails) {
      return languageDetails.language
    }
    return ''
  }

  setStateId = id => {
    this.setState({activeId: id}, this.getLanguage)
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderLanguageList = () => {
    const {languageList} = this.state
    return (
      <ul className="list-container">
        {languageList.map(each => (
          <RepositoryItem repositoryDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderIsFailures = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="something">Something went Wrong</p>
    </div>
  )

  renderResultApiCall = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.renderLoading()
      case apiStatusValue.success:
        return this.renderLanguageList()
      case apiStatusValue.failure:
        return this.renderIsFailures()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="app-container">
        <h1 className="main-title">Popular</h1>
        <ul className="item-language">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageDetails={each}
              key={each.id}
              setStateId={this.setStateId}
              isActive={each.id === activeId}
            />
          ))}
        </ul>
        {this.renderResultApiCall()}
      </div>
    )
  }
}

export default GithubPopularRepos
