$ = require 'jquery'

do fill = (item = 'Most creative minds in Art') ->
  $('.tagline').append "#{item}"
fill