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
    filterEmailsBySearch,
    getSortedEmails,
    getUnreadCountEmails
}

function query(emailType) {
    var emails = storageService.load(EMAILS_KEY);
    if (!emails || emails.length === 0) {
        emails = _createEmails();
        storageService.store(EMAILS_KEY, emails);
    }
    emailsDB = emails;

    let filteredEmails = _filterEmails(emailType);

    return Promise.resolve(filteredEmails);
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

function filterEmailsBySearch(filterBy, emails) {
    if (filterBy === 'Read') {
        return Promise.resolve(_filterByRead(emails));
    } else if (filterBy === 'Unread') {
        return Promise.resolve(_filterByUnread(emails));
    } else if (filterBy === 'All') {
        return Promise.resolve(emails);
    } else {
        return Promise.resolve(_filterByText(filterBy));
    }
}

function getSortedEmails(sortBy) {
    if (sortBy === 'title') {
        _sortByTitle()
    } else {
        _sortByDate()
    }

    return Promise.resolve(emailsDB);
}

function getUnreadCountEmails() {
    let unreadCount = 0;

    emailsDB.forEach(email => {
        if (!email.isRead) {
            unreadCount++;
        }
    });

    return Promise.resolve(unreadCount);
}

function _filterEmails(emailType) {
    const filteredEmails = emailsDB.filter(email => {
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

    return filteredEmails;
}

function _sortByTitle() {
    emailsDB.sort(function(a, b) {
        var subjectA = a.subject.toUpperCase();
        var subjectB = b.subject.toUpperCase();

        if (subjectA < subjectB) {
            return -1;
        }
        if (subjectA > subjectB) {
            return 1;
        }

        return 0;
    });
}

function _sortByDate() {
    emailsDB.sort(function(a, b) {
        return a.sentAt - b.sentAt;
    });
}

function _filterByRead(emails) {
    return emails.filter(email => email.isRead)
}

function _filterByUnread(emails) {
    return emails.filter(email => !email.isRead)
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
    let emails = [{
            from: { name: 'Lian', address: 'lian@gmail.com' },
            cc: 'ella@gmail.com',
            subject: 'Thanks for everything!!!!!!',
            body: `My money's in that office, right?
            If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is.
            She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?`,
            sentAt: 1582897777777
        },
        {
            from: { name: 'yossi', address: 'yossi@gmail.com' },
            cc: 'dudu@gmail.com',
            subject: 'Hi you!',
            body: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in.',
            sentAt: 1588887777777
        },
        {
            from: { name: 'Ella', address: 'ella@gmail.com' },
            cc: 'or@gmail.com',
            subject: 'Wassap?',
            body: `lorem Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
            The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Ciceros De Finibus Bonorum et Malorum for use in a type specimen book.`,
            sentAt: 1582892340282
        },
        {
            from: { name: 'nini', address: 'nini@gmail.com' },
            cc: 'shimi@gmail.com',
            subject: 'GoodJob!!!!!',
            body: `My money's in that office, right?
            If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is.
            She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?`,
            sentAt: 1582892555555
        },
        {
            from: { name: 'may', address: 'may@gmail.com' },
            cc: 'lian@gmail.com',
            subject: 'How Are You??',
            body: `Hi! this would be ou email`,
            sentAt: 1582492555555
        },
        {
            from: { name: 'or', address: 'or@gmail.com' },
            cc: 'ella@gmail.com',
            subject: 'I love you',
            body: `very very very very much`,
            sentAt: 1533492555555
        },
        {
            from: { name: 'sapir', address: 'sapir@gmail.com' },
            cc: 'yoyo@gmail.com',
            subject: 'Your card has arrived',
            body: `Do you see any Teletubbies in here?
            Do you see a slender plastic tag clipped to my shirt with my name printed on it?
            Do you see a little Asian child with a blank expression on his face sitting
            outside on a mechanical helicopter that shakes when you put quarters in it?
            No? Well, that's what you see at a toy store.`,
            sentAt: 1533492444455
        }

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
        sentAt: emailDetails.sentAt || Date.now(),
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