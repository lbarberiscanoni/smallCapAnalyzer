var companyList = new Firebase("https://stock-screener.firebaseio.com/simplyWS");

$(document).ready(function() {
    companyList.on("child_added", function(snapshot) {
        company = snapshot.val();
        companyID = snapshot.key();
        //$(".container").append("<h3>" + company.companyName + "</h3>");
        $(".container").append("<h3>" + companyID + "</h3>");
        $(".container h3:last").addClass("btn btn-default company");
        $(".container .company:last").click(function() {
            var thisCompanyID = $(this).text();
            companyList.orderByKey().on("child_added", function(snapshot) {
                var company = snapshot.val();
                if (company.id == thisCompanyID) {
                    $.ajax("https://simplywall.st/api/snowflake/" + company.stockTicker).success(function(data){
                        var url = data.widgetURL;
                        var tile = data.snowflakeTileURL;
                        var overallScore = data.snowflakeColour;

                        companyList.child(thisCompanyID).update({
                            "url": url,
                            "tile": tile,
                            "overallScore": overallScore,
                        });
                    });
                };
            });
        });
    });
});
