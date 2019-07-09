interface options {
    el: string
    loop?: boolean
    index?: number
}

class Swiper {
    //内容元素
    content: Element | null | undefined;

    //定时器
    timer: number | null | undefined;

    constructor(options: options) {
        this.init(options);
    }

    _index: number = 0;

    get index(): number {
        return this._index || 0
    }

    set index(index: number) {
        this._index = index;
        this.anm();
    }

    //轮播元素数量
    get count(): number {
        if (this.content) {
            return this.content.querySelectorAll('slide').length
        } else {
            return 0
        }
    }

    //初始化操作
    init(options: options) {
        const dom = document.querySelector(options.el);
        dom
            ? this.content = dom.querySelector('.content')
            : '';
        this.index = options.index || 0;
        this.timer = setInterval(() => {
            if (this.index > this.count + 1) {
                this.index = 0;
            } else {
                this.index++
            }
        }, 2000)
    }

    //动画
    anm() {
        if (this.content) {
            //类型断言，TS真严格
            (<HTMLElement>this.content).style.cssText = `
               transform: translate(-${1200 * this.index}px,0);
            `
        }
    }


}

const swiper = new Swiper(
    {
        el: '.box'
    }
);

console.log(swiper.index);
