<?php
// ============================================================================
// Quotations REST API — Leave It On Us
// ============================================================================
require_once __DIR__ . '/db.php';

$pdo = get_pdo();
$method = $_SERVER['REQUEST_METHOD'];
$id = $_GET['id'] ?? null;

// Convert DB row (snake_case) to Quotation object (camelCase)
function format_quotation_from_db($row, $line_items = []) {
    return [
        'id' => $row['id'],
        'quotationNumber' => $row['quotation_number'],
        'companyName' => $row['company_name'] ?: 'Leave It On Us',
        'providerSubtitle' => $row['provider_subtitle'] ?: '',
        'providerContact' => $row['provider_contact'] ?: '',
        'clientCompany' => $row['client_company'],
        'clientName' => $row['client_name'] ?: '',
        'clientPhone' => $row['client_phone'] ?: '',
        'clientEmail' => $row['client_email'] ?: '',
        'clientAddress' => $row['client_address'] ?: '',
        'serviceCategory' => $row['service_category'] ?: 'Digital Marketing & Content Production',
        'lineItems' => $line_items,
        'enableBatchBreakdown' => (bool)$row['enable_batch_breakdown'],
        'batchTitle' => $row['batch_title'] ?: '',
        'batchItems' => !empty($row['batch_items']) ? json_decode($row['batch_items'], true) : [],
        'batchTotalText' => $row['batch_total_text'] ?: '',
        'batchTotalAmount' => (float)$row['batch_total_amount'],
        'serviceDeliverables' => !empty($row['service_deliverables']) ? json_decode($row['service_deliverables'], true) : [],
        'teamTitle' => $row['team_title'] ?? '3. Dedicated Team & Account Management',
        'teamMembers' => !empty($row['team_members']) ? json_decode($row['team_members'], true) : [],
        'subtotal' => (float)$row['subtotal'],
        'taxPercent' => (float)$row['tax_percent'],
        'taxAmount' => (float)$row['tax_amount'],
        'discountPercent' => (float)$row['discount_percent'],
        'discountAmount' => (float)$row['discount_amount'],
        'grandTotal' => (float)$row['grand_total'],
        'currency' => $row['currency'] ?: 'INR',
        'date' => $row['date'],
        'validUntil' => $row['valid_until'] ?: '',
        'notes' => $row['notes'] ?: '',
        'referenceLinks' => !empty($row['reference_links']) ? json_decode($row['reference_links'], true) : [],
        'termsTitle' => $row['terms_title'] ?: 'Terms & Working Conditions',
        'termsList' => !empty($row['terms_list']) ? json_decode($row['terms_list'], true) : [],
        'terms' => $row['terms'] ?: '',
        'status' => $row['status'] ?: 'draft',
        'createdAt' => $row['created_at'],
        'updatedAt' => $row['updated_at'],
    ];
}

// ----------------------------------------------------------------------------
// GET: Fetch all quotations or single quotation
// ----------------------------------------------------------------------------
if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM quotations WHERE id = ? OR quotation_number = ? LIMIT 1");
        $stmt->execute([$id, $id]);
        $row = $stmt->fetch();
        if (!$row) {
            send_json(['success' => false, 'error' => 'Quotation not found'], 404);
        }

        // Fetch line items
        $item_stmt = $pdo->prepare("SELECT * FROM quotation_line_items WHERE quotation_id = ? ORDER BY sort_order ASC, id ASC");
        $item_stmt->execute([$row['id']]);
        $raw_items = $item_stmt->fetchAll();

        $line_items = array_map(function($it) {
            return [
                'serviceId' => $it['service_id'] ?: '',
                'serviceName' => $it['service_name'],
                'description' => $it['description'] ?: '',
                'unit' => $it['unit'],
                'qty' => (int)$it['qty'],
                'unitPrice' => (float)$it['unit_price'],
                'total' => (float)$it['total'],
            ];
        }, $raw_items);

        send_json(['success' => true, 'data' => format_quotation_from_db($row, $line_items)]);
    } else {
        // Fetch all quotations
        $stmt = $pdo->query("SELECT * FROM quotations ORDER BY created_at DESC");
        $all_quotes = $stmt->fetchAll();

        // Fetch all line items grouped by quotation_id
        $item_stmt = $pdo->query("SELECT * FROM quotation_line_items ORDER BY quotation_id, sort_order ASC, id ASC");
        $grouped_items = [];
        while ($it = $item_stmt->fetch()) {
            $grouped_items[$it['quotation_id']][] = [
                'serviceId' => $it['service_id'] ?: '',
                'serviceName' => $it['service_name'],
                'description' => $it['description'] ?: '',
                'unit' => $it['unit'],
                'qty' => (int)$it['qty'],
                'unitPrice' => (float)$it['unit_price'],
                'total' => (float)$it['total'],
            ];
        }

        $result = [];
        foreach ($all_quotes as $q) {
            $items = $grouped_items[$q['id']] ?? [];
            $result[] = format_quotation_from_db($q, $items);
        }

        send_json(['success' => true, 'data' => $result]);
    }
}

