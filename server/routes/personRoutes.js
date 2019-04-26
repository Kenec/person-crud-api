import express from 'express';
import personsController from '../controllers/persons';
import personsMiddleware from '../middlewares/persons';

const personsRoutes = express.Router();

personsRoutes.get('/',
  personsController.retrieve);

personsRoutes.get('/:id',
  personsMiddleware.validateId,
  personsController.retrieveOne);

personsRoutes.post('/',
  personsMiddleware.validateName,
  personsMiddleware.validateAge,
  personsMiddleware.validateColor,
  personsMiddleware.personExists,
  personsController.create);

personsRoutes.put('/:id',
  personsMiddleware.validateId,
  personsController.update);

personsRoutes.delete('/:id',
  personsMiddleware.validateId,
  personsController.delete);

export default personsRoutes;
