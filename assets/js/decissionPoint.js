//var data = [{text:'hablar gato',x:"10%",y:"10%"},{text:'hablar gato',x:"15%",y:"15%"}];

var change_points = function(data){
    var data = data;
    var svg = d3.select('body');
    svg.selectAll('.point_svg').remove();
    var group = svg.selectAll('.point_svg')
        .data(data)
        .enter()
        .append('svg')
        .attr('class','point_svg' )
        .style('position', 'absolute')
        .style('top', function(d){return d.x})
        .style('left',function(d){return d.y})
        .style('width',"200px")
        .style('height',"100px" )
        .style('z-index', 20000000)
        .append('g')
        .attr('class','groups_point' );
    d3.selectAll('.groups_point')
        .append('circle')
        .attr('transform', 'translate(' + 75 + ',' + 50 + ')')
        .attr('r', 16)
        .attr('class','outerarc' )
        .style('fill', '#1F314A')
        .style('stroke', '#225F8B')
        .style('stroke-width', 2)
    d3.selectAll('.groups_point').append('circle')
            .attr('transform', 'translate(' + 75 + ',' + 50 + ')')
            .attr('r', 10)
            .attr('class','innerarc' )
            .style('fill', '#3C6781')
            .style('stroke', '#5e889b')
            .style('stroke-width', 2)
    d3.selectAll('.groups_point').append('text')
            .html(function(d){return d.text})
            .style('font-family', 'hate')
            .style('fill', '#fff')
            .attr('transform', 'translate(' + 0 + ',' + 25 + ')')
            .style('opacity', 0);

        d3.selectAll('.groups_point').on('mouseenter',function(){
                d3.select(this).select('.outerarc').transition()
                    .attr('r', 20);
                d3.select(this).select('.innerarc').transition()
                    .attr('r', 15);
                d3.select(this).select('text').transition()
                    .style('opacity', 1);
            })
            .on('mouseleave',function(){
                d3.select(this).select('.outerarc').transition()
                    .attr('r', 16);
                d3.select(this).select('.innerarc').transition()
                    .attr('r', 10);
                d3.select(this).select('text').transition()
                    .style('opacity', 0);
            })
            .on('click',function(d){
                $('.groups_point').fadeOut();
                if(d.click=='ninio'){
                    galleta = true;
                    $('#extra').fadeOut();
                    //$('#textbox').fadeOut();
                    $('#fondo').fadeOut();
                    $('#main_char').animate({'height':"600px",'left':'38%'});
                    $.playSound('assets/data/imp_march');
                    RL.movebox("40%", "500px", "Le has parecido simpático al niño que está  a tu lado. Saca de su bolsillo un paquete de galletas que comparte contigo. Evaristo guarda una de las galletas en su cazadora.", "600px");
                    galleta = true;
                    $('.textbox').css({'display':'block'});
                    setTimeout(function(){
                        var dest = d.dest;
                        RL.end_scene(dest);
                    },8000);
                }
                else if(d.click=='solo'){
                    RL.movebox("40%", "10%", "Evaristo come solo.", "200px");
                    $('#fondo').fadeOut();
                    var dest = d.dest;
                    RL.end_scene(dest);
                }
                else if(d.click=='urraca'){
                    RL.movebox("40%", "10%", "  La urraca dice: “Tú debes de ser el amigo del gato. Me han dicho que tienes una moneda que mola un rato. ¿Qué te parece un intercambio? Tú me das la moneda y yo te digo qué valor tiene la piedra fea de tu bolsillo.", "400px");
                    $('#main_char').fadeOut();
                    var data = [{
                        'label': 'Darle la moneda',
                        'value': 2 / 4,
                        'dest': 6,
                        'coin':true
                    }, {
                        'label': 'Alejarse despacio',
                        'value': 1 / 2,
                        'dest': 6,
                        'alejarse':true
                    }];
                    RL.change_wheel(data);
                } else if(d.click === 'gato'){
                    gato = true;
                    RL.movebox("40%", "10%", "Saca de su bolsillo la galleta y se la ofrece al gato", "400px");
                    $('#textbox').fadeOut(2500, function(){
                        RL.movebox("40%", "10%", "El gato responde: Gracias por la galleta, tenía hambre. Existe una moneda muy peculiar. Tengo una amiga a la que le podría interesar… Se suele dejar ver en el comedor social", "400px");
                    })  
                }
                //var dest = d.data.dest;
                //RL.end_scene(dest);
            });
/*
    for (var i = 0; i < data.length; i++) {
        var svg = d3.select('body').append('svg')
                    .style('position', 'absolute')
                    .style('top', data[i].x)
                    .style('left', data[i].y)
                    .style('width',"200px")
                    .style('height',"100px" )
                    .style('z-index', 20000000)
                    .append('g')
                    .attr('class','groups_point' );
        svg.append('circle')
            .attr('transform', 'translate(' + 75 + ',' + 50 + ')')
            .attr('r', 16)
            .attr('class','outerarc' )
            .style('fill', '#1F314A')
            .style('stroke', '#225F8B')
            .style('stroke-width', 2);    
        svg.append('circle')
            .attr('transform', 'translate(' + 75 + ',' + 50 + ')')
            .attr('r', 10)
            .attr('class','innerarc' )
            .style('fill', '#3C6781')
            .style('stroke', '#5e889b')
            .style('stroke-width', 2); 
        svg.append('text')
            .html(data[i].text)
            .style('font-family', 'hate')
            .style('fill', '#fff')
            .attr('transform', 'translate(' + 0 + ',' + 25 + ')')
            .style('opacity', 0);  
        svg.on('mouseenter',function(){
                d3.select(this).select('.outerarc').transition()
                    .attr('r', 20);
                d3.select(this).select('.innerarc').transition()
                    .attr('r', 15);
                d3.select(this).select('text').transition()
                    .style('opacity', 1);
            })
            .on('mouseleave',function(){
                d3.select(this).select('.outerarc').transition()
                    .attr('r', 16);
                d3.select(this).select('.innerarc').transition()
                    .attr('r', 10);
                d3.select(this).select('text').transition()
                    .style('opacity', 0);
            })
            .on('click',function(d){
                console.log(data[i])
                $('.groups_point').fadeOut();
                if(data[i].click=='ninio'){
                    $('#extra').fadeOut();
                    $('#fondo').fadeOut();
                    $('#main_char').animate({'height':"65%"})
                }
                else if(data[i].click=='solo'){

                }
                else if(data[i].click=='urraca'){

                }
                var dest = d.data.dest;
                RL.end_scene(dest);
            });
            

    };*/
    

}
//change_points(data);
