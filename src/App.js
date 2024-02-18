import React from 'react'
import './App.css';
import Die from './component/Die';
import {nanoid} from "nanoid"

function App(){

  const [dice, setDice] = React.useState(allNewDice())
    
  /**
   * Challenge:
   * 1. Add new state called `tenzies`, default to false. It
   *    represents whether the user has won the game yet or not.
   * 2. Add an effect that runs every time the `dice` state array 
   *    changes. For now, just console.log("Dice state changed").
   */
  
  const [tenzies,setTenzies]=React.useState(false)
  
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
  }, [dice])
  
  
     function generateNewDie() {
          return {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid()
          }
      }
      
      function allNewDice() {
          const newDice = []
          for (let i = 0; i < 10; i++) {
              newDice.push(generateNewDie())
          }
          return newDice
      }
      
      
      function rollDice() {
          setDice(oldDice => oldDice.map(die => {
              return die.isHeld ? 
                  die :
                  generateNewDie()
          }))
      }
      
      function holdDice(id) {
          setDice(oldDice => oldDice.map(die => {
              return die.id === id ? 
                  {...die, isHeld: !die.isHeld} :
                  die
          }))
      }
      
      const diceElements = dice.map(die => (
          <Die 
              key={die.id} 
              value={die.value} 
              isHeld={die.isHeld} 
              holdDice={() => holdDice(die.id)}
          />
      ))
      
      return (
          <main>
              <h1 className="title">Tenzies</h1>
              <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
              <div className="dice-container">
                  {diceElements}
              </div>
              <button className="roll-dice" onClick={rollDice}>Roll</button>
          </main>
      )
}

 
export default App;
