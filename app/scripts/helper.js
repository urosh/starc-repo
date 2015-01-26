/*(function(){
	console.log('ok we are good');
	var btn = document.querySelector('.menu-btn');
	console.log(btn);
	var menu = document.querySelector('.side-menu');
	var content = document.querySelector('.content');
	var menuTitle = document.querySelector('.menu-title');

	function menuClickHandler() {
		classie.toggleClass(btn, 'active');
		classie.toggleClass(menu, 'active');
		classie.toggleClass(content, 'menu-active');
		classie.toggleClass(menuTitle, 'active');
			
	}


	if ("ontouchstart" in document.documentElement) {
		btn.addEventListener('touchstart', menuClickHandler, false);
	}else{
		btn.addEventListener('click', menuClickHandler);
	}


})()*/