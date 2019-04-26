import Persons from '../models/Persons';

export default class PersonsMiddleware {
  /**
   * validateName - validates the firstName and lastName field
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @return {object}
   */
  static validateName(req, res, next) {
    if (!req.body.firstName) return res.status(400).json({ error: 'firstName field is required' });
    if (req.body.firstName.trim() === '') return res.status(400).json({ error: 'firstName field should not be empty' });
    if (!req.body.lastName) return res.status(400).json({ error: 'lastName field is required' });
    if (req.body.lastName.trim() === '') return res.status(400).json({ error: 'firstName field should not be empty' });

    return next();
  }

  /**
   * validateAge - validates the age field
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object}
   */
  static validateAge(req, res, next) {
    if (!Number(req.body.age)) return res.status(400).json({ error: 'age field is required' });
    if (!Number.isInteger(Number(req.body.age))) return res.status(400).json({ error: 'age should be an integer' });
    if (Number(req.body.age) < 0) return res.status(400).json({ error: 'impact should not be less than 0' });

    return next();
  }

  /**
   * validateColor - validates the favourite color field
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @return {object}
   */
  static validateColor(req, res, next) {
    if (!req.body.favouriteColour) return res.status(400).json({ error: 'favouriteColour field is required' });
    if (req.body.favouriteColour.trim() === '') return res.status(400).json({ error: 'favouriteColour field should not be empty' });

    return next();
  }

  /**
   * personExists - check if person already exists
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @return {object}
   */
  static personExists(req, res, next) {
    Persons.findOne({ $and: [{ firstName: req.body.firstName }, { lastName: req.body.lastName }] },
      (error, person) => {
        if (error) return res.status(500).send({ error: `Error checking for the person: ', ${error}` });
        if (person !== null) {
          return res.status(409).json({ error: 'Person with the firstName and LastName already exists' });
        }

        return next();
      });
  }

  /**
   * validateId - check if id is a valid id
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @return {object}
   */
  static validateId(req, res, next) {
    if (!req.params.id) return res.status(404).json({ error: 'id param is required' });
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ error: 'id not a valid object' });

    Persons.findOne({ _id: req.params.id },
      (error, id) => {
        if (error) return res.status(500).send({ error: `Error checking for the id', ${error}` });
        if (id === null) return res.status(404).json({ error: 'ID Not Found' });
        return next();
      });
  }
}
