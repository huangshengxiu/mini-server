let bookUrl = {
    baseUrl: 'http://localhost:3000/books/'
};
var {
    deepClone
} = require('../utils/deepClone.js');
var fs = require('fs');
var path = require('path');

// 读取路径为path里的txt文件
let readTxt = (basePath) => {
    return new Promise((resolve, reject) => {
        let arr;
        let bookpath = path.resolve(__dirname, '../public/books/' + basePath);
        console.log(bookpath);
        fs.readFile(bookpath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                let newdata = data.toString();
                let reg = /\n(\n)*()*(\n)*\n/g;
                arr = newdata.split(reg);
                resolve(arr);
            }

        });
    });
}

// 去除章节内容数组中值为undefined和空的项
let filterArr = (chapterList) => {
    return chapterList.filter((item) => {
        return item != undefined && item != '';
    })
}

// 将过滤掉值为undefined和空的项的章节内容数组按目录篇名属性匹配内容
let getMainInfo = (chapterArr) => {
    return chapterArr.map((item, index) => {
        let directoryReg = /(?<=<目录>)(.+)*/g;
        let articleReg = /(?<=<篇名>)(.+)*/g;
        // let contentReg = /属性[\w\W]*/g;
        let obj = {};
        let directory = item.match(directoryReg);
        let article = item.match(articleReg);
        let content = item.replace(/<目录>(.+)*/g, '').replace(/<篇名>(.+)*/g, '').replace(/属性：|内容：/g, '');
        obj.directory = directory ? directory.toString() : directory;
        obj.article = article ? article.toString() : article;
        obj.content = content ? content.toString() : content;
        obj.id = index;
        console.log(obj)
        return obj;
    });
}

// 将getMainInfo中获取到的数组中每一项的content属性删除
// 注意深浅拷贝问题
let formatDirectory = (chapterArr) => {
    return chapterArr.map((item) => {
        delete item['content'];
        return item;
    });
}

// 将读取的章节内容数组格式化成按卷名分卷的json格式
let groupBy = (property, arrObject) => {
    // ptoperty为对照格式的字段,object为要格式的数组对象
    return arrObject.reduce(function (previous, current) {
        let newObjectKey = current[property];
        if (!previous[newObjectKey]) {
            previous[newObjectKey] = [];
        }
        previous[newObjectKey].push(current);
        return previous;
    }, {})
}

// 通过书名获取到该书籍按卷分类的章节信息对象
// 格式为
// {
//     卷一: [{}, {}],
//     卷二: [{}, {}]
// }
let getFinalChapterList = (bookpath) => {
    return new Promise((resolve, reject) => {
        readTxt(bookpath).then((res) => {
            let firstFormat = filterArr(res);
            let secondFormat = getMainInfo(firstFormat);
            let directoryFormat = formatDirectory(deepClone(secondFormat));
            let finalFormat = groupBy('directory', secondFormat);
            resolve({
                directoryFormat,
                finalFormat,
                secondFormat
            });
        }).catch(err => {
            reject(err);
        });
    })
}

// getFinalChapterList('八十一难经.txt').then(
//     function (data) {
//         console.log(data);
//     },
//     function (err) {
//         throw err;
//     }
// );

let createReg = (arr, data) => {
    return arr.map(item => {
        let reg = new RegExp(item);
        let obj = {};
        obj[data] = reg;
        return obj;
    })
}

// 统计每种类别的个数
let getList = (arr, property) => {
    let list = groupBy(property, arr);
    let listarr = [];
    for (const key in list) {
        if (list.hasOwnProperty(key)) {
            let obj = {};
            obj.title = key;
            obj.count = list[key].length;
            listarr.push(obj);
        }
    }
    return listarr;
}

// 统计方剂图像类别目录
let getCatagoryList = (arr, property) => {
    let list = groupBy(property, arr);
    let listarr = [];
    for (const key in list) {
        if (list.hasOwnProperty(key)) {
            listarr.push(key);
        }
    }
    return listarr;
}

// 统计方剂出处目录
let getOriginList = (arr, property) => {
    let reg = /(?<=《)[^》]+/;
    return arr.reduce((previous, item) => {
        let result = item[property].match(reg)[0];
        if (!previous.includes(result)) {
            previous.push(result);
        }
        return previous;
    }, [])
}

let formatAllComp = (arr, name, property) => {
    return arr.map(item => {
        item[name] = property;
        return item;
    })
}

let filterTxt = string => {
    let regOne = /(?<=。)\s\n/g;
    let regThree = /\\x/g;
    return str.replace(regOne, '%%%%%').replace(/\s+/g, "").replace(regThree, '%%%%%').split('%%%%%');
}

let random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

let randomArray = (num, booklength) => {
    let randomArr = [];
    while (randomArr.length < num) {
        let item = random(0, booklength);
        if (randomArr.indexOf(item) == -1) {
            randomArr.push(item);
        }
    }
    return randomArr.sort((a, b) => a - b);
}

let recommend = (indexArr, targetArr) => {
    return indexArr.map(item => {
        return targetArr[item];
    })
}

let checkpy = (pylist, py) => {
    return pylist.filter(item => {
        let itempy = item['zn_name'].replace(/\s*/g, "");
        let pyreg = new RegExp(py, 'ig')
        if (itempy.match(pyreg)) {
            return item;
        }
    })
}

module.exports = {
    bookUrl,
    readTxt,
    filterArr,
    groupBy,
    getMainInfo,
    getFinalChapterList,
    createReg,
    getList,
    getCatagoryList,
    getOriginList,
    formatAllComp,
    filterTxt,
    randomArray,
    recommend,
    checkpy
}