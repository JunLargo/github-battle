import React from 'react'

function LanguagesNav({selected, onUpdateLanguge}) {
   const languages = ['All', 'JavaScript', 'Java', 'CSS', 'Python', 'C++']
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

export default class Popular extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                selectedLanguage: 'All'
            }

            this.updateLanguage = this.updateLanguage.bind(this)
        }

        updateLanguage(selectedLanguage) {
            this.setState({
                selectedLanguage
            })
        }

    render() {
      const { selectedLanguage } = this.state
      return(
         <React.Fragment>
            <LanguagesNav
               selected = {selectedLanguage}
               onUpdateLanguge = {this.updateLanguage}
            />
         </React.Fragment>
      )
   }
}