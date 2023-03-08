import { ActivateTranscriptionsConfig, DeactivateTranscriptionsConfig } from "./param_types";
declare function activateTranscriptions({ meeting, bhasaAccessToken, languageCode, }: ActivateTranscriptionsConfig): Promise<{
    success: boolean;
    message: string;
}>;
declare function deactivateTranscriptions({ meeting, }: DeactivateTranscriptionsConfig): Promise<void>;
export { activateTranscriptions, deactivateTranscriptions };
