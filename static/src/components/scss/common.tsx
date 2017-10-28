import * as style from 'ts-style'
type positionTypes =  'fixed' | 'initial' | 'inherit' | 'unset' | 'relative' | 'static' | 'absolute' | 'sticky'
type fontWeightTypes = 'initial' | 'inherit' | 'unset' | 'bold' | 'normal' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400
type attachments = 'fixed'| 'initial'| 'inherit'| 'unset'| 'scroll'| 'local'
type overflow = 'initial' | 'inherit' | 'unset' | 'scroll' | 'auto' | 'scroll' | 'hidden' | 'visible'

const cardsContainer = () => {
    return style.create({
        textAlign: 'center',
    })
}
const darkCard = (width = '780px') =>{
    return style.create({
        display: 'inline-block',
        backgroundColor: '#d9d9d9',
        borderRadius: '6px',
        padding: '2px',
        width: width,
        margin: '20px'
    })
}

const lightCard = () => {
    return style.create({
        backgroundColor: 'white',
        margin: '2px',
        padding: '6px',
        fontFamily: 'arial',
        fontSize: '24px',
        borderRadius: '6px',
        position: 'relative' as positionTypes,
        zIndex: 2
    })
}

export {
    darkCard,
    lightCard,
    cardsContainer,
    positionTypes,
    fontWeightTypes,
    attachments,
    overflow
}
