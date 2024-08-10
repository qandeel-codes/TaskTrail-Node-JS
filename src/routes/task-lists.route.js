const { Router } = require("express");
const controller = require("../controllers/task-lists.controller");

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.patch("/:id", controller.updatePartially);

router.delete("/:id", controller.delete);

module.exports = router;
