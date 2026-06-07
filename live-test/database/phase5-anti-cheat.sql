ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS leaderboard_eligible TINYINT(1) NOT NULL DEFAULT 1 AFTER eligibility_status;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS prize_eligible TINYINT(1) NOT NULL DEFAULT 1 AFTER leaderboard_eligible;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS disqualification_reason TEXT NULL AFTER prize_eligible;

ALTER TABLE violation_logs ADD COLUMN IF NOT EXISTS user_id BIGINT UNSIGNED NULL AFTER attempt_id;
ALTER TABLE violation_logs ADD COLUMN IF NOT EXISTS test_id BIGINT UNSIGNED NULL AFTER user_id;
ALTER TABLE violation_logs ADD COLUMN IF NOT EXISTS registration_id BIGINT UNSIGNED NULL AFTER test_id;
ALTER TABLE violation_logs ADD COLUMN IF NOT EXISTS event_source VARCHAR(80) NULL AFTER violation_type;
ALTER TABLE violation_logs ADD COLUMN IF NOT EXISTS client_timestamp VARCHAR(80) NULL AFTER event_label;
ALTER TABLE violation_logs ADD COLUMN IF NOT EXISTS event_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER metadata;

CREATE INDEX IF NOT EXISTS idx_violation_logs_test_id ON violation_logs (test_id);
CREATE INDEX IF NOT EXISTS idx_violation_logs_user_id ON violation_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_violation_logs_registration_id ON violation_logs (registration_id);
