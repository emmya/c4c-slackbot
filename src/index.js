import _ from 'lodash';
import express from 'express';
import initArena from '/src/arena';
import { initJobs } from '/src/jobs';
import { sendSlack } from '/src/slack-webhook';
import bodyParser from 'body-parser';
import { getMessageStrings } from './get-messages';
// import { WebClient } from '@slack/web-api';

const app = express();

// sendSlack();

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
        'You need 0 hours. But you knew that already.',
        // 'You found the golden ticket 🎟',
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





// app.post('/chat', async (req, res) => {
//   console.log(req.body);

//   const { challenge, event } = req.body || {};
//   // const hours = parseInt(text) || 0;
//   // const { weeksRemainingStr, hoursStr } = getMessageStrings(hours);
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

//     console.log(yo);
//   } catch (e) {
//     console.error(e);
//   }

//   res.status(200).send({
//     text: 'Well hi there',
//   })
// });

