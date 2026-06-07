# GovJobUpdates Sunday Live Test

This module is isolated inside `/live-test/` and uses PHP + MySQL. Existing static website pages, Google Sheet job data, quiz data, and rank predictor logic are separate.

## Local Setup

1. Use PHP 8+ with PDO MySQL enabled.
2. Create a MySQL database.
3. Import `database/schema.sql`.
4. Update database credentials in `includes/config.php`.
5. Create the first admin manually using `password_hash()` and an `INSERT` into `admins`.
6. Open `/live-test/admin/login.php`.

## Database Patches

If the database was created before later phases, import the phase patch files from `database/` in order:

- `phase2-question-schema-fix.sql`
- `phase2-question-images.sql`
- `phase3-registration-window.sql`
- `phase5-anti-cheat.sql`

## Weekly Registration Window

PHP registration works only when all conditions are true:

- Test status is `registration_open`
- Seats are available
- Test registration date window allows it
- Server day/time is Thursday-Saturday, 12 PM-4 PM Asia/Kolkata

Public users cannot access your local laptop/server unless it is hosted or publicly tunneled. Localhost works only on your own machine/network.

## Sunday Workflow

1. Create test and sections.
2. Add/import 100 questions.
3. Open registration during the weekly window or import registrations from CSV.
4. On Sunday, set test status to `live`.
5. Students open `/live-test/`, read instructions, and start/resume attempt.
6. After test ends, set test status to `closed`.

## Results

Admin path: `/live-test/admin/results.php`

1. Select test.
2. Click `Generate / Regenerate`.
3. Review eligible, suspicious, and disqualified users.
4. Click `Publish Result`.

Public pages:

- `/live-test/result.php`
- `/live-test/leaderboard.php`
- `/live-test/download-report.php`

## Backups And Exports

Admin path: `/live-test/admin/backup.php`

Available CSV exports:

- registrations
- attempts
- answers
- violation logs
- results
- summary

Backups and reports folders include `.htaccess` protections. Keep server rules equivalent if not using Apache.

## Archive

Admin path: `/live-test/admin/archive.php`

Archiving sets the test status to `archived` and records notes in `test_archives`. It does not delete data. Published results can remain visible if `result_visible` is enabled.

## Deployment Notes

- Use HTTPS in production.
- Keep `/live-test/includes/config.php` credentials private.
- Disable/remove temporary setup files.
- Make sure upload folders do not execute scripts.
- Do not expose admin pages without login.
- Public leaderboard hides mobile/email.

## Not Included Yet

Payment/Razorpay integration is not implemented. That belongs to Phase 8.
