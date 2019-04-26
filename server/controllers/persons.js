import Persons from '../models/Persons';

/**
 * Define Persons controller methods
 * @class Persons
 */
export default class PersonsController {
  /**
   * retrieveOne - get a person by ID
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static retrieveOne(req, res) {
    Persons.findOne({ _id: req.params.id },
      (error, person) => {
        if (error) return res.status(500).send({ error: `Error checking for the person', ${error}` });
        return res.status(200).json(person);
      });
  }

  /**
   * retrieve - gets all persons from the database
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static retrieve(req, res) {
    Persons.find({})
      .sort({ age: 1 })
      .exec((err, persons) => {
        Persons.countDocuments().exec((error, count) => {
          if (error) return res.status(500).json({ error: 'Error While Fetching Persons. Try Again!' });

          return res.status(200).json({ person: persons });
        });
      });
  }

  /**
   * create - create a new person
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static create(req, res) {
    const {
      firstName,
      lastName,
      age,
      favouriteColour,
    } = req.body;

    const personPayload = {
      firstName,
      lastName,
      age: parseInt(age, 10),
      favouriteColour,
    };

    const newPerson = new Persons(personPayload);

    newPerson.save((error) => {
      if (error) return res.status(500).json({ error: `Error while saving: ${error}` });
      return res.status(201).json({
        id: newPerson.id,
        firstName,
        lastName,
        age,
        favouriteColour,
      });
    });
  }

  /**
   * update - updates existing person
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static update(req, res) {
    Persons.findById(req.params.id, (error, person) => {
      person.firstName = req.body.firstName || person.firstName;
      person.lastName = req.body.lastName || person.lastName;
      person.age = req.body.age || person.age;
      person.favouriteColour = req.body.age || person.favouriteColour;

      // check if the new fields are empty or invalid
      if (person.firstName === '' || person.lastName === '') {
        return res.status(400).json({ error: 'firstName and lastName should not be empty' });
      }
      if (!Number.isInteger(Number(person.age))) {
        return res.status(400).json({ error: 'age should be an integer' });
      }
      if (person.favouriteColour === '') {
        return res.status(400).json({ error: 'favouriteColour should not be empty' });
      }

      // check if the new firstName and LastName exists in the database
      Persons.findOne({ $and: [{ firstName: req.body.firstName }, { lastName: req.body.lastName }] },
        (findErr, findPerson) => {
          if (findErr) {
            return res.status(500).json({ error: `Error checking for the person: ', ${error}` });
          }
          if (findPerson !== null) {
            return res.status(409).json({ error: 'Person with the firstName and LastName already exists' });
          }
          person.save((updateError) => {
            if (updateError) res.status(500).send({ error: 'Error occured while updating person!' });
            return res.status(200).send({
              firstName: person.firstName,
              lastName: person.lastName,
              age: person.age,
              favouriteColour: person.favouriteColour,
            });
          });
        });
    });
  }

  /**
   * delete - delete person from database
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static delete(req, res) {
    Persons.deleteOne({ _id: req.params.id }, (error) => {
      if (error) return res.status(500).send({ error: 'Error occured while deleting person!' });
      return res.status(204).json({ message: 'Deleted!' });
    });
  }
}
