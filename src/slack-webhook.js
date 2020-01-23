import _ from 'lodash';
import { IncomingWebhook } from '@slack/webhook';
import { slackWebhookUrl, c4cMonthDue, c4cDayDue, hoursRequired, volunteerSignupUrl, checkHoursUrl, submitHoursUrl } from '/config/settings';
import moment from 'moment';

const webhook = new IncomingWebhook(slackWebhookUrl);

const pluralize = (num, str) => num === 1 ? `${num} ${str}` : `${num} ${str}s`;

const getDates = () => {
  const today = moment();

  const c4cDueOn = moment();
  c4cDueOn.month(c4cMonthDue);
  c4cDueOn.day(c4cDayDue);

  const emoji = _.sample(['✨', '🏀', '🏅', '🎾', '🏁', '🏆', '🌴', '💯', '😎', '🙌', '💫', '🏐', '🏈', '⚽️', '🥏', '🎮']);

  // if it's after the due date we set it to next year
  if (today.isAfter(c4cDueOn)) {
    c4cDueOn.add(1, 'year');
  }

  const monthsUntilDue = c4cDueOn.diff(today, 'months');
  const weeksUntilDue = c4cDueOn.diff(today, 'weeks');
  const daysUntilDue = c4cDueOn.diff(today, 'days');

  let hoursStr;
  let cta;

  if (monthsUntilDue >= 6) {
    const hoursPerMonth = Math.ceil(hoursRequired / monthsUntilDue * 2) / 2;
    hoursStr = `If you have 0 hours today, you need to volunteer *${pluralize(hoursPerMonth, 'hour')} each month* until C4C.`;
  }

  else if (weeksUntilDue >= 3) {
    const hoursPerWeek = Math.ceil(hoursRequired / weeksUntilDue * 2) / 2;
    cta = `${emoji} C4C is ${c4cDueOn.fromNow()}!`
    hoursStr = `If you have 0 hours today, you need to volunteer *${pluralize(hoursPerWeek, 'hour')} each week* until C4C.`;
  }

  else if (daysUntilDue >= 6) {
    const hoursPerDay = Math.ceil(hoursRequired / daysUntilDue * 2) / 2;
    cta = `${emoji} Get pumped! C4C weekend is just ${c4cDueOn.fromNow(true)} away.`
    hoursStr = `If you have 0 hours today, you need to volunteer *${pluralize(hoursPerDay, 'hour')} each day* until C4C.`;
  }

  else {
    cta = `🏆✨💯🌴🏅💪 LESSGOOOO00OoooOOOo`
    hoursStr = `C4C is upon us! CRUSH IT`;
  }

  return {
    hoursStr,
    cta,
  }
}

export const sendSlack = async () => {
  const { hoursStr, cta } = getDates();
  await webhook.send({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: cta,
          emoji: true,
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: hoursStr,
        }
      }, {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              emoji: true,
              text: 'Sign up to volunteer!',
            },
            style: 'primary',
            url: volunteerSignupUrl,
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              emoji: true,
              text: 'Check/report your hours',
            },
            url: submitHoursUrl,
          }
        ]
      }
    ]
  });
}

