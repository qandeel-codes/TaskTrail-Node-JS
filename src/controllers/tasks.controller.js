const { StatusCodes } = require("http-status-codes");
const {
  models: { Task },
} = require("../data");
const { logger } = require("../handlers");

const mapTask = (task) => {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
};

module.exports = {
  mapTask: mapTask,
  getAll: (request, response) => {
    const { id } = response.locals.taskList;
    return Task.findAll({ where: { taskListId: id } })
      .then((tasks) => {
        return response.status(StatusCodes.OK).json(tasks.map(mapTask));
      })
      .catch((error) => {
        logger.error(
          `Cannot retrieve tasks for list ID '${id}', Something went wrong: ${error}`
        );
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Cannot retrieve tasks for list ID '${id}', Something went wrong`,
        });
      });
  },

  getById: async (request, response) => {
    const { task } = response.locals;
    const list = await task.getTaskList();
    return response
      .status(StatusCodes.OK)
      .json({
        ...mapTask(task),
        taskList: require("./task-lists.controller").mapTaskListDetailed(list),
      });
  },

  create: (request, response) => {
    const { id } = response.locals.taskList;
    const { title, description, isCompleted } = request.body;
    Task.create({
      title: title,
      description: description,
      isCompleted: isCompleted,
      taskListId: id,
    })
      .then((task) => {
        return response.status(StatusCodes.CREATED).json({
          message: "Task created successfully",
          data: mapTask(task),
        });
      })
      .catch((error) => {
        logger.error(`Task not created, Something went wrong: ${error}`);
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: `Task not created, Something went wrong` });
      });
  },

  update: (request, response) => {
    const { task } = response.locals;
    const { title, description } = request.body;

    task.title = title;
    task.description = description ?? null;

    task
      .save()
      .then(() => {
        return response.sendStatus(StatusCodes.NO_CONTENT);
      })
      .catch((error) => {
        logger.error(
          `Task with ID '${id}' not updated, Something went wrong: ${error}`
        );
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task with ID '${id}' not updated, Something went wrong`,
        });
      });
  },

  updatePartially: (request, response) => {
    const { task } = response.locals;
    const { title, description } = request.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;

    task
      .save()
      .then(() => {
        return response.sendStatus(StatusCodes.NO_CONTENT);
      })
      .catch((error) => {
        logger.error(
          `Task with ID '${id}' not updated, Something went wrong: ${error}`
        );
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task with ID '${id}' not updated, Something went wrong`,
        });
      });
  },

  complete: (request, response) => {
    const { task } = response.locals;

    task.isCompleted = true;

    task
      .save()
      .then(() => {
        return response.sendStatus(StatusCodes.NO_CONTENT);
      })
      .catch((error) => {
        logger.error(
          `Task with ID '${id}' not updated, Something went wrong: ${error}`
        );
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task with ID '${id}' not updated, Something went wrong`,
        });
      });
  },

  delete: (request, response) => {
    const { task } = response.locals;

    return task
      .destroy()
      .then(() => {
        return response.sendStatus(StatusCodes.NO_CONTENT);
      })
      .catch((error) => {
        logger.error(`Task with ID '${id}' not deleted, Something went wrong`);
        logger.error(error);
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task with ID '${id}' not deleted, Something went wrong`,
        });
      });
  },
};
