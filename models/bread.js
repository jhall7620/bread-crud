const mongoose = require('mongoose')

const breadSchema = new mongoose.Schema({
  name: {
    type: String
  },
  hasGluten: {
    type: Boolean
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  baker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Baker'
  }
})

breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker.name} who has been here since ${this.baker.startDate.getFullYear()}`
}

breadSchema.methods.hasGlutenParagraph = function() {
  return `and it ${this.hasGluten ? 'does' : 'does not'} have gluten`
}

module.exports = mongoose.model('Bread', breadSchema)