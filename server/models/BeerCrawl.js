const { Schema, model } = require('mongoose');

const beercrawlSchema = new Schema({
  title: {
  type: String,
  required: true,
},
city: {
  type: String,
  required: true,
},
state: {
  type: String,
  required: true,
},
brewery_ids: {
  type: String,
  required: true,
},
createdAt: {
  type: Date,
  default: Date.now
},
user: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  },
  
});

const BeerCrawl = model('BeerCrawl', beercrawlSchema);

module.exports = BeerCrawl;