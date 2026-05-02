export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { zip } = req.query;
  if (!zip || !/^\d{5}$/.test(zip)) {
    return res.status(400).json({ error: 'valid 5-digit zip required' });
  }

  // Try Census ACS 5-year estimates — zip-level median home value + gross rent
  // Server-side so no CORS issues; DEMO_KEY allows 500 req/day
  const years = ['2022', '2021'];
  for (const year of years) {
    try {
      const url = `https://api.census.gov/data/${year}/acs/acs5?get=B25077_001E,B25031_001E&for=zip%20code%20tabulation%20area:${zip}&key=DEMO_KEY`;
      const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!r.ok) continue;
      const data = await r.json();
      if (!data || data.length < 2) continue;
      const price = parseInt(data[1][0]);
      const rent  = parseInt(data[1][1]);
      if (price > 0 || rent > 0) {
        return res.json({
          price: price > 0 ? price : null,
          rent:  rent  > 0 ? rent  : null,
          source: `census_acs_${year}`
        });
      }
    } catch (_) {}
  }

  return res.json({ price: null, rent: null, source: 'none' });
}
