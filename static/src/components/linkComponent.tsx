import * as React from 'react'
import * as style from 'ts-style'
import {UIRouter, UIView, UISref, UISrefActive, pushStateLocationPlugin} from 'ui-router-react'
interface LinkState {
    hover: boolean
}

interface LinkProps {
    name: string
    displayText: string
}
const navItem = (color: string) => {
    return style.create({
        marginRight: '20px',
        fontSize: '34px',
        fontFamily: 'Arial',
        display: 'inline-block',
        color: color
    })
}
class Link extends React.Component<LinkProps, LinkState> {
    constructor(props: LinkProps) {
        super(props)
        this.state = {
            hover: false
        }
    }
    toggleHoverState(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault()
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
                         onMouseEnter={(e) => this.toggleHoverState(e)}
                         onMouseLeave={(e) => this.toggleHoverState(e)}>
                         <a>{this.props.displayText}</a>
                    </div>
                </UISref>
            </UISrefActive>
        )
    }
}

export default Link
