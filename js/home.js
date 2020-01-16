$(() => {
    function loadData() {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.responseText);

            resposta.forEach((element) => {

                //define imagem placeholder em caso de não haver imagem para a cerveja na API
                if (element.image_url == null) {
                    element.image_url = "img/placeholder.png";
                }

                //Muda icone de favorito

                let favouriteIcon = 'img/favourite_not.jpeg';
                if (isFavourite(element.id)) {
                    favouriteIcon = 'img/favourite.jpeg';
                }

                //Cria e adiciona o card
                var card =
                    "<div class='col-12 col-sm-6 col-md-4 mb-5'>" +
                    "<div class='card h-100' id='" + element.id + "'>" +
                    "<div class='card-header text-right'>" +
                    "<img class='img-fluid' src=" + favouriteIcon + ">" +
                    "</div>" +
                    "<a href='#' data-toggle='modal' data-target='#product" + element.id + "'>" +
                    "<img class='card-img-top' src='" + element.image_url + "' alt=''></a>" +
                    "<div class='card-body text-center'>" +
                    "<h3 class='card-title text-warning'>" + element.name + "</h5>" +
                    "<p class='card-text text-muted'>" + element.tagline + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                //Buscando elemento aleatório para os cards de sugestão
                var randomElement = resposta[Math.floor(Math.random() * resposta.length)];
                var randomElement2 = resposta[Math.floor(Math.random() * resposta.length)];
                var randomElement3 = resposta[Math.floor(Math.random() * resposta.length)];


                if (randomElement.image_url == null) {
                    randomElement.image_url = "img/placeholder.png";
                }

                if (randomElement2.image_url == null) {
                    randomElement2.image_url = "img/placeholder.png";
                }

                if (randomElement3.image_url == null) {
                    randomElement3.image_url = "img/placeholder.png";
                }

                if (element.ibu == null) {
                    element.ibu = "N/A";
                }

                if (element.abv == null) {
                    element.abv = "N/A";
                }

                if (element.ebc == null) {
                    element.ebc = "N/A";
                }

                var modal =
                    '<div class="modal fade" id="product' + element.id + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">' +
                    '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '</div>' +

                    /*Corpo do container*/
                    '<div class="modal-body">' +

                    '<container id="container">' +
                    '<section id="blocoImgCerva">' +
                    '<img src="' + element.image_url + '" alt="' + element.name + '" id=cerveja>' +
                    '</section>' +

                    '<section id=container2>' +
                    '<h1 id="modalName">' + element.name + '</h1>' +
                    '<h6 id="modalTagline">' + element.tagline + '</h6>' +
                    "<div id='underline'> </div>" +
                    '<p id="ibuAbvEbc"> <span id="beerInfo">IBU:</span> ' + element.ibu + ' <span id="beerInfo">  ABV: </span> ' + element.abv + ' <span id="beerInfo">  EBC:</span> ' + element.ebc + '</p>' +
                    '<p id="modalDescription">' + element.description + '</p></h3>' +
                    '<h6 id="bestServed"> Best served with: </h6>' +
                    '<ul>' +
                    '<li id="foodPairing">' + element.food_pairing[0] + '</li>' +
                    '<li id="foodPairing">' + element.food_pairing[1] + '</li>' +
                    '<li id="foodPairing">' + element.food_pairing[2] + '</li>' +
                    '</ul>' +

                    '</section>' +
                    '</container>' +

                    '<section id="youLike">' +
                    '<h3>You might also like</h3>' +
                    '<div class="row">' +
                    '<div class="column">' +
                    '<div class="card" id="randCard">' +

                    '<img id="randBeerImage" src=' + randomElement.image_url + '>' +
                    '<p id="randName">' + randomElement.name + '</p>' +
                    '</div>' +
                    '</div>' +

                    '<div class="column">' +
                    '<div class="card" id="randCard">' +
                    '<img id="randBeerImage" src=' + randomElement2.image_url + '>' +
                    '<p id="randName">' + randomElement2.name + '</p>' +
                    '</div>' +
                    '</div>' +

                    '<div class="column">' +
                    '<div class="card" id="randCard">' +
                    '<img id="randBeerImage" src=' + randomElement3.image_url + '>' +
                    '<p id="randName">' + randomElement3.name + '</p>' +
                    '</div>' +
                    '</div>' +

                    '</div>' +
                    '</section>' +

                    '</div>' +

                    '</div>' +
                    '</div>' +
                    '</div>'

                $('#card').append(modal);
                $('#card').append(card).hide().fadeIn();

            });

            $('.card-header img').click((event) => {
                let idCard = $(event.target).parent('.card-header').parent('.card').attr("id");
                if (isFavourite(idCard)) {
                    $(event.target).attr("src", "img/favourite_not.jpeg");
                    rmFavourite(idCard);
                }

                else {
                    $(event.target).attr("src", "img/favourite.jpeg");
                    $(event.target).addClass("favoritada");
                    addFavourite(idCard);
                }
            });

            $(".card a").click((event) => {
                console.log($(event.target));
            });

        }
    }

    //=============================================================================================================
    //                                                  FAVORITOS
    //=============================================================================================================
    $("#favourite").click(function () {
        let link = "https://api.punkapi.com/v2/beers?ids=";

        for (let i = 0; i < favourite.id.length; i++) {
            link += favourite.id[i] + "\|";
        }
        console.log(link);

        $('#card').empty();
        xhttp.open("GET", link, true);
        xhttp.send();
    });


    //verifica se é favorito
    function isFavourite(id) {
        return favourite.id.find((element) => id == element)
    }

    //adiciona item aos favoritos
    function addFavourite(id) {
        favourite.id.push(id);
        localStorage.setItem('favourite', JSON.stringify(favourite));
    }

    //Remove item dos favoritos
    function rmFavourite(id) {
        favourite.id.splice(favourite.id.indexOf(id), 1)
        localStorage.setItem('favourite', JSON.stringify(favourite));
    }

    //=============================================================================================================
    /*
    Carrega objeto favorito com um array de ids no LocalStorage
    Caso não existe cria um objeto com array vazio
    */
    var favourite = localStorage.getItem("favourite");
    if (favourite == undefined) {
        favourite = {
            id: []
        }
    }
    else {
        favourite = JSON.parse(favourite);
    }

    /*
    Cria um requisição Assincrona - AJAX*/
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://api.punkapi.com/v2/beers?per_page=80", true);
    xhttp.send();

    xhttp.onreadystatechange = loadData;

    //=============================================================================================================
    //                                              BUSCA AVANÇADA
    //=============================================================================================================

    $("#submit").on("click", () => {

        let maxIBU = "ibu_lt=" + $("#findMaxIBU").val();
        if ($("#findMaxIBU").val() == ""){
            maxIBU = "";
        }
        let minIBU = "&ibu_gt=" + $("#findMinIBU").val();
        if ($("#findMinIBU").val() == ""){
            minIBU = "";
        }
        let maxABV = "&abv_lt=" + $("#findMaxABV").val();
        if ($("#findMaxABV").val() == ""){
            maxABV = "";
        }

        let minABV = "&abv_gt=" + $("#findMinABV").val();
        if ($("#findMinABV").val() == ""){
            minABV = "";
        }
        let maxEBC = "&ebc_lt=" + $("#findMaxEBC").val();
        if ($("#findMaxEBC").val() == ""){
            maxEBC = "";
        }

        let minEBC = "&ebc_gt=" + $("#findMinEBC").val();
        if ($("#findMinEBC").val() == ""){
            minEBC = "";
        }

        let brewedBefore = "";
        if(($("#findBrewedBeforeMonth").val() != "") && ($("#findBrewedBeforeYear").val() != "")){
            brewedBefore = "&brewed_before=" + $("#findBrewedBeforeMonth").val() + "-" + $("#findBrewedBeforeYear").val();
        }

        let brewedAfter = "";
        if(($("#findBrewedAfterMonth").val() != "") && ($("#findBrewedAfterYear").val() != "")){
            brewedAfter = "&brewed_after=" + $("#findBrewedAfterMonth").val() + "-" + $("#findBrewedAfterYear").val();
        }

        let link = "https://api.punkapi.com/v2/beers?" + maxIBU + minIBU + maxABV + minABV + maxEBC + minEBC + brewedBefore + brewedAfter;


        $('#card').empty();
        xhttp.open("GET", link, true);
        xhttp.send();
    });



    //=============================================================================================================

    console.log(xhttp);
    
    //Atualizando os cards pela pesquisa
    $("#find").keyup(() => {
        let link;
        if ($("#find").val() == "") {
            link = "https://api.punkapi.com/v2/beers?";
        }
        else {
            link = "https://api.punkapi.com/v2/beers?per_page=80&beer_name=" + $("#find").val();
        }
        $('#card').empty();
        xhttp.open("GET", link, true);
        xhttp.send();
    });

    //Navegador de páginas
    $('.page-link').click((event) => {
        let page = $(event.target).text();
        $('#card').empty();
        xhttp.open("GET", "https://api.punkapi.com/v2/beers?page=" + page + "&per_page=78", true);
        xhttp.send();
    })

    //Recarregar
    $("#home").click(() => {
        document.location.reload(true);
    });
});