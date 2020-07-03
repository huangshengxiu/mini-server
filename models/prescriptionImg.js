var mongoose = require('mongoose');
var {
    defaultData
} = require('../utils/config.js');
mongoose.set('useCreateIndex', true);
var schemaModel = {
    // 方剂名
    prescription_name: {
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
    // 方剂图解
    prescription_img: {
        type: String,
        require: true,
        default: defaultData
    },
    // 拼音
    zn_name: {
        type: String,
        require: true,
        default: defaultData
    },
    // 英文
    en_name: {
        type: String,
        require: true,
        default: defaultData
    },
    // 分类
    classification: {
        type: String,
        require: true,
        default: defaultData
    },
    // 来源出处
    origin: {
        type: String,
        require: true,
        default: defaultData
    },
    // 组成
    composition: {
        type: String,
        require: true,
        default: defaultData
    },
    // 用法
    usage: {
        type: String,
        require: true,
        default: defaultData
    },
    // 功效
    efficacy: {
        type: String,
        require: true,
        default: defaultData
    },
    // 主治
    indications: {
        type: String,
        require: true,
        default: defaultData
    },
    // 运用
    application: {
        type: String,
        require: true,
        default: defaultData
    },
    // 病机
    pathogenesis: {
        type: String,
        require: true,
        default: defaultData
    },
    // 附方
    annex: {
        type: String,
        require: true,
        default: defaultData
    },
    // 方歌
    prescription_song: {
        type: String,
        require: true,
        default: defaultData
    },
};

var PrescriptionImgSchema = mongoose.Schema(schemaModel);
// mongoose.model()接收两个或三个参数，传递两个参数时操作的数据表就是第一个参数后加上s的表
// 传进第三个参数时，操作的就是第三个参数同名的数据库表
var PrescriptionImgModel = mongoose.model('prescriptionImg', PrescriptionImgSchema, 'prescription_img');
PrescriptionImgModel.createIndexes();

var findPrescriptionImgBy = (data) => {
    return PrescriptionImgModel.find(data, {
        'prescription_name': 1,
        'efficacy': 1,
        'classification': 1,
        'prescription_img': 1
    });
}

var findPrescriptionImgBypy = (data) => {
    return PrescriptionImgModel.find(data, {
        'zn_name': 1,
        'prescription_name': 1,
        'efficacy': 1,
        'classification': 1,
        'prescription_img': 1
    });
}

var find = (data) => {
    return PrescriptionImgModel.find(data);
}

var findOne = (data) => {
    return PrescriptionImgModel.findOne({
        prescription_name: data
    });
}

var findName = (data) => {
    return PrescriptionImgModel.find(data, {
        prescription_name: 1
    });
}

var pagination = (data) => {
    let size = Number(data.size);
    let skipNumber = (Number(data.pages) - 1) * size;
    // searchData是搜索的主体，一般是对象，对象里可以有多个内容,例如正则等
    // pageIndex是传进来的当前页的前一页，pageSize是每次分页查询的数量
    // skip指的是跳过当前页少一页的所有数据，所以查到的就是当前页的数据
    return PrescriptionImgModel.find(data.searchData, data.select).sort({
        zn_name: 'asc'
    }).skip(skipNumber).limit(size);
}

var update = (name, newdata) => {
    return PrescriptionImgModel.update({
        prescription_name: name
    }, {
        $set: {
            prescription_img: newdata
        }
    })
}


module.exports = {
    findPrescriptionImgBy,
    findPrescriptionImgBypy,
    find,
    findOne,
    findName,
    pagination,
    update
}