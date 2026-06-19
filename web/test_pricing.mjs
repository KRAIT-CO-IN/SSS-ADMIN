// Self-check for variant price scaling. Mirrors gramsOf/autoVariantPrice in admin-pages.jsx.
// Run: node web/test_pricing.mjs
import assert from "node:assert";

function gramsOf(w) {
  const m = String(w || "").trim().match(/^([\d.]+)\s*(kg|gms?|g|grams?)?$/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (!isFinite(n)) return null;
  return /^k/i.test(m[2] || "g") ? n * 1000 : n;
}
function autoVariantPrice(baseWeight, basePrice, w) {
  const bg = gramsOf(baseWeight), vg = gramsOf(w), bp = parseFloat(basePrice);
  if (!bg || !vg || !isFinite(bp)) return null;
  return Math.round((bp / bg) * vg);
}

assert.equal(gramsOf("100g"), 100);
assert.equal(gramsOf("1kg"), 1000);
assert.equal(gramsOf("1.5 KG"), 1500);
assert.equal(gramsOf("250 gm"), 250);
assert.equal(gramsOf("1 pack"), null);   // non-weight → not computable
assert.equal(gramsOf(""), null);

assert.equal(autoVariantPrice("100g", "50", "250g"), 125);   // 50 per 100g → 250g = 125
assert.equal(autoVariantPrice("100g", "50", "1kg"), 500);
assert.equal(autoVariantPrice("250g", "100", "100g"), 40);
assert.equal(autoVariantPrice("100g", "", "250g"), null);    // no base price
assert.equal(autoVariantPrice("1 pack", "50", "250g"), null); // base not a weight

console.log("pricing self-check OK");
