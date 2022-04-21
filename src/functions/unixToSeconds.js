export function unixToSeconds(unixTimestamp) {
  let diff = new Date().getTime() - unixTimestamp * 1000;
  diff /= 1000;
  if (diff / 60 < 1) return parseInt(diff) + " seconds ago";
  diff /= 60;
  if (diff / 60 < 1) return parseInt(diff) + " minutes ago";
  diff /= 60;
  if (diff / 24 < 1) return parseInt(diff) + " hours ago";
  diff /= 24;
  if (diff / 7 < 1) return parseInt(diff) + " days ago";
  let week = 0;
  while (week < 4) {
    week += 1;
    if (diff / 7 < 1) return week + " weeks ago";
    diff /= 7;
  }
  let month = 0;
  while (month < 12) {
    month += 1;
    if (diff / 30 < 1) return month + " months ago";
    diff /= 30;
  }
  return "long months ago";
}

export function unixToDate(unixTimestamp) {
  let dateObj = new Date(unixTimestamp * 1000);
  return dateObj.toDateString().slice(3);
}
