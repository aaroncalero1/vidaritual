
var galleta = false;
var piedra = false; 
var gato = false; 
var urraca = false;
var moneda = false;

(function() {

    $(document).ready(function() {

        $.playSound('assets/data/intro');
        
        RL.vino = false;
        RL.primerCajero = true;
        var fade_speed = 1000;
        var scenes = ["cajero", "supermercado", "contenedor", "comedor_social", "albergue1", "casa", "albergue2"];
        var actual_scene = 0;
        $('#fondo').width($(window).width());
        $('#fondo').height($(window).height());
        var change_scene = function(a_scene) {
            $('#intro').fadeOut();
            $('#intro2').fadeOut();
            $('#intro3').fadeOut();
            actual_scene = a_scene;
            $('#playbutton').fadeOut(fade_speed);
            $('.title').fadeOut(fade_speed * 5, function() {
                switch (scenes[a_scene]) {
                    case "cajero":
                        cajero();
                        break;
                    case "supermercado":
                        supermercado();
                        break;
                    case "contenedor":
                        contenedor();
                        break;
                    case "comedor_social":
                        comedor_social();
                        break;
                    case "albergue1":
                        albergue1();
                        break;
                    case "casa":
                        casa();
                        break;
                    case "albergue2":
                        albergue2();
                        break;
                }
            });
            $('#fondo').fadeOut(fade_speed, function() {
                $(this).attr('src', "assets/data/" + (a_scene === 0 && RL.primerCajero ? 'bus' : scenes[a_scene]) + "_fondo.jpg");
                $(this).fadeIn(fade_speed);
            });

        };

        function movebox(x, y, text, width) {
            $('#textbox').addClass('active');
            $('#textbox').empty();
            $('#textbox').css({
                'left': x,
                'top': y,
                'width': width
            });
            RL.showThought('textbox', text);
            $('#textbox').fadeIn();
            $('#textbox').animate({
                opacity: 1
            }, fade_speed * 3);
        }
        var moveCharacter = function(id, src, top, left, height) {
            $(id).addClass('active');
            $(id).attr('src', src).load(function() {
                $(this).width("350px");
                $(this).css({
                    'top': top
                });
                $(this).css({
                    'left': left
                });
                $(this).css({
                    'height': height
                });
                $(this).fadeIn();
                $(this).animate({
                    "opacity": 1
                });
            });
        }
        var end_scene = function(next_scene, extra) {
            $('.active').animate({
                opacity: 0
            });
            $('.active').removeClass('active');
            switch (actual_scene) {
                case 0:
                    if (next_scene == 2) {
                        actual_scene = 2;
                        change_scene(2);
                    } else if (next_scene == 1){
                        actual_scene = 1;
                        $('#extra').css('display','none');
                        $('#extra').attr('src', "assets/data/cajero_hombre_rev.png");
                        $('#extra').fadeIn(fade_speed, function(){
                            $('#main_char').css('opacity',1);
                            movebox("60%", "20%", "La señora se gira hacia Evaristo con una mirada de desprecio en los ojos, y le arroja con violencia unas pocas monedas al regazo.", "30%");
                            setTimeout(function(){
                                $('#extra').fadeOut(800, function(){
                                    $("#textbox").fadeOut(800, function(){
                                        $("#main_char").fadeOut(800, function(){
                                            change_scene(1);
                                        })
                                    })
                                })
                            }, 8000);
                        });                       
                    } else if(next_scene === 3){
                        actual_scene = 3;
                        $('#fondo').fadeOut();
                        if(piedra==false){
                            $('#intro').fadeIn();
                            RL.showThought('intro'," La señora se acerca a él con una sonrisa. Le pide que extienda su mano y deposita algo pesado. Al abrir la mano, descubre una piedra tallada.")
                            piedra = true;
                        }
                        else{
                            RL.showThought('intro',"Puede que algún individuo esté buscando ese artefacto que portas.")
                        }
                        
                        setTimeout(function(){
                            $('#intro').fadeOut(function(){
                                change_scene(3);
                            });
                        },10000);
                    }
                    break;
                case 1:
                    if (next_scene == 6) {
                        actual_scene = 6;
                        if(extra){
                            movebox("60%", "20%", "Una persona sin hogar cuenta con una media de 3€ al día.", "30%");
                            setTimeout(function(){
                                $('#textbox').fadeOut(200);
                                $('#fondo').fadeOut();
                                $('#intro').fadeIn();
                                if(galleta==false){
                                    RL.showThought('intro',"Evaristo guarda una de las galletas en su cazadora.")
                                    galleta = true;
                                } else{
                                    RL.showThought('intro',"Evaristo recuerda por un instante al gato que le ha acompañado durante sus noches en el cajero.")
                                }  
                                setTimeout(function(){
                                    $('#intro').fadeOut(200);
                                    $('#fondo').fadeOut(1000, function(){
                                        actual_scene = 6;
                                        change_scene(6);
                                    });
                                }, 7000);
                            }, 5000);
                        } else {
                            actual_scene = 6;
                            change_scene(6);
                        }
                    } else if (next_scene == 4){
                        actual_scene = 4;
                        change_scene(4);
                    }
                    break;
                case 2:
                    setTimeout(function() {
                        movebox("40%", "30%", "Frente a la creencia popular, las personas sin hogar itinerantes no suelen rebuscar entre la basura. Ellos saben encontrar lo que necesitan en las ONG.", "20%")
                    }, 1000);
                    if (next_scene == 4){
                        setTimeout(function() {
                        movebox("40%", "30%", "Evaristo no ha encontrado nada.", "20%")
                        }, 9000);
                    } else {
                        setTimeout(function() {
                        movebox("40%", "30%", "Evaristo espera durante un rato pero no viene nadie.", "20%")
                        }, 9000);
                    }
                    setTimeout(function() {
                        $('.active').animate({
                            opacity: 0
                        });
                        $('.active').removeClass('active');
                        if (next_scene == 4) {
                            actual_scene = 4;
                            change_scene(4);
                        } else {
                            actual_scene = 6;
                            change_scene(6);
                        }
                    }, 15000);
                    break;
                case 3:
                    setTimeout(function(){
                        $('#intro').fadeOut(function(){
                            $('#intro2').fadeOut(function(){
                                $('#intro').fadeIn();
                            });
                            $('#intro').html('');
                            RL.showThought('intro','La entrada a los comedores sociales no siempre es sencilla. En algunos, se hace una selección de las personas que pueden y no pueden entrar. La idea preconcebida de persona que recibe una sopa después de hacer cola en el comedor social es falsa.');
                            setTimeout(function(){
                                RL.change_scene(6);
                            },6000);
                        });
                    },4000);
                    break;
                case 4:
                    actual_scene=0;
                    RL.primerCajero = false;
                    change_scene(0);
                    break;
                case 6:
                    if(next_scene === -1){
                        next_scene = 0;
                        movebox("10%", "10%", "Entre el dinero que le ha dado el responsable encuentra una moneda antigua y brillante. Piensa para sí que no tendrá ningún valor.", "400px");
                        moneda = true;
                        setTimeout(function(){
                            $('#textbox').fadeOut();
                            change_scene(0);
                        }, 10000);
                        break;
                    } else {
                        actual_scene=0;
                        RL.primerCajero = false;
                        change_scene(0);
                        break;
                    }
            }
        };
        var cajero = function() {
            if (RL.primerCajero) {
                RL.primerCajero = false;
                setTimeout(function() {
                    movebox("10%", "10%", "Evaristo es una de las personas que viven en la calle y su modo de vida es itinerante. Rara vez permanece en la misma ciudad más de 3 días. Echa una cabezada en el autobús mientras llega a su próximo destino: Pamplona.", "400px");
                    setTimeout(function() {
                        $('#fondo').fadeOut(fade_speed, function() {
                            $(this).attr('src', "assets/data/cajero_fondo.jpg");
                            $(this).fadeIn(fade_speed, function(){
                                nextStep();
                            });
                        });
                        $('#textbox').css({
                            opacity: 0
                        });
                    }, 10000);
                }, 1000);
            } else {
                nextStep();
            }

            function nextStep() {
                moveCharacter('#main_char', 'assets/data/cajero_evar.png', '45%', '45%', '65%');
                moveCharacter('#extra2', 'assets/data/cajero_gato.png', '60%', '75%', '40%');
                setTimeout(function() {
                    movebox("63%", "20%", "Evaristo aprovecha el buen tiempo de días atrás y ha podido dormir en un cajero, pero los días soleados se han terminado. Recostado sobre sus cartones, entreabre los ojos y ve a una señora de avanzada edad sacando dinero del cajero. ¿Qué hará Evaristo?", "400px");
                }, 1000);
                setTimeout(function() {
                    moveCharacter('#extra', 'assets/data/cajero_hombre.png', '30%', '25%', '100%');
                    var data = [{
                        'label': 'Pide dinero',
                        'value': 2 / 4,
                        'dest': 1
                    }, {
                        'label': 'No hace nada',
                        'value': 1 / 2,
                        'dest': 3
                    }, {
                        'label': 'Molesta a la señora',
                        'value': 1 / 2,
                        'dest': 2
                    }, {
                        'label': 'Chantajea a la señora',
                        'value': 1 / 2,
                        'dest': 1
                    }];
                    setTimeout(function() {
                        change_wheel(data)
                    }, 1000);
                    if(galleta){
                        change_points([{text:'Hablar con <br>el Gato',x:'75%',y:'80%','dest':6,'click':'gato'}]);
                    }
                }, 8000);
            }
        };
        var contenedor = function() {
            setTimeout(function() {
                moveCharacter('#main_char', 'assets/data/contenedor_evar.png', '20%', '40%', '90%');
                movebox("70%", "10%", "Evaristo está satisfecho tras haber molestado a la mujer en el cajero decide esperar junto a un contenedor detrás de un supermercado y esperar a que la jornada termine. Cree que es posible que alguien tire algo al contenedor que le pueda servir.", "400px");
            }, 3000);
            var data = [{
                'label': 'Espera a que tiren algo interesante',
                'value': 2 / 4,
                'dest': 6
            }, {
                'label': 'Rebusca en la basura',
                'value': 1 / 2,
                'dest': 4
            }];
            setTimeout(function() {
                change_wheel(data)
            }, 7000);
        }
        
        var supermercado = function(){
            setTimeout(function() {
                moveCharacter('#main_char', 'assets/data/supermercado_evar.png', '20%', '40%', '80%');
                movebox("70%", "10%", "Con el dinero que ha obtenido de la señora decide ir al supermercado más próximo. Aún no sabe en qué invertir la limosna.", "20%");
                var data = [{
                        'label': 'Cartón de vino',
                        'value': 1 / 3,
                        'dest': 4,
                        'vino': true
                    }, {
                        'label': 'Sándwich',
                        'value': 1 / 3,
                        'dest': 6
                    }, {
                        'label': 'Paquete de galletas',
                        'value': 1 / 3,
                        'dest': 6,
                        'extra' : true
                    }];
                setTimeout(function() {
                    change_wheel(data)
                }, 3000);
            }, 3000);
        }

        var comedor_social = function(){
            setTimeout(function(){
                moveCharacter('#main_char','assets/data/comedor_ninio.png','51%','28%','50%');
                movebox("70%", "10%", "A Evaristo le han hablado de un comedor social en la ciudad y decide probar suerte. El sitio cuenta con varias mesas donde sentarse. En una de las mesas hay un grupo de personas sin hogar charlando mientras toman una sopa caliente.", "400px");
                if(gato && moneda){
                    change_points([{text:'Hablar con <br>la Urraca',x:'25%',y:'13%','dest':6,'click':'urraca'},{text:'Comer con niño',x:'45%',y:'30%','dest':6,'click':'ninio'},{text:'Comer solo',x:'42%',y:'63%','dest':6,'click':'solo'}])
                    moveCharacter('#extra','assets/data/comedor_urraca.png','25%','0%','60%');
                }
                else{
                    change_points([{text:'Comer con niño',x:'45%',y:'30%','dest':6,'click':'ninio'},{text:'Comer solo',x:'42%',y:'63%','dest':6,'click':'solo'}])
                }
            },200);
        };
        
        var albergue1 = function(){
            setTimeout(function() {
                var str = "Tras una larga jornada llega la noche y, con ella, el frío. Evaristo sabe que el cajero no será suficiente refugio para esta noche y decide ir al albergue. ";
                if(RL.vino){
                    RL.vino = false;
                    str+= "Después de haber estado bebiendo vino, su olor le delata. ";
                } else{
                    str+= "Después de haber rebuscado en la basura, su olor le delata. ";
                } 
                str += "El responsable del albergue le deniega pasar la noche allí, aunque le ofrece algo de dinero para un billete de autobús";
                
                movebox("65%", "10%", str, "30%");
                moveCharacter('#extra', 'assets/data/albergue_melendi_down.png', '10%', '16%', '90%');
                
            }, 3000);
            var data = [{
                'label': 'Billete de autobús',
                'value': 4/4,
                'dest': 0
            }];
            setTimeout(function() {
                change_wheel(data)
            }, 7000);
        }
         var albergue2 = function(){
            if (urraca){
                setTimeout(function() {
                    movebox("60%", "10%", "Tras una larga jornada llega la noche. Evaristo se acerca al mostrador del albergue y deposita la piedra en él. El encargado le mira con asombro");
                    setTimeout(function() {
                        moveCharacter("#extra", 'assets/data/albergue_melendi_neutral.png', '10%', '16%', '90%');
                        setTimeout(function() {
                            movebox("60%", "10%", 'El encargado del albergue dice: “me alegro de que me hayas podido ver como algo más que un simple trabajador del albergue. Esta piedra te dará las respuestas que estás buscando”. Se acerca a la pared, inserta la piedra en ella y se abre una puerta. Lo que se ve a través, Evaristo jamás lo hubiera imaginado.');
                            setTimeout(function() {
                                $("#textbox").fadeOut(100);
                                $("#extra").fadeOut(800);
                                $("#fondo").fadeOut(1100);
                                actual_scene=5;
                                change_scene(5);
                            }, 15000);
                        },2000);
                    },8000);
                }, 1000);
            } else {
                setTimeout(function() {
                    movebox("60%", "10%", "Tras una larga jornada llegó la noche y, con ella, el frío. Evaristo sabía que el cajero no sería suficiente refugio y decidió ir al albergue. Allí pudo prolongar su estancia durante tres noches.", "400px");
                    setTimeout(function(){
                        moveCharacter('#extra', 'assets/data/albergue_melendi_neutral.png', '10%', '16%', '90%');
                        $('#textbox').fadeOut(1000, function(){
                            movebox("52%", "18%", "El responsable del albergue le informa de que no puede quedarse más días y le da a elegir entre coger un billete de autobús que le lleve a la ciudad con albergue más cercana o coger el importe del billete e invertirlo como quiera.", "400px");
                            var data = [{
                                'label': 'Billete',
                                'value': 1/2,
                                'dest': 0
                            }, {
                                'label': 'Importe',
                                'value': 1/2,
                                'dest': -1
                            }];
                            if(urraca && piedra){
                                data[0].value = 1/5;
                                data[1].value = 1/5;
                                data.push({
                                    'label': 'Entregar piedra',
                                    'value': 3/5,
                                    'dest': 5
                                });
                            }
                            setTimeout(function() {
                                change_wheel(data)
                            }, 3000);
                        })
                    }, 10000);
                }, 3000);
            }
        }
      
        var casa = function(){
            $.playSound('assets/data/outro')
            $('#fondo').fadeOut(50000);
        };
      
        RL.change_scene = change_scene;
        RL.end_scene = end_scene;
        RL.movebox = movebox;
        RL.change_wheel = change_wheel;


        $('#rain1').attr('src', 'assets/data/rain-light-pot.png');
        $('#rain2').attr('src', 'assets/data/rain-light-pot.png');
        
        $('#rain1').width($(window).width());
        $('#rain2').width($(window).width());

        $('#playbutton').css('left', $(window).width() / 2 - $('#playbutton').width() / 2);
        $('#playbutton').css('opacity', 0);

        $('#playbutton').click(function() {
            $('#rain1').remove();
            $('#rain2').remove();
        })

        $('.title').css('opacity', 0);

        $('#intro').css('left', $(window).width() / 2 - $('#intro').width() / 2);
        $('#intro2').css('left', $(window).width() / 2 - $('#intro2').width() / 2);
        $('#intro3').css('left', $(window).width() / 2 - $('#intro3').width() / 2);

        //Intro 1
        function intro1(nextStep) {
            setTimeout(function() {
                RL.showThought('intro', RL.intro1, function() {
                    RL.showThought('intro2', RL.intro11, function() {
                        transition(nextStep)
                    });
                });
            }, 2500);
        }

        //Intro 2
        function intro2() {
            setTimeout(function() {
                $('#rain1').animate({
                    opacity: 0
                }, 2500, function() {
                    $('#rain1').toggleClass('filling', false);
                    $('#rain1').css('visibility', 'hidden');
                })

                $('#rain2').animate({
                    opacity: 0
                }, 2500, function() {
                    $('#rain2').toggleClass('filling2', false);
                    $('#rain2').css('visibility', 'hidden');
                })

                RL.showThought('intro', RL.intro2, function() {
                    RL.showThought('intro2', RL.intro21, function() {
                        intro3();
                    });
                });
            }, 2500);
        }

        //Intro 3
        function intro3() {
            RL.showThought('intro3', RL.intro3, function() {
                transition(function() {
                    $('#playbutton').animate({
                        'opacity': 1
                    }, 1200);
                    $('.title').animate({
                        'opacity': 1
                    }, 1200);
                });
            });
        }

        //Rain transition
        function transition(nextStep) {
            setTimeout(function() {
                $('#rain1').toggleClass('filling', true);
                $('#rain1').css('visibility', 'visible');
                $('#rain1').animate({
                    opacity: 1
                }, 1000, function() {
                    $('#intro').animate({
                        opacity: 0
                    }, 1200, function() {
                        $(this).html('');
                        $(this).css({
                            opacity: 1
                        });
                    })

                    $('#intro2').animate({
                        opacity: 0
                    }, 1200, function() {
                        $(this).html('');
                        $(this).css({
                            opacity: 1
                        });
                    })

                    $('#intro3').animate({
                        opacity: 0
                    }, 1200, function() {
                        $(this).html('');
                        $(this).css({
                            opacity: 1
                        });
                    })
                });

                $('#rain2').toggleClass('filling2', true);
                $('#rain2').css('visibility', 'visible');
                $('#rain2').animate({
                    opacity: 1
                }, 1000);
                setTimeout(function() {
                    nextStep();
                }, 3000);
            }, 10000);
        }
        intro1(function() {
            intro2();
        })
    });

}())