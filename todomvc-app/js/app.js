(function (window, Vue, undefined) {
	// let link = [{
	// 		id: 1,
	// 		active: 'ha',
	// 		onready: true
	// 	}
	// ]
	let vm = new Vue({
		el: '#app',
		data: {
			dataList: JSON.parse(window.localStorage.getItem('dataList')) || [],
			newList: ''
		},
		// watch是vue中的一个方法，可以用于就监控数据的变动，因此可以用来响应数据的变化
		// handler：是wacth中的一个方法，用于指出在wacht中具体要做什么的方法，不写也可以，因为watch默认是handler，就算没有写，在解析时，会自动解析成handler
		watch: {
			// 注意：当需要使用this时在watch方法不要使用箭头函数，因为使用箭头函数会导致this指向vue实例，使得找不到数据更新的对象，即this.updateAutocomplete将是undefined
			dataList: {
				handler(newArr, oldArr) {
					window.localStorage.setItem('dataList', JSON.stringify(newArr))
				},
				// 深度监听
				// deep时watch中的一个对象，表示进行深度监听，因为浅城的监听只能监听表层的变化，例如一个数组总有多个元素，而这些元素是对象，若是这些对象的中的成员发生变化，浅层的监听无法获取改变的值（有点类似域深拷贝和浅拷贝的区别）
				// 若是要使用 watch中的方法，必须要配合handler使用
				deep: true
			}
			// 因此这下面种写法也是可以的                
			// dataList(newArr, oldArr) {
			// 	window.localStorage.setItem('dataList', JSON.stringify(newArr))
			// }
		},
		methods: {
			delData(index) {
				this.dataList.forEach((ele, ind) => {
					if (index === ele.id) {
						this.dataList.splice(ind, 1)
					}
				});
			},
			add() {
				if (!this.newList.trim()) {
					return
				}
				this.dataList.push({
					active: this.newList.trim(),
					onready: false,
					// 若是dataList存在数据，那么先按照id排序，之后将最后一位的id加上1，就是新添加的数据的id
					// sort是数组中可以进行排序的方法，若是使用(b-a),则为倒序
					// "对象[]"是对象的取值方式之一，在[]中添加要取出的成员名，也可以是一个变量，只能使用这种方式是因为：这个数据是动态添加的，只能使用这种方式，使用“.”的方式，无法获取
					id: this.dataList.length ? this.dataList.sort((a, b) => a.id - b.id)[this.dataList.length - 1]['id'] + 1 : 1
				})
				this.newList = ''
			},
			delAll() {
				this.dataList = this.dataList.filter(item => !item.onready)
			}
		},
		// 计算属性
		computed: {
			activeNum() {
				// filter是数组中的方法，用于在回调函数指定的条件下判断遍历数组，仅返回符合条件的元素而返回的元素将组成一个新的数组
				// 下面这行代码的意思为：遍历dataLIst数组，仅返回属性值onready为false的元素，将新数组的长度返回
				return this.dataList.filter(item => !item.onready).length
      },
      // 全选和反选切换
			toggleAll: {
        // get和set是vue的计算属性，计算属性使用来存储数据的，其特点是是：1.数据可以进行逻辑处理操作；2.对计算属性中的数据进行监视。
        // 计算属性和普通属性的区别；1.计算属性是基于它的依赖进行更新的，只有在相关依赖发生改变时才能更新变化；2.计算属性是缓存的，只有相关依赖没有改变，多次访问计算属性得到的值是之前缓存计算属性的结果，不会多次执行
        // get和set的区别
        // 1.计算属性由两部分组成，get和set，分别来获取计算属性和设置计算属性；2.默认只有get，如果需要set，需要自己添加
				get() {
          // get使用时必须要有return，而set不需要
					return this.dataList.every(item => item.onready)
				},
				set(val) {
					this.dataList.forEach(item => (item.onready = val))
				}
			}
		},
		// 自定义vue属性，获取焦点
		directives: {
			focus: {
				inserted(el) {
					el.focus()
				}
			}
		}
	})

})(window, Vue);
