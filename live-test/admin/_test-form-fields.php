<?php
$statusValue = $_POST['status'] ?? ($test['status'] ?? 'upcoming');
$defaultWindowDate = $_POST['test_date'] ?? ($test['test_date'] ?? date('Y-m-d'));
$defaultWindow = default_registration_window($defaultWindowDate);
$registrationStartValue = $_POST['registration_start_at'] ?? datetime_local_value($test['registration_start_at'] ?? $defaultWindow['start']);
$registrationEndValue = $_POST['registration_end_at'] ?? datetime_local_value($test['registration_end_at'] ?? $defaultWindow['end']);
?>
<div class="alert alert-info full"><?= e(weekly_registration_window_note()) ?></div>
<label class="full">Title
    <input type="text" name="title" value="<?= e($_POST['title'] ?? ($test['title'] ?? '')) ?>" required maxlength="220">
</label>
<label class="full">Slug
    <input type="text" name="slug" value="<?= e($_POST['slug'] ?? ($test['slug'] ?? '')) ?>" maxlength="220" placeholder="auto-generated-from-title">
</label>
<label>Test Date
    <input type="date" name="test_date" value="<?= e($_POST['test_date'] ?? ($test['test_date'] ?? '')) ?>" required>
</label>
<label>Start Time
    <input type="time" name="start_time" value="<?= e(substr((string) ($_POST['start_time'] ?? ($test['start_time'] ?? '')), 0, 5)) ?>" required>
</label>
<label>End Time
    <input type="time" name="end_time" value="<?= e(substr((string) ($_POST['end_time'] ?? ($test['end_time'] ?? '')), 0, 5)) ?>" required>
</label>
<label>Duration Minutes
    <input type="number" name="duration_minutes" min="1" value="<?= e((string) ($_POST['duration_minutes'] ?? ($test['duration_minutes'] ?? 60))) ?>" required>
</label>
<label>Registration Start
    <input type="datetime-local" name="registration_start_at" value="<?= e($registrationStartValue) ?>">
</label>
<label>Registration End
    <input type="datetime-local" name="registration_end_at" value="<?= e($registrationEndValue) ?>">
</label>
<label>Registration Limit
    <input type="number" name="registration_limit" min="1" value="<?= e((string) ($_POST['registration_limit'] ?? ($test['registration_limit'] ?? 300))) ?>" required>
</label>
<label>Status
    <select name="status" required>
        <?php foreach (valid_test_statuses() as $status): ?>
            <option value="<?= e($status) ?>" <?= $statusValue === $status ? 'selected' : '' ?>><?= e(format_status($status)) ?></option>
        <?php endforeach; ?>
    </select>
</label>
<label class="check-row">
    <input type="checkbox" name="is_free" value="1" <?= !empty($_POST) ? (isset($_POST['is_free']) ? 'checked' : '') : (!empty($test['is_free']) ? 'checked' : '') ?>>
    Free test
</label>
<label class="check-row">
    <input type="checkbox" name="result_visible" value="1" <?= !empty($_POST) ? (isset($_POST['result_visible']) ? 'checked' : '') : (!empty($test['result_visible']) ? 'checked' : '') ?>>
    Result visible
</label>
