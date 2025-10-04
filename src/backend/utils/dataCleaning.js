/**
 * Clean and preprocess data.
 * @param {Array} data - The raw data to clean.
 * @returns {Array} - The cleaned data.
 */
const cleanData = (data) => {
  // Example: Remove null values and outliers
  return data.filter((item) => item !== null && item >= 0 && item <= 100);
};

/**
 * Impute missing values in the data.
 * @param {Array} data - The data with missing values.
 * @returns {Array} - The data with imputed values.
 */
const imputeMissingValues = (data) => {
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
  return data.map((item) => (item === null ? mean : item));
};

module.exports = { cleanData, imputeMissingValues };