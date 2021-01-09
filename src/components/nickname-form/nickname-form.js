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
      max-width: 600px;
      font-size: 1.2em;
      padding: 3px 15px 15px 15px;
      /* margin: 1em; */
      background-color: #f7f7f7;
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
      background-color: #333;
      padding: 15px 20px;
      border: none;
      border-radius: 5px;
      font-size: 0.8em;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fff;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
    input[type="button"]:hover, input[type="button"]:focus,
    input[type="reset"]:hover, input[type="reset"]:focus,
    input[type="submit"]:hover, input[type="submit"]:hover {
      background-color: #f67e7d;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    }
  </style>
  <div class="nickname-form">
   <h2>Let's play a game!</h2>
   <p>Compete in the quiz game by answering 7 questions correctly in the shortest amount of time.</p>
    <form action="/action_page.php">
      <label for="nickname">Choose a nickname:</label><br>
      <input type="text" id="nickname" name="nickname" value=""><br>
      <input type="submit" value="Start game">
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
    }
  }
)
