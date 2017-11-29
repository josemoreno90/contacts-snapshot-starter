const router = require('express').Router();
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');
const members = require('../../models/db/members')
const bcrypt = require('../../controller/index')

router.get('/', (request, response, next) => {
  contacts.findAll()
    .then((contacts) => {response.render('contacts/index', { contacts })})
    .catch( error => next(error) )
})

router.get('/signup', (request, response) => {
  response.render("contacts/signup")
})


router.post('/signup', (request, response) => {
  const {password, username} = request.body;

  bcrypt
    .hashPassword(password)
    .then(hashPass => members.create(username, hashPass))
    .then(() => response.redirect('/login'));
})

router.get('/login', (request, response) => {
  response.render('contacts/login', {"notFound": false})
})

router.post('/login', (request, response) => {
  const memberInput = request.body;
  const notFound = true;
  console.log(memberInput.username)
  members.findByUsername(memberInput.username)
  .then(function(member) {
    bcrypt.hashPassword(memberInput.password).then((pw) => {
      if(!member || member[0].password != pw) {
        response.render('contacts/login', {notFound})
      } else {
        response.redirect('/');
      }
    })

  })
})



router.use('/contacts', contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
