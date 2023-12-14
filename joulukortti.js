function init() {
    let canvas = document.getElementById('screen');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.requestAnimationFrame(newtime => {
      oldtime = newtime;
      window.requestAnimationFrame(loop);
    });
}

function loop(newtime) {
    const dt = newtime - oldtime;
    draw(dt);
    window.requestAnimationFrame(loop);

}

function draw(dt) {
    let canvas = document.getElementById('screen');
    let ctx = canvas.getContext('2d');
    ctx.font = "24px monospace";

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    drawIntroScene(dt, ctx, 12000);
    drawSnowScene(dt, ctx, 12000, 18000);
    drawLandScape(dt, ctx, 18000, 40000);
}

function drawIntroScene(dt, ctx, sceneLength) {
    if (dt >= sceneLength) return;
    ctx.save();
    ctx.fillStyle = '#FFF';
    let festive_str = 'Hyvää joulua Masa! Hyvää joulua Masa! Hyvää joulua Masa! Hyvää joulua Masa! ';
    for (let i = 0; i < 14; i++) {
        for (let spos = 0; spos < festive_str.length; spos++) {
            let fadeout = sceneLength - dt;
            let shine = Math.sin(-i*8 + spos*0.1 + dt/200);
            ctx.globalAlpha = Math.min(
                shine/2 + 0.6,
                fadeout,
                1
            );
            ctx.fillStyle = `rgb(
                255,
                ${215-shine*215 + 40},
                ${215-shine*215 + 40}
            `;
            ctx.fillText(
                festive_str[spos],
                -240 + spos * 27 + i * 40 - dt/20 + Math.sin((dt+20*spos)/270)*8,
                i * 108 + Math.cos((dt+80*spos*0.8)/270)*14
            );
        }
    }
    ctx.restore();
}

function drawSnowScene(dt, ctx, sceneStart, sceneLength) {
    if (dt >= sceneLength || dt < sceneStart) return;
    ctx.save();
    ctx.fillStyle = '#DDD';
    for(let i = 0; i < 40; i++) {
        for (let j = 0; j < 24; j++) {
            ctx.beginPath();
                ctx.arc(
                    sceneStart + 600 + j * 120 - dt - Math.cos(dt/80)*18.8,
                    -800 + (i+(j%2/2)) * 80 - Math.sin(dt/90) * 9 + (dt-sceneStart) * 0.09,
                    4 + Math.sin(i*dt/800)*0.8,
                    0,
                    Math.PI * 2
                )
                ctx.fill();
            }
    }
    ctx.fillStyle='#FFF';
    ctx.fillRect(
    	0,
    	window.innerHeight * (1-Math.min(((dt-sceneStart)/4000), 0.8)),
    	window.innerWidth,
    	window.innerHeight
    );
    ctx.restore();
}

function drawLandScape(dt, ctx, sceneStart, sceneLength) {
	if (dt >= sceneLength || dt < sceneStart) return;
	ctx.save();
	//snow landscape from previous scene
	ctx.fillStyle='#FFF';
    ctx.fillRect(
    	0,
    	window.innerHeight * 0.2,
    	window.innerWidth,
    	window.innerHeight
    );
    ctx.restore();

    //trees!
    for (let i = 0; i < 32; i++) {
    	ctx.fillStyle='#B99';
    	ctx.fillRect(
    		40 - (dt/4) % 40 + 40*i,
    		window.innerHeight * 0.2 - 10,
    		10,
    		10
    	);
    	ctx.fillStyle='#2A1'
    	ctx.save();
    	ctx.translate(40 - (dt/4) % 40 + 40*i, window.innerHeight * 0.2 - 10);
    	ctx.beginPath();
    	ctx.lineTo(-10, 0);
    	ctx.lineTo(5, -80);
    	ctx.lineTo(20, 0);
    	ctx.fill();
    	ctx.restore();
    }
    ctx.fillStyle = '#000';
    ctx.fillText("Sinut on kutsuttu", Math.sin(dt/800) * 40 + 60, window.innerHeight * 0.2 + 40);
    ctx.fillText("SYÖMÄÄN", Math.sin(400 + dt/800) * 40 + 120, window.innerHeight * 0.2 + 80);
    ctx.fillText("isoveljiesi kanssa", Math.sin(250 + dt/800) * 40 + 60, window.innerHeight * 0.2 + 120);


    ctx.restore();
}