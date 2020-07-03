var mongoose = require('mongoose');
var {
    defaultData
} = require('../utils/config.js');
mongoose.set('useCreateIndex', true);
var schemaModel = {
    // 中药名
    medicine_name: {
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
    // 拼音
    zn_name: {
        type: String,
        require: true,
        default: defaultData
    },
    // 图片地址
    medicine_img: {
        type: String,
        require: true,
        default: defaultData
    },
    // 拉丁名
    latin_name: {
        type: String,
        require: true,
        default: defaultData
    },
    // 英文名
    en_name: {
        type: String,
        require: true,
        default: defaultData
    },
    // 来源
    origin: {
        type: String,
        require: true,
        default: defaultData
    },
    // 类别
    classification: {
        type: String,
        require: true,
        default: defaultData
    },
    // 产地分布
    origin_distribution: {
        type: String,
        require: true,
        default: defaultData
    },
    // 药材性状
    medicinal_properties: {
        type: String,
        require: true,
        default: defaultData
    },
    // 品质
    quality: {
        type: String,
        require: true,
        default: defaultData
    },
    // 性味
    flavor: {
        type: String,
        require: true,
        default: defaultData
    },
    // 功效
    efficacy: {
        type: String,
        require: true,
        default: defaultData
    }
};

var TCMImgSchema = mongoose.Schema(schemaModel);
// mongoose.model()接收两个或三个参数，传递两个参数时操作的数据表就是第一个参数后加上s的表
// 传进第三个参数时，操作的就是第三个参数同名的数据库表
var TCMImgModel = mongoose.model('TCMImg', TCMImgSchema, 'tcm_img');
TCMImgModel.createIndexes();

var findMediceImgByName = (data) => {
    let searchData = new RegExp(data);
    return TCMImgModel.find({
        medicine_name: searchData
    });
}

var find = (data) => {
    return TCMImgModel.find(data);
}

var findOne = (data) => {
    return TCMImgModel.findOne({
        medicine_name: data
    });
}

var findby = (data) => {
    return TCMImgModel.find(data, {
        'medicine_name': 1,
        'efficacy': 1,
        'classification': 1,
        'medicine_img': 1
    });
}

var findbypy = (data) => {
    return TCMImgModel.find(data, {
        'zn_name':1,
        'medicine_name': 1,
        'efficacy': 1,
        'classification': 1,
        'medicine_img': 1
    });
}

var pagination = (data) => {
    let size = Number(data.size);
    let skipNumber = (Number(data.pages) - 1) * size;
    // searchData是搜索的主体，一般是对象，对象里可以有多个内容,例如正则等
    // pageIndex是传进来的当前页的前一页，pageSize是每次分页查询的数量
    // skip指的是跳过当前页少一页的所有数据，所以查到的就是当前页的数据
    return TCMImgModel.find(data.searchData, data.select).sort({
        zn_name: 'asc'
    }).skip(skipNumber).limit(size);
}

var update = (name, newdata) => {
    return TCMImgModel.update({
        medicine_name: name
    }, {
        $set: {
            medicine_img: newdata
        }
    })
}

module.exports = {
    findMediceImgByName,
    find,
    findby,
    findOne,
    pagination,
    update,
    findbypy
}