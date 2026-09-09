<?php
// ============================================================================
// Services Catalog REST API — Leave It On Us
// ============================================================================
require_once __DIR__ . '/db.php';

$pdo = get_pdo();
$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM services_catalog WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) {
            send_json(['success' => false, 'error' => 'Service not found'], 404);
        }
        send_json([
            'success' => true,
            'data' => [
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description'] ?: '',
                'unit' => $row['unit'],
                'defaultUnitPrice' => (float)$row['default_unit_price'],
                'category' => $row['category'],
            ]
        ]);
    } else {
        $stmt = $pdo->query("SELECT * FROM services_catalog ORDER BY category, name");
        $list = [];
        while ($row = $stmt->fetch()) {
            $list[] = [
                'id' => $row['id'],
                'name' => $row['name'],
                'description' => $row['description'] ?: '',
                'unit' => $row['unit'],
                'defaultUnitPrice' => (float)$row['default_unit_price'],
                'category' => $row['category'],
            ];
        }
        send_json(['success' => true, 'data' => $list]);
    }
}

if ($method === 'POST' || $method === 'PUT') {
    $input = get_json_input();
    if (empty($input)) {
        send_json(['success' => false, 'error' => 'No JSON data received'], 400);
    }

    $sid = $id ?: ($input['id'] ?? ('svc-' . bin2hex(random_bytes(4))));
    $name = $input['name'] ?? 'Custom Service';
    $desc = $input['description'] ?? '';
    $unit = $input['unit'] ?? 'Per Month';
    $price = floatval($input['defaultUnitPrice'] ?? 0);
    $category = $input['category'] ?? 'General';

    try {
        $stmt = $pdo->prepare("
            INSERT INTO services_catalog (id, name, description, unit, default_unit_price, category)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                description = VALUES(description),
                unit = VALUES(unit),
                default_unit_price = VALUES(default_unit_price),
                category = VALUES(category)
        ");
        $stmt->execute([$sid, $name, $desc, $unit, $price, $category]);

        send_json([
            'success' => true,
            'message' => 'Service saved successfully',
            'data' => [
                'id' => $sid,
                'name' => $name,
                'description' => $desc,
                'unit' => $unit,
                'defaultUnitPrice' => $price,
                'category' => $category,
            ]
        ]);
    } catch (Exception $e) {
        send_json(['success' => false, 'error' => 'Database error: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    if (!$id) {
        send_json(['success' => false, 'error' => 'ID parameter required'], 400);
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM services_catalog WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() > 0) {
            send_json(['success' => true, 'message' => 'Service deleted successfully']);
        } else {
            send_json(['success' => false, 'error' => 'Service not found'], 404);
        }
    } catch (Exception $e) {
        send_json(['success' => false, 'error' => 'Failed to delete service: ' . $e->getMessage()], 500);
    }
}

send_json(['success' => false, 'error' => 'Method not allowed'], 405);
