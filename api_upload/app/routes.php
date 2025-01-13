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
    // CORS Pre-Flight OPTIONS Request Handler
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        return $response;
    });

    /**
     * GET Root endpoint
     */
    $app->get('/upload', function (Request $request, Response $response) {
        $response->getBody()->write('Hello upload.');
        return $response;
    });

    /**
     * GET file endpoint
     */
    $app->get('/upload/get-file/{receipt}', function (Request $request, Response $response, array $args) {
        $receipt = $args['receipt'];
        $uploadDir = __DIR__ . $_ENV['UPL_DIR'];
        $filePath = $uploadDir . DIRECTORY_SEPARATOR . $receipt;

        // Check if the file exists
        if (!file_exists($filePath)) {
            $response->getBody()->write(json_encode(['success' => false, 'error' => 'File not found']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        // Get the file's MIME type
        $mimeType = mime_content_type($filePath);

        // Return the file as a stream response
        $stream = fopen($filePath, 'rb');
        $response = $response
            ->withHeader('Content-Type', $mimeType)
            ->withHeader('Content-Disposition', 'attachment; filename="' . basename($filePath) . '"')
            ->withBody(new \Slim\Psr7\Stream($stream));

        return $response;
    });

    /**
     * POST Upload endpoint
     *
     * By default, the uploaded file will be named that way: Facture-<random-hash>.<extension>
     * Along with the file, you may pass a "description" parameter that will replace the string "Facture".
     */
    $app->post('/upload', function (Request $request, Response $response) {
        // Some parameters
        $uploadDir = __DIR__ . $_ENV['UPL_DIR'];
        $allowedFileTypes = explode(',', $_ENV['ALLOWED_FILE_TYPES']);
        $maxFileSize = $_ENV['MAX_FILE_SIZE'];

        // Generate a new invoice number
        $invoiceNumber = incrementInvoiceCode();

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

            $filename = moveUploadedFile($file, $invoiceNumber);

            // Get database connection
            $db = getDbConnection();

            // Retrieve POST parameters from the form body
            $postData = $request->getParsedBody();
            $price_without_vat = $postData['price_without_vat'];
            $amount_with_vat = $postData['amount_with_vat'];
            $label = $postData['label'];
            $info = $postData['info'] ?? "";
            $paid = $postData['paid'];
            $date = $postData['date'];
            $statusId = $postData['statusId'];
            $vatId = $postData['vatId'];
            $creditDebitId = $postData['creditDebitId'];
            $subcategoryId = $postData['subcategoryId'];
            $commissionId = $postData['commissionId'];
            $userId = $postData['userId'];

            try {
                // Prepare the SQL statement
                $stmt = $db->prepare('
                    INSERT INTO invoice (
                        "price_without_vat",
                        "amount_with_vat",
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
                        :amount_with_vat,
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
                    ':amount_with_vat' => $amount_with_vat,
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

                // Delete the uploaded file
                unlink($uploadDir . DIRECTORY_SEPARATOR . $filename);
                return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
            }
        }
    });

    // Catch-all route to serve a 404 Not Found page if none of the routes match
    // NOTE: make sure this route is defined last
    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
        return $handler($req, $res);
    });
};

// Helper function to move uploaded file
function moveUploadedFile($uploadedFile, $invoiceNumber)
{
    $uploadDir = __DIR__ . $_ENV['UPL_DIR'];
    $filePrefix = $_ENV['UPL_FILE_PREFIX'];

    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $filename = sprintf('%s%s.%s', $filePrefix, $invoiceNumber, $extension);

    $uploadedFile->moveTo($uploadDir . DIRECTORY_SEPARATOR . $filename);

    return $filename;
}

// Generate new invoice number (format: YYYY_000001)
function incrementInvoiceCode() {
    // Get database connection
    $db = getDbConnection();

    // Get the last invoice number of the current year
    $sql = "SELECT \"invoiceNumber\" FROM invoice
        WHERE date_part('year', \"date\") = :year
        ORDER BY id DESC
        LIMIT 1";

    $query = $db->prepare($sql);

    $query->execute([':year' => date("Y")]);

    // Fetch the result
    $lastInvoiceNumber = $query->fetchColumn();

    // If there is no invoice (ex. at the beginning of a new year)
    if (!$lastInvoiceNumber) {
        $lastInvoiceNumber = "0";
    }

    // Split the invoice number
    $parts = explode('_', $lastInvoiceNumber);
    $number = end($parts);

    // Increment the numeric part and keep it zero-padded to 6 digits
    $newNumber = str_pad((string)((int) $number + 1), 6, '0', STR_PAD_LEFT);

    // Combine the current year and the new number
    return date("Y") . '_' . $newNumber;
}
