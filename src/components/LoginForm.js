import styled from "styled-components"
import { useEffect, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function UserLogin() {
    const { token, setAndPersistToken, myMembershipId, setAndPersistName, setAndPersistMyMembershipId } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            if (myMembershipId) {
                navigate(`/home/${myMembershipId}`)
            } else {
                navigate("/subscriptions")
            }
        }
    }, [token])

    function login(e) {
        e.preventDefault()
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login"
        const body = { email, password }

        const promise = axios.post(URL, body)
        promise.then((res) => {
            console.log("deu certo")
            setAndPersistToken(res.data.token)
            setAndPersistName(res.data.name)
            setAndPersistMyMembershipId(res.data.membership.id)
            navigate("/subscriptions")
        })
        promise.catch((err) => {
            alert("Verifique os dados fornecidos e tente novamente")
        })
    }
    return (
        <ContainerForm>
            <form onSubmit={login}>
                <Input
                    type="email"
                    placeholder="e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <ButtonLogin type="submit">
                    <p>{"Entrar"}</p>
                </ButtonLogin>
            </form>
        </ContainerForm>
    )
}

{/*styled components*/ }

const ContainerForm = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 299px;
`

const Input = styled.input`
width: 299px;
height: 52px;
background-color: #FFFFFF;
border-radius: 8px;
padding-left: 14px;
margin-bottom: 16px;
::placeholder{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #7E7E7E;
}
`

const ButtonLogin = styled.button`
width: 298px;
height: 52px;
background: #FF4791;
border-radius: 8px;
margin-top: 8px;
p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
}
`