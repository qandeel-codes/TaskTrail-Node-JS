const { StatusCodes } = require("http-status-codes");
const {
  models: { TaskList },
} = require("../data");
const { logger } = require("../handlers");

module.exports = {
  getAll: (request, response) => {
    return TaskList.findAll({ where: { ownerId: request.user.id } })
      .then((taskLists) => {
        return response.status(StatusCodes.OK).json(taskLists);
      })
      .catch((error) => {
        logger.error(
          `Cannot retrieve task lists, Something went wrong: ${error}`
        );
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: `Cannot retrieve task lists, Something went wrong` });
      });
  },

  getById: (request, response) => {
    const { taskList } = response.locals;
    return response.status(StatusCodes.OK).json(taskList);
  },

  create: (request, response) => {
    const { title, description } = request.body;
    TaskList.create({
      title: title,
      description: description,
      ownerId: request.user.id,
    })
      .then((taskList) => {
        return response.status(StatusCodes.CREATED).json(taskList);
      })
      .catch((error) => {
        logger.error(`Task list not created, Something went wrong`);
        logger.error(error);
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: `Task list not created, Something went wrong` });
      });
  },

  update: (request, response) => {
    const { taskList } = response.locals;
    const { title, description } = request.body;

    taskList.title = title;
    taskList.description = description ?? null;

    taskList
      .save()
      .then(() => {
        return response.sendStatus(StatusCodes.NO_CONTENT);
      })
      .catch((error) => {
        logger.error(
          `Task list with ID '${id}' not updated, Something went wrong: ${error}`
        );
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task list with ID '${id}' not updated, Something went wrong`,
        });
      });
  },

  updatePartially: (request, response) => {
    const { taskList } = response.locals;
    const { title, description } = request.body;

    taskList.title = title ?? taskList.title;
    taskList.description = description ?? taskList.description;

    taskList
      .save()
      .then(() => {
        return response.sendStatus(StatusCodes.NO_CONTENT);
      })
      .catch((error) => {
        logger.error(
          `Task list with ID '${id}' not updated, Something went wrong: ${error}`
        );
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task list with ID '${id}' not updated, Something went wrong`,
        });
      });
  },

  delete: (request, response) => {
    const { taskList } = response.locals;

    return taskList
      .destroy()
      .then(() => {
        return response.sendStatus(StatusCodes.NO_CONTENT);
      })
      .catch((error) => {
        logger.error(
          `Task list with ID '${id}' not deleted, Something went wrong`
        );
        logger.error(error);
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task list with ID '${id}' not deleted, Something went wrong`,
        });
      });
  },
};
