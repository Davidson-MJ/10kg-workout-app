import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Activity, Dumbbell, Info } from 'lucide-react';
import './App.css';

function App() {
  // Workout data with animations
  const circuits = [
    { 
      name: "Goblet Squats", 
      description: "Hold weight at chest height, squat down, keeping chest up",
      animation: (
        <svg viewBox="0 0 200 200" className="exercise-animation">
          {/* Figure - standing */}
          <g className="animation-keyframe">
            <circle cx="100" cy="50" r="20" className="figure-head" />
            <line x1="100" y1="70" x2="100" y2="120" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="120" x2="80" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="120" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="80" x2="70" y2="100" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="80" x2="130" y2="100" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="95" r="12" className="weight" />
          </g>
          
          {/* Figure - mid squat */}
          <g className="animation-keyframe">
            <circle cx="100" cy="70" r="20" className="figure-head" />
            <line x1="100" y1="90" x2="100" y2="120" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="120" x2="70" y2="150" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="130" y2="150" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="100" x2="70" y2="110" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="100" x2="130" y2="110" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="105" r="12" className="weight" />
          </g>
          
          {/* Figure - full squat */}
          <g className="animation-keyframe">
            <circle cx="100" cy="90" r="20" className="figure-head" />
            <line x1="100" y1="110" x2="100" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="130" x2="60" y2="130" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="130" x2="140" y2="130" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="70" y2="120" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="120" x2="130" y2="120" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="115" r="12" className="weight" />
          </g>
        </svg>
      )
    },
    { 
      name: "Weighted Russian Twists", 
      description: "Seated, feet elevated, rotate weight from side to side",
      animation: (
        <svg viewBox="0 0 200 200" className="exercise-animation">
          {/* Figure - center */}
          <g className="animation-keyframe">
            <circle cx="100" cy="80" r="20" className="figure-head" />
            <line x1="100" y1="100" x2="100" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="130" x2="80" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="130" x2="120" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="110" x2="100" y2="140" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="140" r="12" className="weight" />
          </g>
          
          {/* Figure - twisted left */}
          <g className="animation-keyframe">
            <circle cx="90" cy="80" r="20" className="figure-head" />
            <line x1="90" y1="100" x2="100" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="130" x2="80" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="130" x2="120" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="90" y1="110" x2="50" y2="140" className="figure-arm" strokeWidth="4" />
            <circle cx="50" cy="140" r="12" className="weight" />
          </g>
          
          {/* Figure - twisted right */}
          <g className="animation-keyframe">
            <circle cx="110" cy="80" r="20" className="figure-head" />
            <line x1="110" y1="100" x2="100" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="130" x2="80" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="130" x2="120" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="110" y1="110" x2="150" y2="140" className="figure-arm" strokeWidth="4" />
            <circle cx="150" cy="140" r="12" className="weight" />
          </g>
        </svg>
      ) 
    },
    { 
      name: "Kettlebell Swings", 
      description: "Using the handle, swing weight from between legs to chest height",
      animation: (
        <svg viewBox="0 0 200 200" className="exercise-animation">
          {/* Figure - start position */}
          <g className="animation-keyframe">
            <circle cx="100" cy="80" r="20" className="figure-head" />
            <line x1="100" y1="100" x2="100" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="130" x2="80" y2="150" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="130" x2="120" y2="150" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="115" x2="90" y2="145" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="115" x2="110" y2="145" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="155" r="12" className="weight" />
          </g>
          
          {/* Figure - middle swing */}
          <g className="animation-keyframe">
            <circle cx="100" cy="70" r="20" className="figure-head" />
            <line x1="100" y1="90" x2="100" y2="120" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="120" x2="80" y2="160" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="120" y2="160" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="100" x2="90" y2="120" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="100" x2="110" y2="120" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="130" r="12" className="weight" />
          </g>
          
          {/* Figure - full swing */}
          <g className="animation-keyframe">
            <circle cx="100" cy="60" r="20" className="figure-head" />
            <line x1="100" y1="80" x2="100" y2="120" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="120" x2="80" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="120" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="90" x2="90" y2="70" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="90" x2="110" y2="70" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="60" r="12" className="weight" />
          </g>
        </svg>
      )
    },
    { 
      name: "Weighted Lunges", 
      description: "Hold weight at chest, alternate lunges",
      animation: (
        <svg viewBox="0 0 200 200" className="exercise-animation">
          {/* Figure - standing */}
          <g className="animation-keyframe">
            <circle cx="100" cy="50" r="20" className="figure-head" />
            <line x1="100" y1="70" x2="100" y2="120" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="120" x2="90" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="110" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="85" x2="80" y2="100" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="85" x2="120" y2="100" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="100" r="12" className="weight" />
          </g>
          
          {/* Figure - lunge position */}
          <g className="animation-keyframe">
            <circle cx="100" cy="70" r="20" className="figure-head" />
            <line x1="100" y1="90" x2="100" y2="120" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="120" x2="70" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="130" y2="130" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="100" x2="80" y2="110" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="100" x2="120" y2="110" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="110" r="12" className="weight" />
          </g>
          
          {/* Figure - alternate lunge */}
          <g className="animation-keyframe">
            <circle cx="100" cy="70" r="20" className="figure-head" />
            <line x1="100" y1="90" x2="100" y2="120" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="120" x2="130" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="70" y2="130" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="100" x2="80" y2="110" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="100" x2="120" y2="110" className="figure-arm" strokeWidth="4" />
            <circle cx="100" cy="110" r="12" className="weight" />
          </g>
        </svg>
      )
    },
    { 
      name: "Renegade Rows", 
      description: "In plank position with hands on weight handles, row one arm at a time",
      animation: (
        <svg viewBox="0 0 200 200" className="exercise-animation">
          {/* Figure - plank position */}
          <g className="animation-keyframe">
            <circle cx="50" cy="120" r="15" className="figure-head" />
            <line x1="50" y1="135" x2="100" y2="135" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="135" x2="160" y2="135" className="figure-leg" strokeWidth="4" />
            <line x1="50" y1="135" x2="50" y2="160" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="135" x2="100" y2="160" className="figure-arm" strokeWidth="4" />
            <circle cx="50" cy="160" r="10" className="weight" />
            <circle cx="100" cy="160" r="10" className="weight" />
          </g>
          
          {/* Figure - left row */}
          <g className="animation-keyframe">
            <circle cx="50" cy="120" r="15" className="figure-head" />
            <line x1="50" y1="135" x2="100" y2="135" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="135" x2="160" y2="135" className="figure-leg" strokeWidth="4" />
            <line x1="50" y1="135" x2="50" y2="135" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="135" x2="100" y2="160" className="figure-arm" strokeWidth="4" />
            <circle cx="50" cy="135" r="10" className="weight" />
            <circle cx="100" cy="160" r="10" className="weight" />
          </g>
          
          {/* Figure - right row */}
          <g className="animation-keyframe">
            <circle cx="50" cy="120" r="15" className="figure-head" />
            <line x1="50" y1="135" x2="100" y2="135" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="135" x2="160" y2="135" className="figure-leg" strokeWidth="4" />
            <line x1="50" y1="135" x2="50" y2="160" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="135" x2="100" y2="135" className="figure-arm" strokeWidth="4" />
            <circle cx="50" cy="160" r="10" className="weight" />
            <circle cx="100" cy="135" r="10" className="weight" />
          </g>
        </svg>
      )
    },
    { 
      name: "Weighted Push-Ups", 
      description: "Place weight on your back or do push-ups with hands on the weight",
      animation: (
        <svg viewBox="0 0 200 200" className="exercise-animation">
          {/* Figure - high plank */}
          <g className="animation-keyframe">
            <circle cx="50" cy="100" r="15" className="figure-head" />
            <line x1="50" y1="115" x2="120" y2="115" className="figure-body" strokeWidth="4" />
            <line x1="120" y1="115" x2="160" y2="115" className="figure-leg" strokeWidth="4" />
            <line x1="50" y1="115" x2="50" y2="150" className="figure-arm" strokeWidth="4" />
            <line x1="120" y1="115" x2="120" y2="150" className="figure-arm" strokeWidth="4" />
            <circle cx="85" cy="105" r="10" className="weight" />
          </g>
          
          {/* Figure - mid push-up */}
          <g className="animation-keyframe">
            <circle cx="55" cy="120" r="15" className="figure-head" />
            <line x1="55" y1="135" x2="120" y2="125" className="figure-body" strokeWidth="4" />
            <line x1="120" y1="125" x2="160" y2="125" className="figure-leg" strokeWidth="4" />
            <line x1="55" y1="135" x2="55" y2="150" className="figure-arm" strokeWidth="4" />
            <line x1="120" y1="125" x2="120" y2="150" className="figure-arm" strokeWidth="4" />
            <circle cx="85" cy="115" r="10" className="weight" />
          </g>
          
          {/* Figure - low push-up */}
          <g className="animation-keyframe">
            <circle cx="60" cy="140" r="15" className="figure-head" />
            <line x1="60" y1="155" x2="120" y2="135" className="figure-body" strokeWidth="4" />
            <line x1="120" y1="135" x2="160" y2="135" className="figure-leg" strokeWidth="4" />
            <line x1="60" y1="155" x2="60" y2="150" className="figure-arm" strokeWidth="4" />
            <line x1="120" y1="135" x2="120" y2="150" className="figure-arm" strokeWidth="4" />
            <circle cx="85" cy="125" r="10" className="weight" />
          </g>
        </svg>
      )
    },
    { 
      name: "Weighted Mountain Climbers", 
      description: "Hands on weight, alternate bringing knees to chest",
      animation: (
        <svg viewBox="0 0 200 200" className="exercise-animation">
          {/* Figure - start position */}
          <g className="animation-keyframe">
            <circle cx="60" cy="100" r="15" className="figure-head" />
            <line x1="60" y1="115" x2="120" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="120" y1="130" x2="160" y2="150" className="figure-leg" strokeWidth="4" />
            <line x1="120" y1="130" x2="140" y2="100" className="figure-leg" strokeWidth="4" />
            <line x1="60" y1="115" x2="60" y2="150" className="figure-arm" strokeWidth="4" />
            <circle cx="60" cy="150" r="10" className="weight" />
          </g>
          
          {/* Figure - left knee up */}
          <g className="animation-keyframe">
            <circle cx="60" cy="100" r="15" className="figure-head" />
            <line x1="60" y1="115" x2="120" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="120" y1="130" x2="160" y2="150" className="figure-leg" strokeWidth="4" />
            <line x1="120" y1="130" x2="90" y2="115" className="figure-leg" strokeWidth="4" />
            <line x1="60" y1="115" x2="60" y2="150" className="figure-arm" strokeWidth="4" />
            <circle cx="60" cy="150" r="10" className="weight" />
          </g>
          
          {/* Figure - right knee up */}
          <g className="animation-keyframe">
            <circle cx="60" cy="100" r="15" className="figure-head" />
            <line x1="60" y1="115" x2="120" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="120" y1="130" x2="90" y2="115" className="figure-leg" strokeWidth="4" />
            <line x1="120" y1="130" x2="140" y2="100" className="figure-leg" strokeWidth="4" />
            <line x1="60" y1="115" x2="60" y2="150" className="figure-arm" strokeWidth="4" />
            <circle cx="60" cy="150" r="10" className="weight" />
          </g>
        </svg>
      )
    },
    { 
      name: "Deadlifts", 
      description: "Using weight plate grips, perform deadlifts",
      animation: (
        <svg viewBox="0 0 200 200" className="exercise-animation">
          {/* Figure - standing */}
          <g className="animation-keyframe">
            <circle cx="100" cy="50" r="20" className="figure-head" />
            <line x1="100" y1="70" x2="100" y2="120" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="120" x2="80" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="120" x2="120" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="85" x2="80" y2="115" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="85" x2="120" y2="115" className="figure-arm" strokeWidth="4" />
            <rect x="70" y="115" width="60" height="10" rx="5" className="weight" />
          </g>
          
          {/* Figure - mid bend */}
          <g className="animation-keyframe">
            <circle cx="100" cy="80" r="20" className="figure-head" />
            <line x1="100" y1="100" x2="100" y2="130" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="130" x2="80" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="130" x2="120" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="115" x2="80" y2="140" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="115" x2="120" y2="140" className="figure-arm" strokeWidth="4" />
            <rect x="70" y="140" width="60" height="10" rx="5" className="weight" />
          </g>
          
          {/* Figure - full bend */}
          <g className="animation-keyframe">
            <circle cx="100" cy="110" r="20" className="figure-head" />
            <line x1="100" y1="130" x2="100" y2="140" className="figure-body" strokeWidth="4" />
            <line x1="100" y1="140" x2="80" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="140" x2="120" y2="170" className="figure-leg" strokeWidth="4" />
            <line x1="100" y1="135" x2="80" y2="160" className="figure-arm" strokeWidth="4" />
            <line x1="100" y1="135" x2="120" y2="160" className="figure-arm" strokeWidth="4" />
            <rect x="70" y="160" width="60" height="10" rx="5" className="weight" />
          </g>
        </svg>
      )
    }
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
  const [showAnimation, setShowAnimation] = useState(false);
  // Sound functions
  const playCountdownSound = () => {
    const audio = new Audio('https://assets.coderrocketfuel.com/pomodoro-times-up.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.error("Audio play failed:", err));
  };

  const playCompletionSound = () => {
    const audio = new Audio('https://assets.coderrocketfuel.com/pomodoro-start.mp3');
    audio.volume = 0.7;
    audio.play().catch(err => console.error("Audio play failed:", err));
  };
  // Load saved workout count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('completedWorkouts');
    if (savedCount) {
      setCompletedWorkouts(parseInt(savedCount, 10));
    }
  }, []);

  // Save workout count to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('completedWorkouts', completedWorkouts.toString());
  }, [completedWorkouts]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => {
         
          // Play countdown sound when 10 seconds remaining
          if (seconds === 15) {
            playCountdownSound();
          }
          // Play completion sound when exercise/rest ends
          if (seconds ==1) {
            playCompletionSound();
          }
          
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

  // Toggle animation
  const toggleAnimation = () => {
    setShowAnimation(!showAnimation);
  };

  // Renders different content based on the workout phase
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

            <div className="section feature-highlight">
              <h3 className="subtitle">New! Exercise Animations</h3>
              <p className="description">Visual guides for all exercises are now included!</p>
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
              <>
                <p className="description">{circuits[currentExercise].description}</p>
                
                <div className="animation-container">
                  {circuits[currentExercise].animation}
                  <button 
                    className="animation-toggle" 
                    onClick={toggleAnimation} 
                    title={showAnimation ? "Pause animation" : "Play animation"}
                  >
                    {showAnimation ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              </>
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