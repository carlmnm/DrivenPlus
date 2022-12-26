//import Context from "./components/Context"
import UserContext from "./contexts/UserContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/GlobalStyle"
import { useState } from "react"
import Screen1 from "./components/Screen1"
import Register from "./components/Register"
import SubscriptionsScreen from "./components/SubscriptionsScreen"
import PlanDetail from "./components/PlanDetail"
import Home from "./components/Home"

function App() {
  const tokenOnLocalStorage = localStorage.getItem("token")
  const [token, setToken] = useState(tokenOnLocalStorage)
  
  const nameOnLocalStorage = localStorage.getItem("name")
  const [name, setName] =useState(nameOnLocalStorage)

  const membershipIdOnLocalStorage = localStorage.getItem("myMembershipId")
  const [myMembershipId, setMyMembershipId] = useState(membershipIdOnLocalStorage)

  function setAndPersistName (name) {
    setName(name)
    localStorage.setItem("name", name)
  }

  function setAndPersistToken(token) {
    setToken(token)
    localStorage.setItem("token", token)
  }

  function setAndPersistMyMembershipId(myMembershipId){
    setMyMembershipId(myMembershipId)
    localStorage.setItem("myMembershipId", myMembershipId)
  }

  return (
    <UserContext.Provider value={{ 
        token, 
        setToken, 
        setAndPersistToken, 
        myMembershipId, 
        setMyMembershipId, 
        setAndPersistMyMembershipId, 
        name, 
        setName, 
        setAndPersistName 
        }}
        >
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Screen1 />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/subscriptions" element={<SubscriptionsScreen />} />
          <Route path="/subscriptions/:idPlan" element={<PlanDetail />} />
          <Route path="/home/:idHome" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
