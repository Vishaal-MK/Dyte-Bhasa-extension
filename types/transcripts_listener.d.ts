import { AddTranscriptionsListenerConfig, RemoveTranscriptionsListenerConfig } from "./param_types";
declare function addTranscriptionsListener(param: AddTranscriptionsListenerConfig): Promise<void>;
declare function removeTranscriptionsListener({ meeting, }: RemoveTranscriptionsListenerConfig): Promise<void>;
export { addTranscriptionsListener, removeTranscriptionsListener };
