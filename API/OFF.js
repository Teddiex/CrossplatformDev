
const apiURL = 'https://world.openfoodfacts.net';

export function getProductInfoFromApi(barcode){
    const url = apiURL + '/api/v2/product/' + barcode + '.json';
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function parseProductInfoFromApi(json, barcode){
    if (json.status !== 0 && json.code && json.code.length > 0){
        let jsonProduct = json.product;

        return {
            _id: json.code,
            product_name: jsonProduct.product_name,
            image_url: jsonProduct.image_url,
            quantity: jsonProduct.quantity,
            brands: jsonProduct.brands,
            categories: jsonProduct.categories,
            ingredients_text: jsonProduct.ingredients_text,
            nutrition_grades: jsonProduct.nutrition_grades,
            nutriments: jsonProduct.nutriments,
            nova_group: jsonProduct.nova_group
        };
    }
        else{
            return{
                _id: barcode,
                product_name: 'Product not found',
                brands: 'Brand not found',
                nutriments: {
                    'energy-kcal': '0',
                    'energy-kcal-unit': 'kcal',
                    'carbohydrates': '0',
                    'carbohydrates_unit': 'g',
                    'proteins_100g': '0',
                    'proteins_unit': 'g',
                    'fat_100g': '0',
                    'fat_unit': 'g'
                }
            };
        
    }
}

export function searchAPI(query){
    // Fetch data from the API, this is basically just searching the website
    // Fetching product name, brands and nutriments only atm
    return fetch(`https://world.openfoodfacts.net/cgi/search.pl?search_terms=${query}&page_size=10&json=1&fields=product_name,brands,nutriments,code`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}



