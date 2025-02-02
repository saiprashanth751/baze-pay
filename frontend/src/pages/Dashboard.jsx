import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/AppBar.jsx";
import { Balance } from "../components/Balance.jsx";
import { Users } from "../components/Users.jsx";
import axios from "axios"

export function Dashboard () {
    const [balance, setBalance] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const userToken = localStorage.getItem("token")
        if(!userToken){
            navigate("/signin");
        }
        else{
            axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then((response) => {
                setBalance(response.data.balance)
            })
            .catch((error) => {
                console.log(error)
                navigate("/signin")
            })
        }
    }, [navigate])

    return (
        <div>
            <Appbar></Appbar>
            <div className="m-8">
                <Balance value={balance}></Balance>
                <Users></Users>
            </div>
        </div>
    )

}