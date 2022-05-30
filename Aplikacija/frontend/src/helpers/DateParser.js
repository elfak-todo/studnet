export const timeSrp = (databaseDate) => {
  const date = new Date(databaseDate);

  const time = date.toLocaleTimeString("srp", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};

export const timeEng = (databaseDate) => {
  const date = new Date(databaseDate);

  const time = date.toLocaleTimeString("eng", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};

export const dateSrp = (databaseDate) => {
  const date = new Date(databaseDate);

  const dateSerbian = date.toLocaleString("srp", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dateSerbian;
};

export const dateEng = (databaseDate) => {
  const date = new Date(databaseDate);

  const dateEnglish = date.toLocaleString("eng", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dateEnglish;
};

export const parseDate = (databaseDate, language) => {
  const date = new Date(databaseDate);

  const dSrp = dateSrp(databaseDate);
  const dEng = dateEng(databaseDate);
  const tSrp = timeSrp(databaseDate);
  const tEng = timeEng(databaseDate);

  const dateToday = new Date();

  let today = false;
  let yesterday = false;

  if (
    date.getDate() === dateToday.getDate() &&
    date.getMonth() === dateToday.getMonth() &&
    date.getFullYear() === dateToday.getFullYear()
  ) {
    today = true;
  } else if (
    date.getDate() === dateToday.getDate() - 1 &&
    date.getMonth() === dateToday.getMonth() &&
    date.getFullYear() === dateToday.getFullYear()
  ) {
    yesterday = true;
  }

  if (today) {
    if (language === "sr") {
      return "Danas u " + tSrp;
    } else {
      return "Today at " + tEng;
    }
  }

  if (yesterday) {
    if (language === "sr") {
      return "Juče u " + tSrp;
    } else {
      return "Yesterday at " + tEng;
    }
  }

  if (language === "sr") {
    return dSrp;
  } else {
    return dEng;
  }
};
