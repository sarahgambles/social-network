const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
    userName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,

    },
    thoughts: [],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.replies.length + 1, 0);
});

module.exports = User;