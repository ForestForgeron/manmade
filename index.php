<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Access-Control-Allow-Origin: *');

    $data = json_decode(file_get_contents('php://input'), true);
    // Обработка данных
    $response = array('status' => 'success', 'message' => 'Data received');
    echo json_encode($response);
}

