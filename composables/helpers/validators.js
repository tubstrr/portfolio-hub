// Need to circle back to this one
export default {
  required: {
    fn(value) {
      return value !== null && value !== "";
    },
    message: "This field is required.",
  },

  email: {
    fn(value) {
      const re = /^([\w\.!#\$%\-+.'_]+@[A-Za-z0-9\-]+(\.[A-Za-z0-9\-]+)+)$/;
      return value && value.match(re);
    },
    message: "Please enter a valid email address.",
  },

  phone: {
    fn(value) {
      const re = /\(\d{3}\) \d{3}-\d{4}/;
      return value && value.match(re);
    },
    message: "Please enter a valid phone number.",
  },

  date: {
    fn(value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) return false;
      return true;
    },

    message: "Please enter a date in the format MM/DD/YYYY",
  },

  zip: {
    fn(value) {
      const re = /^[0-9]{5}(?:-[0-9]{4})?$/;
      return value && value.match(re);
    },
    message: "Please enter a valid US ZIP code.",
  },

  alphaSpace: {
    fn(value) {
      const re = /[a-zA-Z-'\s]*/;
      return value && value.match(re);
    },
    message: "Can only contain a-z, A-Z, and spaces.",
  },
};
