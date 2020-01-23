// hacky way of importing a local settings file that won't be present
// in repo or prod environments
let devSettings = {}
try {
  const ds = require('./dev.settings.js');
  devSettings = (ds || {}).default || ds;
} catch (e) {}

export const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
export const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || devSettings.slackWebhookUrl;

export const c4cMonthDue = process.env.MONTH_DUE || 4;
export const c4cDayDue = process.env.MONTH_DUE || 13;
export const hoursRequired = process.env.HOURS_REQUIRED || 30;
export const volunteerSignupUrl = process.env.SIGNUP_URL || 'https://docs.google.com/spreadsheets/d/1dZLyfR80DrheDvfmRrTf2Rgp7JMBLZZwh4LpxGKTf0w/edit';
export const checkHoursUrl = process.env.CHECK_URL || 'https://docs.google.com/spreadsheets/d/17xm8q8UMrPr-yw2B35QQ3-2stXkwiXY90h99h7G-Nm0/edit#gid=115314881';
export const submitHoursUrl = process.env.SUBMIT_URL || 'https://www.uwfostermbaa.com/challenge-for-charity';