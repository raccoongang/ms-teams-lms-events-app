import { OnlineMeetingInput, OnlineMeeting } from './models';
import { msalApp } from '../auth/msalApp';
import axios from 'axios';
import moment from 'moment';

export function createEventService() {
  return {
    async createEvent(meeting: OnlineMeetingInput) {
      let token;
      try {
        token = await msalApp.acquireTokenSilent({
          scopes: ['Calendars.ReadWrite']
        });
      } catch (ex) {
        token = await msalApp.acquireTokenPopup({
          scopes: ['Calendars.ReadWrite']
        });
      }

      const requestBody = {
          "subject": meeting.subject,
          "body": {
            "contentType": "HTML",
            "content": meeting.content
          },
          "start": {
              "dateTime": meeting.startDateTime?.toISOString(),
              "timeZone": "Arabia Standard Time"
          },
          "end": {
              "dateTime": meeting.endDateTime?.toISOString(),
              "timeZone": "Arabia Standard Time"
          },
          "location":{
              "displayName":  meeting.location
          },
          "attendees": [],
          "isOnlineMeeting": true,
          "onlineMeetingProvider": "teamsForBusiness"
      };

      const response = await axios.post(
        'https://graph.microsoft.com/beta/me/calendar/events',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            'Content-type': 'application/json'
          }
        }
      );
      const preview = response.data.subject +  '<br><br>' + response.data.body.content.replaceAll(
        'noreferrer',
        ''
      );

      const createdMeeting = {
        id: response.data.id,
        creationDateTime: moment(response.data.createdDateTime),
        subject: response.data.subject,
        joinUrl: response.data.joinUrl,
        joinWebUrl: response.data.joinUrl,
        startDateTime: moment(response.data.start?.dateTime),
        endDateTime: moment(response.data.end?.dateTime),
        conferenceId: response.data.onlineMeeting?.conferenceId || '',
        tollNumber: response.data.onlineMeeting?.tollNumber || '',
        tollFreeNumber: response.data.onlineMeeting?.tollFreeNumber || '',
        dialinUrl: response.data.onlineMeeting?.dialinUrl || '',
        videoTeleconferenceId: response.data.videoTeleconferenceId,
        content: response.data.body.content,
        preview
      } as OnlineMeeting;

      return createdMeeting;
    }
  };
}
