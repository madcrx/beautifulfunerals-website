<?php
session_start();
header('Content-Type: application/json');

function isAdminLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && 
           $_SESSION['admin_logged_in'] === true;
}

if (isAdminLoggedIn()) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
}
?>