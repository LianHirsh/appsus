import { storageService } from '../../mainApp/services/storage.service.js';
import { utilService } from '../../mainApp/services/util.service.js';

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
    if (!emails || emails.length === 0) {
        emails = _createEmails();
        storageService.store(EMAILS_KEY, emails);
    }
    emailsDB = emails;
    return Promise.resolve(emailsDB);
}

function _createEmails() {
    let emails = [
        { from: { name: 'Ella', address: 'ella@gmail.com' }, subject: 'Wassap?', body: 'lorem Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.' },
        { from: { name: 'Lian', address: 'lian@gmail.com' }, subject: 'Wassap?', body: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.' }
    ].map(_createEmail)

    return emails
}

function _createEmail(emailDetails) {
    return {
        id: utilService.makeId(),
        from: emailDetails.from,
        subject: emailDetails.subject,
        body: emailDetails.body,
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
    return mail;
}