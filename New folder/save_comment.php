<?php

$name = $_POST["name"];
$email = $_POST["email"];
$comment = $_POST["comment"];
$id = date('Ymd-His') . '-' . rand(100, 999);

// // Baca data komentar yang sudah ada dari file JSON
$comments = file_get_contents('comments.json');
$comments = json_decode($comments, true);

// // Tambahkan data komentar baru ke dalam array
$newComment = array(
    "id" => $id,
    "name" => $name,
    "email" => $email,
    "comment" => $comment,
    "isactive" => '0'
);
// $newComment = 'test';
array_push($comments, $newComment);

// Simpan data komentar ke dalam file JSON
$save = file_put_contents('comments.json', json_encode($comments));
if ($save) {
	echo json_encode(array(
					'status' => 1,
					'pesan' => "Berhasil"
					));
}else{
	echo json_encode(array(
					'status' => 0,
					'pesan' => "Gagal"
					));
}