const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../db.js')
const verifyToken = require('../middleware/verifyToken.js')
const router = express.Router()

router.get("/library", verifyToken, (req, res)=>{
  let sql = "SELECT * FROM exercise_library"
  db.query(sql, (err, results)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})

router.post("/library", verifyToken, (req, res)=>{
  const data = req.body
  let sql = "INSERT INTO exercise_library(name, body_part) VALUES(?, ?)"
  db.query(sql, [data.name, data.body_part], (err, results)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})

router.post("/", verifyToken, (req, res)=>{
  const data = req.body
  let sql = "INSERT INTO workout_exercise(workout_id, exercise_library_id) VALUES(?, ?)"
  db.query(sql, [data.workout_id, data.exercise_library_id], (err, results)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})

router.post("/:id/set", verifyToken, (req, res)=>{
  const workoutExerciseID = req.params.id
  const data = req.body
  let sql = "INSERT INTO workout_set(workout_exercise_id, repetitions, weight) VALUES(?, ?, ?)"
  db.query(sql, [workoutExerciseID, data.repetitions, data.weight], (err, results)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})

module.exports = router