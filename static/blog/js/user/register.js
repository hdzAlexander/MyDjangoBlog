/**
 * Created by WYH on 17/2/10.
 */
$(document).ready(function () {
    setupRegistorTitleColor();
    bindRegisterEvent();
});

function setupRegistorTitleColor() {
    $(".register_title").css({
        "color":"#eb6f59"
    });
}

function bindRegisterEvent() {
    bindSubmitButtonClick();
}

function bindSubmitButtonClick() {
    $(".register form button").click(function () {
        if (checkInputEffective()) {
            sendRegisterService();
        }

        return false;
    });
}

function sendRegisterService() {
    var username = $(".username").val();
    var nickname = $(".nickname").val();
    var password = $(".password_confirm").val();
    Api.register(username, nickname, password, function (result) {
        result = JSON.parse(result);
        console.log(result);
    }, function (error) {

    })
}

function checkInputEffective() {
    if (checkInputNotNull(".username", "请输入用户名") && checkInputNotNull(".nickname", "请输入昵称") && checkPasswordEffective()) {
        return true;
    } else  {
        return false;
    }
}

function checkPasswordEffective() {
    var password = $(".password").val();
    var password_confirm = $(".password_confirm").val();
    if (password != password_confirm) {
        alert("两次输入的密码不相同");
        return false;
    }
    if (checkInputNotNull(".password", "请输入密码") && checkInputNotNull(".password_confirm", "请确认密码")) {
        return true;
    } else  {
        return false;
    }
}

function checkInputNotNull(element, alertText) {
    if ($(element).val() == "") {
        alert(alertText);
        return false;
    }
    return true;
}
