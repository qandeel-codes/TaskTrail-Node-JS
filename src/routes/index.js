const { Router } = require("express");

const taskListsRoutes = require("./task-lists.route");

const router = Router();

router.use("/api/task-lists", taskListsRoutes);

module.exports = router;
