import * as ACTIONS from '../actions/puzzle';

export default function asyncCalls({ dispatch }) {
  return (next) => (action) => {
    const nextAction = next(action);

    if (!window.navigator.onLine) {
      return nextAction;
    }

    // Set loading state on special named actions
    if (action.type.match('_CALL')) {
      dispatch({
        type: ACTIONS.LOADING,
        loading: true
      });
    }

    // Set loading state off special named actions
    if (action.type.match('_RESULT')) {
      dispatch({
        type: ACTIONS.LOADING,
        loading: false
      });
    }

    if (action.type === ACTIONS.CHANGE_BACKGROUND_CALL) {
      fetch('https://source.unsplash.com/random/320x320')
        .then(res => (
          dispatch({
            type: ACTIONS.CHANGE_BACKGROUND_RESULT,
            bg: res.url
          })
        ));
    }

    return nextAction;
  };
}
