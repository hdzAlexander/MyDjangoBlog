/**
 * Created by WYH on 17/2/7.
 */

$(document).ready(function () {

    var editor = new wangEditor('editor');
    editor.create();

    fetchArticleDetail(editor);
    bindEditClickEvent(editor);
});

function fetchArticleDetail(editor) {

    var detailId = $(".article_edit").attr('id');
    console.log(detailId);
    Api.fetchArticleDetail(detailId, function (result) {
        result = JSON.parse(result);
        console.log(result);
        if (result.code == 200) {
            initialArticleDetail(editor, result.data);
        }
    }, function (error) {
        console.log(error);
    })
}

function initialArticleDetail(editor, detail) {
    editor.$txt.html(detail.text_format);
    $(".article_title").val(detail.title);
    $(".article_category").val(detail.category)

}


function bindEditClickEvent(editor) {
    bindClickSubmitButton(editor);
}

function bindClickSubmitButton(editor) {
    $(".submit_button").click(function () {
        var textFormat = editor.$txt.html();
        var text = editor.$txt.formatText();
        changeArticle(textFormat, text);
    })
}

function changeArticle(textFormat, text) {
    var title = $(".article_title").val();
    var detailId = $(".article_edit").attr('id');
    Api.changeArticleDetail(detailId, title, text, textFormat, function (result) {
        result = JSON.parse(result);
        if (result.code == 200) {
            alert('更新完成');
            window.location.href = "/blog/article/" + detailId;
        }
    }, function (error) {
        console.log(error);
    })
}