var companyList = new Firebase("https://stock-screener.firebaseio.com/simplyWS");

$(document).ready(function() {
    companyList.on("child_added", function(snapshot) {
        var company = snapshot.val();
        var companyID = snapshot.key();
        var tickerCode = company.stockTicker;
        $(".container").append("<h3>" + company.companyName + "</h3>");
        $(".container h3:last").addClass("btn btn-default company");
        $(".container .company:last").click(function() {
            var stockTicker = tickerCode.split(":")[1];
            var url = "http://finance.yahoo.com/q?s=" + stockTicker + "&fr=uh3_finance_web&uhb=uhb2";
            companyList.child(companyID).update({
                "marketSnapshot": url,
            });
        });
    });
});
