/**
 * Created by WYH on 17/2/10.
 */
var CalcCount = function () {
    
    function addBroserCount(blogId, successFuc, errorFuc) {
        Api.addArticleBrowse(blogId, successFuc, errorFuc);
    }


    return {
        addBroser: addBroserCount
    }
    
}();