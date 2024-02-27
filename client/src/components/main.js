import Home from "./home"
import Chat from "./chat";
import { useState } from "react"

function Main() {
    const [showHome, setshowHome] = useState(true);

    return (
        <>

            {showHome && <Home showHome={showHome} setshowHome={setshowHome} />}
            {!showHome && <Chat />}
           
        </>
      
    )
}

export default Main