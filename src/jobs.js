import _ from 'lodash';
import Bull from 'bull';
import { redisUrl } from '/config/settings';
import { sendSlack } from '/src/slack-webhook';

const queue = new Bull(`slackbotQueue`, redisUrl);

queue.empty();

queue.process('slackbotQueue', async (job) => {
  await sendSlack();
})

queue.on('completed', (job, result) => {
  console.log('success');
});

export const initJobs = async () => {
  await queue.add('slackbotQueue', {}, {
    repeat: {
      // At 09:00 on Monday in January, February, March, April, May, September, October, November, and December
      // 5pm UTC = 9am PST
      cron: '0 17 * * *'
      // cron: '0 17 * 1,2,3,4,5,9,10,11,12 MON',
    }
  })
}