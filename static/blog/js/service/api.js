/**
 * Created by WYH on 17/2/8.
 */

var Service = (function () {
    var CLIENT_API_HOST = "127.0.0.1:8020";
    var CLIENT_BASE_URL = "http://" + CLIENT_API_HOST + "/blog";

    function getAjax(path, sucFuc, errFuc) {
        path = CLIENT_BASE_URL + "/" + path;
        console.log(path);
        $.ajax({
            url: path,
            success: function (result) {
                sucFuc(result);
            },
            error: function (error) {
                errFuc(error);
            }
        });
    }

    function postAjax(path, data, sucFuc, errFuc) {
        path = CLIENT_BASE_URL + "/" + path;
        console.log(path);
        console.log(JSON.stringify(data));
        $.ajax({
            url: path,
            method: "POST",
            data: JSON.stringify(data),
            success: function(result) {
                sucFuc(result);
            },
            error: function(error) {
                errFuc(error);
            }
        })
    }

    function putAjax(path, data, sucFuc, errFuc) {
        path = CLIENT_BASE_URL + "/" + path;
        console.log("path = " + path);
        console.log("data = " + data);
        ajaxData = {
            url: path,
            type: "PUT",
            dataType: 'json',
            success: function(result) {
                sucFuc(result);
            },
            error: function(error) {
                errFuc(error);
            }
        };
        if (data != null) {
            ajaxData.data = data;
        }
        console.log(data);
        $.ajax(
            ajaxData
        );
    }

    function deleteAjax(path, sucFuc, errFuc) {
        path = CLIENT_BASE_URL + "/" + path;
        $.ajax({
            url: path,
            method: "DELETE",
            dataType: 'json',
            success: function(result) {
                sucFuc(result);
            },
            error: function(error) {
                errFuc(error);
            }
        });
    }


    return {
        getAjax: getAjax,
        postAjax: postAjax,
        putAjax: putAjax,
        deleteAjax: deleteAjax
    }
})();


var Api = (function () {
    function fetchArticleDetail(detailId, sucFuc, errFuc) {
        var path = "get_article_detail/" + detailId;
        Service.getAjax(path, sucFuc, errFuc);
    }

    function changeArticleDetail(detailId, title, text, textFormat, sucFuc, errFuc) {
        var path = "change_article_detail/" + detailId;
        var data = {
            "title": title,
            "text": text,
            "text_format": textFormat
        };
        Service.postAjax(path, data, sucFuc, errFuc);
    }

    function fetchArticleList(page, limitSize, category, sucFuc, errFuc) {
        category = category == "" ? "" : "&category=" + category;
        limitSize = limitSize == "" ? "" : "&limitSize=" + limitSize;
        page = page == "" ? "" : "page=" + page;
        var path = "get_article_list?" + page + limitSize + category;
        Service.getAjax(path, sucFuc, errFuc);
    }

    function fetchCategoryList(sucFuc, errFuc) {
        var path = "get_category_list";
        Service.getAjax(path, sucFuc, errFuc);
    }

    function createNewArticle(title, text, textFormat, categoryName, sucFuc, errFuc) {
        var data = {
            "title": title,
            "text": text,
            "text_format": textFormat,
            "category": categoryName
        };
        var path = "create_article";
        Service.postAjax(path, data, sucFuc, errFuc);
    }

    function changeCategory(oldName, newName, describe, sucFuc, errFuc) {
        var data = {
            "old_name": oldName,
            "new_name": newName,
            "describe": describe
        };
        var path = "change_category";
        Service.postAjax(path, data, sucFuc, errFuc);
    }

    function createNewCategory(name, describe, sucFuc, errFuc) {
        var data = {
            'name': name,
            'describe': describe
        };
        var path = "create_category";
        Service.postAjax(path, data, sucFuc, errFuc);
    }

    function register(username, nickname, password, sucfuc, errfuc) {
        var data = {
            'username':username,
            'nickname':nickname,
            'password': password
        };
        var path = "register";
        Service.postAjax(path, data, sucfuc, errfuc);
    }

    function addArticleBrowse(articleId, sucFuc, errFuc) {
        var data = {
            "article_id": articleId
        };
        var path = "add_browser_count";
        Service.postAjax(path, data, sucFuc, errFuc);
    }

    function addArticleLikeCount(articleId, sucFuc, errFuc) {
        var data = {
            "article_id":articleId
        };
        var path = "add_like_count";
        Service.postAjax(path, data, sucFuc, errFuc);
    }


    return {
        fetchArticleDetail: fetchArticleDetail,
        changeArticleDetail: changeArticleDetail,
        fetchArticleList: fetchArticleList,
        fetchCategoryList: fetchCategoryList,
        createNewArticle: createNewArticle,
        changeCategory: changeCategory,
        createNewCategory: createNewCategory,
        register: register,
        addArticleBrowse: addArticleBrowse,
        addArticleLikeCount: addArticleLikeCount
    }

})();