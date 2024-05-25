const router = require("express").Router();
const checkUserById = require("../middlewares/checkUserById");
const { asyncHandler } = require("../middlewares/asyncHandler");
const authMiddleware = require("../middlewares/authMiddleware");
const { update: updateValidator, profileImage: imageValidator } = require("../validators/profile");
const userController = require("../controllers/user");
const { upload } = require("../utility/imageUpload");

router.route("/users").get(authMiddleware, userController.getAllUser);

router.route("/profile").get(authMiddleware, userController.getProfile);
router.route("/profile").put(authMiddleware, checkUserById, updateValidator, userController.updateProfile);
router.route("/profile").delete(authMiddleware, checkUserById, userController.deleteProfile);
router.route("/profile/image").post(authMiddleware, checkUserById, imageValidator, upload.single("image"), userController.uploadProfileImage);

module.exports = router;
