const { Router } = require("express");

const authRoutes = require("./auth.route");
const taskListsRoutes = require("./task-lists.route");

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/task-lists", taskListsRoutes);

module.exports = router;
