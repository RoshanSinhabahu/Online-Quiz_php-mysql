<?php
include 'db_connect.php';

$sql = "select * from questions";
$result = $conn->query($sql);

$questions = [];

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $questions[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($questions);

$conn->close();
?>