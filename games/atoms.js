//popraw "ZMIEN TO!" i zmien wyswietlanie wygranej z alertu na wpisaywanie do text inputu;
var player='r';
var image_color;
var max_number;
var green_il = 0;
var red_il = 0;
var running = true;

function check_cells( x, y )
{
	var char = plansza[x][y].charAt(1);
	if( char != '-' )
	{
		if( char == 0 )
		{
			if( player == 'r' )//ZMIEN TO JAK NAJSZYBCIEJ!-------------
				red_il += 1;
			else
				green_il += 1;
		}
		else if( char != player )
		{
			if( player == 'r' )//ZMIEN TO JAK NAJSZYBCIEJ!-------------
			{
				red_il += 1;
				green_il -= 1;
			}
			else
			{
				green_il += 1;
				red_il -= 1;
			}//----------------------------------------------------------
		}
		change_img( x, y );
	}
}

function detonate( x, y )
{
	check_cells( x-1, y);
	check_cells( x+1, y);
	check_cells( x, y-1);
	check_cells( x, y+1);
}



function max_nr_circles( x,y )
{
	var max_circles = 0;
	if( plansza[x-1][y].charAt(0) != '-' )//w lewo
		max_circles += 1;
	if( plansza[x+1][y].charAt(0) != '-' )// w prawo
		max_circles += 1;
	if( plansza[x][y-1].charAt(0) != '-' )// w dol
		max_circles += 1;
	if( plansza[x][y+1].charAt(0) != '-' )//w gore
		max_circles += 1;
	return max_circles;
}

function dbg2()
{
	alert( "czerwony: "+red_il+"\n"+"zielony: "+green_il );
}

function dbg(x,y)
{
	var foo = '';
	for(u=0;u<=9;u++)
	{
		for(g=0;g<=9;g++)
		{
			foo+=plansza[u][g]+" ";
		}
		foo += "\n";
	}
	alert(foo);
}


function change_img( x, y )
{
	var number_of_circles = parseInt(plansza[x][y].charAt(0)) + 1 ;
	if( max_nr_circles(x,y) > number_of_circles )
	{
//		dbg(x,y);
		var display_str = 'games/graphics/atoms/';
		display_str += ( player == 'r' ) ? 'red' : 'green';
		display_str += number_of_circles;
		display_str += ".jpg";
	
//		$(object).attr('src',display_str);
		$("img[name=image"+x+"_"+y+"]").attr('src',display_str);
		plansza[x][y] = number_of_circles + player;
		if( red_il == 0 && green_il > 1 )
		{
//			alert( "zielony wygral!" );
			$("#atoms_results").text("zielony wygral!");
			running = false;
		}
		if( green_il == 0 && red_il > 1 )
		{
//			alert( "czerwony wygral!" );
			$("#atoms_results").text("czerwony wygral!");
			running = false;
		}
	}
	else //wybuch;
	{
		plansza[x][y] = '00';
		$("img[name=image"+x+"_"+y+"]").attr('src','games/graphics/atoms/blank.jpg');	
		detonate(x,y);
		if( player == 'r' )//ZMIEN TO JAK NAJSZYBCIEJ!-------------
			red_il -= 1;
		else
			green_il -= 1;
	}
//	dbg(x,y);
}

function available( x, y )
{
	if( running )
	{
		if( plansza[x][y].charAt(0) == 0 )
		{
			if( player == 'r' )
				red_il += 1;
			else
				green_il += 1;
			return true;
		}
		color_on_xy = plansza[x][y].charAt(1);
		if( color_on_xy == player )
			return true;
	}
}


function OnClick( object, x, y )
{
	if( available( x, y ) )
	{
		change_img( x, y );
		player = ( player == 'r' ) ? 'g' : 'r';	
	}
}


function atoms_Init()
{
	$("#atoms_board").text(".");//Ma pozwolic na rozpoczecie gry jeszcze raz.
	$("#atoms_results").text(" ");
	player='r';
	green_il = 0;
	red_il = 0;
	running = true;
	
	plansza = new Array();
	dl_boku = 8;
	table_string = "<center><table border=0.5>";
	for( i = 0 ; i <= (dl_boku+1) ; i++ )
	{
		plansza[i] = new Array();
		table_string += "<tr>";
		for( j = 0 ; j <= (dl_boku+1) ; j++ )
		{
			if( i == 0 || j == 0 || i == (dl_boku +1) || j == (dl_boku +1))
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
	$("atoms_board_background").toggle();
}	
