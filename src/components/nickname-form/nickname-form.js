/**
 * The nickname script file of the application.
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
    .nickname-form {
      font-size: 1.2em;
      padding: 1em;
      margin: 1em;
      background-color: #f7f7f7;
    }
    input[type="text"] {
      margin-bottom: 10px;
      padding: 10px;
    }
    input[type="button"],
    input[type="reset"],
    input[type="submit"] {
      cursor: pointer;
      background-color: #333;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 1em;
      color: #fff;
    }
    input[type="button"]:hover,
    input[type="reset"]:hover,
    input[type="submit"]:hover {
      background-color: #f67e7d;
    }
  </style>
  <div class="nickname-form">
   <h2>Let's play a game!</h2>
    <form action="/action_page.php">
      <label for="fname">Choose a nickname:</label><br>
      <input type="text" id="fname" name="fname" value="John"><br>
      <input type="submit" value="Start game!">
    </form>
  </div>
`

/**
 * Define custom element.
 */
customElements.define('nickname-form',
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

      // Get the message board element in the shadow root.
      this._messageBoard = this.shadowRoot.querySelector('.message-board')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['message']
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      if (!this.hasAttribute('message')) {
        this.setAttribute('message', 'A simple hello from a web component.')
      }

      this._upgradeProperty('message')
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'message') {
        this._messageBoard.textContent = newValue
      }
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
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
    get message () {
      return this.getAttribute('message')
    }

    /**
     * Sets the message.
     *
     * @param {string} value - The message.
     */
    set message (value) {
      if (this.message !== value) {
        this.setAttribute('message', value)
      }
    }

    /**
     * Cleans the message board.
     */
    clean () {
      this._messageBoard.textContent = ''
    }
  }
)
