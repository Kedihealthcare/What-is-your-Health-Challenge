(function() {
    // --- Start of Chatbot Logic ---

    // === Constants ===
    const WHATSAPP_BUSINESS_LINK = "https://wa.me/message/WNGLZNUXKXXIF1";
    // Gemini API Key (leave empty for Canvas runtime - Canvas will inject it)
    const API_KEY = "";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    // === Data Definitions ===
    // Products Data - Reordered for specific product matching first
    const products = [{
        name: "Small Reishi",
        keywords: /small reishi|small lingzhi|small ganoderma/i,
        image: "https://via.placeholder.com/150/0000FF/808080?text=Small+Reishi",
        description: "Immune-boosting and anti-fatigue properties in a smaller pack.",
        price: "₦15,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: [{
            question: "How often should I take Small Reishi?",
            answer: "Typically, Small Reishi is taken once or twice daily, but always refer to the product packaging for precise dosage instructions or consult a healthcare professional."
        }, {
            question: "Is Small Reishi good for liver health?",
            answer: "Yes, Small Reishi is well-known for its hepatoprotective properties and can support liver function."
        }]
    }, {
        name: "Reishi",
        keywords: /reishi|lingzhi|ganoderma/i,
        image: "https://via.placeholder.com/150/0000FF/808080?text=Reishi",
        description: "Immune-boosting and anti-fatigue properties.",
        price: "₦35,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: [{
            question: "How often should I take Reishi?",
            answer: "Typically, Reishi is taken once or twice daily, but always refer to the product packaging for precise dosage instructions or consult a healthcare professional."
        }, {
            question: "Is Reishi good for liver health?",
            answer: "Yes, Reishi is well-known for its hepatoprotective properties and can support liver function."
        }]
    }, {
        name: "Packet Re-Vive",
        keywords: /packet re-vive|revive packet|small revive/i,
        image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Packet+Re-Vive",
        description: "Supports male sexual health and vitality in a convenient packet.",
        price: "₦16,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: [{
            question: "What are the main benefits of Packet Re-Vive?",
            answer: "Packet Re-Vive primarily enhances male sexual function, increases libido, and improves overall vitality."
        }, {
            question: "Are there any side effects of Packet Re-Vive?",
            answer: "Generally, Packet Re-Vive is well-tolerated. For specific concerns, it's best to consult your doctor."
        }]
    }, {
        name: "Re-Vive",
        keywords: /re-vive|revive|sexual health male/i,
        image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Re-Vive",
        description: "Supports male sexual health and vitality.",
        price: "₦44,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: [{
            question: "What are the main benefits of Re-Vive?",
            answer: "Re-Vive primarily enhances male sexual function, increases libido, and improves overall vitality."
        }, {
            question: "Are there any side effects?",
            answer: "Generally, Re-Vive is well-tolerated. For specific concerns, it's best to consult your doctor."
        }]
    }, {
        name: "Small Cordy Active",
        keywords: /small cordy active|small cordy/i,
        image: "https://via.placeholder.com/150/008000/FFFFFF?text=Small+CordyActive",
        description: "Enhances stamina, athletic performance, and respiratory health in a smaller size.",
        price: "₦14,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Cordy Active",
        keywords: /cordy active|stamina|athletic performance|respiratory health/i,
        image: "https://via.placeholder.com/150/008000/FFFFFF?text=CordyActive",
        description: "Enhances stamina, athletic performance, and respiratory health.",
        price: "₦25,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Small Cordy Royal Jelly",
        keywords: /small cordy royal jelly|small cordyceps|small royal jelly|small cordy|small jelly/i,
        image: "https://via.placeholder.com/150/FFFF00/000000?text=Small+CordyRoyal",
        description: "Comprehensive health benefits, combining Cordyceps and Royal Jelly in a smaller pack.",
        price: "₦14,200",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Cordy Royal Jelly",
        keywords: /cordy royal jelly|cordyceps|royal jelly/i,
        image: "https://via.placeholder.com/150/FFFF00/000000?text=CordyRoyal",
        description: "Comprehensive health benefits, combining Cordyceps and Royal Jelly.",
        price: "₦36,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Small Golden Hypha",
        keywords: /small golden hypha|golden hypha small/i,
        image: "https://via.placeholder.com/150/C0C0C0/000000?text=Small+GoldenHypha",
        description: "Powerful immune system booster and anti-cancer properties in a smaller size.",
        price: "₦17,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Golden Hypha",
        keywords: /golden hypha|immune booster|anti-cancer|anti-tumor/i,
        image: "https://via.placeholder.com/150/C0C0C0/000000?text=GoldenHypha",
        description: "Powerful immune system booster and anti-cancer properties.",
        price: "₦50,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Reishi (Blood Tonic)",
        keywords: /reishi blood tonic|blood health|anemia|iron deficiency/i,
        image: "https://via.placeholder.com/150/000080/FFFFFF?text=Reishi+Blood+Tonic",
        description: "Supports blood health, liver function, and overall well-being.",
        price: "₦28,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Hydrogen Cup",
        keywords: /hydrogen cup|alkaline water|antioxidant water|hydrogen rich water/i,
        image: "https://via.placeholder.com/150/ADD8E6/000000?text=Hydrogen+Cup",
        description: "Generates hydrogen-rich alkaline water for enhanced hydration and antioxidant benefits.",
        price: "₦75,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "device", // Added type
        qna: [{
            question: "What are the benefits of hydrogen water?",
            answer: "Hydrogen water is believed to have antioxidant properties, reduce inflammation, and improve cellular health."
        }, {
            question: "How often should I use the Hydrogen Cup?",
            answer: "You can use the Hydrogen Cup daily to make hydrogen-rich water for regular consumption."
        }]
    }, {
        name: "Sulphur Anti-Acne Soap",
        keywords: /sulphur anti-acne soap|acne soap|pimple soap|pimples|blackheads|Readness|Body odour|skin care|sulphur soap/i,
        image: "https://via.placeholder.com/150/F0E68C/000000?text=Sulphur+Soap",
        description: "A specialized soap formulated with sulfur to help treat acne, control oil, and cleanse pores.",
        price: "₦5,500",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "soap", // Added type
        qna: [{
            question: "How does Sulphur Anti-Acne Soap work?",
            answer: "Sulfur helps to dry out the skin, remove dead skin cells, and has antibacterial properties that can reduce acne breakouts."
        }, {
            question: "Can I use this soap daily?",
            answer: "It's generally recommended to start with once a day and increase to twice daily if tolerated, as sulfur can be drying. Consult a dermatologist if you have sensitive skin."
        }, {
            question: "Can I use this soap with other acne treatments?",
            answer: "It's best to consult with a dermatologist before combining treatments to avoid irritation."
        }, {
            question: "Can I use it for pimples?",
            answer: "Yes, this soap is designed to help treat acne and pimples. However, it's important to use it as directed and consult a dermatologist if you have any concerns."
        }]
    }, {
        name: "Pearl Whitening Soap",
        keywords: /pearl whitening soap|whitening soap|brighten skin|lighten skin|pigmentation/i,
        image: "https://via.placeholder.com/150/F8F8FF/000000?text=Pearl+Whitening+Soap",
        description: "Reveals radiance, lightens dark spots, reduces pigmentation, and promotes healthy, brighter skin.",
        price: "₦5,500",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "soap", // Added type
        qna: [{
            question: "How long does it take to see visible results?",
            answer: "Visible improvement in skin tone and texture can typically be seen after a month of consistent use, depending on individual skin type and condition. Long-term use yields better and more sustainable results."
        }, {
            question: "Can Pearl Whitening Soap help with acne?",
            answer: "It has little effect on acne as the papaya extract helps to exfoliate dead skin cells and clear pores, however, for acne skin, we recommend you to use our Sulfur Anti-acne Soap for better result."
        }, {
            question: "Will Pearl Whitening Soap lighten my skin unnaturally or bleach it?",
            answer: "Pearl Whitening Soap does not bleach. It promotes a natural glow and even skin tone by reducing dark spots, pigmentation, and dullness. It does not strip the skin but enhances your natural complexion through consistent use."
        }]
    }, {
        name: "Nano Silver Antibacterial Soap",
        keywords: /nano-silver antibacterial soap|antibacterial soap|germ shield|deep cleansing|skin hygiene/i,
        image: "https://via.placeholder.com/150/E0FFFF/000000?text=Nano-Silver+Soap",
        description: "Formulated with Nano Silver to eliminate harmful bacteria for clean & healthy skin, provides deep cleansing, and maintains skin barrier.",
        price: "₦5,500",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "soap", // Added type
        qna: [{
            question: "How does Nano-Silver Antibacterial Soap work?",
            answer: "Nano-silver particles can deeply penetrate skin, eliminating harmful bacteria, fungi, and other microbes that cause infections, body odor, and irritation. It also promotes the repair and regeneration of damaged cells."
        }, {
            question: "Is Nano-Silver Antibacterial Soap gentle on sensitive skin?",
            answer: "Yes, it is gentle on overall skin protection, leaving skin refreshed, soft, and protected after each use. Many users report no irritation even with daily use."
        }]
    }, {
        name: "Diawell",
        keywords: /diawell|diabetes|blood sugar/i,
        image: "https://via.placeholder.com/150/00FFFF/000000?text=Diawell",
        description: "Helps manage blood sugar levels and supports pancreatic health.",
        price: "₦33,600",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: [{
            question: "Can Diawell replace my diabetes medication?",
            answer: "No, Diawell is a supplement and should not replace prescribed diabetes medication. Always consult your doctor before making any changes to your medication."
        }]
    }, {
        name: "Golden Six",
        keywords: /golden six|hormonal balance|kidney liver/i,
        image: "https://via.placeholder.com/150/FF8000/FFFFFF?text=GoldenSix",
        description: "Supports hormonal balance, strengthens the kidney and liver, anti-aging.",
        price: "₦15,500",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Cello Q10",
        keywords: /cello q10|cardiovascular|heart health/i,
        image: "https://via.placeholder.com/150/800080/FFFFFF?text=CelloQ10",
        description: "Supports cardiovascular health and energy production at cellular level.",
        price: "₦45,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Lycovite",
        keywords: /lycovite|prostate health|antioxidant/i,
        image: "https://via.placeholder.com/150/FFC0CB/000000?text=Lycovite",
        description: "Beneficial for prostate health and antioxidant support.",
        price: "₦38,500",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Magilim",
        keywords: /magilim|weight management|fat burning/i,
        image: "https://via.placeholder.com/150/00FF00/000000?text=Magilim",
        description: "Aids in weight management by promoting satiety and fat burning.",
        price: "₦30,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Gum Care Toothpaste",
        keywords: /gum care toothpaste|oral hygiene|toothache|dental pain/i,
        image: "https://via.placeholder.com/150/A0A0A0/FFFFFF?text=GumCare",
        description: "Promotes oral hygiene, strengthens gums, and freshens breath.",
        price: "₦6,999",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "toothpaste", // Added type
        qna: []
    }, {
        name: "Jointeez",
        keywords: /jointeez|joint pain|arthritis|rheumatic/i,
        image: "https://via.placeholder.com/150/808000/FFFFFF?text=Jointeez",
        description: "Relieves muscular, joint, and waist pain; supports bone health.",
        price: "₦18,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Refresh Tea",
        keywords: /refresh tea|detox|vision|throat/i,
        image: "https://via.placeholder.com/150/FFD700/000000?text=RefreshTea",
        description: "Clears the throat, improves vision, and detoxifies.",
        price: "₦20,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "tea", // Added type
        qna: []
    }, {
        name: "Memory 24/7 Capsule",
        keywords: /memory 24\/7|brain functionality|memory|concentration/i,
        image: "https://via.placeholder.com/150/4B0082/FFFFFF?text=Memory24/7",
        description: "Enhances brain functionality, memory, and concentration.",
        price: "₦36,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Eye Beta Capsule",
        keywords: /eye beta|vision|eye fatigue/i,
        image: "https://via.placeholder.com/150/8A2BE2/FFFFFF?text=EyeBeta",
        description: "Promotes healthy vision and relieves eye fatigue.",
        price: "₦30,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Gastrifort Capsule",
        keywords: /gastrifort|stomach health|digestion|ulcers/i,
        image: "https://via.placeholder.com/150/DC143C/FFFFFF?text=Gastrifort",
        description: "Premium tonic for stomach health, digestion, and ulcers.",
        price: "₦35,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Constilease",
        keywords: /constilease|constipation|digestive regularity/i,
        image: "https://via.placeholder.com/150/964B00/FFFFFF?text=Constilease",
        description: "Herbal solution for chronic constipation and digestive regularity.",
        price: "₦25,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Vigor Essential",
        keywords: /vigor essential|energy|stamina|male vitality/i,
        image: "https://via.placeholder.com/150/FF4500/FFFFFF?text=VigorEssential",
        description: "Herbal supplement for energy, stamina, and male vitality.",
        price: "₦24,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Gynapharm Capsule",
        keywords: /gynapharm|female reproductive health|hormonal balance|pid|ovarian cysts/i,
        image: "https://via.placeholder.com/150/FF69B4/000000?text=Gynapharm",
        description: "Supports female reproductive health and hormonal balance.",
        price: "₦28,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }, {
        name: "Qinghao",
        keywords: /qinghao|artemisia|malaria support/i,
        image: "https://via.placeholder.com/150/00BFFF/FFFFFF?text=Qinghao",
        description: "A traditional herbal supplement often associated with supporting the body's response to fever and general well-being. *Note: Not a cure for malaria; always consult a doctor.*",
        price: "₦22,000",
        buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
        type: "capsule", // Added type
        qna: []
    }];


    // Health Conditions Data
    const healthConditions = [{
        name: "Hypertension",
        keywords: /hypertension|high blood pressure|headache|dizziness|shortness of breath/i,
        definition: "Hypertension is a condition in which the force of the blood against the artery walls is too high, often leading to serious health issues.",
        symptoms: "Often asymptomatic; may cause headaches, dizziness, shortness of breath, nosebleeds.",
        dosage: [
            "Requires antihypertensive medications as prescribed by a doctor.",
            "Regular monitoring of blood pressure.",
            "Lifestyle changes such as reducing salt intake and regular exercise."
        ],
        recommendedProducts: ["Cello Q10"],
        qna: [{
            question: "What causes Hypertension?",
            answer: "Causes include genetics, poor diet, lack of physical activity, and stress."
        }, {
            question: "How can I lower my blood pressure naturally?",
            answer: "Lifestyle changes like diet modification, regular exercise, and stress management can help lower blood pressure."
        }]
    }];

    // FAQs
    const faqs = [{
        q: /how can i order|where to buy|buy products/i,
        a: "You can place an order directly on our website, or through our mobile app. You can also click the 'Buy Now' links provided for each product."
    }, {
        q: /shipping information|delivery time/i,
        a: "Shipping usually takes 3-5 business days depending on your location within Nigeria. International shipping times vary."
    }, {
        q: /return policy|refunds/i,
        a: "We have a 30-day return policy for unopened products. Please see our website for more details or contact our support team."
    }, {
        q: /contact support|customer service|helpline/i,
        a: "You can contact our support team via email at support@kedihealthcare.com or call us at +234 800 123 4567. You can also reach us via WhatsApp using the link: <a href='https://wa.me/message/WNGLZNUXKXXIF1' target='_blank' class='text-green-600 underline'>Chat on WhatsApp</a>."
    }, {
        q: /what is kedi healthcare|about kedi healthcare/i,
        a: "Kedi Healthcare is a leading traditional Chinese medicine (TCM) company in Nigeria, dedicated to providing high-quality herbal and nutritional supplements for various health needs. We focus on natural solutions for overall well-being."
    }, {
        q: /kedi healthcare products|what products do you offer/i,
        a: "Kedi Healthcare offers a wide range of natural health products, including supplements for immune support (Reishi), male sexual health (Re-Vive), kidney health (Golden Six), digestive health (Colon Cleanse), energy (Vigor Essential), respiratory health (Cordy Active), weight management (Magilim), and cardiovascular health (Blood Fat Reducing)."
    }, {
        q: /kedi healthcare products list|list all products/i,
        a: "Certainly! Here is a list of Kedi Healthcare products: Reishi, Re-Vive, Golden Six, Colon Cleanse, Vigor Essential, Cordy Active, Magilim, and Blood Fat Reducing. You can ask for details on any of these."
    }, {
        q: /kedi healthcare products details|tell me about your products/i,
        a: "To get details about a specific product, please ask me about it by name, e.g., 'Tell me about Reishi' or 'What is Re-Vive?'"
    }, {
        q: /kedi healthcare product prices|how much are your products/i,
        a: "Product prices vary. For example, Reishi is ₦35,000, and Re-Vive is ₦39,000. You can ask me about the price of a specific product."
    }, {
        q: /how to make money with kedi|kedi business model|become a kedi distributor|kedi income|kedi earnings|kedi opportunity/i,
        a: `
            <p class="mb-2">Kedi Healthcare offers a unique opportunity to improve your health and wealth through its direct selling and multi-level marketing (MLM) business model. Here's how you can make money with Kedi:</p>
            <ul class="list-disc list-inside mb-4 text-gray-700">
                <li><strong>Become a Registered Distributor:</strong> The first step is to register as an independent Kedi distributor. This usually involves a small registration fee and purchasing a starter kit.</li>
                <li><strong>Retail Profit:</strong> You buy Kedi products at a wholesale price and sell them to customers at the retail price. The difference is your immediate profit.</li>
                <li><strong>Performance Bonuses:</strong> As you sell more products and build a team, you earn performance bonuses based on your personal sales volume and the sales volume of your team (downline). Kedi has a structured compensation plan that rewards higher sales and team growth.</li>
                <li><strong>Leadership Bonuses:</strong> For those who build and mentor successful teams, Kedi offers leadership bonuses and incentives, which can include car awards, house funds, and international trips.</li>
                <li><strong>Recruitment and Team Building:</strong> A significant part of the MLM model is recruiting new distributors into your team. You earn commissions and bonuses not just from your sales, but also from the sales generated by the people you recruit and their recruits.</li>
            </ul>
            <p class="mb-2"><strong>Benefits of the Kedi Business:</strong></p>
            <ul class="list-disc list-inside mb-4 text-gray-700">
                <li><strong>Flexibility:</strong> Work at your own pace and set your own hours.</li>
                <li><strong>High-Quality Products:</strong> Promote natural health products that genuinely benefit people.</li>
                <li><strong>Training and Support:</b> Kedi often provides training, seminars, and support materials to help distributors succeed.</li>
                <li><strong>Community:</strong> Become part of a network of like-minded individuals.</li>
            </ul>
            <p class="font-semibold text-green-700">To get detailed information on the compensation plan, registration process, and to start your Kedi business, we recommend visiting the official Kedi Healthcare website or contacting their nearest office/distributor directly. You can also reach out to our customer service for general inquiries.</p>
        `
    }];



    // Chatbot Responses for general queries
    const chatbotResponses = [{
        keywords: /general health tips|health advice/i,
        answer: "Maintaining good health involves several key practices. Here are some general health tips:"
    }, ];

    // Health Tips
    const generalHealthTips = [
        "Using groundnut oil for frying more than 2 times a day can raise cholesterol levels? 🥜 It contains high levels of saturated fats that can be harmful to your heart!.",
        "Using groundnut oil for cooking can help lower cholesterol levels? 🥜 It contains healthy fats that are good for your heart!.",
        "Don't use groundnut oil for frying? 🥜 It has a low smoke point and can produce harmful compounds when overheated!.",
        "Using sunflower oil for cooking can help lower cholesterol levels? 🌻 It contains healthy fats that are good for your heart!.",
        "Better still, use olive oil for cooking? 🫒 It has a high smoke point and is rich in healthy monounsaturated fats!.",
        "Don't use too much of coconut oil for cooking? 🥥 It contains high levels of saturated fats that can raise cholesterol levels!.",
        "Don't use too much of palm oil for cooking? 🌴 It contains high levels of saturated fats that can raise cholesterol levels!.",
        "🌿 Some herbs like Reishi, Moringa, and Ginseng support immunity and reduce fatigue? 🌱🛡️",
        "🍠 Sweet potatoes are rich in beta-carotene, which helps improve eye health and immunity? 👁️🍠",
        "🧠 Your brain is sometimes more active at night than during the day! 💤 It processes emotions and memories while you sleep.",
        "💧 Drinking water boosts your energy, mood, and focus? 🚰 Even mild dehydration can make you feel tired and foggy!.",
        "🏃‍♂️ Just 30 minutes of walking a day can reduce your risk of heart disease by up to 40%? ❤️.",
        "🍎 Eating an apple a day really can help keep the doctor away? 🍏 Apples are rich in fiber and antioxidants that support gut and heart health!.",
        "😄 Smiling can improve your immune system and lower stress? 😊 It releases endorphins, your body's natural feel-good chemicals..",
        "🌞 10-15 minutes of sunlight a day helps your body make Vitamin D for stronger bones and better mood? ☀️.",
        "🧘‍♀️ Practicing mindfulness and meditation can reduce anxiety and improve your overall well-being? 🧘‍♂️.",
        "🧠 Your brain is sometimes more active at night than during the day! 💤 It processes emotions and memories while you sleep.",
        "💤 Lack of sleep can make you gain weight? 😴 Sleep controls hunger hormones like ghrelin and leptin..",
        "Spend time outdoors for fresh air and sunlight (with sun protection).",
        "🧘‍♂️ Regular physical activity can improve your mood and reduce anxiety? 🏋️‍♀️ Aim for at least 150 minutes of moderate exercise each week.",
        "🧘‍♀️ Practicing yoga can improve flexibility and reduce stress? 🧘‍♂️ Even a few minutes a day can make a difference.",
        "🧄 Garlic is a natural antibiotic? 🧄 It boosts your immune system and fights bacteria and viruses!.",
        "🧘‍♀️ Regular meditation can reduce blood pressure and anxiety? 🧘‍♂️ Just 10 minutes a day can make a big difference.",
        "🧘‍♂️ Deep breathing exercises can help reduce stress and improve focus? 🧘‍♀️ Try taking a few deep breaths right now!",
        "🧘‍♀️ Practicing gratitude can improve your mental health and overall well-being? 🙏 Consider keeping a gratitude journal!",
        "🧘‍♂️ Engaging in creative activities can boost your mood and reduce stress? 🎨 Try drawing, painting, or crafting!",

    ];

    // === UI Element References (initialized on DOMContentLoaded) ===
    let openBtn, closeBtn, chatbotWindow, chatbotInput, chatbotMessages, sendBtn, scrollIndicator;

    // === State Variables ===
    let currentSuggestions = [];
    let waitingForSymptoms = false; // Flag to manage symptom checker state
    let waitingForHealthGoal = false; // Flag for personalized recommendations
    let currentHealthTipIndex = 0; // Index for "Did you know" health tips
    let hasGreeted = false; // New flag to ensure greeting only happens once

    // Variables for scroll indicator dragging
    let isDraggingIndicator = false;
    let startY = 0;
    let startScrollTop = 0;

    // --- DOM Content Loaded Event Listener ---
    document.addEventListener('DOMContentLoaded', async () => {
        // Get references to UI elements
        openBtn = document.getElementById('open-chatbot-btn');
        closeBtn = document.getElementById('close-chatbot-btn');
        chatbotWindow = document.getElementById('chatbot-window');
        chatbotInput = document.getElementById('chatbot-input');
        chatbotMessages = document.getElementById('chatbot-messages');
        sendBtn = document.getElementById('send-btn');
        scrollIndicator = document.getElementById('scroll-indicator');

        // === Event Listeners ===
        openBtn.addEventListener('click', handleOpenChatbot);
        closeBtn.addEventListener('click', handleCloseChatbot);
        sendBtn.addEventListener('click', handleSendMessage);
        chatbotInput.addEventListener('keypress', handleInputKeyPress);

        // Scroll indicator logic
        let hideIndicatorTimeout;

        /**
         * Updates the position and visibility of the custom scroll indicator.
         */
        function updateScrollIndicator() {
            const visibleHeight = chatbotMessages.clientHeight;
            const scrollHeight = chatbotMessages.scrollHeight;
            const scrollTop = chatbotMessages.scrollTop;

            if (scrollHeight <= visibleHeight) {
                // No scrollbar needed, hide indicator
                scrollIndicator.style.opacity = '0';
                return;
            }

            // Calculate indicator height proportional to visible content
            let indicatorHeight = (visibleHeight / scrollHeight) * visibleHeight;
            // Ensure a minimum height for usability, e.g., 20px
            indicatorHeight = Math.max(indicatorHeight, 20);

            // Calculate the maximum scrollable track height for the indicator
            const maxIndicatorTop = visibleHeight - indicatorHeight;

            // Calculate indicator top position
            const scrollRatio = scrollTop / (scrollHeight - visibleHeight);
            const indicatorTop = scrollRatio * maxIndicatorTop;

            scrollIndicator.style.height = `${indicatorHeight}px`;
            scrollIndicator.style.top = `${indicatorTop}px`;
            scrollIndicator.style.opacity = '1'; // Make it visible

            // Set a timeout to hide the indicator after a short delay if no further scrolling
            clearTimeout(hideIndicatorTimeout);
            hideIndicatorTimeout = setTimeout(() => {
                if (!isDraggingIndicator) { // Only hide if not dragging
                    scrollIndicator.style.opacity = '0';
                }
            }, 1500); // Hide after 1.5 seconds of inactivity
        }

        chatbotMessages.addEventListener('scroll', updateScrollIndicator);
        chatbotMessages.addEventListener('mouseenter', () => {
            if (chatbotMessages.scrollHeight > chatbotMessages.clientHeight) {
                scrollIndicator.style.opacity = '1';
                clearTimeout(hideIndicatorTimeout);
            }
        });
        chatbotMessages.addEventListener('mouseleave', () => {
            if (chatbotMessages.scrollHeight > chatbotMessages.clientHeight && !isDraggingIndicator) {
                hideIndicatorTimeout = setTimeout(() => {
                    scrollIndicator.style.opacity = '0';
                }, 500); // Fade out faster on mouse leave
            }
        });

        // Initial update of the scroll indicator when the chatbot opens
        // This will be called when the chatbot is made visible.
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName === 'class' && chatbotWindow.classList.contains('open')) {
                    updateScrollIndicator();
                    observer.disconnect(); // Disconnect once opened for the first time
                    break;
                }
            }
        });
        observer.observe(chatbotWindow, {
            attributes: true
        });

        // --- Scroll Indicator Draggability ---
        scrollIndicator.addEventListener('mousedown', handleIndicatorMouseDown);
        scrollIndicator.addEventListener('touchstart', handleIndicatorTouchStart, {
            passive: false
        }); // Use passive: false to allow preventDefault

        document.addEventListener('mousemove', handleIndicatorMouseMove);
        document.addEventListener('touchmove', handleIndicatorTouchMove, {
            passive: false
        });

        document.addEventListener('mouseup', handleIndicatorMouseUp);
        document.addEventListener('touchend', handleIndicatorTouchEnd);

        // === Event Handlers ===

        /** Handles opening the chatbot window. */
        function handleOpenChatbot() {
            chatbotWindow.classList.remove('hidden');
            chatbotWindow.classList.add('open');
            console.log('Chatbot opened. hasGreeted:', hasGreeted); // Debug log
            // Initial welcome message and suggestions
            if (!hasGreeted) { // Use the new flag
                console.log('Sending initial greeting...'); // Debug log
                const options = {
                    hour: 'numeric',
                    hourCycle: 'h23',
                    timeZone: 'Africa/Lagos'
                };
                const dateInLagos = new Intl.DateTimeFormat('en-US', options).format(new Date());
                const hour = parseInt(dateInLagos);

                let greeting;
                let emoji;
                if (hour >= 5 && hour < 12) {
                    greeting = "Good morning";
                    emoji = "☀️";
                } else if (hour >= 12 && hour < 18) {
                    greeting = "Good afternoon";
                    emoji = "👋";
                } else {
                    greeting = "Good evening";
                    emoji = "🌙";
                }

                sendBotMessageWithTyping(`${greeting} ${emoji}! I'm your Kedi Healthcare Assistant. I'm here to help you with:
                    <ul>
                        <li>Product information and benefits 💊</li>
                        <li>Insights into various health conditions 🩺</li>
                        <li>How to start your own Kedi business 💰</li>
                        <li>General health tips and FAQs ❓</li>
                    </ul>
                    How can I help you today?`);
                displaySuggestions([{
                    text: "List all products",
                    type: "text"
                }, {
                    text: "How to make money with Kedi? 💰",
                    type: "text"
                }, {
                    text: "Tell me about Diabetes",
                    type: "text"
                }, {
                    text: "Tell me about Sulphur Anti-Acne Soap",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                    type: "text"
                }, {
                    text: "Symptom Checker ✨",
                    type: "text"
                }, {
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                }, {
                    text: "Contact support 📞",
                    type: "text"
                }]);
                hasGreeted = true; // Set flag after greeting
            }
        }

        /** Handles closing the chatbot window. */
        function handleCloseChatbot() {
            chatbotWindow.classList.remove('open');
            chatbotWindow.classList.add('hidden');
        }

        /** Handles sending a message when the send button is clicked. */
        function handleSendMessage(e) {
            e.preventDefault();
            sendMessage();
        }

        /** Handles sending a message when Enter key is pressed in the input. */
        function handleInputKeyPress(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        }

        /** Handles mousedown event on the scroll indicator. */
        function handleIndicatorMouseDown(e) {
            isDraggingIndicator = true;
            startY = e.clientY;
            startScrollTop = chatbotMessages.scrollTop;
            scrollIndicator.classList.add('dragging');
            e.preventDefault(); // Prevent text selection during drag
        }

        /** Handles touchstart event on the scroll indicator. */
        function handleIndicatorTouchStart(e) {
            isDraggingIndicator = true;
            startY = e.touches[0].clientY;
            startScrollTop = chatbotMessages.scrollTop;
            scrollIndicator.classList.add('dragging');
            e.preventDefault(); // Prevent default scrolling
        }

        /** Handles mousemove event for scroll indicator dragging. */
        function handleIndicatorMouseMove(e) {
            if (!isDraggingIndicator) return;

            const deltaY = e.clientY - startY;
            const scrollTrackHeight = chatbotMessages.clientHeight - scrollIndicator.offsetHeight;
            const scrollContentHeight = chatbotMessages.scrollHeight - chatbotMessages.clientHeight;

            if (scrollTrackHeight <= 0 || scrollContentHeight <= 0) return;

            const scrollRatio = deltaY / scrollTrackHeight;
            let newScrollTop = startScrollTop + scrollRatio * scrollContentHeight;

            newScrollTop = Math.max(0, Math.min(newScrollTop, scrollContentHeight));

            chatbotMessages.scrollTop = newScrollTop;
            updateScrollIndicator(); // Update indicator position immediately
        }

        /** Handles touchmove event for scroll indicator dragging. */
        function handleIndicatorTouchMove(e) {
            if (!isDraggingIndicator) return;

            const deltaY = e.touches[0].clientY - startY;
            const scrollTrackHeight = chatbotMessages.clientHeight - scrollIndicator.offsetHeight;
            const scrollContentHeight = chatbotMessages.scrollHeight - chatbotMessages.clientHeight;

            if (scrollTrackHeight <= 0 || scrollContentHeight <= 0) return;

            const scrollRatio = deltaY / scrollTrackHeight;
            let newScrollTop = startScrollTop + scrollRatio * scrollContentHeight;

            newScrollTop = Math.max(0, Math.min(newScrollTop, scrollContentHeight));

            chatbotMessages.scrollTop = newScrollTop;
            updateScrollIndicator();
            e.preventDefault(); // Prevent default scrolling
        }

        /** Handles mouseup event to stop scroll indicator dragging. */
        function handleIndicatorMouseUp() {
            if (isDraggingIndicator) {
                isDraggingIndicator = false;
                scrollIndicator.classList.remove('dragging');
                updateScrollIndicator(); // Ensure indicator state is correct after drag ends
            }
        }

        /** Handles touchend event to stop scroll indicator dragging. */
        function handleIndicatorTouchEnd() {
            if (isDraggingIndicator) {
                isDraggingIndicator = false;
                scrollIndicator.classList.remove('dragging');
                updateScrollIndicator(); // Ensure indicator state is correct after drag ends
            }
            // Add a small delay before potentially hiding the indicator after touch end
            setTimeout(() => {
                if (!isDraggingIndicator) {
                    scrollIndicator.style.opacity = '0';
                }
            }, 500);
        }

        // === Core Chatbot Functions ===

        /**
         * Adds a message to the chatbot display.
         * @param {string} sender - 'user' or 'bot'.
         * @param {string} text - The message content.
         * @param {boolean} [isTypingIndicator=false] - True if it's a typing indicator.
         * @returns {HTMLElement} The created message element.
         */
        function addMessage(sender, text, isTypingIndicator = false) {
            const msg = document.createElement('div');
            msg.classList.add('message');

            if (sender === "user") {
                msg.classList.add('user-message');
                msg.textContent = text;
            } else {
                msg.classList.add('bot-message');
                if (isTypingIndicator) {
                    msg.classList.add('typing-indicator');
                    msg.innerHTML = `<span class="dots"><span></span><span></span><span></span></span>`; // Only dots for indicator
                } else {
                    msg.innerHTML = text; // Use innerHTML for rich content (like product cards)
                }
            }

            chatbotMessages.appendChild(msg);
            // Ensure scroll to bottom after adding message
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            updateScrollIndicator(); // Update indicator after new message
            return msg;
        }

        /**
         * Creates the HTML string for a product card.
         * @param {object} product - The product object.
         * @returns {string} HTML string for the product card.
         */
        function createProductCardHtml(product) {
            const qnaButton = product.qna && product.qna.length > 0 ?
                `<button class="qna-btn suggestion-button" data-type="product" data-name="${product.name}">Q&A</button>` :
                '';

            return `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/CCCCCC/333333?text=Product';" />
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <div class="price">${product.price}</div>
                    <div class="button-group">
                        <a href="${product.buyNowLink}" target="_blank" class="buy-now-btn">Buy Now</a>
                        ${product.blogLink ? `<a href="${product.blogLink}" target="_blank" class="blog-btn">Read Blog</a>` : ''}
                        ${qnaButton}
                        <a href="${WHATSAPP_BUSINESS_LINK}" target="_blank" class="whatsapp-buy-btn">Chat to Buy 💬</a>
                    </div>
                </div>
            `;
        }

        /**
         * Displays a set of clickable suggestions to the user.
         * @param {Array<Object>} suggestions - An array of suggestion objects { text: string, type: string, [url]: string, [name]: string }.
         */
        function displaySuggestions(suggestions) {
            currentSuggestions = suggestions; // Store current suggestions
            const suggestionsContainer = document.createElement('div');
            suggestionsContainer.className = 'suggestions-container bot-message'; // Apply bot-message styling
            suggestionsContainer.style.background = 'transparent'; // Override background for buttons

            suggestions.forEach(suggestion => {
                const button = document.createElement('button');
                button.className = 'suggestion-button';
                button.textContent = suggestion.text;
                button.dataset.type = suggestion.type; // e.g., 'text', 'product-qna', 'condition-qna'
                if (suggestion.name) { // For product/condition specific Q&A
                    button.dataset.name = suggestion.name;
                }

                if (suggestion.type === "link" && suggestion.url) { // Handle link type suggestions
                    button.addEventListener('click', () => {
                        window.open(suggestion.url, '_blank');
                        addMessage('user', suggestion.text); // Show user's "click" as a message
                        chatbotInput.value = ''; // Clear input after suggestion click
                        suggestionsContainer.remove();
                        currentSuggestions = [];
                    });
                } else {
                    button.addEventListener('click', () => {
                        addMessage('user', suggestion.text); // Show user's "click" as a message
                        chatbotInput.value = ''; // Clear input after suggestion click
                        respondToUser(suggestion.text);
                        // Remove suggestions after one is clicked
                        suggestionsContainer.remove();
                        currentSuggestions = [];
                    });
                }
                suggestionsContainer.appendChild(button);
            });
            chatbotMessages.appendChild(suggestionsContainer);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            updateScrollIndicator(); // Update indicator after new suggestions
        }

        /**
         * Simulates bot typing and then displays the full message.
         * @param {string} messageContent - The message to display.
         * @param {number} delayPerChar - Delay in ms per character for typing effect.
         * @param {number} delayBetweenStages - Delay in ms before showing full message.
         */
        async function sendBotMessageWithTyping(messageContent, delayPerChar = 20, delayBetweenStages = 300) {
            // Create and append a temporary typing indicator message
            const typingIndicatorMessage = addMessage("bot", "", true); // isTypingIndicator = true
            console.log('Typing indicator added.'); // Debug log

            // Scroll to bottom to show typing indicator
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // Simulate typing delay
            await new Promise(resolve => setTimeout(resolve, delayBetweenStages));
            console.log('Typing delay finished.'); // Debug log

            // Remove the typing indicator message
            typingIndicatorMessage.remove();
            console.log('Typing indicator removed.'); // Debug log

            // Add the actual message content
            addMessage("bot", messageContent);
            console.log('Actual message added.'); // Debug log

            // Ensure scroll to bottom after adding the full message
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            updateScrollIndicator(); // Update scroll indicator after final message
        }


        /**
         * Displays detailed information about a product or health condition, including Q&A.
         * @param {string} type - 'product' or 'condition'.
         * @param {string} name - The name of the product or condition.
         */
        async function displayDetailedInfo(type, name) {
            let item;
            let responseHtml = '';
            let suggestions = [];

            if (type === 'product') {
                item = products.find(p => p.name === name);
                if (item) {
                    responseHtml += createProductCardHtml(item);
                    if (item.qna && item.qna.length > 0) {
                        responseHtml += `<p class="mt-4 font-semibold text-gray-700">Frequently Asked Questions about ${item.name}:</p><ul>`;
                        item.qna.forEach(qa => {
                            responseHtml += `<li class="mb-2"><strong class="text-green-700">${qa.question}</strong><br>${qa.answer}</li>`;
                        });
                        responseHtml += `</ul>`;
                    } else {
                        responseHtml += `<p class="mt-4 text-gray-600">No specific Q&A available for ${item.name} at the moment.</p>`;
                    }

                    // If the product is a soap, suggest other soaps
                    if (item.type === 'soap') {
                        const otherSoaps = products.filter(p => p.type === 'soap' && p.name !== item.name);
                        if (otherSoaps.length > 0) {
                            responseHtml += `<p class="mt-4 font-semibold text-gray-700">You might also be interested in these other Kedi Healthcare soaps:</p>`;
                            otherSoaps.forEach(soap => {
                                responseHtml += createProductCardHtml(soap);
                                suggestions.push({
                                    text: `Tell me about ${soap.name}`,
                                    type: "text"
                                });
                            });
                        }
                    }

                    // Add specific buy suggestions after product details
                    suggestions.push({
                        text: `Buy ${item.name}`,
                        type: "link",
                        url: item.buyNowLink
                    });
                    suggestions.push({
                        text: `Chat to Buy ${item.name} 💬`,
                        type: "link",
                        url: WHATSAPP_BUSINESS_LINK
                    });
                    suggestions.push({
                        text: `More about Kedi products`,
                        type: "text"
                    });
                    suggestions.push({
                        text: `List all products`,
                        type: "text"
                    });
                    suggestions.push({
                        text: `General health tips 💡`,
                        type: "text"
                    });
                    suggestions.push({
                        text: "Symptom Checker ✨",
                        type: "text"
                    });
                    suggestions.push({
                        text: "Personalized Product Recommendation ✨",
                        type: "text"
                    });
                }
            } else if (type === 'condition') {
                item = healthConditions.find(c => c.name === name);
                if (item) {
                    responseHtml += `<h4 class="text-lg font-semibold text-green-700 mb-2">${item.name}</h4>`;
                    if (item.definition) {
                        responseHtml += `<p class="mb-2"><strong class="text-gray-700">Definition:</strong> ${item.definition}</p>`;
                    }
                    responseHtml += `<p class="mb-2"><strong class="text-gray-700">Symptoms:</strong> ${item.symptoms}</p>`;
                    responseHtml += `<p class="mb-2"><strong class="text-gray-700">Recommended Approach/Dosage:</strong></p><ul>`;
                    item.dosage.forEach(d => {
                        responseHtml += `<li class="mb-1">${d}</li>`;
                    });
                    responseHtml += `</ul>`;

                    if (item.recommendedProducts && item.recommendedProducts.length > 0) {
                        responseHtml += `<p class="mt-4 font-semibold text-gray-700">Kedi Healthcare products that may offer support:</p>`;
                        item.recommendedProducts.forEach(prodName => {
                            const product = products.find(p => p.name === prodName);
                            if (product) {
                                responseHtml += createProductCardHtml(product);
                                suggestions.push({
                                    text: `Tell me about ${product.name}`,
                                    type: "text"
                                });
                            }
                        });
                    } else {
                        responseHtml += `<p class="mt-4 text-gray-600">While Kedi Healthcare products focus on general well-being, for ${item.name}, it's crucial to follow medical advice. No specific Kedi product directly treats this condition, but general health support products may be beneficial.</p>`;
                    }

                    if (item.qna && item.qna.length > 0) {
                        responseHtml += `<p class="mt-4 font-semibold text-gray-700">Frequently Asked Questions about ${item.name}:</p><ul>`;
                        item.qna.forEach(qa => {
                            responseHtml += `<li class="mb-2"><strong class="text-green-700">${qa.question}</strong><br>${qa.answer}</li>`;
                        });
                        responseHtml += `</ul>`;
                    } else {
                        responseHtml += `<p class="mt-4 text-gray-600">No specific Q&A available for ${item.name} at the moment.</p>`;
                    }
                    suggestions.push({
                        text: `More health conditions`,
                        type: "text"
                    });
                    suggestions.push({
                        text: `General health tips 💡`,
                        type: "text"
                    });
                    suggestions.push({
                        text: "Symptom Checker ✨",
                        type: "text"
                    });
                    suggestions.push({
                        text: "Personalized Product Recommendation ✨",
                        type: "text"
                    });
                }
            }

            if (responseHtml) {
                await sendBotMessageWithTyping(responseHtml);
                if (suggestions.length > 0) {
                    displaySuggestions(suggestions);
                }
            }
        }

        /** Handles sending a message from the user. */
        async function sendMessage() {
            const userMessage = chatbotInput.value.trim();
            if (userMessage === '') return;

            addMessage('user', userMessage);
            chatbotInput.value = ''; // Clear input immediately

            await respondToUser(userMessage);
        }

        /**
         * Displays a single "Did you know?" health tip along with a "Next Tip" button.
         * @param {number} index - The index of the tip to display.
         */
        async function displayHealthTip(index) {
            if (index >= 0 && index < generalHealthTips.length) {
                const tip = generalHealthTips[index];
                // Added styling for "Did you know?" section
                const styledTip = `
                    <span class="font-bold text-green-700">💡 Did you know? 💡</span><br>
                    <div class="bg-green-50 p-3 rounded-lg border border-green-200 mt-2">
                        ${tip}
                    </div>
                    <br><small class="text-gray-500"><em>Please note: These are general health tips and not a substitute for professional medical advice. Always consult a healthcare professional for personalized guidance.</em></small>
                `;
                await sendBotMessageWithTyping(styledTip);
                currentHealthTipIndex = index; // Update the current index

                const suggestions = [];
                suggestions.push({
                    text: "Next Tip",
                    type: "text",
                    action: "next-tip"
                });
                suggestions.push({
                    text: "See all health tips",
                    type: "text"
                }); // Option to see all tips at once
                suggestions.push({
                    text: "Back to main menu",
                    type: "text"
                });
                displaySuggestions(suggestions);
            } else {
                // If all tips have been shown, or index is out of bounds
                await sendBotMessageWithTyping("That's all the tips I have for now! I hope they were helpful.");
                currentHealthTipIndex = 0; // Reset for next time
                displaySuggestions([{
                    text: "List all products",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                    type: "text"
                }, // Offer to restart tips
                {
                    text: "Symptom Checker ✨",
                    type: "text"
                }, {
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                }, {
                    text: "Contact support 📞",
                    type: "text"
                }]);
            }
        }

        /**
         * Responds to the user's message based on predefined rules or LLM.
         * @param {string} message - The user's message.
         */
        async function respondToUser(message) {
            let botResponse = "I'm sorry, I didn't quite understand that. Could you please rephrase or ask something else?";
            let suggestions = [];

            // Handle "Next Tip" button click
            if (message.toLowerCase() === "next tip") {
                currentHealthTipIndex++;
                await displayHealthTip(currentHealthTipIndex);
                return;
            }
            if (message.toLowerCase() === "see all health tips") {
                let tipsHtml = "Here are all our general health tips:<br><br><ul>";
                generalHealthTips.forEach(tip => {
                    tipsHtml += `<li>${tip}</li>`;
                });
                tipsHtml += `</ul><br><small class="text-gray-500"><em>Please note: These are general health tips and not a substitute for professional medical advice. Always consult a healthcare professional for personalized guidance.</em></small>`;
                await sendBotMessageWithTyping(tipsHtml);
                suggestions = [{
                    text: "List all products",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                    type: "text"
                }, // Offer to restart tips
                {
                    text: "Symptom Checker ✨",
                    type: "text"
                }, {
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                }, {
                    text: "Contact support 📞",
                    type: "text"
                }];
                displaySuggestions(suggestions);
                return;
            }
            if (message.toLowerCase() === "back to main menu") {
                await sendBotMessageWithTyping("Welcome back to the main menu! How can I help you further?");
                suggestions = [{
                    text: "List all products",
                    type: "text"
                }, {
                    text: "How to make money with Kedi? 💰",
                    type: "text"
                }, {
                    text: "Tell me about Diabetes",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                    type: "text"
                }, {
                    text: "Symptom Checker ✨",
                    type: "text"
                }, {
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                }, {
                    text: "Contact support 📞",
                    type: "text"
                }];
                displaySuggestions(suggestions);
                return;
            }


            // --- Symptom Checker Logic ---
            if (waitingForSymptoms) {
                const symptoms = message.toLowerCase().split(',').map(s => s.trim());
                await sendBotMessageWithTyping("Thank you for providing your symptoms. Let me analyze them to see if I can find a match or provide some general guidance.");

                let matchedConditions = [];
                healthConditions.forEach(condition => {
                    const conditionKeywords = condition.keywords.source.split('|').map(k => k.replace(/\\/g, '').trim());
                    const commonSymptoms = symptoms.filter(symptom =>
                        conditionKeywords.some(keyword => symptom.includes(keyword))
                    );
                    if (commonSymptoms.length > 0) {
                        matchedConditions.push(condition);
                    }
                });

                if (matchedConditions.length > 0) {
                    let conditionsHtml = "Based on your symptoms, here are some health conditions that might be relevant. Please remember, I am an AI and cannot provide medical diagnoses. Always consult a healthcare professional for accurate diagnosis and treatment:<br><br>";
                    matchedConditions.forEach(condition => {
                        conditionsHtml += `<div class="product-card">
                            <h4 class="text-lg font-semibold text-green-700">${condition.name}</h4>
                            ${condition.definition ? `<p><strong class="text-gray-700">Definition:</strong> ${condition.definition}</p>` : ''}
                            <p><strong class="text-gray-700">Symptoms:</strong> ${condition.symptoms}</p>
                            <p><strong class="text-gray-700">Recommended Approach:</strong> ${condition.dosage.join(' ')}</p>
                            <button class="suggestion-button mt-2" data-type="condition-qna" data-name="${condition.name}">More about ${condition.name}</button>
                        </div>`;
                    });
                    conditionsHtml += `<small class="text-gray-500"><em>Please note: This information is for general guidance and not a substitute for professional medical diagnosis or treatment. Always consult a healthcare professional for accurate diagnosis and treatment.</em></small>`;
                    await sendBotMessageWithTyping(conditionsHtml);
                } else {
                    await sendBotMessageWithTyping("I couldn't find a direct match for your symptoms in my database. It's crucial to consult a healthcare professional for any health concerns. Would you like general health tips instead?");
                    suggestions.push({
                        text: "General health tips 💡",
                        type: "text"
                    });
                }
                waitingForSymptoms = false; // Reset flag
                suggestions.push({
                    text: "List all products",
                    type: "text"
                });
                suggestions.push({
                    text: "How to make money with Kedi? 💰",
                    type: "text"
                });
                suggestions.push({
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                });
                displaySuggestions(suggestions);
                return;
            }

            // --- Personalized Product Recommendation Logic ---
            if (waitingForHealthGoal) {
                const healthGoal = message.toLowerCase();
                let recommendedProductsSet = new Set(); // Use a Set to store unique products

                // Function to add products to the set based on keywords
                const addProductsByKeywords = (keywords) => {
                    products.filter(p => keywords.some(k => healthGoal.includes(k)))
                        .forEach(p => recommendedProductsSet.add(p));
                };

                // Enhanced keyword matching for various health goals
                if (healthGoal.includes("immune") || healthGoal.includes("immunity") || healthGoal.includes("boost health") || healthGoal.includes("fight infection")) {
                    addProductsByKeywords(["reishi", "small reishi", "golden hypha", "small golden hypha"]);
                }
                if (healthGoal.includes("energy") || healthGoal.includes("stamina") || healthGoal.includes("vitality") || healthGoal.includes("fatigue")) {
                    addProductsByKeywords(["vigor essential", "cordy active", "small cordy active", "cordy royal jelly", "small cordy royal jelly"]);
                }
                if (healthGoal.includes("male sexual health") || healthGoal.includes("libido") || healthGoal.includes("erection") || healthGoal.includes("male performance")) {
                    addProductsByKeywords(["re-vive", "packet re-vive", "vigor essential"]);
                }
                if (healthGoal.includes("diabetes") || healthGoal.includes("blood sugar") || healthGoal.includes("glucose")) {
                    addProductsByKeywords(["diawell"]);
                }
                if (healthGoal.includes("joint pain") || healthGoal.includes("arthritis") || healthGoal.includes("rheumatic") || healthGoal.includes("bone health")) {
                    addProductsByKeywords(["jointeez"]);
                }
                if (healthGoal.includes("weight management") || healthGoal.includes("lose weight") || healthGoal.includes("fat burning") || healthGoal.includes("obesity")) {
                    addProductsByKeywords(["magilim"]);
                }
                if (healthGoal.includes("memory") || healthGoal.includes("concentration") || healthGoal.includes("brain") || healthGoal.includes("cognitive function")) {
                    addProductsByKeywords(["memory 24/7 capsule"]);
                }
                if (healthGoal.includes("vision") || healthGoal.includes("eye fatigue") || healthGoal.includes("eye health")) {
                    addProductsByKeywords(["eye beta capsule", "refresh tea"]);
                }
                if (healthGoal.includes("stomach") || healthGoal.includes("digestion") || healthGoal.includes("ulcers") || healthGoal.includes("gastric")) {
                    addProductsByKeywords(["gastrifort capsule", "constilease"]);
                }
                if (healthGoal.includes("female reproductive health") || healthGoal.includes("hormonal balance") || healthGoal.includes("pid") || healthGoal.includes("ovarian cysts") || healthGoal.includes("menstrual")) {
                    addProductsByKeywords(["gynapharm capsule", "golden six"]);
                }
                if (healthGoal.includes("prostate health") || healthGoal.includes("urinary health male")) {
                    addProductsByKeywords(["lycovite"]);
                }
                if (healthGoal.includes("cardiovascular") || healthGoal.includes("heart health") || healthGoal.includes("blood pressure") || healthGoal.includes("cholesterol")) {
                    addProductsByKeywords(["cello q10"]);
                }
                if (healthGoal.includes("blood health") || healthGoal.includes("anemia") || healthGoal.includes("iron deficiency") || healthGoal.includes("blood circulation")) {
                    addProductsByKeywords(["reishi (blood tonic)"]);
                }
                if (healthGoal.includes("oral hygiene") || healthGoal.includes("toothache") || healthGoal.includes("dental pain") || healthGoal.includes("gum health")) {
                    addProductsByKeywords(["gum care toothpaste"]);
                }
                if (healthGoal.includes("detox") || healthGoal.includes("cleanse") || healthGoal.includes("liver detox")) {
                    addProductsByKeywords(["refresh tea"]);
                }
                if (healthGoal.includes("water") || healthGoal.includes("hydration") || healthGoal.includes("alkaline")) {
                    addProductsByKeywords(["hydrogen cup"]);
                }
                if (healthGoal.includes("acne") || healthGoal.includes("skin care") || healthGoal.includes("pimple")) {
                    addProductsByKeywords(["sulphur anti-acne soap"]);
                }
                if (healthGoal.includes("whitening") || healthGoal.includes("brighten skin") || healthGoal.includes("lighten skin") || healthGoal.includes("pigmentation")) {
                    addProductsByKeywords(["pearl whitening soap"]);
                }
                if (healthGoal.includes("antibacterial") || healthGoal.includes("germs") || healthGoal.includes("deep cleansing") || healthGoal.includes("skin hygiene")) {
                    addProductsByKeywords(["nano-silver antibacterial soap"]);
                }


                const recommendedProducts = Array.from(recommendedProductsSet); // Convert Set back to Array

                if (recommendedProducts.length > 0) {
                    let productHtml = "Based on your goal, here are some Kedi Healthcare products you might find beneficial:<br><br>";
                    recommendedProducts.forEach(product => {
                        productHtml += createProductCardHtml(product);
                        suggestions.push({
                            text: `Tell me about ${product.name}`,
                            type: "text"
                        });
                    });
                    productHtml += `<small class="text-gray-500"><em>Please note: These recommendations are based on general health goals and are not a substitute for professional medical advice. Always consult a healthcare professional for personalized guidance.</em></small>`;
                    await sendBotMessageWithTyping(productHtml);
                } else {
                    await sendBotMessageWithTyping("I couldn't find specific product recommendations for that health goal in my current database. Kedi Healthcare has many products for general well-being. Would you like to see a list of all products or get general health tips?");
                    suggestions.push({
                        text: "List all products",
                        type: "text"
                    });
                    suggestions.push({
                        text: "General health tips 💡",
                        type: "text"
                    });
                }
                waitingForHealthGoal = false; // Reset flag
                suggestions.push({
                    text: "Symptom Checker ✨",
                    type: "text"
                });
                suggestions.push({
                    text: "How to make money with Kedi? 💰",
                    type: "text"
                });
                displaySuggestions(suggestions);
                return;
            }

            // --- Predefined Responses (FAQs, Products, Conditions, General Tips) ---

            // Check for product-specific queries
            // IMPORTANT: This order is crucial for specific matches to be found first.
            const productMatch = products.find(p => p.keywords.test(message));
            if (productMatch) {
                await displayDetailedInfo('product', productMatch.name);
                return;
            }

            // Check for health condition queries
            const conditionMatch = healthConditions.find(c => c.keywords.test(message));
            if (conditionMatch) {
                await displayDetailedInfo('condition', conditionMatch.name);
                return;
            }

            // Check for FAQs
            const faqMatch = faqs.find(faq => faq.q.test(message));
            if (faqMatch) {
                await sendBotMessageWithTyping(faqMatch.a);
                suggestions = [{
                    text: "List all products",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                    type: "text"
                }, {
                    text: "Symptom Checker ✨",
                    type: "text"
                }, {
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                }, {
                    text: "How to make money with Kedi? 💰",
                    type: "text"
                }, {
                    text: "Contact support 📞",
                    type: "text"
                }];
                displaySuggestions(suggestions);
                return;
            }

            // Check for general chatbot responses
            const generalResponseMatch = chatbotResponses.find(res => res.keywords.test(message));
            if (generalResponseMatch) {
                if (generalResponseMatch.keywords.test("general health tips")) {
                    currentHealthTipIndex = 0; // Reset index to start from the first tip
                    await displayHealthTip(currentHealthTipIndex);
                } else {
                    await sendBotMessageWithTyping(generalResponseMatch.answer);
                    suggestions = [{
                        text: "List all products",
                        type: "text"
                    }, {
                        text: "How to make money with Kedi? 💰",
                        type: "text"
                    }, {
                        text: "Tell me about Diabetes",
                    }, {
                        text: "General health tips 💡",
                    }, {
                        text: "Symptom Checker ✨",
                        type: "text"
                    }, {
                        text: "Personalized Product Recommendation ✨",
                        type: "text"
                    }, {
                        text: "Contact support 📞",
                        type: "text"
                    }];
                    displaySuggestions(suggestions);
                }
                return;
            }

            // Special handling for "List all products"
            if (message.toLowerCase().includes("list all products")) {
                let productListHtml = "Here are some of our popular Kedi Healthcare products:<br><br>";
                products.forEach(p => {
                    productListHtml += createProductCardHtml(p);
                });
                await sendBotMessageWithTyping(productListHtml);
                suggestions = [{
                    text: "Tell me about Reishi",
                    type: "text"
                }, {
                    text: "Tell me about Re-Vive",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                    type: "text"
                }, {
                    text: "Symptom Checker ✨",
                    type: "text"
                }, {
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                }, {
                    text: "How to make money with Kedi? 💰",
                    type: "text"
                }, ];
                displaySuggestions(suggestions);
                return;
            }

            // Special handling for "Symptom Checker"
            if (message.toLowerCase().includes("symptom checker")) {
                waitingForSymptoms = true;
                await sendBotMessageWithTyping("Okay, let's try the Symptom Checker. Please tell me your symptoms, separated by commas (e.g., 'fever, headache, fatigue').");
                suggestions = [{
                    text: "Cancel Symptom Checker",
                    type: "text"
                }, {
                    text: "List all products",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                }, ];
                displaySuggestions(suggestions);
                return;
            }

            // Special handling for "Cancel Symptom Checker"
            if (message.toLowerCase().includes("cancel symptom checker")) {
                waitingForSymptoms = false;
                await sendBotMessageWithTyping("Symptom Checker cancelled. How else can I assist you?");
                suggestions = [{
                    text: "List all products",
                    type: "text"
                }, {
                    text: "Tell me about Diabetes",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                    type: "text"
                }, {
                    text: "Symptom Checker ✨",
                    type: "text"
                }, {
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                }, {
                    text: "How to make money with Kedi? 💰",
                    type: "text"
                }, {
                    text: "Contact support 📞",
                    type: "text"
                }];
                displaySuggestions(suggestions);
                return;
            }

            // Special handling for "Personalized Product Recommendation"
            if (message.toLowerCase().includes("personalized product recommendation")) {
                waitingForHealthGoal = true;
                await sendBotMessageWithTyping("Great! To give you a personalized recommendation, please tell me your primary health goal or concern (e.g., 'boost immunity', 'improve energy', 'manage blood sugar', 'support joint health').");
                suggestions = [{
                    text: "Cancel Recommendation",
                    type: "text"
                }, {
                    text: "List all products",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                }, ];
                displaySuggestions(suggestions);
                return;
            }

            // Special handling for "Cancel Recommendation"
            if (message.toLowerCase().includes("cancel recommendation")) {
                waitingForHealthGoal = false;
                await sendBotMessageWithTyping("Personalized Product Recommendation cancelled. How else can I assist you?");
                suggestions = [{
                    text: "List all products",
                    type: "text"
                }, {
                    text: "Tell me about Diabetes",
                    type: "text"
                }, {
                    text: "General health tips 💡",
                    type: "text"
                }, {
                    text: "Symptom Checker ✨",
                    type: "text"
                }, {
                    text: "Personalized Product Recommendation ✨",
                    type: "text"
                }, {
                    text: "How to make money with Kedi? 💰",
                    type: "text"
                }, {
                    text: "Contact support 📞",
                    type: "text"
                }];
                displaySuggestions(suggestions);
                return;
            }


            // Fallback to LLM if no specific match
            // Remove any existing typing indicators before making a new one
            const existingTypingIndicators = chatbotMessages.querySelectorAll('.typing-indicator');
            existingTypingIndicators.forEach(indicator => indicator.remove());

            // Display "thinking" message
            await sendBotMessageWithTyping("Let me think about that for a moment...");
            console.log('Initiating Gemini API call...'); // Debug log
            try {
                const chatHistory = [{
                    role: "user",
                    parts: [{
                        text: message
                    }]
                }];
                const payload = {
                    contents: chatHistory
                };
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                console.log('Gemini API response received, status:', response.status); // Debug log
                const result = await response.json();
                console.log('Gemini API response JSON:', result); // Debug log

                if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    botResponse = result.candidates[0].content.parts[0].text;
                } else {
                    botResponse = "I'm having trouble connecting to my knowledge base right now. Please try again later or ask a different question.";
                    console.warn('Gemini API response structure unexpected or empty.'); // Debug log
                }
            } catch (error) {
                console.error("Error calling Gemini API:", error); // Debug log
                botResponse = "I'm currently experiencing technical difficulties and cannot process your request. Please try again in a moment.";
            }

            // Added disclaimer for LLM generated responses
            await sendBotMessageWithTyping(`${botResponse}<br><br><small class="text-gray-500"><em>Please note: This information is AI-generated and for general informational purposes only. It is not medical advice. Always consult a healthcare professional for specific health concerns.</em></small>`);
            // Always offer general suggestions after an LLM response
            displaySuggestions([{
                text: "List all products",
                type: "text"
            }, {
                text: "How to make money with Kedi? 💰",
                type: "text"
            }, {
                text: "General health tips 💡",
                type: "text"
            }, {
                text: "Symptom Checker ✨",
            }, {
                text: "Personalized Product Recommendation ✨",
                type: "text"
            }, {
                text: "Contact support 📞",
                type: "text"
            }]);
        }
    });
})();
