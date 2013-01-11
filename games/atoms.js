var player='r';
var image_color;
var max_number;

function change_detonated( x, y )
{
	temp_number_of_circles = parseInt(plansza[x][y].charAt(0)) + 1

	var temp_display_str = 'games/graphics/atoms/';
	temp_display_str += ( player == 'r' ) ? 'red' : 'green';
	temp_display_str += temp_number_of_circles;
	temp_display_str += ".jpg";
	
	$("img[name=image"+x+"_"+y+"]").attr('src',temp_display_str);
	
	plansza[x][y] = temp_number_of_circles + player;
}

function detonate( x, y )
{
	if( plansza[x-1][y].charAt(0) != '-' )//w lewo
		change_detonated(x-1, y);
	if( plansza[x+1][y].charAt(0) != '-' )// w prawo
		change_detonated(x+1, y);
	if( plansza[x][y-1].charAt(0) != '-' )// w dol
		change_detonated(x, y-1);
	if( plansza[x][y+1].charAt(0) != '-' )//w gore
		change_detonated(x, y+1);
}

function max_nr_circles( x,y )
{
	var max_circles = 0;
	if( plansza[x-1][y].charAt(0) != '-' )//w lewo
		max_circles ++;
	if( plansza[x+1][y].charAt(0) != '-' )// w prawo
		max_circles ++;
	if( plansza[x][y-1].charAt(0) != '-' )// w dol
		max_circles ++;
	if( plansza[x][y+1].charAt(0) != '-' )//w gore
		max_circles ++;
	return max_circles;
}

function OnClick( object, x, y )
{
	color_on_xy = plansza[x][y].charAt(1);
	if( color_on_xy == player || plansza[x][y] == 0 )
	{
		var number_of_circles = parseInt(plansza[x][y].charAt(0)) + 1;
		if( max_nr_circles(x,y) > number_of_circles )
		{
			var display_str = 'games/graphics/atoms/';
			display_str += ( player == 'r' ) ? 'red' : 'green';
			display_str += number_of_circles;
			display_str += ".jpg";
		
			$(object).attr('src',display_str);
			plansza[x][y] = number_of_circles + player;
		}
		else //wybuch;
		{
			detonate(x,y);
			plansza[x][y] = '00';
			$(object).attr('src','games/graphics/atoms/blank.jpg');
		}
		player = ( player == 'r' ) ? 'g' : 'r';
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
				plansza[i][j] = '--';
			else
			{
				plansza[i][j] = '00';
				table_string += "<td><img name=image"+i+"_"+j+" src=games/graphics/atoms/blank.jpg onclick=OnClick(this,"+i+","+j+")></td>";
			}
		}
		table_string+="</tr>";
	}
	table_string+= "</table></center>";
	$("#atoms_board").append(table_string);
}	
