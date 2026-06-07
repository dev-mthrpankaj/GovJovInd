ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_image_path VARCHAR(255) NULL AFTER question_en;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_image_alt VARCHAR(255) NULL AFTER question_image_path;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS option_a_image_path VARCHAR(255) NULL AFTER option_d_en;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS option_b_image_path VARCHAR(255) NULL AFTER option_a_image_path;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS option_c_image_path VARCHAR(255) NULL AFTER option_b_image_path;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS option_d_image_path VARCHAR(255) NULL AFTER option_c_image_path;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS explanation_image_path VARCHAR(255) NULL AFTER explanation_en;
