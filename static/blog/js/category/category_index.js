/**
 * Created by WYH on 17/2/9.
 */
$(document).ready(function () {
    fetchCategoryList();
    bindCategoryIndexEvent();
    bindCreateSubmitClick();
});


function bindCategoryIndexEvent() {
    bindShowEvent(".new_category");
}



function fetchCategoryList() {
    Api.fetchCategoryList(function (result) {
        result = JSON.parse(result);
        if (result.code == 200) {
            setupCategoryListUI(result.data.category_list);
        }
        console.log(result);
    }, function (error) {
        console.log(error);
    })
}

function setupCategoryListUI(categoryList) {
    categoryList.forEach(function (category, index) {
        var describe = category.describe == "null" ? "" :category.describe;
        var categoryHtml = "<div class='category_content'> <h4><a href='" + "/blog/article/" + category.name + "'>" + category.name + "</a><span>" + "&nbsp;(" + category.article_list.length + ")" + "</span></h4> <p>" + describe + "</p> </div>";
        $(".category_list").append(categoryHtml);
    });
}