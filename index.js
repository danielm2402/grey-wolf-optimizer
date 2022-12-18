var iteration = 1
var maxIteration = 200
const canvas = document.getElementById("principal")
var img = document.createElement("img");
img.src = "wolf.png";

var wheel = 0
var mouse = { x: 0, y: 0, button: false, wheel: 0, lastX: 0, lastY: 0, drag: false };
var xs = 0
var ys = 0
var _scale = 1
var p = [
    { x: 4.5861, y: 3.9930, v: 0 },
    { x: 4.0215, y: 4.1747, v: 0 },
    { x: 4.8079, y: 4.3295, v: 0 },
    { x: 3.7389, y: 2.6541, v: 0 },
    { x: 2.0005, y: -2.6027, v: 0 }

]


p.forEach((wolf) => {
    wolf.v = evaluate(wolf.x, wolf.y)
})


sort()
paintTable()



var alpha, beta, delta

var a

function wolf() {
    a = 2 * (1 - (iteration / maxIteration))
    alpha = p[0]
    beta = p[1]
    delta = p[2]

    p.forEach((wolf, index) => {
        //ALPHA
        console.log("RANDOM", getRandomInt(0, 1))
        const A1 = 2 * (a) * getRandomInt(0, 1) - a
        const C1 = 2 * getRandomInt(0, 1)
        const DX1 = Math.abs(C1 * (alpha.x) - (wolf.x))
        const DY1 = Math.abs(C1 * (alpha.y) - (wolf.y))
        const x1 = (alpha.x) - A1 * (DX1)
        const y1 = (alpha.y) - A1 * (DY1)

        //BETA
        const A2 = 2 * (a) * 0.76 - a
        const C2 = 2 * 0.87
        const DX2 = Math.abs(C2 * (beta.x) - (wolf.x))
        const DY2 = Math.abs(C2 * (beta.y) - (wolf.y))

        const x2 = (beta.x) - A2 * (DX2)
        const y2 = (beta.y) - A2 * (DY2)

        //GAMMA

        const A3 = 2 * (a) * 0.55 - a
        const C3 = 2 * 0.67
        const DX3 = Math.abs(C3 * (delta.x) - (wolf.x))
        const DY3 = Math.abs(C3 * (delta.y) - (wolf.y))

        const x3 = (delta.x) - A3 * (DX3)
        const y3 = (delta.y) - A3 * (DY3)

        var newPos = { x: 0, y: 0, v: 0 }
        newPos.x = (x1 + x2 + x3) / 3
        newPos.y = (y1, y2, y3) / 3


        newPos.v = evaluate(newPos.x, newPos.y)

        if ((newPos.x < 5 && newPos.x > -5) && (newPos.y < 5 && newPos.y > -5)) {
            if (newPos.v < wolf.v) {
                p[index] = newPos
                //console.log(newPos)
            }
        }


    })

    console.log(p)
    iteration++
    sort()

}

function sort() {
    p.sort((a, b) => {
        if (a.v == b.v) {
            return 0
        }
        if (a.v < b.v) {
            return -1
        }
        return 1
    })

    paintWolves()
    paintData()
    paintTable2()
}

function evaluate(x, y) {
    return x * x - x * y + y * y + 2 * x + 4 * y + 3
}

function getRandomInt(min, max) {
    return Math.random();
}

function paintWolves() {

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath();
    ctx.moveTo(500, 0);
    ctx.lineTo(500, 500);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 250);
    ctx.lineTo(1000, 250);
    ctx.stroke();

    ctx.fillText(5, 994, 250);
    ctx.fillText(4, 900, 250);
    ctx.fillText(3, 800, 250);
    ctx.fillText(2, 700, 250);
    ctx.fillText(1, 600, 250);


    ctx.fillText(-1, 400, 250);
    ctx.fillText(-2, 300, 250);
    ctx.fillText(-3, 200, 250);
    ctx.fillText(-4, 100, 250);
    ctx.fillText(-5, 0, 250);




    ctx.fillText(5, 500, 500);
    ctx.fillText(4, 500, 450);
    ctx.fillText(3, 500, 400);
    ctx.fillText(2, 500, 350);
    ctx.fillText(1, 500, 300);


    ctx.fillText(-1, 500, 200);
    ctx.fillText(-2, 500, 150);
    ctx.fillText(-3, 500, 100);
    ctx.fillText(-4, 500, 50);
    ctx.fillText(-5, 500, 0);






    p.forEach((wolf, index) => {
        ctx.beginPath();
        let x, y

        if (wolf.x >= 0) {
            x = (wolf.x * 500) / 5 + 500
        } else {
            x = 500 + ((wolf.x * -500) / -5)
        }

        if (wolf.y >= 0) {
            y = (wolf.y * 250) / 5 + 250
        } else {
            y = 250 + ((wolf.y * -250) / -5)
        }

        ctx.fillStyle = "#000"
        if (index === 1) {
            ctx.fillStyle = "#FF0000"
        }
        if (index === 2) {
            ctx.fillStyle = "#0042FF"
        }

        if (index === 0) {

            ctx.fillText("(" + wolf.x.toFixed(2) + "," + wolf.y.toFixed(2) + ")", x, y - 7);
            ctx.drawImage(img, x, y, 20, 20)
        } else {
            ctx.fillRect(x, y, 10, 10)
        }





    })

}

