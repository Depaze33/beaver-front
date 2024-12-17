import App from "./App"
import { Provider } from "@/components/ui/provider"
import ReactDOM from "react-dom/client"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider>
        <App />
    </Provider>
)