import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewWorkout from './pages/workout/NewWorkout'
import WorkoutHistory from './pages/workout/WorkoutHistory'
import ExerciseLibrary from './pages/exercise/ExerciseLibrary'
import PR from './pages/PR'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/newworkout" element={<NewWorkout />}/>
      <Route path="/workouthistory" element={<WorkoutHistory />}/>
      <Route path="/exercise" element={<ExerciseLibrary />}/>
      <Route path="/pr" element={<PR />}/>
    </Routes>
  )
}

export default App