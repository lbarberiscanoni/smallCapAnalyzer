var yahooData = new Firebase("https://stock-screener.firebaseio.com/smallCap");
var simplyWSData = new Firebase("https://stock-screener.firebaseio.com/simplyWS");

$(document).ready(function() {
    //let's show all the stocks and narrow it down based on parameters
    showAllStocks(yahooData, "yahoo", "Yahoo Finance", 6, 0);
    showAllStocks(simplyWSData, "simplyWS", "Simply Wall Street", 6, 0);

    //let's make the default assumption you wanna look at both dbs
    addParameterOptions(yahooData);
    addParameterOptions(simplyWSData);

    $("#db").change(function() {
        //let's only add the parameters applicable to the db
        $("#parameter").empty();
        var data = $("#db").val();

        if (data == "Yahoo") {
            $("#yahoo").remove();
            $("#simplyWS").remove();
            showAllStocks(yahooData, "yahoo", "Yahoo Finance", 4, 4);
            $("#parameter").append("<option>" + "Pick a Parameter" + "</option>");
            addParameterOptions(yahooData);
            $("#parameter").change(function() {
                var parameter = $("#parameter").val();
                addRangeOptions();
                $("#submit").click(function() {
                    showStocksWithinRange("yahoo", parameter, yahooData)
                });
            });
        } else if (data == "Simply Wall Street") {
            $("#yahoo").remove();
            $("#simplyWS").remove();
            showAllStocks(simplyWSData, "simplyWS", "Simply Wall Street", 4, 4);
            $("#parameter").append("<option>" + "Pick a Parameter" + "</option>");
            addParameterOptions(simplyWSData);
            $("#parameter").change(function() {
                var parameter = $("#parameter").val();
                addRangeOptions();
                $("#controls #submit").click(function() {
                    showStocksWithinRange("simplyWS", parameter, simplyWSData)
                });
            });
        } else {
            console.log("Database not available");
        };
    });
});
