import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contacts.js';

export const authorize = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  if (!contactId) {
    return next(createHttpError(400, 'Missing contact ID'));
  }

  const contact = await ContactsCollection.findOne({ _id: contactId, userId });

  if (!contact) {
    return next(createHttpError(403, 'You do not have access to this contact'));
  }

  req.contact = contact;

  next();
};
