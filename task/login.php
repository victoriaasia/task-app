<?php
// session_start();
?>

<?php require_once("includes/connection.php"); ?>
<?php include("includes/header.php"); ?>


<div class="mlogin">

<div class="mlogin-form">
<div id="login">
<h1>Вход</h1>


<form name="loginform" id="loginform" action="" method="post">
  <div>
      <label for="username">Логин</label>
      <input type="text" name="username" id="username" class="input" value="" size="20" />
  </div>
  <div>
      <label for="password">Пароль</label>
      <input type="password" name="password" id="password" class="input" value="" size="20" />
  </div>


  <p class="submit">
 <button class="btn btn-sm btn-danger" type="submit" name="login" >Войти</button>
</p>
  <p class="regtext">Еще нет аккаунта?<button class="btn btn-sm btn-danger reg"><a href="register.php">Зарегистрироваться</a></button></p>

</form>

</div>
</div>
</div>


<?php
	include_once "function.php";

	if (!empty($_POST)) {
		$login = mysqli_real_escape_string($db, $_POST['username']);
		$pass  = md5($_POST['password']);

		$query = mysqli_query($db, "
			SELECT `id` FROM `users`
			WHERE `username` = '$login'
			AND   `password`  = '$pass';
		");

		if (mysqli_num_rows($query) > 0) {
			$user    = mysqli_fetch_assoc($query);
			$id      = $user['id'];
			$session = getHash();
			$token   = getHash();

			mysqli_query($db, "
				INSERT INTO `connect` SET
					`id_user` = $id,
					`session` = '$session',
					`token`   = '$token';
			");

			setcookie('s', $session);
			setcookie('t', $token);
			header("Location: index.php");
		}
		else {
			echo "<p class=\"errorB\"> <span>Войдите или зарегистрируйтесь </span></p>";
		}
	}
?>
