-- ==========================================================
-- Database: leaveitonus_db
-- Application: Leave It On Us — Creative Marketing Agency & Admin Portal
-- Modules: Blogs, Quotations & Services, SEO Management, Enquiries
-- Generated: 2026-09-05
-- ==========================================================

-- Note: For Hostinger/cPanel phpMyAdmin, select your created database on the left and import directly.
-- CREATE DATABASE IF NOT EXISTS `leaveitonus_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `leaveitonus_db`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `quotation_items`;
DROP TABLE IF EXISTS `quotations`;
DROP TABLE IF EXISTS `blogs`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `enquiries`;
DROP TABLE IF EXISTS `seo_settings`;
DROP TABLE IF EXISTS `admins`;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- Table structure for table `admins`
-- --------------------------------------------------------

CREATE TABLE `admins` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL UNIQUE,
  `email` VARCHAR(128) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(128) DEFAULT 'Admin User',
  `role` ENUM('superadmin', 'editor', 'sales') DEFAULT 'superadmin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `admins` (`id`, `username`, `email`, `password_hash`, `full_name`, `role`) VALUES
(1, 'admin', 'hello@leaveitonus.com', '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Leave It On Us Administrator', 'superadmin');

-- --------------------------------------------------------
-- Table structure for table `services`
-- --------------------------------------------------------

CREATE TABLE `services` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Marketing',
  `short_description` TEXT,
  `full_description` LONGTEXT,
  `deliverables` JSON,
  `default_price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `pricing_type` ENUM('fixed', 'monthly', 'hourly', 'custom') DEFAULT 'fixed',
  `turnaround` VARCHAR(100) DEFAULT '2-3 Weeks',
  `icon` VARCHAR(32) DEFAULT '⚡',
  `featured` TINYINT(1) DEFAULT 0,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (`id`, `name`, `slug`, `category`, `short_description`, `full_description`, `deliverables`, `default_price`, `pricing_type`, `turnaround`, `icon`, `featured`, `status`) VALUES
('srv-01', 'Original Content & IP Production', 'original-content-ip', 'Production', 'High-impact recurring video series, comedy sketches, brand storytelling, and viral entertainment IP designed for Gen-Z & Millennial audiences.', 'End-to-end studio production including scripting, talent scouting, studio shooting, motion graphics, and sound design.', '["Scriptwriting & concept development", "High-res 4K multi-camera studio shoot", "Professional audio mix & master", "Custom sound effects & music licensing", "3 rounds of revisions"]', 45000.00, 'fixed', '14 Days', '🎬', 1, 'active'),
('srv-02', 'Performance Ads Funnel Creative', 'performance-ads-creative', 'Paid Ads', 'High-converting UGC, TikTok spark ad concepts, Meta direct-response creatives, and YouTube Shorts ad variations engineered for sub-₹20 CAC.', 'Data-driven iterative video testing with 20+ hook & CTA variations optimized for highest ROAS.', '["20+ Hook variations", "High-conversion direct response scripts", "Custom on-screen captions & callouts", "Meta / TikTok / YouTube Shorts aspect ratios", "Weekly performance optimization report"]', 32000.00, 'fixed', '7 Days', '📈', 1, 'active'),
('srv-03', 'Creator & Talent Strategy', 'creator-talent-strategy', 'Influencer', 'Targeted matchmaking with top-tier niche creators, contract negotiation, gifting campaigns, and white-labeled creator ad whitelisting.', 'Full influencer activation lifecycle management from discovery to compliance and performance analytics.', '["Creator discovery & vetting report (15 creators)", "Contract drafting & usage rights negotiation", "Content briefing & creative direction", "Whitelisted ad access management", "ROI & conversion tracking"]', 55000.00, 'fixed', '21 Days', '⭐', 1, 'active'),
('srv-04', 'Viral Social Channel Growth & Management', 'viral-social-management', 'Social Media', 'Daily viral reel/short publishing, community management, algorithm-hacking distribution, and organic follower scaling.', 'Comprehensive organic channel takeover to build a loyal cult audience around your brand identity.', '["30 short-form video edits per month", "Captions, hashtags & SEO optimization", "Community engagement & comment handling", "Weekly algorithm trend syncing", "Monthly growth & revenue attribution report"]', 60000.00, 'monthly', 'Monthly', '🚀', 1, 'active'),
('srv-05', 'Brand Identity & Visual System', 'brand-identity-system', 'Branding', 'Bold, disruptive visual identities built for digital screens: custom typography, 3D motion assets, and viral design guidelines.', 'Complete design kit built to make your brand instantly recognizable in 0.5 seconds of scrolling.', '["Full visual guidelines & token sheet", "Social media templates (Figma/Canva)", "Animated logo stings (4K 60fps)", "Custom typography pairing kit", "App icon & favicon system"]', 28000.00, 'fixed', '10 Days', '🎨', 0, 'active');

