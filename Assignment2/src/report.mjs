// report.js
import * as nyc from "./nyc-airbnb.mjs";
import * as hoffy from "./hoffy.mjs";
import { readFile } from "fs";
// import * as drawing from "./drawing.mjs";

const path = process.argv[2];

try {
  readFile(path, "utf-8", (error, ) => {
    if(error){
        console.log(error);
        console.error("wrong path. The right path should be: ../data/AB_NYC_2019.csv");
        throw new Error("wrong path. The right path should be: ../data/AB_NYC_2019.csv");
        // console.log("wrong path. The right path should be: ../data/AB_NYC_2019.csv");
        // path = "../data/AB_NYC_2019.csv";
        // console.log("The program has automatically corrected your path to: ../data/AB_NYC_2019.csv\n\n\n");
    }
});
} catch (error) {
  console.log("wrong path. The right path should be: ../data/AB_NYC_2019.csv");
}

import os from 'os';
import { writeFile } from 'fs';

function mostReviewsHelper(data){
    let tempMost = 0;
    let tempHost = "";
    data.filter(function(x){
        if(parseInt(x["number_of_reviews"]) >= tempMost){
            tempMost = x["number_of_reviews"];
            tempHost = x["host_name"];
        }
    });
    // console.log(ansName);
    return [tempMost, tempHost];
}

class GenericElement {
    constructor(name) {
        this.name = name;
        this.children = [];
    }

    addAttr(name, value) {
        this[name] = value;
    }

    setAttr(name, value) {
        this[name] = value;
    }

    addAttrs(obj) {
        const objKeysArr = Object.keys(obj);
        const objValuesArr = Object.values(obj);
        objKeysArr.filter((param, index) => {
            this.addAttr(param, objValuesArr[index]);
        });
    }

    removeAttrs(arr) {
        arr.filter(x => {
            if (x in this) {
                delete this[x];
            }
        });
    }

    addChild(child) {
        this.children.push(child);
    }

    toString() {
        let ans = '<';
        const objKeysArr = Object.keys(this);
        const objValuesArr = Object.values(this);
        const childrenIndex = objKeysArr.indexOf('children');
        objKeysArr.splice(childrenIndex, 1);
        objValuesArr.splice(childrenIndex, 1);

        // let keyFirst = objKeysArr.shift();
        // let valueFirst = objValuesArr.shift();
        objKeysArr.shift();
        const valueFirst = objValuesArr.shift();

        ans += valueFirst;
        objKeysArr.filter((x, index) => {
            // if(index)
            ans += ' ' + objKeysArr[index] + '=' + '"' + objValuesArr[index] + '"';
        });
        // ans += keyLast + '=' + '\"' + valueLast + '\">' + os.EOL;

        ans += '>' + os.EOL;
        this.children.filter(x => ans += x.toString());

        ans += '</' + this.name + '>' + os.EOL;
        return ans;
    }

    write(fileName, cb) {
        const ans = this.toString();
        writeFile(fileName, ans, (err) => {
            if (err) {
                return;
            }
            else {
                cb();
            }
        }
        );
    }
}

class RootElement extends GenericElement {
    constructor() {
        super();
        this.children = [];
    }

    addAttr(name, value) {
        super.addAttr(name, value);
    }

    setAttr(name, value) {
        super.setAttr(name, value);
    }

    addAttrs(obj) {
        super.addAttrs(obj);
    }

    removeAttrs(arr) {
        super.removeAttrs(arr);
    }

    addChild(child) {
        this.children.push(child);
    }

    toString() {
        let ans = '<';
        const objKeysArr = Object.keys(this);
        const objValuesArr = Object.values(this);
        const childrenIndex = objKeysArr.indexOf('children');
        objKeysArr.splice(childrenIndex, 1);
        objValuesArr.splice(childrenIndex, 1);

        // let keyFirst = objKeysArr.shift();
        objKeysArr.shift();
        // let valueFirst = objValuesArr.shift();
        objValuesArr.shift();

        ans += 'svg xmlns="http://www.w3.org/2000/svg"';
        objKeysArr.filter((x, index) => {
            ans += ' ' + objKeysArr[index] + '=' + '"' + objValuesArr[index] + '"';
        });

        ans += '>' + os.EOL;
        this.children.filter(x => ans += x.toString());

        ans += '</svg>' + os.EOL;
        return ans;
    }

