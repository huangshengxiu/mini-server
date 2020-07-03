var mongoose = require('mongoose');
var {
    defaultData
} = require('../utils/config.js');
mongoose.set('useCreateIndex', true);
var schemaModel = {
    // 方剂名
    story_name: {
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
    // 内容
    content: {
        type: String,
        require: true,
        default: defaultData
    }
};

var StorySchema = mongoose.Schema(schemaModel);
// mongoose.model()接收两个或三个参数，传递两个参数时操作的数据表就是第一个参数后加上s的表
// 传进第三个参数时，操作的就是第三个参数同名的数据库表
var StoryModel = mongoose.model('story', StorySchema, 'story');
StoryModel.createIndexes();

var findStoryByName = (data) => {
    let searchData = new RegExp(data);
    return StoryModel.find({
        story_name: searchData
    }, {
        story_name: 1
    });
}

var find = (data) => {
    return StoryModel.find(data);
}

var findContent = (data) => {
    return StoryModel.findOne({
        story_name: data
    }, {
        content: 1
    });
}

var pagination = (data) => {
    let size = Number(data.size);
    let skipNumber = (Number(data.pages) - 1) * size;
    // searchData是搜索的主体，一般是对象，对象里可以有多个内容,例如正则等
    // pageIndex是传进来的当前页的前一页，pageSize是每次分页查询的数量
    // skip指的是跳过当前页少一页的所有数据，所以查到的就是当前页的数据
    return StoryModel.find(data.searchData, {
        story_name: 1
    }).skip(skipNumber).limit(size);
}


module.exports = {
    findStoryByName,
    find,
    findContent,
    pagination
}