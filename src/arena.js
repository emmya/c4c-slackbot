import Arena from 'bull-arena';
import { redisUrl } from '/config/settings';

const arenaConfig = Arena({
  queues: [{
    name: `slackbotQueue`,
    hostId: 'webapp',
    redis: {
      url: redisUrl,
    },
}]}, {
  basePath: '/arena',
  // // Let express handle the listening.
  // disableListen: true,
});

export default (app) => {
  app.use('/', arenaConfig);
}

