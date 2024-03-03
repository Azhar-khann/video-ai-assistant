const { YoutubeTranscript } =  require('youtube-transcript');


// Function to convert milliseconds to a timeframe format (e.g., 0:06)
function formatTimeframe(duration) {
    const totalSeconds = Math.floor(duration / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


/* async function getTranscript(url) {
    
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    const formattedTranscript = transcript.map((entry, index) => (
      `${entry.text} , ${formatTimeframe(entry.offset)} - ${formatTimeframe(transcript[index + 1]?.offset || entry.offset + entry.duration)}`
    ));
    return formattedTranscript.join('\n');
  } catch (error) {
    throw new Error('Error fetching or formatting transcript:', error);
  }
} */
  
// Fetch transcript and format durations
async function formatTranscriptTimeFrame(url) {
    
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        const formattedTranscript = transcript.map((entry, index) => ({
          text: entry.text,
          timeframe: `${formatTimeframe(entry.offset)} - ${formatTimeframe(transcript[index + 1]?.offset || entry.offset + entry.duration)}`
        }));
        return formattedTranscript;
      } catch (error) {
        throw new Error('Error fetching or formatting transcript:', error);
      }
}


async function getTranscriptWithTimeFrame(url){
  const my_transcript = {}
  const transcript  = await formatTranscriptTimeFrame(url)
  console.log('transcript=',transcript)
  for (let i = 0; i < transcript.length - 1; i++){
    timeframe = transcript[i].timeframe.split(':')[0]
    if (!(timeframe in my_transcript)){
      my_transcript[timeframe] = 'transcript:'
    }
    else{
      //console.log('my transcript =',my_transcript[timeframe])
      my_transcript[(timeframe)] += transcript[i].text + transcript[i].timeframe
    }
  }

  return my_transcript
}

const videoUrl = 'https://www.youtube.com/watch?v=f1OokOgtcqg'



/* getTranscriptWithTimeFrame(videoUrl)
  .then(formattedTranscript => {
    console.log(formattedTranscript);
  })
  .catch(error => {
    console.error(error);
});  */
 

module.exports = getTranscriptWithTimeFrame;