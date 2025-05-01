export function convertUnixTimestampToDateString(timestampStr: string): string {
  const timestamp = Number(timestampStr);
  if(isNaN(timestamp)) {
    return new Date().toString();
  }

  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
