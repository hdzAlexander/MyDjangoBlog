/**
 * Created by WYH on 17/2/8.
 */
$(document).ready(function () {
    fetchArtcileDetail();
});


function bindLikeImgClickEvent(article_id) {
    $(".like_img").click(function () {
        Api.addArticleLikeCount(article_id, function (result) {
            $(".likes_count").text(parseInt($(".likes_count").text()) + 1);
        }, function (error) {

        })
    })
}

function fetchArtcileDetail() {
    var articleId = $('.article_detail').attr("id");
    Api.fetchArticleDetail(articleId, function (result) {
        result = JSON.parse(result);
        console.log(result);
        if (result.code == 200) {
            initialArticleDetail(result.data);
            bindLikeImgClickEvent(result.data.id);
            CalcCount.addBroser(result.data.id, function (result) {
                $(".browse_count").text(parseInt($(".browse_count").text()) + 1);
            }, function (error) {
            });
        }
    }, function (error) {
        console.log(error);
    })
}


function initialArticleDetail(articleDetail) {
    $(".article_text").append(articleDetail.text_format);
    $(".word_count").text(articleDetail.text.length);
}