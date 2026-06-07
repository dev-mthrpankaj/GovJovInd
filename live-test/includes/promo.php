<?php
declare(strict_types=1);

function normalize_promo_code(?string $code): string
{
    $code = strtoupper(trim((string) $code));
    return preg_replace('/[^A-Z0-9_-]+/', '', $code) ?? '';
}

function get_promo_code_by_code(PDO $pdo, string $code): ?array
{
    $normalized = normalize_promo_code($code);
    if ($normalized === '') {
        return null;
    }

    $stmt = $pdo->prepare('SELECT * FROM promo_codes WHERE code = ? LIMIT 1');
    $stmt->execute([$normalized]);
    $promo = $stmt->fetch();

    return $promo ?: null;
}

function get_active_promo_code(PDO $pdo, string $code, DateTimeInterface $now): array
{
    $normalized = normalize_promo_code($code);
    if ($normalized === '') {
        return [
            'valid' => false,
            'reason' => 'empty',
            'message' => 'Enter a promo code.',
            'promo' => null,
        ];
    }

    $promo = get_promo_code_by_code($pdo, $normalized);
    if (!$promo) {
        return [
            'valid' => false,
            'reason' => 'invalid',
            'message' => 'Invalid promo code.',
            'promo' => null,
        ];
    }

    if ((int) ($promo['is_active'] ?? 0) !== 1) {
        return [
            'valid' => false,
            'reason' => 'inactive',
            'message' => 'This promo code is inactive.',
            'promo' => $promo,
        ];
    }

    if (!empty($promo['starts_at']) && $now < new DateTimeImmutable((string) $promo['starts_at'])) {
        return [
            'valid' => false,
            'reason' => 'not_started',
            'message' => 'This promo code is not active yet.',
            'promo' => $promo,
        ];
    }

    if ($now > new DateTimeImmutable((string) $promo['expires_at'])) {
        return [
            'valid' => false,
            'reason' => 'expired',
            'message' => 'This promo code has expired.',
            'promo' => $promo,
        ];
    }

    if ($promo['max_uses'] !== null && (int) $promo['max_uses'] > 0 && (int) $promo['used_count'] >= (int) $promo['max_uses']) {
        return [
            'valid' => false,
            'reason' => 'usage_limit_reached',
            'message' => 'This promo code usage limit has been reached.',
            'promo' => $promo,
        ];
    }

    return [
        'valid' => true,
        'reason' => 'valid',
        'message' => 'Promo code applied successfully.',
        'promo' => $promo,
    ];
}

function calculate_discount_paise(int $amountPaise, array $promo): int
{
    $amountPaise = max(0, $amountPaise);
    $discountType = (string) ($promo['discount_type'] ?? 'percent');
    $discountValue = max(0, (int) ($promo['discount_value'] ?? 0));

    if ($amountPaise <= 0 || $discountValue <= 0) {
        return 0;
    }

    if ($discountType === 'percent') {
        $discount = (int) floor(($amountPaise * min(100, $discountValue)) / 100);
        return min($amountPaise, max(0, $discount));
    }

    if ($discountType === 'fixed') {
        return min($amountPaise, $discountValue);
    }

    return 0;
}

function calculate_payable_paise(int $amountPaise, int $discountPaise): int
{
    return max(0, $amountPaise - max(0, $discountPaise));
}

function format_paise_as_rupees(int $paise): string
{
    return '₹' . number_format(max(0, $paise) / 100, 2);
}