-- --------------------------------------------------------
-- Table structure for table `quotations`
-- --------------------------------------------------------

CREATE TABLE `quotations` (
  `id` VARCHAR(64) NOT NULL,
  `quotation_number` VARCHAR(64) NOT NULL UNIQUE,
  `client_name` VARCHAR(128) NOT NULL,
  `client_company` VARCHAR(128) NOT NULL,
  `client_email` VARCHAR(128) DEFAULT NULL,
  `client_phone` VARCHAR(64) DEFAULT NULL,
  `client_address` TEXT,
  `company_name` VARCHAR(128) DEFAULT 'Leave It On Us',
  `provider_subtitle` VARCHAR(255) DEFAULT 'Creator-Led Digital Marketing & Production Agency',
  `provider_contact` VARCHAR(255) DEFAULT 'Contact / WhatsApp: +91 98765 43210 · hello@leaveitonus.com',
  `quotation_date` DATE NOT NULL,
  `valid_until` DATE NOT NULL,
  `subtotal` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `tax_rate` DECIMAL(5, 2) NOT NULL DEFAULT 18.00,
  `tax_amount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `discount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `total` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `notes` TEXT,
  `terms` LONGTEXT,
  `bank_details` TEXT,
  `status` ENUM('draft', 'sent', 'approved', 'rejected', 'expired') DEFAULT 'sent',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quotations` (`id`, `quotation_number`, `client_name`, `client_company`, `client_email`, `client_phone`, `client_address`, `company_name`, `provider_subtitle`, `provider_contact`, `quotation_date`, `valid_until`, `subtotal`, `tax_rate`, `tax_amount`, `discount`, `total`, `notes`, `terms`, `bank_details`, `status`) VALUES
('lious-quote-01', 'LIOUS/2026/041', 'Ms. Priya Sharma', 'Aura Lifestyle Apparel', 'priya.sharma@auralifestyle.in', '+91 98201 54321', 'Bandra Kurla Complex, Mumbai, Maharashtra 400051', 'Leave It On Us', 'Creator-Led Digital Marketing & Production Agency', 'Contact / WhatsApp: +91 98765 43210 · hello@leaveitonus.com', '2026-09-04', '2026-09-25', 137000.00, 18.00, 24660.00, 5000.00, 156660.00, 'Package includes full commercial broadcast and social digital ad usage rights for 12 months across Meta, YouTube, and TikTok.', '1. **Payment Milestones**: 50% advance upon project confirmation; 30% after rough-cut delivery; 20% upon final delivery of master files.\n2. **Turnaround Schedule**: First creative draft delivered within 10 business days of brief approval.\n3. **Revisions**: Up to 3 rounds of creative review included per video asset.\n4. **Usage Rights**: Full worldwide digital advertising rights for 12 months included.\n5. **Cancellation**: Advance payment is non-refundable once pre-production scripting has commenced.', 'Bank: HDFC Bank Ltd.\nA/C Name: Leave It On Us Media Private Limited\nA/C No: 50200084729103\nIFSC: HDFC0000240\nBranch: BKC Mumbai', 'sent'),
('lious-quote-02', 'LIOUS/2026/042', 'Mr. Rohan Mehta', 'Zenith Health & Nutrition', 'rohan@zenithnutrition.com', '+91 98112 34567', 'Indiranagar 100ft Road, Bengaluru, Karnataka 560038', 'Leave It On Us', 'Creator-Led Digital Marketing & Production Agency', 'Contact / WhatsApp: +91 98765 43210 · hello@leaveitonus.com', '2026-09-03', '2026-09-24', 92000.00, 18.00, 16560.00, 0.00, 108560.00, 'Performance creative campaign engineered to lower Customer Acquisition Cost on Meta Ads by minimum 25%.', '1. **Payment Terms**: 60% advance to initiate shoot and creator bookings; balance 40% on final file delivery.\n2. **Creative Assets**: All footage delivered in vertical 9:16 and 4:5 native Meta formats with raw assets available upon request.\n3. **Whitelisting**: Client will provide advertiser partnership access via Meta Business Manager.\n4. **Timeline**: 14 calendar days from product receipt at our studio.', 'Bank: ICICI Bank Ltd.\nA/C Name: Leave It On Us Media Private Limited\nA/C No: 104805003921\nIFSC: ICIC0001048\nBranch: Indiranagar Bengaluru', 'approved');

-- --------------------------------------------------------
-- Table structure for table `quotation_items`
-- --------------------------------------------------------

CREATE TABLE `quotation_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `quotation_id` VARCHAR(64) NOT NULL,
  `service_id` VARCHAR(64) DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `quantity` DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
  `unit` VARCHAR(32) DEFAULT 'Asset',
  `unit_price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `total_price` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_quotation` (`quotation_id`),
  CONSTRAINT `fk_quotation_items_quotation` FOREIGN KEY (`quotation_id`) REFERENCES `quotations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `quotation_items` (`quotation_id`, `service_id`, `title`, `description`, `quantity`, `unit`, `unit_price`, `total_price`, `sort_order`) VALUES
('lious-quote-01', 'srv-01', 'Viral Video Reel Series (Batch of 4 Episodes)', 'Scriptwriting, casting, 4K multi-camera studio production, motion graphics, and sound design optimized for Instagram Reels & YouTube Shorts.', 1.00, 'Batch (4 Videos)', 45000.00, 45000.00, 1),
('lious-quote-01', 'srv-02', 'High-Converting Meta & TikTok UGC Ad Concepts', '10 Direct-response video creatives featuring fast-paced hooks, UGC testimonials, and conversion-optimized callouts.', 2.00, 'Packages (5 Ads each)', 32000.00, 64000.00, 2),
('lious-quote-01', 'srv-05', 'Custom 3D Animated Logo Sting & Visual Asset Kit', 'Branded transitions, audio signature, and motion overlays for consistent cross-platform identity.', 1.00, 'Visual Kit', 28000.00, 28000.00, 3),
('lious-quote-02', 'srv-02', 'Performance Ad Funnel Creatives (15 Variations)', 'Direct-response performance video ads with hook variations for Meta Advantage+ campaigns.', 1.00, 'Campaign', 48000.00, 48000.00, 1),
('lious-quote-02', 'srv-03', 'Fitness Creator Matchmaking & Whitelisted Ad Access', 'Vetting 3 micro-influencers, contract handling, video brief direction, and whitelisting setup.', 1.00, 'Activation', 44000.00, 44000.00, 2);

-- --------------------------------------------------------
-- Table structure for table `blogs`
-- --------------------------------------------------------

CREATE TABLE `blogs` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `excerpt` TEXT,
  `content` LONGTEXT,
  `category` VARCHAR(64) DEFAULT 'Strategy',
  `author` VARCHAR(128) DEFAULT 'Leave It On Us Editorial',
  `read_time` VARCHAR(32) DEFAULT '5 min read',
  `image` VARCHAR(255) DEFAULT '/images/blog-default.jpg',
  `tags` JSON,
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'published',
  `published_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `blogs` (`id`, `title`, `slug`, `excerpt`, `content`, `category`, `author`, `read_time`, `image`, `tags`, `status`) VALUES
('blog-1', 'Why Creator-Led Short-Form Ads Beat Traditional Commercials 10x', 'why-creator-led-ads-beat-traditional-commercials', 'How modern D2C brands are scaling past ₹10Cr ARR by trading high-gloss TV commercials for hyper-relatable vertical creator content.', 'Modern consumers have developed banner blindness toward overly polished commercial advertisements. When a user scrolls TikTok or Instagram Reels, an ad that looks like a studio commercial is skipped in less than 0.4 seconds. Creator-led content on the other hand mimics native peer-to-peer sharing, boosting retention rates by over 340%.\n\n### The Hook Advantage\nBy testing 20+ hooks on the first 3 seconds of video, we identify the exact emotional trigger that drives purchase intent.', 'Performance', 'Leave It On Us Creative Lab', '4 min read', '/images/blog-1.jpg', '["Reels", "TikTok", "Performance Ads", "ROAS"]', 'published'),
('blog-2', 'The 3-Second Hook Rule: Engineering Viral Retention on Instagram & TikTok', 'the-3-second-hook-rule-viral-retention', 'The exact scripting framework Leave It On Us uses to capture and hold viewer attention in the first 3 seconds of scrolling.', 'Attention is the rarest currency in digital marketing today. If your video does not hook the viewer in the first 120 frames, your production budget is wasted.\n\n### Key Hook Archetypes\n1. **The Negative Hook**: "Stop doing X if you want Y."\n2. **The Visual Pattern Interrupt**: Unexpected motion or scale.\n3. **The Counter-Intuitive Claim**: Challenging industry dogma.', 'Strategy', 'Akash Saini', '6 min read', '/images/blog-2.jpg', '["Viral Marketing", "Scriptwriting", "Retention"]', 'published'),
('blog-3', 'Scaling Meta Ads in 2026: The Advantage+ Creative Testing Playbook', 'scaling-meta-ads-advantage-plus-playbook', 'Why creative variation is the new media buying targeting in Meta algorithm systems.', 'In the era of Meta Advantage+ Shopping Campaigns (ASC), manual demographic targeting has taken a back seat. The creative *is* the targeting. High-growth e-commerce brands must deploy at least 15 new creative iterations weekly.', 'Growth', 'Performance Strategy Lead', '5 min read', '/images/blog-3.jpg', '["Meta Ads", "D2C", "Advantage Plus"]', 'published');

-- --------------------------------------------------------
-- Table structure for table `enquiries`
-- --------------------------------------------------------

CREATE TABLE `enquiries` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `phone` VARCHAR(64) DEFAULT NULL,
  `company` VARCHAR(128) DEFAULT NULL,
  `service_type` VARCHAR(128) DEFAULT 'Full Agency Retainer',
  `budget_range` VARCHAR(64) DEFAULT '₹1,00,000 - ₹3,00,000',
  `timeline` VARCHAR(64) DEFAULT 'Immediate (Within 2 Weeks)',
  `message` LONGTEXT,
  `status` ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `company`, `service_type`, `budget_range`, `timeline`, `message`, `status`, `notes`) VALUES
