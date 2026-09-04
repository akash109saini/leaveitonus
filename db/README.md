# Leave It On Us — Database Documentation

This folder contains the complete SQL database dump and schemas for **Leave It On Us**.

---

## Files in this Directory

- **[`leaveitonus_db.sql`](./leaveitonus_db.sql)**: Full MySQL database creation script with table definitions, foreign keys, indexes, and initial seed data for all modules.

---

## Database Architecture

| Table | Description |
| :--- | :--- |
| **`admins`** | Authentication credentials, permissions, and roles for the admin portal. |
| **`blogs`** | Creator marketing articles, thought leadership playbooks, tags, and publication statuses. |
| **`services`** | Creative agency service catalog (Original IP, Performance Ads, Talent Strategy, Socials). |
| **`quotations`** | Client service quotations with custom company metadata, milestones, discounts, taxes, and bank info. |
| **`quotation_items`** | Line items breakdown linked to service IDs and quotation records. |
| **`enquiries`** | Lead capture enquiries from the public website contact form with statuses & follow-up notes. |
| **`seo_settings`** | Dynamic SEO titles, meta descriptions, OpenGraph tags, canonicals, and robots instructions per route. |

---

## Quick Import Guide

### Option 1: Via phpMyAdmin (XAMPP)
1. Open [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/) in your browser.
2. Click **Import** in the top navigation bar.
3. Click **Choose File** and select `db/leaveitonus_db.sql`.
4. Click **Go / Import** at the bottom.

### Option 2: Via MySQL Command Line
```bash
# Default XAMPP MySQL import
/Applications/XAMPP/xamppfiles/bin/mysql -u root < db/leaveitonus_db.sql

# Or standard MySQL
mysql -u root -p < db/leaveitonus_db.sql
```
