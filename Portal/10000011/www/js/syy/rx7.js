/**
 * @author yang zhenn
 */
define(function(require,exports){
	var Tool = require('../base/tool'), 	//引入算法库
		Layout = require('../base/layout'),  //引入布局模块
		Ball = require('../base/ball'); //引入选号盘模块
		
	var collectionConfig = function(){
		return {
			lines: 1,
			key: 'syy_rx7',
			localStorage: new Store('syyrx7ball'),
			deviation: -1,
			/**
			 * 验证是否符合此玩法的选号规则
			 * @memberOf BallCollection
			 * @return string or true
			 */
			verify: function(){
				var b = this.fetchSelectNum(0);
				if(b < 7){
					return '至少选择7个号码';	
				}
				return true;
			},
			/**
			 * 获取投注字符串数组
			 * @param void
			 * @memberOf BallCollection
			 * @return result,如：{
			 * 						key:'ssq_common', //玩法对应key值
			 * 						value:{
			 * 							l1: ['01','02','03','04','05','06'],
			 * 							l2: ['01','02']
			 * 						},
			 * 						bet: 2,	//注数,
			 * 					}
			 * @type object
			 */
			getBetArray: function(){
				var self = this,
					r = [],
					selectArray = this.getSelectArray();
				return {
					key: self.key,
					value: {
						l1: selectArray[0]
					},
					bet: Tool.numC(selectArray[0].length,7),
					betstr: self.getBetString(selectArray[0].join(' ')),
					manualFirst: true
				};
			},
			/**
			 * 获得投注字符串，用于提交订单
			 * @memberOf 
			 * @name getBetString
			 * @return 
			 */
			getBetString: function(n){
				/**
				 * 0 -> 直选
				 * 1 -> 组三
				 * 2 -> 组六
				 */
				return n + ':107';
			}
		};
	};
	
	var appConfig = function(isManualFirst,collection){
		return {
			el: '#syy_rx7',
			collection: collection,
			noRepeat: false,
			manualFirst: isManualFirst,
			random: function(){
				var self = this;
				self.collection.clear();
				var l1 = Tool.baseBallRandom(7,11,false,true,'ceil').sort();
				_.each(l1,function(n){
					self.collection.syncData(true,[{line:0,val:n}]);
				});
			}
		};
	};

	return {
		initialize: function(isManualFirst){
			Layout.doAbacusScroll().doTypeListScroll(-280);
			C.syyrx7ballcollection = new Ball.Collection(collectionConfig());
			Tool.detectLocalData('syyrx7ball',C.syyrx7ballcollection);
			C.syyrx7ballapp = new Ball.App(appConfig(isManualFirst,C.syyrx7ballcollection));
		}
		
	};
});