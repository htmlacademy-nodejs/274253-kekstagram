const ValidationError = require(`../errors/validation-error`);
const utils = require(`../utils`);
const {checkHastagsField, checkScaleField, checkDescriptionField} = utils;

const validate = (data) => {
  const errors = [];
  if (!data.filename) {
    errors.push(`Field 'filename' is required. It should be image formatted jpg || png`);
  }
  if (!data.scale) {
    errors.push(`Field 'scale' is required`);
  }
  if (checkScaleField(data.scale)) {
    errors.push(`Field 'scale' should be a number 1 < 100`);
  }
  if (!data.effect) {
    errors.push(`Field 'effect' is required`);
  }
  if (data.hashtags && checkHastagsField(data.hashtags)) {
    errors.push(`Fields '${data.hashtags}' should started with # and be less than 20ch`);
  }
  if (data.description && checkDescriptionField(data.description)) {
    errors.push(`Field 'description' should be less than 140ch`);
  }
  if (!data.date) {
    data.date = `${Date.now()}`;
  }
  if (errors.length > 0) {
    throw new ValidationError(errors.join(`\n`));
  }
  data.url = `api/posts/${data.date}/image`;
  return data;
};

module.exports = validate;
