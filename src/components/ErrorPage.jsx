import { Link, useNavigate, useRouteError, isRouteErrorResponse } from "react-router-dom"

const ErrorPage = () => {
  const navigate = useNavigate()
  const error = useRouteError()

  let status = "404"
  let title = "Page Not Found"
  let message = "The page you're looking for doesn't exist."

  if (isRouteErrorResponse(error)) {
    status = error.status
    title = error.statusText
    message = error.data || "Something went wrong."
  } else if (error) {
    status = "Error"
    title = "Something went wrong"
    message = error.message || "An unexpected error occurred."
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-base-100 px-4 gap-4">

      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
        <svg className="w-10 h-10 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
        </svg>
      </div>

      <h1 className="text-6xl font-extrabold text-base-content">{status}</h1>
      <h2 className="text-xl font-semibold text-base-content/70">{title}</h2>
      <p className="text-sm text-base-content/50 text-center max-w-md">{message}</p>

      <div className="flex gap-3 mt-2">
        <button onClick={() => navigate(-1)} className="btn btn-ghost">Go Back</button>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>

    </div>
  )
}

export default ErrorPage