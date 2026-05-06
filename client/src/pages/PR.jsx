import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function PR() {
  const [prs, setPrs] = useState([])
  const [exerciseId, setExerciseId] = useState("")
  const [weight, setWeight] = useState("")
  const [date, setDate] = useState("")
  const [exercises, setExercises] = useState([])
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
}

export default PR