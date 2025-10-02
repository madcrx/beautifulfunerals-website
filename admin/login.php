<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (empty($input['username']) || empty($input['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Username and password are required']);
        exit;
    }
    
    // Default credentials - CHANGE THESE IN PRODUCTION!
    $valid_username = 'admin';
    $valid_password = 'password';
    
    // Verify credentials
    if ($input['username'] === $valid_username && $input['password'] === $valid_password) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = $input['username'];
        $_SESSION['login_time'] = time();
        
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>