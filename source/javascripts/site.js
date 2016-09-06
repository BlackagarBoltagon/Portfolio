$(function() {
  var getDribbbleShots;

  $.jribbble.setToken('2436518deac736cbcdf145c359fb78db1ea983e46701fbf01496df7476565866');

  class ColorSlider {
    constructor(element, hue, saturation, lightness, alpha, tick) {
      this._element = element;
      this._hue = hue;
      this._saturation = saturation;
      this._lightness = lightness;
      this._tick = tick;
      this._alpha = alpha;
    }

    recalculate() {
      if (this._hue === 360) {
        this._hue = 0;
      } else {
        this._hue++;
      }

      this._element.style.backgroundColor = `hsla(${this._hue}, ${this._saturation}%, ${this._lightness}%, ${this._alpha})`;
      window.requestAnimationFrame(() => this.draw());
    }

    draw() {
      var frameRate = 1000 / this._tick;
      window.setTimeout(() => this.recalculate(), frameRate);
    }
  }

  getDribbbleShots = function() {
    return $.jribbble.users('mariusz').shots({
      per_page: 8
    }).then(function(playerShots) {
      var html;
      html = [];
      $.each(playerShots, function(i, shot) {
        console.log(shot);
        html.push('<li>');
        html.push('<a href="' + shot.html_url + '">');
        html.push('<img src="' + shot.images.teaser + '" ');
        html.push('alt="' + shot.title + '"></a></li>');
        return html.push('</li>');
      });
      return $('#dribbble_shots').html(html.join(''));
    });
  };

  $('[role=navigation] a, .teaser .button').click(function() {
    var sectionName;
    sectionName = $('body').find($(this).attr("href").split("/").pop());
    $('html, body').animate({
      scrollTop: sectionName.offset().top
    }, 750);
    return false;
  });

  $('.contact-me .button').click(function() {
    return mixpanel.track('Contact button clicked');
  });

  $('#btn_contact_submit').click(function() {
    return mixpanel.track('Contact form submitted');
  });

  $(document).ready(function() {
    getDribbbleShots();

    var overlay = document.getElementById('teaserOverlay');
    var slider = new ColorSlider(overlay, 316, 100, 35, 0.25, 20);
    slider.draw();

    return $('#testimonials_slider').flickity({
      contain: true,
      parallax: true,
      wrapAround: true,
      adaptiveHeight: true,
      prevNextButtons: false
    });
  });
});
