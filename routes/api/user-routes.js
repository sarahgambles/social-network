const router = require('express').Router();

const {
    getAllUsers,
    getUserByID,
    createFriend,
    updateUser,
    deleteUser,
    deleteFriend
} = require('../../controllers/user-controller');

const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Set up GET all and POST at /api/users
router
.route('/')
.get(getAllUsers)
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

// Set up GET one, PUT, and DELETE at /api/users/:userid/friends/:friendId
router.route('/:userId/friends/:friendId').post(createFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);



router
.route('/:id')
.post(createFriend)
.delete(deleteFriend)

module.exports = router;