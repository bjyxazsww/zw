function Registor(){
    //属性
    //用户名
    this.uname = this.$get('#uname');
    //密码
    this.upwd = this.$get('#upwd');
    //注册
    this.sub = this.$get('#sub');
    //登录
    this.go = this.$get('#login');
    //数组
    this.arr = [false,false];
    this.font = document.querySelectorAll('font')
    //添加事件
    this.addEvent();
}
Registor.prototype = {
    constructor : Registor,
    $get(selector){
        return document.querySelector(selector);
    },
    addEvent(){
        let that = this;
        //前端验证
        //用户名检测
        this.uname.onblur = function(){
            //正则
            let re = /^[\u4e00-\u9fa5]{2,}$/;
            //用户名
            let str = this.value;
            //判断
            if(re.test(str)){
                that.font[0].innerHTML = '用戶名正確'
                that.arr[0] = true;
            }else{
                that.font[0].innerHTML = '用戶名錯誤'
                that.arr[0] = false;
            }
        }
        //密码检测
        this.upwd.onblur = function(){
            //正则
            let re = /^\w{2,}$/;
            //密码
            let pwd = this.value;
            //判断
            if(re.test(pwd)){
                that.font[1].innerHTML = '密碼正確'
                that.arr[1] = true;
            }else{
                that.font[1].innerHTML = '密碼錯誤'
                that.arr[1] = false;
            }
        }
        //注册按钮
        this.sub.onclick = function(){
            if(that.arr.indexOf(false) !== -1){
                alert('请完善注册信息！');
            }else{
               //当前用户
               let uname = that.uname.value;
               //当前密码
               let upwd = that.upwd.value;
               let $ = new Tool();
               let cookie_str = $.getCookie('users') ? $.getCookie('users') : '';
            //    alert(cookie_str);
                //转对象
                let cookie_obj = $.convertStrToObj(cookie_str);
                //判断当前用户是否存在
                if(uname in cookie_obj){
                    alert('用户已存在！');
                    return;
                }else{
                    cookie_obj[uname] = upwd;
                    //存入cookie
                    $.cookie('users',JSON.stringify(cookie_obj),{expires : 9,path : '/'});
                    alert('注册成功!');
                }
                
            }
        }
        //去登录
        this.go.onclick = function(){
            location.href = 'login.html';
        }
    }
}

new Registor();
function convertStrToObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}