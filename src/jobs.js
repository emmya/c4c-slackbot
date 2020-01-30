import _ from 'lodash';
import Bull from 'bull';
import { redisUrl } from '/config/settings';
import { sendSlack } from '/src/slack-webhook';

const queue = new Bull(`slackbotQueue`, redisUrl);

queue.process('slackbotQueue', async (job) => {
  await sendSlack();
})

queue.on('completed', (job, result) => {
  console.info('success');
});


export const initJobs = async () => {
  // hacky way to clear bull queue. see github.com/OptimalBits/bull/issues/709
  // neither queue.empty nor queue.clearRepeatableJobs work as expected.
  // -__-
  queue.clean(0, 'delayed');
  queue.clean(0, 'wait');
  queue.clean(0, 'active');
  queue.clean(0, 'completed');
  queue.clean(0, 'failed');
  let multi = queue.multi();
  multi.del(queue.toKey('repeat'));
  multi.exec();

  await queue.add('slackbotQueue', {}, {
    repeat: {
      // At 09:00 PT in January, February, March, April, May, September, October, November, and December
      // 5pm UTC = 9am PST
      // cron: '* * * 1,2,3,4,5,9,10,11,12 THU',
      cron: '* 20 * 1,2,3,4,5,9,10,11,12 THU',
    }
  });

  console.log('added jobs to queue.');
}