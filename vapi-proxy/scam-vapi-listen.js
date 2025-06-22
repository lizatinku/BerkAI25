import WebSocket from 'ws';
import fs from 'fs';

// get the listenurl
export const getCallInfo = async (res) => {
    const message = res.message;

    const assistantId = message.assistant?.id;
    const customerNumber = message.customer?.number;
    const phoneNumberId = message.phoneNumber?.id;

    fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.VAPI_API_PRIV}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "assistantId": assistantId,
            "phoneCallProviderBypassEnabled": true,
            "customer": {
                "number": customerNumber
            },
            "phoneNumberId": phoneNumberId
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Call info:', data);
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

export const getCallStream = (listenUrl) => {
    const ws = new WebSocket(listenUrl);

    ws.on('message', (data, isBinary) => {
        if (isBinary) return;               // drop PCM
        const msg = JSON.parse(data);
        switch (msg.type) {
            case 'transcript':        // full utterance
            case 'speech-update':     // partial / interim text
            case 'status-update':     // in-progress / ended
            case 'tool-calls':        // function-call payloads
                console.log("STREAM", "\n", msg);
        }
    });
};
