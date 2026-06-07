-- Phase 8A: Payment-ready schema and promo-code foundation
-- Import this patch into the live test database before copying the Phase 8A PHP files.
-- Designed for MySQL/MariaDB via phpMyAdmin.

CREATE TABLE IF NOT EXISTS promo_codes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  description VARCHAR(255) NULL,
  discount_type ENUM('percent','fixed') NOT NULL DEFAULT 'percent',
  discount_value INT NOT NULL DEFAULT 100,
  starts_at DATETIME NULL,
  expires_at DATETIME NOT NULL,
  max_uses INT NULL,
  used_count INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_promo_codes_code (code),
  KEY idx_promo_codes_active_expiry (is_active, expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  test_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NULL,
  registration_id VARCHAR(50) NULL,
  razorpay_order_id VARCHAR(100) NULL,
  razorpay_payment_id VARCHAR(100) NULL,
  razorpay_signature TEXT NULL,
  amount_paise INT NOT NULL DEFAULT 0,
  discount_paise INT NOT NULL DEFAULT 0,
  payable_paise INT NOT NULL DEFAULT 0,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  status ENUM('created','pending','paid','failed','cancelled','waived','free_promo') NOT NULL DEFAULT 'created',
  promo_code_id INT UNSIGNED NULL,
  raw_response TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at DATETIME NULL,
  verified_at DATETIME NULL,
  updated_at DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_payments_razorpay_order_id (razorpay_order_id),
  UNIQUE KEY uq_payments_razorpay_payment_id (razorpay_payment_id),
  KEY idx_payments_test_id (test_id),
  KEY idx_payments_user_id (user_id),
  KEY idx_payments_registration_id (registration_id),
  KEY idx_payments_status (status),
  KEY idx_payments_promo_code_id (promo_code_id),
  CONSTRAINT fk_payments_test FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE,
  CONSTRAINT fk_payments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_payments_promo FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP PROCEDURE IF EXISTS live_test_add_column_if_missing;
DELIMITER $$
CREATE PROCEDURE live_test_add_column_if_missing(
  IN table_name_param VARCHAR(64),
  IN column_name_param VARCHAR(64),
  IN column_definition_param TEXT
)
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = table_name_param
      AND COLUMN_NAME = column_name_param
  ) THEN
    SET @alter_sql = CONCAT('ALTER TABLE `', table_name_param, '` ADD COLUMN `', column_name_param, '` ', column_definition_param);
    PREPARE stmt FROM @alter_sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END IF;
END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS live_test_add_index_if_missing;
DELIMITER $$
CREATE PROCEDURE live_test_add_index_if_missing(
  IN table_name_param VARCHAR(64),
  IN index_name_param VARCHAR(64),
  IN index_definition_param TEXT
)
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = table_name_param
      AND INDEX_NAME = index_name_param
  ) THEN
    SET @index_sql = CONCAT('ALTER TABLE `', table_name_param, '` ADD ', index_definition_param);
    PREPARE stmt FROM @index_sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END IF;
END$$
DELIMITER ;

CALL live_test_add_column_if_missing('tests', 'fee_amount_paise', 'INT NOT NULL DEFAULT 500 AFTER is_free');

CALL live_test_add_column_if_missing('test_registrations', 'payment_status', 'VARCHAR(30) NOT NULL DEFAULT ''not_required'' AFTER status');
CALL live_test_add_column_if_missing('test_registrations', 'amount_paise', 'INT NOT NULL DEFAULT 0 AFTER payment_status');
CALL live_test_add_column_if_missing('test_registrations', 'discount_paise', 'INT NOT NULL DEFAULT 0 AFTER amount_paise');
CALL live_test_add_column_if_missing('test_registrations', 'payable_paise', 'INT NOT NULL DEFAULT 0 AFTER discount_paise');
CALL live_test_add_column_if_missing('test_registrations', 'promo_code_id', 'INT UNSIGNED NULL AFTER payable_paise');
CALL live_test_add_column_if_missing('test_registrations', 'payment_id', 'BIGINT UNSIGNED NULL AFTER promo_code_id');
CALL live_test_add_column_if_missing('test_registrations', 'payment_verified_at', 'DATETIME NULL AFTER payment_id');
CALL live_test_add_column_if_missing('test_registrations', 'source', 'VARCHAR(50) NOT NULL DEFAULT ''website'' AFTER payment_verified_at');

CALL live_test_add_index_if_missing('test_registrations', 'idx_registrations_payment_status', 'INDEX `idx_registrations_payment_status` (`test_id`, `payment_status`)');
CALL live_test_add_index_if_missing('test_registrations', 'idx_registrations_promo_code_id', 'INDEX `idx_registrations_promo_code_id` (`promo_code_id`)');
CALL live_test_add_index_if_missing('test_registrations', 'idx_registrations_payment_id', 'INDEX `idx_registrations_payment_id` (`payment_id`)');

DROP PROCEDURE IF EXISTS live_test_add_column_if_missing;
DROP PROCEDURE IF EXISTS live_test_add_index_if_missing;

INSERT INTO promo_codes (
  code,
  description,
  discount_type,
  discount_value,
  starts_at,
  expires_at,
  max_uses,
  used_count,
  is_active
)
VALUES (
  'GJUFREE',
  'First two weeks free live test registration',
  'percent',
  100,
  '2026-06-01 00:00:00',
  '2026-06-20 23:59:00',
  NULL,
  0,
  1
)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  discount_type = VALUES(discount_type),
  discount_value = VALUES(discount_value),
  starts_at = VALUES(starts_at),
  expires_at = VALUES(expires_at),
  is_active = VALUES(is_active),
  updated_at = CURRENT_TIMESTAMP;
