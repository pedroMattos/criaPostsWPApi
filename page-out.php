<?php get_header(); ?>
<?php include('template-parts/intro-geral.php'); ?>
<div class="row container">
  <div class="col-6">
  <!-- Envia para a página atual -->
    <form action="<?php echo $_SERVER['REQUEST_URI'] ?>" method="post" enctype="multipart/form-data">
      <!-- A planilha deve estar no formato XML -->
      <input type="file" name="planilha" id="plan">
      <label for="planilha">Arquivo</label>
      <input type="submit" value="Enviar">
    </form>
  </div>
  <div class="col-6">
<?php
// Gera o código nonce
$nonce = wp_create_nonce('wp_rest');
  $dados = $_FILES['planilha'];
  // Recupera código de segurança para acesso a api do wordpress
  echo '<nonce n-data="'.$nonce.'"/>';
  echo '<button id="cria-post">Criar Posts</button>';
  echo '<button id="exibe">Inserir Informações</button>';
  // echo '<button id="media">Media</button>';

  // verifica se existe arquivo
  if($_FILES['planilha']['tmp_name']){
    // Função nativa do PHP para percorrer html/xml
    $arquivo = new DOMDocument();
    $arquivo->load($_FILES['planilha']['tmp_name']);
    // var_dump($arquivo);
    // acessa as linhas da tabela
    $linhas = $arquivo->getElementsByTagName("table-row");
    // percorre as linhas
    foreach($linhas as $linha){
      // recupera os valores de cada celula em cada linha
      $codigo = $linha->getElementsByTagName("table-cell")->item(0)->nodeValue;
      // $codigo = $linha->nodeValue;
      echo "<p class='titulo-item-planilha'>Codigo: $codigo <br></p>";
      $descricao = $linha->getElementsByTagName("table-cell")->item(1)->nodeValue;
      // $codigo = $linha->nodeValue;
      echo "<p>Descricao: $descricao <br></p>";
      $quant = $linha->getElementsByTagName("table-cell")->item(2)->nodeValue;
      // $codigo = $linha->nodeValue;
      echo "<p>Quantidade: $quant <br></p>";
      $valor = $linha->getElementsByTagName("table-cell")->item(3)->nodeValue;
      // $codigo = $linha->nodeValue;
      echo "<p>Valor: $valor <br></p>";
      $promo = $linha->getElementsByTagName("table-cell")->item(4)->nodeValue;
      // $codigo = $linha->nodeValue;
      echo "<p>Promoção: $promo <br></p>";
      $group = $linha->getElementsByTagName("table-cell")->item(5)->nodeValue;
      // $codigo = $linha->nodeValue;
      echo "<p class='link-item-planilha'>Grupo: $group <br></p>";
      echo '<hr>';
    }
  }


?>
 <p id="fields"></p>
  </div>
</div>

 <!-- <div>
  <input type="text" name="title" id="titulo">
  <input type="text" name="content" id="content">
  <input type="submit" id="sender" value="Enviar">
 </div> -->

 <?php
 
 ?>

<?php get_footer();?>