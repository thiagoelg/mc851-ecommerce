const pug = require('pug');

import MailService from '../utils/MailService';
import { FRONT_URL } from '../serverConfig';

export const sendWelcomeEmail = (userName, userEmail) => {

    let html = pug.renderFile('/home/node/src/mail/templates/welcome.pug', {
        name: userName,
        front: FRONT_URL,
    });

    let text = 'Olá, ' + userName + '. Bem vindo a Toppenstore!';

    MailService.sendMail(userEmail, 'Toppenstore: Bem vindo!', text, html);

}

export default {
    sendWelcomeEmail
}