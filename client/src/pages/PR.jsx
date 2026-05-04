import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

function PR() {
  const [prs, setPrs] = useState([])
  const [exerciseId, setExerciseId] = useState("")
  const [weight, setWeight] = useState("")
  const [date, setDate] = useState("")
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
}

export default PR