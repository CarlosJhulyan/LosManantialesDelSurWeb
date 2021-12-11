export default (date) => {
  date.toLocaleString().slice(0, 19).replace('T', ' ');
  return date;
}