import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Activity, Dumbbell } from 'lucide-react';
import './App.css';

function App() {
  // Workout data
  const circuits = [
    { name: "Goblet Squats", description: "Hold weight at chest height, squat down, keeping chest up" },
    { name: "Weighted Russian Twists", description: "Seated, feet elevated, rotate weight from side to side" },
    { name: "Kettlebell Swings", description: "Using the handle, swing weight from between legs to chest height" },
    { name: "Weighted Lunges", description: "Hold weight at chest, alternate lunges" },
    { name: "Renegade Rows", description: "In plank position with hands on weight handles, row one arm at a time" },
    { name: "Weighted Push-Ups", description: "Place weight on your back or do push-ups with hands on the weight" },
    { name: "Weighted Mountain Climbers", description: "Hands on weight, alternate bringing knees to chest" },
    { name: "Deadlifts", description: "Using weight plate grips, perform deadlifts" }
  ];

  const warmups = [
    "Arm circles (30s)",
    "Bodyweight squats (30s)",
    "High knees in place (30s)",
    "Hip rotations (30s)",
    "Jumping jacks (30s)",
    "Repeat once"
  ];

  const cooldowns = [
    "Standing hamstring stretch (30s each leg)",
    "Quad stretch (30s each leg)",
    "Chest stretch (30s)",
    "Shoulder stretch (30s each arm)",
    "Child's pose (1 min)"
  ];

  const cardioOptions = [
    "Weighted high knees: 20s work, 10s rest × 10",
    "Weighted jumping jacks: 20s work, 10s rest × 10"
  ];

  // App state
  const [workoutPhase, setWorkoutPhase] = useState("start"); // start, warmup, circuit, cardio, cooldown, complete
  const [currentCircuit, setCurrentCircuit] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [seconds, setSeconds] = useState(45); // Exercise time in seconds
  const [isActive, setIsActive] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState(0);
  const [selectedCardio, setSelectedCardio] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => {
          if (seconds <= 1) {
            // Time's up logic
            if (workoutPhase === "circuit") {
              if (isRest) {
                // End of rest period
                setIsRest(false);
                if (currentExercise >= circuits.length - 1) {
                  // End of circuit
                  if (currentCircuit >= 3) {
                    // End of all circuits
                    setWorkoutPhase("cardio");
                    setIsActive(false);
                    return 0;
                  } else {
                    // Next circuit
                    setCurrentCircuit(currentCircuit + 1);
                    setCurrentExercise(0);
                    setIsRest(false);
                    setSeconds(45);
                    setIsActive(false);
                    return 45;
                  }
                } else {
                  // Next exercise
                  setCurrentExercise(currentExercise + 1);
                  setSeconds(45);
                  return 45;
                }
              } else {
                // End of exercise, start rest
                setIsRest(true);
                setSeconds(15);
                return 15;
              }
            } else if (workoutPhase === "warmup") {
              setWorkoutPhase("circuit");
              setSeconds(45);
              setIsActive(false);
              return 45;
            } else if (workoutPhase === "cardio") {
              setWorkoutPhase("cooldown");
              setSeconds(300); // 5 minutes for cooldown
              setIsActive(false);
              return 300;
            } else if (workoutPhase === "cooldown") {
              setWorkoutPhase("complete");
              setCompletedWorkouts(completedWorkouts + 1);
              setIsActive(false);
              return 0;
            }
          }
          return seconds - 1;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isRest, currentExercise, currentCircuit, workoutPhase, completedWorkouts]);

  // Timer display format
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Start workout 
  const startWorkout = () => {
    setWorkoutPhase("warmup");
    setSeconds(300); // 5 minutes for warmup
    setIsActive(true);
    setCurrentCircuit(1);
    setCurrentExercise(0);
    setIsRest(false);
  };

  // Reset workout
  const resetWorkout = () => {
    setIsActive(false);
    setWorkoutPhase("start");
    setSeconds(45);
    setCurrentCircuit(1);
    setCurrentExercise(0);
    setIsRest(false);
  };

  // Toggle pause/play
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Manual next
  const nextStep = () => {
    if (workoutPhase === "warmup") {
      setWorkoutPhase("circuit");
      setSeconds(45);
      setIsActive(false);
    } else if (workoutPhase === "circuit") {
      if (isRest) {
        setIsRest(false);
        if (currentExercise >= circuits.length - 1) {
          if (currentCircuit >= 3) {
            setWorkoutPhase("cardio");
          } else {
            setCurrentCircuit(currentCircuit + 1);
            setCurrentExercise(0);
          }
        } else {
          setCurrentExercise(currentExercise + 1);
        }
        setSeconds(45);
      } else {
        setIsRest(true);
        setSeconds(15);
      }
    } else if (workoutPhase === "cardio") {
      setWorkoutPhase("cooldown");
      setSeconds(300);
      setIsActive(false);
    } else if (workoutPhase === "cooldown") {
      setWorkoutPhase("complete");
      setCompletedWorkouts(completedWorkouts + 1);
      setIsActive(false);
    }
  };

  // Renders different content based on the workout phase
  const renderContent = () => {
    switch (workoutPhase) {
      case "start":
        return (
          <div className="card">
            <h2 className="title">10kg Weight Workout</h2>
            <p className="description">This 45-minute workout uses your 10kg multi-functional weight to build strength, improve cardio, and help with weight loss.</p>
            
            <div className="section">
              <h3 className="subtitle"><Clock className="icon" /> Workout Structure:</h3>
              <ul className="list">
                <li>Warm-Up: 5 minutes</li>
                <li>Circuit Training: 30 minutes (3 rounds)</li>
                <li>Cardio Burst: 5 minutes</li>
                <li>Cool Down: 5 minutes</li>
              </ul>
            </div>
            
            <div className="section">
              <h3 className="subtitle"><Activity className="icon" /> Cardio Options:</h3>
              <div className="radio-group">
                {cardioOptions.map((option, index) => (
                  <div key={index} className="radio-item">
                    <input
                      type="radio"
                      id={`cardio-${index}`}
                      name="cardio"
                      className="radio"
                      checked={selectedCardio === index}
                      onChange={() => setSelectedCardio(index)}
                    />
                    <label htmlFor={`cardio-${index}`} className="radio-label">{option}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="section">
              <h3 className="subtitle"><Dumbbell className="icon" /> Workout Stats:</h3>
              <p className="stats">Completed workouts: {completedWorkouts}</p>
            </div>
            
            <button
              onClick={startWorkout}
              className="button primary"
            >
              <Play className="icon" /> Start Workout
            </button>
          </div>
        );
        
      case "warmup":
        return (
          <div className="card">
            <h2 className="title">Warm-Up</h2>
            <p className="description">Complete all exercises for 30 seconds each, then repeat once.</p>
            
            <div className="exercise-list">
              {warmups.map((exercise, index) => (
                <div key={index} className="exercise-item">{exercise}</div>
              ))}
            </div>
            
            <div className="timer">
              <div className="timer-display">{formatTime(seconds)}</div>
              <p className="timer-label">Time Remaining</p>
            </div>
            
            <div className="button-group">
              <button
                onClick={toggleTimer}
                className={`button ${isActive ? "warning" : "success"}`}
              >
                {isActive ? <><Pause className="icon" /> Pause</> : <><Play className="icon" /> Resume</>}
              </button>
              <button
                onClick={nextStep}
                className="button primary"
              >
                Next
              </button>
            </div>
          </div>
        );
        
      case "circuit":
        return (
          <div className="card">
            <div className="badge">
              Circuit {currentCircuit}/3
            </div>
            
            <h2 className="title">
              {isRest ? "Rest" : circuits[currentExercise].name}
            </h2>
            
            {!isRest && (
              <p className="description">{circuits[currentExercise].description}</p>
            )}
            
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(currentExercise / circuits.length) * 100}%` }}
                ></div>
              </div>
              <div className="progress-labels">
                <span>1</span>
                <span>{circuits.length}</span>
              </div>
            </div>
            
            <div className="timer">
              <div className={`timer-display ${isRest ? "rest" : "active"}`}>
                {formatTime(seconds)}
              </div>
              <p className="timer-label">{isRest ? "Rest Time" : "Exercise Time"}</p>
            </div>
            
            <div className="exercise-progress">
              {circuits.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${
                    index < currentExercise
                      ? "completed"
                      : index === currentExercise
                      ? isRest
                        ? "resting"
                        : "current"
                      : "upcoming"
                  }`}
                ></div>
              ))}
            </div>
            
            <div className="button-group">
              <button
                onClick={toggleTimer}
                className={`button ${isActive ? "warning" : "success"}`}
              >
                {isActive ? <><Pause className="icon" /> Pause</> : <><Play className="icon" /> Resume</>}
              </button>
              <button
                onClick={nextStep}
                className="button primary"
              >
                Skip
              </button>
            </div>
          </div>
        );
        
      case "cardio":
        return (
          <div className="card">
            <h2 className="title">Cardio Burst</h2>
            <p className="description">{cardioOptions[selectedCardio]}</p>
            
            <div className="timer">
              <div className="timer-display cardio">5:00</div>
              <p className="timer-label">Complete 10 rounds of 20s work / 10s rest</p>
            </div>
            
            <div className="button-group">
              <button
                onClick={toggleTimer}
                className="button success"
              >
                <Play className="icon" /> Start
              </button>
              <button
                onClick={nextStep}
                className="button primary"
              >
                Next
              </button>
            </div>
          </div>
        );
        
      case "cooldown":
        return (
          <div className="card">
            <h2 className="title">Cool Down</h2>
            <p className="description">Hold each stretch for the recommended time.</p>
            
            <div className="exercise-list">
              {cooldowns.map((stretch, index) => (
                <div key={index} className="exercise-item">{stretch}</div>
              ))}
            </div>
            
            <div className="timer">
              <div className="timer-display cooldown">{formatTime(seconds)}</div>
              <p className="timer-label">Time Remaining</p>
            </div>
            
            <div className="button-group">
              <button
                onClick={toggleTimer}
                className={`button ${isActive ? "warning" : "success"}`}
              >
                {isActive ? <><Pause className="icon" /> Pause</> : <><Play className="icon" /> Resume</>}
              </button>
              <button
                onClick={nextStep}
                className="button primary"
              >
                Finish
              </button>
            </div>
          </div>
        );
        
      case "complete":
        return (
          <div className="card">
            <div className="completion-badge">
              <svg xmlns="http://www.w3.org/2000/svg" className="checkmark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="title">Workout Complete!</h2>
            <p className="description">Great job! You've completed your 10kg weight workout.</p>
            
            <div className="summary">
              <h3 className="subtitle">Summary:</h3>
              <ul className="summary-list">
                <li>• 5 min warm-up</li>
                <li>• 30 min circuit training (3 rounds)</li>
                <li>• 5 min cardio: {cardioOptions[selectedCardio].split(':')[0]}</li>
                <li>• 5 min cool-down</li>
                <li>• Total workouts completed: {completedWorkouts}</li>
              </ul>
            </div>
            
            <button
              onClick={resetWorkout}
              className="button primary"
            >
              <RotateCcw className="icon" /> Start New Workout
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="workout-app">
      {renderContent()}
    </div>
  );
}

export default App;
