import { storageService } from '../../mainApp/services/storage.service.js';
import { utilService } from '../../mainApp/services/util.service.js';

const EMAILS_KEY = 'emails';
var emailsDB = [];
var from = {name: 'Israel', address: 'israel@gmail.com'}

export const emailService = {
    query,
    getEmails,
    getEmailById,
    addEmail,
    removeEmail,
    changeIsReadStatus
}

function query() {
    var emails = storageService.load(EMAILS_KEY);
    if (!emails || emails.length === 0) {
        emails = _createEmails();
        storageService.store(EMAILS_KEY, emails);
    }
    emailsDB = emails;
    return Promise.resolve(emailsDB);
}

function changeIsReadStatus(emailId) {
    let email = _findById(emailId);
    email.isRead = true;

    storageService.store(EMAILS_KEY, emailsDB);

    return Promise.resolve();
}

function _findById(emailId) {
    return emailsDB.find(email => email.id === emailId);
}

function _createEmails() {
    let emails = [
        { from:{name: 'Ella', address: 'ella@gmail.com'}, cc:'ella@gmail.com', subject: 'Wassap?', body: 'lorem Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.' },
        { from:{name: 'Lian', address: 'lian@gmail.com'}, cc:'ella@gmail.com', subject: 'Wassap?', body: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.' }
    ].map(_createEmail)

    return emails
}

function _createEmail(emailDetails) {
    return {
        id: utilService.makeId(),
        from: (emailDetails.from) ? emailDetails.from : from,
        cc: emailDetails.cc,
        subject: emailDetails.subject,
        body: emailDetails.body,
        sentAt: Date.now(),
        isRead: false,
        isStar: false,
        isSentEmail: false,
        isDraft: false,
        isSnoozed: false
    }
}

function addEmail(email) {
    const emailObj = _createEmail(email);
    emailsDB.unshift(emailObj);
    storageService.store(EMAILS_KEY, emailsDB);
    return Promise.resolve();
}

function removeEmail(emailId) {
    const mailIdx = emailsDB.findIndex(email => email.id === emailId);
    emailsDB.splice(mailIdx, 1);
    storageService.store(EMAILS_KEY, emailsDB);
    return Promise.resolve();
}

function getEmails() {
    return Promise.resolve(emailsDB);
}

function getEmailById(emailId) {
    const mail = emailsDB.find(email => email.id === emailId);
    return Promise.resolve(mail);;
}