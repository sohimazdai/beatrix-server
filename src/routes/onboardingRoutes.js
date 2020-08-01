const {
  Router
} = require('express');
const OnboardingController = require('../controllers/onboardingController');
const routes = require('./routes');
const router = Router();

router.post(routes.COMPLETE_ONBOARDING, OnboardingController.completeOnboarding)

module.exports = router;
