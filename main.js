var companyList = new Firebase("https://stock-screener.firebaseio.com/simplyWS");

$(document).ready(function() {
    companyList.on("child_added", function(snapshot) {
        company = snapshot.val();
        companyID = snapshot.key();
        //$(".container").append("<h3>" + company.companyName + "</h3>");
        $(".container").append("<h3>" + companyID + "</h3>");
        $(".container h3:last").addClass("btn btn-default");
        $(".container .btn:last").click(function() {
            var thisCompanyID = $(this).text();
            companyList.child(thisCompanyID).update({
                "id": thisCompanyID,
            });
        });
    });
});
