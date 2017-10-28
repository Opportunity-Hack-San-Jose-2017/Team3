import * as React from "react"
import * as style from "ts-style"


const toggleRendering = (conditions: Boolean) => {
    const contactItemContainerCSS = {
        padding: "10px",
        margin: "30px",
        fontSize: "26px"
    }
    if( conditions ) {
        return (
            <div>
                <div style={contactItemContainerCSS}>
                    To contact Joseph Richardson: <a href="mailto:jrichardson@jmstudios.net" >Send Mail</a>           
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div style={contactItemContainerCSS}>
                    For consulting contact Joseph Richardson: <a href="mailto:consulting@jmstudios.net" >Send Mail Consulting</a>           
                </div>
            </div>
        )
    }

}
interface ContactState {
    toggleConditional: Boolean
}
class ContactsComponent extends React.Component<{}, ContactState> {
    constructor() {
        super()

        this.state = ({
            toggleConditional: true
        } as ContactState);
        this.toggleConditionalEvent = this.toggleConditionalEvent.bind(this)

    }
    toggleConditionalEvent(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()

        this.setState({
            toggleConditional: !this.state.toggleConditional
        })

    }
    render() {

        return (
            <div>
                <button onClick={this.toggleConditionalEvent}>Toggle</button>
                {toggleRendering(!this.state.toggleConditional)}
            </div>
        );
    }
    componentDidMount() {
        this.setState({
            toggleConditional: true
        })
    }
}

export default ContactsComponent
