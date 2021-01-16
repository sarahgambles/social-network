const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction

} = require('../../controllers/thought-controller');
const thoughtController = require('../../controllers/thought-controller');

// Set up GET and POST routes /api/thoughts
router 
.route('/')
.get(getThoughts)
.post(createThought)

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

module.exports = router;