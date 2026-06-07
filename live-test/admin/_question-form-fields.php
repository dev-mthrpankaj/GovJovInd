<?php
$currentSectionSlug = '';
foreach ($sections as $row) {
    $currentSectionId = (int) ($_POST['section_id'] ?? ($question['section_id'] ?? $selectedSectionId ?? 0));
    if ((int) $row['id'] === $currentSectionId) {
        $currentSectionSlug = (string) $row['section_slug'];
        break;
    }
}
$languageRule = section_language_rule($currentSectionSlug);
$languageNote = match ($languageRule) {
    'hindi' => 'Hindi section: Hindi question and Hindi options are required. English fields may stay blank.',
    'english' => 'English section: English question and English options are required. Hindi fields may stay blank.',
    default => 'Bilingual section: Hindi and English questions/options are required.',
};
$hiRequired = $languageRule === 'hindi' || $languageRule === 'bilingual';
$enRequired = $languageRule === 'english' || $languageRule === 'bilingual';
?>
<div class="alert alert-info full"><?= e($languageNote) ?></div>
<label>Test
    <select name="test_id" required>
        <option value="">Select test</option>
        <?php foreach ($tests as $row): ?>
            <?php $selected = (int) ($_POST['test_id'] ?? ($question['test_id'] ?? $selectedTestId ?? 0)) === (int) $row['id']; ?>
            <option value="<?= (int) $row['id'] ?>" <?= $selected ? 'selected' : '' ?>><?= e($row['title']) ?> (<?= e($row['slug']) ?>)</option>
        <?php endforeach; ?>
    </select>
</label>
<label>Section
    <select name="section_id" required>
        <option value="">Select section</option>
        <?php foreach ($sections as $row): ?>
            <?php $selected = (int) ($_POST['section_id'] ?? ($question['section_id'] ?? $selectedSectionId ?? 0)) === (int) $row['id']; ?>
            <option value="<?= (int) $row['id'] ?>" <?= $selected ? 'selected' : '' ?>><?= e($row['section_name']) ?> (<?= e($row['section_slug']) ?>)</option>
        <?php endforeach; ?>
    </select>
</label>
<label>Question Number
    <input type="number" name="question_number" min="1" value="<?= e((string) ($_POST['question_number'] ?? ($question['question_number'] ?? ''))) ?>" required>
</label>
<label>Correct Option
    <?php $correctValue = $_POST['correct_option'] ?? ($question['correct_option'] ?? ''); ?>
    <select name="correct_option" required>
        <option value="">Select option</option>
        <?php foreach (correct_options() as $option): ?>
            <option value="<?= e($option) ?>" <?= $correctValue === $option ? 'selected' : '' ?>><?= e($option) ?></option>
        <?php endforeach; ?>
    </select>
</label>
<label>Difficulty
    <?php $difficultyValue = $_POST['difficulty'] ?? ($question['difficulty_level'] ?? ''); ?>
    <select name="difficulty">
        <option value="">Not set</option>
        <?php foreach (valid_difficulties() as $difficulty): ?>
            <option value="<?= e($difficulty) ?>" <?= $difficultyValue === $difficulty ? 'selected' : '' ?>><?= e(format_status($difficulty)) ?></option>
        <?php endforeach; ?>
    </select>
</label>
<label class="check-row">
    <input type="checkbox" name="is_active" value="1" <?= !empty($_POST) ? (isset($_POST['is_active']) ? 'checked' : '') : (!isset($question) || !empty($question['is_active']) ? 'checked' : '') ?>>
    Active question
</label>
<label class="full">Question Hindi<?= $hiRequired ? ' *' : ' (optional)' ?>
    <textarea name="question_hi" rows="4"><?= e($_POST['question_hi'] ?? ($question['question_hi'] ?? '')) ?></textarea>
</label>
<label class="full">Question English<?= $enRequired ? ' *' : ' (optional)' ?>
    <textarea name="question_en" rows="4"><?= e($_POST['question_en'] ?? ($question['question_en'] ?? '')) ?></textarea>
</label>
<label>Question Image (optional)
    <input type="file" name="question_image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp">
    <span class="field-note">Allowed: JPG, PNG, WEBP. Max 2 MB.</span>
</label>
<label>Question Image Alt Text
    <input type="text" name="question_image_alt" value="<?= e($_POST['question_image_alt'] ?? ($question['question_image_alt'] ?? '')) ?>" maxlength="255">
</label>
<?php if (!empty($question['question_image_path'])): ?>
    <div class="image-preview-card full">
        <img src="../<?= e($question['question_image_path']) ?>" alt="<?= e($question['question_image_alt'] ?? 'Question image') ?>">
        <label class="check-row">
            <input type="checkbox" name="remove_question_image" value="1">
            Remove current question image
        </label>
    </div>
<?php endif; ?>
<label>Option A Hindi<?= $hiRequired ? ' *' : ' (optional)' ?>
    <textarea name="option_a_hi" rows="3"><?= e($_POST['option_a_hi'] ?? ($question['option_a_hi'] ?? '')) ?></textarea>
