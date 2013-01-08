var player = 0;

function get_the_actual_number_of_circles(i, j)
{
	var max_number = 0;
	var actual_number = plansza[i][j];
	if( plansza[i][j-1] > 0 || plansza[i][j-1] < 6)//jeden w lewo
	{
		max_number += 1;
		acutal_number += 1;
	}
	if( plansza[i][j+1] > 0 || plansza[i][j+1] < 6 )// jeden w prawo
	{
		max_number += 1;
		acutal_number += 1;
	}
	if( plansza[i-1][j] > 0 || plansza[i-1][j] < 6 )//jeden w dol
	{
		max_number += 1;
		acutal_number += 1;
	}
	if( plansza[i+1][j] > 0 || plansza[i+1][j] < 6 )//jeden w gore
	{
		max_number += 1;
		acutal_number += 1;
	}
	
}


function determine_the_changes( i, j )
{
	if( player )
	{
		//czerwony
		image_color="red";
		//get the max number of circles, and actual number of circles:
		get_the_actual_number_of_circles(i, j);
	}
	else
	{
		//zielony
		image_color="greem";
	}
}

function OnClick( i, j )
{
	if( plansza[i][j] == 0 || plansza[i][j] == player) // Jezeli mozliwe jest zrobienie ruchu.(mozliwe ze trzeba bedzie dodac, jezeli nie wybuchaja).
	{
		determine_the_changes( i, j );
			
		$("input[name=image"+i+"_"+j+"]")
	}
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
			table_string += "<td><img name=image"+i+"_"+j+" src=games/graphics/atoms/blank.jpg onclick='OnClick("+i+","+j+")'></td>";
		}
		table_string+="</tr>";
	}
	table_string+= "</table></center>";
	$("#atoms_board").append(table_string);
}	
