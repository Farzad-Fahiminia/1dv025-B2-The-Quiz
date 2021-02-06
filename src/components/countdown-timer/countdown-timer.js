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
      
      // this.startTimer
      this.timeleft = 20
      this.display = this.shadowRoot.querySelector('#time')
      this.myInterval
    }

    // Source of code for timer:
    // https://stackoverflow.com/questions/40632567/how-to-stop-timer-after-reaching-zero
    startTimer (duration, display, callback) {
      // console.log('startTimer: ' + this._questionUrl)

      let timer = duration, minutes, seconds

      this.myInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.textContent = minutes + ":" + seconds

        if (--timer < 0) {
          timer = duration
        
          // clear the interal
          clearInterval(this.myInterval)

          // use the callback
          if(callback) {
              callback()
          }
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
      // window.onload = () => {
      //   // this.startTimer(this.timeleft, this.display, function() { alert('done')})
      //   this.startTimer(this.timeleft, this.display)
      // }
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      // clearInterval(this.myInterval)
      if (name === 'value') {
        window.clearInterval(this.myInterval)
        // console.log('attributeChangedCallback: ' + this.myInterval)
        this.timeleft = Number(newValue)
        // console.log('newValue ' + newValue)
        // this.startTimer(this.timeleft, this.display, clearInterval(this.timeleft))
      }
      this.startTimer(this.timeleft, this.display)
    }

    // clean () {
    //   this.timeleft = 0
    // }
   
  }
)
