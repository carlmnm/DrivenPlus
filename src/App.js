//import Context from "./components/Context"
import UserContext from "./contexts/UserContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "./components/GlobalStyle"
import { useState } from "react"
import Screen1 from "./components/Screen1"
import Register from "./components/Register"

function App() {
  const tokenOnLocalStorage = localStorage.getItem("token")
  const [token, setToken] = useState(tokenOnLocalStorage)

  function setAndPersistToken(token) {
    setToken(token)
    localStorage.setItem("token", token)
  }

  return (
    <UserContext.Provider value={{ token, setToken, setAndPersistToken }}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Screen1 />} />
          <Route path="/sign-up" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
