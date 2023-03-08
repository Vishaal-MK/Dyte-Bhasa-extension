import * as TranscriptionListenerHelpers from './transcripts_listener';
import * as SymblTranscriptionsHelpers from './bhasa_transcriptions';
import {
    ActivateTranscriptionsConfig,
    DeactivateTranscriptionsConfig,
    AddTranscriptionsListenerConfig,
    RemoveTranscriptionsListenerConfig,
} from './param_types';

async function activateTranscriptions(param: ActivateTranscriptionsConfig) {
    if (!param?.meeting?.self) {
        throw new Error('arguments[0].meeting.self is not available. Did you miss calling new DyteClient first?');
    }
    if (!param?.bhasaAccessToken) {
        throw new Error('Missing arguments[0].bhasaAccessToken. We need Bhasa access token to retrive conversations and to generate transcriptions');
    }
    if (!param?.languageCode) {
        throw new Error('language code is missing');
    }
    return SymblTranscriptionsHelpers.activateTranscriptions(param);
}

async function deactivateTranscriptions(param: DeactivateTranscriptionsConfig) {
    if (!param.meeting?.self) {
        throw new Error('arguments[0].meeting.self is not available. Did you miss calling new DyteClient first?');
    }
    return SymblTranscriptionsHelpers.deactivateTranscriptions(param);
}

async function addTranscriptionsListerner(param: AddTranscriptionsListenerConfig) {
    if (!param?.meeting?.self) {
        throw new Error('arguments[0].meeting.self is not available. Did you miss calling new DyteClient first?');
    }
    if (!param?.transcriptionsCallback) {
        throw new Error('arguments[0].transcriptionsCallback is not missing. Please provide transcriptionsCallback.');
    }
    return TranscriptionListenerHelpers.addTranscriptionsListener(param);
}

async function removeTranscriptionsListener(param: RemoveTranscriptionsListenerConfig) {
    if (!param.meeting?.self) {
        throw new Error('arguments[0].meeting.self is not available. Did you miss calling new DyteClient first?');
    }
    return TranscriptionListenerHelpers.removeTranscriptionsListener(param);
}



export {
    activateTranscriptions,
    deactivateTranscriptions,
    addTranscriptionsListerner,
    removeTranscriptionsListener,

};
