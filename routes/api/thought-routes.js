const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById
} = require('../../controllers/thought-controller');

const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Set up GET and POST routes /api/thoughts
router 
.route('/')
.get(getAllThoughts)
.get(getThoughtById)
.post(createThought)
.put(updateThoughtById)
.delete(deleteThoughtById);

module.exports = router;