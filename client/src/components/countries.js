let twoLetterISO = [
    "ae","ar","at","au","be","bg","br","ca","ch","cn","co","cu","cz","de","eg",
    "fr","gb","gr","hk","hu","id","ie","il","in","it","jp","kr","lt","lv","ma",
    "mx","my","ng","nl","no","nz","ph","pl","pt","ro","rs",
    "ru","sa","se","sg","si","sk","th","tr","tw","ua","us","ve","za"
];

var isoCountries = {
    'AF': 'Afghanistan',
    'AX': 'Aland Islands',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'AS': 'American Samoa',
    'AD': 'Andorra',
    'AO': 'Angola',
    'AI': 'Anguilla',
    'AQ': 'Antarctica',
    'AG': 'Antigua And Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AW': 'Aruba',
    'AU': 'Australia',
    'AT': 'Austria',
    'AZ': 'Azerbaijan',
    'BS': 'Bahamas',
    'BH': 'Bahrain',
    'BD': 'Bangladesh',
    'BB': 'Barbados',
    'BY': 'Belarus',
    'BE': 'Belgium',
    'BZ': 'Belize',
    'BJ': 'Benin',
    'BM': 'Bermuda',
    'BT': 'Bhutan',
    'BO': 'Bolivia',
    'BA': 'Bosnia And Herzegovina',
    'BW': 'Botswana',
    'BR': 'Brazil',
    'BG': 'Bulgaria',
    'CA': 'Canada',
    'CN': 'China',
    'CO': 'Colombia',
    'CU': 'Cuba',
    'CZ': 'Czech Republic',
    'DE': 'Germany',
    'EG': 'Egypt',
    'FR': 'France',
    'GB': 'United Kingdom',
    'GR': 'Greece',
    'HK': 'Hong Kong',
    'HU': 'Hungary',
    'ID': 'Indonesia',
    'IE': 'Ireland',
    'IL': 'Israel',
    'IN': 'India',
    'IT': 'Italy',
    'JP': 'Japan',
    'KR': 'Korea',
    'LT': 'Lithuania',
    'LV': 'Latvia',
    'MA': 'Morocco',
    'MX': 'Mexico',
    'MY': 'Malaysia',
    'NG': 'Nigeria',
    'NL': 'Netherlands',
    'NO': 'Norway',
    'NZ': 'New Zealand',
    'PH': 'Philippines',
    'PL': 'Poland',
    'PT': 'Portugal',
    'RO': 'Romania',
    'RS': 'Serbia',
    'RU': 'Russia',
    'SA': 'Saudi Arabia',
    'SE': 'Sweden',
    'SG': 'Singapore',
    'SI': 'Slovenia',
    'SK': 'Slovakia',
    'TH': 'Thailand',
    'TR': 'Turkey',
    'TW': 'Taiwan',
    'UA': 'Ukraine',
    'US': 'United States',
    'VE': 'Venezuela',
    'ZA': 'South Africa'
};

// Function to get country name
function getCountryName(countryCode) {
    return isoCountries[countryCode] || `Unknown (${countryCode})`;
}

let countries = []; 
twoLetterISO.forEach(element => {
    let countryCode = element.toUpperCase(); // Convert to uppercase to match keys in isoCountries

    let obj = {
        iso_2_alpha: element,
        png: `https://flagcdn.com/24x18/${element}.png`,
        countryName: getCountryName(countryCode),
    };
    countries.push(obj); 
});

console.log(countries);

export default countries;
