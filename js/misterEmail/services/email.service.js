import {storageService} from '../../mainApp/services/storage.service'

const EMAILS_KEY = 'emails';
var emailsDB = [];

export const emailService = {
    query,
    getEmails,
    getEmailById,
    addEmail,
    removeEmail
}

function query() {
    var emails = storageService.load(EMAILS_KEY);
    if (!emails) {
        emails = _createEmails();
        storageService.store(EMAILS_KEY, emails);
    }
    emailsDB = emails;
    return Promise.resolve(emailsDB);
}

function _createEmails() {
    let emails = [
        {from: {name: 'Ella', address: 'ella@gmail.com'}, subject:'Wassap?', body: 'Pick up!'},
        {from: {name: 'Lian', address: 'lian@gmail.com'}, subject:'Wassap?', body: 'Pick up!'}
    ].map(_createEmail)

    return emails
}

function _createEmail(emailDetails) {
    return {
        from: emailDetails.from,
        subject: emailDetails.body,
        isRead: false,
        sentAt: Date.now()
    }
}

function addEmail(email) {
    emailsDB.unshift(email);
    storageService.store(EMAILS_KEY, emails);
    Promise.resolve();
}

function removeEmail(emailId) {
    const mailIdx = emailsDB.findIndex(email=> email.id === emailId);
    emailsDB.splice(mailIdx, 1);
    storageService.store(EMAILS_KEY, emailsDB);
    return Promise.resolve();
}

function getEmails() {
    return emailsDB;
}

function getEmailById(emailId) {
    const mail = emailsDB.find(email=> email.id === emailId);
    return mail;
}
