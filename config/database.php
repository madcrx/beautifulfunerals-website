<?php
// Load environment variables
$env = parse_ini_file('../.env');

// Database configuration
define('DB_HOST', $env['DB_HOST'] ?? 'localhost');
define('DB_NAME', $env['DB_NAME'] ?? 'funeral_db');
define('DB_USER', $env['DB_USER'] ?? '');
define('DB_PASS', $env['DB_PASS'] ?? '');

// Admin credentials
define('ADMIN_USERNAME', $env['ADMIN_USERNAME'] ?? 'admin');
define('ADMIN_PASSWORD_HASH', password_hash($env['ADMIN_PASSWORD'] ?? 'default', PASSWORD_DEFAULT));
?>