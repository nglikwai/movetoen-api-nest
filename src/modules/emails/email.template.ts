export const passwordResetEmail = (email: string, resetCode: number) => ({
  to: email,
  from: process.env.SENDGRID_SENDER_EMAIL,
  subject: 'Password Reset Code',
  text: `Your password reset code is ${resetCode}`,
  html: `Your password reset code is <strong>${resetCode}</strong>`,
});
