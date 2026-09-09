-- ============================================================================
-- LEAVE IT ON US (LIOUS) — COMPLETE DATABASE SQL SCHEMA & SEED DATA
-- Quotations, Line Items & Services Catalog
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `leaveitonus_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `leaveitonus_db`;

-- ----------------------------------------------------------------------------
-- 1. TABLE: quotations
-- Stores main quotation headers, client details, totals, and metadata
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `quotations` (
  `id` VARCHAR(64) NOT NULL,
  `quotation_number` VARCHAR(64) NOT NULL,
  `company_name` VARCHAR(150) NOT NULL DEFAULT 'Leave It On Us',
  `provider_subtitle` VARCHAR(255) DEFAULT 'Creator-Led Digital Marketing & Production Agency',
  `provider_contact` VARCHAR(255) DEFAULT 'Contact / WhatsApp: +91 98765 43210',
  `client_company` VARCHAR(150) NOT NULL,
  `client_name` VARCHAR(150) DEFAULT NULL,
  `client_phone` VARCHAR(50) DEFAULT NULL,
  `client_email` VARCHAR(150) DEFAULT NULL,
  `client_address` TEXT DEFAULT NULL,
  `service_category` VARCHAR(200) DEFAULT 'Digital Marketing & Content Production',
  `enable_batch_breakdown` TINYINT(1) NOT NULL DEFAULT 0,
  `batch_title` VARCHAR(255) DEFAULT NULL,
  `batch_items` JSON DEFAULT NULL,
  `batch_total_text` VARCHAR(255) DEFAULT NULL,
  `batch_total_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `subtotal` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `tax_percent` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `tax_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `discount_percent` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  `discount_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `grand_total` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
  `date` VARCHAR(50) NOT NULL,
  `valid_until` VARCHAR(50) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `reference_links` JSON DEFAULT NULL,
  `terms_title` VARCHAR(255) DEFAULT 'Terms & Working Conditions',
  `terms_list` JSON DEFAULT NULL,
  `terms` TEXT DEFAULT NULL,
  `status` ENUM('draft', 'sent', 'accepted', 'rejected') NOT NULL DEFAULT 'draft',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_quotation_number` (`quotation_number`),
  INDEX `idx_client_company` (`client_company`),
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------------------------------------------------------
-- 2. TABLE: quotation_line_items
-- Stores line-by-line deliverables and pricing for each quotation
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `quotation_line_items` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `quotation_id` VARCHAR(64) NOT NULL,
  `service_id` VARCHAR(64) DEFAULT NULL,
  `service_name` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `unit` VARCHAR(100) NOT NULL DEFAULT 'Per Item',
  `qty` INT NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `total` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_quotation_id` (`quotation_id`),
  CONSTRAINT `fk_quotation_items` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ----------------------------------------------------------------------------
-- 3. TABLE: services_catalog
-- Stores reusable service templates for quick quotation generation
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services_catalog` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `unit` VARCHAR(100) NOT NULL DEFAULT 'Per Month',
  `default_unit_price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `category` VARCHAR(100) NOT NULL DEFAULT 'General',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================================
-- SEED DATA INSERTS
-- ============================================================================

-- 1. Insert Services Catalog
INSERT INTO `services_catalog` (`id`, `name`, `description`, `unit`, `default_unit_price`, `category`) VALUES
('svc-1', 'Short-Form Video Production & Reels IP', 'Cinematic vertical reels/shorts with viral hook scripting, shoot, and high-retention pacing.', 'Per Month', 45000.00, 'Content'),
('svc-2', 'Meta & Google Ads Performance Scaling', 'End-to-end media buying, audience testing, ad creative iterations, and ROAS optimization.', 'Per Month', 35000.00, 'Performance'),
('svc-3', 'Creator & Influencer Marketing', 'Campaign management with vetted creators, script briefs, usage rights, and tracking.', 'Per Campaign', 40000.00, 'Influencer'),
('svc-4', 'Social Media Channel Management', 'Daily reels/carousels publishing, community management, and growth hacks.', 'Per Month', 30000.00, 'Social'),
('svc-5', 'High-Converting UGC Video Creatives', 'Batch of 8 authentic UGC video variations and problem-solution angles for paid ads.', 'Per Batch', 32000.00, 'Content'),
('svc-6', 'Brand Commercial / TVC Production', 'Full-scale cinematic commercial production with VFX, color grading, and sound design.', 'Per Video', 150000.00, 'Production'),
('svc-7', 'On-Page SEO & Content Strategy', 'Technical SEO audit, keyword mapping, high-intent blog publishing, and rank tracking.', 'Per Month', 20000.00, 'Digital'),
('svc-8', 'Healthcare Web Architecture & Patient Portal', 'Custom hospital portal, doctor directory, appointment booking, and multi-role admin system.', 'Per Project', 90000.00, 'Production')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `default_unit_price` = VALUES(`default_unit_price`);


