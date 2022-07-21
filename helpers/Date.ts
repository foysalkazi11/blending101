export const getDateOnly = (date: Date) => {
  const d = new Date();
  let diff = d.getTimezoneOffset();

  let difference = -diff / 60;
  return new Date(date.setHours(difference, 0, 0, 0)).toISOString();
};