// ----------------------------------------------------------------------------
// POST / PUT: Create or Update Quotation
// ----------------------------------------------------------------------------
if ($method === 'POST' || $method === 'PUT') {
    $input = get_json_input();
    if (empty($input)) {
        send_json(['success' => false, 'error' => 'No JSON data received'], 400);
    }

    $qid = $id ?: ($input['id'] ?? null);
    if (!$qid) {
        $qid = 'lious-' . bin2hex(random_bytes(6));
    }

    $quotation_number = $input['quotationNumber'] ?? ('LIOUS' . date('Ymd') . '01');
    $company_name = $input['companyName'] ?? 'Leave It On Us';
    $provider_subtitle = $input['providerSubtitle'] ?? 'Creator-Led Digital Marketing & Production Agency';
    $provider_contact = $input['providerContact'] ?? 'Contact / WhatsApp: +91 98765 43210';
    $client_company = $input['clientCompany'] ?? '';
    $client_name = $input['clientName'] ?? null;
    $client_phone = $input['clientPhone'] ?? null;
    $client_email = $input['clientEmail'] ?? null;
    $client_address = $input['clientAddress'] ?? null;
    $service_category = $input['serviceCategory'] ?? 'Digital Marketing & Content Production';
    $enable_batch = !empty($input['enableBatchBreakdown']) ? 1 : 0;
    $batch_title = $input['batchTitle'] ?? null;
    $batch_items = !empty($input['batchItems']) ? json_encode($input['batchItems'], JSON_UNESCAPED_UNICODE) : null;
    $batch_total_text = $input['batchTotalText'] ?? null;
    $batch_total_amount = floatval($input['batchTotalAmount'] ?? 0);
    $subtotal = floatval($input['subtotal'] ?? 0);
    $tax_percent = floatval($input['taxPercent'] ?? 0);
    $tax_amount = floatval($input['taxAmount'] ?? 0);
    $discount_percent = floatval($input['discountPercent'] ?? 0);
    $discount_amount = floatval($input['discountAmount'] ?? 0);
    $grand_total = floatval($input['grandTotal'] ?? 0);
    $currency = $input['currency'] ?? 'INR';
    $date = $input['date'] ?? date('F d, Y');
    $valid_until = $input['validUntil'] ?? null;
    $notes = $input['notes'] ?? null;
    $reference_links = !empty($input['referenceLinks']) ? json_encode($input['referenceLinks'], JSON_UNESCAPED_UNICODE) : null;
    $service_deliverables = !empty($input['serviceDeliverables']) ? json_encode($input['serviceDeliverables'], JSON_UNESCAPED_UNICODE) : null;
    $team_title = $input['teamTitle'] ?? '3. Dedicated Team & Account Management';
    $team_members = !empty($input['teamMembers']) ? json_encode($input['teamMembers'], JSON_UNESCAPED_UNICODE) : null;
    $terms_title = $input['termsTitle'] ?? 'Terms & Working Conditions';
    $terms_list = !empty($input['termsList']) ? json_encode($input['termsList'], JSON_UNESCAPED_UNICODE) : null;
    $terms = $input['terms'] ?? null;
    $status = in_array($input['status'] ?? '', ['draft', 'sent', 'accepted', 'rejected']) ? $input['status'] : 'draft';

    // Auto-migrate new columns if missing
    try {
        $cols = $pdo->query("SHOW COLUMNS FROM quotations")->fetchAll(PDO::FETCH_COLUMN);
        if ($cols && !in_array('service_deliverables', $cols)) {
            $pdo->exec("ALTER TABLE quotations ADD COLUMN service_deliverables JSON DEFAULT NULL");
        }
        if ($cols && !in_array('team_title', $cols)) {
            $pdo->exec("ALTER TABLE quotations ADD COLUMN team_title VARCHAR(255) DEFAULT NULL");
        }
        if ($cols && !in_array('team_members', $cols)) {
            $pdo->exec("ALTER TABLE quotations ADD COLUMN team_members JSON DEFAULT NULL");
        }
    } catch (Exception $e) {
        // Continue if check fails
    }

    try {
        $pdo->beginTransaction();

        $upsert_sql = "
            INSERT INTO quotations (
                id, quotation_number, company_name, provider_subtitle, provider_contact,
                client_company, client_name, client_phone, client_email, client_address,
                service_category, enable_batch_breakdown, batch_title, batch_items,
                batch_total_text, batch_total_amount, service_deliverables, team_title, team_members,
                subtotal, tax_percent, tax_amount,
                discount_percent, discount_amount, grand_total, currency, date, valid_until,
                notes, reference_links, terms_title, terms_list, terms, status, updated_at
            ) VALUES (
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?,
                ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, NOW()
            )
            ON DUPLICATE KEY UPDATE
                quotation_number = VALUES(quotation_number),
                company_name = VALUES(company_name),
                provider_subtitle = VALUES(provider_subtitle),
                provider_contact = VALUES(provider_contact),
                client_company = VALUES(client_company),
                client_name = VALUES(client_name),
                client_phone = VALUES(client_phone),
                client_email = VALUES(client_email),
                client_address = VALUES(client_address),
                service_category = VALUES(service_category),
                enable_batch_breakdown = VALUES(enable_batch_breakdown),
                batch_title = VALUES(batch_title),
                batch_items = VALUES(batch_items),
                batch_total_text = VALUES(batch_total_text),
                batch_total_amount = VALUES(batch_total_amount),
                service_deliverables = VALUES(service_deliverables),
                team_title = VALUES(team_title),
                team_members = VALUES(team_members),
                subtotal = VALUES(subtotal),
                tax_percent = VALUES(tax_percent),
                tax_amount = VALUES(tax_amount),
                discount_percent = VALUES(discount_percent),
                discount_amount = VALUES(discount_amount),
                grand_total = VALUES(grand_total),
                currency = VALUES(currency),
                date = VALUES(date),
                valid_until = VALUES(valid_until),
                notes = VALUES(notes),
                reference_links = VALUES(reference_links),
                terms_title = VALUES(terms_title),
                terms_list = VALUES(terms_list),
                terms = VALUES(terms),
                status = VALUES(status),
                updated_at = NOW()
        ";

        $stmt = $pdo->prepare($upsert_sql);
        $stmt->execute([
            $qid, $quotation_number, $company_name, $provider_subtitle, $provider_contact,
            $client_company, $client_name, $client_phone, $client_email, $client_address,
            $service_category, $enable_batch, $batch_title, $batch_items,
            $batch_total_text, $batch_total_amount, $service_deliverables, $team_title, $team_members,
            $subtotal, $tax_percent, $tax_amount,
            $discount_percent, $discount_amount, $grand_total, $currency, $date, $valid_until,
            $notes, $reference_links, $terms_title, $terms_list, $terms, $status
        ]);

        // Replace line items if provided
        if (isset($input['lineItems']) && is_array($input['lineItems'])) {
            $del_stmt = $pdo->prepare("DELETE FROM quotation_line_items WHERE quotation_id = ?");
            $del_stmt->execute([$qid]);

            $ins_item = $pdo->prepare("
                INSERT INTO quotation_line_items (
                    quotation_id, service_id, service_name, description, unit, qty, unit_price, total, sort_order
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");

            $order = 1;
            foreach ($input['lineItems'] as $item) {
                $ins_item->execute([
                    $qid,
                    $item['serviceId'] ?? null,
                    $item['serviceName'] ?? 'Service Item',
                    $item['description'] ?? null,
                    $item['unit'] ?? 'Per Item',
                    intval($item['qty'] ?? 1),
                    floatval($item['unitPrice'] ?? 0),
                    floatval($item['total'] ?? 0),
                    $order++
                ]);
            }
        }

        $pdo->commit();

        // Fetch freshly saved quotation
        $stmt_fresh = $pdo->prepare("SELECT * FROM quotations WHERE id = ?");
        $stmt_fresh->execute([$qid]);
        $fresh_row = $stmt_fresh->fetch();

        $stmt_fresh_items = $pdo->prepare("SELECT * FROM quotation_line_items WHERE quotation_id = ? ORDER BY sort_order ASC, id ASC");
        $stmt_fresh_items->execute([$qid]);
        $fresh_items = $stmt_fresh_items->fetchAll();

        $line_items_out = array_map(function($it) {
            return [
                'serviceId' => $it['service_id'] ?: '',
                'serviceName' => $it['service_name'],
                'description' => $it['description'] ?: '',
                'unit' => $it['unit'],
                'qty' => (int)$it['qty'],
                'unitPrice' => (float)$it['unit_price'],
                'total' => (float)$it['total'],
            ];
        }, $fresh_items);

        send_json([
            'success' => true,
            'message' => 'Quotation saved successfully',
            'data' => format_quotation_from_db($fresh_row, $line_items_out)
        ]);

    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        send_json(['success' => false, 'error' => 'Database operation failed: ' . $e->getMessage()], 500);
    }
}

// ----------------------------------------------------------------------------
// DELETE: Remove quotation and its line items
// ----------------------------------------------------------------------------
if ($method === 'DELETE') {
    if (!$id) {
        send_json(['success' => false, 'error' => 'ID parameter required'], 400);
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM quotations WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            send_json(['success' => true, 'message' => 'Quotation deleted successfully']);
        } else {
            send_json(['success' => false, 'error' => 'Quotation not found'], 404);
        }
    } catch (Exception $e) {
        send_json(['success' => false, 'error' => 'Failed to delete quotation: ' . $e->getMessage()], 500);
    }
}

send_json(['success' => false, 'error' => 'Method not allowed'], 405);
