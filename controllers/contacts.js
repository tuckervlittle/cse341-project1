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
  try {
    const contactId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }
    const contact = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
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

module.exports = contactsController;