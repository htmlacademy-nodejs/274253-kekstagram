const ValidationError = require(`../errors/validation-error`);

const validate = (data) => {
  const errors = [];

  if (!data.date) {
    errors.push(`Field 'date' is required`);
  }
  if (!/^\d+$/.test(data.date)) {
    errors.push(`Field 'date' should be a number`);
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return data;
};

module.exports = validate;