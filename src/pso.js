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
        this.w = options.w;
        this.c1 = options.c1;
        this.c2 = options.c2;
        this.dim = options.dim;


        this.bestPosition = new Array(this.dim);
        this.fitness = -Infinity;  //每次迭代的适应度
        this.pbest = -Infinity; //每次迭代的最优适应度

       
    }

    //粒子的原型设置
    Particle.prototype = {
        storePosition: function () {
			this.bestPosition = this.position.slice(0);
		},

        getPosition: function () {
			return this.position.slice(0);
		},
        /**
         * desc:更新粒子速度
         */
        updateVelocity: function(gbest){
            this.velocity.forEach(function(eachPos,index){
                let inertia = this.velocity[index] * this._w;
                let socialInfluence = (gbest.position[index] - eachPos) * this._c1 * Math.random();
                let selfInfluence = (this.bestPosition[index] - eachPos)* this._c2 * Math.random();
                this.velocity[index] = inertia + socialInfluence + selfInfluence;
            },this);
        },

        /**
         * desc:更新粒子位置
         */
        updatePosition: function(){
            this.position.forEach(function(eachPos,index){
                this.position[index] += eachPos;
            },this);
        }
	};
    
    /**
     * desc:随机产生粒子
     * @param {*粒子所在的区域限制} area 
     * @param {*粒子的一些参数} options 
     */
    Particle.createOfRandom = function(area,options){
        var position = area.map(function(interval){
            return interval.start + (Math.random()*(interval.end - interval.start));
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
    function Interval(start,end){
        this.start = start;
        this.end = end;
    }
    
    /**
     * 粒子优化的构造函数
     */
    function Optimizer(){
        this._particles = null; //初始粒子
        this._fitnessFunction = null; //适应度函数
        this._gbest = -Infinity; //每次迭代的全局最优值
        this._positionBest = null; //适应度函数
        this._options = {  //优化时的一些参数
            c1:1.49445,  //加速因子
            c2:1.49445,
            w:0.9, //惯性系数
            maxGen:200, //种群最大迭代次数
            popSize:40  //种群大小
        }
    }

    Optimizer.prototype = {
        setOptions: function(options){
            this._options.c1 = options.c1 ? options.c1 : this._options.c1;
            this._options.c2 = options.c2 ? options.c2 : this._options.c2;
            this._options.w = options.w ? options.w : this._options.w;
            this._options.maxGen = options.maxGen ? options.maxGen : this._options.maxGen;
            this._options.popSize = options.popSize ? options.popSize : this._options.popSize;
        },

        //初始化函数
        init:function(popSize,genOptions){
            var generator = genOptions instanceof Function ? 
                genOptions : 
                function(){
                    return Particle.createOfRandom(genOptions,this._options);
                }.bind(this);
            
               this._fitness = -Infinity;
               this._gbest = null;

               this._particles = [];
               for(var i = 0; i < pppSize; i++ ){
                   this._particles.push(generator())
               }
        },

        //设置适应度函数
        setFitnessFunction:function(func){
            this._fitnessFunction = func;
        },
        
        //每一次的迭代函数
        step: function(){
            this._particles.forEach(function(particle){
                particle._fitness = this._fitnessFunction(particle.position);
            },this);
            this.completeStep();
        },

        //迭代完成
        completeStep:function(){
            this._particles.forEach(function(particle){
                if(particle.fitness > particle.pbest){
                    particle.pbest = particle.fitness;
                    particle.storePosition();
                }
                if(particle.pbest > this._gbest){
                    this._gbest = particle.pbest;
                    this._positionBest = particle.getPosition();
                }
            },this);

            //更新速度信息
            this._particles.forEach(function(particle,index){
                particle.updateVelocity(this._gbest);
            },this);

            //更新位置信息
            this._particles.forEach(function(particle){
                particle.updatePosition();
            })
        }
    }   
 
    
    if (typeof define === 'function' && define.amd) {
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