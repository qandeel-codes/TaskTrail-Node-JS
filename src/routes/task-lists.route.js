const { Router } = require("express");
const controller = require("../controllers/task-lists.controller");
const { check } = require("express-validator");
const { Validate, Authenticated } = require("../middlewares");
const {
  models: { TaskList },
} = require("../data");
const { logger } = require("../handlers");
const { StatusCodes } = require("http-status-codes");

const router = Router();

// Business Middleware
const AttachTaskList = (request, response, next) => {
  const { id } = request.params;

  TaskList.findOne({ where: { id: id, ownerId: request.user.id } })
    .then((tasklist) => {
      if (tasklist) {
        response.locals.taskList = tasklist;
        next();
      } else {
        return response.sendStatus(StatusCodes.NOT_FOUND);
      }
    })
    .catch((error) => {
      logger.error(
        `Cannot attach list with ID '${id}' to the response, Something went wrong: ${error}`
      );
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: `Cannot retrieve list with ID '${id}', Something went wrong`,
      });
    });
};

router.get("/", Authenticated, controller.getAll);

router.get("/:id", Authenticated, AttachTaskList, controller.getById);

router.post(
  "/",
  Authenticated,
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters length"),
  Validate,
  controller.create
);

router.put(
  "/:id",
  Authenticated,
  AttachTaskList,
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters length"),
  Validate,
  controller.update
);

router.patch(
  "/:id",
  Authenticated,
  AttachTaskList,
  check("title")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters length"),
  Validate,
  controller.updatePartially
);

router.delete("/:id", Authenticated, AttachTaskList, controller.delete);

router.use(require("./tasks.route"));

module.exports = router;
