import * as React from "react"
import Switch from "react-switch"

const Settings = () => {
  return (
    <div className="has-text-centered">
      <div id="title">
        <span className="is-size-1">Settings</span>
      </div>
      <SettingsContent />
    </div>
  )
}

const SettingsContent = () => {
  const [darkMode, setDarkModeSelected] = React.useState(false)
  const [walletConnected, setWalletConnected] = React.useState(true)

  function handleDarkModeChange(checked) {
    setDarkModeSelected(checked)
  }

  function handleWalletConnectedChange(checked) {
    setWalletConnected(checked)
  }
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <span>Dark Mode</span>
        </div>
        <div className="column">
          <span>
            <Switch
              height={16}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={handleDarkModeChange}
              checked={darkMode}
              onColor="#219de9"
              offColor="#bbbbbb"
              disabled={true}
            />
            <span>coming soon</span>
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <span>Wallet Connected</span>
        </div>
        <div className="column">
          <span>
            <Switch
              height={16}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={handleDarkModeChange}
              checked={walletConnected}
              onColor="#219de9"
              offColor="#bbbbbb"
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Settings
