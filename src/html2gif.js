function Html2Gif(element, options) {
  if (!(this instanceof arguments.callee)) {
    throw Error('Constructor called as a function. Useage: new Html2Gif(element, options)');
  }
  var self = this;

  var bb = new Blob([workerSrc]);
  var workerUrl = window.URL.createObjectURL(bb);
  self.worker = new Worker(workerUrl);
  options = options || {};
  options.width = options.width || 320;
  options.height = options.height || 240;
  options.gifDelay = options.gifDelay || 200;
  options.quality = options.quality || 10;
  self.options = options;

  self.worker.postMessage({
    cmd: 'init',
    width: options.width,
    height: options.height,
    delay: options.gifDelay,
    quality: options.quality
  });

  self.worker.addEventListener('message', function(event) {
    var dataBase64 = btoa(event.data);
    var dataUrl = 'data:image/gif;base64,' + dataBase64;
    if (typeof self.oncomplete === 'function') {
      self.oncomplete(dataUrl);
    }
  }, false);
};

Html2Gif.prototype.start = function(delay, count) {
  var self = this;

  if (delay > 0 && count > 0) {
    self.timer = setInterval(function() {
      self.snap();

      count--;
      if (count === 0) {
        self.end();
      }
    }, delay);
  }
};

Html2Gif.prototype.snap = function() {
  var self = this;
  html2canvas(document.body, {
    onrendered: function(canvas) {
      var ctx = canvas.getContext('2d');
      self.worker.postMessage(ctx.getImageData(0, 0, self.options.width, self.options.height).data);
    },
    width: self.options.width,
    height: self.options.height
  });
};

Html2Gif.prototype.end = function() {
  clearInterval(this.timer);
  this.worker.postMessage({
    cmd: 'end'
  });
};