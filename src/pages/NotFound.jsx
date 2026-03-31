import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-3xl font-bold text-gray-800">404</h1>
      <p className="text-gray-500 mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </button>
    </div>
  )
}