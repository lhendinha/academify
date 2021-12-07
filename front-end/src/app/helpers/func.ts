export function toISOFormat(newDate: Date) {
  // adjust 0 before single digit date
  let date = ("0" + newDate.getDate()).slice(-2);

  // current month
  let month = ("0" + (newDate.getMonth() + 1)).slice(-2);

  // current year
  let year = newDate.getFullYear();

  // current hours
  let hours = newDate.getHours();

  // current minutes
  let minutes = newDate.getMinutes();

  // current seconds
  let seconds = newDate.getSeconds();

  // prints date & time in MM-DD-YYYY HH:MM:SS format
  return month + "/" + date + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
}
