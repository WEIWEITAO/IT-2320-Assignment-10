var Main = {};

Main.Canvas = document.getElementById('myCanvas');
Main.Context = Main.Canvas.getContext('2d');
Main.StandardColor = "#999999";
Main.HighlightColor = "#FF0000";
Main.MousePressed = false;
Main.MX = 0;
Main.MY = 0;

Main.Images = [
	new Image(),
	new Image(),
	new Image(),
	new Image(),
	new Image()
]

Main.Images[0].src = "1.jpg";
Main.Images[1].src = "2.jpg";
Main.Images[2].src = "3.jpg";
Main.Images[3].src = "4.jpg";
Main.Images[4].src = "5.jpg";

Main.Box = function(x, y, w, h)
{
	this.X = x;
	this.Y = y;
	this.Width = w;
	this.Height = h;

	this.DrawAsImage = function(image)
	{
		Main.Context.drawImage(image, this.X, this.Y, this.Width, this.Height);
	}

	this.IsSelected = function()
	{
		if (!Main.MousePressed) return false;
		var withinXAxisCoordinates = Main.MX > this.X && Main.MX < (this.X + this.Width);
		var withinYAxisCoordinates = Main.MY > this.Y && Main.MY < (this.Y + this.Height);
		return withinXAxisCoordinates && withinYAxisCoordinates;
	}
}

Main.Boxes = [
	new Main.Box(225, 215, 90, 90),
	new Main.Box(315, 215, 90, 90),
	new Main.Box(405, 215, 90, 90),
	new Main.Box(495, 215, 90, 90),
	new Main.Box(585, 215, 90, 90)
];

Main.Canvas.onmousemove = function(event)
{
	if (event.offsetX)
	{
		mouseX = event.offsetX;
		mouseY = event.offsetY;
	}
	else if (event.layerX)
	{
		mouseX = event.layerX;
		mouseY = event.layerY;
	}

	Main.MX = mouseX;
	Main.MY = mouseY;
}

Main.MouseUp = function(mouseEvent)
{
	Main.MousePressed = false;
}

Main.MouseDown = function(mouseEvent)
{
	Main.MousePressed = true;
}

Main.Animate = function()
{
	Main.Context.clearRect(0, 0, Main.Canvas.width, Main.Canvas.height);

	for (var i=0; i<Main.Boxes.length; i++)
	{
		Main.Boxes[i].DrawAsImage(Main.Images[i]);
	}

	requestAnimFrame(function() { Main.Animate(); });
}

window.requestAnimFrame = (function(callback)
{
	return window.requestAnimationFrame
	|| window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame
	|| window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame
	|| function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

$(document).ready(function()
{
	Main.Animate();
	Main.Canvas.addEventListener('mouseup', function(mouseEvent) { Main.MouseUp(mouseEvent); });
	Main.Canvas.addEventListener('mousedown', function(mouseEvent) { Main.MouseDown(mouseEvent); });
});