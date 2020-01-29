import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
import initArena from '/src/arena';
import { initJobs } from '/src/jobs';
import { getMessageStrings } from './get-messages';
// import { WebClient } from '@slack/web-api';

const app = express();

initArena(app);

initJobs();

app.set('port', process.env.PORT || 8000);
app.listen(process.env.PORT || app.get('port'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/hrs-needed', async (req, res) => {
  const { text } = req.body || {};
  const hours = parseInt(text) || 0;

  if (hours >= 100) {
    res.status(200).send({
      text: '🤯'
    })
    return;  
  }

  if (hours <= 0) {
    res.status(200).send({
      text: '😒'
    })
    return;  
  }

  if (hours >= 30) {
    res.status(200).send({
      text: _.sample([
        'Sunshine and victory coming your way.',
        'Noice.',
        'Good dawg.',
        '🤩',
        '😎',
      ])
    })
    return;  
  }

  const { weeksRemainingStr, hoursStr } = getMessageStrings(hours);

  res.status(200).send({
    text: `${weeksRemainingStr} ${hoursStr}.`,
  })
});


app.post('/interact', async (req, res) => {
  res.status(200).send();
});


// Below feature requires workspace token
// aka admin permish


// const web = new WebClient([token]);

// app.post('/chat', async (req, res) => {
//   const { challenge, event } = req.body || {};

//   if (challenge) {
//     res.status(200).send({ challenge });
//     return;
//   }

//   const {
//     channel, text,
//   } = event;

//   try {
//     const yo = await web.chat.postMessage({
//     channel,
//       text: 'Sup',
//     });

//   } catch (e) {
//     console.error(e);
//   }

//   res.status(200).send({
//     text: 'Well hi there',
//   })
// });

