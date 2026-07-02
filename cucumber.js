module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/support/**/*.ts', 'tests/step-definitions/**/*.ts'],
    format: ['progress', 'allure-cucumberjs/reporter', 'html:cucumber-report.html'],
    formatOptions: { resultsDir: 'allure-results' },
    paths: ['tests/features/**/*.feature'],
  },
};