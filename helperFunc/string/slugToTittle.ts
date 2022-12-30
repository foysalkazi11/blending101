const slugToTitle = (str: string) => {
  return str
    .split("-")
    .join(" ")
    .replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export default slugToTitle;
