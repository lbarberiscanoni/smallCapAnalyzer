var showAllStocks = function(database, sectionName, sectionTitle, numberOfColumns, numberOfCenteredColumns) {
    $("#stockDisplay").append("<div class='col-md-" + numberOfCenteredColumns + "'></div><div class='col-md-" + numberOfColumns + "' id='" + sectionName + "'></div><div class='col-md-" + numberOfCenteredColumns + "'></div>"); 
    $("#stockDisplay #" + sectionName).append("<h2 class='.text-center'>" + sectionTitle + "</h2>");
    $("#stockDisplay #" + sectionName).append("<div id='" + sectionName + "Data'></div>");
    database.on("child_added", function(snapshot) {
        var company = snapshot.val();
        $("#" + sectionName + "Data").append("<h3>" + company.companyName + "</h3><br>");
        $("#" + sectionName + " h3").addClass("btn btn-default");
    });
};

var addParameterOptions = function(a) {
    a.once("child_added", function(snapshot) {
        var companyID = snapshot.key();
        a.child(companyID).on("child_added", function(snapshot) {
            parameter = snapshot.key();
            if (parameter != "companyName" && parameter != "id" && parameter != "ticker" && parameter != "stockTicker" && parameter != "tile" && parameter != "url")  {
                $("#parameter").append("<option>" + parameter + "</option>");
            };
        });
    });
};

var addRangeOptions = function() {
    $("#controls").append("<div class='col-md-2'><input type='number' id='from' placeholder='from' class='form-control'></input></div>");
    $("#controls").append("<div class='col-md-2'><input type='number' id='to' placeholder='to' class='form-control'></input></div>");
    $("#controls").append("<button class='btn btn-default' id='submit'>" + "Search" + "</button>");
};

var showStocksWithinRange = function(section, parameter, db) {
    var from = $("#from").val();
    var to = $("#to").val();
    $("#" + section + "Data").empty();
    db.on("child_added", function(snapshot) {
        var company = snapshot.val();

        var parseStocks = function(companyParameter) {
            if (parameter == "simplyWS") {
                if (from <= companyParameter && companyParameter <= to) {
                    $("#" + section + "Data").append("<h3 class='btn btn-default'>" + company.companyName + "</h3><br>"); 
                    $("#" + section + "Data h3:last").click(function(){
                        window.open(company.url);
                    });
                };
            } else {
                if (parseInt(from) <= parseInt(companyParameter) && parseInt(companyParameter) <= parseInt(to)) {
                    $("#" + section + "Data").append("<h3 class='btn btn-default'>" + company.companyName + "</h3><br>"); 
                    $("#" + section + "Data h3:last").click(function(){
                        window.open(company.url);
                    });
                };
            };
        };

        switch (parameter) {
            case "future":
                parseStocks(company.future);
                break;
            case "health":
                parseStocks(company.health);
                break;
            case "income":
                parseStocks(company.income);
                break;
            case "past":
                parseStocks(company.past);
                break;
            case "overallScore":
                parseStocks(company.overallScore);
                break;
            case "value":
                parseStocks(company.value);
                break;
            case "currentSharePrice":
                parseStocks(company.currentSharePrice);
                break;
            case "industryPriceBook":
                parseStocks(company.industryPriceBook);
                break;
            case "industryPriceEquity":
                parseStocks(company.industryPriceEquity);
                break;
            case "intrinsicValue":
                parseStocks(company.intrinsicValue);
                break;
            case "marketPriceEquity":
                parseStocks(company.marketPriceEquity);
                break;
            case "priceBook":
                parseStocks(company.priceBook);
                break;
            case "priceEquity":
                parseStocks(company.priceEquity);
                break;
            case "priceExpectedGrowth":
                parseStocks(company.priceExpectedGrowth);
                break;
        };
    });
};
