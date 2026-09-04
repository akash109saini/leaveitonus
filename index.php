<?php
// Auto-redirect to the active Nuxt 3 development server
$nuxt_url = "http://localhost:3000";

// Check if Nuxt is reachable or redirect immediately
header("Location: " . $nuxt_url);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=http://localhost:3000">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leave It On Us — Redirecting...</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0B0B0C;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      text-align: center;
    }
    .card {
      background: #141416;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 40px;
      max-width: 480px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    h1 { color: #FFE300; margin-top: 0; font-size: 24px; }
    p { color: #A1A1AA; font-size: 15px; line-height: 1.6; }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 28px;
      background: #FFE300;
      color: #000000;
      font-weight: 700;
      text-decoration: none;
      border-radius: 9999px;
      transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Leave It On Us</h1>
    <p>Redirecting to the live application at <a href="http://localhost:3000" style="color: #FFE300;">localhost:3000</a>...</p>
    <a href="http://localhost:3000" class="btn">Open App Now →</a>
  </div>
</body>
</html>
