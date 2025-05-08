function searchCountry() {
    var name = document.getElementById("searchBox").value;
    var url = "https://restcountries.com/v3.1/name/" + name;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById("resultArea").innerHTML = ""; // Clear previous results
        document.getElementById("messageArea").textContent = ""; // Clear message
  
        if (data && data.length > 0) {
          var countryFound = false;
  
          for (var i = 0; i < data.length; i++) {
            var country = data[i];
            if (country.name.common.toLowerCase() === name.toLowerCase()) {
              countryFound = true;
              displayCountry(country);
              break; 
            }
          }
  
          if (!countryFound) {
            document.getElementById("messageArea").textContent = "Exact country not found.";
          }
        } else {
          document.getElementById("messageArea").textContent = "Country not found.";
        }
      })
      .catch(error => {
        document.getElementById("resultArea").innerHTML = ""; // Clear previous results
        document.getElementById("messageArea").textContent = "Country not found.";
      });
  
    document.getElementById("searchBox").value = ""; // Clear the search box
  }
  
  function displayCountry(country) {
    var resultDiv = document.getElementById("resultArea");
    resultDiv.innerHTML = ""; // Clear previous result
    
    var currencyCode = "";
    var currencyName = "";
    var currencySymbol = "";
  
    for (var key in country.currencies) {
      currencyCode = key;
      currencyName = country.currencies[key].name;
      currencySymbol = country.currencies[key].symbol;
      break;
    }
  
    var languageText = "";
    var count = 0;
    for (var lang in country.languages) {
      if (count > 0) {
        languageText += ", ";
      }
      languageText += country.languages[lang];
      count++;
    }
  
    var newDiv = document.createElement("div");
    newDiv.className = "country-card";
  
    newDiv.innerHTML =
      "<h2>" + country.name.common + "</h2>" +
      "<img src='" + country.flags.png + "' alt='Flag' width='200'>" +
      "<p><strong>Capital:</strong> " + country.capital[0] + "</p>" +
      "<p><strong>Currency:</strong> " + currencyName + " (" + currencySymbol + ")</p>" +
      "<p><strong>Population:</strong> " + country.population.toLocaleString() + "</p>" +
      "<p><strong>Region:</strong> " + country.region + "</p>" +
      "<p><strong>Languages:</strong> " + languageText + "</p>";
  
    resultDiv.appendChild(newDiv);
  }
  