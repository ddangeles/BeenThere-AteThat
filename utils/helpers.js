module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    },
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        new Date(date).getFullYear()
      }`;
    },
  };