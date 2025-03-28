<html>
    <body>
        <?php
           $mess = !empty($_post['message']) ? $_POST['message'] : 'Message ? ';
           echo $mess;
        ?>
        <p>Formulaire utilisant la méthode POST</p>
        <form method="POST" action="index.php">
            <input type="text" name="message">
        </form>
        
        <?php
            if  ($_GET['majeur']=="oui")
            {
                echo 'Bienvenue sur le site';
            }else{
                echo 'vous n\'êtes pas autorisé';
            }
        ?>
        <p>Vous êtes majeur ?<br>
            <a href="index.php?majeur=oui">Oui</a>
            <a href="index.php?majeur=non">Non</a>
    </body>
</html>