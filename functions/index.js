'use strict';

const { ApiAiApp } = require('actions-on-google');
const functions = require('firebase-functions');
const strings = require('./strings');

const Actions = {
  UNRECOGNIZED_DEEP_LINK: 'deeplink.unknown',
  FIND_LOADS: 'find.loads',
  FIND_LOADS_BY: 'find.loads.by'
};

const initData = app => {
    /** @type {AppData} */
    const data = app.data;
    if (!data.loads) {
    data.loads = {
        content: {},
        loads: null
    };
    }
    return data;
};

/**
 * Greet the user and direct them to next turn
 * @param {ApiAiApp} app ApiAiApp instance
 * @return {void}
 */
const unhandledDeepLinks = app => {
  /** @type {string} */
  const rawInput = app.getRawInput();
  const response = sprintf(strings.general.unhandled, rawInput);
  /** @type {boolean} */
  const screenOutput = app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT);
//   if (!screenOutput) {
//     return app.ask(response, strings.general.noInputs);
//   }
  const richResponse = app.buildRichResponse()
    .addSimpleResponse(response);

  app.ask(richResponse, strings.general.noInputs);
};

const findLoads = app => {
    const data = initData(app);
    const richResponse = app.buildRichResponse()
      .addSimpleResponse("I hear you", strings.general.noInputs)
      //.addSuggestions(strings.general.suggestions.confirmation)
      ;
    app.ask("I hear you", strings.general.noInputs);
}

const findLoadsBy = findLoads;

const actionMap = new Map();
actionMap.set(Actions.UNRECOGNIZED_DEEP_LINK, unhandledDeepLinks);
actionMap.set(Actions.FIND_LOADS, findLoads);
actionMap.set(Actions.FIND_LOADS_BY, findLoadsBy);

exports.uship = functions.https.onRequest((request, response) => {
  const app = new ApiAiApp({ request, response });
  app.handleRequest(actionMap);
});
