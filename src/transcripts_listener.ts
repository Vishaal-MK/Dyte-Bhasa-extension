import {
  AddTranscriptionsListenerConfig,
  RemoveTranscriptionsListenerConfig,
} from "./param_types";
let listernerParam: AddTranscriptionsListenerConfig;

const broadcastedMessageCB = async ({
  payload,
  type,
}: {
  payload: {peerId:string,text:string,displayName:string};
  type: string;
}) => {
  if (type === "audioTranscriptionMessage") {
    if (payload.peerId != listernerParam.meeting.self.id) {
        let x:string = payload.text;
      listernerParam.transcriptionsCallback(x);
    }
  }
};

async function addTranscriptionsListener(
  param: AddTranscriptionsListenerConfig
) {
  listernerParam = param;
  param.meeting.participants.on("broadcastedMessage", broadcastedMessageCB);
}

async function removeTranscriptionsListener({
  meeting,
}: RemoveTranscriptionsListenerConfig) {
  try {
    meeting.participants.removeListener(
      "broadcastedMessage",
      broadcastedMessageCB
    );
  } catch (ex) {
    console.error("Failed to close Bhasa websocket. Error: ", ex);
  }
}

export { addTranscriptionsListener, removeTranscriptionsListener };
