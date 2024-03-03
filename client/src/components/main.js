import Home from "./home"
import Chat from "./chat";
import { useState } from "react"

function Main() {
    const [showHome, setshowHome] = useState(true);
    const [transcript, setTranscript] = useState({})
    const [chatLog, setChatLog] = useState([
        { role: "system", content: "You will help understand and clarify any content from video transcript."},
        { role: "user", content: "Welcome to the chat section 🎉! You've successfully submitted a link to a video. Now you can ask me anything you don't understand from the video, and I'll do my best to help you out. Additionally, you can select a specific portion of the video using the minute selector below. By default, it's set to minute 0. Feel free to explore and ask away! "}
    ])

    async function submitTranscript(data) {
        const updatedChatLog = [...chatLog, { role: "user", content: data }];
        setChatLog(updatedChatLog);

        const submit = await fetch('http://localhost:4000/', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: updatedChatLog}),
        })
        setshowHome(false)
    }


    return (
        <>

            {showHome && <Home submitTranscript={submitTranscript} transcript= {transcript} setTranscript= {setTranscript} />}
            {!showHome && <Chat chatLog= {chatLog} setChatLog = {setChatLog} transcript= {transcript} submitTranscript={submitTranscript}/>}
           
        </>
      
    )
}

export default Main