function paintData() {
    var it = document.getElementById("iteraciones")
    it.innerText = "Iteration: " + (iteration - 1)
}

function paintTable() {
    var table = document.getElementById("poblacion")

    p.forEach((wolf, index) => {




        switch (index) {
            case 0:
                var tr = document.createElement("tr")
                tr.style = "background-color:grey"

                var td1 = document.createElement("td")
                td1.innerText = wolf.x.toFixed(3)

                var td2 = document.createElement("td")
                td2.innerText = wolf.y.toFixed(3)

                var td3 = document.createElement("td")
                td3.innerText = wolf.v.toFixed(3)


                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)

                break;
            case 1:
                var tr = document.createElement("tr")
                tr.style = "background-color:#FF0000"
                var td1 = document.createElement("td")
                td1.innerText = wolf.x.toFixed(3)

                var td2 = document.createElement("td")
                td2.innerText = wolf.y.toFixed(3)

                var td3 = document.createElement("td")
                td3.innerText = wolf.v.toFixed(3)


                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)

                break;
            case 2:
                var tr = document.createElement("tr")
                tr.style = "background-color:#0042FF"
                var td1 = document.createElement("td")
                td1.innerText = wolf.x.toFixed(3)

                var td2 = document.createElement("td")
                td2.innerText = wolf.y.toFixed(3)

                var td3 = document.createElement("td")
                td3.innerText = wolf.v.toFixed(3)


                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)
                break;

            default:
                var tr = document.createElement("tr")

                var td1 = document.createElement("td")
                td1.innerText = wolf.x.toFixed(3)
        
                var td2 = document.createElement("td")
                td2.innerText = wolf.y.toFixed(3)
        
                var td3 = document.createElement("td")
                td3.innerText = wolf.v.toFixed(3)
        
        
                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)
                break;
        }




      
    })
}

function paintTable2() {

    const cantidad = document.getElementById("poblacionActual").getElementsByTagName("table")[0].remove()

    var table = document.createElement("table")
    table.style = "width: 500px; border: 1px solid #000;"

    var tr0 = document.createElement("tr")
    var th1 = document.createElement("th")
    th1.innerText = "x"
    var th2 = document.createElement("th")
    th2.innerText = "y"
    var th3 = document.createElement("th")
    th3.innerText = "f(x,y)"

    tr0.appendChild(th1)
    tr0.appendChild(th2)
    tr0.appendChild(th3)

    table.appendChild(tr0)

    p.forEach((wolf, index) => {
        switch (index) {
            case 0:
                var tr = document.createElement("tr")
                tr.style = "background-color:grey"

                var td1 = document.createElement("td")
                td1.innerText = wolf.x.toFixed(3)

                var td2 = document.createElement("td")
                td2.innerText = wolf.y.toFixed(3)

                var td3 = document.createElement("td")
                td3.innerText = wolf.v.toFixed(3)


                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)

                break;
            case 1:
                var tr = document.createElement("tr")
                tr.style = "background-color:#FF0000"
                var td1 = document.createElement("td")
                td1.innerText = wolf.x.toFixed(3)

                var td2 = document.createElement("td")
                td2.innerText = wolf.y.toFixed(3)

                var td3 = document.createElement("td")
                td3.innerText = wolf.v.toFixed(3)


                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)

                break;
            case 2:
                var tr = document.createElement("tr")
                tr.style = "background-color:#0042FF"
                var td1 = document.createElement("td")
                td1.innerText = wolf.x.toFixed(3)

                var td2 = document.createElement("td")
                td2.innerText = wolf.y.toFixed(3)

                var td3 = document.createElement("td")
                td3.innerText = wolf.v.toFixed(3)


                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)
                break;

            default:
                var tr = document.createElement("tr")

                var td1 = document.createElement("td")
                td1.innerText = wolf.x.toFixed(3)

                var td2 = document.createElement("td")
                td2.innerText = wolf.y.toFixed(3)

                var td3 = document.createElement("td")
                td3.innerText = wolf.v.toFixed(3)


                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                table.appendChild(tr)
                break;
        }

    })

    document.getElementById("poblacionActual").appendChild(table)
}




canvas.addEventListener("wheel", function (e) {
    wheel = wheel + -e.deltaY

    let scale = 1
    if (wheel !== 0) {
        scale = wheel < 0 ? 1 / 1.01 : 1.01;
        wheel = wheel * 0.8

        if (Math.abs(wheel) < 1) {
            wheel = 0
        }
        let dx, dy
        if (_scale * scale > _scale) {
            dx = mouse.x - (mouse.x - xs) * scale
            dy = mouse.y - (mouse.y - ys) * scale

        } else {
            dx = mouse.x - (mouse.x - xs) * scale
            dy = mouse.y - (mouse.y - ys) * scale
        }
        scaleAt(dx, dy, scale)
    }

});

canvas.addEventListener("mousemove", function (e) {
    const bounds = canvas.getBoundingClientRect();
    mouse.x = e.pageX - bounds.left - scrollX;
    mouse.y = e.pageY - bounds.top - scrollY;



})


function scaleAt(parX, parY, sc) {

    _scale = _scale * sc
    xs = parX
    ys = parY

    const ctx = canvas.getContext("2d")
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(_scale, 0, 0, _scale, xs, ys)

    console.log(_scale, 0, 0, _scale, xs, ys)
    paintWolves()

}
