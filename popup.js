      const products = [
            {
                title: "Kedi Vigor Essential Capsules",
                image: "placeholder.jpg",
                description: "A herbal supplement designed to boost energy, vitality, and overall well-being.",
                rating: "⭐⭐⭐⭐ (4.5/5)",
                discount: "15% Off",
                coupon: "VIGOR15",
                uses: "Enhances stamina, supports immune function, and improves overall vitality.",
                ingredients: "Ginseng extract, Maca root, Vitamin B complex",
                reviews: "Great energy booster! I feel more active throughout the day."
            },
            // Add 9 more products here...
        ];

        function showPopup() {
            const product = products[Math.floor(Math.random() * products.length)];
            document.getElementById("product-title").textContent = product.title;
            document.getElementById("product-image").src = product.image;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-rating").textContent = product.rating;
            document.getElementById("product-discount").textContent = product.discount;
            document.getElementById("product-coupon").textContent = product.coupon;
            document.getElementById("product-uses").textContent = product.uses;
            document.getElementById("product-ingredients").textContent = product.ingredients;
            document.getElementById("product-reviews").textContent = product.reviews;
            
            document.getElementById("product-popup").style.display = "block";
        }

        function closePopup() {
            document.getElementById("product-popup").style.display = "none";
        }

        function schedulePopup() {
            const randomTime = Math.floor(Math.random() * 10 + 1) * 60000; // 1 to 10 minutes
            setTimeout(() => {
                showPopup();
                schedulePopup(); // Schedule next popup
            }, randomTime);
        }

        schedulePopup();