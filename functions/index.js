const functions = require('firebase-functions');
const admin = require('firebase-admin');


exports.addUserMessages = functions.database.ref(`/messages/{messageId}`).
onWrite(event => {
    const messageKey = event.data.key;
    const messageValue=event.data.val();


    admin.database().ref(`/user-messages${messageValue.userFromId}/${messageValue.userToId}`).child(messagKey).set(1);
    admin.database().ref(`/user-messages${messageValue.userToId}/${messageValue.userFromId}`).child(messagKey).set(1);
})