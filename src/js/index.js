function initTab(option){
	var defaultOption = {
		paddingTop: "10px",
		paddingBottom: "10px",
		fontSize: "15px",
		selectTab: {//选中样式（full填满 underline下划线）
			type: "full"
		},
		tab:{
			list:[//选项集合
				{content: '默认选项1',},
				{content: '默认选项2'},
				{content: '默认选项3'},
				{content: '默认选项4'},
				{content: '默认选项5'}
			],
			selectIndex: 0//选中选项索引
		},
		areaList:[//选项对应跳转区域集合
			{selector: '#s1'},
			{selector: '#s2'},
			{selector: '#s3'},
			{selector: '#s4'},
			{selector: '#s5'}
		],
		skipTime: 300  //跳转所需时间
	}
	option = $.extend(defaultOption,option);
	let areaDoms = getAreaDoms(option.areaList)
	let navDom = document.querySelector("#hi-tab")
	let navDomOffsetTop = navDom.offsetTop
	renderTab();
	setDomStyle()
	window.addEventListener('scroll',setDomStyle)
	
	function setDomStyle(){
		if(navDomOffsetTop < (window.scrollY||window.pageYOffset)){
			if(document.body.currentStyle == undefined){
				document.body.style.paddingTop = navDom.offsetHeight + "px"
				navDom.style.position = "fixed"
				navDom.style.top = "0px"
				navDom.style.left = "0px"
			}else{
				document.body.style.setAttribute("padding-top",navDom.offsetHeight + "px")
				navDom.style.setAttribute("position","fixed")
				navDom.style.setAttribute("top","0px")
				navDom.style.setAttribute("left","0px")
			}
		}else{
			if(document.body.currentStyle == undefined){
				document.body.style.paddingTop = "0px"
				navDom.style.position = "relative"
				navDom.style.top = "0px"
				navDom.style.left = "0px"
			}else{
				document.body.style.setAttribute("padding-top","0px")
				navDom.style.setAttribute("position","relative")
				navDom.style.setAttribute("top","0px")
				navDom.style.setAttribute("left","0px")
			}
		}
		areaDoms.forEach(function(value){
			if(value.getBoundingClientRect().top <= navDom.offsetHeight){
				var area = document.querySelector(".hi-select-btn.hi-selected-" + option.selectTab.type)
				var s = document.querySelector("a[href='#" + value.id + "']")
				if(!area) return false
				area.classList.remove("hi-selected-" + option.selectTab.type)
				s.classList.add("hi-selected-" + option.selectTab.type)
			}
		})
	}
	
	//获取菜单对应区域dom
	function getAreaDoms(areaList){
		let list = []
		areaList.forEach(function(value){
			list.push(document.querySelector(value.selector))
		})
		return list
	}
	
	function renderTab(){
		let ulDom = document.createElement("ul")
		
		option.tab.list.forEach(function(value,index){
			let aDom = document.createElement("a")
			aDom.setAttribute("href",option.areaList[index].selector)
			if(document.body.currentStyle == undefined){
				aDom.style.paddingTop = option.paddingTop
				aDom.style.paddingBottom = option.paddingBottom
				aDom.style.fontSize = option.fontSize
			}else{
				aDom.style.setAttribute("padding-top",option.paddingTop)
				aDom.style.setAttribute("padding-bottom",option.paddingBottom)
				aDom.style.setAttribute("font-size",option.fontSize)
			}
			aDom.classList.add("hi-select-btn")
			if(index == option.tab.selectIndex){
				aDom.classList.add("hi-selected-" + option.selectTab.type)
			}
			aDom.innerHTML = value.content
			let liDom = document.createElement("li")
			liDom.appendChild(aDom)
			ulDom.appendChild(liDom)
		})
		navDom.appendChild(ulDom)
	}
			
	$(".hi-select-btn").bind("click touch",function(){
		//根据a标签的href转换为id选择器，获取id元素所处的位置
		$('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top - navDom.offsetHeight)},option.skipTime)
		return false
	});
}
var option = {
	paddingTop: "10px",
	paddingBottom: "10px",
	fontSize: "15px",
	showNum: 5,
	tab:{
		list:[//选项集合
		{content: '返回顶部'},
			{content: '创意主题'},
			{content: '原创设计'},
			{content: '创意家居'},
			{content: '数码宝贝'},
			{content: '美妆爆款'},
			{content: '个性配饰'}
		],
		selectIndex: 0//选中选项索引
	},
	areaList:[//选项对应跳转区域集合
		{selector: '#s7'},
		{selector: '#s1'},
		{selector: '#s2'},
		{selector: '#s3'},
		{selector: '#s4'},
		{selector: '#s5'},
		{selector: '#s6'}
	],
	skipTime: 300  //跳转所需时间
}
initTab(option)
$(document).ready(function () {
    $('.flexslider').flexslider({
        directionNav: true,
        pauseOnAction: false,
        slideshowSpeed: 3000
    });
});