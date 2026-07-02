module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/support/**/*.ts', 'tests/step-definitions/**/*.ts'],
    format: ['progress', 'allure-cucumberjs/reporter'],
    formatOptions: { resultsDir: 'allure-results' },
    paths: ['tests/features/**/*.feature'],
  },
};