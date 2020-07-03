var TCMModel = require('../models/tcm.js');
var {
    checkpy
} = require('../utils/baseMethods.js');
const {
    transliterate
} = require('transliteration');
let select = {
    'medicine_name': 1,
    'nice_name': 1,
    'origin': 1,
    'meridian_tropism': 1
};

// 中药首页分页查询全部中药
let searchAll = async (req, res, next) => {
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: {},
        select: select
    }
    let result = await TCMModel.pagination(data);
    if (result) {
        // 数据库中有数据
        if (result.length) {
            res.send({
                data: result,
                status: 1000
            })
        } else {
            res.send({
                data: '没有找到数据',
                status: 1001
            })
        }
    } else {
        res.send({
            data: err,
            status: 1002
        })
    }
}

// 中药首页输入框通过名字模糊查找中药
let searchMedicineByName = async (req, res, next) => {
    let {
        name
    } = req.query;
    let searchData = new RegExp(name);
    let data = {
        medicine_name: searchData
    }
    let result = await TCMModel.findMediceBy(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 1100
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 1101
            });
        }
    } else {
        res.send({
            data: err,
            status: 1102
        });
    }
}

// 通过拼音字母分类分页查询中药
let searchMedicineByZn = async (req, res, next) => {
    let {
        alphabet
    } = req.query;
    let reg = new RegExp('^' + alphabet, 'i');
    let searchData = {
        zn_name: reg
    };
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: searchData,
        select: select
    }
    let result = await TCMModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 1200
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 1201
            });
        }
    } else {
        res.send({
            data: err,
            status: 1202
        });
    }
}

// 通过药性分类分页查询中药
let getMedicineByMedicinal = async (req, res, next) => {
    let medicinal = req.query.medicinal.split('')[0];
    let reg = new RegExp(medicinal);
    let searchData = {
        meridian_tropism: reg
    };
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: searchData,
        select: select
    }
    let result = await TCMModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 1300
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 1301
            });
        }
    } else {
        res.send({
            data: err,
            status: 1302
        });
    }
}

let getMedicineContent = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await TCMModel.findOne(name);
    if (result) {
        res.send({
            data: result,
            status: 1400
        });
    } else {
        res.send({
            data: err,
            status: 1401
        });
    }
}


let setPinyin = async (req, res, next) => {
    let result = await TCMModel.find();
    if (result) {
        if (result.length) {
            let success;
            for (let i = 0; i < result.length; i++) {
                let py = transliterate(result[i].medicine_name);
                success = await TCMModel.update(result[i].medicine_name, py);
            }
            if (success) {
                res.send({
                    data: success,
                    status: 1500
                })
            }
        } else {
            res.send({
                data: '没有找到数据',
                status: 1501
            })
        }
    } else {
        res.send({
            data: err,
            status: 1502
        })
    }
}

let findPinyin = async (req, res, next) => {
    let result = await TCMModel.findPinyin();
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 1600
            })
        } else {
            res.send({
                data: '没有找到数据',
                status: 1601
            })
        }
    } else {
        res.send({
            data: err,
            status: 1602
        })
    }
}

// 中药首页输入框通过拼音模糊查找中药
let searchMedicineByPy = async (req, res, next) => {
    let {
        py
    } = req.query;
    let result = await TCMModel.findMediceBypy();
    if (result) {
        if (result.length) {
            let data = checkpy(result, py);
            res.send({
                data: data,
                status: 1700
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 1701
            });
        }
    } else {
        res.send({
            data: err,
            status: 1702
        });
    }
}

// 中药首页输入框通过功效模糊查找中药
let searchMedicineByEff = async (req, res, next) => {
    let {
        effect
    } = req.query;
    let searchData = new RegExp(effect);
    let data = {
        efficacy_and_function: searchData
    }
    let result = await TCMModel.findMediceBy(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 1800
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 1801
            });
        }
    } else {
        res.send({
            data: err,
            status: 1802
        });
    }
}


module.exports = {
    searchAll,
    searchMedicineByName,
    searchMedicineByZn,
    getMedicineByMedicinal,
    getMedicineContent,
    setPinyin,
    findPinyin,
    searchMedicineByEff,
    searchMedicineByPy
}