const router = require('express').Router();
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');
const members = require('../../models/db/members')

router.get('/', (request, response, next) => {
  contacts.findAll()
    .then((contacts) => {response.render('contacts/index', { contacts })})
    .catch( error => next(error) )
})

router.get('/signup', (request, response) => {
  response.render("contacts/signup")
})


router.post('/signup', (request, response) => {
  const member = request.body;
  members.createMember(member)
  .then(response.render('contacts/login'));
})


router.use('/contacts', contactsRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
