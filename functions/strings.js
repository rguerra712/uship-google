const deepFreeze = require('deep-freeze');

const general = {
  "noInputs": [
    "I didn't hear that.",
    "If you're still there, say that again.",
    "We can stop here. See you soon."
  ],
  "unhandled": "Welcome to uShip's find loads app!"
};

module.exports = deepFreeze({
  general
});
