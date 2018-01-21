'use strict';

var helper = require('sendgrid').mail;

//EmailSender(toEmail,subject,msg,function(err){});
module.exports = function (toEmail, subject, msg, callback) {
  var from_email = new helper.Email('questionapp613@gmail.com');
  var to_email = new helper.Email(toEmail);
  var subject = subject;
  var content = new helper.Content('text', msg);
  var mail = new helper.Mail(from_email, subject, to_email, content);
  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });
  sg.API(request, function (error, response) {
    if (error) {
      console.log(error);
      callback(new Error('An error has occured while sending the email'));
    } else {
      callback(null);
    }
  });
};
//# sourceMappingURL=sendEmail.js.map