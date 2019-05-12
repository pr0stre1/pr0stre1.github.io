let temp_canvas = document.getElementById("draw");
temp_canvas.width  = window.innerWidth - 33;
temp_canvas.height = window.innerHeight - 33;

let canvas = document.getElementById('draw');
let color = document.getElementById('color');
let size = document.getElementById('size');

context = canvas.getContext("2d");

let clickX = [];
let clickY = [];
let clickDrag = [];
let clickColor = [];
let clickSize = [];
let paint;
let mouseX;
let mouseY;
let sizeRadius = 1;
let colorForPaint = "#000000";
let erase = false;
let btn_clear_check = 0;


let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
let offsetTop  = canvas.parentElement.parentElement.offsetTop;


canvas.addEventListener('mousedown',function (e){
    mouseX = e.pageX - this.offsetLeft - offsetLeft;
    mouseY = e.pageY - this.offsetTop - offsetTop;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});

canvas.addEventListener('mousemove',function (e){
    if(paint){
        addClick(e.pageX - this.offsetLeft - offsetLeft,
                 e.pageY - this.offsetTop - offsetTop, true);
        redraw();
    }
});

canvas.addEventListener('mouseup',function (){
   paint = false;
});

canvas.addEventListener('mouseleave',function (){
    paint = false;
});

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    if(erase)
        clickColor.push('#FFFFFF');
    else
        clickColor.push(colorForPaint);
    clickSize.push(sizeRadius);
}

color.addEventListener('input', function () {
    btn_clear_check = 0;
    erase = false;
    colorForPaint = this.value;
    redraw();
});

size.addEventListener('input', function () {
    sizeRadius = this.value;
    redraw();
});

document.getElementById('btn_clear_all').onclick = function () {
    btn_clear_check = 0;
    erase = false;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    clickX.length = 0;
    clickY.length = 0;
    clickDrag.length = 0;
    clickColor.length = 0;
    clickSize.length = 0;
};

document.getElementById('btn_clear').onclick = function () {
    btn_clear_check++;
    if (btn_clear_check%2 !== 0)
        erase = true;
    else
        erase = false;
};

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.lineJoin='round';

    for (let i = 0; i <clickX.length; i ++)
    {
        context.beginPath ();
        if (clickDrag [i] && i) {
            context.moveTo (clickX [i-1], clickY [i-1]);
        } else {
        context.moveTo (clickX [i] - 1, clickY [i]);
        }
        context.lineTo (clickX [i], clickY [i]);
        context.closePath ();
        context.strokeStyle = clickColor[i];
        context.lineWidth = clickSize[i];
        context.stroke ();
    }
}


