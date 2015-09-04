var companyList = new Firebase("https://stock-screener.firebaseio.com/smallCap");

$(document).ready(function() {
    companyList.on("child_added", function(snapshot) {
        company = snapshot.val();
        companyID = snapshot.key();
        $(".container").append("<h3>" + companyID + "</h3>");
        $(".container h3:last").addClass("btn btn-default");
        $(".container .btn:last").click(function() {
            var thisCompanyID = $(this).text();
            companyList.on("child_added", function(snapshot) {
                var companyID = snapshot.key();
                if (thisCompanyID == companyID) {
                    companyList.child(thisCompanyID).on("child_added", function(snapshot) {
                        var thisStock = snapshot.val();
                        var thisStockName = snapshot.key();
                        companyList.child(thisCompanyID).child(thisStockName).on("child_added", function(snapshot) {
                            var stockData = snapshot.val();
                            var stockMetrics = snapshot.key();
                            var pushNameAndID = function() {
                                companyList.child(thisCompanyID).update({
                                    "priceExpectedGrowth": stockData,
                                    "id": thisCompanyID,
                                    "ticker": thisStockName,
                                });
                            };
                            switch (stockMetrics) {
                                case "companyName":
                                    companyList.child(thisCompanyID).update({
                                        "companyName": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                                case "currentSharePrice":
                                    companyList.child(thisCompanyID).update({
                                        "currentSharePrice": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                                case "industryPriceBook":
                                    companyList.child(thisCompanyID).update({
                                        "industryPriceBook": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                                case "industryPriceEquity":
                                    companyList.child(thisCompanyID).update({
                                        "industryPriceEquity": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                                case "intrinsicValue":
                                    companyList.child(thisCompanyID).update({
                                        "intrinsicValue": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                                case "marketPriceEquity":
                                    companyList.child(thisCompanyID).update({
                                        "marketPriceEquity": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                                case "priceBook":
                                    companyList.child(thisCompanyID).update({
                                        "priceBook": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                                case "priceEquity":
                                    companyList.child(thisCompanyID).update({
                                        "priceEquity": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                                case "priceExpectedGrowth":
                                    companyList.child(thisCompanyID).update({
                                        "priceExpectedGrowth": stockData,
                                    });
                                    pushNameAndID();
                                    break;
                            };
                        });
                    });
                };
            });
        });
    });
});
