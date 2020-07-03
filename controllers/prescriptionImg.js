var PrescriptionImgModel = require('../models/prescriptionImg.js');
var {
    createReg,
    formatAllComp,
    getCatagoryList,
    checkpy
} = require('../utils/baseMethods.js');
let select = {
    'prescription_name': 1,
    'efficacy': 1,
    'classification': 1,
    'prescription_img': 1
};

let searchPrescriptionImgByName = async (req, res, next) => {
    let {
        name
    } = req.query;
    let reg = new RegExp(name);
    let data = {
        prescription_name: reg
    };
    let result = await PrescriptionImgModel.findPrescriptionImgBy(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 3000
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 3001
            });
        }
    } else {
        res.send({
            data: err,
            status: 3002
        });
    }
}

// 通过字母分页搜索方剂
let getPrescriptionImgByZn = async (req, res, next) => {
    let {
        alphabet
    } = req.query;
    let reg = new RegExp('^' + alphabet, 'i');
    let searchMsg = {
        zn_name: reg
    };
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: searchMsg,
        select: select
    }
    let result = await PrescriptionImgModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 3100
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 3101
            });
        }
    } else {
        res.send({
            data: err,
            status: 3102
        });
    }
}

// 获取分类名
let categoryList = async (req, res, next) => {
    let result = await PrescriptionImgModel.find();
    let category = getCatagoryList(result, 'classification')
    if (result) {
        if (result.length) {
            res.send({
                data: category,
                status: 3200
            });
        } else {
            res.send({
                data: '没有内容',
                status: 3201
            });
        }
    } else {
        res.send({
            data: err,
            status: 3202
        });
    }
}

// 全部分页搜索方剂
let getAllPrescriptionImg = async (req, res, next) => {
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: {},
        select: select
    }
    let result = await PrescriptionImgModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 3300
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 3301
            });
        }
    } else {
        res.send({
            data: err,
            status: 3302
        });
    }
}

// 通过分类分页查询方剂
let getPreImgByCategory = async (req, res, next) => {
    let searchMsg = {
        classification: req.query.category
    };
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: searchMsg,
        select: select
    }
    let result = await PrescriptionImgModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 3400
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 3401
            });
        }
    } else {
        res.send({
            data: err,
            status: 3402
        });
    }
}

let getPreImgContent = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await PrescriptionImgModel.findOne(name);
    if (result) {
        res.send({
            data: result,
            status: 3500
        })
    } else {
        res.send({
            data: err,
            status: 3501
        });
    }
}

let searchPreImgByComp = async (req, res, next) => {
    let {
        name
    } = req.query;
    let compositionArr = name.split(' ');
    let reg = createReg(compositionArr, 'composition');
    let searchData = {
        $and: reg
    };
    let result = await PrescriptionImgModel.findName(searchData);
    if (result) {
        if (result.length) {
            let finalResult = formatAllComp(result, 'origin', '方剂图解')
            res.send({
                data: result,
                status: 3600
            });
        } else {
            res.send({
                data: '非常抱歉，本小程序暂未收录到符合要求的方剂。',
                status: 3601
            });
        }
    } else {
        res.send({
            data: err,
            status: 3602
        });
    }
}

let updatePreImg = async (req, res, next) => {
    let result = await PrescriptionImgModel.find();
    if (result) {
        if (result.length) {
            let success;
            for (let index = 0; index < result.length; index++) {
                let name = result[index].prescription_name;
                let img = result[index].prescription_img;
                let newdata = img.replace(img, '/images/prescription/' + img);
                success = await PrescriptionImgModel.update(name, newdata);
            }
            if (success) {
                res.send({
                    data: success,
                    status: 3700
                });
            }
        } else {
            res.send({
                data: '非常抱歉，本小程序暂未收录到符合要求的方剂。',
                status: 3701
            });
        }
    } else {
        res.send({
            data: err,
            status: 3702
        });
    }
}

let searchPrescriptionImgByPy = async (req, res, next) => {
    let {
        py
    } = req.query;
    let result = await PrescriptionImgModel.findPrescriptionImgBypy();
    if (result) {
        if (result.length) {
            let data = checkpy(result, py);
            res.send({
                data: data,
                status: 3800
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 3801
            });
        }
    } else {
        res.send({
            data: err,
            status: 3802
        });
    }
}

let searchPrescriptionImgByEff = async (req, res, next) => {
    let {
        effect
    } = req.query;
    let reg = new RegExp(effect);
    let data = {
        efficacy: reg
    };
    let result = await PrescriptionImgModel.findPrescriptionImgBy(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 3900
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 3901
            });
        }
    } else {
        res.send({
            data: err,
            status: 3902
        });
    }
}

module.exports = {
    searchPrescriptionImgByName,
    searchPrescriptionImgByPy,
    searchPrescriptionImgByEff,
    getPrescriptionImgByZn,
    categoryList,
    getAllPrescriptionImg,
    getPreImgByCategory,
    getPreImgContent,
    searchPreImgByComp,
    updatePreImg
}