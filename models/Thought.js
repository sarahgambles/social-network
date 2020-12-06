const { Schema, model, Types } = require('mongoose');

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
            {
                
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

const Thought = model('Thought', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce((total, reactions) => total + reactions.length + 1, 0);
});