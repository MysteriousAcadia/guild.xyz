import type { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers"
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import Chakra from "components/_app/Chakra"
import { Web3ConnectionManager } from "components/_app/Web3ConnectionManager"
import "focus-visible/dist/focus-visible"
import type { AppProps } from "next/app"
import { IconContext } from "phosphor-react"
import { SWRConfig } from "swr"
import "theme/custom-scrollbar.css"
import "theme/hidden-animations.css"
import fetchApi from "utils/fetchApi"


const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) =>
  new Web3Provider(provider)

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Chakra cookies={pageProps.cookies}>
    <IconContext.Provider
      value={{
        color: "currentColor",
        size: "1em",
        weight: "bold",
        mirrored: false,
      }}
    >
      <SWRConfig value={{ fetcher: fetchApi }}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ConnectionManager>
            <Component {...pageProps} />
          </Web3ConnectionManager>
        </Web3ReactProvider>
      </SWRConfig>
    </IconContext.Provider>
  </Chakra>
)

export { getServerSideProps } from "components/_app/Chakra"

export default App