-- 2. Insert Quotation: DMR Hospital (LIOUS2026090801)
INSERT INTO `quotations` (
  `id`, `quotation_number`, `company_name`, `provider_subtitle`, `provider_contact`,
  `client_company`, `client_name`, `client_phone`, `client_email`, `client_address`,
  `service_category`, `enable_batch_breakdown`, `batch_title`, `batch_total_text`, `batch_total_amount`,
  `subtotal`, `tax_percent`, `tax_amount`, `discount_percent`, `discount_amount`, `grand_total`,
  `currency`, `date`, `valid_until`, `notes`, `status`
) VALUES (
  'lious-quote-05',
  'LIOUS2026090801',
  'Leave It On Us',
  'Creator-Led Digital Marketing & Production Agency',
  'Contact / WhatsApp: +91 98765 43210',
  'DMR Hospital',
  NULL,
  NULL,
  NULL,
  NULL,
  'Healthcare Web Architecture, Portal & Management System',
  0,
  'Full Healthcare Platform Deliverables — DMR Hospital',
  'Total Project Cost (Turnkey Platform):',
  90000.00,
  90000.00, 0.00, 0.00, 0.00, 0.00, 90000.00,
  'INR',
  'September 08, 2026',
  'October 08, 2026',
  'Complete turnkey healthcare website, patient OPD booking system, doctor management panel, and hospital digital presence suite designed specifically for DMR Hospital.',
  'sent'
) ON DUPLICATE KEY UPDATE `grand_total` = VALUES(`grand_total`);

-- DMR Hospital Line Item
INSERT INTO `quotation_line_items` (
  `quotation_id`, `service_id`, `service_name`, `description`, `unit`, `qty`, `unit_price`, `total`, `sort_order`
) VALUES (
  'lious-quote-05',
  'svc-dmr-hospital-web',
  'DMR Hospital Website & Patient Management Portal',
  'Full-scale custom healthcare portal, advanced patient management & multi-role web platform for DMR Hospital:\n• Advanced Doctor Directory with department, specialty & search filters\n• Detailed Doctor Profiles (Qualifications, bio, OPD schedule, consulting fee & booking CTA)\n• Multi-Role & Admin Access (Super Admin, Hospital Desk, Department Managers & Doctors)\n• New Patient Online Registration & Instant OPD Appointment Booking\n• Follow-up Appointment Booking & Record Lookup\n• Automated Reminders & Real-time Notifications for registrations and appointment confirmations (SMS/WhatsApp/Email)\n• Seamless Appointment Rescheduling & Cancellation workflow\n• Comprehensive Healthcare CMS: Blogs, Health Tips & Medical News management\n• Full Suite of Hospital Pages: Patient Testimonials & Video Reviews, Insurance & TPA Desk Info, About Hospital & Leadership, Department Pages, Doctors Roster, Photo/Video Gallery, Contact & Emergency 24/7 Desk, Camps & Events Page\n• Dedicated Doctor Admin Panel (Personal OPD schedule, appointment calendar, patient queue & daily OPD list)\n• Responsive Mobile-First Architecture, High-Speed Performance & SSL Security',
  'Complete Web Platform & Portal',
  1,
  90000.00,
  90000.00,
  1
);


