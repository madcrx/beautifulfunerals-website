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
    
    // In production, store these in environment variables or a secure config file
    $valid_username = getenv('ADMIN_USERNAME') ?: 'admin';
    $valid_password_hash = getenv('ADMIN_PASSWORD_HASH') ?: password_hash('your_secure_password_here', PASSWORD_DEFAULT);
    
    // Verify credentials
    if ($input['username'] === $valid_username && password_verify($input['password'], $valid_password_hash)) {
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