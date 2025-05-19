// Car models database
const carModels = {
    'BMW': [
        '1 Series (E81, E82, E87, E88)',
        '2 Series (F22, F23)',
        '3 Series (E90, E91, E92, E93, F30, F31, F34)',
        '4 Series (F32, F33, F36)',
        '5 Series (E60, E61, F10, F11)',
        '6 Series (E63, E64, F12, F13)',
        '7 Series (E65, E66, F01, F02)',
        'X1 (E84, F48)',
        'X3 (E83, F25)',
        'X5 (E70, F15)',
        'X6 (E71, F16)',
        'M3 (E92, F80)',
        'M5 (E60, F10)'
    ],
    'Mercedes': [
        'A-Class (W169, W176)',
        'B-Class (W245, W246)',
        'C-Class (W203, W204, W205)',
        'E-Class (W211, W212, W213)',
        'S-Class (W221, W222)',
        'CLA (C117)',
        'CLS (W218, W219)',
        'GLA (X156)',
        'GLC (X253)',
        'GLE (W166)',
        'GLK (X204)',
        'ML (W164, W166)',
        'AMG GT',
        'G-Class (W463)'
    ],
    'VW': [
        'Golf (Mk5, Mk6, Mk7, Mk8)',
        'Passat (B6, B7, B8)',
        'Tiguan (5N, AD)',
        'Polo (6R, 6C, AW)',
        'Arteon (3H)',
        'T-Roc',
        'ID.3',
        'ID.4',
        'Touareg (7P, CR)',
        'Jetta (1K, 16)',
        'Caddy',
        'Transporter (T5, T6)'
    ],
    'Audi': [
        'A3 (8P, 8V)',
        'A4 (B7, B8, B9)',
        'A5 (8T, F5)',
        'A6 (C6, C7, C8)',
        'A7 (4G, 4K)',
        'A8 (D3, D4, D5)',
        'Q3 (8U, F3)',
        'Q5 (8R, FY)',
        'Q7 (4L, 4M)',
        'TT (8J, 8S)',
        'RS4',
        'RS6'
    ]
};

