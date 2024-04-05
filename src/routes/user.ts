import express from 'express'
import {isSignedIn} from '../controllers/auth.js'
import {getCurrentUser, onboardUser} from '../controllers/user.js'
const router = express.Router()

router.get('/me', isSignedIn, getCurrentUser)
router.post('/onboard', isSignedIn, onboardUser)

export default router
