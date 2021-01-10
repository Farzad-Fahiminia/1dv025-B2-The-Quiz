/**
 * The countdown timer script file of the application.
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
    .countdown-timer {
      max-width: 600px;
      font-size: 1.2em;
      padding: 3px 15px 15px 15px;
      background-color: #f7f7f7;
    }
  </style>
  <div class="countdown-timer">
   <h2>Countdown timer</h2>
   <p>Time left...</p>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('countdown-timer',
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
