const {dev} = require("./common");

module.exports = dev
    ? "inline-source-map"
    : "";