import DyteClient from '@dytesdk/web-core/types/client/DyteClient';
export interface ActivateTranscriptionsConfig {
    meeting: DyteClient;
    bhasaAccessToken: string;
    languageCode?: string;
}
export interface DeactivateTranscriptionsConfig {
    meeting: DyteClient;
}
export interface AddTranscriptionsListenerConfig {
    meeting: DyteClient;
    transcriptionsCallback: (allFormattedTranscriptions: string) => void;
}
export interface RemoveTranscriptionsListenerConfig {
    meeting: DyteClient;
}
