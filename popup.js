
            let currentIndex = 0; // Initialize currentIndex to track the current product

            const products = [
            { 
                image: "Reishi.png", 
                title: "Reishi", 
                description: "Boost your health with Reishi!", 
                link: "reishi - Kedi.html", 
                animation: "zoomIn", 
                rating: 4.5, 
                discount: "20% off", 
                coupon: "SAVE20", 
                uses: "Boosts immunity and overall health.", 
                ingredients: "Reishi extract, Vitamin C, Natural herbs.", 
                reviews: "This product is amazing! Highly recommend.",
                stock: "In Stock"
            },
            { 
                image: "LYCOVITE.jpg", 
                title: "LYCOVITE", 
                description: "Cure for Men's Disease.", 
                link: "reishi - Kedi.html", 
                animation: "zoomIn", 
                rating: 4.8, 
                discount: "15% off", 
                coupon: "LYCO15", 
                uses: "Improves men's health and vitality.", 
                ingredients: "Lycopene, Zinc, Herbal extracts.", 
                reviews: "Highly effective and worth the price.",
                stock: "Limited Stock"
            },
            { 
                image: "GRAPEMIN-E.png", 
                title: "GRAPEMIN E", 
                description: "Best Skin Care Product.", 
                link: "reishi - Kedi.html", 
                animation: "bounce", 
                rating: 4.7, 
                discount: "25% off", 
                coupon: "GRAPE25", 
                uses: "Enhances skin health and glow.", 
                ingredients: "Grape seed extract, Vitamin E, Aloe Vera.", 
                reviews: "My skin feels rejuvenated after using this.",
                stock: "In Stock"
            },
            { 
                image: "https://drive.google.com/file/d/1XvLdpGOv2knKbw6PX_BsugcASj3EUCoj/view?usp=drive_link", 
                title: "Vigor Essential", 
                description: "Boost energy and stamina.", 
                link: "reishi - Kedi.html", 
                animation: "bounce", 
                rating: 4.6, 
                discount: "10% off", 
                coupon: "VIGOR10", 
                uses: "Enhances stamina and vitality.", 
                ingredients: "Ginseng, Maca root, Herbal blend.", 
                reviews: "Great product for boosting energy levels.",
                stock: "Out of Stock"
            },
            { 
                image: "Hydrogen cup (1).jpg", 
                title: "Hydrogen Cup", 
                description: "Glass of Healthy Water.", 
                link: "reishi - Kedi.html", 
                animation: "fadeIn", 
                rating: 4.9, 
                discount: "30% off", 
                coupon: "HYDRO30", 
                uses: "Provides clean and healthy water.", 
                ingredients: "Hydrogen generator, BPA-free materials.", 
                reviews: "A must-have for health-conscious individuals.",
                stock: "In Stock"
            }
            ];

            function showPopup() {
            const popup = document.querySelector('.product-popup-area-section');
            const product = products[currentIndex];

            if (popup && product) {
                document.getElementById('popup-product-image').src = product.image;
                document.getElementById('popup-product-title').textContent = product.title;
                document.getElementById('popup-product-description').innerHTML = `
                <p>${product.description}</p>
                <p><strong>Rating:</strong> ${product.rating} ⭐</p>
                <p><strong>Discount:</strong> ${product.discount}</p>
                <p><strong>Coupon Code:</strong> ${product.coupon}</p>
                <p><strong>Uses:</strong> ${product.uses}</p>
                <p><strong>Ingredients:</strong> ${product.ingredients}</p>
                <p><strong>Reviews:</strong> ${product.reviews}</p>
                `;
                popup.style.display = 'flex'; // Show popup
                popup.querySelector('.product-popup-area').style.transform = 'perspective(1000px) rotateY(360deg)'; // Add 3D rotation effect

                // Automatically close the popup after 20 seconds
                setTimeout(() => {
                    popup.style.display = 'none';
                    popup.querySelector('.product-popup-area').style.transform = 'perspective(1000px) rotateY(0deg)'; // Reset 3D rotation
                }, 10000);
                // Automatically close the popup after 20 seconds
                setTimeout(() => {
                popup.style.display = 'none';
                popup.classList.remove('animate__animated', `animate__${product.animation}`);
                }, 10000);

                // Move to the next product
                currentIndex = (currentIndex + 1) % products.length;
            }
            }

            document.addEventListener('DOMContentLoaded', () => {
            setInterval(showPopup, 30000); // Show popup every 30 seconds
            });

            document.getElementById('close-second-popup').addEventListener('click', () => {
            const popup = document.querySelector('.product-popup-area-section');
            if (popup) {
                popup.style.display = 'none';
            }
            });

            // Removed duplicate showPopup function to avoid conflicts