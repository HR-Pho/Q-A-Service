const mongoose = require('mongoose');
const { Schema } = mongoose;
/* ---- SCHEMA TYPES ----
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map
*/

//mongoose auto creates ids
const qaSchema = new Schema({
  productId: Number,
  questionBody:  String,
  questionAuthor: String,
  questionCreation: String,
  questionReported: Boolean,
  questionHelpfulness: Number,
  answers: [{
    questionId: Number,
    answerBody:  String,
    answerAuthor: String,
    answerCreation: String,
    answerReported: Boolean,
    answerHelpfulness: Number,
    answerPhotos: [{
      answerId: Number,
      url: String,
    }]
  }]
});

const QA = mongoose.model('QA', qaSchema);