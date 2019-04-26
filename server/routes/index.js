import express from 'express';
import personRoutes from './personRoutes';

const routes = express.Router();

// person routes
routes.use('/persons', personRoutes);

// Non existing Routes
routes.use('*', (req, res) => res.status(404).json({ message: 'Route Not Found!' }));

export default routes;
