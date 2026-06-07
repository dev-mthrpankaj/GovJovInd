ALTER TABLE tests ADD COLUMN IF NOT EXISTS registration_start_at DATETIME NULL AFTER duration_minutes;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS registration_end_at DATETIME NULL AFTER registration_start_at;