// Parts database
const carParts = {
    'BMW': {
        'parts': [
            { name: 'Маслен филтър', number: '11427566327', price: '42.99', models: ['3 Series', '5 Series'] },
            { name: 'Въздушен филтър', number: '13717532754', price: '65.99', models: ['3 Series', '5 Series', '7 Series'] },
            { name: 'Спирачни дискове', number: '34116854998', price: '245.99', models: ['3 Series'] },
            { name: 'Амортисьори', number: '31316796940', price: '299.99', models: ['3 Series'] },
            { name: 'Съединител комплект', number: '21207573616', price: '849.99', models: ['3 Series', '5 Series'] }
        ]
    },
    'Mercedes': {
        'parts': [
            { name: 'Маслен филтър', number: 'A2761800009', price: '49.99', models: ['C-Class', 'E-Class'] },
            { name: 'Въздушен филтър', number: 'A2750940004', price: '75.99', models: ['A-Class', 'B-Class'] },
            { name: 'Спирачни дискове', number: 'A2304210512', price: '289.99', models: ['C-Class', 'E-Class'] },
            { name: 'Амортисьори', number: 'A2053200130', price: '389.99', models: ['C-Class'] },
            { name: 'Турбокомпресор', number: 'A6510900086', price: '1899.99', models: ['E-Class', 'C-Class'] }
        ]
    },
    'VW': {
        'parts': [
            { name: 'Маслен филтър', number: '03L115562', price: '45.99', models: ['Golf', 'Passat', 'Tiguan'] },
            { name: 'Въздушен филтър', number: '5Q0129620B', price: '55.99', models: ['Golf', 'Passat'] },
            { name: 'Спирачни дискове', number: '1K0615301AA', price: '189.99', models: ['Golf', 'Jetta'] },
            { name: 'Амортисьори', number: '5Q0413031GH', price: '279.99', models: ['Golf', 'Passat'] },
            { name: 'Турбокомпресор', number: '04E145721L', price: '1599.99', models: ['Golf', 'Passat', 'Tiguan'] }
        ]
    },
    'Audi': {
        'parts': [
            { name: 'Маслен филтър', number: '06L115562', price: '49.99', models: ['A4', 'A6', 'Q5'] },
            { name: 'Въздушен филтър', number: '8K0133843C', price: '65.99', models: ['A4', 'A5', 'Q5'] },
            { name: 'Спирачни дискове', number: '8K0615301A', price: '219.99', models: ['A4', 'A5'] },
            { name: 'Амортисьори', number: '8K0413031BH', price: '299.99', models: ['A4', 'A5'] },
            { name: 'Турбокомпресор', number: '06H145702S', price: '1799.99', models: ['A4', 'A6', 'Q5'] }
        ]
    }
};

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('input[placeholder*="Търсете"]');
    const searchButton = document.querySelector('.fa-search').closest('button');
    if (!searchInput || !searchButton) return;

    // Update search input styling
    searchInput.classList.add('text-gray-900');
    searchInput.style.backgroundColor = '#ffffff';

    // Get results container
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;

    // Add click handler for search button
    searchButton.addEventListener('click', function() {
        if (searchInput.value.length > 0) {
            // Trigger search if there's input
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
            resultsContainer.classList.remove('hidden');
        } else {
            // Focus the input if empty
            searchInput.focus();
        }
    });
    
    const resultsContent = resultsContainer.querySelector('div');
    if (!resultsContent) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Always show results container when typing
        resultsContainer.classList.remove('hidden');
        
        if (searchTerm.length < 2) {
            resultsContent.innerHTML = `
                <div class="px-4 py-2 text-gray-600">
                    Въведете поне 2 символа...
                </div>
            `;
            return;
        }

        let results = [];

        // Search through brands and models
        for (const [brand, models] of Object.entries(carModels)) {
            // Search in brand name
            if (brand.toLowerCase().includes(searchTerm)) {
                results.push({
                    type: 'brand',
                    text: brand,
                    subtext: `${models.length} модела`,
                    url: `${brand.toLowerCase()}-parts.html`
                });

                // Add first few models for this brand
                models.slice(0, 3).forEach(model => {
                    results.push({
                        type: 'model',
                        text: `${brand} ${model}`,
                        url: `${brand.toLowerCase()}-parts.html`
                    });
                });

                // Add first few parts for this brand
                if (carParts[brand]) {
                    carParts[brand].parts.slice(0, 3).forEach(part => {
                        results.push({
                            type: 'part',
                            text: `${part.name}`,
                            subtext: `${brand} | Номер: ${part.number} | Цена: ${part.price} лв.`,
                            url: `${brand.toLowerCase()}-parts.html`
                        });
                    });
                }
            }

            // Search in models
            models.forEach(model => {
                if (model.toLowerCase().includes(searchTerm)) {
                    results.push({
                        type: 'model',
                        text: `${brand} ${model}`,
                        url: `${brand.toLowerCase()}-parts.html`
                    });
                }
            });

            // Search in parts
            if (carParts[brand]) {
                carParts[brand].parts.forEach(part => {
                    if (part.name.toLowerCase().includes(searchTerm) || 
                        part.number.toLowerCase().includes(searchTerm)) {
                        results.push({
                            type: 'part',
                            text: `${part.name}`,
                            subtext: `${brand} | Номер: ${part.number} | Цена: ${part.price} лв.`,
                            url: `${brand.toLowerCase()}-parts.html`
                        });
                    }
                });
            }
        }

        // Display results
        if (results.length > 0) {
            resultsContent.innerHTML = results.map(result => `
                <a href="${result.url}" class="block px-4 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-0">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-primary font-medium">${result.text}</div>
                            ${result.subtext ? `<div class="text-sm text-gray-600">${result.subtext}</div>` : ''}
                        </div>
                        <div class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            ${result.type === 'brand' ? 'Марка' : result.type === 'model' ? 'Модел' : 'Част'}
                        </div>
                    </div>
                </a>
            `).join('');
            resultsContainer.classList.remove('hidden');
        } else {
            resultsContent.innerHTML = `
                <div class="px-4 py-2 text-gray-600">
                    Не са намерени резултати
                </div>
            `;
            resultsContainer.classList.remove('hidden');
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.add('hidden');
        }
    });

    // Handle keyboard navigation
    searchInput.addEventListener('keydown', function(e) {
        const items = resultsContainer.querySelectorAll('a');
        let currentIndex = Array.from(items).findIndex(item => item === document.activeElement);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < items.length - 1) {
                    items[currentIndex + 1].focus();
                } else {
                    items[0].focus();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    items[currentIndex - 1].focus();
                } else {
                    items[items.length - 1].focus();
                }
                break;
            case 'Enter':
                if (document.activeElement.tagName === 'A') {
                    document.activeElement.click();
                }
                break;
            case 'Escape':
                resultsContainer.classList.add('hidden');
                searchInput.blur();
                break;
        }
    });
});
