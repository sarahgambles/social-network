const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
          .sort({ createdAt: -1 })
          .then((dbThoughtData) => {
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // // get single though by its _id
    // getThoughtById(req, res) {
    //     Thought.findOne({ _id: req.params.id })
    //     populate({
    //         path: 'thoughts',
    //         select: '-__v'
    //     })
    //     .select('-__v')
    //     .then(dbThoughtData => {
    //         // if no thought is found, send 404
    //         if (!dbThoughtData) {
    //             res.status(404).json({ message: 'No thought found with this id!' })
    //             .catch(err => res.status(400).json(err));
    //         }
    //         res.json(dbThoughtData);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(400).json(err);
    //     });

    // },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

    // create new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user id' });
      }
      res.json({ message: 'Thought created successfully!' });
    })
        .catch(err => res.status(400).json(err));
    },

    // update thought by its _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, 
          { $set: req.body },
          { runValidators: true, new: true })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // delete though by its _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thougthId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            
            return User.findeOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            );
        }).then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'Thought created but no user found with this id.' });
          }
          res.json({ message: 'Thought deleted!' });
        })
        .catch((err) => res.status(400).json(err));
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // remove reaction from a thought
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

};

module.exports = thoughtController;