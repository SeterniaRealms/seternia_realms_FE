const formatDate = (date: string | Date, addedDays?: number): string => {
  let toDate = new Date(date);
  toDate.setDate(toDate.getDate() + (addedDays ? addedDays : 1));
  return new Intl.DateTimeFormat("pt-BR").format(toDate);
};

export default formatDate;
