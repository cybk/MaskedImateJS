$.fn.MaskedImage = function (options) {
    var defaults = {
        container: $(this).attr('id'),
        imgPath: '',
        positions: [],
        width: '',
        height: '',
        maskedFillColor: 'rgba(65,105,225,0.5)',
        strokeColor: 'black',
        strokeWidth: 1,
        indicatorsColor: 'green'
    };
    var idCirc = 0;
    var opts = $.extend({}, defaults, options);
    var img = new Image();
    img.onload = function () {
        var filteredYoda = new Kinetic.Image({
            x: 0,
            y: 0,
            image: img,
            width: opts.width,
            height: opts.height
        });

        var stage = new Kinetic.Stage({
            container: opts.container,
            width: opts.width,
            height: opts.height
        });

        var poly = new Kinetic.Polygon({
            points: opts.positions,
            fill: opts.maskedFillColor,
            stroke: opts.strokeColor,
            strokeWidth: 1

        });

        var layer = new Kinetic.Layer();
        layer.add(filteredYoda);
        var groupk = new Kinetic.Group({
            draggable: true
        });
        var play = new Kinetic.Layer();
        groupk.add(poly);
        $.each(opts.positions, function (index, element) {
            var circ = new Kinetic.Circle({
                x: element.x,
                y: element.y,
                radius: 5,
                fill: opts.indicatorsColor,
                stroke: opts.strokeColor,
                strokeWidth: 1,
                draggable: true,
                name: idCirc
            });
            
            idCirc += 1;
            
            circ.on('mouseover', function () {
                document.body.style.cursor = 'pointer';
            });

            circ.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });
            circ.on('mousedown', function() {
            });
            circ.on('dragmove', function (e) {
                if (groupk) {
                    var positions = poly.getPoints();
                    var pos = e.shape.attrs.name;
                    positions[pos].x = e.shape.attrs.x;
                    positions[pos].y = e.shape.attrs.y;

                    poly.setPoints(positions);
                    groupk.moveToTop();
                    play.draw();
                    stage.draw();
                }

            });
            groupk.add(circ);
        });


        layer.add(groupk);
        stage.add(layer);
    };

    img.src = opts.imgPath;
    
    return {
    };
};