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
      max-width: 600px;
      font-size: 1.2em;
      padding: 3px 15px 15px 15px;
      /* margin: 1em; */
      background-color: #f7f7f7;
    }
  </style>
  <div class="high-score">
   <h2>High Score</h2>
   <p>Are you on the top 5 list?</p>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('high-score',
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
