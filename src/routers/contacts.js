import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { authorize } from '../middlewares/authorize.js';

const router = Router();

router.use(authenticate);

router.get(
  '/contacts/:contactId',
  isValidId,
  authorize,
  ctrlWrapper(getContactByIdController),
);

router.get('/contacts', ctrlWrapper(getContactsController));

router.post(
  '/contacts',
  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/contacts/:contactId',
  isValidId,
  authorize,
  ctrlWrapper(deleteContactController),
);
router.patch(
  '/contacts/:contactId',
  isValidId,
  authorize,
  upload.single('photo'),
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

export default router;
