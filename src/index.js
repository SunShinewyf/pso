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

    //更新粒子群算法中的参数
    function updateParameters(){
        maxGen = parseInt(document.getElementById('maxGen').value);
        size = parseInt(document.getElementById('size').value);

        var c1 = parseFloat(document.getElementById('c1').value);
        var c2 = parseFloat(document.getElementById('c2').value);
        var w = parseFloat(document.getElementById('w').value);

        optimizer.setOptions({
            c1:c1,
            c2:c2,
            w:2,
            maxGen:maxGen,
            size:size
        });
    }
    function setup(){
        canvas = document.getElementById('canvaspso');
        con2d = canvas.getContext('2d');

        document.getElementById('optimize').addEventListener('click',start);
        document.getElementById('stop').addEventListener('click',stop);
        document.getElementById('reset').addEventListener('click',reset);
    }

    setup();
})()