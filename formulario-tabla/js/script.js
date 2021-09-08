jQuery(document).ready(function($){

    $('body').on('click','.aj_thumbsup',function(event){
        event.preventDefault(); // stop click from refreshing page
        
        var OBJ = $(this);
        
        if(OBJ.hasClass('recorded')) return; // stop multiple submissions
        
        var id = $(this).data('id'); // get post ID
        var data_arg = {};
        data_arg['id'] = id;
        data_arg['action'] = 'aj_like_post'; // ajax hook name
    
        $.ajax({
            beforeSend: function(){},
            type: 'POST',
            url:the_ajax_script.ajaxurl, // Must be updated if adding this to existing
            data: data_arg,dataType:'json',
            success:function(data){
                OBJ.siblings('span').html( data.new_count); // populate with new new_count
                OBJ.addClass('recorded') // mark as thumbsup recorded
                OBJ.find('i').removeClass('far').addClass('fas'); // make thumbs up icon solid
            }
        });
    });
    });