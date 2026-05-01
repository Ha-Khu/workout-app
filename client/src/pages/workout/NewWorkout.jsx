import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function NewWorkout(){
  const [date, setDate] = useState("")
  const [exercise, setExercise] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
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
    setSelectedExercises([... selectedExercises, exercise])
  }

  return(
    
  )
}

export default NewWorkout