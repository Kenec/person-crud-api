/* global describe, before, it */
import chai from 'chai';
import chatHttp from 'chai-http';
import server from '../../server/app';
import Persons from '../../server/models/Persons';
import mockData from '../mockData/persons.json';

let should = chai.should();
let id = '';
chai.use(chatHttp);

process.env.NODE_ENV = 'test';

describe('Person', () => {
  before((done) => {
    Persons.deleteMany({}, () => {
      done();
    });
  });

  describe('/GET Person', () => {
    it('should get empty array of persons when no person is in the database', (done) => {
      chai.request(server)
        .get('/persons')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('person').eql([]);
          done();
        });
    });
  });
  describe('/POST Person', () => {
    it('should create a new person', (done) => {
      chai.request(server)
        .post('/persons')
        .send(mockData.person.person1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName').eql('Kene');
          res.body.should.have.property('lastName').eql('Nnamani');
          res.body.should.have.property('age').eql(29);
          res.body.should.have.property('favouriteColour').eql('Brown');
          done();
        });
    });
    it('should not create duplicate person', (done) => {
      chai.request(server)
        .post('/persons')
        .send(mockData.person.person1)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .eql('Person with the firstName and LastName already exists');
          done();
        });
    });
    it('should not create person if the parameters are not valid', (done) => {
      chai.request(server)
        .post('/persons')
        .send(mockData.person.person2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .eql('favouriteColour field is required');
          done();
        });
    });
  });
  describe('/GET Person', () => {
    it('should get all persons is in the database', (done) => {
      chai.request(server)
        .get('/persons')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('person');
          res.body.person.length.should.be.eql(1);
          id = res.body.person[0].id;
          done();
        });
    });
    it('should get single persons with its id', (done) => {
      chai.request(server)
        .get(`/persons/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName').eql('Kene');
          res.body.should.have.property('lastName').eql('Nnamani');
          res.body.should.have.property('age').eql(29);
          res.body.should.have.property('favouriteColour').eql('Brown');
          done();
        });
    });
    it('should not get single persons if an invalid id is passed', (done) => {
      chai.request(server)
        .get('/persons/iamnotavalidid')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .eql('id not a valid object');
          done();
        });
    });
  });
  describe('/UPDATE Person', () => {
    it('should not update a person with invalid id', (done) => {
      chai.request(server)
        .put('/persons/iamnotavalidid')
        .send(mockData.person.updatePerson1)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .eql('id not a valid object');
          done();
        });
    });
    it('should update person', (done) => {
      chai.request(server)
        .put(`/persons/${id}`)
        .send(mockData.person.updatePerson1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName').eql('Kene');
          res.body.should.have.property('lastName').eql('Nnamani');
          res.body.should.have.property('age').eql(28);
          res.body.should.have.property('favouriteColour').eql('White');
          done();
        });
    });
  });
  describe('/DELETE Person', () => {
    it('should not delete a person with invalid id', (done) => {
      chai.request(server)
        .delete('/persons/iamnotavalidid')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
            .eql('id not a valid object');
          done();
        });
    });
    it('should delete person', (done) => {
      chai.request(server)
        .delete(`/persons/${id}`)
        .send(mockData.person.updatePerson1)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
