import * as React from "react"
import "./factory.css"
import Cardselection from "../cardSelect/cardselect"

const Steps = props => {
  const [tokenSelection, setToken] = React.useState("None")
  const [blockchainSelection, setBlockchain] = React.useState("None")
  const [dexSelection, setDex] = React.useState("")

  const handleClickFactory = e => {
    //e.preventDefault();
    if (e.target.id !== "") {
      if (e.target.id == "selected-item-1") {
        setToken("Governance Token")
      } else if (e.target.id == "selected-item-2") {
        setToken("Fee on Transfer")
      } else if (e.target.id == "selected-item-3") {
        setBlockchain("Ethereum")
      } else if (e.target.id == "selected-item-4") {
        setBlockchain("Binance")
      } else if (e.target.id == "selected-item-5") {
        setDex("Uniswap")
      } else {
        setDex("PancakeSwap")
        console.log("states", tokenSelection, blockchainSelection, dexSelection)
      }
    }
  }

  let slideIndex = 1

  const plusDivs = n => {
    if (tokenSelection == "None") {
      alert("Please select a Token!")
    } else if (slideIndex == 2 && blockchainSelection == "None") {
      alert("Please select a Blockchain!")
    } else if (
      slideIndex == 3 &&
      (document.getElementById("nameinput").value == "" ||
        document.getElementById("symbolinput").value == "" ||
        document.getElementById("poolinput").value == "")
    ) {
      alert("Please fill all the required details!")
    } else if (slideIndex == 3) {
        showDivs((slideIndex += n));
        //document.getElementById("next").remove();
      }else if (slideIndex == 4) {
        showDivs((slideIndex += n));
    //     let d1 = document.getElementsByClassName("center");
    //     d1.insertAdjacentHTML('beforeend', `<button class="w3-button" id="next" onClick={() => plusDivs(1)}>
    //     Next ❯
    //   </button>`);
      }else {
      showDivs((slideIndex += n))
    }
    console.log("states", tokenSelection, blockchainSelection, dexSelection)
  }

  const currentDiv = n => {
    showDivs((slideIndex = n))
  }

  const showDivs = n => {
    let i
    let x = document.getElementsByClassName("mySlides")
    let dots = document.getElementsByClassName("demo")

    if (n > x.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-red", "")
    }
    x[slideIndex - 1].style.display = "block"
    dots[slideIndex - 1].className += " w3-red"
  }

  React.useEffect(() => {
    showDivs(slideIndex)
  }, [])

  const handleTokenNameChange = e => {
    console.log(e.target.value, document.getElementById("name").value)
    document.getElementById("name").value = ""
    if (e.target.value != "") {
      document.getElementById("name").value = e.target.value + " Token"
    }
  }

  const handleTokenSymbolChange = e => {
    console.log(e.target.value)
    document.getElementById("symbol").value = ""
    if (e.target.value != "") {
      document.getElementById("symbol").value =
        document.getElementById("nameinput").value + " " + e.target.value
    }
  }

  const handleTokenPoolChange = e => {
    console.log(e.target.value)
    document.getElementById("pool").value = ""
    if (e.target.value != "") {
      document.getElementById("pool").value =
        e.target.value + " " + document.getElementById("symbolinput").value
    }
  }

  return (
    <div>
      <div class="content">
        
        <div class="mySlides">
          <div class="headings">
            <span class="h2">
              <h2>Select Token Type</h2>
            </span>
          </div>

          <div class="cradcontainerdummy">
            <a onClick={handleClickFactory}>
              <Cardselection
                title1="Governance Token"
                subtitle1="Price: ____"
                id1="selected-item-1"
              />
            </a>

            <a onClick={handleClickFactory}>
              <Cardselection
                title1="Fee On Transfer Token"
                subtitle1="Price: ____"
                id1="selected-item-2"
              />
            </a>
          </div>
        </div>
        <div class="mySlides">
          <div class="headings" id="blockchain">
            <div class="circle">2</div>
            <span class="h2">
              <h2>Select Blockchain</h2>
            </span>
          </div>

          <div class="cradcontainerdummy">
            <a onClick={handleClickFactory}>
              <Cardselection
                title1="Ethereum"
                subtitle1=""
                id1="selected-item-3"
              />
            </a>
            <a onClick={handleClickFactory}>
              <Cardselection
                title1="Binance"
                subtitle1=""
                id1="selected-item-4"
              />
            </a>
          </div>
        </div>

        <div class="mySlides">
          <div class="headings" id="form">
            <div class="circle">3</div>
            <span class="h2">
              <h2>Enter Token Details</h2>
            </span>
          </div>

          <div class="cardbody">
            <div class="cardholders">
              <div class="centerinput">
                <input type="text" class="valueinput" id="name"></input>

                <div class="input-block">
                  <input
                    type="text"
                    id="nameinput"
                    onChange={handleTokenNameChange}
                    required="required"
                    spellcheck="false"
                  ></input>
                  <span class="placeholder">Token Name *</span>
                </div>
              </div>

              <div class="centerinput">
                <input type="text" class="valueinput" id="symbol"></input>

                <div class="input-block">
                  <input
                    type="text"
                    onChange={handleTokenSymbolChange}
                    id="symbolinput"
                    required="required"
                    spellcheck="false"
                  ></input>
                  <span class="placeholder">Token Symbol in Letters *</span>
                </div>
              </div>
            </div>

            <div class="cardholders">
              <div class="centerinput">
                <input type="text" class="valueinput" id="pool"></input>

                <div class="input-block">
                  <input
                    type="text"
                    onChange={handleTokenPoolChange}
                    id="poolinput"
                    required="required"
                    spellcheck="false"
                  ></input>
                  <span class="placeholder">Pool of Tokens *</span>
                </div>
              </div>

              <div class="centerinput">
                <input type="checkbox" value="pair"></input>
                <div class="inputbox">
                  <input type="button" value="Pair"></input>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mySlides">

        <button class="noselect">Deploy</button>

        </div>
      </div>

      <div class="stepbuttons">
          <button class="demo" onClick={() => currentDiv(1)}>STEP 1</button>
          <button class="demo" onClick={() => currentDiv(2)}>STEP 2</button>
          <button class="demo" onClick={() => currentDiv(3)}>STEP 3</button>
          <button class="demo" onClick={() => currentDiv(4)}>STEP 4</button>
        </div>

    </div>
  )
}

export default Steps
