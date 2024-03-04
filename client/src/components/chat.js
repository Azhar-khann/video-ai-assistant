import { useRef, useEffect, useState } from "react"
import Chatlog from "./chatlog";
import { ThreeDots } from 'react-loader-spinner'
import { ThreeCircles } from "react-loader-spinner";

function Chat({chatLog, setChatLog, submitTranscript, setTranscript, transcript}) {

    const [input, setInput] = useState('')
    const [selectedMinute, setSelectedMinute] = useState('');
    const [loading, setLoading] = useState(false)
    const [minuteLoader, setMinuteLoader] = useState(false)

    const chatLogRef = useRef(null);
    const [shouldScroll, setShouldScroll] = useState(false);



    async function handleSubmit(e){
        e.preventDefault();
        const updatedChatLog = [...chatLog, { role: "user", content: input }];
        setLoading(true);
        await setChatLog(updatedChatLog);
        setInput('')
        

        const response = await fetch('https://video-ai-assistant.onrender.com/', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: updatedChatLog}),
        })

        const data = await response.json()

        await setChatLog(prevChatLog => [...prevChatLog, { role: "assistant", content: data }]);
        setLoading(false);

    }

    async function handleMinute(minute){
        setMinuteLoader(true)
        const specificTranscript = transcript[minute]
        await submitTranscript(specificTranscript)
        setMinuteLoader(false)
    }

    useEffect(() => {
        if (shouldScroll) {
          chatLogRef.current?.scrollIntoView({ behavior: 'auto' });
        }
    }, [chatLog, shouldScroll]);

    useEffect(() => {
        if (chatLog.length === 5) {
            setShouldScroll(true);
        }
    }, [chatLog]);

    return (
        <div className="chat-container">
            <div className="chatlog">

                <div className="chatLog_texts">

                    {chatLog.map(chat => { 
                        return <Chatlog role = {chat.role} content={chat.content}/>
                    })
                    }

                    {/**Loader for insight response only*/}
                    {loading &&
                    <div className="chatMessage insight">

                        <div className="userAndAvatar">
                            <i class="gg-circleci"></i>
                            <h6>Insight</h6>
                        </div>
                        <div>
                            <ThreeDots
                                visible={true}
                                height="80"
                                width="80"
                                color="white"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>

                    </div>}

                    {/* Empty div to reference for scrolling to bottom */}
                    <div ref={chatLogRef} style={{ height: '40px' }}></div>
                    
                </div>
            </div>

            <div className="inputDiv">
                <div className="formsContainer">

                    <form onSubmit={handleSubmit} className="text_form">
                        <div className="inputborder">
                            <input type="text" value={input} disabled={loading || minuteLoader} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question about the video here..." />

                            {minuteLoader &&
                            <ThreeCircles
                                visible={true}
                                height="35"
                                width="50"
                                color="white"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />}
                        </div>
                    </form>


                    
                    <div className="selectContainer" >
                        <h6>min</h6>
                    <select 
                        value={selectedMinute} 
                        onChange={(event) => {
                            const selectedValue = event.target.value;
                            setSelectedMinute(selectedValue);
                            handleMinute(selectedValue);
                        }}
                        >
                        {Object.keys(transcript).map((key) => (
                            <option key={key} value={key}>{key}</option>
                        ))}

                    </select>
                    </div>
                    
                </div>
                <div className="infoMessage">
                    <span>Insight can make mistakes, consider checking for important information.</span>
                </div>
            </div>


        </div>
    )
}

export default Chat 