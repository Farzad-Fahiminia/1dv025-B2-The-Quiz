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
    h2 {
      font-size: 2.2em;
    }
  </style>
  <div class="quiz-question">
   <h2 id="question-h2">Quiz question</h2>
   <slot></slot>
   <p>Show the question here.</p>
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
      
      // this.questionContainer = this.shadowRoot.querySelector('p')
      // this.question = this.shadowRoot.createTextNode('"The best quiz game you ever played."')
      // this.questionContainer.appendChild(this.question)

      this.nextUrl = ''
      this._answerUrl = 'http://courselab.lnu.se/answer/'
      this._questionUrl = 'http://courselab.lnu.se/question/'
    }

    async getQuestion (id) {
      console.log('Syns frågan på getQuestion?')

      const show = await window.fetch('http://courselab.lnu.se/question/1')
      console.log(show)

      // const questionContainer = this.shadowRoot.querySelector('p')
      // const question = this.shadowRoot.createTextNode('Test')
      // questionContainer.appendChild(question)

      const elem = document.querySelector('quiz-question')
         
      // create a <p> element
      const h2 = document.createElement('h2')
         
      // add <p> to the shadow DOM
      elem.appendChild(h2)
         
      // add text to <p> 
      h2.textContent = show


      return show.json()

      // let res = await window.fetch('http://courselab.lnu.se/question/1', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(res)
      // })
      // res = await res.json()

      // console.log(res)
    }

    async sendAnswer (id) {
      console.log('Syns svaret?')

      // let data = await window.fetch(`${this._answerUrl}${id}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // })
      // data = await data.json()

      // const data = {
      //   id: 54322575,
      //   name: 'Johan'
      // }

      // let result = await window.fetch(http://courselab.lnu.se/question/1, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // }).then(res => {
      //   // Process the response here
      // }).catch(error => {
      //   // Handle errors here
      // })
    }

    /**
    * Called after the element is inserted into the DOM.
    */
    connectedCallback () {
      this.getQuestion()
      this.sendAnswer()
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      
    }
  }
)
