/**
 * The countdown timer script file of the application.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import '../quiz-question'

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
      padding: 5px 20px 30px 20px;
      border-radius: 4px;
      max-width: 120px;
      font-size: 1em;
      text-align: center;
      background-color: #222;
      color: #fff;
    }
  </style>
  <div class="countdown-timer">
   <h3>Time left...</h3>
   <div><span id="time">00:00</span></div>
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
    constructor (timeleft = 20) {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      
      // this.startTimer
      this.timeleft = 3
      this.display = this.shadowRoot.querySelector('#time')
    }

    // Source of code for timer:
    // https://stackoverflow.com/questions/40632567/how-to-stop-timer-after-reaching-zero
    startTimer (duration, display, callback) {
      let timer = duration, minutes, seconds
      
      let myInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.textContent = minutes + ":" + seconds

        if (--timer < 0) {
          timer = duration
        
          // clear the interal
          clearInterval(myInterval);

          // use the callback
          if(callback) {
              callback();
          }
        }

      }, 1000);
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
      // window.onload = () => {
      //   // this.startTimer(this.timeleft, this.display, function() { alert('done')})
      //   this.startTimer(this.timeleft, this.display)
      // }

      this.startTimer(this.timeleft, this.display)
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
        this.timeleft = newValue
        console.log('newValue ' + newValue)
      }
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
  get counter () {
    return this.getAttribute('value')
  }

  /**
  * Sets the message.
  *
  * @param {string} value - The message.
  */
  set counter (value) {
    if (this.counter !== value) {
      this.setAttribute('value', value)
    }
  }

  
  }
)
