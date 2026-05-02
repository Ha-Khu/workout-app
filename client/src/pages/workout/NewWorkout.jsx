import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function NewWorkout(){
  const [date, setDate] = useState("")
  const [exercise, setExercise] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [sets, setSets] = useState({})
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(!token){
      navigate("/login")
      return
    }
    axios.get("http://localhost:5000/api/exercise/library", {
      headers: {Authorization: `Bearer ${token}`}
    }).then(function(response){
      setExercise(response.data)
    })
  }, [])

  function handleSaveWorkout(){
    axios.post("http://localhost:5000/api/workout", {date}, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(function(response){
      const workoutID = response.data.insertId
      selectedExercises.forEach((exercise)=>{
        axios.post("http://localhost:5000/api/exercise", {workout_id: workoutID, exercise_library_id: exercise.id}, {
          headers: {Authorization: `Bearer ${token}`}
        })
      })
      navigate('/dashboard')
    })
  }

  function handleAddExercise(exercise){
    if(selectedExercises.find((ex) => ex.id === exercise.id)) return
    setSelectedExercises([...selectedExercises, {...exercise, sets: []}])
  }

  function handleRemoveExercise(id){
    setSelectedExercises(selectedExercises.filter((ex)=> ex.id !== id))
  }

  function handleAddSet(exerciseId, weight, reps){
    setSelectedExercises(selectedExercises.map((ex)=> {
      if (ex.id === exerciseId){
        return {...ex, sets: [...ex.sets, {weight, reps}]}
      }
      return ex
    }))
    setWeight("")
    setReps("")
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

      {/* Date input */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-6">
        <p className="text-orange-500 text-[10px] tracking-widest mb-1">WORKOUT DATE</p>
        <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}
          className="bg-transparent text-white w-full outline-none text-sm"/>
      </div>

      {/* Zoznam cvikov z library */}
      <p className="text-orange-500 text-[10px] tracking-widest mb-3">EXERCISE LIBRARY</p>
      {exercise.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mb-6">No exercises yet.</p>
      ) : (
        exercise.map((ex) => (
          <div key={ex.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 mb-3 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">{ex.name}</p>
              <p className="text-gray-500 text-xs tracking-widest">{ex.body_part.toUpperCase()}</p>
            </div>
            <button onClick={()=> handleAddExercise(ex)}
              className="text-orange-500 hover:text-orange-400 text-xs tracking-widest border border-orange-500 hover:border-orange-400 rounded-lg px-3 py-1 transition cursor-pointer">
              + ADD
            </button>
          </div>
        ))
      )}

      {/* Vybrané cviky */}
      {selectedExercises.length > 0 && (
      <div className="mt-6">
        <p className="text-orange-500 text-[10px] tracking-widest mb-3">SELECTED EXERCISES</p>
        {selectedExercises.map((ex) => (
          <div key={ex.id} className="bg-[#1a1a1a] border border-orange-500 rounded-xl p-4 mb-3">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-white font-semibold">{ex.name}</p>
                <p className="text-gray-500 text-xs tracking-widest">{ex.body_part.toUpperCase()}</p>
              </div>
              <button onClick={()=> handleRemoveExercise(ex.id)}
                className="text-red-500 hover:text-red-400 text-xs tracking-widest border border-red-500 hover:border-red-400 rounded-lg px-3 py-1 transition cursor-pointer">
                REMOVE
              </button>
            </div>

            {/* Serie */}
            {ex.sets.length > 0 && (
              <div className="mb-3">
                {ex.sets.map((set, i) => (
                  <div key={i} className="flex gap-4 text-xs text-gray-400 mb-1">
                    <p>Set {i+1}</p>
                    <p>{set.weight}kg</p>
                    <p>{set.reps} reps</p>
                  </div>
                ))}
              </div>
            )}

            {/* Input na sériu */}
            <div className="flex gap-3">
              <div className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-2">
                <p className="text-orange-500 text-[10px] tracking-widest mb-1">WEIGHT (kg)</p>
                <input type="number"
                  value={sets[ex.id]?.weight || ""}
                  onChange={(e)=> setSets({...sets, [ex.id]: {...sets[ex.id], weight: e.target.value}})}
                  placeholder="80"
                  className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
              </div>
              <div className="flex-1 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-2">
                <p className="text-orange-500 text-[10px] tracking-widest mb-1">REPS</p>
                <input type="number"
                  value={sets[ex.id]?.reps || ""}
                  onChange={(e)=> setSets({...sets, [ex.id]: {...sets[ex.id], reps: e.target.value}})}
                  placeholder="10"
                  className="bg-transparent text-white w-full outline-none text-sm placeholder-gray-600"/>
              </div>
              <button onClick={()=> handleAddSet(ex.id, sets[ex.id]?.weight, sets[ex.id]?.reps)}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg px-3 transition cursor-pointer tracking-widest">
                + SET
              </button>
            </div>
          </div>
          ))}
        </div>
        )}

      {/* Save button */}
      <button onClick={handleSaveWorkout}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl p-4 tracking-widest transition cursor-pointer mt-6">
        SAVE WORKOUT
      </button>

    </div>
  </div>
  )
}

export default NewWorkout