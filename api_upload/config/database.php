<?php

declare(strict_types=1);

use Dotenv\Dotenv;

// Enable reading of .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

function getDbConnection() {
    $host = $_ENV['DB_HOST'] ?? '';
    $port = $_ENV['DB_PORT'] ?? '5432';
    $dbname = $_ENV['DB_NAME'] ?? '';
    $username = $_ENV['DB_USERNAME'] ?? '';
    $password = $_ENV['DB_PASSWORD'] ?? '';

    try {
        $dsn = "pgsql:host={$host};port={$port};dbname={$dbname};";
        $pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        // Log the error or handle it appropriately
        throw new Exception("Database connection failed: " . $e->getMessage());
    }
}