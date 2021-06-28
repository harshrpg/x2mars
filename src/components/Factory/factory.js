import * as React from "react"
import "./factory.css"

const Factory = props => {
  return (
    <div>
      <section class="appbanner">
        <div>
          <button class="button is-rounded factorybutton">
            <p class="title">Account: {props.account}</p>
          </button>
          <button class="button is-rounded factorybutton">
            <p class="title">Balance: {props.balance}</p>
          </button>
        </div>
      </section>

      <div class="cardcontainer">
        <a class="card1" href="#">
          <h3>This is option 1</h3>
          <p class="small">
            Card description with lots of great facts and interesting details.
          </p>
          <div class="go-corner" href="#">
            <div class="go-arrow">→</div>
          </div>
        </a>

        <a class="card2" href="#">
          <h3>This is option 2</h3>
          <p class="small">
            Card description with lots of great facts and interesting details.
          </p>

          <div class="go-corner" href="#">
            <div class="go-arrow">→</div>
          </div>
        </a>

        <a class="card3" href="#">
          <h3>This is option 3</h3>
          <p class="small">
            Card description with lots of great facts and interesting details.
          </p>
          <div class="dimmer"></div>
          <div class="go-corner" href="#">
            <div class="go-arrow">→</div>
          </div>
        </a>
      </div>

      <section class="section is-large">
        <h1 class="title">1. Section</h1>
        <h2 class="subtitle">Fill in all the details</h2>

        <div class="field">
          <label class="label">Normal input</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Extra small"></input>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope fa-xs"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check fa-xs"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Normal"></input>
            <span class="icon is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
      </section>

      <section class="section is-large">
        <h1 class="title">2. Section</h1>
        <h2 class="subtitle">Fill in all the details</h2>

        <div class="field">
          <label class="label">Normal input</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Extra small"></input>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope fa-xs"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check fa-xs"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Normal"></input>
            <span class="icon is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
      </section>

      <section class="section is-large">
        <h1 class="title">3. Section</h1>
        <h2 class="subtitle">Fill in all the details</h2>

        <div class="field">
          <label class="label">Normal input</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Extra small"></input>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope fa-xs"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check fa-xs"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Normal"></input>
            <span class="icon is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
      </section>

      <section class="section is-large">
        <h1 class="title">4. Section</h1>
        <h2 class="subtitle">Fill in all the details</h2>

        <div class="field">
          <label class="label">Normal input</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Extra small"></input>
            <span class="icon is-small is-left">
              <i class="fas fa-envelope fa-xs"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check fa-xs"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Normal"></input>
            <span class="icon is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-right">
              <i class="fas fa-check"></i>
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Factory
