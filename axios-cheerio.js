const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
  const args = process.argv.slice(2);
  const postCode = args[0] || 2000;
  const url = `https://www.domain.com.au/rent/?postcode=${postCode}&excludedeposittaken=1`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const noOfProperties = $('h1>strong').text();
    console.log(`${noOfProperties} are open for rent in ${postCode} postcode of Australia on Domain`);
  } catch (e) {
    console.error(`Error while fetching rental properties for ${postCode} - ${e.message}`);
  }
})();
