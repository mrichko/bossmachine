const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  deleteFromDatabasebyId,
  updateInstanceInDatabase,
} = require ('./db');


minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});



minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleteMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleteMinion) {
    res.status(204);
  } else {
    res.status(500);
  } res.send;
});
