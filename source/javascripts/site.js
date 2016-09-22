$(function() {
  var getDribbbleShots;
  $.jribbble.setToken('2436518deac736cbcdf145c359fb78db1ea983e46701fbf01496df7476565866');

  class ColorSlider {
    constructor(element, parameter, hue, saturation, lightness, alpha, tick) {
      this._element = element;
      this._parameter = parameter;
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

      this._element.style[this._parameter] = `hsla(${this._hue}, ${this._saturation}%, ${this._lightness}%, ${this._alpha})`;
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

    var makeWP = function(elementId, elementClass) {
      return new Waypoint.Inview({
        element: document.getElementById(elementId),
        enter: function(direction) {
          if (direction == 'up') {
            $('body').addClass(elementClass);
          }
        },
        entered: function(direction) {
          if (direction == 'down') {
            $('body').addClass(elementClass);
          }
        },
        exit: function(direction) {
          if (direction == 'up') {
            $('body').removeClass(elementClass);
          }
        },
        exited: function(direction) {
          if (direction == 'down') {
            $('body').removeClass(elementClass);
          }
        }
      });
    }

    var wpWork = makeWP('work', 'index--work');
    var wpTestimonials = makeWP('testimonials', 'index--testimonials');
    var wpAbout = makeWP('about', 'index--about');
    var wpSkills = makeWP('skills', 'index--skills');
    var wpContact = makeWP('contact', 'index--contact');

    return $('#testimonials_slider').flickity({
      contain: true,
      parallax: true,
      wrapAround: true,
      adaptiveHeight: true,
      prevNextButtons: false
    });
  });
});
