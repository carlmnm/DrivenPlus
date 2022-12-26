import { useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignUpForm() {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function signUp(e){
        e.preventDefault()
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up"
        const body = {email, name, cpf, password}

        const promise = axios.post(URL, body)
        promise.then((res) => {
            console.log("funcionou")
            navigate("/")
        })
        promise.catch((err) => {
            alert(err.response.data.message)
        })
    }

    return (
        <ContainerForm>
            <form onSubmit={signUp}>
                <Input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <ButtonLogin type="submit">
                    <p>{"Cadastrar"}</p>
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