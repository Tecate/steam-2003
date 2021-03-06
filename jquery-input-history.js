(function($) {
    var storage;
    storage = localStorage || {};
    return $.widget('ngn.inputHistory', {
        _create: function() {
            var s, _this = this;
            this.storageKey = 'inputHistory.' + this.element.attr('id');
            this.h0 = (s = storage[this.storageKey]) ? s.split(',') : [];
            this.h = this.h0.concat(['']);
            this.i = this.h0.length;
            return this.element.keydown(function(event) {
                switch (event.which) {
                    case 13:
                        return _this.enter();
                    case 38:
                        return _this.up();
                    case 40:
                        return _this.down();
                }
            });
        },
        up: function() {
            if (this.i > 0) {
                this.h[this.i--] = this.element.val();
                this.element.val(this.h[this.i]);
            }
            this._trigger('up');
            return false;
        },
        down: function() {
            if (this.i < this.h0.length) {
                this.h[this.i++] = this.element.val();
                this.element.val(this.h[this.i]);
            }
            this._trigger('down');
            return false;
        },
        enter: function() {
            var v;
            this._trigger('enter');
            if (this.i < this.h0.length) {
                this.h[this.i] = this.h0[this.i];
            }
            v = this.element.val();
            if (this.i >= 0 && this.i >= this.h0.length - 1 && this.h0[this.h0.length - 1] === v) {
                this.h[this.h0.length] = '';
            } else {
                this.h[this.h0.length] = v;
                this.h.push('');
                this.h0.push(v);
                storage[this.storageKey] = this.h0.join();
            }
            this.i = this.h0.length;
            this.element.val('');
            return false;
        }
    });
})(jQuery);
