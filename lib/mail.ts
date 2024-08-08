import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationToken = async (
    email: string,
    token: any
) => {
    const confirmationLink = `http://localhost:3000/verify-token?token=${token}`;

    await resend.emails.send({
        from: 'Profile Authentication Project <onboarding@resend.dev>',
        to: email,
        subject: 'Email Confirmation',
        html: `<p>Verify email by clicking <a href=${confirmationLink}>Here</a></p>`,
    })
};

export const sendResetPassworLink = async (
    email: string,
    token: any
) => {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    await resend.emails.send({
        from: 'Profile Authentication Project <onboarding@resend.dev>',
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Reset your password by clicking <a href=${resetLink}>Here</a></p>`,
    })
};
