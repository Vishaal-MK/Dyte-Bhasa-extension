import audioTranscriptionMiddleware from "./audio_middleware";
import {
  ActivateTranscriptionsConfig,
  DeactivateTranscriptionsConfig,
} from "./param_types";
import {
  
  getWebSocket,
  setWebSocket,
} from "./transcriptions_building_blocks";

async function activateTranscriptions({
  meeting,
  bhasaAccessToken,
  languageCode,
}: ActivateTranscriptionsConfig) {

  deactivateTranscriptions({ meeting });
  const bhasaEndpoint = 'wss://transcribe-api.bhasa.io/ws/listen';

  const ws = new WebSocket(bhasaEndpoint);
  setWebSocket(ws);

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === undefined) {
      meeting.participants.broadcastMessage("audioTranscriptionMessage", {
        text : data[0].transcript,
        peerId: meeting.self.id,
        displayName: meeting.self.name,
      });
    }
  };

  ws.onerror = (err) => {
    console.error("Bhasa websocket error: ", err);
  };

  ws.onclose = () => {
    console.info("Connection to Bhasa websocket closed");
  };

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        event: "config",
        language: languageCode,
        timestamp: true,
        confidence: true,
        api_key: bhasaAccessToken,
        interim_output: false,
        profanity: true,
        encoding: "LINEAR_PCM",
      })
    );
  };

  return meeting.self.addAudioMiddleware(audioTranscriptionMiddleware);
}

async function deactivateTranscriptions({
  meeting,
}: DeactivateTranscriptionsConfig) {
  try {
    
    meeting.self.removeAudioMiddleware(audioTranscriptionMiddleware);
    getWebSocket()?.close();
  } catch (ex) {
    console.error("Failed to close Bhasa websocket. Error: ", ex);
  }
}

export { activateTranscriptions, deactivateTranscriptions };
