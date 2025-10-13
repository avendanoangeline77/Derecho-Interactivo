import nodemailer from "nodemailer";


export async function sendEmail(email:string,html:string="",text:string="",subject:string=""){
 const transporter = nodemailer.createTransport({
service: "gmail",

auth: {
    
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  },
});
    console.log(transporter)
    try {

       await transporter.sendMail({
        from: '"Mi App" '+process.env.MAILER_USER, // remitente
          to: email,         // destinatario(s)
          subject: "Hola desde Nodemailer 🚀",
          text: "Este es el contenido del correo en texto plano",
          html
      });

      console.log("Email sent successfully")

      return true
    } catch (error) {

      console.log(error)
    }

  }