const errors = {
	auth: {
		NO_NAME: {
			status: 400,
			message: 'No name provided'
		},
		NO_USERNAME: {
			status: 400,
			message: 'No username provided'
		},
		USERNAME_TAKEN: {
			status: 400,
			message: 'Username is already taken'
		},
		NO_EMAIL: {
			status: 400,
			message: 'No email provided'
		},
		NO_PASSWORD: {
			status: 400,
			message: 'No password provided'
		},
		INVALID_CREDENTIALS: {
			status: 400,
			message: 'Invalid credentials'
		}
	},
	generic: {
		SOMETHING_WENT_WRONG: {
			status: 500,
			message: 'Something went wrong, please try later'
		}
	}
}

export default errors
