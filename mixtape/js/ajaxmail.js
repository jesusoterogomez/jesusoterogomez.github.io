


 $(document).ready(function(){
	$("#contacto").submit(function(){
		var name = $("#username").val();
		
		var mail = $("#email").val();
		var text = $("#message").val();


	//	name = name.replace(/'/g, "\\'"); 
	//	text = text.replace(/'/g, "\\'"); 
	name = escape(name);
	text = escape(text);
		if(name.length != 0 && mail.length != 0 && text.length != 0)
		{
			var datastr ="name=" + name + "&mail=" + mail + "&text=" + text;
			$("fieldset").fadeOut("slow");
			$("#response").html("Enviando mensaje");
			setTimeout('$("#response").fadeIn("slow")',800);
			setTimeout('$("#response").css("display", "block"))',800);
			setTimeout("send('"+datastr+"')",3000);
			setTimeout('$("#response").fadeOut("slow")',3000);
		}
		return false;
	});
});

function send(datastr){
	
	$.ajax({
		type: "POST",
		url: "./mail.php",
		data: datastr,
		cache: false,
		success: function(html){
		$("#response").fadeIn("slow");
		$("#response").html(html);
		setTimeout('$("#response").fadeOut("slow")',2000);
		$("#username").val("");
		$("#email").val("");
		$("#message").val("");
		setTimeout('$("fieldset").fadeIn("slow")',2500);

	}
	});
}


