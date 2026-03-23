import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'

const sendEmail = async (options) => {
  const mailGen = new Mailgen({
    theme: 'default',
    product: {
      name: 'Task Manager',
      link: 'https://taskmanagerlink.com',
    },
  })
  const emailTextual = mailGen.generatePlaintext(options.mailgenContent)
  const emailHtml = mailGen.generate(options.mailgenContent)

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  })

  const mail = {
    from: 'mail.taskmanager@example.com',
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  }

  try {
    await transporter.sendMail(mail)
  } catch (error) {
    console.error("Email service failed siliently. Make sure that you have Correct Mailtrap credential correctly")
  }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: 'Welcome to our team, we are excited to have you on board.',
      action: {
        instructions: 'To verify your email please click on the following button',
        button: {
          color: '#22BC66',
          text: 'Verify your email',
          link: verificationUrl,
        },
      },
      outro: "Need help, or have question? Just reply to this email, we'd love to to help.",
    },
  }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: 'We got a request to reset the password of your account.',
      action: {
        instructions: 'To reset your password please click on the following button',
        button: {
          color: '#22BC66',
          text: 'Reset password',
          link: passwordResetUrl,
        },
      },
      outro: "Need help, or have question? Just reply to this email, we'd love to to help.",
    },
  }
}

export { emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail }
