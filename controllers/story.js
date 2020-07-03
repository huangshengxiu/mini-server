var StoryModel = require('../models/story.js');

let searchStoryByName = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await StoryModel.findStoryByName(name);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 5000
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 5001
            });
        }
    } else {
        res.send({
            data: err,
            status: 5002
        });
    }
}

// 分页查询全部中药故事
let searchStory = async (req, res, next) => {
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: {}
    }
    let result = await StoryModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 5100
            });
        } else {
            res.send({
                data: '数据库没有内容',
                status: 5101
            });
        }
    } else {
        res.send({
            data: err,
            status: 5102
        });
    }
}

let searchStoryContent = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await StoryModel.findContent(name);
    if (result) {
        res.send({
            data: result,
            status: 5200
        });

    } else {
        res.send({
            data: err,
            status: 5201
        });
    }
}

module.exports = {
    searchStoryByName,
    searchStory,
    searchStoryContent
}