const UserModel = require('../models/userModel');

class OnboardingController {
  static async completeOnboarding(req, res) {
    try {
      const userId = req.body.userId;
      const diabetesProperties = req.body.diabetesProperties;
      const skipped = req.body.skipped;

      const user = await UserModel.findOne({ id: userId });

      if (user && skipped) {
        user.set('isNeedToShowOnboarding', false);
        user.set('properties', {
          shortInsulinType: diabetesProperties.shortInsulinType || null,
          targetGlycemia: user.properties.targetGlycemia,
          glycemiaMeasuringType: user.properties.glycemiaMeasuringType,
          carbsMeasuringType: user.properties.carbsMeasuringType,
          carbsUnitWeightType: user.properties.carbsUnitWeightType,
        });

        await user.save();

        res.status(200);
        res.send("OK");
        return;
      }

      if (user && !user.isNeedToShowOnboarding) {
        user.set('isNeedToShowOnboarding', false);
        user.set('properties', {
          shortInsulinType: diabetesProperties.shortInsulinType || null,
          targetGlycemia: user.properties.targetGlycemia,
          glycemiaMeasuringType: diabetesProperties.glycemiaMeasuringType || user.properties.glycemiaMeasuringType,
          carbsMeasuringType: diabetesProperties.carbsMeasuringType || user.properties.carbsMeasuringType,
          carbsUnitWeightType: diabetesProperties.carbsUnitWeightType || user.properties.carbsUnitWeightType,
        });

        await user.save();

        res.status(200);
        res.send("OK");
        return;
      }

      res.send();

    } catch (error) {
      console.log(__filename + " catch error: ", error && error.message);
      res.status(503);
      res.send(error);
    }
  }
}

module.exports = OnboardingController;
