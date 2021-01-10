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
      max-width: 600px;
      font-size: 1.2em;
      padding: 3px 15px 15px 15px;
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
