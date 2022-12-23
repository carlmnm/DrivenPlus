import { Link } from "react-router-dom"
import styled from "styled-components"
import logoname from "../assets/imgs/logoname.png"
import UserLogin from "./LoginForm"


export default function LoginScreen() {
    return (
        <ContainerLogin>
            <img src={logoname} alt="driven+" />
            <UserLogin />
            <Link to={`/sign-up`}>
                <h1>
                    {"Não possui uma conta? Cadastre-se"}
                </h1>
            </Link>
        </ContainerLogin>
    )
}

{/*styled components*/ }

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