const contacts = require('../../models/contacts');

const router = require('express').Router();

router.get('/new', (request, response) => {
  if (request.session.role === 'admin') {
    response.render('contacts/new');
  } else {
    response.status(403).send('Error: you don\'t have permission');
  }
});

router.post('/', (request, response, next) => {
  contacts.create(request.body)
    .then(function (contact) {
      if (contact) return response.redirect(`/contacts/${contact[0].id}`);
      next();
    })
    .catch(error => next(error));
});

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId;
  if (!contactId || !/^\d+$/.test(contactId)) return next();
  contacts.findById(contactId)
    .then(function (contact) {
      if (contact) return response.render('contacts/show', { contact, role: request.session.role });
      next();
    })
    .catch(error => next(error));
});


router.delete('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId;
  if (request.session.role === 'admin') {
    contacts.destroy(contactId)
      .then(function (contact) {
        if (contact) return response.redirect('/');
        next();
      })
      .catch(error => next(error));
  } else {
    response.status(403).send('Error: you don\'t have permission');
  }
});

router.get('/search', (request, response, next) => {
  const query = request.query.q;
  contacts.search(query)
    .then(function (contactList) {
      if (contactList) return response.render('contacts/index', { query, contactList, role: request.session.role });
      next();
    })
    .catch(error => next(error));
});

module.exports = router;
