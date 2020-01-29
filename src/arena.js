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
});

export default (app) => {
  app.use('/', arenaConfig);
}

