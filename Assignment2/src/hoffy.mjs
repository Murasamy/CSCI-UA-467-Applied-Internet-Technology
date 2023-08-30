// hoffy.js
import { readFile } from 'fs';



function getEvenParam(...enter) {
    const ans = enter.filter(word => enter.indexOf(word) % 2 === 0);
    return ans;
}

function maybe(fn) {
    return function (...args) {
        if (args.indexOf(null) !== -1) {
            return undefined;
        }
        if (args.indexOf(undefined) !== -1) {
            return undefined;
        }
        return fn(...args);
    };
}

function filterWith(fn) {
    return function (args) {
        const ans = args.filter(fn);
        return ans;
    };
}


function repeatCall(fn, n, ...args) {
    const tempArr = Array(n).fill(args[0]);
    tempArr.filter(n => fn(n));
}


function largerFn(fn, gn) {
    return function (...args) {
        if (fn(args[0]) >= gn(args[1])) {
            return fn;
        }
        if (fn(args[0]) < gn(args[1])) {
            return gn;
        }
    };
}



function limitCallsDecorator(fn, n){
    let count = 0;
    return function(...args){
        count ++;
        if (count <= n){
            return fn(args);
        }else{
            return undefined;
        }
    };
}



function myReadFile(fileName, successFn, errorFn) {
    readFile(fileName, 'utf-8', function (err, data) {
        if (err) {
            return errorFn(err);
        }
        return successFn(data);
    });
}

// function rowsToObjects(data){

//     let headersArr = data['headers'];
//     let rowsArr = data["rows"];
//     let returnAns = [];
//     let temp = rowsArr.filter(function(row){
//         let tempObj = {}
//         row.filter((x, index) =>{
//             tempObj[headersArr[index]] = x;
//         })
//         returnAns.push(tempObj)
//     })
//     return returnAns;
// }

function rowsToObjects(data){

    const headersArr = data['headers'];
    const rowsArr = data["rows"];
    const returnAns = [];
    rowsArr.filter(function(row){
        const tempObj = {};
        row.filter((x, index) =>{
            tempObj[headersArr[index]] = x;
        });
        returnAns.push(tempObj);
        return;
    });
    // console.log(temp);
    return returnAns;
}


export {
    getEvenParam,
    maybe,
    filterWith,
    repeatCall,
    largerFn,
    limitCallsDecorator,
    myReadFile,
    rowsToObjects,
};
















