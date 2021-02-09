/**
 * The main script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

// import './components/quiz-application'
import { Game } from './components/quiz-application/quiz-application.js'

const messageContainer = document.querySelector('#messageContainer')
const message = document.createTextNode('"The best quiz game you ever played."')
messageContainer.appendChild(message)

const game = new Game()
game.startGame()

// TODO: This is just some temple code that you are free to use, modify or completly delete. Add your code here instead.
