import { useEffect, useContext, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import UserContext from "../contexts/UserContext";
import clipboard from "../assets/imgs/clipboard.svg"
import money from "../assets/imgs/money.svg"
import FormToSubscribe from "./SubscribeForm";
import arrow from "../assets/imgs/arrow.svg"

export default function SignUpForThePlan() {
    const { token } = useContext(UserContext)
    const { idPlan } = useParams()
    const [planInfo, setPlanInfo] = useState([])
    const [planPerks, setPlanPerks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlan}`
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get(URL, config)
        promise.then((res) => {
            setPlanInfo(res.data)
            setPlanPerks(res.data.perks)
        })

    }, [])

    function returnTo() {
        navigate("/subscriptions")
    }

    return (
        <ContainerInfos>
            <div className="logo">
                <img src={planInfo.image} />
                <p>{planInfo.name}</p>
            </div>
            <Benefits>
                <div className="title">
                    <img src={clipboard} />
                    <p>{"Benefícios:"}</p>
                </div>
                {planPerks.map((item) =>
                    <h1>
                        {`${item.id}. ${item.title}`}
                    </h1>
                )}
            </Benefits>
            <Price>
                <div className="title">
                    <img src={money} />
                    <p>{"Preço:"}</p>
                </div>
                <h1>
                    {`R$ ${planInfo.price} cobrados mensalmente`}
                </h1>
            </Price>
            <FormToSubscribe />
            <div className="go-back">
                <img src={arrow} onClick={returnTo} />
            </div>
        </ContainerInfos >
    )
}

{/*styled components*/ }

const ContainerInfos = styled.div`
background-color: #000000;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 375px;
height: 667px;
position: relative;
.logo{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    position: absolute;
    top: 87px;
}
p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    color: #FFFFFF;
    margin-top: 12px;
}
img{
    width: 140px;
}
.go-back{
    img{
        position: absolute;
        top: 26px;
        left: 20px;
        width: 28px;
    }
}
`

const Benefits = styled.div`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: column;
width: 290px;
height: 15px;
margin-left: 23px;
margin-top: 250px;
margin-bottom: 34px;
//background-color: red;
h1{
    font-family: 'Roboto';
    font-style: normal; 
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    margin-bottom: 5px;
}
.title{
    display: flex;
    margin-top: 43px;
    margin-bottom: 10px;
    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #FFFFFF;
        margin-bottom: 10px;
        margin-left: 5px;

    }
    img{
        width: 12px;
    }
}
`

const Price = styled.div`
display: flex;
align-items: flex-start;
justify-content: center;
flex-direction: column;
width: 290px;
height: 15px;
margin-left: 12px;
margin-top: 12px;
margin-bottom: 34px;
//background-color: red;
h1{
    font-family: 'Roboto';
    font-style: normal; 
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    margin-bottom: -40px;
}
.title{
    display: flex;
    margin-top: 43px;
    margin-bottom: 0px;
    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #FFFFFF;
        margin-bottom: 7px;
        margin-left: 5px;

    }
    img{
        width: 15px;
        margin-bottom: -5px;
    }
}
`