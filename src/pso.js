/**
 * date:2017-05-25
 * author:恬竹
 * desc:the constructor of pso
 */

(function(){
   'use strict';
    /**
     * desc:粒子的构造函数
     * @param {*粒子的位置} position 
     * @param {*粒子的速度} velocity
     * @param {*粒子的一些参数} options 
     */
    function Particle(position,velocity,options){
        this.position = position;
        this.velocity = velocity;
        this.popSize = options.popSize || 200;
        this.bestPosition = new Array(this.popSize);
    }

    //粒子的原型设置
    Particle.prototype = {
		storePosition: function () {
			this.bestPosition = this.position.slice(0);
		},

		getPosition: function () {
			return this.position.slice(0);
		},

		getBestPosition: function () {
			return this.bestPosition.slice(0);
		},
        
        /**
         * desc:更新粒子速度
         */
        updateVelocity: function(){

        },

        /**
         * desc:更新粒子位置
         */
        updatePosition: function(){

        }
	};
    
    /**
     * desc:随机产生粒子
     * @param {*粒子所在的区域限制} area 
     * @param {*粒子的一些参数} options 
     */
    Particle.createOfRandom = function(area,options){
        var position = area.map(function(interval){
            return Math.random()*(interval.end - interval.start);
        })

        var velocity = area.map(function(interval){
            return Math.random()*(interval.end - interval.start);
        })

       return new Particle(position,velocity,options);
    }

    /**
     * desc:粒子的位置构造函数
     * @param {*开始位置} start 
     * @param {*结束位置} end 
     */
    function interval(start,end){
        this.start = start;
        this.end = end;
    }
    
    /**
     * 粒子优化的构造函数
     */
    function Optimizer(){
        
    }

    if (typeof define === 'function' && define.amd) {
		// + with *RequireJS*
		define('pso/Interval', function () { return Interval; });
		define('pso/Particle', function () { return Particle; });
		define('pso/Optimizer', function () { return Optimizer; });
	} else {
		var pso = {
			Interval: Interval,
			Particle: Particle,
			Optimizer: Optimizer
		};
		if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
			// + from a *WebWorker*
			self.pso = pso;
		} else if (typeof module !== 'undefined' && module.exports) {
			// + in *node*
			module.exports = pso;
		} else {
			// + or in a plain browser environment
			window.pso = pso;
		}
	}
})();