# A minimalist micro-service for file upload in PHP + Nginx using Slim Framework 4

How to test it:

- Clone this repository
- Add an "upload" directory at the root of the project:
  `mkdir upload`
- Give full access (I know it's bad):
  `chmod 777 upload`
- Run composer install dependencies:
  `composer install --no-dev --optimize-autoloader`
- Execute Docker compose:
  `docker compose up`

You can test 2 endpoints:

- GET: / - Print "Hello upload"
- POST: /upload - with a file in the body and "Content-Type: multipart/form-data" in the headers

There is a bruno folder to try the endpoints.
