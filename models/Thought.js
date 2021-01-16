const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./reactionSchema');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Must be between 1 and 280 characters'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
           reactionSchema
        ]
},
{ 
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);



ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce((total, reactions) => total + reactions.length + 1, 0);
});

const Thought = model('Thought', ThoughtSchema); 

module.exports = Thought;