import {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  function handleLogin(){
    axios.post("http://localhost:5000/api/auth/login", {email, password})
    .then(function(response){
      localStorage.setItem('token', response.data.token)
      navigate("/dashboard")
    }).catch((err)=>{
      setError("Login failed, please try again")
    })
  }

  return(
     <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="h-1 bg-orange-500 rounded mb-8"/>
        <h1 className="text-white text-3xl font-bold text-center tracking-widest">WORKOUT</h1>
        <p className="text-orange-500 text-center tracking-[6px] text-sm mb-2">TRACKER</p>
        <p className="text-gray-500 text-center text-sm mb-8">Log In</p>

        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 mb-4">
          <p className="text-orange-500 text-[10px] tracking-widest mb-1">EMAIL</p>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
            placeholder="jacob@gmail.com"
            className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
        </div>

        <div className="bg-[#1a1a1a] border border-orange-500 rounded-lg p-3 mb-6">
          <p className="text-orange-500 text-[10px] tracking-widest mb-1">PASSWORD</p>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <button onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg p-3 tracking-widest transition cursor-pointer mb-6">
          LOGIN
        </button>

        <p className="text-gray-500 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-orange-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login