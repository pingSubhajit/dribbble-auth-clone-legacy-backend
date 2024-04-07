import errors from '../errors.js'
import prisma from '../db/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {expressjwt} from 'express-jwt'
import {generateVerificationToken, sendVerificationEmail} from '../utilities.js'

export const checkUserName = async (req: any, res: any) => {
	const body = req.body as { username: string } | null
	const username = body?.username

	if (!username) {
		return res.status(400).status(errors.auth.NO_USERNAME.status).json(errors.auth.NO_USERNAME)
	}

	const duplicateUsername = await prisma.user.findUnique({
		where: {
			username
		}
	})

	if (duplicateUsername) {
		return res.status(errors.auth.USERNAME_TAKEN.status).json(errors.auth.USERNAME_TAKEN)
	}

	return res.send({ message: `Username::${username} is available` })
}

type RegisterBody = {
	name: string,
	email: string,
	username: string,
	password: string
}

export const register = async (req: any, res: any) => {
	try {
		const body = req.body as RegisterBody | null
		const name = body?.name
		const username = body?.username
		const email = body?.email
		const password = body?.password

		if (!name) {
			return res.status(errors.auth.NO_NAME.status).json(errors.auth.NO_NAME)
		}

		if (!username) {
			return res.status(errors.auth.NO_USERNAME.status).json(errors.auth.NO_USERNAME)
		}

		if (!email) {
			return res.status(errors.auth.NO_EMAIL.status).json(errors.auth.NO_EMAIL)
		}

		if (!password) {
			return res.status(errors.auth.NO_PASSWORD.status).json(errors.auth.NO_PASSWORD)
		}

		const duplicateUsername = await prisma.user.findUnique({
			where: {
				username
			}
		})

		if (duplicateUsername) {
			return res.status(errors.auth.USERNAME_TAKEN.status).json(errors.auth.USERNAME_TAKEN)
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await prisma.user.create({
			data: {
				name,
				username,
				email,
				password: hashedPassword
			}
		})

		const account = await prisma.account.create({
			data: {
				userId: user.id
			}
		})

		const verificationToken = await generateVerificationToken(user.id)

		return res.send({ success: true, message: `User::${user.username} registered successfully`, data: {
			name: user.name,
			username: user.username,
			email: user.email,
			account
		}})
	} catch (error) {
		console.error(error)
		return res.status(errors.generic.SOMETHING_WENT_WRONG.status).json(errors.generic.SOMETHING_WENT_WRONG)
	}
}

type LoginBody = {
	username?: string,
	email?: string,
	password: string
}

export const login = async (req: any, res: any) => {
	try {
		const body = req.body as LoginBody | null
		const username = body?.username
		const email = body?.email
		const password = body?.password

		if (!username && !email) {
			return res.status(errors.auth.NO_USERNAME.status).json(errors.auth.NO_USERNAME)
		}

		if (!password) {
			return res.status(errors.auth.NO_PASSWORD.status).json(errors.auth.NO_PASSWORD)
		}

		const user = await prisma.user.findUnique({
			where: {
				username,
				email
			}
		})

		if (!user) {
			return res.status(errors.auth.INVALID_CREDENTIALS.status).json(errors.auth.INVALID_CREDENTIALS)
		}

		const match = await bcrypt.compare(password, user.password)

		if (!match) {
			return res.status(errors.auth.INVALID_CREDENTIALS.status).json(errors.auth.INVALID_CREDENTIALS)
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
		res.cookie('token', token, { httpOnly: true })
		return res.send({ success: true, message: 'Logged in successfully', token })
	} catch (error) {
		console.error(error)
		return res.status(errors.generic.SOMETHING_WENT_WRONG.status).json(errors.generic.SOMETHING_WENT_WRONG)
	}
}

export const logout = async (req: any, res: any) => {
	try {
		res.clearCookie('token')
		return res.send({ success: true, message: 'Logged out successfully' })
	} catch (error) {
		console.error(error)
		return res.status(errors.generic.SOMETHING_WENT_WRONG.status).json(errors.generic.SOMETHING_WENT_WRONG)
	}
}

export const changeEmail = async (req: any, res: any) => {
	try {
		const body = req.body as { email: string } | null
		const email = body?.email

		if (!email) {
			return res.status(errors.auth.NO_EMAIL.status).json(errors.auth.NO_EMAIL)
		}

		const user = await prisma.user.update({
			where: {
				id: req.user.id
			},
			data: {
				email
			}
		})

		return res.send({ success: true, message: 'Email updated successfully', data: { email: user.email } })
	} catch (error) {
		console.error(error)
		return res.status(errors.generic.SOMETHING_WENT_WRONG.status).json(errors.generic.SOMETHING_WENT_WRONG)
	}
}

export const isSignedIn = expressjwt({
	secret: process.env.JWT_SECRET as string,
	algorithms: ['HS256'],
	requestProperty: 'user'
})
