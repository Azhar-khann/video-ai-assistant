
function Chat() {

    return (
        <div className="chat-container">
            <div className="chatlog">
                <div className="chatMessage user">
                    <div className="userAndAvatar">
                        <i class="gg-profile"></i>
                        <h6>You</h6>
                    </div>
                    <div>
                        My message will begin and will be styled like this
                    </div>
                </div>

                <div className="chatMessage insight">
                    <div className="userAndAvatar">
                        <i class="gg-circleci"></i>
                        <h6>Insight</h6>
                    </div>
                    <div>
                        My message will begin and will be styled like this
                    </div>
                </div>
            </div>

            <div className="inputDiv" >
                <form>
                    <input type="text" placeholder="What would you like to ask about the video?"/>
                </form>
                <span>Insight can make mistakes, consider checking for important information.</span>
            </div>

        </div>
    )
}

export default Chat