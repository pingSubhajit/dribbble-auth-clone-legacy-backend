import {Resend} from 'resend'
import {VerificationToken} from '@prisma/client'
import prisma from './db/prisma.js'
import {v4 as uuidv4} from 'uuid'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, verificationCode: string): Promise<{id: string}> => {
	const { data, error } = await resend.emails.send({
		from: 'Dribbble Assignment <aeonaxy@subhajitkundu.me>',
		to: [email],
		subject: 'Verify Your Dribbble Assignment Account',
		html: `
			<h1>Your Aeonaxy Dribbble Verification</h1>
			<br>
			<p>Thank you so much for joining Dribbble. We are beyond excited to have you on board. We just need to confirm that the email that you have entered is indeed your own.</p>
			<br>
			<strong>Please click on the link below to verify your account:</strong>
			<a target="_blank" href="${process.env.CLIENT_URL}/verify?code=${verificationCode}">Verify Account</a>
			<br>
			<p>If you did not sign up for Dribbble, please ignore this email.</p>
			<br>
			<p>Thank you!</p>
			<p>Team Dribbble</p>
		`,
	})

	if (error) {
		throw new Error(error.message)
	}

	return data as {id: string}
}

export const generateVerificationToken = async (userId: string): Promise<VerificationToken> => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	})

	if (!user) {
		throw new Error('User not found')
	}

	return prisma.verificationToken.create({
		data: {
			token: uuidv4(),
			userId: user.id
		}
	});
}


