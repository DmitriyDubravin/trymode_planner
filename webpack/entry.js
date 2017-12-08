const {dev} = require("./common");

module.exports = dev
    ? ["babel-polyfill", "./dev/js/main.js"]
    : ["babel-polyfill", "./js/main.js"];