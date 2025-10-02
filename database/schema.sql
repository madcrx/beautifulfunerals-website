CREATE DATABASE IF NOT EXISTS funeral_db;
USE funeral_db;

CREATE TABLE funerals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NULL,
    date_of_death DATE NOT NULL,
    location VARCHAR(500) NOT NULL,
    service_date DATE NOT NULL,
    service_time TIME NOT NULL,
    live_stream_url VARCHAR(1000) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE admin_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_user VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rate_limits (
    ip_address VARCHAR(45) PRIMARY KEY,
    requests INT DEFAULT 1,
    last_request TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);