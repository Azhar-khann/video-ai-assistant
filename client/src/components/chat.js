import { useRef, useEffect, useState } from "react"
import Chatlog from "./chatlog";
import { ThreeDots } from 'react-loader-spinner'
import { ThreeCircles } from "react-loader-spinner";

function Chat({chatLog, setChatLog, submitTranscript, setTranscript, transcript}) {

    const [input, setInput] = useState('')
    const [selectedMinute, setSelectedMinute] = useState('');
    const [loading, setLoading] = useState(false)
    const [minuteLoader, setMinuteLoader] = useState(false)
    const [error, setError] = useState(false)

    const chatLogRef = useRef(null);
    const [shouldScroll, setShouldScroll] = useState(false);

    console.log(chatLog)

    async function handleSubmit(e){
        e.preventDefault();
        const updatedChatLog = [...chatLog, { role: "user", content: input }];
        setLoading(true);
        await setChatLog(updatedChatLog);
        setInput('')
        

        try {
            const response = await fetch('http://localhost:4000/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: updatedChatLog }),
            });
        
            if (!response.ok) {
              throw new Error('Request failed');
            }        
            const data = await response.json();
            await setChatLog(prevChatLog => [...prevChatLog, { role: "assistant", content: data}]);

            // Process the response as needed
        } catch (error) {
            // Check if the error indicates rate limit exceeded
            let errorMessage = 'An error occurred.';
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                errorMessage = 'Failed to connect to the server. Please try again later.';
            } else {
                errorMessage = 'Rate limit exceeded. You have reached the maximum number of requests allowed per hour. Please wait for some time before trying again. This limit is in place to ensure fair usage of the service for all users. The maximum number of questions you can ask per hour is 8.';
            }
            await setError(true)
            await setChatLog(prevChatLog => [...prevChatLog, { role: "error", content: errorMessage}]);

        } finally {
            setLoading(false);
        }

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
                        return <Chatlog role = {chat.role} content={chat.content} />
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
                            <input type="text" value={input} disabled={loading || minuteLoader ||error} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question about the video here..." />

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