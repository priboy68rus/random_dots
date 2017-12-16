var c = document.getElementById("canvas"),
	container = document.getElementsByClassName("container")[0];

var ctx = c.getContext("2d"),
	rad = 1,
	width = c.width,
	height = c.height
	base_speed = 10,
	speed = base_speed,
	max_main_dots = 3,
	multi_factor = (max_main_dots - 2) / (max_main_dots - 1),
	drawing = 0,
	intervalID = -1;

var start_btn = document.getElementById("start"),
	stop_btn = document.getElementById("stop"),
	reset_btn = document.getElementById("reset"),
	order_range = document.getElementById("order"),
	order_text = document.getElementById("order-text"),
	speed_range = document.getElementById("speed"),
	speed_text = document.getElementById("speed-text");

var main_dots = 0,
	main_dots_array = [];

container.addEventListener("click", function(event) {
	var x = event.clientX - c.offsetLeft;
	var y = event.clientY - c.offsetTop;
	if (main_dots < max_main_dots) {
		main_dots++;
		main_dots_array.push({x: x, y: y});
		place_main_dot(x, y);
		order_text.innerText = main_dots + "/" + max_main_dots;

	}
});

speed_range.addEventListener("input", function(event) {
	speed = base_speed * Math.pow(2, speed_range.value);
	speed_text.innerText = speed;
});

reset.addEventListener("click", function(event) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	main_dots = 0;
	main_dots_array = [];
	order_text.innerText = main_dots + "/" + max_main_dots;

});

start_btn.addEventListener("click", function(event) {
	if (main_dots < max_main_dots)
		return;

	start.disabled = true;


	var newX = Math.floor(width / 2),
		newY = Math.floor(height / 2),
		i = 0,
		mainX,
		mainY,
		deltaX,
		deltaY;

	intervalID = setInterval(function() {
		i = pick_rand_main_dot();
		mainX = main_dots_array[i].x;
		mainY = main_dots_array[i].y;
		deltaX = mainX - newX;
		deltaY = mainY - newY;
		// newX = Math.floor((mainX + newX) / 2);
		// newY = Math.floor((mainY + newY) / 2);
		newX += Math.floor(deltaX * multi_factor);
		newY += Math.floor(deltaY * multi_factor);
		place_dot(newX, newY);
	}, 1000 / speed);
});

order_range.addEventListener("input", function() {
	max_main_dots = order_range.value;
	order_text.innerText = main_dots + "/" + max_main_dots;
	multi_factor = (max_main_dots - 2) / (max_main_dots - 1);

});


stop_btn.addEventListener("click", function(){
	start.disabled = false;
	clearInterval(intervalID);
	intervalID = -1;
});



// function setIntervalReactive(func, timeout) {
	// 
// }


function pick_rand_main_dot() {
	return Math.floor(Math.random() * max_main_dots);
}


function place_main_dot(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, rad + 2, 0, 2 * Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.lineWidth = 0;
	ctx.strokeStyle = "red";
	ctx.stroke();
}


function place_dot(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, rad, 0, 2 * Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.lineWidth = 0;
	ctx.strokeStyle = "black";
	ctx.stroke();
}



console.log(c);