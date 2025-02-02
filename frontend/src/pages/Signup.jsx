import { Heading } from "../components/Heading.jsx"
import { SubHeading } from "../components/SubHeading.jsx"
import { InputBox } from "../components/InputBox.jsx"
import { Button } from "../components/Button.jsx"
import { BottomWarning } from "../components/BottomWarning.jsx"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Signup() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [userName, setuserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}></Heading>
        <SubHeading label={"Enter your information to create an account"}></SubHeading>
        <InputBox 
        onChange={(e)=> {
            setFirstName(e.target.value)
        }}
        placeholder={"First Name"}
        label={"First Name"}></InputBox>
        <InputBox 
        onChange={(e)=>{
            setlastName(e.target.value)
        }}
        placeholder={"Last Name"}
        label={"Last Name"}></InputBox>
        <InputBox
        onChange={(e)=>{
            setuserName(e.target.value)
        }}
        placeholder={"User Name"}
        label={"User Name"}></InputBox>
        <InputBox
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        placeholder={"Password"}
        label={"Password"}></InputBox>
        <div className="pt-4">
        <Button
        onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName,
                lastName,
                username: userName,
                password
            })
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        }} label={"Sign up"}></Button>
        </div>
        <BottomWarning label={"Already have an account?"}
        buttonText={"Sign in"}
        to={"/signin"}></BottomWarning>
                </div>
            </div>
        </div>
    )
}