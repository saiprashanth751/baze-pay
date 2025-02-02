import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup.jsx"
import { Signin } from "./pages/SignIn.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { SendMoney } from "./pages/SendMoney.jsx"
import { PaymentStatus } from "./pages/PaymentStatus.jsx"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/send" element={<SendMoney/>}></Route>
          <Route path="/paymentstatus" element={<PaymentStatus/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
