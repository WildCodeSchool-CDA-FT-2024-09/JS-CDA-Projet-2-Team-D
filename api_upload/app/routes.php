<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Dotenv\Dotenv;

// Enable reading of .env file
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Include the database connection file
require_once __DIR__ . '/../config/database.php';

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response
            ->withHeader('Access-Control-Allow-Origin', '*') // http://client:5173
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withHeader('Access-Control-Allow-Credentials', 'true');;
    });

    /**
     * GET Root endpoint
     */
    $app->get('/upload', function (Request $request, Response $response) {
        $response->getBody()->write('Hello upload.');
        return $response;
    });

    /**
     * GET Invoice endpoint
     */
    // $app->get('/upload/invoice/{invoiceId}', function (Request $request, Response $response, array $args) {
    //     $invoiceId = $args['invoiceId'];

    //     // Get database connection
    //     $db = getDbConnection();

    //     // Prepare the SQL statement
    //     $stmt = $db->prepare("SELECT * FROM invoice WHERE id = :invoiceId");

    //     // // Execute the query
    //     $stmt->execute([':invoiceId' => $invoiceId]);

    //     // Fetch the invoice
    //     $invoice = $stmt->fetch(PDO::FETCH_ASSOC);

    //     if ($invoice === false) {
    //         // If no invoice found, return a 404 error
    //         $response->getBody()->write(json_encode(['success' => false, 'error' => 'Invoice not found']));
    //         return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
    //     }

    //     $response->getBody()->write('Invoice: '.$invoice['receipt']);

    //     return $response->withHeader('Content-Type', 'application/json')->withStatus(200);

    //     return $response;
    // });

    /**
     * POST Upload endpoint
     *
     * By default, the uploaded file will be named that way: Facture-<random-hash>.<extension>
     * Along with the file, you may pass a "description" parameter that will replace the string "Facture".
     */
    $app->post('/upload', function (Request $request, Response $response) {
        // Some parameters
        $uploadDir = __DIR__ . '/../upload';
        $allowedFileTypes = explode(',', $_ENV['ALLOWED_FILE_TYPES']);
        $maxFileSize = $_ENV['MAX_FILE_SIZE'];

        // Get all parsed body parameters as array
        $params = $request->getParsedBody();

        // Get the string value
        $description = $params['description'] ?? "Facture";

        // Create the upload directory if it doesn't exist
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Handle uploaded files
        $uploadedFiles = $request->getUploadedFiles();

        if (empty($uploadedFiles['receipt'])) {
            $response->getBody()->write(json_encode(['success' => false, 'error' => 'No file uploaded']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        $file = $uploadedFiles['receipt'];

        // Validate and move file
        if ($file->getError() === UPLOAD_ERR_OK) {
            // Get the file extension
            $fileExtension = pathinfo($file->getClientFilename(), PATHINFO_EXTENSION);

            // Check extension
            if (!in_array($fileExtension, $allowedFileTypes)) {
                $response->getBody()->write(json_encode(['success' => false, 'error' => 'File extension not permitted. Allowed extensions: '.implode(', ',$allowedFileTypes)]));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(415); // Unsupported Media Type
            }

            // Get the file size
            $fileSize = $file->getSize();

            // Check if the file size exceeds the limit (depends of php.ini values for upload_max_filesize)
            if ($fileSize > $maxFileSize) {
                $response->getBody()->write(json_encode(['success' => false, 'error' => 'File size exceeds limit. Max: '.$maxFileSize]));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(400); // Payload Too Large
            }

            $filename = moveUploadedFile($uploadDir, $file, $description);

            // Get database connection
            $db = getDbConnection();

            // Get the next invoice number
            $lastInvoiceNumber = $db->query('SELECT "invoiceNumber" FROM invoice ORDER BY id DESC LIMIT 1')
                        ->fetch(PDO::FETCH_COLUMN);

            $invoiceNumber = incrementInvoiceCode($lastInvoiceNumber);

            // Retrieve POST parameters from the form body
            $postData = $request->getParsedBody();
            $price_without_vat = $postData['price_without_vat'];
            $label = $postData['label'];
            $info = $postData['info'] ?? "";
            $paid = $postData['paid'];
            $date = $postData['date'];
            $statusId = $postData['statusId'];
            $vatId = $postData['vatId'];
            $creditDebitId = $postData['creditDebitId'];
            $subcategoryId = $postData['subcategoryId'];
            $commissionId = $postData['commissionId'];
            // $bankAccountId = $postData['bankAccountId'];
            $userId = $postData['userId'];

            try {
                // Prepare the SQL statement
                $stmt = $db->prepare('
                    INSERT INTO invoice (
                        "price_without_vat",
                        "label",
                        "receipt",
                        "info",
                        "paid",
                        "date",
                        "invoiceNumber",
                        "statusId",
                        "vatId",
                        "creditDebitId",
                        "subcategoryId",
                        "commissionId",
                        "userId"
                    ) VALUES (
                        :price_without_vat,
                        :label,
                        :receipt,
                        :info,
                        :paid,
                        :date,
                        :invoiceNumber,
                        :statusId,
                        :vatId,
                        :creditDebitId,
                        :subcategoryId,
                        :commissionId,
                        :userId
                    )
                ');

                // Execute the insert
                $stmt->execute([
                    ':price_without_vat' => $price_without_vat,
                    ':label' => $label,
                    ':receipt' => $filename,
                    ':info' => $info,
                    ':paid' => $paid,
                    ':date' => $date,
                    ':invoiceNumber' => $invoiceNumber,
                    ':statusId' => $statusId,
                    ':vatId' => $vatId,
                    ':creditDebitId' => $creditDebitId,
                    ':subcategoryId' => $subcategoryId,
                    ':commissionId' => $commissionId,
                    ':userId' => $userId
                ]);

                return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
            } catch (Exception $e) {
                echo "Error: " . $e->getMessage();
                return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
            }
        }
    });
};

// Helper function to move uploaded file
function moveUploadedFile($uploadDir, $uploadedFile, $desc)
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // Generate unique filename
    $filename = sprintf('%s-%s.%s', $desc, $basename, $extension);

    $uploadedFile->moveTo($uploadDir . DIRECTORY_SEPARATOR . $filename);

    return $filename;
}

// Generate new invoice number (format: YYYY-000001)
function incrementInvoiceCode($invoiceNumber) {
    // Split the invoice number
    $parts = explode('-', $invoiceNumber);
    $number = end($parts);

    // Increment the numeric part and keep it zero-padded to 6 digits
    $newNumber = str_pad((string)((int) $number + 1), 6, '0', STR_PAD_LEFT);

    // Combine the current year and the new number
    return date("Y") . '-' . $newNumber;
}