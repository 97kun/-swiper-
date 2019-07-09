"use strict";
class Swiper {
    constructor(options) {
        this._index = 0;
        this.init(options);
    }
    get index() {
        return this._index || 0;
    }
    set index(index) {
        this._index = index;
        this.anm();
    }
    //轮播元素数量
    get count() {
        if (this.content) {
            return this.content.querySelectorAll('slide').length;
        }
        else {
            return 0;
        }
    }
    //初始化操作
    init(options) {
        const dom = document.querySelector(options.el);
        dom
            ? this.content = dom.querySelector('.content')
            : '';
        this.index = options.index || 0;
        this.timer = setInterval(() => {
            if (this.index > this.count + 1) {
                this.index = 0;
            }
            else {
                this.index++;
            }
        }, 2000);
    }
    //动画
    anm() {
        if (this.content) {
            //类型断言，TS真严格
            this.content.style.cssText = `
               transform: translate(-${1200 * this.index}px,0);
            `;
        }
    }
}
const swiper = new Swiper({
    el: '.box'
});
console.log(swiper.index);
