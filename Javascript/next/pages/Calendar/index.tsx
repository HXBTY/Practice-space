import dayjs from "dayjs";
import "./index.scss"
import Calendar from "./Calendar"

function App() {
    return <div>
        <Calendar locale="en-US" value={dayjs("2024-3-12")}/>
    </div>
}

export default App