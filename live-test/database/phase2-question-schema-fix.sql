ALTER TABLE questions DROP INDEX uq_questions_test_number;
ALTER TABLE questions ADD UNIQUE KEY uq_questions_test_section_number (test_id, section_id, question_number);
