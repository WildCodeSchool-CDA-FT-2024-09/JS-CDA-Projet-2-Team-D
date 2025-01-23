# Use an official PHP-FPM image with PHP 8.2
FROM php:8.2-fpm

# Install necessary PHP extensions and system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    unzip \
    curl \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    && docker-php-ext-install pdo_pgsql mbstring zip \
    && apt-get clean

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . /var/www/html

# Install dependencies with Composer
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions for the web server
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Copy custom Nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose the port for Nginx
EXPOSE 8100

# Start PHP-FPM and Nginx
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]