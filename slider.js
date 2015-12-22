function Slider(options) {

    this.options = {
        selector: '#slider',
        slide: '.slider-item',
        duration: 4000,
        active: 'active',
        prev: '.nav-prev',
        next: '.nav-next'
    };

    if (options && typeof options == 'object') {
        for (var prop in options) {
            this.optinos[prop] = options[prop];
        }
    }

    this.idx = 0;
    this.el = document.getElementById(this.options.selector.substr(1));
    this.slides = this.el.querySelectorAll(this.options.slide);
    this.slidesCount = this.slides.length;
    this.current = this.slides[this.idx];
    this.interval = null;

}

Slider.prototype.next = function(callback) {
    this.slides[this.idx++].classList.remove(this.options.active);
    this.idx = this.idx >= this.slidesCount ? 0 : this.idx;
    this.clear();
    this.run(callback);
}

Slider.prototype.prev = function(callback) {
    this.slides[this.idx--].classList.remove(this.options.active);
    this.idx = this.idx < 0 ? this.slidesCount - 1 : this.idx;
    this.clear();
    this.run(callback);
}

Slider.prototype.run = function(callback) {
    this.slides[this.idx].classList.add('active');
    var self = this;
    this.interval = setInterval(function() {
        self.slides[self.idx].classList.remove(self.options.active);
        if (self.idx >= self.slidesCount) {
            self.idx = self.slidesCount;
        }
        if (self.idx < 0 || ++self.idx == self.slidesCount) {
            self.idx = 0;
        }
        self.slides[self.idx].classList.add(self.options.active);
    }, self.options.duration);
    setTimeout(callback, 1000);
}

Slider.prototype.clear = function() {
    clearInterval(this.interval);
}
