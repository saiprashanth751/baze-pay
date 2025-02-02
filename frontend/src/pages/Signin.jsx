import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { Button } from "../components/Button.jsx";
import { BottomWarning } from "../components/BottomWarning.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const userToken = localStorage.getItem("token")
        if(userToken){
            navigate("/dashboard")
        }
    },[])

    return (
        <>
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}></Heading>
                    <SubHeading label={"Enter your Credentials to access your account"}></SubHeading>
                    <InputBox
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                        placeholder={"Email"}
                        label={"Email"}></InputBox>
                    <InputBox
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        placeholder={"Password"}
                        label={"Password"}></InputBox>
                    <div className="pt-4">    
                    <Button
                        onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username: userName,
                                password
                            })
                            localStorage.setItem("token", response.data.token)
                            navigate("/dashboard")
                        }}
                        label={"Sign in"}></Button>
                    </div>
                    <BottomWarning
                        label={"Don't have an account?"}
                        buttonText={"Sign up"}
                        to={"/signup"}></BottomWarning>
                </div>
            </div>
        </div>
        </>
    )
}