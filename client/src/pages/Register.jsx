import {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function Register(){
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  function handleRegister(){
    axios.post("http://localhost:5000/api/auth/register", {firstname, lastname, email, password}).
    then(function(response){
      navigate('/login')
    })
    .catch((err)=>{
      setError("Registrácia zlyhala, skús znova")
    })
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="h-1 bg-orange-500 rounded mb-8"/>
        <h1 className="text-white text-3xl font-bold text-center tracking-widest">WORKOUT</h1>
        <p className="text-orange-500 text-center tracking-[6px] text-sm mb-2">TRACKER</p>
        <p className="text-gray-500 text-center text-sm mb-8">Create account</p>

        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3">
            <p className="text-orange-500 text-[10px] tracking-widest mb-1">FIRST NAME</p>
            <input type="text" value={firstname} onChange={(e)=>setFirstName(e.target.value)}
              placeholder="Jacob"
              className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
          </div>
          <div className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3">
            <p className="text-orange-500 text-[10px] tracking-widest mb-1">LAST NAME</p>
            <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)}
              placeholder="Vance"
              className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
          </div>
        </div>

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

        <button onClick={handleRegister}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg p-3 tracking-widest transition cursor-pointer mb-6">
          REGISTER
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[#2a2a2a]"/>
          <span className="text-gray-600 text-xs">OR</span>
          <div className="flex-1 h-px bg-[#2a2a2a]"/>
        </div>

        <p className="text-gray-500 text-center text-sm">
        You already have account ? <Link to="/login" className="text-orange-500 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register