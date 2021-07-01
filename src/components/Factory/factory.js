import * as React from "react"
import "./factory.css"
import Cardselection from "../cardSelect/cardselect"

const Factory = props => {
  const [tokenSelection, setToken] = React.useState("None")
  const [blockchainSelection, setBlockchain] = React.useState("None")
  const [dexSelection, setDex] = React.useState("")

  const handleClickFactory = e => {
    //e.preventDefault();
    if (e.target.id == "") {
      console.log("empty")
    } else {
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
        console.log("states",tokenSelection,blockchainSelection,dexSelection);
      }

      // if(tokenSelection == "Governance Token"){
      //    console.log("Governance",document.querySelector("#___gatsby").querySelector("#selected-item-1").checked = true);
      // }
    }
  }

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

      <h1>Lets Create!</h1>
      <br></br>
      <br></br>
      <div class="headings">
        <div class="circle">1</div>
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
          title1="Fee On Transfer"
          subtitle1="Price: ____"
          id1="selected-item-2"
        />
        </a>
      </div>

      <hr></hr>
      <div class="headings" id="blockchain">
        <div class="circle">2</div>
        <span class="h2">
          <h2>Select Blockchain</h2>
        </span>
      </div>

      <div class="cradcontainerdummy">
      <a onClick={handleClickFactory}>
        <Cardselection title1="Ethereum" subtitle1="" id1="selected-item-3" />
      </a>
      <a onClick={handleClickFactory}>
        <Cardselection title1="Binance" subtitle1="" id1="selected-item-4" />
      </a>
      </div>

      <hr></hr>
      <div class="headings" id="form">
        <div class="circle">3</div>
        <span class="h2">
          <h2>Enter Token Details</h2>
        </span>
      </div>

      <section class="section is-large">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Token Name"
                ></input>
                <span class="icon-text">
        <span class="icon has-text-info">
    <i class="fas fa-info-circle"></i>
  </span>
    </span>
              </div>
            </div>
          </div>
        </div>

        

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Symbol</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Token Symbol in Letters"
                ></input>
                <span class="icon-text">
        <span class="icon has-text-info">
    <i class="fas fa-info-circle"></i>
  </span>
    </span>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Total Supply</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Pool of tokens"
                ></input>
                <span class="icon-text">
        <span class="icon has-text-info">
    <i class="fas fa-info-circle"></i>
  </span>
    </span>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Decimal</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="With 18 decimal places"
                  disabled
                ></input>
                <span class="icon-text">
        <span class="icon has-text-info">
    <i class="fas fa-info-circle"></i>
  </span>
    </span>
              </div>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Do you need a Dex pair?</label>
            <span class="icon-text">
        <span class="icon has-text-info">
    <i class="fas fa-info-circle"></i>
  </span>
    </span>
          </div>
          <div class="field-body">
            <div class="field is-narrow">
              <div class="control"></div>
            </div>
          </div>
        </div>

        <div class="cradcontainerdummy">
        <a onClick={handleClickFactory}>
          <Cardselection title1="Uniswap" subtitle1="" id1="selected-item-5" />
        </a>

        <a onClick={handleClickFactory}>
          <Cardselection
            title1="PancakeSwap"
            subtitle1=""
            id1="selected-item-6"
          />
          </a>
        </div>

        <button class="button is-success deploy">Deploy</button>
      </section>
    </div>
  )
}

export default Factory
