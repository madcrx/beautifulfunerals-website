<?php
// Test if sensitive files are accessible
$sensitive_files = [
    '../beautifulfunerals-config/.env',
    '../beautifulfunerals-config/.htpasswd',
    '../beautifulfunerals-config/config/database.php'
];

foreach ($sensitive_files as $file) {
    if (file_exists($file)) {
        echo "WARNING: $file is accessible from web!<br>";
    } else {
        echo "GOOD: $file is not accessible<br>";
    }
}

// Test database connection
try {
    require_once '../beautifulfunerals-config/config/database.php';
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    echo "Database connection: SUCCESS<br>";
} catch (Exception $e) {
    echo "Database connection: FAILED - " . $e->getMessage() . "<br>";
}
?>