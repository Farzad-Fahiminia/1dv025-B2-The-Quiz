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
      max-width: 600px;
      font-size: 1em;
      text-align: center;
      background-color: #222;
      color: #fff;
    }
    ::slotted(h2) {
      font-size: 2.2em;
      text-transform: none !important;
    }
  </style>
  <div class="quiz-question">
   <!-- <h2 id="question-h2">Quiz question</h2> -->
   <slot></slot>
   <p>Show the alternatives here.</p>
   <form action="#">
      <input type="text" id="quiz-answer" name="quiz-answer" value="" required><br>
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

      // Get the input, datalist and article elements in the shadow root.
      this._inputAnswer = this.shadowRoot.querySelector('#quiz-answer')
      this._formElement = this.shadowRoot.querySelector('form')

      // Bind event handlers of child elements.
      this._onSubmit = this._onSubmit.bind(this)

      this.question = { answer: '' }
      
      this.id = ''
      // this.nextUrl = ''
      this._answerUrl = 'http://courselab.lnu.se/answer/'
      this._questionUrl = 'http://courselab.lnu.se/question/1'
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
      console.log('Syns frågan på getQuestion?')

      let data = await window.fetch(`${this._questionUrl}`, {
      // let data = await window.fetch(`${this._questionUrl}${id}`, {
      // let data = await window.fetch('http://courselab.lnu.se/question/1', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify(this.question)
      })
      data = await data.json()

      const elem = document.querySelector('quiz-question')
      // create a <p> element
      const h2 = document.createElement('h2')
      // add <h2> to the shadow DOM
      elem.appendChild(h2)
      // add text to <h2> 
      h2.textContent = data.question

      console.log('DATA', data)
      // console.log(data.question)

      this.id = data.id
      console.log(data.id)
    }

    _onSubmit (event) {
      // Do not submit the form!
      event.preventDefault()

      this.question.answer = this._inputAnswer.value
      this.postAnswer(this.id)

      // console.log(data.id)
      // this.getQuestion(data.id)

          // Get and render the selected article.
          // this.question.answer = this.postAnswer(this._inputAnswer.value)
          // this._renderArticleExtract(article)

      // this.question.answer = this._inputAnswer.value
      console.log('HÄÄÄÄR: ', this.question)
    }

    async postAnswer (id) {
      console.log('Syns svaret?')

      let data = await window.fetch(`${this._answerUrl}${id}`, {
      // let data = await window.fetch('http://courselab.lnu.se/answer/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.question)
      })
      data = await data.json()

      // console.log('POST ID', data.id)
      console.log('POST DATA', data)
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
      // this.postAnswer()
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      
    }
  }
)
