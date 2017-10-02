/**
 * Created by WYH on 17/2/9.
 */
$(document).ready(function () {
    fetchArticleList();
});


function fetchArticleList() {
    Api.fetchArticleList(getListPage(), 20, "", function (result) {
        result = JSON.parse(result);
        console.log(result);
        setupArticleList(result.data.article_list);
        setupPageButton(result.data.page, result.data.page_count);
    }, function (error) {
        console.log(error);
    })
}

function setupPageButton(page, pageCount) {
    setupPageButtonEffective(page, pageCount);
    setupPageButtonUrl(page, pageCount);
}

function setupPageButtonEffective(page, pageCount) {
    if (page == 1) {
        $(".last_page").attr('disabled', 'disabled');
        $('.last_page').css('color', '#d8d8d8');
    }
    if (page == pageCount) {
        $(".next_page").attr('disabled', 'disabled');
        $('.next_page').css('color', '#d8d8d8');
    }
}

function setupPageButtonUrl(page, pageCount) {
    if (page != 1) {
        $(".last_page").attr('href', '/blog/article?page=' + (parseInt(page) - 1));
    }
    if (page != pageCount) {
        $(".next_page").attr('href', '/blog/article?page=' + (parseInt(page) + 1));
    }
}

function getListPage() {
    var page = $(".content").attr('id');
    if (page == "None") {
        return "";
    } else {
        return page;
    }
}

function setupArticleList(articleList) {

    for (var i = articleList.length - 1; i >= 0; i--) {
        var article = articleList[i];
        var articleHtml = "<div class='list_content'><span>" + article.publish_time + "</span><a href='" + '/blog/article/' + article.id + "'>" + article.title + "</a></div>";
        $(".content").prepend(articleHtml);
    }
}