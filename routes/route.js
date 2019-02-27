const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/create', controller.post);
router.get('/:id', controller.get);
router.get('/', controller.getAll);
router.get('/:id/update', controller.putGet);
router.post('/:id/update', controller.putPost);
router.get('/:id/delete', controller.delete);

module.exports = router;
