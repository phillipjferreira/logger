import _ from 'lodash';

export const createLoadingSelector = (actions) => (state) => {
  // false if empty
  // true if loading state has actions
  // returns false only when all actions is not loading (false)

  return (
    !state.loading ||
    Object.keys(state.loading).length === 0 ||
    actions.some((element) => !Object.keys(state.loading).includes(element)) ||
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

export const createBurndownChartSelector = () => ({ sprints, tickets }) => {
  // Take in state.sprints.sprintHistory and tickets in sprint
  if (sprints.sprintHistory.history && sprints.sprintHistory.sprint) {
    const sprint = sprints.sprintHistory.sprint;

    let sp = 0;
    tickets.tickets.forEach((ticket) => {
      if (ticket.storyPoint) {
        sp += Number(ticket.storyPoint);
      }
    });

    let output = [{ t: sprint.startDate, y: sp, name: 'Start' }];
    sprints.sprintHistory.history.forEach((history) => {
      if (history.diff.status[1] === 'Done' && history.storyPoint) {
        sp = sp - Number(history.storyPoint);
      } else if (history.diff.status[0] === 'Done' && history.storyPoint) {
        sp = sp + Number(history.storyPoint);
      }
      output.push({ t: history.createdAt, y: sp, name: history.name });
    });
    // Return data object for chart in format [ {t: Date(createdAt), y:  spValue(totalSp of sprint - sp changes)} ]
    return { chartData: output, sprint: sprint };
  }
};