    write(fileName, cb){
        super.write(fileName, cb);
    }


}

class RectangleElement extends GenericElement {
    constructor(x, y, width, height, fill) {
        super();
        this.name = 'rect';
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fill = fill;
    }

    addAttr(name, value) {
        super.addAttr(name, value);
    }

    setAttr(name, value) {
        super.setAttr(name, value);
    }

    addAttrs(obj) {
        super.addAttrs(obj);
    }

    removeAttrs(arr) {
        super.removeAttrs(arr);
    }

    addChild(child) {
        this.children.push(child);
    }

    toString() {
        let ans = '<';
        const objKeysArr = Object.keys(this);
        const objValuesArr = Object.values(this);
        const childrenIndex = objKeysArr.indexOf('children');
        objKeysArr.splice(childrenIndex, 1);
        objValuesArr.splice(childrenIndex, 1);

        // let keyFirst = objKeysArr.shift();
        // let valueFirst = objValuesArr.shift();
        objKeysArr.shift();
        objValuesArr.shift();

        ans += 'rect';
        objKeysArr.filter((x, index) => {
            ans += ' ' + objKeysArr[index] + '=' + '"' + objValuesArr[index] + '"';
        });

        ans += '>' + os.EOL;
        this.children.filter(x => ans += x.toString());

        ans += '</rect>' + os.EOL;
        return ans;
    }

    write(fileName, cb){
        super.write(fileName, cb);
    }

}

class TextElement extends GenericElement {
    constructor(x, y, fontSize, fill, content) {
        super();
        this.name = 'text';
        this.x = x;
        this.y = y;
        this.fill = fill;
        this["font-size"] = fontSize;
        this.content = content;
    }

    addAttr(name, value) {
        super.addAttr(name, value);
    }

    setAttr(name, value) {
        super.setAttr(name, value);
    }

    addAttrs(obj) {
        super.addAttrs(obj);
    }

    removeAttrs(arr) {
        super.removeAttrs(arr);
    }

    addChild(child) {
        this.children.push(child);
    }

    toString() {
        let ans = '<';
        const objKeysArr = Object.keys(this);
        const objValuesArr = Object.values(this);
        const childrenIndex = objKeysArr.indexOf('children');
        objKeysArr.splice(childrenIndex, 1);
        objValuesArr.splice(childrenIndex, 1);

        const contentIndex = objKeysArr.indexOf('content');
        objKeysArr.splice(contentIndex, 1);
        const contentValue = objValuesArr.splice(contentIndex, 1);
        // console.log(contentValue)

        // let keyFirst = objKeysArr.shift();
        // let valueFirst = objValuesArr.shift();
        objKeysArr.shift();
        objValuesArr.shift();

        ans += 'text';
        objKeysArr.filter((x, index) => {
            ans += ' ' + objKeysArr[index] + '=' + '"' + objValuesArr[index] + '"';
        });

        ans += '>' + contentValue + os.EOL;
        // this.children.filter(x => ans += x.toString());

        ans += '</text>' + os.EOL;
        return ans;
    }

    write(fileName, cb){
        super.write(fileName, cb);
    }
}

