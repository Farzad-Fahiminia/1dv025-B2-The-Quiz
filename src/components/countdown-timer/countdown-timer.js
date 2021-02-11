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
      padding: 10px;
      border-radius: 50%;
      max-width: 120px;
      height: 120px;
      font-size: 1em;
      text-align: center;
      background-color: #222;
      color: #fff;
    }
    h3 {
      margin-top: 22px;
      margin-bottom: 9px;
    }
    #time {
      font-size: 1.6em;
    }
  </style>
  <div class="countdown-timer">
   <h3>Timer</h3>
   <div><span id="time">00:00</span></div>
  </div>
`

/**
 * Define custom element.
 */
export class CountdownTimer extends HTMLElement {
  /**
   * Creates an instance of the current type.
   */
  constructor () {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    this.timeleft = 20
    this.display = this.shadowRoot.querySelector('#time')
    this.myInterval = 0
    this.timer = 0
  }

  // Source of code for timer:
  // https://stackoverflow.com/questions/40632567/how-to-stop-timer-after-reaching-zero
  /**
   * Countdown timer for questions.
   *
   * @param {number} duration - Total time of question.
   * @param {number} display - Displaying the time.
   * @memberof CountdownTimer
   */
  startCountdown (duration, display) {
    let minutes, seconds

    this.timer = duration

    this.myInterval = setInterval(() => {
      minutes = parseInt(this.timer / 60, 10)
      seconds = parseInt(this.timer % 60, 10)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      display.textContent = minutes + ':' + seconds

      if (--this.timer < 0) {
        this.timer = duration

        // Clear node before calling next component
        const highscore = document.createElement('high-score')
        const container = document.querySelector('#messageContainer')

        while (container.firstChild) {
          container.removeChild(container.firstChild)
        }
        container.appendChild(highscore)

        // Clear the interal
        clearInterval(this.myInterval)
      }
    }, 1000)
  }

  /**
   * Attributes to monitor for changes.
   *
   * @returns {string[]} A string array of attributes to monitor.
   */
  static get observedAttributes () {
    return ['value']
  }

  /**
   * Called after the element is inserted into the DOM.
   */
  connectedCallback () {
  }

  /**
   * Called when observed attribute(s) changes.
   *
   * @param {string} name - The attribute's name.
   * @param {*} oldValue - The old value.
   * @param {*} newValue - The new value.
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'value') {
      window.clearInterval(this.myInterval)
      this.timeleft = Number(newValue)
    }
    this.startCountdown(this.timeleft, this.display)
  }
}
customElements.define('countdown-timer', CountdownTimer)
