import express from 'express';
import 'dotenv/config';
import { getCallInfo, getCallStream } from './scam-vapi-listen.js';

const app = express();
app.use(express.json({ limit: '2mb' }));

app.post('/', (req, res) => {
  // console.log('📬 Received request:', req.body.listenURL);
  const { type, call, status } = req.body.message || {};
  if (!call?.id) return res.sendStatus(400);

  // First event for an inbound call:
  console.log(req.body.message);
  getCallStream(req.body.message.call.monitor.listenUrl)

  // Final event carrying the summary & transcript:
  if (type === 'end-of-call-report') {
    console.log('✅ Summary for', call.id, '\n', req.body.message.summary);
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on http://localhost:${process.env.PORT}`)
);
