// For Approve and Reject Manpower Requests

$('#customRadio2').on('change',()=>{
    if($("#customRadio2").val() == "Rejected") {
        $("#reasonField").show()
    }
})

$('#customRadio1').on('change',()=>{
    if($("#customRadio1").val() == "Approved") {
        $("#reasonField").hide()
        $("#submitButton").show()
    }
})