readFile(path, 'utf-8', function (err, data) {
    // if (err) {
    //     console.log(err);
    // }

    // const rowsArr = [];
    // let temp = "";
    // let inQ = false;
    // for (let i = 0; i < data.length; i++) {
    //     // console.log(data[i]);
    //     if (data[i] === "\"") {
    //         if (inQ === false) { inQ = true; }
    //         else { inQ = false; }
    //     }

    //     if (data[i] === "\n" && inQ === false) {
    //         rowsArr.push(temp);
    //         temp = "";
    //     } else {
    //         temp += data[i];
    //     }
    // }

    // const headers = rowsArr.shift().split(",");

    // const splitedArr = [];

    // for (let i = 0; i < rowsArr.length; i++) {
    //     // console.log(data[i]);
    //     const temp = [];
    //     let ans = "";
    //     const rowArr = rowsArr[i];

    //     let inQ = false;
    //     for (let i = 0; i < rowArr.length; i++) {
    //         if (rowArr[i] === "\"") {
    //             if (inQ === false) { inQ = true; }
    //             else { inQ = false; }
    //         }
    //         if (rowArr[i] === "," && inQ === false) {
    //             temp.push(ans);
    //             ans = "";
    //         } else if (i === rowArr.length - 1) {
    //             ans += rowArr[i];
    //             temp.push(ans);
    //         } else {
    //             ans += rowArr[i];
    //         }
    //     }

    //     splitedArr.push(temp);

    //     // console.log(temp.length);
    //     // if(temp.length !== 16){console.log(temp);}
    // }

    if (err) {
        console.log(err);
    }

    const rowsArr = [];
    let temp = "";
    let inQ = false;

    const singleArr = data.split("");

    singleArr.filter(function(x){
        if (x === "\"") {
            if (inQ === false) { inQ = true; }
            else { inQ = false; }
        }

        if (x === "\n" && inQ === false) {
            rowsArr.push(temp);
            temp = "";
        } else {
            temp += x;
        }
    });

    const headers = rowsArr.shift().split(",");

    const splitedArr = [];

    rowsArr.filter(function(rowArr){
        const temp = [];
        let ans = "";
        let inQ = false;

        const rowArrArr = rowArr.split("");
        rowArrArr.filter(function(x, index){
            if (x === "\"") {
                if (inQ === false) { inQ = true; }
                else { inQ = false; }
            }
            if (x === "," && inQ === false) {
                temp.push(ans);
                ans = "";
            } else if (index === rowArrArr.length - 1) {
                ans += x;
                temp.push(ans);
            } else {
                ans += x;
            }
        });
        splitedArr.push(temp);
    });

    const objArr = hoffy.rowsToObjects({ headers: headers, rows: splitedArr });
    const avgPrice = nyc.getAveragePrice(objArr);
    const mostReviews = nyc.mostReviews(objArr);
    const mostReviewsArr = mostReviewsHelper(objArr);
    const firstFive = nyc.getUniqueHosts(objArr);
    // console.log(firstFive);

    console.log("The average price for entire home/apt is "+ avgPrice[0] + " and for private room is " + avgPrice[1] + ".");
    console.log("The house with most reviews is named \"" + mostReviews + "\" hosted by" + mostReviewsArr[1] + ". It has " + mostReviewsArr[0] + " reviews.");
    console.log("The first five unique hosts after sorting is:");
    
    firstFive.filter(function(x){
        if(x === ''){
            console.log("''");
            return;
        }
        console.log(x);
    });

    const fiveBorough = nyc.getHousingBorough(objArr);
    const boroughKeys = Object.keys(fiveBorough);
    const boroughValue = Object.values(fiveBorough);

    const root = new RootElement();
    root.addAttrs({ width: 800, height: 800});

    const text1 = new TextElement(30, 30, 20, 'red', boroughKeys[0]);
    root.addChild(text1);
    let tempHeight = boroughValue[0]/100;
    // console.log(tempHeight/100);
    const rect1 = new RectangleElement(30, 60, 60, tempHeight, 'red');
    root.addChild(rect1);

    const text2 = new TextElement(150, 30, 20, 'red', boroughKeys[1]);
    root.addChild(text2);
    tempHeight = boroughValue[1]/100;
    // console.log(tempHeight/100);
    const rect2 = new RectangleElement(170, 60, 60, tempHeight, 'blue');
    root.addChild(rect2);

    const text3 = new TextElement(300, 30, 20, 'red', boroughKeys[2]);
    root.addChild(text3);
    tempHeight = boroughValue[2]/100;
    // console.log(tempHeight/100);
    const rect3 = new RectangleElement(310, 60, 60, tempHeight, 'brown');
    root.addChild(rect3);

    const text4 = new TextElement(420, 30, 20, 'red', boroughKeys[3]);
    root.addChild(text4);
    tempHeight = boroughValue[3]/100;
    // console.log(tempHeight/100);
    const rect4 = new RectangleElement(450, 60, 60, tempHeight, 'pink');
    root.addChild(rect4);

    const text5 = new TextElement(590, 30, 20, 'red', boroughKeys[4]);
    root.addChild(text5);
    tempHeight = boroughValue[4]/100;
    // console.log(tempHeight/100);
    const rect5 = new RectangleElement(590, 60, 60, tempHeight, 'yellow');
    root.addChild(rect5);

    // console.log(root.toString());

    root.write("nyc-airbnb-boroughs.svg", () => console.log('done writing!'));

});

