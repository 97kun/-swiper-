"use strict";
class Swiper {
    constructor(options) {
        this._index = 0;
        //轮播元素数量
        this.count = 0;
        this.init(options);
    }
    get index() {
        return this._index || 0;
    }
    set index(index) {
        this._index = index;
        this.anm();
    }
    //初始化操作
    init(options) {
        const dom = document.querySelector(options.el);
        dom
            ? this.content = dom.querySelector('.content')
            : '';
        //初始添加的slide数量
        if (this.content) {
            this.count = this.content.querySelectorAll('.slide').length;
        }
        else {
            this.count = 0;
        }
        if (this.content instanceof HTMLElement) {
            //克隆元素，循环展示使用
            const children = this.content.children;
            const first = children[0].cloneNode(true);
            const last = children[children.length - 1].cloneNode(true);
            this.content.appendChild(first);
            this.content.insertBefore(last, children[0]);
        }
        //复制首尾，完成循环
        this.index = options.index || 0;
        this.timer = setInterval(() => {
            this.run();
        }, 1000);
    }
    //动画
    anm() {
        if (this.content && this.count) {
            this.content.style.cssText = `
               transform: translate3d(-${1200 * this.index}px,0,0);
               transition: all 0.75s;`;
        }
    }
    //普通运行时方法
    run() {
        if (this.count) {
            if (this.index > this.count - 1) {
                //复位
                this.index = 0;
                this.content.style.cssText = `
                       transform: translate3d(0px,0,0);
                       transition: all 0s;`;
                setTimeout(() => {
                    this.index = 1;
                });
            }
            else {
                this.index++;
            }
        }
    }
}
const swiper = new Swiper({
    el: '.box'
});
