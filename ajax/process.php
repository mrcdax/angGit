<div>
  <?php
if (!empty($_POST))
{
 $name = $_POST['fname'];
 echo "Welcome <b>". $name. "</b>";
 $age = $_POST['age'];
 echo "<br />Your age is: <b>". $age. "</b>";
 $func = $_POST['func'];
 echo "<br/> You are : <b>".$func. "</b>";
 $awesome = $_POST['awesome'];
 echo "<br/>Are you awesome? <b>". $awesome. "</b>";
 if(isset($_POST['hobby'])){
     echo "<br/> You like: ";
     foreach($_POST['hobby'] as $hobby){
        echo "<b>".$hobby. " </b>";
     }
  }
}
?>
</div>