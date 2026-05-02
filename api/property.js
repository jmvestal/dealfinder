export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { zip, beds } = req.query;
  if (!zip || !/^\d{5}$/.test(zip)) {
    return res.status(400).json({ error: 'valid 5-digit zip required' });
  }

  // B25077_001E = median home value
  // B25031_001E = median gross rent (all units)
  // B25031_003E = 1BR, B25031_004E = 2BR, B25031_005E = 3BR
  const years = ['2023', '2022', '2021'];
  for (const year of years) {
    try {
      const url = `https://api.census.gov/data/${year}/acs/acs5?get=B25077_001E,B25031_001E,B25031_003E,B25031_004E,B25031_005E&for=zip%20code%20tabulation%20area:${zip}&key=DEMO_KEY`;
      const r = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!r.ok) continue;
      const data = await r.json();
      if (!data || data.length < 2) continue;
      const price  = parseInt(data[1][0]);
      const rentAll = parseInt(data[1][1]);
      const rent1br = parseInt(data[1][2]);
      const rent2br = parseInt(data[1][3]);
      const rent3br = parseInt(data[1][4]);

      // Use bedroom-specific rent when beds is provided
      const bedsNum = parseInt(beds) || 0;
      let rent = rentAll;
      if (bedsNum === 1 && rent1br > 0) rent = rent1br;
      else if (bedsNum === 2 && rent2br > 0) rent = rent2br;
      else if (bedsNum >= 3 && rent3br > 0) rent = rent3br;

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
