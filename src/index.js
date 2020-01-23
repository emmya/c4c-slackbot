import express from 'express';
import initArena from '/src/arena';
import { initJobs } from '/src/jobs';
import { sendSlack } from '/src/slack-webhook';

const app = express();

initArena(app);
initJobs();

sendSlack();

app.listen(app.get('port'));


