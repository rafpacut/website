function OnClick()
{
	
}

function gameloop()
{
	
}

function atoms_Init()
{
	//wpisanie tabelki z obrazkami w html'a
//	$('.atoms_board').append()
	
	plansza = new Array();
	dl_boku = 8;
	s += "<center><table>";
	for( i = 0 ; i < dl_boku ; i++ )
	{
		plansza[i] = new Array();
		s += "<tr>";
		for( j = 0 ; j < dl_boku ; j++ )
		{
			if( i == 0 || j == 0 )
				plansza[i][j] = -1;
			plansza[i][j] = 0;
			s += "<td><img name=image"+i+"_"+j+" src=games/graphics/atoms/blank.jpg></td>";
		}
		s+="</tr>";
	}
	s+= "</table></center>";
	gameloop();
}
