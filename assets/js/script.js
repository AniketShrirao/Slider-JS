/* Author: Aniket*/

// Slider Container
var slider = document.querySelector(".slider");
// Control Buttons
var btns = document.querySelectorAll(".btn");
// Slides/Images
var slides = document.querySelectorAll("figure");
// Carousel Dots
var dots = document.querySelectorAll('.dot');

// carousel utility function
function SliderCarousel(slider,btns,slides,dots) {
	var index = 1;
	var dotIndex = 0;
	var size = slides[index].clientWidth;

	// to Animate the caousel
	setInterval(ChangeDotOnBtn,4000);

// To transition the slides
	function slide() {
		slider.style.transition = "transform .4s ease";
		update();
	}

	// To translate the slides
	function update() {
		slider.style.transform = "translateX("+ (-size * index) +"px)";
		// to make current Carousel dot active
		dots.forEach(function(dot) {
			dot.classList.remove('dot-active');
		});
		dots[dotIndex].classList.add('dot-active');
	}
	update();

	// change the index of carousel dots based on current slide
	function ChangeDotOnBtn() {
		if(this.id === "prev") {
			if(index <= 0) {
				return;
			}
			index--;
			if(dotIndex === 0){
				dotIndex = 4;
			}
			else {
				dotIndex--;
			}
		}
		else {
			if(index === slides.length-1 ) {
				return;
			}
			index++;
			if(dotIndex === 4) {
				dotIndex = 0;
			}
			else {
				dotIndex++;
			}
		}
		slide();
	}

	// get the dots current value from data-attribute
	function dotChange() {
		let i = Number(this.getAttribute('dot-index'));
		dotIndex = i;
		index = i + 1;
		slide();
	}

	// cloning of first and last slide to give slider effect at the end of every transition
	slider.addEventListener('transitionend', function() {
		if(slides[index].parentNode.id === "first") {
			slider.style.transition = "none";
			index = slides.length - 2;
			slider.style.transform = "translateX("+ (-size * index) +"px)";
		}
		else if(slides[index].parentNode.id === "last") {
			slider.style.transition = "none";
			index = 1;
			slider.style.transform = "translateX("+ (-size * index) +"px)";
		}
	})
	// Events assigned to the Control buttons
	btns.forEach( function(btn) {
		btn.addEventListener('click', ChangeDotOnBtn);
		clearInterval(ChangeDotOnBtn);
	});
	// Events assigned to the Carousel dots
	dots.forEach(function(dot) {
		dot.addEventListener('click', dotChange);
	});
}

// carousel utility function called
SliderCarousel(slider,btns,slides,dots);