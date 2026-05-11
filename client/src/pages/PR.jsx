import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function PR() {
  const [prs, setPrs] = useState([])
  const [exerciseId, setExerciseId] = useState("")
  const [weight, setWeight] = useState("")
  const [date, setDate] = useState("")
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(!token){
      navigate('/login')
      return
    }
    axios.get("http://localhost:5000/api/pr", {
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setPrs(response.data)
      setLoading(false)
    })
  }, [])


  useEffect(()=>{
    axios.get("http://localhost:5000/api/exercise/library", {
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setExercises(response.data)
    })
  }, [])

  function handleAddPR(){
    axios.post("http://localhost:5000/api/pr", {exercise_library_id: exerciseId, weight, date}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setPrs([...prs, {exercise_library_id: exerciseId, weight, date}])
      setExerciseId("")
      setWeight("")
      setDate("")
    })
  }

  function handleDelete(id){
    axios.delete(`http://localhost:5000/api/pr/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setPrs(prs.filter((ex) => ex.id !== id))
    })
  }

if(loading) return(
  <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
  <div className="text-center">
    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"/>
    <p className="text-orange-500 text-[10px] tracking-widest">LOADING...</p>
  </div>
</div>
)

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
        <p className="text-orange-500 text-[10px] tracking-widest mb-4">ADD PERSONAL RECORD</p>
        
        <div className="mb-4">
          <p className="text-orange-500 text-[10px] tracking-widest mb-1">EXERCISE</p>
          <select value={exerciseId} onChange={(e)=> setExerciseId(e.target.value)}
            className="bg-[#0f0f0f] border border-[#2a2a2a] text-white w-full rounded-lg p-3 outline-none text-sm">
            <option value="">Select exercise...</option>
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
            <p className="text-orange-500 text-[10px] tracking-widest mb-1">WEIGHT (kg)</p>
            <input type="number" value={weight} onChange={(e)=> setWeight(e.target.value)}
              placeholder="100"
              className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
          </div>
          <div className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-3">
            <p className="text-orange-500 text-[10px] tracking-widest mb-1">DATE</p>
            <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}
              className="bg-transparent text-white w-full outline-none text-sm"/>
          </div>
        </div>

        <button onClick={handleAddPR}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg p-3 tracking-widest transition cursor-pointer">
          + ADD PR
        </button>
      </div>

      {/* Zoznam PR */}
      <p className="text-orange-500 text-[10px] tracking-widest mb-3">PERSONAL RECORDS</p>
      {prs.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No personal records yet. Add your first one!</p>
      ) : (
        prs.map((pr, index) => (
          <div key={index} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-3 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">
                {exercises.find((ex) => ex.id === Number(pr.exercise_library_id))?.name || "Unknown"}
              </p>
              <p className="text-gray-500 text-xs tracking-widest">{new Date(pr.date).toLocaleDateString()}</p>
            </div>
            <p className="text-orange-500 text-2xl font-bold">{pr.weight}kg</p>
            <button onClick={()=> handleDelete(pr.id)}
            className="text-red-500 hover:text-red-400 text-xs tracking-widest border border-red-500 hover:border-red-400 rounded-lg px-3 py-1 transition cursor-pointer">
            DELETE
          </button>
          </div>
        ))
      )}

    </div>
  </div>
)
}

export default PR