function compute_cc()
{
	var temp_cc = Math.random();
	if( temp_cc > 0.66 )
	{
		temp_cc = "kamien";
	}
	else if( temp_cc > 0.33 )
	{
		temp_cc = "papier";
	}
	else
	{
		temp_cc = "nozyce";
	}
	return temp_cc;
}

function get_uc()
{
	temp_uc = '.';
	while( temp_uc != "kamien" || temp_uc != "papier" || temp_uc != "nozyce" )
	{
		temp_uc = prompt( "Wybierz kamien, papier lub nozyce" );
	}
	return temp_uc;
}

function compare( choice1, choice2 )
{
	if( choice1 == "kamien" )
	{
		if( choice2 == "papier" )
			return "papier wygrywa";
		else
			return "kamien wygrywa";
	}
	if( choice1 == "papier" )
	{
		if( choice2 == "kamien" )
			return "papier wygrywa";
		else
			return "nozyce wygrywaja";
	}
	if( choice1 == "nozyce" )
	{
		if( choice2 == "kamien" )
			return "kamien wygrywa";
		else
			return "nozyce wygrywaja";
	}
}

function game_loop()
{
	// opcja zeby grac na 2ch
	uc = get_uc();
	cc = computer_cc();
	var result =	compare(uc, cc);
	alert(result);
	$("#asdf").text(123);
}
