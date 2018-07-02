export function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export function formatStringToISODate(strDate) {
  try {
    const isoDate = `${strDate.replace(' ', 'T')}Z`;
    const date = new Date(isoDate);
    return date;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function formatTimeToAPString(date_obj) {
  // formats a javascript Date object into a 12h AM/PM time string
  let hour = date_obj.getHours();
  let minute = date_obj.getMinutes();
  const amPM = (hour > 11) ? 'PM' : 'AM';
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = '12';
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute} ${amPM}`;
}
