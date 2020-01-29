import _ from 'lodash';
import { c4cMonthDue, c4cDayDue, hoursRequired, volunteerSignupUrl, checkHoursUrl, submitHoursUrl } from '/config/settings';
import moment from 'moment';

const pluralize = (num, str) => num === 1 ? `${num} ${str}` : `${num} ${str}s`;

export const getMessageStrings = (hoursAlready = 0) => {
  const today = moment();

  const c4cDueOn = moment();
  c4cDueOn.month(c4cMonthDue - 1);
  c4cDueOn.date(c4cDayDue);

  // if it's after the due date we set it to next year
  if (today.isAfter(c4cDueOn)) {
    c4cDueOn.add(1, 'year');
  }

  const monthsUntilDue = c4cDueOn.diff(today, 'months');
  const weeksUntilDue = c4cDueOn.diff(today, 'weeks');
  const daysUntilDue = c4cDueOn.diff(today, 'days');

  if (daysUntilDue <= 6) {
    return {
      cta: `🏆✨💯🌴🏅💪 LESSGOOOO00OoooOOOo`,
      hoursStr: `C4C is upon us! CRUSH IT`,
      weeksRemainingStr: '',
      c4cDate: c4cDueOn.format('MMMM Do'),
      isThisWeek: true,
    }
  }

  const emoji = _.sample(['✨', '🏀', '🏅', '🎾', '🏁', '🏆', '🌴', '☀️', '💯', '😎', '🙌', '💫', '🏐', '🏈', '⚽️', '🥏', '🎮']);
  let hoursStr;
  let cta;

  if (monthsUntilDue >= 6) {
    const hoursPerMonth = Math.ceil((hoursRequired - hoursAlready) / monthsUntilDue * 4) / 4;
    cta = monthsUntilDue > 10 ? `${emoji} *C4C is in ${c4cDueOn.format('MMMM YYYY')}!*`
      : `${emoji} *C4C is ${c4cDueOn.fromNow()}!*`;
    hoursStr = `If you have ${pluralize(hoursAlready, 'hour')} today, you need to volunteer *~${pluralize(hoursPerMonth, 'hour')} each month*`;
  }

  else if (weeksUntilDue >= 7) {
    const hoursPerWeek = Math.ceil((hoursRequired - hoursAlready) / weeksUntilDue * 4) / 4;
    cta = `${emoji} *C4C is ${c4cDueOn.fromNow()}!*`
    hoursStr = `If you have ${pluralize(hoursAlready, 'hour')} today, you need to volunteer *~${pluralize(hoursPerWeek, 'hour')} each week*`;
  }

  else if (daysUntilDue >= 6) {
    const hoursPerDay = Math.ceil((hoursRequired - hoursAlready) / daysUntilDue * 4) / 4;
    cta = `${emoji} Get pumped! C4C weekend is just ${c4cDueOn.fromNow(true)} away.`
    hoursStr = `If you have ${pluralize(hoursAlready, 'hour')} today, you need to volunteer *~${pluralize(hoursPerDay, 'hour')} each day*`;
  }

  return {
    hoursStr,
    cta,
    c4cDate: c4cDueOn.format('MMMM Do'),
    weeksRemainingStr: monthsUntilDue > 6
      ? `C4C is the week of ${c4cDueOn.format('MMMM Do YYYY')}.`
      : `C4C is in ${pluralize(weeksUntilDue, 'week')}.`,
  }
}
