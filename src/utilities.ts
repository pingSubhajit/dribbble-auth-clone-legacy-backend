import { Resend } from 'resend';

const resend = new Resend('re_123456789');

export const sendVerificationEmail = async (email: string, verificationCode: string) => {
	const { data, error } = await resend.emails.send({
		from: 'Acme <onboarding@resend.dev>',
		to: [email],
		subject: 'Hello World',
		html: '<strong>It works!</strong>',
	})

	if (error) {
		throw new Error(error.message)
	}

	console.log({ data })
}
