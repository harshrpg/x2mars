import * as React from "react"
import "./style/cardstyle.css"

const Cardselect = props => {
  const handleClick = e => {
    //e.preventDefault();
    console.log("item", e.target.id)
    if (e.target.id == "selected-item-1" || e.target.id == "selected-item-2") {
      let ele = document
        .querySelector("#___gatsby")
        .querySelector("#blockchain")
      ele.scrollIntoView()
    } else if (
      e.target.id == "selected-item-3" ||
      e.target.id == "selected-item-4"
    ) {
      if (e.target.id == "selected-item-3") {
        document
          .querySelector("#___gatsby")
          .querySelector(".section")
          .querySelector("#selected-item-6").checked = false
        document
          .querySelector("#___gatsby")
          .querySelector(".section")
          .querySelector("#selected-item-6").disabled = true
        document
          .querySelector("#___gatsby")
          .querySelector(".section")
          .querySelector("#selected-item-6")
          .parentElement.parentElement.classList.add("blur")
        document
          .querySelector("#___gatsby")
          .querySelector(".section")
          .querySelector("#selected-item-5")
          .parentElement.parentElement.classList.remove("blur")
      } else {
        document
          .querySelector("#___gatsby")
          .querySelector(".section")
          .querySelector("#selected-item-5").checked = false
        document
          .querySelector("#___gatsby")
          .querySelector(".section")
          .querySelector("#selected-item-5").disabled = true
        document
          .querySelector("#___gatsby")
          .querySelector(".section")
          .querySelector("#selected-item-5")
          .parentElement.parentElement.classList.add("blur")
        document
          .querySelector("#___gatsby")
          .querySelector(".section")
          .querySelector("#selected-item-6")
          .parentElement.parentElement.classList.remove("blur")
      }
      let ele2 = document.querySelector("#___gatsby").querySelector("#form")
      ele2.scrollIntoView()
    } else {
      console.log("no select")
    }
  }

  return (
    <div class="selection-wrapper">
      <a href="#">
        <div>
          <label for={props.id1} class="selected-label">
            <input
              type="radio"
              name="selected-item"
              id={props.id1}
              onClick={handleClick}
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
              <h5>{props.subtitle1}</h5>
            </div>
          </label>
        </div>
      </a>
    </div>
  )
}

export default Cardselect
