import { useState } from "react"

function Home({setshowHome, showHome}) {

    const [link, setLink] = useState('');

    function handleSubmit(e) {
        e.preventDefault(); 
        setshowHome(false)
    }

    return (

        <div className = "main"> 

            <div className = "intro-texts">
                <h1>Insight.AI</h1>

                <p>
                    Introducing our AI-powered video decoder! 🚀 Simply paste a link, ask your question, and get instant clarity. 
                    Perfect for students, enthusiasts, and curious minds. Try it now!
                </p>

            </div>
            
            <div class="link-div">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={link} onChange={(event) => setLink(event.target.value)} placeholder= "Paste your Link"/>
                    <span class="focus-bg"></span>
                    <button type="submit" class="button-28"> Submit </button>
                </form>
            </div>

            <div className ="guide">
                <div className="box">
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
                    <h3> Capabilities</h3>
                    <div className = "text">
                        <p>
                            Provides answers about specifc parts of a video.
                        </p>
                    </div>
                    <div className = "text">
                        <p>
                            Understands the context of the video and provide accurate responses based on the content.
                        </p>
                    </div>
                    <div className = "text">
                        <p>
                            Users can decode videos from various platforms such as YouTube, TED, Vimeo, etc.
                        </p>
                    </div>
                </div>
                <div className = "box">
                    <h3> Limitations</h3>
                    <div className = "text">
                    <p>
                        May not perform best for videos larger than 1 hour.
                    </p>
                    </div>
                    <div className = "text">
                    <p>
                        May occasionaley provide incorrect answers.
                    </p>
                    </div>
                    <div className = "text">
                    <p>
                        Interpretation or context of the video is misunderstood, leading to less precise answers.
                    </p>
                    </div>
                </div>
            </div>

        </div>
           

      
    )
}

export default Home