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
                            var industry = thisStock.industryDescription
                            companyList.child(thisCompanyID).update({
                                "industry": industry,
                            });
                            var branchToRemove = new Firebase("https://stock-screener.firebaseio.com/smallCap/" + thisCompanyID + "/" + thisStockName);
                            branchToRemove.remove();
                        });
                    });
                };
            });
        });
    });
});
