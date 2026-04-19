-- ============================================================
-- DanielaCerrato.com — Seed Data
-- Run after schema.sql to populate example content
-- ============================================================

-- Example blog post
INSERT INTO posts (title, slug, content_html, category, published) VALUES (
  'How to Start Homeschooling Without Losing Your Mind',
  'how-to-start-homeschooling',
  '<h2>You Don''t Need to Have It All Figured Out</h2>
<p>If you''re reading this, you''re probably standing at the beginning of your homeschool journey, looking at a mountain of curricula options, state law requirements, and well-meaning opinions from every direction. Take a breath. You don''t need to have it all figured out before day one.</p>
<p>When I started homeschooling my oldest, I thought I needed the perfect schedule, the perfect curriculum, and a spotless dining room table ready for learning. What I actually needed was much simpler: faith that I was capable, and the willingness to learn alongside my children.</p>
<h2>Step 1: Know Your State Laws</h2>
<p>Every state has different requirements for homeschooling. Some require annual assessments, others a simple notification letter. Visit the HSLDA website or your state''s department of education to understand what''s required where you live before you begin.</p>
<h2>Step 2: Know Your Child</h2>
<p>Before purchasing a single curriculum, observe your child. How do they learn best? Do they thrive with structure or prefer to follow curiosity? Are they an early riser or a slow starter? Your homeschool should fit your family — not the other way around.</p>
<h2>Step 3: Start Simple</h2>
<p>For your first year, choose one core curriculum for math and language arts. Add read-alouds. Go outside. Give yourself grace. You can always add more later, but it''s much harder to scale back when you''ve over-committed and burned out by November.</p>
<h2>The Most Important Thing</h2>
<p>Remember why you started. On the hard days — and there will be hard days — come back to your <em>why</em>. For our family, it''s faith. We homeschool because we believe our children''s formation belongs first in our home, not delegated away. That conviction carries us through the messy middle.</p>
<p>You can do this. Welcome to the journey! 🌿</p>',
  'Getting Started',
  true
);

-- Example product (placeholder — real file_url needs to be uploaded)
INSERT INTO products (title, slug, description_html, price, file_url, cover_image_url) VALUES (
  'Catholic Homeschool Planner 2025–2026',
  'catholic-homeschool-planner-2025-2026',
  '<p>A beautifully designed annual planner created specifically for Catholic homeschool families. Plan your school year around the liturgical calendar, track attendance, and stay organized with weekly and monthly planning pages.</p>
<h3>What''s Included</h3>
<ul>
<li>12-month liturgical calendar (September–August)</li>
<li>Weekly lesson planning pages</li>
<li>Subject tracking grids</li>
<li>Saint feast day reference guide</li>
<li>Attendance log (meets most state requirements)</li>
<li>Notes and reflection pages</li>
</ul>
<p><strong>Format:</strong> Printable PDF, US Letter size (8.5" x 11")</p>',
  1299,
  'placeholder/planner-2025-2026.pdf',
  NULL
);

-- Example recommended products
INSERT INTO recommended_products (title, description, category, affiliate_url, featured) VALUES
(
  'The Well-Trained Mind',
  'The definitive guide to classical home education. This book completely changed how I think about homeschooling. Whether you follow classical education or not, the scope and sequence alone is worth the read.',
  'Books',
  'https://www.amazon.com/dp/0393067084',
  true
),
(
  'Memoria Press Kindergarten Package',
  'A complete, structured curriculum package for kindergarten that we''ve used and loved. Gentle, methodical, and very parent-friendly — especially if you''re new to teaching phonics.',
  'Curriculum',
  'https://www.memoriapress.com',
  true
);
