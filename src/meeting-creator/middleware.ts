import { Middleware } from 'redux';
import { CREATE_MEETING_COMMAND, MEETING_CREATED_EVENT } from './actions';
import { createEventService } from './service';
import { push } from 'connected-react-router';

export function createMeetingMiddleware(): Middleware {
  const service = createEventService();

  return store => next => action => {
    if (action.type === CREATE_MEETING_COMMAND) {
      service
        .createEvent(action.meeting)
        .then(meeting => {
          store.dispatch({
            type: MEETING_CREATED_EVENT,
            meeting
          });
        })
        .catch(error => {
          console.error('Create meeting failed: ', error);
          store.dispatch(push('/error'));
        });
    }

    if (action.type === MEETING_CREATED_EVENT) {
      store.dispatch(push('/copyMeeting'));
    }
    next(action);
  };
}
