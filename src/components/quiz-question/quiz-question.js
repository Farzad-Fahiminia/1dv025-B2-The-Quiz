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
      margin-top: 20px;
      margin-bottom: 20px;
      box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3);
      padding: 20px 40px 50px 40px;
      border-radius: 4px;
      max-width: 650px;
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
      /* background-image: linear-gradient(-45deg, #ff5e5a, #ff405a); */
      background-color: green;
      padding: 20px 20px;
      border: none;
      border-radius: 4px;
      font-size: 1em;
      font-weight: 700;
      /* font-style: italic; */
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
    .message-board {
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 2.2em;
      font-weight: 700;
      text-transform: none !important;
    }
    /* ::slotted(h2) {
      font-size: 2.2em;
      text-transform: none !important;
    } */
  </style>
  <div class="quiz-question">
    <div class="message-board"></div>
    <!-- <p>Show the alternatives here.</p> -->
    <form action="#" id="quiz-form">
      <!-- <input type="radio" name="choice" value="alt3"> Alternativ -->
      <slot></slot>
      <input type="text" id="quiz-answer" name="quiz-answer" value="" placeholder="Write answer"><br>
      <input type="submit" value="Submit answer">
    </form>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('quiz-question',
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

      // Bind event handlers of child elements.
      this._onSubmit = this._onSubmit.bind(this)

      this.question = { answer: '' }
      this._answerUrl = 'http://courselab.lnu.se/answer/'
      this._questionUrl = 'http://courselab.lnu.se/question/1'
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

    async getQuestion (_questionUrl) {
      // console.log('Syns frågan på getQuestion?')

      let data = await window.fetch(`${this._questionUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      data = await data.json()

      this.setAttribute('message', data.question)

      this._inputAnswer.style.display = "inline"

      const form = document.querySelector('quiz-question')

      if (data.alternatives) {
        form.innerHTML = ''
        this._inputAnswer.style.display = "none"

        // console.log('Det finns alternativ!')
        // console.log(Object.keys(data.alternatives).length)

        const radioButtonsLength = Object.keys(data.alternatives).length

        // console.log(data.alternatives)
        // console.log(Object.values(data.alternatives)[0])

        for (let i = 0; i < radioButtonsLength; i++) {
          this.inputRadioBtn = '<input type="radio" name="alt" value="alt' + `${[i+1]}` + '">' + `${Object.values(data.alternatives)[i]}`
          form.innerHTML += this.inputRadioBtn + '<br>'
        }

        this.radioAnswer = document.getElementsByName('alt')

        // console.log(this.radioAnswer[2].value)

      } else {
        form.innerHTML = ''
      }

      let counter = document.querySelector('countdown-timer')
      
      // Check timelimit on qurrent question
      if (data.limit) {
        console.log('Den hittar timelimit!!! ' + data.limit + ' sekunder')
        this.timeLimit = data.limit
        
        counter.setAttribute('value', data.limit)
        // console.log(counter)
      } else {
        counter.setAttribute('value', '20')
      }

      console.log('DATA', data)
      // console.log(data.question)

      this.id = data.id
    }

    _onSubmit (event) {
      // Do not submit the form!
      event.preventDefault()

      for (let i = 0; i < this.radioAnswer.length; i++) {
        if (this.radioAnswer[i].checked === true) {
          console.log('DEN STANNAR VID RÄTT ALTERNATIV: ' + this.radioAnswer[i].value)
          this._inputAnswer.value = ''
          this._inputAnswer.value = this.radioAnswer[i].value
        }
      }

      this.question.answer = this._inputAnswer.value
      this.postAnswer(this.id)

      this._inputAnswer.value = ''

      // console.log(data.id)

      console.log('HÄÄÄÄR: ', this.question)
    }

    async postAnswer (id) {
      console.log('Syns svaret?')

      let data = await window.fetch(`${this._answerUrl}${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.question)
      })
      data = await data.json()

      // console.log('POST DATA', data)
      console.log('SEND ANSWER: ', this.question.answer)

      this._questionUrl = data.nextURL
      // this._questionUrl = 'http://courselab.lnu.se/question/21'

      this.getQuestion(this._questionUrl)
      console.log('POST DATA ID', this._questionUrl)
    }

    /**
    * Called after the element is inserted into the DOM.
    */
    connectedCallback () {
      this._inputAnswer.addEventListener('input', this._onInput)
      this._formElement.addEventListener('submit', this._onSubmit)
      this.getQuestion()

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
