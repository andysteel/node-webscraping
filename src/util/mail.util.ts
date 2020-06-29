import mailer from "nodemailer";

export class Mail {

    public enviaEmail(msg: string, destinatario: string): void {
        const mailOptions = {
            from: 'robo@gmail.com',
            to: destinatario,
            subject: 'Monitoramento do produto.',
            text: msg
        };

        const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'andersoncdiastv@gmail.com',
                pass: '5020106971'
            }
        });

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}
