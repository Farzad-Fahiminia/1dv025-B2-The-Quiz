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
      margin: auto;
      margin-bottom: 20px;
      box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.3);
      padding: 20px 30px 40px 30px;
      border-radius: 10px;
      max-width: 400px;
      font-size: 1.2em;
      text-align: center;
      background-color: #fff;
    }
    input[type="text"] {
      margin-bottom: 10px;
      padding: 10px;
      font-size: 1em;
    }
    input[type="button"],
    input[type="reset"],
    input[type="submit"] {
      cursor: pointer;
      /* background-color: #333; */
      background-image: linear-gradient(-45deg, #ff5e5a, #ff405a);
      padding: 15px 20px;
      border: none;
      border-radius: 5px;
      font-size: 0.8em;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fff;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
    input[type="button"]:hover, input[type="button"]:focus,
    input[type="reset"]:hover, input[type="reset"]:focus,
    input[type="submit"]:hover, input[type="submit"]:hover {
      /* background-color: #f67e7d; */
      /* background-image: linear-gradient(-45deg, #ff405a, #ff5e5a); */
      box-shadow: 0px 20px 50px rgba(255, 74, 89, 0.3);
    }
  </style>
  <div class="nickname-form">
   <h2>Let's play a game!</h2>
   <p>Compete in the quiz game by answering 7 questions correctly in the shortest amount of time.</p>
    <form action="#">
      <label for="nickname">Choose a nickname:</label><br>
      <input type="text" id="nickname" name="nickname" value="" required><br>
      <input type="submit" value="Start game">
    </form>
  </div>
`
console.log(localStorage)

// const nicknameForm = document.querySelector('form');
// const nicknameInput = document.querySelector('[name="nickname"]');
// const formFeedback = document.querySelector('#feedback');
// const saveButton = document.querySelector('button');

// nicknameForm.addEventListener('submit', event => {
//   event.preventDefault();
//   const nickname = nicknameInput.value;
//   localStorage.setItem('nickname', nickname);
//   formFeedback.textContent = 'Saved!';
//   nicknameInput.setAttribute('disabled', true);
//   saveButton.setAttribute('disabled', true);
// });

// const nicknameElement = document.querySelector('#nickname');
// const nickname = localStorage.getItem('nickname');

// nicknameElement.textContent = nickname;

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

      // Get the input, datalist and article elements in the shadow root.
      this._inputNickname = this.shadowRoot.querySelector('#nickname')
      this._formElement = this.shadowRoot.querySelector('form')

      // Bind event handlers of child elements.
      this._onSubmit = this._onSubmit.bind(this)
    }

    /**
     * Handles input event.
     *
     * @param {InputEvent|Event} event - The input event.
     */
    async _onInput (event) {
      if (!(event instanceof InputEvent)) {
        // Close the datalist.
        this._inputSearchElement.blur()
        this._inputSearchElement.focus()
      }
    }

    _onSubmit (event) {
      // Do not submit the form!
      event.preventDefault()

      if (this._inputNickname.value) {
        localStorage.setItem('nickname', this._inputNickname.value)
      }

      console.log(this._inputNickname.value)
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this._inputNickname.addEventListener('input', this._onInput)
      this._formElement.addEventListener('submit', this._onSubmit)
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this._inputNickname.removeEventListener('input', this._onInput)
      this._formElement.removeEventListener('submit', this._onSubmit)
    }
  }
)
