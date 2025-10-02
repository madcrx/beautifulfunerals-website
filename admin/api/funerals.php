<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN'] ?? '*');
header('Access-Control-Allow-Methods: GET');

// Simple cache control for public API
header('Cache-Control: public, max-age=300'); // 5 minutes cache

try {
    // Connect to database
    require_once '../config/database.php';
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get only upcoming funerals
    $stmt = $pdo->prepare("
        SELECT 
            id,
            name,
            date_of_birth,
            date_of_death,
            location,
            service_date,
            service_time,
            live_stream_url
        FROM funerals 
        WHERE service_date >= CURDATE() 
        ORDER BY service_date ASC, service_time ASC
        LIMIT 10
    ");
    $stmt->execute();
    $funerals = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Format dates for display
    foreach ($funerals as &$funeral) {
        if ($funeral['service_date']) {
            $funeral['service_date_formatted'] = date('l, jS F Y', strtotime($funeral['service_date']));
        }
        if ($funeral['date_of_death']) {
            $funeral['date_of_death_formatted'] = date('jS F Y', strtotime($funeral['date_of_death']));
        }
    }
    
    echo json_encode([
        'success' => true,
        'data' => $funerals
    ]);
    
} catch (PDOException $e) {
    error_log("Database error in public funerals API: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to load funeral information'
    ]);
}
?>