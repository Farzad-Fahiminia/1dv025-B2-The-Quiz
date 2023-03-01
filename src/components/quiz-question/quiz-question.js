/**
 * The quiz question script file of the application.
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
    .quiz-question {
      margin: auto;
      margin-top: -60px;
      margin-bottom: 20px;
      box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3);
      padding: 20px 40px 50px 40px;
      max-width: 550px;
      font-size: 1em;
      text-align: center;
      background-color: #222;
      color: #fff;
    }
    input[type="text"] {
      border: solid transparent 2px;
      margin-top: 20px;
      margin-bottom: 10px;
      padding: 13px;
      font-size: 1em;
      font-weight: 700;
      text-align: center;
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
      background-image: linear-gradient(-45deg, #5885ea, #1b3e8c);
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
      box-shadow: 0px 20px 50px rgba(80, 123, 221, 0.3);
    }
    .message-board {
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 2.2em;
      font-weight: 700;
      text-transform: none !important;
    }
  </style>
  <div class="quiz-question">
    <div class="message-board"></div>
    <form action="#" id="quiz-form">
      <slot></slot>
      <input part="part-style" type="text" id="quiz-answer" name="quiz-answer" value="" placeholder="Write answer"><br>
      <input part="part-style" type="submit" value="Submit answer">
    </form>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('quiz-question',
  /**
   *
   */
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

      // Get the message board element in the shadow root.
      this._messageBoard = this.shadowRoot.querySelector('.message-board')

      // Get the input, datalist and article elements in the shadow root.
      this._inputAnswer = this.shadowRoot.querySelector('#quiz-answer')
      this._formElement = this.shadowRoot.querySelector('form')
      this.inputRadioBtn = ''
      this.radioAnswer = ''
      this.timeLimit = ''

      this.timer = 0
      this.startTime = {}
      this.endTime = {}

      // Bind event handlers of child elements.
      this._onSubmit = this._onSubmit.bind(this)

      this.question = { answer: '' }
      this._answerUrl = 'https://courselab.lnu.se/answer/'
      this._questionUrl = 'https://courselab.lnu.se/question/1'
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['message']
    }

    /**
     * Handles input event.
     *
     * @param {InputEvent|Event} event - The input event.
     */
    async _onInput (event) {
      if (!(event instanceof InputEvent)) {
        // Close the datalist.
        this._inputAnswer.blur()
        this._inputAnswer.focus()
      }
    }

    /**
     * Retrieves questions for the quiz.
     *
     * @param {string} _questionUrl - URL for questions.
     */
    async getQuestion (_questionUrl) {
      let data = await window.fetch(`${this._questionUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      data = await data.json()

      this.setAttribute('message', data.question)

      this._inputAnswer.style.display = 'inline'

      const form = document.querySelector('quiz-question')

      if (data.alternatives) {
        const elem = document.querySelector('quiz-question')
        form.innerHTML = ''
        this._inputAnswer.style.display = 'none'

        const radioButtonsLength = Object.keys(data.alternatives).length

        for (let i = 0; i < radioButtonsLength; i++) {
          const inputRadio = document.createElement('input')
          inputRadio.setAttribute('type', 'radio')
          inputRadio.setAttribute('name', 'alt')
          inputRadio.setAttribute('value', 'alt' + `${[i + 1]}`)

          const lableInput = document.createElement('lable')
          const textAlt = document.createTextNode(`${Object.values(data.alternatives)[i]}`)
          lableInput.appendChild(textAlt)
          const newLine = document.createElement('br')

          lableInput.appendChild(textAlt)
          elem.appendChild(inputRadio)
          elem.appendChild(lableInput)
          elem.appendChild(newLine)
        }
        this.radioAnswer = document.getElementsByName('alt')
      } else {
        form.innerHTML = ''
      }

      const counter = document.querySelector('countdown-timer')
      // Check timelimit on qurrent question
      if (data.limit) {
        this.timeLimit = data.limit
        counter.setAttribute('value', data.limit)
      } else {
        counter.setAttribute('value', '20')
      }

      this.id = data.id
    }

    /**
     * Handles click events for submit button.
     *
     * @param {*} event - Listens to event.
     */
    _onSubmit (event) {
      event.preventDefault()

      for (let i = 0; i < this.radioAnswer.length; i++) {
        if (this.radioAnswer[i].checked === true) {
          this._inputAnswer.value = ''
          this._inputAnswer.value = this.radioAnswer[i].value
        }
      }

      this.question.answer = this._inputAnswer.value
      this.postAnswer(this.id)
      this._inputAnswer.value = ''

      if (Number(this.id) === 326) {
        this.endTimer()

        // Clear node before calling next component
        const highscore = document.createElement('high-score')
        const container = document.querySelector('#messageContainer')

        while (container.firstChild) {
          container.removeChild(container.firstChild)
        }
        container.appendChild(highscore)
      }
    }

    /**
     * Posting answers for the quiz.
     *
     * @param {number} id - ID number for the URL answers.
     */
    async postAnswer (id) {
      try {
        let data = await window.fetch(`${this._answerUrl}${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.question)
        })
        data = await data.json()

        if (data.nextURL) {
          this._questionUrl = data.nextURL
          this.getQuestion(this._questionUrl)
        } else {
          // Clear node before calling next component
          const highscore = document.createElement('high-score')
          const container = document.querySelector('#messageContainer')

          while (container.firstChild) {
            container.removeChild(container.firstChild)
          }
          container.appendChild(highscore)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    /**
     * Start timer clock.
     *
     */
    startTimer () {
      // Reference https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript/41633001
      this.startTime = new Date()
    }

    /**
     * End timer clock.
     *
     */
    endTimer () {
      // Reference https://stackoverflow.com/questions/41632942/how-to-measure-time-elapsed-on-javascript/41633001
      this.endTime = new Date()
      let timeDifference = this.endTime - this.startTime // in ms
      // strip the ms
      timeDifference /= 1000

      // get seconds
      const seconds = Math.round(timeDifference)

      // Set time on players score
      let players = localStorage.getItem('quiz_highscore')
      players = JSON.parse(players)
      players[Object(players.length) - 1].score = seconds
      localStorage.setItem('quiz_highscore', JSON.stringify(players))
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this._inputAnswer.addEventListener('input', this._onInput)
      this._formElement.addEventListener('submit', this._onSubmit)
      this.getQuestion()
      this.startTimer()

      if (!this.hasAttribute('message')) {
        this.setAttribute('message', 'Prepare for the quiz"')
      }
      this._upgradeProperty('message')
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'message') {
        this._messageBoard.textContent = newValue
      }
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
    }

    /**
     * Run the specified instance property
     * through the class setter.
     *
     * @param {string} prop - The property's name.
     */
    _upgradeProperty (prop) {
      if (Object.hasOwnProperty.call(this, prop)) {
        const value = this[prop]
        delete this[prop]
        this[prop] = value
      }
    }

    /**
     * Gets the message.
     *
     * @returns {string} The message value.
     */
    get message () {
      return this.getAttribute('message')
    }

    /**
     * Sets the message.
     *
     * @param {string} value - The message.
     */
    set message (value) {
      if (this.message !== value) {
        this.setAttribute('message', value)
      }
    }

    /**
     * Cleans the message board.
     */
    clean () {
      this._messageBoard.textContent = ''
    }
  }
)