-- 3. Insert Quotation: Healthophia (LIOUS2026090701)
INSERT INTO `quotations` (
  `id`, `quotation_number`, `company_name`, `provider_subtitle`, `provider_contact`,
  `client_company`, `client_name`, `client_phone`, `client_email`, `client_address`,
  `service_category`, `enable_batch_breakdown`, `batch_title`, `batch_total_text`, `batch_total_amount`,
  `subtotal`, `tax_percent`, `tax_amount`, `discount_percent`, `discount_amount`, `grand_total`,
  `currency`, `date`, `valid_until`, `notes`, `status`
) VALUES (
  'lious-quote-04',
  'LIOUS2026090701',
  'Leave It On Us',
  'Creator-Led Digital Marketing & Production Agency',
  'Contact / WhatsApp: +91 98765 43210',
  'Healthophia',
  NULL,
  NULL,
  NULL,
  NULL,
  'Full-Stack Performance Marketing, Social Media & Digital Operations',
  0,
  'Monthly Growth & Performance Deliverables — Healthophia',
  'Total Retainer Price per Month:',
  85000.00,
  85000.00, 0.00, 0.00, 0.00, 0.00, 85000.00,
  'INR',
  'September 07, 2026',
  'October 07, 2026',
  'Comprehensive monthly social media performance marketing, multi-department visual content production, GMB, website and leads management suite tailored for Healthophia.',
  'sent'
) ON DUPLICATE KEY UPDATE `grand_total` = VALUES(`grand_total`);

-- Healthophia Line Item
INSERT INTO `quotation_line_items` (
  `quotation_id`, `service_id`, `service_name`, `description`, `unit`, `qty`, `unit_price`, `total`, `sort_order`
) VALUES (
  'lious-quote-04',
  'svc-healthophia-perf-mktg',
  'Full-Stack Digital Marketing & Creator Engine (Healthophia)',
  'Comprehensive monthly performance marketing, content production & digital operations suite for Healthophia:\n• 14 High Quality Reels (covering all 7 departments with customized Healthophia branding)\n• 20–25 Custom Graphic Creatives & Campaign Banners\n• 5 Engaging Stories (Interactive Q&As, health tips, quizzes & highlights)\n• Website Management & Timely Content Updates\n• Google My Business (GMB) & Google Maps Optimization for all departments\n• Leads Management Sheets & Real-Time CRM Tracking\n• Target Account Reach: Around 1.5 – 2 Lakh Instagram & Meta Reach\n• Professional Reel Scripting & Concept Storyboarding\n• Creative Copywriting & High-Converting Captions\n• Major Festivals Wishing Creatives & Announcements\n• 3–4 Professional On-Site Shoots per Month\n• End-to-End Meta Ads Management (Audience Targeting, Creative Testing & ROAS Scaling across Instagram & Facebook)',
  'Per Month (Complete Package)',
  1,
  85000.00,
  85000.00,
  1
);


-- 4. Insert Quotation: Shama Family Resturant (LIOUS2026090601)
INSERT INTO `quotations` (
  `id`, `quotation_number`, `company_name`, `provider_subtitle`, `provider_contact`,
  `client_company`, `client_name`, `client_phone`, `client_email`, `client_address`,
  `service_category`, `enable_batch_breakdown`, `batch_title`, `batch_total_text`, `batch_total_amount`,
  `subtotal`, `tax_percent`, `tax_amount`, `discount_percent`, `discount_amount`, `grand_total`,
  `currency`, `date`, `valid_until`, `notes`, `status`
) VALUES (
  'lious-quote-03',
  'LIOUS2026090601',
  'Leave It On Us',
  'Creator-Led Digital Marketing & Production Agency',
  'Contact / WhatsApp: +91 98765 43210',
  'Shama Family Resturant',
  'Mr. Anas',
  '+91 93680 54043',
  NULL,
  NULL,
  'Social Media Handling & Meta Ads Growth Package',
  1,
  'Monthly Growth Package Breakdown — Shama Family Resturant',
  'Total Retainer Price per Month:',
  17000.00,
  17000.00, 0.00, 0.00, 0.00, 0.00, 17000.00,
  'INR',
  'September 06, 2026',
  'October 06, 2026',
  'Tailored social media & visual production growth package for Shama Family Resturant to drive local footfall, customer engagement, and viral food reels.',
  'sent'
) ON DUPLICATE KEY UPDATE `grand_total` = VALUES(`grand_total`);

