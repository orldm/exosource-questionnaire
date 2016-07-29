$(document).ready(function() {
    $('.button-start').mousedown(function(e) {
        $(this).css('top', '0').css('background-color', '#FFFFFF');
    });
    $('.button-start').mouseup(function(e) {
        $(this).css('top', '-5px').css('background-color', '#EEEEEE');
        $('#js-progress-bar-container').fadeIn('slow');
        $('#page00').addClass('display-none');
        $('#page01').fadeIn('slow');
    });
    $('.button-report').mousedown(function(e) {
        $(this).css('top', '0');
    });
    $('.button-report').mouseup(function(e) {
        $(this).css('top', '-5px');
    });
    $('.vote-item').click(function(e) {
        $(this).siblings().find('span').addClass('hidden');
        $(this).prevAll().find('svg').css('fill', '#98D82A');
        $(this).find('span').css('color', '#98D82A');
        $(this).find('svg').css('fill', '#98D82A');
        var currentPageId = '#' + $(this).parents('.main-section').attr('id');
        var nextPageNumber = parseInt($(this).parents('.main-section').attr('id').slice(-1), 10) + 1;
        $(currentPageId).fadeOut(function(){
            $('#page0'+ nextPageNumber).fadeIn('slow');
        });
        
        $('.progress-question p').html('Question ' + nextPageNumber + '/5');
        $('.progress-bar-main').css('width', (nextPageNumber*20) + '%');
        setTimeout(function() {
            // $(currentPageId).fadeOut();
            // $('#page0'+ nextPageNumber).fadeIn('slow');
            $('.progress-question p').html('Question ' + nextPageNumber + '/5');
            $('.progress-bar-main').css('width', (nextPageNumber*20) + '%');
        }, 500);
    });
    $('.button-choose').click(function(e) {
        var currentPageId = '#' + $(this).parents('.main-section').attr('id');
        var nextPageNumber = parseInt($(this).parents('.main-section').attr('id').slice(-1), 10) + 1;
        if (nextPageNumber <= 5) {
            $(currentPageId).fadeOut(function(){
                $('#page0'+ nextPageNumber).fadeIn('slow');
            });
            setTimeout(function() {
                // $(currentPageId).addClass('display-none');
                // $('#page0'+ nextPageNumber).removeClass('display-none');
                $('.progress-question p').html('Question ' + nextPageNumber + '/5');
                $('.progress-bar-main').css('width', (nextPageNumber*20) + '%');
            }, 500);
        } else {
            $(currentPageId + ', #js-progress-bar-container').fadeOut('slow', function() {
                $('#page06').removeClass('display-none');
                setTimeout(function() {
                    $("#report-container").animate({
                        top: '68px'
                    }, 1000, function () {
                        $('.button-report-wrapper').fadeIn('slow');
                    });
                }, 1000);
            });
        }
    });
});