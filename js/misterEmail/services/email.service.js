import { storageService } from '../../mainApp/services/storage.service.js';
import { utilService } from '../../mainApp/services/util.service.js';

const EMAILS_KEY = 'emails';
var emailsDB = [];
var from = { name: 'Israel', address: 'israel@gmail.com' }

export const emailService = {
    query,
    getEmails,
    getEmailById,
    addEmail,
    removeEmail,
    changeIsReadStatus,
    changeStare,
    changeSnoozedStatus,
    changeSentStatus,
    changeDraftStatus,
    filterEmailsBySearch
}

function query(emailType) {
    var emails = storageService.load(EMAILS_KEY);
    if (!emails || emails.length === 0) {
        emails = _createEmails();
        storageService.store(EMAILS_KEY, emails);
    }
    emailsDB = emails;

    let sortedEmails = filterEmails(emailType);

    return Promise.resolve(sortedEmails);
}

function filterEmails(emailType) {
    const sortedEmails = emailsDB.filter(email => {
        if (emailType === 'starred' && email.isStar) {
            return email;
        } else if (emailType === 'snoozed' && email.isSnoozed) {
            return email;
        } else if (emailType === 'sentMail' && email.isSentEmail) {
            return email;
        } else if (emailType === 'drafts' && email.isDraft) {
            return email;
        } else if (emailType === 'inbox' && !email.isDraft && !email.isSentEmail) {
            return email;
        }
    });

    return sortedEmails;
}

function changeIsReadStatus(emailId, isUserRead) {
    let email = _findById(emailId);

    if (isUserRead) {
        email.isRead = true;
    } else {
        email.isRead = !email.isRead;
    }

    storageService.store(EMAILS_KEY, emailsDB);

    return Promise.resolve();
}

function changeStare(emailId) {
    let email = _findById(emailId);
    email.isStar = !email.isStar;

    storageService.store(EMAILS_KEY, emailsDB);

    return Promise.resolve();
}

function changeSnoozedStatus(emailId) {
    let email = _findById(emailId);
    email.isSnoozed = !email.isSnoozed;

    storageService.store(EMAILS_KEY, emailsDB);

    return Promise.resolve();
}

function changeDraftStatus(emailId) {
    let email = _findById(emailId);
    email.isDraft = !email.isDraft;

    storageService.store(EMAILS_KEY, emailsDB);

    return Promise.resolve();
}

function changeSentStatus(emailId) {
    console.log(emailId)
    let email = _findById(emailId);
    console.log(email)
    email.isSentEmail = true;

    storageService.store(EMAILS_KEY, emailsDB);

    return Promise.resolve();
}

function addEmail(email) {
    const emailObj = _createEmail(email);
    emailsDB.unshift(emailObj);
    storageService.store(EMAILS_KEY, emailsDB);
    return Promise.resolve(emailObj);
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
    return Promise.resolve(mail);
}

function filterEmailsBySearch(filterBy) {
    if (filterBy === 'Read') {
        return Promise.resolve(_filterByRead());
    } else if (filterBy === 'Unread') {
        return Promise.resolve(_filterByUnread());
    } else if (filterBy === 'All') {
        return Promise.resolve(emailsDB);
    } else {
        return Promise.resolve(_filterByText(filterBy));
    }
}

function _filterByRead() {
    return emailsDB.filter(email => email.isRead)
}

function _filterByUnread() {
    return emailsDB.filter(email => !email.isRead)
}

function _filterByText(filterBy) {
    const filter = filterBy.toLowerCase();

    return emailsDB.filter(email => {
        const name = email.from.name.toLowerCase();
        const subject = email.subject.toLowerCase();
        const body = email.body.toLowerCase();

        if (name.includes(filter)) {
            return true;
        } else if (subject.includes(filter)) {
            return true;
        } else if (body.includes(filter)) {
            return true;
        } else {
            return false;
        }
    });
}

function _createEmails() {
    let emails = [
        { from: { name: 'Ella', address: 'ella@gmail.com' }, cc: 'ella@gmail.com', subject: 'Wassap?', body: 'lorem Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.' },
        { from: { name: 'Lian', address: 'lian@gmail.com' }, cc: 'ella@gmail.com', subject: 'Wassap?', body: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.' }
    ].map(_createEmail)

    return emails;
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

function _findById(emailId) {
    return emailsDB.find(email => email.id === emailId);
}