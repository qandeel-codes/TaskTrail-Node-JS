const { Router } = require("express");
const controller = require("../controllers/tasks.controller");
const { check } = require("express-validator");
const { Validate, Authenticated } = require("../middlewares");
const {
  models: { TaskList, Task },
} = require("../data");
const { logger } = require("../handlers");
const { StatusCodes } = require("http-status-codes");

const router = Router();

// Business Middleware
const AttachTaskList = (request, response, next) => {
  const { listId } = request.params;
  TaskList.findOne({ where: { id: listId, ownerId: request.user.id } })
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
        `Cannot attach task list with ID '${id}' to the response, Something went wrong: ${error}`
      );
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: `Cannot retrieve task list with ID '${id}', Something went wrong`,
      });
    });
};

const AttachTaskItem = (request, response, next) => {
  const { listId, id } = request.params;

  Task.findOne({ where: { id: id, listId: listId } })
    .then((task) => {
      if (task) {
        response.locals.task = task;
        next();
      } else {
        return response.sendStatus(StatusCodes.NOT_FOUND);
      }
    })
    .catch((error) => {
      logger.error(
        `Cannot attach task item with ID '${id}' to the response, Something went wrong: ${error}`
      );
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: `Cannot retrieve task with ID '${id}', Something went wrong`,
      });
    });
};

const baseRoute = "/:listId/tasks";

router.get(baseRoute, Authenticated, AttachTaskList, controller.getAll);

router.get(
  `${baseRoute}/:id`,
  Authenticated,
  AttachTaskList,
  AttachTaskItem,
  controller.getById
);

router.post(
  baseRoute,
  Authenticated,
  AttachTaskList,
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters length"),
  Validate,
  controller.create
);

router.put(
  `${baseRoute}/:id`,
  Authenticated,
  AttachTaskList,
  AttachTaskItem,
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters length"),
  Validate,
  controller.update
);

router.patch(
  `${baseRoute}/:id`,
  Authenticated,
  AttachTaskList,
  AttachTaskItem,
  check("title")
    .isLength({ max: 50 })
    .withMessage("Title must not exceed 50 characters length"),
  Validate,
  controller.updatePartially
);

router.post(
  `${baseRoute}/:id/complete`,
  Authenticated,
  AttachTaskList,
  AttachTaskItem,
  controller.complete
);

router.delete(
  `${baseRoute}/:id`,
  Authenticated,
  AttachTaskList,
  AttachTaskItem,
  controller.delete
);

module.exports = router;
