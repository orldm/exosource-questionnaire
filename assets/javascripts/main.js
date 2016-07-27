$(document).ready(function() {
    $('#main-section').load('/assets/templates/page01.html', function(){
        $('.button-start').mousedown(function(e) {
            $(this).css('top', '0').css('background-color', '#FFFFFF');
        });
        $('.button-start').mouseup(function(e) {
            $(this).css('top', '-5px').css('background-color', '#EEEEEE');
            $('#js-progress-bar-container').css('display', 'block');
            $('#main-section').load('/assets/templates/page02.html');
        });
    });

    // var mainSection = $('#page01').html();
    // console.log(mainSection);
    
    // $('.js-anchor').click(function(e) {
    //     e.preventDefault();
    //     $('.navbar-collapse').removeClass('in');
    //     $('.navbar-header').removeClass('background-dark')
    //     $('html, body').animate({
    //         scrollTop: $( $(this).attr('href') ).offset().top
    //     }, 500);
    // });
});