// drawing.js
import os from 'os';
import { writeFile } from 'fs';

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

// the following is used for testing
// create root element with fixed width and height
const root = new RootElement();
root.addAttrs({ width: 800, height: 170, abc: 200, def: 400 });
root.removeAttrs(['abc', 'def', 'non-existent-attribute']);

// create circle, manually adding attributes, then add to root element
const c = new GenericElement('circle');
c.addAttr('r', 75);
c.addAttr('fill', 'yellow');
c.addAttrs({ 'cx': 200, 'cy': 80 });
root.addChild(c);

// create rectangle, add to root svg element
const r = new RectangleElement(0, 0, 200, 100, 'blue');
root.addChild(r);

// create text, add to root svg element
const t = new TextElement(50, 70, 70, 'red', 'wat is a prototype? 😬');
root.addChild(t);

// show string version, starting at root element
console.log(root.toString());

// write string version to file, starting at root element
root.write('test.svg', () => console.log('done writing!'));

export{
    GenericElement,
    RootElement,
    RectangleElement,
    TextElement,
};