const router = require('express').Router();

const {
    createReaction,
    deleteReactionById
};

router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Set up POST and DELETE routes /:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions').delete(deleteReactionById);

module.exports = router;