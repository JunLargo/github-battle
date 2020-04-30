import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({selected, onUpdateLanguge}) {
   const languages = ['All', 'JavaScript', 'Java', 'CSS', 'Ruby', 'Python']
      return(
         <ul className = 'flex-center'>
               {languages.map((language) => (
                  <li key={language}>
                     <button
                     className ='btn-clear nav-link'
                     style = {language === selected
                     ? {color: 'purple'}
                     : null}
                     onClick = {() => onUpdateLanguge(language)}>
                           {language}
                     </button>
                  </li>
               ))}
         </ul>
      )
}

LanguagesNav.propTypes = {
   selected: PropTypes.string.isRequired,
   onUpdateLanguge: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                selectedLanguage: 'All',
                repos: {},
                error: null

            }

            this.updateLanguage = this.updateLanguage.bind(this)
            this.isLoading = this.isLoading.bind(this)
        }

        componentDidMount() {
           this.updateLanguage(this.state.selectedLanguage)
        }

        updateLanguage(selectedLanguage) {
            this.setState({
                selectedLanguage,
                error: null

            })

            if (!this.state.repos[selectedLanguage]) {

               fetchPopularRepos(selectedLanguage)
                  .then((data) => {
                     this.setState(({repos}) => ({
                        repos: {
                           ...repos,
                           [selectedLanguage]: data
                        }
                     }))
                  })
                  .catch(() => {
                     console.warn('Error fetching repos: ', error)
                     this.setState({
                        error: 'There was an error fetching the repositories.'
                     })
                  }) 
            }  
        }

        isLoading() {
           const {selectedLanguage, repos, error} = this.state
           return !repos[selectedLanguage] && error === null
        }

    render() {
      const { selectedLanguage, repos, error } = this.state
      return(
         <React.Fragment>
            <LanguagesNav
               selected = {selectedLanguage}
               onUpdateLanguge = {this.updateLanguage}
            />

            {this.isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}

         </React.Fragment>
      )
   }
}

