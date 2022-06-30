import styled from 'styled-components'

export default function ImageWrapper ({ src, style, alt, id, className, onClick }) {
    return(
        <Wrapper id={id} src={src} style={style} alt={`KGHYPE-${alt}`} className={className} onClick={onClick} />
    )
}

const Wrapper = styled.img`
    max-width:100%;
    height:auto;
`