class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx
        this.w = w
        this.h = h
        this.posX = 0
        this.posY = 0
        this.image = new Image()
        this.image.src = "img/Desert.png"
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.w, this.h)
        /*image.onload = function(){
            scaleToFit(this);
        }
        function scaleToFit(img){
            // get the scale
            var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            // get the top left position of the image
            var x = (canvas.width / 2) - (img.width / 2) * scale;
            var y = (canvas.height / 2) - (img.height / 2) * scale;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }*/
    }
}


