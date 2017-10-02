/**
 * Created by WYH on 17/2/9.
 */
$(document).ready(function () {
    var editor = new wangEditor('editor');
    editor.create();

    bindNewArticleClickEvent(editor);

});

function bindNewArticleClickEvent(editor) {
    bindSubmitButtonClick(editor);
}

function bindSubmitButtonClick(editor) {
    $(".submit_button").click(function () {
        if (judgeArticleEffective()) {
            submitArticle(editor);
        }
    })
}

function submitArticle(editor) {
    var title = $(".article_title").val();
    var category = $(".article_category").val();
    var text = editor.$txt.formatText();
    var textFormat = editor.$txt.html();
    
    Api.createNewArticle(title, text, textFormat, category, function (result) {
        result = JSON.parse(result);
        if (result.code == 200) {
            alert("创建新博客成功");
            window.location.href = "/blog/article/" + result.data.article_detail.id;
        }
    }, function (error) {
        alert(error);
    })

}

function judgeArticleEffective() {
    var title = $(".article_title").val();
    var category = $(".article_category").val();
    if (title == "") {
        alert('请输入标题');
        return false;
    }
    if (category == "") {
        alert("请输入博客所属的分类");
        return false;
    }
    return true;
}