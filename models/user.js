var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var schemaModel = {
    user_name: {
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
};

var userSchema = mongoose.Schema(schemaModel);
var userModel = mongoose.model('user', userSchema, 'users');
userModel.createIndexes();

var save = data => {
    var user = new userModel({
        user_name: data
    });
    return user.save()
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}

var findOne = data => {
    return userModel.findOne({
        user_name: data
    })
}

module.exports = {
    save,
    findOne
}