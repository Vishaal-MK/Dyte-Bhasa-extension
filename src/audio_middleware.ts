import { getWebSocket } from "./transcriptions_building_blocks";
let floatTo16Bit = function (inputArray: Float32Array, startIndex: number) {
  let output = new Int16Array(inputArray.length / 3 - startIndex);
  for (let i = 0; i < inputArray.length; i += 3) {
    let s = Math.max(-1, Math.min(1, inputArray[i]));
    output[i / 3] = s < 0 ? s * 32768 : s * 32767;
  }
  return output;
};
async function audioTranscriptionMiddleware(audioContext: AudioContext) {
  const processor = audioContext.createScriptProcessor(1024, 1, 1);
  processor.onaudioprocess = (e) => {
    const inputDatax = e.inputBuffer;
    let outbuf = e.outputBuffer;

    let inputData:Float32Array = inputDatax.getChannelData(0);
    let outputData:Float32Array = outbuf.getChannelData(0);
    outputData.set(inputData);
    const ws2 = getWebSocket();
    if ((ws2 == null ? void 0 : ws2.readyState) === WebSocket.OPEN) {
      let out = floatTo16Bit(inputData, 0);
      ws2.send(out.buffer);
    }
  };
  return processor;
}

export default audioTranscriptionMiddleware;
