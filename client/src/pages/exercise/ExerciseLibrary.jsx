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
}

export default ExerciseLibrary