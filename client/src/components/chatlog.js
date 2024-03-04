
function Chatlog({role, content}){
    return (
        <>

            { role === 'user'  &&  content.slice(0, 7) === 'Welcome' &&
                <div className="chatMessage user">

                    <div className="userAndAvatar">
                        <i class="gg-circleci"></i>
                        <h6>Insight</h6>
                    </div>
                    <div>
                        <span>{content}</span>
                        
                    </div>

                </div>

            }

            { role === 'user'  &&  content.slice(0, 10) !== 'transcript' && content.slice(0, 7) !== 'Welcome' &&
                <div className="chatMessage user">

                    <div className="userAndAvatar">
                        <i class="gg-circleci"></i>
                        <h6>You</h6>
                    </div>
                    <div>
                        <span>{content}</span>
                        
                    </div>

                </div>

            }

            {role === 'assistant' &&   
                <div className="chatMessage insight">

                    <div className="userAndAvatar">
                        <i class="gg-circleci"></i>
                        <h6>Insight</h6>
                    </div>
                    <div>
                    <span>{content}</span>
                    </div>

                </div>
            }
        </>
    )
}

export default Chatlog