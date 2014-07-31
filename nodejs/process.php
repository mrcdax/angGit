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
  $fileName = $_FILES['file']['name'];
  if ($fileName){
  $tmp_name = $_FILES["file"]["tmp_name"];
  echo "<br/> File name : <b>".$fileName. "</b>";
  move_uploaded_file($tmp_name, "img/" .$fileName);
    echo "<br/> File path : <b>img/" .$fileName."</b>";
    echo '<br/><img src=/img/'.$fileName.' class="zoomout" width="240">';
  }else{
    echo "<br/>No file uploaded";
  }

}
?>
</div>