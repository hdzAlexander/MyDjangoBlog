/**
 * Created by WYH on 17/2/7.
 */
$(document).ready(function () {
    fetchArticleList();
});

function bindArticleListClickEvent() {
    console.log('bindClickEvent');
    bindClickReadMoreButton();
    bindClickEditButton();
}


function bindClickReadMoreButton() {
    $(".read_more_btn").click(function () {
        console.log("===========");
        var click_id = $(this).attr('id');
        window.location.href = "/blog/article/" + click_id;
    })
}


function bindClickEditButton() {
    $(".edit_btn").click(function () {
        var click_id = $(this).attr('id');
        window.location.href = "/blog/article/" + click_id + "/edit";
    })
}


function fetchArticleList() {
    var page = $(".content").attr('id');
    page = page == "None" ? "" : page;
    Api.fetchArticleList(page, 5, "", function (result) {
        result = JSON.parse(result);
        initialArticleList(result.data.article_list);
        setupNumberPage(result.data.page, result.data.page_count);
        setupNextAndLastPage(result.data.page, result.data.page_count);
    }, function (error) {
        console.log(error);
    });
}


function setupNumberPage(page, pageCount) {
    for (var i = 0 ; i< pageCount; i++) {
        if (i == page - 1) {
            $(".next_page").before("<li><a id='page" + (i + 1) + "'>" + (i + 1) + "</a></li>");
        } else {
            $(".next_page").before("<li><a href='/blog?page=" + (i + 1) + "' id='" + (i + 1) + "'>" + (i + 1) + "</a></li>");
        }
    }
    $("a#page" + (page)).css({"background":'#E7E7E7'});

}

function setupNextAndLastPage(page, pageCount) {
    $("a.next_page").attr("href", "/blog?page=" + (parseInt(page) + 1));
    $("a.last_page").attr("href", "/blog?page=" + (parseInt(page) - 1));
    if (page == 1) {
        setupDisabledPage("a.last_page");
    }
    if (page == pageCount) {
        setupDisabledPage("a.next_page");
    }
}

function setupDisabledPage(pageModel) {
     $(pageModel).css({'color':'#F0EFF0'});
     $(pageModel).attr({'href':null});
}

function initialArticleList(articleList) {
    articleList.forEach(function (article, index) {
        var appendHtml = "<div class=\"article_content\">" +
                "<h4 class=\"article_title\">" + article.title + "</h4>" +
        "<p class=\"time\">创建时间：" + article.publish_time + "</p>" +
        "<p class=\"time\">修改时间：" + article.last_modify_time + "</p>" +
        "<img class=\"article_cover\" id='article_cover" + index + "' src='" + getArticleCover(article.text_format) + "'>" +
        "<pre class=\"article_text\">" + article.text + "</pre>" +
        "<button id=\"" + article.id + "\" class=\"btn btn-default read_more_btn\">Read More</button>" +
        "<button id=\"" + article.id + "\" class=\"btn btn-default edit_btn\">Edit</button>" +
        "<div class=\"article_likes\">" +
            "<span>点赞数:" + article.likes_count + "</span>&nbsp;&nbsp;&nbsp;" +
            "<span>浏览数:" + article.browse_count + "</span>" +
        "</div>" + "</div>";
        $(".article_list").append(appendHtml);
        if (getArticleCover(article.text_format) == "") {
            $("#article_cover" + index).attr("hidden", "hidden");
        }
    });

    bindArticleListClickEvent();
}


function getArticleCover(textFormat) {
    // console.log(textFormat);
    var imgIndex = textFormat.indexOf('<img');
    if (imgIndex >=0) {
        var imgSrcIndex = textFormat.indexOf('src');
        textFormat = textFormat.substring(imgSrcIndex);
        var imgLastIndex = textFormat.indexOf('\"', 5);
        return textFormat.substring(5, imgLastIndex);
    } else {
        return ""
    }
}