export const timeSrp = (databaseDate) => {
  const date = new Date(databaseDate);

  const time = date.toLocaleTimeString("sr-Latn", {
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

export const justTime = (databaseDate, lang) => {
  const date = new Date(databaseDate);

  const timeSrb = date.toLocaleTimeString("sr-Latn", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const timeEng = date.toLocaleTimeString("eng", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (lang === "sr") return timeSrb;
  else if (lang === "en") return timeEng;
};

export const dateSrp = (databaseDate) => {
  const date = new Date(databaseDate);

  const dateSerbian = date.toLocaleString("sr-Latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dateSerbian;
};

export const justDate = (databaseDate, lang) => {
  const date = new Date(databaseDate);

  const dateSerbian = date.toLocaleString("sr-Latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dateEnglish = date.toLocaleString("eng", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (lang === "sr") return dateSerbian;
  else if (lang === "en") return dateEnglish;
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
  } else {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    if (yesterdayDate.toDateString() === date.toDateString()) {
      yesterday = true;
    }
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
