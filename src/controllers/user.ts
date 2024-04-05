import prisma from '../db/prisma.js'
import errors from '../errors.js'
import {Purpose} from "@prisma/client";

export const getCurrentUser = async (req: any, res: any) => {
	try {
		const userId = req.user.id
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				id: true,
				name: true,
				username: true,
				email: true,
				account: {
					select: {
						id: true,
						isOnboarded: true,
						image: true,
						isVerified: true,
						purpose: true,
						location: true,
					}
				}
			}
		})

		return res.json({
			data: user
		})
	} catch (error) {
		console.error(error)
		return res.status(errors.generic.SOMETHING_WENT_WRONG.status).json(errors.generic.SOMETHING_WENT_WRONG)
	}
}

type OnboardingBody = {
	image?: string,
	location?: string,
	purpose: Purpose[]
}

export const onboardUser = async (req: any, res: any) => {
	try {
		const body = req.body as OnboardingBody | null
		const image = body?.image
		const location = body?.location
		const purpose = body?.purpose

		let account = await prisma.account.update({
			where: {
				userId: req.user.id
			},
			data: {
				image,
				location,
				purpose
			}
		})

		if (account.purpose.length > 0 && account.image && account.location) {
			account = await prisma.account.update({
				where: {
					userId: req.user.id
				},
				data: {
					isOnboarded: true
				}
			})
		}

		return res.json({
			success: true,
			data: account
		})

	} catch (error) {
		console.error(error)
		return res.status(errors.generic.SOMETHING_WENT_WRONG.status).json(errors.generic.SOMETHING_WENT_WRONG)
	}
}
