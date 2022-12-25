import { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import UserContext from "../contexts/UserContext";
import closeX from "../assets/imgs/X.svg"

export default function FormToSubscribe() {
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [securityNumber, setSecurityNumber] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const { idPlan } = useParams()
    const { token, setAndPersistMyMembershipId, myMembershipId } = useContext(UserContext)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [planInfo, setPlanInfo] = useState([])
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

        })

        console.log(idPlan)

    }, [])

    function subscribe(e) {
        e.preventDefault()
        const membershipId = idPlan
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"
        const body = { membershipId, cardName, cardNumber, securityNumber, expirationDate }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        setModalVisibility(true)
        console.log(modalVisibility)

        const promise = axios.post(URL, body, config)
        promise.then((res) => {
            setAndPersistMyMembershipId(planInfo.id)
            navigate(`/home/${idPlan}`)
            console.log(res.data)
        })
        promise.catch((err) => {
            alert(err.response.data.details)
        }) 

    }

    function closeAndOpenModal(e) {
        e.preventDefault()
        if (modalVisibility === true) {
            setModalVisibility(false)
        }
        if (modalVisibility === false) {
            setModalVisibility(true)
        }
    }

    return (
        <>
            <ContainerForm>
                <form onSubmit={closeAndOpenModal}>
                    <Input
                        type="text"
                        placeholder="Nome impresso no cartão"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        required
                    />
                    <Input
                        type="number"
                        placeholder="Digitos do cartão"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        required
                    />
                    <LittleInput
                        type="number"
                        placeholder="Código de segurança"
                        value={securityNumber}
                        onChange={e => setSecurityNumber(e.target.value)}
                        required
                    />
                    <LittleInput
                        type="text"
                        placeholder="Validade"
                        value={expirationDate}
                        onChange={e => setExpirationDate(e.target.value)}
                        required
                    />
                    <ButtonLogin type="submit">
                        <p>{"ASSINAR"}</p>
                    </ButtonLogin>
                </form>
            </ContainerForm>
            <Modal visibility={modalVisibility}>
                <ConfirmationWindow>
                    <p>{`Tem certeza que deseja assinar o plano`} </p>
                    <p>{`${planInfo.name} (R$ ${planInfo.price})?`}</p>
                    <div className="buttons">
                        <NoButton onClick={closeAndOpenModal}><h1>{"Não"}</h1></NoButton>
                        <YesButton onClick={subscribe}><h1>{"SIM"}</h1></YesButton>
                    </div>
                </ConfirmationWindow>
                <img onClick={closeAndOpenModal} src={closeX}/>
            </Modal>
        </>
    )
}

{/*styeled components*/ }

const YesButton = styled.button`
width: 95px;
height: 52px;
background: #FF4791;
border-radius: 8px;
h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
    flex: none;
    order: 0;
    flex-grow: 0;
}
`

const NoButton = styled.button`
width: 95px;
height: 52px;
background: #CECECE;
border-radius: 8px;
margin-right: 14px;
h1{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
}
`

const ConfirmationWindow = styled.div`
width: 248px;
height: 210px;
background: #FFFFFF;
border-radius: 12px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
.buttons{
    margin-top: 47px;
}
p{
    margin-top: 0px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    color: #000000;
    text-align: center;
    line-height: 21px;
}
`

const Modal = styled.div`
width: 375px;
height: 667px;
background-color: rgba(0, 0, 0, 0.7);
display: ${props => props.visibility ? "flex" : "none"};
z-index: 1;
position: absolute;
justify-content: center;
align-items: center;
img{
    width: 28px;
    position: absolute;
    top: 26px;
    right: 20px;
}
`

const ContainerForm = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 299px;
margin-top: 50px;
p{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
    margin-bottom: 9px;
}
`

const Input = styled.input`
width: 299px;
height: 52px;
background-color: #FFFFFF;
border-radius: 8px;
padding-left: 14px;
margin-bottom: 8px;
::placeholder{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #7E7E7E;
    }
`

const LittleInput = styled.input`
width: 145px;
height: 52px;
background-color: #FFFFFF;
border-radius: 8px;
padding-left: 9px;
margin-bottom: 8px; ;
margin-right: 2px;
margin-left: 2px;
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
`