import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import toast from 'react-hot-toast'

function WorkoutHistory(){
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(!token){
      navigate('/login')
      return
    }
    axios.get("http://localhost:5000/api/workout", {
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setWorkouts(response.data)
      setLoading(false)
    })
  }, [])

  function handleDelete(id){
    if(!window.confirm("Are you sure you want to delete this workout?")) return
    axios.delete(`http://localhost:5000/api/workout/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(()=>{
      setWorkouts(workouts.filter((workout)=> workout.id !== id))
    })
    toast.success("Workout deleted!")
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

      <p className="text-orange-500 text-[10px] tracking-widest mb-3">WORKOUT HISTORY</p>
      {workouts.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No workouts yet. Start your first workout!</p>
      ) : (
        workouts.map((workout) => (
          <div key={workout.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-3 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">Workout #{workout.id}</p>
              <p className="text-gray-500 text-xs tracking-widest">{new Date(workout.date).toLocaleDateString()}</p>
            </div>
            <button onClick={()=> handleDelete(workout.id)}
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

export default WorkoutHistory