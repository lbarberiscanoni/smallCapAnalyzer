var yahooData = new Firebase("https://stock-screener.firebaseio.com/smallCap");
var simplyWSData = new Firebase("https://stock-screener.firebaseio.com/simplyWS");

var addParameterOptions = function(database) {
    database.once("child_added", function(snapshot) {
        var companyID = snapshot.key();
        database.child(companyID).on("child_added", function(snapshot) {
            parameter = snapshot.key();
            if (parameter != "companyName" && parameter != "id" && parameter != "marketSnapshot" && parameter != "ticker" && parameter != "stockTicker" && parameter != "tile" && parameter != "url")  {
                $("#parameter").append("<option>" + parameter + "</option>");
            };
        });
    });
};

var showStocksWithinParameter = function(database, parameter) {
    $("#stockDisplay").empty();
    database.on("child_added", function(snapshot) {
        var selectedParameter = $("#parameter").val();
        var company = snapshot.val();

        var addStock = function(a) {
            $("#stockDisplay").append("<a class='btn btn-default stock'>" + company.companyName + "<br>" + selectedParameter + ": " + a + "</a><br>");
            $("#stockDisplay a:last").click(function() {
                $("#snowFlake").empty();
                $("#marketSnapshot").empty();
                $("#snowFlake").append("<img src='" + company.tile + "'></img>");
                $("#marketSnapshot").append("<iframe src='" + company.marketSnapshot + "' width='600' height='520'></iframe>");
            });
        };

        switch (selectedParameter) {
            case "future":
                addStock(company.future);
                break;
            case "health":
                addStock(company.health);
                break;
            case "income":
                addStock(company.income);
                break;
            case "overallScore":
                addStock(company.overallScore);
                break;
            case "past":
                addStock(company.past);
                break;
            case "value":
                addStock(company.value);
                break;
            case "currentSharePrice":
                addStock(company.currentSharePrice);
                break;
            case "industryPriceBook":
                addStock(company.industryPriceBook);
                break;
            case "industryPriceEquity":
                addStock(company.industryPriceEquity);
                break;
            case "intrinsicValue":
                addStock(company.intrinsicValue);
                break;
            case "marketPriceEquity":
                addStock(company.marketPriceEquity);
                break;
            case "priceBook":
                addStock(company.priceBook);
                break;
            case "priceEquity":
                addStock(company.priceEquity);
                break;
            case "priceExpectedGrowth":
                addStock(company.priceExpectedGrowth);
                break;
        };
    });
};

$(document).ready(function() {
    $("#db").change(function() {
        $("#stockDisplay").empty();
        var selectedDB = $("#db").val();
        if (selectedDB == "Simply Wall Street") {
            addParameterOptions(simplyWSData);
            var selectedParameter = $("#parameter").val();
            $("#parameter").change(function() {
                showStocksWithinParameter(simplyWSData, selectedParameter)
            });
        } else {
            addParameterOptions(yahooData);
            var selectedParameter = $("#parameter").val();
            $("#parameter").change(function() {
                showStocksWithinParameter(yahooData, selectedParameter)
            });
        };
    });
});
