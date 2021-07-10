import * as React from "react"
import "./style/cardstyle.css"

const Cardselect = props => {

  return (
    <div class="selection-wrapper">
      <a href="#">
        <div>
          <label for={props.id1} class="selected-label">
            <input
              type="radio"
              name="selected-item"
              id={props.id1}
            ></input>
            <span class="icon"></span>
            <div class="selected-content">
              <img
                src="https://image.freepik.com/free-vector/people-putting-puzzle-pieces-together_52683-28610.jpg"
                alt=""
              ></img>
              <h4>
                <strong>{props.title1}</strong>
              </h4>
              <div class="fees">
              <span class="feeslabel">Fees</span><span class="feestag">{props.subtitle1}</span>
              </div>
            </div>
          </label>
        </div>
      </a>
    </div>
  )
}

export default Cardselect
