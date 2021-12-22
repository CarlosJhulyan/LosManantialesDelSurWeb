const formatDateToDatetime = (date) => {
  date.toLocaleString().slice(0, 19).replace('T', ' ');
  return date;
}

export default formatDateToDatetime;