import * as React from "react"
import * as style from "react-style"

const mainHeaderContainer = {
    display: 'inline-block',
    textAlign: 'center',
    fontFamily: 'Arial',
}
interface MainHeaderState {
}
class MainHeaderComponent extends React.Component<{}, MainHeaderState> {
    constructor() {
        super()

    }
    render() {

        return (
            <div>
                <div style={mainHeaderContainer}>
                    <h1>Council-Catalog</h1>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainHeaderComponent
