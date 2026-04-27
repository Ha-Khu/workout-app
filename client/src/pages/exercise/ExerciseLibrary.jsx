import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function ExerciseLibrary(){
  
  const [exercise, setExercise] = useState([])
  const [name, setName] = useState("")
  const [bodyPart, setBodyPart] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

    useEffect(()=>{
    if(!token){
      navigate("/login")
      return
    }
    axios.get("http://localhost:5000/api/exercise/library",{
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setExercise(response.data)
    })
  }, [])

  function handleExercise(){
    axios.post("http://localhost:5000/api/exercise/library", {name, body_part: bodyPart},{
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(function(response){
      setExercise([...exercise, {name, body_part: bodyPart}])
      setName("")
      setBodyPart("")
    })
  }

return(
  <div className="min-h-screen bg-[#0f0f0f]">
    <div className="h-1 bg-orange-500"/>
    
    {/* Header */}
    <div className="flex justify-between items-center px-8 py-4 border-b border-[#1a1a1a]">
      <div>
        <h1 className="text-white text-xl font-bold tracking-widest">WORKOUT</h1>
        <p className="text-orange-500 text-[10px] tracking-[6px]">TRACKER</p>
      </div>
      <button onClick={()=> navigate('/dashboard')}
        className="text-gray-500 hover:text-orange-500 text-sm tracking-widest transition cursor-pointer">
        ← DASHBOARD
      </button>
    </div>

    <div className="max-w-2xl mx-auto px-8 py-8">

      {/* Formulár */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-8">
        <p className="text-orange-500 text-[10px] tracking-widest mb-4">ADD EXERCISE</p>
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
            <p className="text-orange-500 text-[10px] tracking-widest mb-1">NAME</p>
            <input type="text" value={name} onChange={(e)=> setName(e.target.value)}
              placeholder="Bench Press"
              className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
          </div>
          <div className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
            <p className="text-orange-500 text-[10px] tracking-widest mb-1">BODY PART</p>
            <input type="text" value={bodyPart} onChange={(e)=> setBodyPart(e.target.value)}
              placeholder="Chest"
              className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
          </div>
        </div>
        <button onClick={handleExercise}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg p-3 tracking-widest transition cursor-pointer">
          + ADD EXERCISE
        </button>
      </div>

      {/* Zoznam cvikov */}
      <p className="text-orange-500 text-[10px] tracking-widest mb-3">EXERCISE LIBRARY</p>
      {exercise.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No exercises yet. Add your first one!</p>
      ) : (
        exercise.map((ex) => (
          <div key={ex.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-3 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">{ex.name}</p>
              <p className="text-gray-500 text-xs tracking-widest">{ex.body_part}</p>
            </div>
            <p className="text-orange-500 text-xs tracking-widest">{ex.body_part.toUpperCase()}</p>
          </div>
        ))
      )}

    </div>
  </div>
)
}

export default ExerciseLibrary