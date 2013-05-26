$(document).ready(function() {
  var page_num = 1;
  var shots_per_load = 9;

  function render(shots){
    for (var i in shots){
      var image = $('<div></div>')
                   .append($('<img></img>')
                   .addClass("resize")
                   .attr({src : shots[i].image_teaser_url}));
      var likes = $('<div></div>')
                   .addClass("shot_info")
                   .append(shots[i].likes_count + " Likes");
      var comments = $('<div></div>')
                      .addClass("shot_info")
                      .append(shots[i].comments_count + " Comments");
      var shot = $('<li></li>')	  
                  .append($('<div></div>')
                  .addClass("shot")
                  .append(image)
                  .append(likes)
                  .append(comments));
      $('.shot_grid').append(shot);
    }
  };

  function get_shots(url){
    page_num++;
    $.ajax({
       dataType: "jsonp"
      ,url: url
      ,data: {page:page_num.toString(), per_page:shots_per_load}
      ,success: function(data) {
         shots = data.shots;
         render(shots);
       }
    });
  }

  $('.tabs li').click(function(){
    if (!$(this).hasClass("selected")){
      page_num = 1;
      var url = "http://api.dribbble.com/shots/" + this.id;
      $('.selected').removeClass("selected");
      $(this).addClass("selected");
      $('.shot_grid').html("");
      get_shots(url);
    };
  });

  $('#load_more').click(function(){
    var list = $('.selected').attr('id');
    var url = "http://api.dribbble.com/shots/" + list;
    get_shots(url);
  });
  
  get_shots("http://api.dribbble.com/shots/popular");
});