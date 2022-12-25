import UserContext from "../contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import axios from "axios"
import styled from "styled-components"
import { Link } from "react-router-dom";

export default function SubscriptionsToChoose() {
    const { token } = useContext(UserContext)
    const [plans, setPlans] = useState([])
    const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships"
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        const promise = axios.get(URL, config)
        promise.then((res) => setPlans(res.data))
    }, [])

    return (
        <ContainerPlansCards>
            <h1>{"Escolha o seu Plano"}</h1>
            {plans.map((item) =>
                <Link to={`/subscriptions/${item.id}`} style={{textDecoration: 'none'}}>
                    <PlansCards>
                        <img src={item.image} alt="ícone do plano" />
                        <p>{`R$ ${item.price}`}</p>
                    </PlansCards>
                </Link>
            )}
        </ContainerPlansCards>
    )
}

{/*styled components*/ }

const PlansCards = styled.div`
width: 290px;
height: 180px;
background: #0E0E13;
border: 3px solid #7E7E7E;
border-radius: 12px;
display: flex;
align-items: center;
margin-bottom: 10px;
img{
    width: 92px;
    margin-left: 16px;
}
p{
    margin-left: 62px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;   
    font-size: 24px;
    color: #FFFFFF;
}
`

const ContainerPlansCards = styled.div`
width: 375px;
height: 667px;
background: #0E0E13;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    color: #FFFFFF;
    margin-bottom: 24px;
}
`