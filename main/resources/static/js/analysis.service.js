var Analysis = (function () {

    var _biAnalysisEndpoint = '/bi/analysis';
    var _biCategoryEndpoint = '/bi/category';

    function Analysis() {
        // No-op
    }

    Analysis.prototype = {
        getBIAnalysis: function (success, failure) {
            $.getJSON(_biAnalysisEndpoint,
                function callback(result, status, xhr) {
                    if ("success" === status) {
                        success(result);
                    } else {
                        failure(result);
                    }
                }
            );
        },
        getCategoryByLabel : function (param, success, failure) {
            $.getJSON(_biCategoryEndpoint, {"category": param},
                function callback(result, status, xhr) {
                    if ("success" === status) {
                        success(result);
                    } else {
                        failure(result);
                    }
                }
            );
        }
    };

    /*Analysis.prototype.getCategoryByLabel = function (param, success, failure) {
        $.getJSON(_biCategoryEndpoint, {"category": param},
            function callback(result, status, xhr) {
                if ("success" === status) {
                    success(result);
                } else {
                    failure(result);
                }
            }
        );
    }*/

    return new Analysis();
})();


