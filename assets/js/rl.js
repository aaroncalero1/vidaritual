(function() {

    RL = {}

    function addSrcToImageById(nodeId, src) {
        d3.select('#' + nodeId).attr('src', src);
    }

    function removeSrcFromImageById(nodeId) {
        d3.select('#' + nodeId).attr('src', null);
    }

    function showThought(divId, str, callback) {
        var div = d3.select('#' + divId);

        var shown = [];
        var shownIdx = [];
        for (i = 0; i < str.length; i++) {
            div.append('span').html(str[i]).style({
                opacity: 0,
                padding: "1px"
            })
            shown[i] = false;
            shownIdx.push(i);
        }

        function getRandomIndex() {
            var idx = Math.floor(Math.random() * shownIdx.length);
            var ridx = shownIdx.splice(idx, 1);
            return ridx;
        }

        var execLimit = 8;
        var currentExec = 0;
        var callbackExecuted = false;

        function showLetter() {
            if (currentExec >= execLimit) {
                return;
            }
            if (!callbackExecuted && shown.every(function(elem) {
                    return elem;
                })) {
                callbackExecuted = true;
                if (typeof callback === "function") {
                    callback();
                }
            }
            var rind = getRandomIndex()
            var span = $('#' + divId).find('span:eq(' + rind + ')');
            if (!shown[rind]) {
                currentExec++;
                shown[rind] = true;
                span.animate({
                    opacity: 1
                }, 100, function() {
                    currentExec--;
                    showLetter();
                    showLetter();
                })
            }
        }

        showLetter();
    }

    RL.addSrcToImageById = addSrcToImageById;
    RL.removeSrcFromImageById = removeSrcFromImageById;
    RL.showThought = showThought;

    RL.intro1 = "El sinhogarismo es una realidad creciente en nuestra sociedad. " //
        + "El estigma y la invisibilización social de este colectivo es más que evidente. " //
        + "Detrás de la ocultación de la Persona sin Hogar nos encontramos una sociedad que no quiere reconocer que, inevitablemente, la produce. ";


    RL.intro11 = "Reconciliarnos con esta realidad ayudará a reducir el estigma que se erige alrededor de las personas sin hogar y permitirá llevar a cabo " //
        + "políticas inclusivas y más efectivas que acercarán a este colectivo a zonas alejadas de la exclusión social severa. " //
        + "Y es que, como dijo George Steiner, lo que no se nombra no existe.";

    RL.intro2 = "Existe una población de personas sin hogar en itinerancia, que viven de las atenciones mínimas que ofrecen servicios de acogida " //
        + "de todo el Estado: los albergues. Estas personas solo pueden permanecen en un albergue durante tres noches, 72 horas. ";

    RL.intro21 = "Después, se ven obligadas a buscar un nuevo refugio, ya sea en la calle o en un albergue de otra ciudad. Estas personas viven dentro de un " //
        + "círculo vicioso del que es prácticamente imposible salir.";

    RL.intro3 = "¿Crees que podrás romper el bucle?";
}())