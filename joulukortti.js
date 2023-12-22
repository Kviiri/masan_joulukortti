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

    drawIntroScene(dt, ctx, 12000);
    drawSnowScene(dt, ctx, 12000, 18000);
    drawLandScape(dt, ctx, 18000);
}

function drawIntroScene(dt, ctx, sceneLength) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    if (dt >= sceneLength) return;
    ctx.save();
    ctx.fillStyle = '#FFF';
    let festive_str = 'Hyvää joulua Masa! Hyvää joulua Masa! Hyvää joulua Masa! Hyvää joulua Masa! ';
    for (let i = 0; i < 14; i++) {
        for (let spos = 0; spos < festive_str.length; spos++) {
            let fadeout = (sceneLength-dt)/4000;
            let shine = Math.sin(-i*8 + spos*0.1 + dt/200);
            ctx.fillStyle = `rgba(
                255,
                ${215-shine*215 + 40},
                ${215-shine*215 + 40},
                ${Math.min(fadeout, 1) * (shine/2 + 0.6)}
            )
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
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
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

function drawLandScape(dt, ctx, sceneStart) {
    if (dt < sceneStart) return;
    let shading = Math.min((dt - sceneStart - 2000) / 4000, 1);

    ctx.fillStyle = `rgba(
      ${38 * shading},
      ${18 * shading},
      ${80 * shading},
    1)`
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.save();


    //morning gradient
    const sun = ctx.createRadialGradient (
        window.innerWidth * 0.5,
        window.innerHeight * 0.2,
        10 * Math.min((dt - sceneStart) / 3000, 1),
        window.innerWidth * 0.5,
        window.innerHeight * 0.2,
        80 * Math.min((dt - sceneStart) / 3000, 1),
    );
    sun.addColorStop(0, 'rgba(240, 210, 20, 0.9');
    sun.addColorStop(1, 'rgba(240, 210, 20, 0.01');
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, window.innerWidth, window.innerWidth);

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
    for (let i = 0; i < 16; i++) {
    	//ctx.fillStyle='#B99';
        ctx.fillStyle = `rgba(
          ${176 * shading},
          ${144 * shading},
          ${144 * shading},
          1
        )`;
    	ctx.fillRect(
    		40 - (dt/4) % 40 + 40*i,
    		window.innerHeight * 0.2 - 10,
    		10,
    		10
    	);
    	//ctx.fillStyle='#2A1'
        ctx.fillStyle = `rgba(
          ${32 * shading},
          ${160 * shading},
          ${16 * shading},
          1
        )`;
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
    
    ctx.font = "32px verdana";

    let restaurantScroller = 'VLTAVA – CELLA – KUUKUU – ';
    let restaurantScrollerRev = restaurantScroller.split("").reverse().join("");
    console.log(restaurantScrollerRev);
    let cycleLength = 200;
    for (let i = 0; i < 16; i++) {
        ctx.save();
        let startPoint = ~~(dt/cycleLength);
        ctx.fillText(
          restaurantScroller[(startPoint + i)%restaurantScroller.length],
          i * 32 - (dt % cycleLength)/cycleLength * 32,
          window.innerHeight * 0.2 + 320
        );
        ctx.fillText(
          restaurantScrollerRev[(startPoint + i + 8)%restaurantScrollerRev.length],
          window.innerWidth - (i * 32) + (dt % cycleLength)/cycleLength * 32,
          window.innerHeight * 0.2 + 360
        );
        ctx.fillText(
          restaurantScroller[(startPoint + i + 16)%restaurantScroller.length],
          i * 32 - (dt % cycleLength)/cycleLength * 32,
          window.innerHeight * 0.2 + 400
        );
        ctx.restore();
    }
    ctx.font = ('16px monospace');
    ctx.fillText("Valitse paikka ja aika;", 8, window.innerHeight - 64);
    ctx.fillText("me maksamme viulut!", 8, window.innerHeight - 48);
    ctx.fillText("t. Isoveljesi Ville & Kalle!", 8, window.innerHeight - 32);

    ctx.restore();
}