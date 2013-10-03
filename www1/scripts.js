"use strict";

var canvas, context;
var width, height;

var pigeons = [];
var speed = 3;

var loop;

function init()
{
	canvas = document.getElementById("field");
	
	context = canvas.getContext("2d");
	
	canvas.width = 500;
	canvas.height = 500;
	
	width = canvas.width;
	height = canvas.height;
	
	pigeons.push(new Pigeon(0, 0, 1));
	pigeons.push(new Pigeon(0, height, 2));
	pigeons.push(new Pigeon(width, height, 3));
	pigeons.push(new Pigeon(width, 0, 0));
	
	main();
}

function rad(deg)
{
	return (Math.PI / 180) * deg;
}

function main()
{
	update();
	draw();
	
	setTimeout(main, 20);
}

function update()
{
	for(var i = 0; i < pigeons.length; i++)
	{
		pigeons[i].calculateDirection();
		pigeons[i].move()
	}
}

function draw()
{
	context.clearRect(0, 0, width, height);
	
	for(var i = 0; i < pigeons.length; i++)
	{
		pigeons[i].draw();
	}
}

function Pigeon(x, y, toFollow)
{
	this.x = x;
	this.y = y;
	
	this.toFollow = toFollow;
	
	this.speed = {x: 0, y: 0};
	
	this.calculateDirection = function ()
	{
		var dx = pigeons[toFollow].x - this.x;
		var dy = pigeons[toFollow].y - this.y;
		var d = Math.abs(dx) + Math.abs(dy);
		
		this.speed.x = speed * dx/d;
		this.speed.y = speed * dy/d;
		console.log(this.speed);
		console.log(this.speed.x + this.speed.y);
	}
	
	this.move = function ()
	{
		this.x += this.speed.x;
		this.y += this.speed.y;
	}
	
	this.draw = function ()
	{
		context.beginPath();
		context.arc(this.x, this.y, 10, 0, rad(360));
		context.fill();
	}
}