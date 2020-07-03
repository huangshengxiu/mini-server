var PrescriptionModel = require('../models/prescription.js');
var {
    createReg,
    formatAllComp,
    getOriginList,
    checkpy
} = require('../utils/baseMethods.js');
const {
    transliterate
} = require('transliteration');
let select = {
    'prescription_name': 1,
    'origin': 1,
    'efficacy': 1,
    'prescription_song': 1
};

// 根据输入的内容模糊查询方剂
let searchPrescriptionByName = async (req, res, next) => {
    let {
        name
    } = req.query;
    let reg = new RegExp(name);
    let data = {
        prescription_name: reg
    }
    let result = await PrescriptionModel.findPrescriptionBy(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 4000
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 4001
            });
        }
    } else {
        res.send({
            data: err,
            status: 4002
        });
    }
}

// 根据输入的组成药名模糊查询方剂
let searchPreByComp = async (req, res, next) => {
    let {
        name
    } = req.query;
    let compositionArr = name.split(' ');
    let reg = createReg(compositionArr, 'composition');
    let searchData = {
        $and: reg
    };
    let result = await PrescriptionModel.findName(searchData);
    if (result) {
        if (result.length) {
            let finalresult = formatAllComp(result, 'origin', '方剂大全')
            res.send({
                data: finalresult,
                status: 4100
            });
        } else {
            res.send({
                data: '非常抱歉，本小程序暂未收录到符合要求的方剂。',
                status: 4101
            });
        }
    } else {
        res.send({
            data: err,
            status: 4102
        });
    }
}

// 全部分页搜索方剂
let getAllPrescription = async (req, res, next) => {
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: {},
        select: select
    }
    let result = await PrescriptionModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 4200
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 4201
            });
        }
    } else {
        res.send({
            data: err,
            status: 4202
        });
    }
}

// 获取全部出处
let getPrescriptionOrigin = async (req, res, next) => {
    let result = await PrescriptionModel.find();
    if (result) {
        if (result.length) {
            let data = getOriginList(result, 'origin')
            res.send({
                data: data,
                status: 4300
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 4301
            });
        }
    } else {
        res.send({
            data: err,
            status: 4302
        });
    }
}

// 按出处分页查找方剂
let getPreByOrigin = async (req, res, next) => {
    let reg = new RegExp(req.query.origin);
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: {
            origin: reg
        },
        select: select
    }
    let result = await PrescriptionModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 4400
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 4401
            });
        }
    } else {
        res.send({
            data: err,
            status: 4402
        });
    }
}

// 按首字母分页查找方剂
let getPreByZn = async (req, res, next) => {
    let reg = new RegExp('^' + req.query.alphabet, 'i');
    let searchdata = {
        zn_name: reg
    };
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: searchdata,
        select: select
    }
    let result = await PrescriptionModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 4500
            });
        } else {
            res.send({
                data: result,
                status: 4501
            });
        }
    } else {
        res.send({
            data: err,
            status: 4502
        });
    }
}

let getPreContent = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await PrescriptionModel.findOne(name);
    if (result) {
        res.send({
            data: result,
            status: 4600
        });
    } else {
        res.send({
            data: err,
            status: 4601
        });
    }
}


let setPinyin = async (req, res, next) => {
    let result = await PrescriptionModel.find();
    if (result) {
        if (result.length) {
            let success;
            for (let i = 0; i < result.length; i++) {
                let py = transliterate(result[i].prescription_name);
                success = await PrescriptionModel.update(result[i].prescription_name, py);
            }
            if (success) {
                res.send({
                    data: success,
                    status: 4700
                })
            }
        } else {
            res.send({
                data: '没有找到数据',
                status: 4701
            })
        }
    } else {
        res.send({
            data: err,
            status: 4702
        })
    }
}

let findPinyin = async (req, res, next) => {
    let result = await PrescriptionModel.findPinyin();
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 4800
            })
        } else {
            res.send({
                data: '没有找到数据',
                status: 4801
            })
        }
    } else {
        res.send({
            data: err,
            status: 4802
        })
    }
}

// 根据输入的拼音模糊查询方剂
let searchPrescriptionByPy = async (req, res, next) => {
    let {
        py
    } = req.query;
    let result = await PrescriptionModel.findPrescriptionBypy();
    if (result) {
        if (result.length) {
            let data = checkpy(result, py);
            res.send({
                data: data,
                status: 4900
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 4901
            });
        }
    } else {
        res.send({
            data: err,
            status: 4902
        });
    }
}

// 根据输入的内容模糊查询方剂
let searchPrescriptionByEff = async (req, res, next) => {
    let {
        effect
    } = req.query;
    let reg = new RegExp(effect);
    let data = {
        'efficacy': reg
    };
    let result = await PrescriptionModel.findPrescriptionBy(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 4110
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 4111
            });
        }
    } else {
        res.send({
            data: err,
            status: 4112
        });
    }
}

module.exports = {
    searchPrescriptionByName,
    searchPrescriptionByPy,
    searchPrescriptionByEff,
    searchPreByComp,
    getAllPrescription,
    getPrescriptionOrigin,
    getPreByOrigin,
    getPreByZn,
    getPreContent,
    setPinyin,
    findPinyin,
}