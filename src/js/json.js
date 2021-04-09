
$.getJSON('../json/menu.json', (data) => {
    console.log(data)
    let obj = data.content;
    let i = 0
    for(let key in obj){
         $(obj[key]).each((index,value)=>{
            $(`<li><a href="">${value}</a></li>`).appendTo(`.ul${i}`);
        })
        i++;
    }
})
function list(){
    $.getJSON('../json/menu.json', (data) => {
        let list = data.list;
        let src = list.src;
        $(src).each((index, value) => {
            $(`<div id="img img${index}"><img src="../${value}"></div>`).prependTo(`.list${index}`);
        })
        let xjg = list.xjg;
        $(xjg).each((index, value) => {
            $(`<font style="color:red;font-size:20px;">${value}</font>`).appendTo(`#xmyf${index}`);
        })
        let jjg =list.jjg;
        $(jjg).each((index, value) => {
            $(`<del style="color:#4b4b4b;font-size:12px;">${value}</del>`).appendTo(`#jmyf${index}`);
        })
        let pinlun = list.pinlun;
        $(pinlun).each((index, value) => {
            $(`#pl${index}`).after(`<span>${value}篇评论</span>`);
        })
        let biaoti = list.biaoti;
        $(biaoti).each((index, value) => {
            $(`<span>${value}</span>`).appendTo(`#a${index}`);
        })
    })
}

function Xqy(){
    $.getJSON('../json/menu.json',(data)=>{
        let xqy = data.xqy;
        let src = xqy.src;
        $(src).each((index,value)=>{
            $(`<div class="img img${index}"><img src="../${value}"></div>`).appendTo($('aside'));
        })
        let biaoti = xqy.biaoti;
        $(biaoti).each((index,value)=>{
            // console.log(value)
            $(`<a href=""><p>${value}</p></a>`).appendTo($(`.img${index}`));
        })
        let xjg = xqy.xjg;
        $(xjg).each((index,value)=>{
            $(`<span>${value}</span>`).appendTo($(`.img${index}`));
        })
        let jjg = xqy.jjg;
        $(jjg).each((index,value)=>{
            $(`<del>${value}</del>`).appendTo($(`.img${index}`));
        })
        let xqt = data.xqt
        $(xqt).each((index,value)=>{
            $(`<img src="../img/${value}">`).appendTo($('.sec'));
        })
    })

}
class Cart{
    constructor(){
        this.list = document.querySelector('.cartList');
        //获取数据，完善页面
        this.init();
    }
    init(){
        let that = this;
        let storage = window.localStorage;
        //获取数据
        let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
        //转成对象
        let storage_obj = this.convertStrToObj(storage_str);
        //遍历对象，取出每一个商品信息
        console.log(storage_str)
        for(let key in storage_obj){
            //取出商品信息
            let good = storage_obj[key];
            //完善页面
            let tr = document.createElement('tr');
            tr.className = 'goodInfo';
            tr.setAttribute('data-good-id',key);
            tr.innerHTML = 
            `
                <td><img src="${good.src}" /></td>
                <td><span>${good.name}</span><a href=""><u class="del">刪除</u></a><a href=""><u>加入收藏</u></a></td>
                <td>无</td>
                <td>${good.price}</td>
                <td>${good.price}</td>
                <td class="num">
                    <img src="../img/j_a.png" class="minus">
                    <input type="text" value="${good.num}">
                    <img src="../img/a_j.png"" class="plus">
                </td>
                <td class="total">${good.price * good.num}</td>
            `
            this.list.appendChild(tr);
        }
        let o_minus = document.querySelectorAll('.minus');
        // 遍历=添加事件
        for(let i = 0,len = o_minus.length;i < len;i ++){
            o_minus[i].onclick = function(){
                //获取商品Id
                let good_id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                // > 1 -
                if(storage_obj[good_id].num > 1){
                    storage_obj[good_id].num --;
                }
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.nextElementSibling.value = storage_obj[good_id].num;
                this.parentNode.nextElementSibling.innerText = storage_obj[good_id].price * storage_obj[good_id].num;
            }
        }
        //获取所有的 +
        let plus = document.querySelectorAll('.plus');
        //遍历-添加事件
        for(let i = 0,len = plus.length;i < len;i ++){
            plus[i].onclick = function(){
                //获取id
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                //数量递增
                storage_obj[id].num ++;
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.previousElementSibling.value = storage_obj[id].num;
                this.parentNode.nextElementSibling.innerText = storage_obj[id].price * storage_obj[id].num;
            }
        }
        let o_inp = document.querySelectorAll('.num input');
        //遍历-添加事件
        for(let i = 0,len = o_inp.length;i < len;i ++){
            o_inp[i].onblur = function(){
                //获取id
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                let str = this.value; //当前文本框中的值
                if(/^\d+$/.test(str)){
                    storage_obj[id].num = str;
                }else{
                    storage_obj[id].num = 1;
                }
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.value = storage_obj[id].num;
                this.parentNode.nextElementSibling.innerText = storage_obj[id].price * storage_obj[id].num;
            }
        }
        //获取所有的删除按钮
        let del = document.querySelectorAll('.del');
        // console.log(del)
        //遍历-添加事件
        for(let i = 0,len = del.length;i < len;i ++){
            del[i].onclick = function(){
                //获取id
                let id = this.parentNode.parentNode.parentNode.getAttribute('data-good-id');
                console.log(id);
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                //转对象
                let storage_obj = that.convertStrToObj(storage_str);
                //删除对象中的属性
                delete storage_obj[id];
                //存入本地存储
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.parentNode.parentNode.parentNode.remove();
            }
        }
    }
    convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
}

