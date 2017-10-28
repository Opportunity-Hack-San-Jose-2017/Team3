import * as React from 'react'
import { cardsContainer, darkCard, lightCard } from './scss/common'

interface AboutProps {
  
}


class AboutComponent extends React.Component<AboutProps, {}> {
  render() {
    return (
      <div style={cardsContainer()}>
        <div style={darkCard()}>
            <div style={lightCard()}>
              This tool is needed since currently only able to get meeting minutes by date. Council-catalog allows user to search the meetings by keyword topic.
            </div>    
        </div>
      </div>
    )
  }
}

export default AboutComponent
