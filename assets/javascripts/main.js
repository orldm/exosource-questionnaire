$(document).ready(function() {
    $('.button-start').mousedown(function(e) {
        $(this).css('top', '0').css('background-color', '#FFFFFF');
    });
    $('.button-start').mouseup(function(e) {
        $(this).css('top', '-5px').css('background-color', '#EEEEEE');
        $('#js-progress-bar-container').css('display', 'block');
        $('#page00').addClass('display-none');
        $('#page01').removeClass('display-none');
    });
    $('.vote-item').click(function(e) {
        $(this).siblings().find('span').addClass('hidden');
        $(this).prevAll().find('svg').css('fill', '#98D82A');
        $(this).find('span').css('color', '#98D82A');
        $(this).find('svg').css('fill', '#98D82A');
        var currentPage = '#' + $(this).parents('.main-section').attr('id');
        var nextPage = '#page0' + (parseInt($(this).parents('.main-section').attr('id').slice(-1), 10) + 1);
        setTimeout(function() {
            console.log(currentPage, nextPage);
            $(currentPage).addClass('display-none');
            $(nextPage).removeClass('display-none');
        }, 500);
    });
});