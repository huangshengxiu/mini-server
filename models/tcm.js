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
    // 别名
    nice_name: {
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
    // 形态
    shape: {
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
    // 采收加工
    harvesting_processing: {
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
    // 性味归经
    meridian_tropism: {
        type: String,
        require: true,
        default: defaultData
    },
    // 功效与作用
    efficacy_and_function: {
        type: String,
        require: true,
        default: defaultData
    },
    // 药理研究
    pharmacological_research: {
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
    // 主要成分
    main_components: {
        type: String,
        require: true,
        default: defaultData
    },
    // 使用禁忌
    use_taboo: {
        type: String,
        require: true,
        default: defaultData
    },
    // 配伍药方
    compatibility_prescription: {
        type: String,
        require: true,
        default: defaultData
    },
    // 药用部位
    medicinal_parts: {
        type: String,
        require: true,
        default: defaultData
    },
};

var TCMSchema = mongoose.Schema(schemaModel);
// mongoose.model()接收两个或三个参数，传递两个参数时操作的数据表就是第一个参数后加上s的表
// 传进第三个参数时，操作的就是第三个参数同名的数据库表
var TCMModel = mongoose.model('TCM', TCMSchema, 'tcm');
TCMModel.createIndexes();

var findMediceBypy = (data) => {
    return TCMModel.find(data, {
        'zn_name': 1,
        'medicine_name': 1,
        'nice_name': 1,
        'origin': 1,
        'meridian_tropism': 1
    });
}

var findMediceBy = (data) => {
    return TCMModel.find(data, {
        'medicine_name': 1,
        'nice_name': 1,
        'origin': 1,
        'meridian_tropism': 1
    });
}

var find = (data) => {
    return TCMModel.find(data);
}

var findOne = (data) => {
    return TCMModel.findOne({
        medicine_name: data
    });
}

var bypagination = (data) => {
    let size = Number(data.size);
    let skipNumber = (Number(data.pages) - 1) * size;
    // searchData是搜索的主体，一般是对象，对象里可以有多个内容,例如正则等
    // pageIndex是传进来的当前页的前一页，pageSize是每次分页查询的数量
    // skip指的是跳过当前页少一页的所有数据，所以查到的就是当前页的数据
    return TCMModel.find(data.searchData).skip(skipNumber).limit(size);
}

var pagination = (data) => {
    let size = Number(data.size);
    let skipNumber = (Number(data.pages) - 1) * size;
    // searchData是搜索的主体，一般是对象，对象里可以有多个内容,例如正则等
    // pageIndex是传进来的当前页的前一页，pageSize是每次分页查询的数量
    // skip指的是跳过当前页少一页的所有数据，所以查到的就是当前页的数据
    return TCMModel.find(data.searchData, data.select).sort({
        zn_name: 'asc'
    }).skip(skipNumber).limit(size);
}

var update = (name, pinyin) => {
    return TCMModel.update({
        'medicine_name': name
    }, {
        $set: {
            'zn_name': pinyin
        }
    })
}

var findPinyin = (data) => {
    return TCMModel.find(data, {
        zn_name: 1,
        medicine_name: 1
    });
}


module.exports = {
    find,
    findOne,
    pagination,
    bypagination,
    update,
    findPinyin,
    findMediceBy,
    findMediceBypy
}