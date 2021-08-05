import * as React from "react"
import AppLayout from "../components/applayout"
import Seo from "../components/seo"
import "../style/index.scss"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import Factory from "../components/Factory/factory"
import { AuthProvider } from "../context"

const Interface = () => {
  library.add(fab)
  return (
    <AuthProvider>
      <AppLayout>
        <Seo title="App" />
        <Factory />
      </AppLayout>
    </AuthProvider>
  )
}

export default Interface
