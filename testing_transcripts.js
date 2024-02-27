import { YoutubeTranscript } from 'youtube-transcript';


// Function to convert milliseconds to a timeframe format (e.g., 0:06)
function formatTimeframe(duration) {
    const totalSeconds = Math.floor(duration / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
  
// Fetch transcript and format durations
async function getTranscriptWithTimeFrame(url) {
    
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

async function getTranscript(url) {
    
    try {
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        const formattedTranscript = transcript.map((entry, index) => (
          `${entry.text} , ${formatTimeframe(entry.offset)} - ${formatTimeframe(transcript[index + 1]?.offset || entry.offset + entry.duration)}`
        ));
        return formattedTranscript.join('\n');
      } catch (error) {
        throw new Error('Error fetching or formatting transcript:', error);
      }
}

const videoUrl = 'https://www.youtube.com/watch?v=QKpkhf-Txa8&list=PL5KkMZvBpo5BoekiiL-6NzgRFo4JFnz7k&index=7'


getTranscript(videoUrl)
  .then(formattedTranscript => {
    console.log(formattedTranscript);
  })
  .catch(error => {
    console.error(error);
});

