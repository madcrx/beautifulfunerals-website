<?php
session_start();
header('Content-Type: application/json');

function isAdminLoggedIn() {
    return isset($_SESSION['admin_logged_in']) && 
           $_SESSION['admin_logged_in'] === true &&
           time() - $_SESSION['login_time'] < 3600; // 1 hour session
}

if (!isAdminLoggedIn()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

echo json_encode(['success' => true]);
?>