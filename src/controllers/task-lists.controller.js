const { StatusCodes } = require("http-status-codes");
const {
  models: { TaskList },
} = require("../data");
const { logger } = require("../handlers");

module.exports = {
  getAll: (request, response) => {
    TaskList.findAll()
      .then((taskLists) => {
        return response.status(StatusCodes.OK).json(taskLists);
      })
      .catch((error) => {
        logger.error(`Cannot retrieve task lists, Something went wrong`);
        logger.error(error);
        return response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({ error: `Cannot retrieve task lists, Something went wrong` });
      });
  },

  getById: (request, response) => {
    const { id } = request.params;

    TaskList.findByPk(id)
      .then((tasklist) => {
        if (tasklist) {
          return response.status(StatusCodes.OK).json(tasklist);
        }
        return response.sendStatus(StatusCodes.NOT_FOUND);
      })
      .catch((error) => {
        logger.error(
          `Cannot retrieve task list with ID '${id}', Something went wrong`
        );
        Logger.error(error);
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Cannot retrieve task list with ID '${id}', Something went wrong`,
        });
      });
  },

  create: (request, response) => {
    const { name } = request.body;
    TaskList.create({ name: name })
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
    const {
      params: { id },
      body: { name },
    } = request;

    TaskList.findByPk(id)
      .then((tasklist) => {
        if (tasklist) {
          return tasklist
            .update({ name: name })
            .then(() => {
              return response.sendStatus(StatusCodes.NO_CONTENT);
            })
            .catch((error) => {
              logger.error(
                `Task list with ID '${id}' not updated, Something went wrong`
              );
              logger.error(error);
              return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                error: `Task list with ID '${id}' not updated, Something went wrong`,
              });
            });
        }
        return response.sendStatus(StatusCodes.NOT_FOUND);
      })
      .catch((error) => {
        logger.error(
          `Task list with ID '${id}' not updated, Something went wrong`
        );
        logger.error(error);
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task list with ID '${id}' not updated, Something went wrong`,
        });
      });
  },

  updatePartially: (request, response) => {
    const {
      params: { id },
      body: { name },
    } = request;

    TaskList.findByPk(id)
      .then((tasklist) => {
        if (tasklist) {
          return tasklist
            .update({ name: name })
            .then(() => {
              return response.sendStatus(StatusCodes.NO_CONTENT);
            })
            .catch((error) => {
              logger.error(
                `Task list with ID '${id}' not updated, Something went wrong`
              );
              logger.error(error);
              return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                error: `Task list with ID '${id}' not updated, Something went wrong`,
              });
            });
        }
        return response.sendStatus(StatusCodes.NOT_FOUND);
      })
      .catch((error) => {
        logger.error(
          `Task list with ID '${id}' not updated, Something went wrong`
        );
        logger.error(error);
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: `Task list with ID '${id}' not updated, Something went wrong`,
        });
      });
  },

  delete: (request, response) => {
    const { id } = request.params;

    TaskList.findByPk(id)
      .then((tasklist) => {
        if (tasklist) {
          return tasklist
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
        }
        return response.sendStatus(StatusCodes.NOT_FOUND);
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
