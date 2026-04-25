import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function Dashboard(){
  
  const [user, setUser] = useState(null)
  const [workouts, setWorkouts] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(!token){
      navigate("/login")
      return
    }
    axios.get("http://localhost:5000/api/auth/me", {
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setUser(response.data[0])
    })
  }, [])

  useEffect(()=>{
    axios.get("http://localhost:5000/api/workout", {
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setWorkouts(response.data)
    })
  }, [])

   return(
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="h-1 bg-orange-500"/>
      
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-[#1a1a1a]">
        <div>
          <h1 className="text-white text-xl font-bold tracking-widest">WORKOUT</h1>
          <p className="text-orange-500 text-[10px] tracking-[6px]">TRACKER</p>
        </div>
        <button onClick={()=>{
          localStorage.removeItem('token')
          navigate('/login')
        }} className="text-gray-500 hover:text-orange-500 text-sm tracking-widest transition cursor-pointer">
          LOGOUT
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-8">

        {/* Profile karta */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
          <p className="text-orange-500 text-[10px] tracking-widest mb-3">PROFILE</p>
          <h2 className="text-white text-2xl font-bold mb-4">
            {user?.firstname} {user?.lastname}
          </h2>
          <div className="flex gap-6">
            <div>
              <p className="text-gray-500 text-xs tracking-widest">LEVEL</p>
              <p className="text-orange-500 text-3xl font-bold">{user?.lvl}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs tracking-widest">XP</p>
              <p className="text-white text-3xl font-bold">{user?.xp}</p>
            </div>
          </div>
        </div>

        {/* Akcie */}
        <div className="grid grid-cols-1 gap-4">
          <button onClick={()=> navigate('/newworkout')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl p-4 tracking-widest transition cursor-pointer">
            + NEW WORKOUT
          </button>

          <div className="grid grid-cols-2 gap-4">
            <Link to="/exercise"
              className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-orange-500 text-white rounded-xl p-4 text-center tracking-widest text-sm transition">
              EXERCISE LIBRARY
            </Link>
            <Link to="/pr"
              className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-orange-500 text-white rounded-xl p-4 text-center tracking-widest text-sm transition">
              PERSONAL RECORDS
            </Link>
          </div>

          <Link to="/workouthistory"
            className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-orange-500 text-white rounded-xl p-4 text-center tracking-widest text-sm transition">
            WORKOUT HISTORY
          </Link>
        </div>
        
        {/* Workout History */}
        <div className="mt-6">
          <p className="text-orange-500 text-[10px] tracking-widest mb-3">RECENT WORKOUTS</p>
          {workouts.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No workouts yet. Start your first workout!</p>
          ) : (
            workouts.map((workout) => (
              <div key={workout.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-3">
                <p className="text-orange-500 text-[10px] tracking-widest">WORKOUT</p>
                <p className="text-white font-semibold">{new Date(workout.date).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
        

      </div>
    </div>
  )
  
}

export default Dashboard