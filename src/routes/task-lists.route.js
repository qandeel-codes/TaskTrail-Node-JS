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
const attachTaskList = (request, response, next) => {
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
        `Cannot attach task list with ID '${id}' to the request, Something went wrong: ${error}`
      );
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: `Cannot retrieve task list with ID '${id}', Something went wrong`,
      });
    });
};

router.get("/", Authenticated, controller.getAll);

router.get("/:id", Authenticated, attachTaskList, controller.getById);

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
  attachTaskList,
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
  attachTaskList,
  check("title")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters length"),
  Validate,
  controller.updatePartially
);

router.delete("/:id", Authenticated, attachTaskList, controller.delete);

module.exports = router;
