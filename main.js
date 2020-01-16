function openSearch() {
  document.getElementById("myOverlay").style.display = "block";
}
  
function closeSearch() {
  document.getElementById("myOverlay").style.display = "none";
}


/**
 * @author Pedro Mattos
 * Função cria dinâmicamente todos os posts a partir de seu titulo usando a api do wordpress
 * 
 */
function criaPost() {
  // Recupera todos os titulos
  var titulo = document.getElementsByClassName('titulo-item-planilha');
  var btn = document.getElementById('cria-post');
  const origin = window.location.origin;
  btn.addEventListener('click', () => {
    try {
      for (let i = 1; i < titulo.length; i++) {
        var texto = titulo[i].textContent;
        const rest_api = origin+'/nrc-ferragens/wp-json/wp/v2/materiais';
        var request = new XMLHttpRequest();
        request.open('POST', rest_api);
        // variaveis obrigatórias para criar um post válido, titulo e status
        const data = {
          'title' : texto,
          'status' : 'publish',
        }
        // Recupera a autenticação de segurança do wordpress para inserir dados via api
        var nonce = document.getElementsByTagName('nonce')[0].getAttribute('n-data')
        request.setRequestHeader('X-WP-Nonce', nonce)
        request.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
        request.send(JSON.stringify(data))
      }
    } catch(e) {}
  })
}


// access api
function getAllPosts() {
  var btn = document.getElementById('exibe');
  const origin = window.location.origin;
  const rest_api = origin + '/nrc-ferragens/wp-json/wp/v2/materiais';
  var links = document.getElementsByClassName('link-item-planilha')
  btn.addEventListener('click', () => {
    var request = new XMLHttpRequest();
    request.open('GET', rest_api);
    request.onload = function() {
      if(request.status >= 200 &&  request.status < 400) {
        var data = JSON.parse(request.responseText);
        for (let i = 0; i < data.length; i ++) {
          sendPost(data[i].id, links[i].textContent);
          getMedia(data[i].slug, data[i].id)
        }
      } else {
        console.log('Conectado, porém ocorreu um erro' + request.statusText)
      }
    };

    request.onerror = () => {
      console.log('Ocorreu um erro');
    }

    request.send();

  })
}


/**
 * @author Pedro Mattos
 * @param {string} names Recebe os slugs dos posts da função getAllPosts()
 * @param {string} id_post Recebe o Id do Post da função getAllPosts()
 */
function getMedia(names, id_post) {
  const origin = window.location.origin;
  const rest_api = origin + '/nrc-ferragens/wp-json/wp/v2/media';
  var request = new XMLHttpRequest();
  request.open('GET', rest_api);
  request.onload = function() {
    if(request.status >= 200 &&  request.status < 400) {
      var data = JSON.parse(request.responseText);
      // console.log(data);
      // percorre todas as imagens
      for (let i = 0; i < data.length; i ++) {
        // console.log(data[i].slug)
        // compara se a slug da imagem é igual ao slug do post
        if(names + '-2' == data[i].slug ) {
          // console.log(data[i].slug)
          // Envia para o id da imagem, o caminho dentro do wordpress e o id do post que será inserida
          sendPostImg(data[i].id, data[i].guid.rendered, id_post)
          // i = data.length;
        }
      }
    } else {
      console.log('Conectado, porém ocorreu um erro ' + request.statusText)
    }

  };
  request.send();
}

// adding with AJAX
function sendPostImg(id_img, path, id_post) {
  // console.log(id_img + ' / ' + path)
  const origin = window.location.origin;
  // var sender = document.getElementById('sender')
  const rest_api = origin + '/nrc-ferragens/wp-json/wp/v2/materiais/' + id_post + '?';
  const postData = {
    "meta_box" : {
      // "prefix-link" : links,
      "prefix-imagem" : {
        "id" : id_img,
        "path" : path,
      }
    }
  }
  // Recupera a autenticação de segurança do wordpress para inserir dados via api
  var nonce = document.getElementsByTagName('nonce')[0].getAttribute('n-data')
  var createPost = new XMLHttpRequest();
  createPost.open('PUT', rest_api)
  createPost.setRequestHeader('X-WP-Nonce', nonce)
  createPost.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
  createPost.send(JSON.stringify(postData))
}

/**
 * @author Pedro Mattos
 * @param {string} id Recebe o id do post para ser editado via api getAllPosts()
 * @param {string} links Recebe informação a ser adicionada no post
 */
function sendPost(id, links) {
  // console.log(links)
  const origin = window.location.origin;
  // var sender = document.getElementById('sender')
  const rest_api = origin + '/nrc-ferragens/wp-json/wp/v2/materiais/' + id + '?';
  // Para o meta_box, é obrigatório o 'prefix-' antes do nome do campo
  const postData = {
    "meta_box" : {
      "prefix-link" : links,
    }
  }
  // Recupera a autenticação de segurança do wordpress para inserir dados via api
  var nonce = document.getElementsByTagName('nonce')[0].getAttribute('n-data')
  var createPost = new XMLHttpRequest();
  createPost.open('PUT', rest_api)
  createPost.setRequestHeader('X-WP-Nonce', nonce)
  createPost.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
  createPost.send(JSON.stringify(postData))
}

window.onload = () => {
  // sendPost()
  getAllPosts()
  // getMedia()
  criaPost()
}



// deprecated deprecated deprecated deprecated deprecated deprecated deprecated deprecated
// populating
function create_html(data) {
  // data.forEach((el) => {
  //   try {
  //     // var new_elemnt = document.createElement('p')
  //     // var new_img = document.createElement('img')
  //     // new_elemnt.setAttribute('id', el.id)
  //     // new_img.setAttribute('src', el.acf.imagem.url)
  //     // document.getElementById('fields').appendChild(new_elemnt);
  //     // document.getElementById('fields').appendChild(new_img);
  //     // new_elemnt.textContent = el.acf.link;

  //     console.log(id);
  //     // sendPost(id);
  //   } catch(e) {}
  // });
}