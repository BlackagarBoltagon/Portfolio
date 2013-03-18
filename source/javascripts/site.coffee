#= require vendor/jquery.jribbble.min

$ ->
  getDribbbleShots = ->
    $.jribbble.getShotsByPlayerId 'mariusz', (playerShots) -> 
      html = []

      $.each playerShots.shots, (i, shot) ->
        html.push '<li>'
        html.push '<a href="' + shot.url + '">'
        html.push '<img src="' + shot.image_teaser_url + '" '
        html.push 'alt="' + shot.title + '"></a></li>'
        html.push '</li>'

      $('#dribbble_shots').html html.join('')
    , page: 1, per_page: 8

  $('[role=navigation] a').click ->
    sectionName = $('body').find($(this).attr("href"))

    $('html, body').animate(
      scrollTop: sectionName.offset().top
    , 750)

    return false

  $(document).ready ->
    getDribbbleShots()
