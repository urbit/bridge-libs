
export default async function getSuggestedGasPrice(networkType, defaultGwei=40, maxGwei=80) {
  switch (network.toUpperCase()) {
    case 'ROPSTEN':  // xx network types
      return 10;
    case 'OFFLINE':  // xx network types
      return DEFAULT_GAS_PRICE_GWEI;
    case 'LOCAL':  // xx network types
    default:
      try {
        const response = await fetch(
          'https://ethgasstation.info/json/ethgasAPI.json',
          {
            method: 'GET',
            cache: 'no-cache',
          }
        );

        const json = await response.json();

        // ethgasstation returns values in floating point, one order of magitude
        // more than gwei. see: https://docs.ethgasstation.info
        const suggestedGasPrice = Math.ceil(json.fast / 10); // to gwei

        // we don't want to charge users more than the gas tank funds
        return Math.min(suggestedGasPrice, maxGwei);
      } catch (e) {
        return defaultGwei;
      }
  }
}
