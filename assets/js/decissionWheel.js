
var svg = d3.select("#wheel")
  .append("svg")
  .append("g");

svg.append("g")
  .attr("class", "slices");
svg.append("g")
  .attr("class", "labels");
svg.append("g")
  .attr("class", "lines");

var width = 550,
    height = 250,
  radius = Math.min(150, 150) / 2;

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) {
    return d.value;
  });

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 40); 

var outerArc = d3.svg.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius * 0.9);

  var arcLarge = d3.svg.arc()
    .innerRadius(radius-4)
    .outerRadius(radius - 40);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function(d){ return d.data.label; };

var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

function randomData (){
  var labels = color.domain();
  return labels.map(function(label){
    return { label: label, value: Math.random() }
  });
}


var status_arc = 0;
$('#wheel').css({bottom:'-500px'});
//change(data);

 var defs = svg.append("defs");

    var filter = defs.append("filter")
        .attr("id", "dropshadow")

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 4)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");

    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");
  
  var toggleArc = function(){
      d3.select(this).select("path").transition()
        .duration(200)
        .attr("d", arcLarge);
      d3.select('#changer').transition()
        .attr('opacity', 1)
        .style('stroke', 'red');
  };

  var toggleArc2 = function(){
      d3.select(this).select("path").transition()
        .duration(200)
        .attr("d", arc);
      d3.select('#changer').transition()
        .attr('opacity', 0);
  };

function change_wheel(data) {
  $('#wheel').animate({bottom:'0px','opacity':1},600);
  /* ------- PIE SLICES -------*/
  var slice = svg.select(".slices").selectAll("path.slice")
    .data(pie(data), key);

  slice.enter()
    .insert("path")
    .style("fill", function(d) { return color(d.data.label); })
    .attr("class", "slice")
    .attr("class", "arc")
        .attr("filter", "url(#dropshadow)")
        .on('click',function(){
            //llamar a la funcion de evento seleccionado

        });

  slice   
    .transition().duration(1000)
    .attrTween("d", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    })
  slice.on('mouseover',function(d,i){
      d3.select(this).transition()
        .duration(200)
        .attr("d", arcLarge);
      d3.select(d3.select('.labels').selectAll('text')[0][i]).transition()
          .style('fill',function(){return d3.hsl(color.range()[i]).brighter(1)} )
          .style('font-size', '18px');
      d3.select(d3.select('.lines').selectAll('polyline')[0][i]).transition()
          .style('stroke-width', 3);
  })
  .on('mouseleave',function(d,i){
      d3.select(this).transition()
        .duration(200)
        .attr("d", arc);
      d3.select(d3.select('.labels').selectAll('text')[0][i]).transition()
          .style('fill',function(){return 'white'} )
          .style('font-size', '16px');
      d3.select(d3.select('.lines').selectAll('polyline')[0][i]).transition()
          .style('stroke-width', 2);
  })
  .on('click',function(d,i){
    $('#textbox').fadeOut();
    $('#wheel').animate({bottom:'-400px','opacity':0});

    if(d.data.coin==true){
        urraca = true;
        $('#fondo').fadeOut();
        $('#textbox').fadeOut();
        $('#intro').fadeIn();
        $('#intro2').fadeIn();
        RL.showThought('intro',"Es posible que esa piedra interese a alguien que encontrarás en el albergue");
        RL.showThought('intro2',"¡Evaristo corre hacia el albergue!");
        setTimeout(function(){
            var dest = d.data.dest;
            RL.end_scene(dest);
            return 0;
        },4000);
    }
    if(d.data.alejarse){
        $('#fondo').fadeOut();
        $('#textbox').fadeOut();
        $('#intro').fadeIn();
        $('#intro2').fadeIn();
        RL.showThought('intro',"¡Eres un tacaño! ¡Dejame en paz!");
        RL.showThought('intro2',"Sin nada más que hacer, Evaristo decide ir al albergue a dormir.");
        setTimeout(function(){
            var dest = d.data.dest;
            RL.end_scene(dest);
            return 0;
        },4000);
    }
    else if(!d.data.alejarse && !d.data.coin){
      var dest = d.data.dest;
      var extra = d.data.extra;
      RL.vino = d.data.vino;
      RL.end_scene(dest,extra);
    }
    
  });
  slice.exit()
    .remove();

  /* ------- TEXT LABELS -------*/

  var text = svg.select(".labels").selectAll("text")
    .data(pie(data), key);

  text.enter()
    .append("text")
    .attr("dy", ".35em")
    .style('font-weight', 'bold')
    .style('fill', '#fff')
    .style('font-family', 'hate')
    .text(function(d) {
      return d.data.label;
    });
  
  function midAngle(d){
    return d.startAngle + (d.endAngle - d.startAngle)/2;
  }

  text.transition().duration(1000)
    .attrTween("transform", function(d) {
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
        return "translate("+ pos +")";
      };
    })
    .styleTween("text-anchor", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        return midAngle(d2) < Math.PI ? "start":"end";
      };
    });

  text.exit()
    .remove();

  /* ------- SLICE TO TEXT POLYLINES -------*/

  var polyline = svg.select(".lines").selectAll("polyline")
    .data(pie(data), key);
  
  polyline.enter()
    .append("polyline")
    .style('stroke', '#fff');

  polyline.transition().duration(1000)
    .attrTween("points", function(d){
      this._current = this._current || d;
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        var d2 = interpolate(t);
        var pos = outerArc.centroid(d2);
        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc.centroid(d2), outerArc.centroid(d2), pos];
      };      
    });
  
  polyline.exit()
    .remove();
};


  svg.append('circle')
    .attr('class','circles' )
    .attr('r',60 )
    .attr('fill', 'none' )
    .style('stroke', '#000')
    .style('stroke-width', 10)
    .style('opacity', 0.2);
  svg.append('circle')
    .attr('id','changer' )
    .attr('r',70 )
    .attr('fill', 'none' )
    .style('stroke', '#000')
    .style('opacity', 0)
    .style('stroke-width', 2);
  function type(d) {
    d.data.value = +d.data.value;
    return d;
  }
 
/*

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.data.tts; });*/

  $('#wheel').css({'left':$(window).width()*0.5-$('#wheel').width()/2})
