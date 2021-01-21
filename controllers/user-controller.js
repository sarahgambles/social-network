const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('friends')
          .populate('thoughts')
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // // get one User by id
    // getUserById({ params }, res) {
    //     User.findOne({ _id: params.id })
    //     .then(dbUserData => {
    //         // if no user is found, send 404
    //         if (!dbUserData) {
    //             res.status(404).json({ message: 'No user found with this id!' });
    //             return;
    //         }
    //         res.json(dbUserData);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(400).json(err);
    //     });
    // },

    // createUser
    createUser(req, res) {
        User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: params.id }, 
          { $set: req.body, },
           { runValidators: true, new: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .then(() => {
          res.json({ message: 'User and associated thoughts have been deleted!' });
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // remove friend from friend list
      removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
};

module.exports = userController;