('enq-101', 'Sameer Verma', 'sameer@veloxfootwear.com', '+91 99887 76655', 'Velox Footwear', 'Performance Ads Funnel Creative', '₹2,00,000 - ₹5,00,000', 'Immediate (Within 2 Weeks)', 'We are launching our running sneaker line next month and need 15+ creator ads for our Meta & YouTube launch campaigns. Looking for high ROAS focus.', 'new', 'Priority lead for Q3 footwear campaign launch.'),
('enq-102', 'Ananya Deshmukh', 'ananya@lumiaura.co', '+91 91234 56789', 'LumiAura Skincare', 'Creator & Talent Strategy', '₹5,00,000+', 'Next 1 Month', 'Looking for an end-to-end influencer gifting and whitelisting campaign with 25 beauty micro-creators on Instagram Reels.', 'contacted', 'Introductory strategy call scheduled for Monday 11:00 AM.');

-- --------------------------------------------------------
-- Table structure for table `seo_settings`
-- --------------------------------------------------------

CREATE TABLE `seo_settings` (
  `id` VARCHAR(64) NOT NULL,
  `page_slug` VARCHAR(128) NOT NULL UNIQUE,
  `page_name` VARCHAR(128) NOT NULL,
  `meta_title` VARCHAR(255) NOT NULL,
  `meta_description` TEXT NOT NULL,
  `keywords` TEXT,
  `og_title` VARCHAR(255) DEFAULT NULL,
  `og_description` TEXT DEFAULT NULL,
  `og_image` VARCHAR(255) DEFAULT '/images/og-image.jpg',
  `canonical_url` VARCHAR(255) DEFAULT NULL,
  `robots` VARCHAR(64) DEFAULT 'index, follow',
  `custom_head` TEXT,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `seo_settings` (`id`, `page_slug`, `page_name`, `meta_title`, `meta_description`, `keywords`, `og_title`, `og_description`, `og_image`, `canonical_url`, `robots`) VALUES
('seo-home', 'home', 'Home Page', 'Leave It On Us — Creator-Led Digital Marketing & Production Agency', 'Build Attention & Scale Revenue with Creator-Led Marketing, Performance Ads, Talent Strategy, and Original Content IP. Leave It On Us.', 'digital marketing agency, creator ads, performance marketing, short form video, influencer marketing, viral reels production', 'Leave It On Us — Digital Marketing & Video Production', 'Crafting creator-led original content, high-converting performance ads, talent strategy, and viral IP. Leave it on us.', '/images/og-image.jpg', 'https://leaveitonus.com/', 'index, follow'),
('seo-about', 'about', 'About Us', 'About Leave It On Us — Why Creator-Led Agency Beats Legacy Advertising', 'Learn how Leave It On Us re-engineers modern content marketing with creator-led agility, viral storytelling, and data-backed performance.', 'about leave it on us, creative agency founders, viral marketing team, creator agency', 'About Leave It On Us — The Creator-Led Formula', 'Our story, vision, and the formula behind scaling digital attention for modern brands.', '/images/og-image.jpg', 'https://leaveitonus.com/about', 'index, follow'),
('seo-clients', 'clients', 'Clients & Case Studies', 'Our Clients & Success Stories — Leave It On Us Media', 'Discover how brands scale view count and revenue with Leave It On Us performance creatives and talent campaigns.', 'client case studies, viral reel results, high roas campaigns, marketing portfolio', 'Leave It On Us Client Portfolio & Proof of Work', 'Trusted by high-growth startups and leading consumer brands.', '/images/og-image.jpg', 'https://leaveitonus.com/clients', 'index, follow'),
('seo-blogs', 'blogs', 'Blog & Insights', 'Digital Marketing & Content Strategy Playbooks — Leave It On Us', 'Deep dives into vertical video algorithms, Meta ad creative testing frameworks, and creator IP monetization strategies.', 'marketing playbooks, reels algorithm tips, tiktok ad strategy, D2C performance marketing', 'Leave It On Us Content & Marketing Insights', 'Actionable playbooks on digital marketing, viral video, and performance ads.', '/images/og-image.jpg', 'https://leaveitonus.com/blogs', 'index, follow'),
('seo-contact', 'contact-us', 'Contact Us', 'Start a Project With Leave It On Us — Let’s Talk Creative Scale', 'Ready to scale your brand with high-impact creator content and performance ads? Get in touch with our creative directors.', 'contact creative agency, hire video production, request marketing quotation, start project', 'Let’s Build Something Iconic — Leave It On Us', 'Get in touch for custom video production, talent strategy, and paid ad funnels.', '/images/og-image.jpg', 'https://leaveitonus.com/contact-us', 'index, follow');
