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
    drawIntroScene(dt, ctx, 20000);
    drawSnowScene(dt, ctx, 28000);
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

function drawSnowScene(dt, ctx, sceneLength) {
    if (dt >= sceneLength) return;
	ctx.save();
    ctx.fillStyle = '#FFF';
    
    ctx.restore();
}