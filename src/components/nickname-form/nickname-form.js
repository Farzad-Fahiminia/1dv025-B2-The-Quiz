/**
 * The nickname script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

//  import { HighScore } from '../high-score.js'
import '../high-score'

 /**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .nickname-form {
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3);
      padding: 20px 40px 50px 40px;
      border-radius: 4px;
      max-width: 350px;
      font-size: 1em;
      text-align: center;
      background-color: #222;
      color: #fff;
    }
    h2 {
      font-size: 2.2em;
      font-style: italic;
    }
    input[type="text"] {
      border: solid transparent 2px;
      margin-top: 20px;
      margin-bottom: 10px;
      padding: 13px;
      font-size: 1.2em;
      font-weight: 700;
      text-align: center;
      border-radius: 4px;
      width: 195px
    }
    input[type="text"]:focus {
      border: solid #ff5e5a 2px;
    }
    input[type="text"]::placeholder {
      text-align: center;
    }
    input[type="text"]:focus::placeholder {
      color: transparent;
    }
    input[type="button"],
    input[type="reset"],
    input[type="submit"] {
      cursor: pointer;
      background-image: linear-gradient(-45deg, #ff5e5a, #ff405a);
      padding: 20px 20px;
      border: none;
      border-radius: 4px;
      font-size: 1em;
      font-weight: 700;
      font-style: italic;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fff;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      width: 224px
    }
    input[type="button"]:hover, input[type="button"]:focus,
    input[type="reset"]:hover, input[type="reset"]:focus,
    input[type="submit"]:hover, input[type="submit"]:hover {
      box-shadow: 0px 20px 50px rgba(255, 74, 89, 0.3);
    }
  </style>
  <div class="nickname-form">
   <h2>Let's play!</h2>
   <p>Compete in the quiz game by answering questions correctly in the shortest amount of time.</p>
    <form action="#">
      <input type="text" id="nickname" name="nickname" value="" placeholder="Enter a nickname" required><br>
      <input type="submit" value="Start game">
    </form>
  </div>
`
console.log(localStorage)

/**
 * Define custom element.
 */
customElements.define('nickname-form',
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the input, datalist and article elements in the shadow root.
      this._inputNickname = this.shadowRoot.querySelector('#nickname')
      this._formElement = this.shadowRoot.querySelector('form')

      // Bind event handlers of child elements.
      this._onSubmit = this._onSubmit.bind(this)

      this.arrayOfPlayers = []

      this.person = {
        nickname: '',
        score: 0
      }
      // this.playerScore = new HighScore()
    }

    /**
     * Handles input event.
     *
     * @param {InputEvent|Event} event - The input event.
     */
    async _onInput (event) {
      if (!(event instanceof InputEvent)) {
        // Close the datalist.
        this._inputSearchElement.blur()
        this._inputSearchElement.focus()
      }
    }

    _onSubmit (event) {
      // Do not submit the form!
      event.preventDefault()

      // localStorage.setItem('quiz_higscore', JSON.stringify({nickname: this._inputNickname.value, score: 0}))

      // console.log('localStorage:',localStorage)

      // this.arrayOfPlayers.push({nickname: this._inputNickname.value, score: 0})
      // console.log(this.arrayOfPlayers)
      
      const player = Object.create(this.person)
      player.nickname = this._inputNickname.value
      player.score = null

      window.localStorage.setItem('quiz_highscore', JSON.stringify(player))

      console.log(player)
      
      this.arrayOfPlayers.push(player)
      console.log('Array of players:', this.arrayOfPlayers)
      
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this._inputNickname.addEventListener('input', this._onInput)
      this._formElement.addEventListener('submit', this._onSubmit)
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this._inputNickname.removeEventListener('input', this._onInput)
      this._formElement.removeEventListener('submit', this._onSubmit)
    }
  }
)
