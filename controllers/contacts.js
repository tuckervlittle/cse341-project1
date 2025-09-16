const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const contactsController = {};

contactsController.getAll = async (req, res) => {
  try {
    const contacts = await mongodb.getDatabase().collection('contacts').find();
    const contactsList = await contacts.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contactsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

contactsController.getSingle = async (req, res) => {
  //#swagger.tags = ['Contacts']
  //#swagger.description = 'Get a single contact by ID.'
  //#swagger.parameters['id'] = { description: 'Contact ID.' }
  try {
    const contactId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const contact = await mongodb
      .getDatabase()
      .collection('contacts')
      .findOne({ _id: contactId });
    if (contact) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

contactsController.createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  //#swagger.description = 'Create a new contact.'
  //#swagger.parameters['obj'] = {
  //  in: 'body',
  //  description: 'Contact information.',
  //  required: true,
  //  schema: { $ref: '#/definitions/Contact' }
  //}
  try {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    }
    const result = await mongodb.getDatabase().collection('contacts').insertOne(newContact);
    res.status(201).json(result);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

contactsController.updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  //#swagger.description = 'Update an existing contact by ID.'
  //#swagger.parameters['id'] = { description: 'Contact ID.' }
  //#swagger.parameters['obj'] = {
  //  in: 'body',
  //  description: 'Updated contact information.',
  //  required: true,
  //  schema: { $ref: '#/definitions/Contact' }
  //}
  try {
    const contactId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const updateSingle = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    }
    const result = await mongodb.getDatabase().collection('contacts').updateOne({ _id: contactId }, { $set: updateSingle });
    if (result.matchedCount > 0) {
      res.status(200).json(result);
    }
    else {
      res.status(404).json({ message: 'Contact not found' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

contactsController.deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  //#swagger.description = 'Delete a contact by ID.'
  //#swagger.parameters['id'] = { description: 'Contact ID.' }
  try {
    const contactId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
      res.status(200).json(result);
    }
    else {
      res.status(404).json({ message: 'Contact not found' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = contactsController;