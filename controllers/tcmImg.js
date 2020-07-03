var TCMImgModel = require('../models/tcmImg.js');
var {
    getList,
    checkpy
} = require('../utils/baseMethods.js');
let select = {
    'medicine_name': 1,
    'efficacy': 1,
    'classification': 1,
    'medicine_img': 1
};

let searchMedicineImgByName = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await TCMImgModel.findMediceImgByName(name);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 2000
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 2001
            });
        }
    } else {
        res.send({
            data: err,
            status: 2002
        });
    }
}


let searchMedicineImgByZn = async (req, res, next) => {
    let {
        alphabet
    } = req.query;
    let reg = new RegExp('^' + alphabet, 'i');
    let searchMsg = {
        zn_name: reg
    };
    let result = await TCMImgModel.find(searchMsg);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 2100
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 2101
            });
        }
    } else {
        res.send({
            data: err,
            status: 2102
        });
    }
}

// 获取分类名和每个分类数量
let categoryList = async (req, res, next) => {
    let result = await TCMImgModel.find();
    let category = getList(result, 'classification')
    if (result) {
        if (result.length) {
            res.send({
                data: category,
                status: 2200
            });
        } else {
            res.send({
                data: '没有内容',
                status: 2201
            });
        }
    } else {
        res.send({
            data: err,
            status: 2202
        });
    }
}

// 通过分类名分页查找中药
let getMedicineByCategory = async (req, res, next) => {
    let {
        category
    } = req.query;
    let searchMsg = {
        classification: category
    };
    let data = {
        pages: req.query.pages,
        size: req.query.size,
        searchData: searchMsg,
        select: select
    }
    let result = await TCMImgModel.pagination(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 2300
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 2301
            });
        }
    } else {
        res.send({
            data: err,
            status: 2302
        });
    }
}

// 分类内通过输入名字模糊查找分类内中药
let getbyNaCa = async (req, res, next) => {
    let {
        category,
        name
    } = req.query;
    let searchData = new RegExp(name);
    let data = {
        medicine_name: searchData,
        classification: category
    }
    let result = await TCMImgModel.findby(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 2400
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 2401
            });
        }
    } else {
        res.send({
            data: err,
            status: 2402
        });
    }
}

let getTcmImgContent = async (req, res, next) => {
    let {
        name
    } = req.query;
    let result = await TCMImgModel.findOne(name);
    if (result) {
        res.send({
            data: result,
            status: 2500
        });
    } else {
        res.send({
            data: err,
            status: 2501
        });
    }
}

let updateTcmImg = async (req, res, next) => {
    let result = await TCMImgModel.find();
    if (result) {
        if (result.length) {
            let success;
            for (let index = 0; index < result.length; index++) {
                let name = result[index].medicine_name;
                let img = result[index].medicine_img;
                let newdata = img.replace(img, '/images/medicine/' + img)
                success = await TCMImgModel.update(name, newdata);
            }
            if (success) {
                res.send({
                    data: success,
                    status: 2600
                });
            }
        } else {
            res.send({
                data: '非常抱歉，本小程序暂未收录到符合要求的中药。',
                status: 2601
            });
        }
    } else {
        res.send({
            data: err,
            status: 2602
        });
    }
}

// 分类内通过输入名字模糊查找分类内中药
let getbyPyCa = async (req, res, next) => {
    let {
        category,
        py
    } = req.query;
    let data = {
        classification: category
    }
    let result = await TCMImgModel.findbypy(data);
    if (result) {
        if (result.length) {
            let data = checkpy(result, py)
            res.send({
                data: data,
                status: 2700
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 2701
            });
        }
    } else {
        res.send({
            data: err,
            status: 2702
        });
    }
}

// 分类内通过输入功效模糊查找分类内中药
let getbyEffCa = async (req, res, next) => {
    let {
        category,
        effect
    } = req.query;
    let searchData = new RegExp(effect);
    let data = {
        efficacy: searchData,
        classification: category
    }
    let result = await TCMImgModel.findby(data);
    if (result) {
        if (result.length) {
            res.send({
                data: result,
                status: 2800
            });
        } else {
            res.send({
                data: '找不到内容',
                status: 2801
            });
        }
    } else {
        res.send({
            data: err,
            status: 2802
        });
    }
}

module.exports = {
    searchMedicineImgByName,
    searchMedicineImgByZn,
    categoryList,
    getMedicineByCategory,
    getbyNaCa,
    getTcmImgContent,
    updateTcmImg,
    getbyPyCa,
    getbyEffCa
}