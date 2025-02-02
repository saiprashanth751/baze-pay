import { useEffect, useState } from "react"
import { Button } from "./Button.jsx";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"


export function Appbar() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (!userToken) {
            navigate("/signin")
        } else {
            axios.get("http://localhost:3000/api/v1/user/getUser", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
                .then((response) => {
                    setUser(response.data)
                })
        }
    }, [])

    const signOutHandler = () => {
        localStorage.removeItem("token")
        navigate("/signin")
    }

    return ( <div className="shadow h-14 flex justify-between items-center md:px-10">
        <Link to={"/dashboard"}>
            <div className="flex flex-col justify-center h-full ml-4 font-bold">
                Baze Pay
            </div>
        </Link>
        <div className="flex items-center justify-center gap-2">
            <Button
                onClick={signOutHandler}
                label={"Sign Out"}
            ></Button>
            <div className="flex flex-col justify-center h-full mr-4">
                {user?.firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user?.firstName[0].toUpperCase()}
                </div>
            </div>
        </div>
    </div>
    )
}