</label>
<label>Option A English<?= $enRequired ? ' *' : ' (optional)' ?>
    <textarea name="option_a_en" rows="3"><?= e($_POST['option_a_en'] ?? ($question['option_a_en'] ?? '')) ?></textarea>
</label>
<label class="full">Option A Image (optional)
    <input type="file" name="option_a_image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp">
    <?php if (!empty($question['option_a_image_path'])): ?>
        <span class="inline-image-preview"><img src="../<?= e($question['option_a_image_path']) ?>" alt="Option A image"></span>
        <span class="check-row"><input type="checkbox" name="remove_option_a_image" value="1"> Remove current option A image</span>
    <?php endif; ?>
</label>
<label>Option B Hindi<?= $hiRequired ? ' *' : ' (optional)' ?>
    <textarea name="option_b_hi" rows="3"><?= e($_POST['option_b_hi'] ?? ($question['option_b_hi'] ?? '')) ?></textarea>
</label>
<label>Option B English<?= $enRequired ? ' *' : ' (optional)' ?>
    <textarea name="option_b_en" rows="3"><?= e($_POST['option_b_en'] ?? ($question['option_b_en'] ?? '')) ?></textarea>
</label>
<label class="full">Option B Image (optional)
    <input type="file" name="option_b_image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp">
    <?php if (!empty($question['option_b_image_path'])): ?>
        <span class="inline-image-preview"><img src="../<?= e($question['option_b_image_path']) ?>" alt="Option B image"></span>
        <span class="check-row"><input type="checkbox" name="remove_option_b_image" value="1"> Remove current option B image</span>
    <?php endif; ?>
</label>
<label>Option C Hindi<?= $hiRequired ? ' *' : ' (optional)' ?>
    <textarea name="option_c_hi" rows="3"><?= e($_POST['option_c_hi'] ?? ($question['option_c_hi'] ?? '')) ?></textarea>
</label>
<label>Option C English<?= $enRequired ? ' *' : ' (optional)' ?>
    <textarea name="option_c_en" rows="3"><?= e($_POST['option_c_en'] ?? ($question['option_c_en'] ?? '')) ?></textarea>
</label>
<label class="full">Option C Image (optional)
    <input type="file" name="option_c_image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp">
    <?php if (!empty($question['option_c_image_path'])): ?>
        <span class="inline-image-preview"><img src="../<?= e($question['option_c_image_path']) ?>" alt="Option C image"></span>
        <span class="check-row"><input type="checkbox" name="remove_option_c_image" value="1"> Remove current option C image</span>
    <?php endif; ?>
</label>
<label>Option D Hindi<?= $hiRequired ? ' *' : ' (optional)' ?>
    <textarea name="option_d_hi" rows="3"><?= e($_POST['option_d_hi'] ?? ($question['option_d_hi'] ?? '')) ?></textarea>
</label>
<label>Option D English<?= $enRequired ? ' *' : ' (optional)' ?>
    <textarea name="option_d_en" rows="3"><?= e($_POST['option_d_en'] ?? ($question['option_d_en'] ?? '')) ?></textarea>
</label>
<label class="full">Option D Image (optional)
    <input type="file" name="option_d_image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp">
    <?php if (!empty($question['option_d_image_path'])): ?>
        <span class="inline-image-preview"><img src="../<?= e($question['option_d_image_path']) ?>" alt="Option D image"></span>
        <span class="check-row"><input type="checkbox" name="remove_option_d_image" value="1"> Remove current option D image</span>
    <?php endif; ?>
</label>
<label class="full">Explanation Hindi (optional)
    <textarea name="explanation_hi" rows="4" data-math-source="hi"><?= e($_POST['explanation_hi'] ?? ($question['explanation_hi'] ?? '')) ?></textarea>
    <span class="field-note">You can use LaTeX math like \(x^2\), \(\frac{a}{b}\), and \[ ... \]</span>
    <span class="math-preview-label">Preview</span>
    <div class="math-preview" data-math-preview="hi"></div>
</label>
<label class="full">Explanation English (optional)
    <textarea name="explanation_en" rows="4" data-math-source="en"><?= e($_POST['explanation_en'] ?? ($question['explanation_en'] ?? '')) ?></textarea>
    <span class="field-note">You can use LaTeX math like \(x^2\), \(\frac{a}{b}\), and \[ ... \]</span>
    <span class="math-preview-label">Preview</span>
    <div class="math-preview" data-math-preview="en"></div>
</label>
<label class="full">Explanation Image (optional)
    <input type="file" name="explanation_image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp">
    <?php if (!empty($question['explanation_image_path'])): ?>
        <span class="inline-image-preview"><img src="../<?= e($question['explanation_image_path']) ?>" alt="Explanation image"></span>
        <span class="check-row"><input type="checkbox" name="remove_explanation_image" value="1"> Remove current explanation image</span>
    <?php endif; ?>
</label>
