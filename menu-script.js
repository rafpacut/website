$(function()
{
	$("#menu-button").click(function()
	{
		$("#menu").fadeIn(1000);
	});
	
	change_subpage($("#platform1"));
});

function change_subpage(jqueryObject)
{
	$(".subpage").hide();
	jqueryObject.show();
}