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
    // 拼音
    zn_name: {
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
    // 临床应用
    clinical_application: {
        type: String,
        require: true,
        default: defaultData
    },
    // 方解
    analysis: {
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

var PrescriptionSchema = mongoose.Schema(schemaModel);
// mongoose.model()接收两个或三个参数，传递两个参数时操作的数据表就是第一个参数后加上s的表
// 传进第三个参数时，操作的就是第三个参数同名的数据库表
var PrescriptionModel = mongoose.model('prescription', PrescriptionSchema, 'prescription');
PrescriptionModel.createIndexes();

var findPrescriptionBy = (data) => {
    return PrescriptionModel.find(data, {
        'prescription_name': 1,
        'origin': 1,
        'efficacy': 1,
        'prescription_song': 1
    });
}

var findPrescriptionBypy = (data) => {
    return PrescriptionModel.find(data, {
        'zn_name': 1,
        'prescription_name': 1,
        'origin': 1,
        'efficacy': 1,
        'prescription_song': 1
    });
}

var find = (data) => {
    return PrescriptionModel.find(data);
}

var findOne = (data) => {
    return PrescriptionModel.findOne({
        prescription_name: data
    });
}

var findName = (data) => {
    return PrescriptionModel.find(data, {
        prescription_name: 1
    });
}

var pagination = (data) => {
    let size = Number(data.size);
    let skipNumber = (Number(data.pages) - 1) * size;
    // searchData是搜索的主体，一般是对象，对象里可以有多个内容,例如正则等
    // pageIndex是传进来的当前页的前一页，pageSize是每次分页查询的数量
    // skip指的是跳过当前页少一页的所有数据，所以查到的就是当前页的数据
    return PrescriptionModel.find(data.searchData, data.select).sort({
        zn_name: 'asc'
    }).skip(skipNumber).limit(size);
}

var update = (name, pinyin) => {
    return PrescriptionModel.update({
        'prescription_name': name
    }, {
        $set: {
            'zn_name': pinyin
        }
    })
}

var findPinyin = (data) => {
    return PrescriptionModel.find(data, {
        zn_name: 1,
        prescription_name: 1
    });
}

module.exports = {
    findPrescriptionBy,
    findPrescriptionBypy,
    find,
    findOne,
    findName,
    pagination,
    update,
    findPinyin
}