-- Shama Family Resturant Line Items
INSERT INTO `quotation_line_items` (
  `quotation_id`, `service_id`, `service_name`, `description`, `unit`, `qty`, `unit_price`, `total`, `sort_order`
) VALUES 
('lious-quote-03', 'svc-smm-reels', 'Social Media Handling (10 Reels & 5 Creatives)', 'Complete Instagram & Facebook channel management including 10 high-retention food & ambiance reels, 5 custom graphic creatives, engaging copywriting, hashtag strategy, and scheduling.', 'Per Month (10 Reels + 5 Creatives)', 1, 8000.00, 8000.00, 1),
('lious-quote-03', 'svc-shoots', '2 Professional On-Location Shoots', '2 dedicated on-location camera shoots per month with professional lighting, food plating cinematography, restaurant interior ambiance capture, and director assistance.', 'Per Month (2 Shoots)', 1, 4000.00, 4000.00, 2),
('lious-quote-03', 'svc-meta-reach', 'Meta Ads Management (80,000 Target Account Reach)', 'Targeted Meta ads setup and media buying optimized for local customer footfall, dining awareness, and high engagement with 80,000+ guaranteed account reach.', 'Per Month (80,000 Reach)', 1, 5000.00, 5000.00, 3);


-- 5. Insert Quotation: Bhagwati Bhojnalaya (LIOUS2026090901)
INSERT INTO `quotations` (
  `id`, `quotation_number`, `company_name`, `provider_subtitle`, `provider_contact`,
  `client_company`, `client_name`, `client_phone`, `client_email`, `client_address`,
  `service_category`, `enable_batch_breakdown`, `batch_title`, `batch_items`, `batch_total_text`, `batch_total_amount`,
  `subtotal`, `tax_percent`, `tax_amount`, `discount_percent`, `discount_amount`, `grand_total`,
  `currency`, `date`, `valid_until`, `notes`, `terms_title`, `terms_list`, `terms`, `status`
) VALUES (
  'lious-quote-06',
  'LIOUS2026090901',
  'Leave It On Us',
  'Creator-Led Digital Marketing & Production Agency',
  'Contact / WhatsApp: +91 98765 43210',
  'Bhagwati Bhojnalaya',
  'Mr. Mohit',
  '98374 52655',
  NULL,
  NULL,
  'Social Media Digital Marketing & Production Package',
  0,
  NULL,
  NULL,
  NULL,
  0.00,
  13500.00, 0.00, 0.00, 0.00, 0.00, 13500.00,
  'INR',
  'September 09, 2026',
  'October 09, 2026',
  'Custom digital marketing and food production retainer engineered to grow brand awareness, footfall, and local customer reach for Bhagwati Bhojnalaya.',
  'Terms & Working Conditions',
  '["Payment Terms: 50% advance payment required upon project confirmation / commencement of monthly services.","Media Placement: The quotation does not include direct media placement / Meta ad spend costs (billed directly through client account for 100% transparency).","Shoot Supplies: All food items, beverages, and ingredients required for the shoot must be provided by the client.","Agency Props: Props sourced by the agency (e.g., background boards, specialized table linens, ambient lighting decor) are provided by the agency.","Models & Talent: Models (whether restaurant staff or hired actors/influencers) payment is to be provided directly by the client."]',
  '• Payment Terms: **50% advance payment** required upon project confirmation / commencement of monthly services.\n• Media Placement: The quotation does not include direct **media placement / Meta ad spend costs** (billed directly through client ad account for 100% transparency).\n• Shoot Supplies: All **food items, beverages, and ingredients** required for the shoot must be provided fresh by the client.\n• Agency Props: **Props sourced by the agency** (e.g., background boards, specialized table linens, ambient lighting decor) are provided for shoot aesthetics.\n• Models & Talent: Models (whether restaurant staff or hired actors/influencers) **payment is to be provided directly by the client**.',
  'sent'
) ON DUPLICATE KEY UPDATE `grand_total` = VALUES(`grand_total`);

-- Bhagwati Bhojnalaya Line Item
INSERT INTO `quotation_line_items` (
  `quotation_id`, `service_id`, `service_name`, `description`, `unit`, `qty`, `unit_price`, `total`, `sort_order`
) VALUES (
  'lious-quote-06',
  'svc-bhagwati-smm-pkg',
  'Social Media Digital Marketing & Production Package',
  'Complete monthly social media digital marketing and food content production suite for Bhagwati Bhojnalaya:\n• 1 Professional On-Location Shoot (cinematography, ambiance, food preparation & kitchen aesthetics)\n• 15 Total Content Deliverables per month (7–8 high-retention reels & 7–8 custom graphic creatives/stories)\n• Professional Reel Script Writing & Hook Strategy\n• End-to-End Meta Ads Management (audience targeting, local footfall reach & visibility optimization across Instagram & Facebook)',
  'Per Month (Complete Package)',
  1,
  13500.00,
  13500.00,
  1
);

