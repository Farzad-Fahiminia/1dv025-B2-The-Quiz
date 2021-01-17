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
      max-width: 600px;
      margin-bottom: 20px;
      border-radius: 4px;
      box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3);
      padding: 20px 30px 40px 30px;
      font-size: 1em;
      background-color: #f7f7f7;
    }
  </style>
  <div class="quiz-question">
   <h2>Quiz question</h2>
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
    }
  }
)
