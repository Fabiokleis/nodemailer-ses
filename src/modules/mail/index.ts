import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';


export async function sendmail() {

    console.log(process.env.AWS_ACCESS_KEY);
    console.log(process.env.AWS_SECRET_KEY);
    try {

        let ses = new aws.SES({
            apiVersion: "2010-12-01",
            region: 'us-east-2',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY || "" ,
                secretAccessKey: process.env.AWS_SECRET_KEY || ""
            },
        });

        console.log(ses);
        
        let transporter = nodemailer.createTransport({
            SES: { ses, aws }
        });
        
        const msg = await transporter.sendMail({
            from: {
                name: "me",
                address: "fabiohkrc@gmail.com",
            },
            to: {
                name: "you",
                address: "fabiohkrc@gmail.com"
            },
            subject: "title",
            // text: "ola",
            html: await fs.promises.readFile(path.resolve(__dirname, "mail.html"), { encoding: 'utf-8' })
        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    
    
        console.log(msg);
    } catch(e) {
        throw e;
    }

}
