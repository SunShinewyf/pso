/**
 * date:2017-05-25
 * author:恬竹
 * desc:the constructor of pso
 */

/**
 * @param maxGen number 最大迭代代数
 * @param popSize number 种群初始大小
 * @param vMax number 种群最大速度限制
 * @param vMin number 种群最小速度限制
 * @param dim number 维数限制
 * @param w number 权重系数
 */
(function(){
   'use strict';
   //定义构造函数
   function Pso(maxGen,popSize,vMax,vMin,dim,w){
        this.maxGen = maxGen || 300;
        this.popSize = popSize || 40;
        this.vMax = vMax || 0.5;
        this.vMin = vMin || -0.5;
        this.dim = dim || 2;
        this.w = w || 0.9;
        this.initPosition = new Array(popSize); //种群的初始位置
        this.pbest = new Array(popSize);  //种群自身的最优值
        this.gbest = new Array(popSize); //种群的全局最优值
    
   }
   //定义原型
   Pso.prototype = {
       storePosition: function () {
           this.position = this.position.slice(0);
       },
       getPosition: function () {
           return this.initPosition.slice(0);
       },
       getPosition: function(){
            return this.gbest.slice(0);
       },
   };
   
   //初始化函数
   Pso.init = function(){

   }


   //导出Pso对象
   	if (typeof define === 'function' && define.amd) {
		// + with *RequireJS*
		define('Pso', function () { return Pso; });
	} else {
		if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
			// + from a *WebWorker*
			self.Pso = Pso;
		} else if (typeof module !== 'undefined' && module.exports) {
			// + in *node*
			module.exports = Pso;
		} else {
			// + or in a plain browser environment
			window.Pso = Pso;
		}
	}
})();