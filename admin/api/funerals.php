<?php
session_start();
header('Content-Type: application/json');

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // For now, return empty array - you can connect to database later
    echo json_encode([
        'success' => true,
        'data' => []
    ]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // For now, just return success - you can add database logic later
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Log the submission (you can save to file or database later)
    error_log("New funeral added: " . json_encode($input));
    
    echo json_encode([
        'success' => true, 
        'message' => 'Funeral added successfully (demo mode)'
    ]);
}
?>