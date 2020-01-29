import { IncomingWebhook } from '@slack/webhook';
import { slackWebhookUrl, volunteerSignupUrl, checkHoursUrl, submitHoursUrl } from '/config/settings';
import { getMessageStrings } from './get-messages';

const webhook = new IncomingWebhook(slackWebhookUrl);

export const sendSlack = async () => {
  const { hoursStr, cta, isThisWeek, c4cDate } = getMessageStrings(0);
  try {
    await webhook.send( isThisWeek ? {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: cta,
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: hoursStr,
          }
        },
      ]
    } : {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${cta}`,
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${hoursStr} until C4C.`,
          }
        },
        {
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
            },
          ]
        },
        {
          "type": "divider"
        },
        {
          type: 'context',
          elements: [
          // {
          //   type: 'mrkdwn',
          //   text: `${hoursStr} until C4C.`,
          // }, 
          {
            // text: {
              type: 'mrkdwn',
              text: `Ask based on your hours by entering "/c4c [hours you've completed]".`,
            // }
          }]
        }, 
      ]
    });
  } catch (e) {
    console.log(e);
  }
}

