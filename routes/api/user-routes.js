const router = require('express').Router();

const {
    getAllUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend

} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
.route('/')
.get(getAllUser)
.post(createUser)

// Set up GET one, PUT, and DELETE at /api/users/:userid/friends/:friendId
router.route('/:userId').get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend)
.delete(removeFriend)

module.exports = router;