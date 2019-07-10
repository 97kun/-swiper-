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
    count: number | undefined = 0;

    //初始化操作
    init(options: options) {
        const dom = document.querySelector(options.el);
        dom
            ? this.content = dom.querySelector('.content')
            : '';

        //初始添加的slide数量
        if (this.content) {
            this.count = this.content.querySelectorAll('.slide').length;
        } else {
            this.count = 0;
        }
        if (this.content instanceof HTMLElement) {
            //克隆元素，循环展示使用
            const children = this.content.children;
            const first = children[0].cloneNode(true);
            const last = children[children.length - 1].cloneNode(true);
            this.content.appendChild(first);
            this.content.insertBefore(last, children[0])
        }

        //复制首尾，完成循环
        this.index = options.index || 0;

        this.timer = setInterval(() => {
            this.run();
        }, 1000)
    }

    //动画
    anm() {
        if (this.content && this.count) {
            (<HTMLElement>this.content).style.cssText = `
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

                (<HTMLElement>this.content).style.cssText = `
                       transform: translate3d(0px,0,0);
                       transition: all 0s;`;

                setTimeout(()=>{
                    this.index = 1;
                })

            } else {
                this.index++;
            }
        }
    }
}

const swiper = new Swiper(
    {
        el: '.box'
    }
);
