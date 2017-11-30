const router = require('express').Router();
const contactsRoutes = require('./contacts')
const contacts = require('../../models/contacts');
const middlewares = require('../middlewares');
const members = require('../../models/db/members')
const bcrypt = require('../../controller/index')

router.get('/', (request, response, next) => {
  if(request.session.loggedin){
    contacts.findAll()
      .then((contacts) => {response.render('contacts/index', { contacts, role:request.session.role })})
      .catch( error => next(error));
    } else {
      response.redirect('/login');
    }
})

router.get('/signup', (request, response) => {
  response.render("contacts/signup")
})


router.post('/signup', (request, response) => {
  const {password, username, role} = request.body;
  const admin = role === 'on' ? true : false;
  bcrypt
    .hashPassword(password)
    .then(hashPass => members.create(username, hashPass[0], hashPass[1], admin)) // save hashed password and salt
    .then(() => response.redirect('/login'));
})

router.get('/login', (request, response) => {
  response.render('contacts/login', {"notFound": false})
})

router.post('/login', (request, response) => {
  const memberInput = request.body;
  const notFound = true;
  members.findByUsername(memberInput.username)
  .then(function(member) {
    bcrypt.checkHash(memberInput.password, member[0].salt).then((pw) => {
      if(!member || member[0].password != pw) {
        response.render('contacts/login', {notFound})
      } else {
        request.session.loggedin = true;
        request.session.role = member[0].role;
        response.redirect('/');
      }
    }).catch(console.log);

  })
})

router.get('/logout', (request, response, next) => {
  request.session.destroy(e=>console.error);
  response.redirect('/login');
});


router.use('/contacts', (req, res, next) => {
if(req.session.loggedin){
  contactsRoutes(req, res, next);
} else {
  res.redirect('/login');
}
});

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler)

module.exports = router;
