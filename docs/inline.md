<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [boomifyError][1]
-   [createNotification][2]
-   [createNotifications][3]
-   [deleteVoiceNoteNotification][4]
-   [downloadVoiceNote][5]
-   [errorHandler][6]
-   [getNotification][7]
-   [getNotifications][8]
-   [getUpcomingCustomers][9]
-   [handleMulterError][10]
-   [markNotificationAsRead][11]
-   [notifyCustomers][12]
-   [parseBoolean][13]
-   [streamVoiceNote][14]
-   [uploadVoiceNote][15]

## boomifyError

Express middleware to convert the propagated error to Boom error.
Use this middleware as the first middleware after all routers.

### Parameters

-   `err` **[Error][16]** Express caught error
-   `req` **[Request][17]** Express request object
-   `res` **[Response][18]** Express response object
-   `next` **[Function][19]** Express next function

### Examples

```javascript
// Mount an endpoint on the express app
app.use('/', (req, res, next) => res.status(200).json("Ok"))
// Mount the boomifyError middleware before any other error handeling middleware
app.use(boomifyError)
```

## createNotification

Create a new notification

### Parameters

-   `senderId` **[String][20]** sender id
-   `recieverId` **[String][20]** reciever id
-   `voiceNotePath` **[String][20]** audio file path or key in cloud storage

## createNotifications

Batch create notifications multiple recipients

### Parameters

-   `senderId` **[String][20]** sender id
-   `recieverIds` **[Array][21]** list of reciever ids
-   `voiceNotePath` **[String][20]** audio file path or key in cloud storage

## deleteVoiceNoteNotification

Delete all notifications of a certain voicenote

### Parameters

-   `voiceNotePath` **[String][20]** voicenote id or full path in the cloud storage

## downloadVoiceNote

Downloads the voice note with the given key from Cloud Storage

### Parameters

-   `key` **[String][20]** file full path or name

### Examples

```javascript
downloadVoiceNote('clip.ogg')
```

## errorHandler

Express middleware to handle errors.
This is typically the last middleware in the application.

### Parameters

-   `err` **[Error][16]** Express caught error
-   `req` **[Request][17]** Express request object
-   `res` **[Response][18]** Express response object
-   `next` **[Function][19]** Express next function

### Examples

```javascript
app.use(errorHandler)
```

## getNotification

Get a notification using the notification id

### Parameters

-   `id` **[String][20]** notification document id

## getNotifications

List notifications

### Parameters

-   `recieverId` **[String][20]** filter by recieverId
-   `limit` **[Number][22]** number of notifications to return
-   `after` **[String][20]** pagination key \_id property of notification document
-   `read` **[Boolean][23]** filter by the read flag, if not specified it will return all the notifications

## getUpcomingCustomers

Fetch the upcoming customers in a particular schedule for a certain pilot

### Parameters

-   `pilotId` **[String][20]** 
-   `scheduleId` **[String][20]** 

Returns **[Array][21]&lt;[String][20]>** customer Ids

## handleMulterError

Express middleware to catch multer errors, convert the error to Boom error and set the statusCode to 400.
Use this middleware after the endpoints that use Multer.

### Parameters

-   `err` **[Error][16]** Express caught error
-   `req` **[Request][17]** Express request object
-   `res` **[Response][18]** Express response object
-   `next` **[Function][19]** Express next function

### Examples

```javascript
app.use(handleMulterError)
```

## markNotificationAsRead

Mark a notification as read.

### Parameters

-   `notification` **[Notification][24]** Mongoose document

## notifyCustomers

Send a notification to all upcoming customers in a delivery schedule through both push notifications and sockets

### Parameters

-   `data` **[Object][25]** notification data
    -   `data.pilotId` **[String][20]** pilot id
    -   `data.scheduleId` **[String][20]** schedule id
    -   `data.voiceNote` **[Object][25]** voice note data
        -   `data.voiceNote.buffer` **[Buffer][26]** audio buffer

## parseBoolean

Parse boolean from a string

### Parameters

-   `str` **[String][20]** string to be parsed eg. 'true', 'True', 'FALSE'

Returns **([Boolean][23] | null)** returns Boolean if success otherwise null

## streamVoiceNote

Creates a read stream from the voice note with the given key from cloud storage

### Parameters

-   `key` **[String][20]** file full path or name

### Examples

```javascript
// pipe the stream into a file on the file-system
streamVoiceNote('clip.ogg').pipe(file)
```

Returns **ReadableStream** 

## uploadVoiceNote

-   **See: [ AWS documentation][27]**

Upload a voice note to Cloud Storage

### Parameters

-   `buffer` **[Buffer][26]** file buffer
-   `key` **[String][20]** file full path or name

### Examples

```javascript
const clip = fs.readFileSync('./recording1.ogg')
uploadVoiceNote(clip, 'clip.ogg')
```

[1]: #boomifyerror

[2]: #createnotification

[3]: #createnotifications

[4]: #deletevoicenotenotification

[5]: #downloadvoicenote

[6]: #errorhandler

[7]: #getnotification

[8]: #getnotifications

[9]: #getupcomingcustomers

[10]: #handlemultererror

[11]: #marknotificationasread

[12]: #notifycustomers

[13]: #parseboolean

[14]: #streamvoicenote

[15]: #uploadvoicenote

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error

[17]: https://developer.mozilla.org/Add-ons/SDK/High-Level_APIs/request

[18]: https://developer.mozilla.org/docs/Web/Guide/HTML/HTML5

[19]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[21]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[22]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[23]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[24]: https://developer.mozilla.org/docs/Web/API/Notification/Using_Web_Notifications

[25]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[26]: https://nodejs.org/api/buffer.html

[27]: https://docs.aws.amazon.com/AmazonS3/latest/dev/optimizing-performance.html
