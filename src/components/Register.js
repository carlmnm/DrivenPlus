import SignUpForm from "./RegisterForm"
import styled from "styled-components"
import { Link } from "react-router-dom"

export default function RegisterScreen() {
    return (
        <ContainerLogin>
            <SignUpForm />
            <Link to={`/`}>
                <h1>
                    {"Já possuí uma conta? Entre"}
                </h1>
            </Link>
        </ContainerLogin>
    )
}

{/*styled componets*/ }

const ContainerLogin = styled.div`
width: 375px;
height: 667px;
background-color: #0E0E13;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
img{
    width: 262px;
    margin-bottom: 100px;
}
h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    text-decoration-line: underline;
    color: #FFFFFF;
    margin-top: 24px;
}
`