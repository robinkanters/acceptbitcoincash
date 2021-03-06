// A comma separated list of currencies to display
// Credit to bitcoincash.org for ticker code which uses CryptoCompare API

var ticker_currencies = "USD,EUR,JPY,CNY"

ticker = function(currencies) {
  var symbols = {
    USD: "$",
    CNY: "¥",
    JPY: "¥",
    EUR: "€"
  }

  $.ajax({
    type: "GET",
    url: "https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=" + currencies,
    contentType: "application/json; charset=utf-8",
    timeout: 6000,
    error: function (x, t, m) {
      if ($('#ticker_value').html() === '<li>Loading&hellip;</li>') {
        $('#ticker_value').html("<li><em>Problem loading prices from CryptoCompare API. Please try again later.</em></li>");
      }
    },
    success: function (currencyRates) {
      var output = [];

      $.each(currencyRates, function (currency, price) {
        var sym = symbols[currency];
        if (sym === undefined) {
          sym = "";
        }
        output.push("<li>BCH <span class=\"curr-symbol\">" + sym + "</span> " + currency + "<span class=\"curr-price\">" + price + "</span></li>");
      });

      $('#ticker_value').html(output);
    }
  }).done(function () {
    setTimeout(function(){ ticker(ticker_currencies); }, 30000);
  }).fail(function() {
    setTimeout(function(){ ticker(ticker_currencies); }, 30000);
  });
}

ticker(ticker_currencies);
