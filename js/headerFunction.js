$(function(){
    var navMenu = $('.nav_left>ul>li:not(:first-child)');
    var navContent = $('.entry_content');
    var icons = $('.nav_right_icons');
    var subMenus = $('.sub_menu');

    navMenu.mouseover(function() {
        clear(navContent);
        var menu = $(this).find('a').attr('data');
        var id = menu+"-menu";
        addHoveredClass($(this));
        $('#'+id).slideDown(300);
    });

    navContent.mouseover(function() {
        addHoveredClass($(this));
    });

    icons.mouseover(function() {
        clear($(this).siblings().find('div.sub_menu'));
        addHoveredClass($(this));
        $(this).find('div.sub_menu').slideDown(300);
    });

    subMenus.mouseover(function() {
         addHoveredClass($(this));
    });

    navMenu.mouseout(hideDivLeft);
    navContent.mouseout(hideDivLeft);
    icons.mouseout(hideDivRight);
    subMenus.mouseout(hideDivRight);

    function hideDivRight() {
        $(this).removeClass('hovered');
        setTimeout(function(){
            if(!icons.hasClass('hovered') && !subMenus.hasClass('hovered')) {
                clear(subMenus);
            }    
        }, 100);
    }

     function hideDivLeft() {
        $(this).removeClass('hovered');
        setTimeout(function(){
            if(!navMenu.hasClass('hovered') && !navContent.hasClass('hovered')) {
                clear(navContent);
            }
        }, 100);
    }

    function clear(obj) {
        $(obj).hide();
    }

     function addHoveredClass(obj) {
        $(obj).addClass('hovered');
    }

    $(".search_click").click(function(event) {
        event.preventDefault();
        $(this).css("display", "none");
        $(".search_click2").css("display", "block");

        $("#searchBar").animate({
            width: 'toggle'
        }, 500, function() {
            // animation complete
        });
    });

});


$(function(){

    total_like();
    total_buy();


    $(".fa-bars").click(function(event){
        event.preventDefault();
        $(".rwd_wrap").slideToggle("2000");
    });

    // $(".links").mouseover(function(event){
    //     event.preventDefault();
    //     // $(".rwd_wrap").slideToggle("2500");
    //     console.log($(this).attr("id"));
    // });

    $(".member_button").click(function(event){
        event.preventDefault();
        $(".member_nav").toggleClass("show");
    });

       $(".links").click(function(event){
       event.preventDefault();

       $(this).toggleClass("clicked");
//        $(this).parents("li").find("a").removeClass('clicked');
   });


        $(document).on('click', '.product_idx_delete', function(){
            // alert('clicked');

            var sid = $(this).attr('data-sid');
            var size = $(this).attr('data-size');

            $.get("add_to_cart.php", {product_sid: sid, size:size}, function () {

                total_buy();
            });


        });





});





