/**
 * date:2017-06-02
 * author:恬竹
 * desc:the js of app
 */
(function(){
    'use strict';
    var canvas,con2d;
    var optimizer = new pso.Optimizer();
    var iteration = 0;
    var c1,c2,w,maxGen,size;
    var fitnessFunction = null;
    var domain = new pso.Interval(-5.12,5.12);
    var particles = [];
    
    //优化函数
    function start(){
        console.log('start');
    }
    //结束函数
    function stop(){
        console.log('stop');
    }

    //重置函数
    function reset(){
        console.log('reset');
    }

    //更新粒子位置
    function updateParticles(){
        var ax = (domain.end - domain.start) / size;
        for(var i=0,x=domain.start;i<=size;i++,x+=ax){
            particles[i] = fitnessFunction([x]);
        }
    }

    //更新函数
    function updateFunction(){
        stop();
        updateParticles();
        drawFunction();
    }
    //画图函数
    function drawFunction(){
        var cy = canvas.height / 2;
        var ax = canvas.width / (size-1);

        con2d.fillStyle = '#FFF';
        con2d.fillRect(0,0,canvas.width,canvas.height);

        con2d.strokeStyle = '#555';
        con2d.lineWidth = 1.5;

        con2d.beginPath();
        for(var i = 0,x = ax ; i < particles.length ; i++ , x += ax){
            drawLine(
                x - ax,cy - particles[i-1] * ax,
                x, cy - particles[i] * ax
            );
        }
        con2d.stroke();
    }
    //更新粒子群算法中的参数
    function updateParameters(){
        maxGen = parseInt(document.getElementById('maxGen').value);
        size = parseInt(document.getElementById('size').value);

        c1 = parseFloat(document.getElementById('c1').value);
        c2 = parseFloat(document.getElementById('c2').value);
        w = parseFloat(document.getElementById('w').value);

        optimizer.setOptions({
            c1:c1,
            c2:c2,
            w:2,
            maxGen:maxGen,
            size:size
        });
    }
    function setup(){
        canvas = document.getElementById('canvasPos');
        con2d = canvas.getContext('2d');

        document.getElementById('optimize').addEventListener('click',start);
        document.getElementById('stop').addEventListener('click',stop);
        document.getElementById('reset').addEventListener('click',reset);
        
        updateFunction();
    }

    setup();
})()