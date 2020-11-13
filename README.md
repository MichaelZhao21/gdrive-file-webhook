# Google Drive Push Notifications

The official guide is located [here](https://developers.google.com/drive/api/v3/push#understanding-drive-api-notification-events)

The Google Drive API allows for a user to listen for file changes and assign a webhook that will automatically POST changes to an endpoint.

## Config

Write the following variables to a `.env` file:

```
PRIVATE_KEY=[private key from Google Cloud service account]
CLIENT_EMAIL=[email from Google Cloud service account]
FILE_ID=[ID of file to listen to]
RES_ID=[Resource ID that's gotten after creating a listener (need for deletion)]
ACTION=[CREATE or DELETE]
HOOK_ID=[Unique ID for your webhook (max 64 characters, preferably UUID but can be any string)]
URI=[Endpoint for Google API to make POST request to]
```