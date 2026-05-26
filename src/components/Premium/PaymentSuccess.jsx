import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axiosInstance from "../../services/axiosInstance";
import { addUser } from "../../redux/userSlice"

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [status, setStatus] = useState("verifying")

  useEffect(() => {
    let attempts = 0

    const intervalId = setInterval(async () => {
      try {
        attempts++
        const result = await axiosInstance.get("/profile")
        const user = result.data
        if (user.isPremium || attempts >= 5) {
          clearInterval(intervalId)
          if (user.isPremium) dispatch(addUser(user))
          setStatus("success")
          setTimeout(() => navigate("/"), 3000)
        }
      } catch{
        clearInterval(intervalId)
        setStatus("error")
      }
    }, 2000)

    return () => clearInterval(intervalId)
  }, [navigate, dispatch])

  return (
    <div className="h-full flex items-center justify-center bg-base-100 px-4">

      {status === "verifying" && (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4" />
          <h2 className="text-xl font-bold text-base-content">Verifying Payment...</h2>
          <p className="text-base-content/60 mt-2">Please wait while we confirm with Stripe.</p>
        </div>
      )}

      {status === "success" && (
        <div className="bg-base-200 border border-success/30 p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-success mb-2">Payment Successful!</h1>
          <p className="text-base-content/60 mb-6">Welcome to Premium. Redirecting you shortly...</p>
          <button onClick={() => navigate("/")} className="btn btn-primary w-full">
            Go to Dashboard
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error">Something went wrong.</h2>
          <p className="text-base-content/60 mt-2">Please contact support if your account was not upgraded.</p>
          <Link to="/" className="btn btn-ghost mt-4">Go to Dashboard</Link>
        </div>
      )}

    </div>
  )
}

export default PaymentSuccess