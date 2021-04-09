function Login(){
    this.uname = this.$get('#uname');
    this.upwd = this.$get('#upwd');
    this.sub = this.$get('#sub');
    this.go = this.$get('#go');
    this.arr = [false,false];
    this.addEvent();
}
Login.prototype = {
    constructor : Login,
    $get(selector){
        return document.querySelector(selector);
    },
    addEvent(){
        let that = this;
        //前端验证：
        this.uname.onblur = function(){
            let re = /^[\u4e00-\u9fa5]{2,}$/;
            let uname = this.value;
            if(re.test(uname)){
                this.style.background = 'yellowgreen';
                that.arr[0] = true;
            }else{ 
                this.style.background = 'red';
                that.arr[0] = false;
            }
        }
        this.upwd.onblur = function(){
            let re = /^\w+$/;
            let upwd = this.value;
            if(re.test(upwd)){
                this.style.background = 'yellowgreen';
                that.arr[1] = true;
            }else{
                this.style.background = 'red';
                that.arr[1] = false;
            }
        }
        this.sub.onclick = function(){
            if(that.arr.indexOf(false) !== -1){
                alert('请完善登录信息!');
            }else{
                //后端
                let uname = that.uname.value;
                let upwd = that.upwd.value;
                let $ = new Tool();
                let cookie_str = $.getCookie('users') ? $.getCookie('users') : '';
                let cookie_obj = $.convertStrToObj(cookie_str);
                console.log(cookie_obj)
                if(uname in cookie_obj){
                    if(cookie_obj[uname] === upwd){
                        alert('登录成功');
                        location.href = '../index.html';
                    }else{
                        alert('密码错误');
                    }
                }else{
                    alert('用户名不存在！');
                }
            }
        }
        this.go.onclick = function(){
            location.href = 'registor.html';
        }
    }
}

new Login();
function convertStrToObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}