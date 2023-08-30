// nyc-airbnb.mjs
// import { readFile } from "fs";
// import { title } from "process";
// import * as hoffy from './hoffy.mjs';

function getAveragePrice(data){
    let entireSum = 0;
    let entireNum = 0;
    let privateSum = 0;
    let privateNum = 0;
    data.filter(function(x){
        if(x["room_type"] === "Entire home/apt"){
            entireSum += parseInt(x["price"]);
            entireNum += 1;
        }
        if(x["room_type"] === "Private room"){
            privateSum += parseInt(x["price"]);
            privateNum += 1;
        }
    });

    const entireAvg = (entireSum / entireNum).toFixed(2);
    const privateAvg = (privateSum / privateNum).toFixed(2);

    return [entireAvg, privateAvg];
}

function mostReviews(data){
    let tempMost = 0;
    let ansName = "";
    data.filter(function(x){
        if(parseInt(x["number_of_reviews"]) >= tempMost){
            ansName = x["name"];
            tempMost = x["number_of_reviews"];
        }
    });
    // console.log(ansName);
    return ansName;
}

function getUniqueHosts(data){
    let hasName = [];
    data.filter(function(x){
        // console.log(hasName.indexOf(x["host_name"]));
        if(hasName.indexOf(x["host_name"]) === -1){
            hasName.push(x["host_name"]);
        }
    });
    hasName.sort();
    hasName = hasName.slice(0, 5);
    return hasName;
}

function getHousingBorough(data){
    const ansObj = {};
    data.filter(function(x){
        if(x["neighbourhood_group"] in ansObj){
            ansObj[x["neighbourhood_group"]] += 1;
        }else{
            ansObj[x["neighbourhood_group"]] = 1;
        }
    });
    return ansObj;
}


// readFile('../homework02-dataset-main/AB_NYC_2019.csv', 'utf-8', function (err, data) {
//     if (err) {
//         console.log(err);
//     }

//     const rowsArr = [];
//     let temp = "";
//     let inQ = false;

//     const singleArr = data.split("");

//     singleArr.filter(function(x){
//         if (x === "\"") {
//             if (inQ === false) { inQ = true; }
//             else { inQ = false; }
//         }

//         if (x === "\n" && inQ === false) {
//             rowsArr.push(temp);
//             temp = "";
//         } else {
//             temp += x;
//         }
//     });

//     const headers = rowsArr.shift().split(",");

//     const splitedArr = [];

//     rowsArr.filter(function(rowArr){
//         const temp = [];
//         let ans = "";
//         let inQ = false;

//         const rowArrArr = rowArr.split("");
//         rowArrArr.filter(function(x, index){
//             if (x === "\"") {
//                 if (inQ === false) { inQ = true; }
//                 else { inQ = false; }
//             }
//             if (x === "," && inQ === false) {
//                 temp.push(ans);
//                 ans = "";
//             } else if (index === rowArrArr.length - 1) {
//                 ans += x;
//                 temp.push(ans);
//             } else {
//                 ans += x;
//             }
//         });
//         splitedArr.push(temp);
//     });

//     const objArr = hoffy.rowsToObjects({ headers: headers, rows: splitedArr });

// });

export{
    getAveragePrice,
    mostReviews,
    getUniqueHosts,
    getHousingBorough
};









    // console.log(rowsArr.length);

    // const rowsArr = data.split('\n');

    // const re = new RegExp(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)")；


    // const test = rowsArr[12];
    // console.log(test);
    // // const testSplit = test.split(/"(.*?)"/);
    // const testSplit = test.split(/,(?=([^\"]*\"[^\"]*\")*[^\"]*$)/g);
    // console.log(testSplit);




    // for(let i = 0; i < rowsArr.length; i++){
    //     const rowArr = rowsArr[i].split(/,(?!\s)/);
    //     if (rowArr.length !== 16){
    //         console.log("==========");
    //         console.log(rowArr.length);
    //         console.log(i);
    //         console.log(rowsArr[i]);
    //         console.log(rowArr);
    //     }   
    // }




    // const splitedTest = [];
    // rowsArr.filter(function(x){
    //     const rowArr = x.split(",");
    //     splitedTest.push(rowArr);
    //     console.log(rowArr.length);
    //     // if (rowArr.length !== 16){console.log("Exception");}
    // });
    // console.log(splitedTest.length);
    // // console.log(rowsArrNew);
    // // console.log(splitedTest);



