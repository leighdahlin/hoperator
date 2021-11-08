const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
  breweryId: {
  type: String,
  required: true,
},
user: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  },
  
});

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;