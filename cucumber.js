module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/support/**/*.ts', 'tests/step-definitions/**/*.ts'],
    format: ['allure-cucumberjs/reporter', 'html:cucumber-report.html', 'progress'],
    formatOptions: { resultsDir: 'allure-results' },
    paths: ['tests/features/**/*.feature'],
  },
};