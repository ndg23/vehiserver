const router = require("express").Router();
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.post('', userController.createUser)
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// upload
module.exports = router;