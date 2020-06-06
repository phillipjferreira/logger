import _ from 'lodash';

export const createLoadingSelector = (actions) => (state) => {
  //false if empty //true if loading state has actions
  // returns true only when all actions is not loading
  return (
    !state.loading ||
    Object.keys(state.loading).length == 0 ||
    actions.some((action) => state.loading[action])
  );
};

export const createErrorMessageSelector = (actions) => (state) => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  return (
    _(actions)
      .map((action) => _.get(state, `api.error.${action}`))
      .compact()
      .first() || ''
  );
};
