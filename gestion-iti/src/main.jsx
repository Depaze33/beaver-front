import { Provider } from "@/components/ui/provider"
import ReactDOM from "react-dom/client"
//import { extendTheme } from "@chakra-ui/react";
import App from "./App"
//import { ColorModeScript } from '@chakra-ui/react'
// import theme from './theme'

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <Provider>
            {/*<ColorModeScript initialColorMode={theme.config.initialColorMode} />*/}
            <App />
        </Provider>
    // </React.StrictMode>,
)