$(document).ready(function() {
    $('.button-start').mousedown(function(e) {
        $(this).css('top', '0').css('background-color', '#FFFFFF');
    });
    $('.button-start').mouseup(function(e) {
        $(this).css('top', '-5px').css('background-color', '#EEEEEE');
        $('#js-progress-bar-container').fadeIn('slow');
        $('#p0').addClass('display-none');
        $('#p1').removeClass('display-none').animate({
            opacity: 1,
            lineHeight: '1.4rem'
        }, 300, gotoSection(1));
    });
    $('#link-next').click(function(e) {
        var pageNumber = $(this).attr('page-number');
        $('#error-section-'+pageNumber).addClass('error-section-open');
    });
    $('.button-report').mousedown(function(e) {
        $(this).css('top', '0');
    });
    $('.button-report').mouseup(function(e) {
        $(this).css('top', '-5px');
    });
    $('.vote-item').click(function(e) {
        var self = this;
        $(self).siblings().find('span').addClass('hidden');
        $(self).prevAll().find('svg').css('fill', '#98D82A');
        $(self).find('span').css('color', '#98D82A');
        $(self).find('svg').css('fill', '#98D82A');
        var currentPageId = '#' + $(self).parents('.main-section').attr('id');
        var previousPageNumber = parseInt($(self).parents('.main-section').attr('id').slice(1), 10);
        var nextPageNumber = previousPageNumber + 1;
        if (previousPageNumber === 1) {
            $('#link-previous').css('pointer-events', 'auto').css('cursor','pointer');
            $('#link-previous p, #link-previous img').css('opacity', '1');
        }
        $('#link-next').attr('page-number', nextPageNumber);
        $('#link-previous').attr('page-number', previousPageNumber);
        $(currentPageId).animate({
            opacity: 0
            }, 300, function(){
                $('.vote-item span').removeClass('hidden').css('color', '#A8A8A9');
                $('.vote-item svg').css('fill', '#A8A8A9');
                $(currentPageId).addClass('display-none').css('line-height', '2rem');
                $('#p'+ nextPageNumber).removeClass('display-none').animate({
                    opacity: 1,
                    lineHeight: '1.4rem'
                }, 300);
        });
        
        $('.progress-question p').html('Question ' + nextPageNumber + '/63');
        $('.progress-bar-main').css('width', (nextPageNumber*(100/63)) + '%');
        setTimeout(function() {
            $('.progress-question p').html('Question ' + nextPageNumber + '/63');
            $('.progress-bar-main').css('width', (nextPageNumber*(100/63)) + '%');
        }, 500);
    });
    $('.button-choose').click(function(e) {
        var currentPageId = '#' + $(this).parents('.main-section').attr('id');
        var previousPageNumber = parseInt($(this).parents('.main-section').attr('id').slice(1), 10);
        var nextPageNumber = previousPageNumber + 1;
        $('#link-next').attr('page-number', nextPageNumber);
        $('#link-previous').attr('page-number', previousPageNumber);
        if (nextPageNumber <= 63) {
            $(currentPageId).animate({
                opacity: 0
                }, 300, function(){
                    $(currentPageId).addClass('display-none').css('line-height', '2rem');
                    // console.log(nextPageNumber);
                    var $nextPage = $('#p'+ nextPageNumber);
                    $nextPage.removeClass('display-none').animate({
                        opacity: 1,
                        lineHeight: '1.4rem'
                    }, 300, function() {
                        if ($nextPage.hasClass('section-page')) {
                            gotoSection(nextPageNumber);
                        }
                    });
                });
            setTimeout(function() {
                $('.progress-question p').html('Question ' + nextPageNumber + '/63');
                $('.progress-bar-main').css('width', (nextPageNumber*(100/63)) + '%');
            }, 500);
        } else {
            $(currentPageId + ', #js-progress-bar-container').fadeOut('slow', function() {
                gotoFinal();
                $('#p64').removeClass('display-none');
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
    $('#link-previous').click(function(e) {
        var previousPageNumber = parseInt($(this).attr('page-number'), 10);
        var currentPageId = '#p' + (previousPageNumber + 1);
        $(currentPageId).animate({
            opacity: 0
        }, 300, function(){
            $(currentPageId).addClass('display-none');
            $(currentPageId).css('line-height', '2rem');
            if (previousPageNumber - 1 === 0) {
                $('#link-previous').css('pointer-events', 'none').css('cursor','default');
                $('#link-previous p, #link-previous img').css('opacity', '0');
            } else {
                $('#link-previous').attr('page-number', previousPageNumber - 1);
            }

            $('#link-next').attr('page-number', previousPageNumber);
            $('.error-section').removeClass('error-section-open');
            
            $('#p'+ previousPageNumber).removeClass('display-none').animate({
                    opacity: 1,
                    lineHeight: '1.4rem'
                }, 300);

            setTimeout(function() {
                $('.progress-question p').html('Question ' + previousPageNumber + '/63');
                $('.progress-bar-main').css('width', (previousPageNumber*(100/63)) + '%');
            }, 500);

        });
    });
    function gotoSection(sectionNumber) {
        var $sectionId = $("#n"+sectionNumber);
        $sectionId.addClass('step-current');
        $sectionId.closest('.progress-meter-section').find('.step-number').addClass('step-current');
        // $sectionId.closest('.progress-meter-section').nextAll().find('.progress-label p.step-number').addClass('step-current');
        $sectionId.siblings('img').removeClass('display-none').addClass('icon-active');
        $sectionId.closest('.progress-meter-section').prevAll().find('.progress-label p.step-current').removeClass('step-current').addClass('step-complete');
        $sectionId.closest('.progress-meter-section').prevAll().find('.progress-label p.check-symbol').removeClass('display-none');
        $sectionId.closest('.progress-meter-section').prevAll().find('.progress-label img').addClass('display-none');
        $sectionId.closest('.progress-meter-section').prevAll().find('.progress-label p.step-number').addClass('display-none');
    };
    function gotoFinal() {
        var $finalSectionPrevAll = $('#final-section').prevAll();
        $finalSectionPrevAll.find('.progress-label p.step-current').removeClass('step-current').addClass('step-complete');
        $finalSectionPrevAll.find('.progress-label p.check-symbol').removeClass('display-none');
        $finalSectionPrevAll.find('.progress-label img').addClass('display-none');
        $finalSectionPrevAll.find('.progress-label p.step-number').addClass('display-none');
        $('#final-section').find('img').removeClass('display-none').addClass('icon-active');
    }
    $('.step-complete').not('.check-symbol').click(function(e) {
        // console.log($(this).attr('id'));    
        $('.step-current').removeClass('step-current');
        $(this).removeClass('step-complete').addClass('step-current').unbind();
        $(this).closest('.progress-meter-section').find('.right-line p').toggleClass('display-none');
        $(this).closest('.progress-meter-section').find('.step-number').addClass('step-current');
        $('.icon-active').removeClass('icon-active').addClass('display-none');
        $(this).siblings('img').removeClass('display-none').addClass('icon-active');
        $(this).closest('.progress-meter-section').nextAll().find('.progress-label p.check-symbol').addClass('display-none');
        $(this).closest('.progress-meter-section').nextAll().find('.progress-label p.step-number').removeClass('display-none');
        $(this).closest('.progress-meter-section').nextAll().find('.progress-label p').removeClass('step-complete').unbind();
    });
});