import express from 'express'
import {isSignedIn} from '../controllers/auth.js'
import {getCurrentUser, onboardUser, resendVerificationEmail, verifyUser} from '../controllers/user.js'
const router = express.Router()

router.get('/me', isSignedIn, getCurrentUser)
router.post('/onboard', isSignedIn, onboardUser)
router.post('/verify', isSignedIn, verifyUser)
router.get('/resend-email', isSignedIn, resendVerificationEmail)

export default router
