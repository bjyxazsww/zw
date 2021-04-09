$(function () {
    let $zh = $('#zh');
    let $level01 = $('#ul')
    $.getJSON("json/menu.json", function (json) {
        console.log(json.menu);
        let myMenu = json.menu;
        let myOne = myMenu.one;
        $.each(myOne, function (j) {
            $("<li>" + myOne[j] + "</li>").appendTo("#ul");
        })
        $level01.mouseover(function () {
            $(this).css("display", "block");
        });
        var onOff = false;
        $zh.click(function () {
            if (onOff) {
                $level01.css("display", "block");
            } else {
                $level01.css("display", "none");
            }
            onOff = !onOff;
        })
        $zh.hover(function () {
            $level01.css("display", "block");
        }, function () {
            if (onOff) {
                $level01.css("display", "block");
            } else {
                $level01.css("display", "none");
            }
        })
    })
})
$(function () {
    let $zh = $('#zh');
    let $level01 = $('#ul')
    $.getJSON("../json/menu.json", function (json) {
        console.log(json.menu);
        let myMenu = json.menu;
        let myOne = myMenu.one;
        $.each(myOne, function (j) {
            $("<li>" + myOne[j] + "</li>").appendTo("#ul");
        })
        $level01.mouseover(function () {
            $(this).css("display", "block");
        });
        var onOff = false;
        $zh.click(function () {
            if (onOff) {
                $level01.css("display", "block");
            } else {
                $level01.css("display", "none");
            }
            onOff = !onOff;
        })
        $zh.hover(function () {
            $level01.css("display", "block");
        }, function () {
            if (onOff) {
                $level01.css("display", "block");
            } else {
                $level01.css("display", "none");
            }
        })
    })
})


