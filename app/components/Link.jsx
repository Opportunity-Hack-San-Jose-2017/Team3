import * as React from 'react'
import {UIRouter, UIView, UISref, UISrefActive, pushStateLocationPlugin} from 'ui-router-react'

const navItem = (color) => {
      return {
          marginRight: '20px',
          fontSize: '34px',
          fontFamily: 'Arial',
          display: 'inline-block',
          color: color
      }
}
class Link extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
    }
    toggleHoverState = (event) => {
        event.preventDefault()
        this.setState({
            hover: !this.state.hover
        })
    }
    render() {
        let linkStyle = {}
        if (this.state.hover) {
            linkStyle = navItem('blue')
        }
        else {
            linkStyle = navItem('black')
        }
        return (
            <UISrefActive class='active'>
                <UISref to={this.props.name}>
                    <div style={linkStyle}
                        onMouseEnter={this.toggleHoverState}
                        onMouseLeave={this.toggleHoverState}
                    >
                        <a>{this.props.displayText}</a>
                    </div>
                </UISref>
            </UISrefActive>
        )
    }
}

export default Link
