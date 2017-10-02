/**
 * Created by WYH on 17/2/9.
 */
$(document).ready(function () {
    bindCategoryEditEvent();
});

function bindCategoryEditEvent() {
    bindCloseEvent();
}


function bindShowEvent(model) {
    $(model).click(function () {
        show();
    })
}

function bindCreateSubmitClick() {
    $(".new_category_submit").click(function () {
        if (judgeInputEffective()) {
            Api.createNewCategory($(".category_name").val(), $(".category_describe").val(), function (result) {
                result = JSON.parse(result);
                if (result.code == 200) {
                    alert("创建成功");
                    window.location.reload();
                }
            }, function (error) {
                alert(error);
            })
        }
    })
}

function bindEditSubmitClick(oldName) {
    $(".new_category_submit").click(function () {
        if (judgeInputEffective()) {
            Api.changeCategory(oldName, $(".category_name").val(), $(".category_describe").val(), function (result) {
                result = JSON.parse(result);
                if (result.code == 200) {
                    alert("修改成功");
                    window.location.reload();
                }
            }, function (error) {
                console.log(error);
            })
        }
    });
}

function judgeInputEffective() {
    if ($(".category_name").val() == "") {
        alert("请输入名字");
        return false;
    }
    if ($(".category_describe").val() == "") {
        alert("请输入描述信息");
        return false;
    }

    return true;
}

// function initialCategoryData(name, describe) {
//     $(".category_name").val(name);
//     $(".category_describe").val(describe);
// }

function bindCloseEvent() {
    $(".img_close").click(function () {
        hidden();

    });
}


function show() {
    $("body").css({
        "overflow":"hidden"
    });
    $(".category_edit_back").attr('hidden', null);

    $(".category_edit").animate({
        "width": "25%",
        "height": "180px",
        "padding": "10px 20px 20px 20px"
    });
}

function hidden() {
    $("body").css({
        "overflow":"auto"
    });
     $(".category_edit").animate({
            "width": "0",
            "height": "0",
            "padding": "0"
     }, 200);
    $(".category_edit_back").attr('hidden', "hidden");
}