import moment from 'moment';

export function ConvertDate(date: string) {
  const convertDate: Date = new Date(date);
  const formattedDate: string = convertDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  return formattedDate;
}

export function ConvertTime(date: string) {
  var d = new Date(date);
  return moment(
    d.getUTCHours().toString() + ':' + d.getUTCMinutes().toString(),
    'hh:mm a'
  ).format('hh:mm a');
}


export function ConvertDateToApiFormat(date: Date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const fommatedDate = `${year}-${month}-${day}` //`${day}-${month}-${year}`

  return fommatedDate;
}
export function FormatDate(date: string) {
  const inputDate = new Date(date);
  const formattedDate = `${(inputDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${inputDate
    .getDate()
    .toString()
    .padStart(2, '0')}-${inputDate.getFullYear()}`;
  return formattedDate;
}
