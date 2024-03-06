import { useState } from "react"
import { Bars } from 'react-loader-spinner'


function Home({submitTranscript, setTranscript}) {

    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        const response = await fetch('https://video-ai-assistant.onrender.com/transcript', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url: link}),
        })
        const data = await response.json()

        await setTranscript(data)
        await submitTranscript(data['0'])
        setLoading(false)
    }

    return (

        <div className = "main"> 

            <div className = "intro-texts">
                <h1>Insight.AI</h1>

                <p>
                    Introducing our AI-powered Video Q&A Assistant! 🚀 Easily paste a link of Youtube Video, pose your questions, and receive clear answers in real-time. 
                    Perfect for students, enthusiasts, and anyone seeking deeper insights. Give it a try now and unlock the power of knowledge!
                </p>

            </div>
            
            <div class="link-div">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={link} onChange={(event) => setLink(event.target.value)} placeholder= "Paste Your YouTube Video link"/>
                    <span class="focus-bg"></span>
                    {!loading && <button type="submit" class="button-28"> Submit </button>}
                    {loading &&  <Bars
                        height="60"
                        width="200"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        fill= "#14a4fa"
                    />}
                </form>
            </div>

            <div className ="guide">
                <div className="box">
                    <i class="gg-bulb"></i>
                    <h3> Examples</h3>
                    <div className = "text">
                    <p>
                        "Paste a link to a TED Talk or an educational lecture. Ask a question about a specific concept discussed in the video."
                    </p>
                    </div>
                    <div className = "text">
                        <p>
                            "Paste a cooking tutorial link. Inquire about specific steps or ingredients."
                        </p>
                    </div>
                    <div className = "text">
                    <p>
                        "Paste a music video link. Inquire about lyrics' meaning or song inspiration."
                    </p>
                    </div>
                    
                </div>
                <div className ="box">
                    <i class="gg-bolt"></i>
                    <h3> Capabilities</h3>
                    <div className = "text">
                        <p>
                            Understands the context of the video and provide accurate responses based on the content.
                        </p>
                    </div>
                    <div className = "text">
                        <p>
                            Choose specific segments of the video by minute, allowing you to focus on particular sections.
                        </p>
                    </div>
                    <div className = "text">
                        <p>
                            Dive deep into the video content by asking about specific concepts, theories, or details.
                        </p>
                    </div>
                </div>
                <div className = "box">
                    <i class="gg-danger"></i>
                    <h3> Limitations</h3>
                    <div className = "text">
                    <p>
                        Interpretation or context of the video can be misunderstood, leading to less precise answers.
                    </p>
                    </div>
                    <div className = "text">
                    <p>
                        May not fully grasp subtle language nuances, leading to occasional misinterpretations
                    </p>
                    </div>
                    <div className = "text">
                    <p>
                        Ambiguous questions or unclear queries may result in less accurate or relevant answers.
                    </p>
                    </div>
                </div>
            </div>

        </div>
           

      
    )
}

export default Home