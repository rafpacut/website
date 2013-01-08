function determine_the_changes( i, j )
{
	
}

function OnClick( element, i, j )
{
	determine_the_changes( i, j );
    $(element).attr('src','games/graphics/atoms/red1.jpg');
}

function atoms_Init()
{
	plansza = new Array();
	dl_boku = 8;
	table_string = "<center><table border=1>";
	for( i = 0 ; i < dl_boku ; i++ )
	{
		plansza[i] = new Array();
		table_string += "<tr>";
		for( j = 0 ; j < dl_boku ; j++ )
		{
			if( i == 0 || j == 0 )
				plansza[i][j] = -1;
			plansza[i][j] = 0;
			table_string += "<td><img name=image"+i+"_"+j+" src=games/graphics/atoms/blank.jpg onclick=OnClick(this,"+i+","+j+")></td>";
		}
		table_string+="</tr>";
	}
	table_string+= "</table></center>";
	$("#atoms_board").append(table_string);
}	
