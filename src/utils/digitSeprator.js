export function formatPrice(price) {
    // Convert the number to a string
    let priceString = price.toString();

    // Use a regular expression to add commas as thousands separators
    let formattedPrice = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedPrice;
}
export function addSlashes(str) {
    return str.match(/.{1,2}/g).join('/');
  }