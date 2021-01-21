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
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3);
      padding: 20px 40px 50px 40px;
      border-radius: 4px;
      max-width: 200px;
      font-size: 1em;
      text-align: center;
      background-color: #222;
      color: #fff;
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
