$(document).ready(function(){

    $('#image').css('background-image', 'url(images/blooming-t.jpg)');  //Show initial big image
    // $('#image2').css('background-image', 'url(images/blooming-t.jpg)');  //Show initial big image
    $('#style1').click(function(e){                                     //On tumbnail click open big version of tumbnail
        $('#image').css('background-image', 'url(' + $(e.target).attr('src').replace('tumb', 't') + ')').css({'background-repeat': 'no-repeat', 'background-position' : 'center', 'background-position' : '50% 50%'})
        $('#myimage').attr('src', $(e.target).attr('src').replace('tumb', 'd'));    //Place image on click for second example
        imageZoom("myimage", "myresult");       //Run second example after updating image
    });

    //Hover big image to zoom in
    $('#image').hover(function(){
        $('#image').css('backgroundSize', 400 +'%');                    //Resize big image to 400%
        $(this).mousemove(function(e){                                  //Action on mouse move over the big image
            let _mouseX = e.clientX;                                    //Capture mouse coordinate over big image
            let _mouseY = e.clientY;
            let coordinates = _mouseX * 0.2 + '%'+ _mouseY * 0.2 + '%'; //Calculate x and y of image
            $('#image').css('backgroundPosition', coordinates);         //Update image backgroud position
        });
    }, function(){                                                      //Function mouse out of image
        $('#image').css('backgroundSize', 'cover');                     //Restore image scalling
    });
    
    imageZoom("myimage", "myresult");
});

// document.addEventListener("DOMContentLoaded", function(){
//     console.log('loaded');
// } );


// Copy - paste from 3wschool
function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    console.log(result);
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy + 40) + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
        if (y < 0) {y = 0;}
        /*set the position of the lens:*/
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
}
