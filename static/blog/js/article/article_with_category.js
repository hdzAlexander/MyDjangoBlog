/**
 * Created by WYH on 17/2/9.
 */
$(document).ready(function () {
    fetchArticleList();
    bindShowEvent(".edit_category");
    bindEditSubmitClick($(".article_with_category_title span").text());
});


function fetchArticleList() {
    var categoryName = $(".content").attr('id');
    Api.fetchArticleList('', '', categoryName, function (result) {
        result = JSON.parse(result);
        setupArticleListUI(result.data.article_list);
    }, function (error) {
        alert(error);
    });
}


function setupArticleListUI(articleList) {

    for (var i = 0; i < articleList.length; i++) {
        var article = articleList[i];
        var articleHtml = "<div class='list_content'><span>" + article.publish_time + "</span><a href='" + '/blog/article/' + article.id + "'>" + article.title + "</a></div>";
        $(".content").append(articleHtml);
    }


}