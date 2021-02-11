/**
 * The high score script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

 /**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .high-score {
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
      margin-top: -5px;
      font-size: 2.2em;
      color: #ff5e5a;
    }
    #top5 {
      margin-top: -20px;
    }
    input[type="button"],
    input[type="reset"],
    input[type="submit"] {
      margin-top: 10px;
      cursor: pointer;
      background-image: linear-gradient(-45deg, #ff5e5a, #ff405a);
      padding: 20px 20px;
      border: none;
      font-size: 1em;
      font-weight: 700;
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
  <div class="high-score">
   <p>G A M E /// O V E R !</p>
   <h2>High Score</h2>
   <p id="top5">Are you on the top 5 list?</p>
   <p>--------------------------</p>
   <slot></slot>
   <form>
      <input part="part-style" type="submit" value="Play again!">
    </form>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('high-score',
  class HighScore extends HTMLElement {
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
      this._formElement = this.shadowRoot.querySelector('form')

      // Bind event handlers of child elements.
      this._onSubmit = this._onSubmit.bind(this)

      this.highScore
    }

     /**
     * Handles click events for submit button.
     *
     * @param {*} event - Listens to event.
     */
    _onSubmit (event) {
      event.preventDefault()

      // Clear node before calling next component
      const form = document.createElement('nickname-form')
      const container = document.querySelector('#messageContainer')

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(form)
    }

    /**
     * Retrieves players in High Score.
     *
     */
    getPlayers () {
      const elem = document.querySelector('high-score')
      
      if (localStorage.getItem('quiz_highscore') === null) {
        const p = document.createElement('p')
        p.innerText = 'no scores'
        elem.appendChild(p)
      } else {
        // High score
        this.highScore = localStorage.getItem('quiz_highscore')
        this.highScore = JSON.parse(this.highScore)
        this.highScore.sort((a, b) => (a.score > b.score) ? 1 : -1)

        //Remove players with 0 score
        for (let i = 0; i < this.highScore.length; i++) {
          if (this.highScore[i].score === 0) { 
            this.highScore.splice(i, 1)
            i--
          }
        }

        if (this.highScore.length < 5) {
          for (let i = 0; i < this.highScore.length; i++) {
            let playerScore = `${this.highScore[i]["nickname"]}: ${this.highScore[i]["score"]} sec`
            const p = document.createElement('p')
            p.innerText = playerScore
            elem.appendChild(p)
          }
        } else {
          for (let i = 0; i < 5; i++) {
            let playerScore = `${this.highScore[i]["nickname"]}: ${this.highScore[i]["score"]} sec`
            const p = document.createElement('p')
            p.innerText = playerScore
            elem.appendChild(p)
          }
        }
      }
    }

    /**
    * Called after the element is inserted into the DOM.
    */
    connectedCallback () {
      this._formElement.addEventListener('submit', this._onSubmit)
      this.getPlayers()
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
    }
  }
)
