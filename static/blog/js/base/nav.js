/**
 * Created by WYH on 17/2/9.
 */
$(document).ready(function () {
    bindSearchInput();
});

function bindSearchInput() {
    $(".search_img").click(function () {
        var searchText = $("input.search").val();
        console.log(searchText);
    })
}