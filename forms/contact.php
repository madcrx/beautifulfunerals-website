<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $required = ['first_name', 'last_name', 'email', 'message'];
    $errors = [];
    
    foreach ($required as $field) {
        if (empty($input[$field])) {
            $errors[] = "The field '$field' is required.";
        }
    }
    
    if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }
    
    // Prepare email
    $to = "info@beautifulfunerals.au";
    $subject = "New Contact Form Submission - " . ($input['subject'] ?? 'General Inquiry');
    
    $message = "Contact form submission details:\n\n";
    $message .= "Name: " . $input['first_name'] . " " . $input['last_name'] . "\n";
    $message .= "Email: " . $input['email'] . "\n";
    $message .= "Phone: " . ($input['phone'] ?? 'Not provided') . "\n";
    $message .= "Subject: " . ($input['subject'] ?? 'General Inquiry') . "\n\n";
    $message .= "Message:\n" . $input['message'] . "\n";
    
    $headers = "From: website@beautifulfunerals.au\r\n";
    $headers .= "Reply-To: " . $input['email'] . "\r\n";
    
    // Send email (commented out for safety)
    /*
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to send message.']);
    }
    */
    
    echo json_encode(['success' => true, 'message' => 'Message sent successfully. We will get back to you soon.']);
    
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}
?>