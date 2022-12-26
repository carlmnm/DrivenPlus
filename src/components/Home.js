import UserContext from "../contexts/UserContext";
import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components";
import person from "../assets/imgs/person.svg"

export default function HomePage() {
    const { token, setAndPersistMyMembershipId, setMyMembershipId, myMembershipId, name } = useContext(UserContext)
    console.log(myMembershipId)
    const [planInfo, setPlanInfo] = useState([])
    const [planPerks, setPlanPerks] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${myMembershipId}`
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

    function changePlan () {
        navigate("/subscriptions")
    }


    return (
        <ContainerHome>
            <Header>
                <div className="logo">
                    <img src={planInfo.image} />
                </div>
                <div className="user">
                    <img src={person} />
                </div>
                <h1>{`Olá, ${name}`}</h1>
            </Header>
            <Body>
                {planPerks.map((item) =>
                    <a href={item.link} style={{ textDecoration: 'none' }}>
                        <BenefitsButton>
                            <h2>{item.title}</h2>
                        </BenefitsButton>
                    </a>
                )}
            </Body>
            <Footer>
                <ChangeButton onClick={changePlan}>
                    <h2>{"Mudar plano"}</h2>
                </ChangeButton>
                <CancelButton>
                    <h2>{"Cancelar plano"}</h2>
                </CancelButton>
            </Footer>
        </ContainerHome>
    )
}

{/*styled components*/ }

const Footer = styled.div`
width: 375px;
height: 124px;
display: flex;
justify-content: center;
align-items: flex-end;
flex-wrap: wrap;
position: absolute;
bottom: 12px;
`

const ChangeButton = styled.div`
width: 299px;
height: 52px;
background: #FF4791;
border-radius: 8px;
margin-bottom: 8px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
h2{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
}
`
const CancelButton = styled.div`
width: 299px;
height: 52px;
background: #FF4747;
border-radius: 8px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
h2{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
}
`

const Body = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
margin-top: 53px;
`

const BenefitsButton = styled.div`
width: 299px;
height: 52px;
left: 38px;
top: 176px;
background: #FF4791;
border-radius: 8px;
margin-bottom: 8px;
display: flex;
justify-content: center;
align-items: center;
a{
    cursor: pointer;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
}
h2{
    cursor: pointer;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
}
`

const ContainerHome = styled.div`
width: 375px;
height: 667px;
background-color: #0E0E13;
position: relative;
`

const Header = styled.div`
height: 123px;
width: 375px;
display: flex;
position: relative;
align-items: flex-end;
justify-content: center;
.logo{
    img{
        width: 60px;
        position: absolute;
        top: 32px;
        left: 38px;
    }
}
h1{
    font-family: 'Roboto';
    font-style: normal; 
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
}
.user{
    img{
        width: 34px;
        position: absolute;
        top: 23px;
        right: 22px;
    }
}
`