//轮播图
(function () {

    var Magnifier = function (ele, obj) {

        this.ele = ele;//原始图片盒子
        this.eleWidth = this.ele.offsetWidth;//原始图片盒子宽度
        this.eleHeight = this.ele.offsetHeight;//原始图片盒子高度
        this.url = '';//放大图片url
        this.maskLayerWidth = obj.maskLayerWidth ;//遮罩宽度
        this.maskLayerHeight = obj.maskLayerHeight ;//遮罩高度
        this.backgroundScaleX = this.eleWidth / this.maskLayerWidth;//放大后图片与原始图片的放大比例(X)
        this.backgroundScaleY = this.eleHeight / this.maskLayerHeight;//放大后图片与原始图片的放大比例(Y)
        this.scaleX = obj.scale ? obj.scale[0] || obj.scale[1] : this.backgroundScaleX;//放大图片盒子与遮罩的放大比例(X)
        this.scaleY = obj.scale ? obj.scale[0] || obj.scale[1] : this.backgroundScaleY;//放大图片盒子与遮罩的放大比例(Y)

        this.init();
    };

    Magnifier.prototype = {

        constructor: Magnifier,
        init: function () {
            this.ele.style.backgroundSize = '100% 100%';//设置原始图片大小为100%
        },
        createRelativeBox: function () {
            //遮罩
            this.maskLayer = document.createElement('div');
            this.maskLayer.style.cssText = 'z-index:2px;position: absolute;border: 1px solid #ccc;background: rgba(255, 255, 255, .7);cursor: move;' +
                'width:' + this.maskLayerWidth + 'px;height:' + this.maskLayerHeight + 'px;'
            this.ele.appendChild(this.maskLayer);
            //放大图片盒子
            this.asideBox = document.createElement('div');
            this.asideBox.style.cssText = 'position:absolute;left:105%;top:50%;border:2px solid #ccc;transform:translateY(-50%);' +
                'width:' + this.maskLayerWidth * this.scaleX + 'px;height:' + this.maskLayerHeight * this.scaleY + 'px;' +
                'background-image:url(' + this.url + ');background-repeat:no-repeat;background-size:' + this.backgroundScaleX * 100 + '% ' + this.backgroundScaleY * 100 + '%';
            this.ele.appendChild(this.asideBox);
        },
        calcPosition: function (e) {
            var left = e.pageX - this.ele.offsetLeft - this.maskLayerWidth -50,
                top = e.pageY - this.ele.offsetTop - this.maskLayerHeight -50;
            if (left < 0) {
                left = 0;
            } else if (left > this.eleWidth - this.maskLayerWidth) {
                left = this.eleWidth - this.maskLayerWidth;
            };
            if (top < 0) {
                top = 0;
            } else if (top > this.eleHeight - this.maskLayerHeight) {
                top = this.eleHeight - this.maskLayerHeight;
            };
            this.maskLayer.style.left = left + 'px';
            this.maskLayer.style.top = top + 'px';
            this.asideBox.style.backgroundPosition = left * -this.scaleX + 'px ' + top * -this.scaleY + 'px';
        }
    };
    window.Magnifier = Magnifier;
}());
//放大镜
window.addEventListener('load', function () {

    (function () {

        var smallImgUl = document.querySelector('ul.small-img-ul'),
            phoneDispaly = document.querySelector('a.phone-display');
        
        var i = 0, flag = true;

        var imgArr = {
            'big': [
                '../img/xqylb1.jpg',
                '../img/xqylb2.jpg',
                '../img/xqylb3.jpg',
                '../img/xqylb4.jpg',
                '../img/xqylb5.jpg',
            ],
            'small': [
                '../img/xqyxlb1.jpg',
                '../img/xqyxlb2.jpg',
                '../img/xqyxlb3.jpg',
                '../img/xqyxlb4.jpg',
                '../img/xqyxlu5.jpg'
            ]
        };

        //插入小图片
        var arr = [];
        imgArr['small'].forEach(function (ele) {
            arr.push('<li class=\'img\' style=\'background-image:url(' + ele + ')\'></li>')
        });
        smallImgUl.innerHTML = arr.join('');


        var imgList = smallImgUl.children,
            smallImgWidth = imgList[0].offsetWidth;

        // smallImgUl.style.width = imgList.length * smallImgWidth + 'px';

        //获取索引
        function getIndex(item) {
            return Array.prototype.indexOf.call(imgList, item);
        };
        //初始化展示的大图和小图以及相关样式
        initImg();
        function initImg() {
            Array.prototype.forEach.call(imgList, function (ele, index) {
                ele.className = 'img';
            });
            imgList[i].className += ' active';
            phoneDispaly.style.backgroundImage = 'url(' + imgArr['big'][i] + ')';
        };
        //鼠标移入事件
        smallImgUl.addEventListener('mouseover', function (e) {
            i = getIndex(e.target);
            initImg();
        });        
        var magnifier = new Magnifier(phoneDispaly, {
            maskLayerWidth: 180,
            maskLayerHeight: 240,
            scale: [2]
        });
        function moveEffect(e) {
            if (flag) {
                magnifier.url = imgArr['big'][i];
                magnifier.createRelativeBox();
                flag = false;
            };
            magnifier.calcPosition(e);
        };
        phoneDispaly.addEventListener('mouseenter', function () {
            this.addEventListener('mousemove', moveEffect, false);
            this.addEventListener('mouseleave', function () {
                this.removeEventListener('mousemove', moveEffect);
                this.innerHTML = '';
                flag = true;
            }, false);
        }, false);
    })();
});
//购物车
class Product{
    constructor(){
        //实例属性
        this.cart_btn = document.querySelector('#buy');
        //初始化方法（购物车中的数量)
        this.init();
        //添加事件
        this.addEvent();
    }
    addEvent(){
        let that = this;
        this.cart_btn.onclick = function(){
            //商品ID
            let good_id = this.parentNode.parentNode.getAttribute('data-good-id');
            //商品缩略图
            let good_src = this.parentNode.previousElementSibling.previousElementSibling.children[0].children[0].src;
            //商品名称
            let good_name = this.parentNode.parentNode.children[0].children[0].innerText;
            // console.log(good_name)
            //商品价格
            let good_price = parseInt(this.parentNode.parentNode.children[1].children[0].children[0].innerText);
            // console.log(good_price)
            let good_num = this.parentNode.previousElementSibling.children[1].value;
            // console.log(good_num)
            let storage = window.localStorage;
            let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
            //转对象
            let storage_obj = that.convertStrToObj(storage_str);
            
                //如果不存在
                storage_obj[good_id] = {
                    "name" : good_name,
                    "price" : good_price,
                    "src" : good_src,
                    "num" : good_num
                }
            //创建storage
            storage.setItem('carts',JSON.stringify(storage_obj));
            console.log(storage_obj)
            location.href = 'cart.html';
        }
        let o_minus = document.querySelector('.minus');
            o_minus.onclick = function(){
                //获取商品Id
                let good_id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                // > 1 -
                if(storage_obj[good_id].num > 1){
                    storage_obj[good_id].num --;
                }
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.nextElementSibling.value = storage_obj[good_id].num;
                // this.parentNode.nextElementSibling.innerText = storage_obj[good_id].price * storage_obj[good_id].num;
            }
        //获取所有的 +
        let plus = document.querySelector('.plus');
            plus.onclick = function(){
                //获取id
                let id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
                let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                //数量递增
                storage_obj[id].num ++;
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                //前端
                this.previousElementSibling.value = storage_obj[id].num;
                // this.parentNode.nextElementSibling.innerText = storage_obj[id].price * storage_obj[id].num;
            }
        let o_inp = document.querySelector('.num input');
        //遍历-添加事件
            o_inp.onblur = function(){
                //获取id
             let storage_str = window.localStorage.getItem('carts') ? window.localStorage.getItem('carts') : '';
                let storage_obj = that.convertStrToObj(storage_str);
                let str = this.value; //当前文本框中的值
                if(/^\d+$/.test(str)){
                    storage_obj[id].num = str;
                }else{
                    storage_obj[id].num = 1;
                }
                window.localStorage.setItem('carts',JSON.stringify(storage_obj));
                    let id = this.parentNode.parentNode.getAttribute('data-good-id');
                //后端
               //前端
                this.value = storage_obj[id].num;
                this.parentNode.nextElementSibling.innerText = storage_obj[id].price * storage_obj[id].num;
            }
    }
    init(){
        //获取本地存储中的数据
        let storage = window.localStorage;
        let storage_str = storage.getItem('carts') ? storage.getItem('carts') : '';
         //转对象
         let storage_obj = this.convertStrToObj(storage_str);
         let sum = 0;
         //遍历对象
         for(let key in storage_obj){
             sum += storage_obj[key].num;
         }
         this.cart_btn.value = `购物车(${sum})`;
    }
    convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
}



