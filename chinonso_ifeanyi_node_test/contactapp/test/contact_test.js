const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

describe('Contact Test', function(){

	it('it should create Contact List', function(done){
		let contact = {
			name: 'Nonso',
			phone_number: '08086056000',
			email: 'nonso@yahoo.com'
		}
	   request(app)
      .post('/')
      .send(contact)
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        assert.equal(res.body.name, 'Nonso');
        done();
      })
	})

    describe('Contact Test', function(){
   // Testing get all contact endpoint
  describe('Get all contact List', function () {
      it('respond with json containing a list of all users', function (done) {
          request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
  });

   // Testing get a contact endpoint
  describe('Get a contact with an exisiting id', function () {
      it('respond with json containing a list of all users', function (done) {
          request(app)
            .get('/:id')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
  });

  //Testing get a user endpoint by giving a non-existing user
  describe(' Get a non-existing user/:idisnonexisting', function () {
    it('respond with json user not found', function (done) {
        request(app)
        .get('/idisnonexisting')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404) //expecting HTTP status code
        .expect('"user not found"') // expecting content value
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
  });


});