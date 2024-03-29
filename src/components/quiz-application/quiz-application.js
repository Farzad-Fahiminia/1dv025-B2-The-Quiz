/**
 * The game script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import '../nickname-form/'
import '../quiz-question'
import '../countdown-timer'
import '../high-score'

/**
 * The Game class.
 *
 * @class Game
 */
export class Game {
  /**
   * Starts the quiz game.
   *
   * @memberof Game
   */
  startGame () {
    const div = document.querySelector('#messageContainer')
    const form = document.createElement('nickname-form')
    div.appendChild(form)
  }
}
