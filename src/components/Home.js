import UserContext from "../contexts/UserContext";
import { useState, useContext, useEffect } from "react"

export default function HomePage (){
    const { token, setAndPersistMyMembershipId, myMembershipId } = useContext(UserContext)
    console.log(myMembershipId)
    return (
        <p>{"olá"}</p>
    )
}