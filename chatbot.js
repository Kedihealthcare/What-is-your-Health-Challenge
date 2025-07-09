(function() {
            // --- Start of Chatbot Logic ---


// === Suggestion Tags for Similar Matches ===
function getSuggestions(input, list, matchKey = 'keywords') {
    const matches = list.filter(item => input.match(item[matchKey]));
    if (matches.length > 1) {
        const suggestionTags = matches.map(item => 
            `<button class="suggestion-tag" onclick="handleSuggestionClick('${item.name}')">${item.name}</button>`
        ).join(" ");
        return `🔍 Did you mean:<br>${suggestionTags}`;
    }
    return null;
}

function handleSuggestionClick(suggestion) {
    document.getElementById('chat-input').value = suggestion;
    // Optionally, you can automatically trigger the next step here
    // handleUserInput(suggestion); 
}


/* === Suggestion Tag Styles === */
const style = document.createElement('style');
style.innerHTML = `
.suggestion-tag {
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    margin: 2px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.3s;
}
.suggestion-tag:hover {
    background-color: #ccc;
}`;
document.head.appendChild(style);


            // === Constants ===
            const WHATSAPP_BUSINESS_LINK = "https://wa.me/message/WNGLZNUXKXXIF1";
            // Gemini API Key (leave empty for Canvas runtime - Canvas will inject it)
            const API_KEY = "";
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
            const BOT_AVATAR_URL = "https://placehold.co/32x32/8B5CF6/FFFFFF?text=🤖"; // Placeholder bot avatar
            // Updated CHAT_ICON_IMAGE_URL for a more generic and larger placeholder
            const CHAT_ICON_IMAGE_URL = "chatbot (2).png"; // Placeholder for your custom chatbot icon

            // === Data Definitions ===
            // Products Data - Reordered for specific product matching first
            const products = [{
                id: "small-reishi",
                name: "Small Reishi",
                keywords: /small reishi|small lingzhi|small ganoderma/i,
                image: "https://placehold.co/150/0000FF/808080?text=Small+Reishi",
                description: "Immune-boosting and anti-fatigue properties in a smaller pack.",
                price: "₦15,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/small-reishi",
                qna: [{
                    question: "How often should I take Small Reishi?",
                    answer: "Typically, Small Reishi is taken once or twice daily, but always refer to the product packaging for precise dosage instructions or consult a healthcare professional."
                }, {
                    question: "Is Small Reishi good for liver health?",
                    answer: "Yes, Small Reishi is well-known for its hepatoprotective properties and can support liver function."
                }]
            }, {
                id: "reishi",
                name: "Reishi",
                keywords: /reishi|lingzhi|ganoderma/i,
                image: "https://placehold.co/150/0000FF/808080?text=Reishi",
                description: "Immune-boosting and anti-fatigue properties.",
                price: "₦35,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/reishi",
                qna: [{
                    question: "How often should I take Reishi?",
                    answer: "Typically, Reishi is taken once or twice daily, but always refer to the product packaging for precise dosage instructions or consult a healthcare professional."
                }, {
                    question: "Is Reishi good for liver health?",
                    answer: "Yes, Reishi is well-known for its hepatoprotective properties and can support liver function."
                }]
            }, {
                id: "packet-re-vive",
                name: "Packet Re-Vive",
                keywords: /packet re-vive|revive packet|small revive/i,
                image: "https://placehold.co/150/FF0000/FFFFFF?text=Packet+Re-Vive",
                description: "Supports male sexual health and vitality in a convenient packet.",
                price: "₦16,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/packet-re-vive",
                qna: [{
                    question: "What are the main benefits of Packet Re-Vive?",
                    answer: "Packet Re-Vive primarily enhances male sexual function, increases libido, and improves overall vitality."
                }, {
                    question: "Are there any side effects of Packet Re-Vive?",
                    answer: "Generally, Packet Re-Vive is well-tolerated. For specific concerns, it's best to consult your doctor."
                }]
            }, {
                id: "re-vive",
                name: "Re-Vive",
                keywords: /re-vive|revive|sexual health male/i,
                image: "https://placehold.co/150/FF0000/FFFFFF?text=Re-Vive",
                description: "Supports male sexual health and vitality.",
                price: "₦44,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/re-vive",
                qna: [{
                    question: "What are the main benefits of Re-Vive?",
                    answer: "Re-Vive primarily enhances male sexual function, increases libido, and improves overall vitality."
                }, {
                    question: "Are there any side effects?",
                    answer: "Generally, Re-Vive is well-tolerated. For specific concerns, it's best to consult your doctor."
                }]
            }, {
                id: "small-cordy-active",
                name: "Small Cordy Active",
                keywords: /small cordy active|small cordy/i,
                image: "https://placehold.co/150/008000/FFFFFF?text=Small+CordyActive",
                description: "Enhances stamina, athletic performance, and respiratory health in a smaller size.",
                price: "₦14,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/small-cordy-active",
                qna: []
            }, {
                id: "cordy-active",
                name: "Cordy Active",
                keywords: /cordy active|stamina|athletic performance|respiratory health/i,
                image: "https://placehold.co/150/008000/FFFFFF?text=CordyActive",
                description: "Enhances stamina, athletic performance, and respiratory health.",
                price: "₦25,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/cordy-active",
                qna: []
            }, {
                id: "small-cordy-royal-jelly",
                name: "Small Cordy Royal Jelly",
                keywords: /small cordy royal jelly|small cordyceps|small royal jelly|small cordy|small jelly/i,
                image: "https://placehold.co/150/FFFF00/000000?text=Small+CordyRoyal",
                description: "Comprehensive health benefits, combining Cordyceps and Royal Jelly in a smaller pack.",
                price: "₦14,200",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/small-cordy-royal-jelly",
                qna: []
            }, {
                id: "cordy-royal-jelly",
                name: "Cordy Royal Jelly",
                keywords: /cordy royal jelly|cordyceps|royal jelly/i,
                image: "https://placehold.co/150/FFFF00/000000?text=CordyRoyal",
                description: "Comprehensive health benefits, combining Cordyceps and Royal Jelly.",
                price: "₦36,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/cordy-royal-jelly",
                qna: []
            }, {
                id: "small-golden-hypha",
                name: "Small Golden Hypha",
                keywords: /small golden hypha|golden hypha small/i,
                image: "https://placehold.co/150/C0C0C0/000000?text=Small+GoldenHypha",
                description: "Powerful immune system booster and anti-cancer properties in a smaller size.",
                price: "₦17,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/small-golden-hypha",
                qna: []
            }, {
                id: "golden-hypha",
                name: "Golden Hypha",
                keywords: /golden hypha|immune booster|anti-cancer|anti-tumor/i,
                image: "https://placehold.co/150/C0C0C0/000000?text=GoldenHypha",
                description: "Powerful immune system booster and anti-cancer properties.",
                price: "₦50,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/golden-hypha",
                qna: []
            }, {
                id: "reishi-blood-tonic",
                name: "Reishi (Blood Tonic)",
                keywords: /reishi blood tonic|blood health|anemia|iron deficiency/i,
                image: "https://placehold.co/150/000080/FFFFFF?text=Reishi+Blood+Tonic",
                description: "Supports blood health, liver function, and overall well-being.",
                price: "₦28,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/reishi-blood-tonic",
                qna: []
            }, {
                id: "hydrogen-cup",
                name: "Hydrogen Cup",
                keywords: /hydrogen cup|alkaline water|antioxidant water|hydrogen rich water/i,
                image: "https://placehold.co/150/ADD8E6/000000?text=Hydrogen+Cup",
                description: "Generates hydrogen-rich alkaline water for enhanced hydration and antioxidant benefits.",
                price: "₦75,000",
                type: "Devices",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/hydrogen-cup",
                qna: [{
                    question: "What are the benefits of hydrogen water?",
                    answer: "Hydrogen water is believed to have antioxidant properties, reduce inflammation, and improve cellular health."
                }, {
                    question: "How often should I use the Hydrogen Cup?",
                    answer: "You can use the Hydrogen Cup daily to make hydrogen-rich water for regular consumption."
                }]
            }, {
                id: "sulphur-anti-acne-soap",
                name: "Sulphur Anti-Acne Soap",
                keywords: /sulphur anti-acne soap|acne soap|pimple soap|pimples|blackheads|Readness|Body odour|skin care|sulphur soap/i,
                image: "https://placehold.co/150/F0E68C/000000?text=Sulphur+Soap",
                description: "A specialized soap formulated with sulfur to help treat acne, control oil, and cleanse pores.",
                price: "₦5,500",
                type: "Soaps",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/sulphur-anti-acne-soap",
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
                id: "pearl-whitening-soap",
                name: "Pearl Whitening Soap",
                keywords: /pearl whitening soap|whitening soap|brighten skin|lighten skin|pigmentation/i,
                image: "https://placehold.co/150/F8F8FF/000000?text=Pearl+Whitening+Soap",
                description: "Reveals radiance, lightens dark spots, reduces pigmentation, and promotes healthy, brighter skin.",
                price: "₦5,500",
                type: "Soaps",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/pearl-whitening-soap",
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
                id: "nano-silver-antibacterial-soap",
                name: "Nano Silver Antibacterial Soap",
                keywords: /nano-silver antibacterial soap|antibacterial soap|germ shield|deep cleansing|skin hygiene/i,
                image: "https://placehold.co/150/E0FFFF/000000?text=Nano-Silver+Soap",
                description: "Formulated with Nano Silver to eliminate harmful bacteria for clean & healthy skin, provides deep cleansing, and maintains skin barrier.",
                price: "₦5,500",
                type: "Soaps",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/nano-silver-antibacterial-soap",
                qna: [{
                    question: "How does Nano-Silver Antibacterial Soap work?",
                    answer: "Nano-silver particles can deeply penetrate skin, eliminating harmful bacteria, fungi, and other microbes that cause infections, body odor, and irritation. It also promotes the repair and regeneration of damaged cells."
                }, {
                    question: "Is Nano-Silver Antibacterial Soap gentle on sensitive skin?",
                    answer: "Yes, it is gentle on overall skin protection, leaving skin refreshed, soft, and protected after each use. Many users report no irritation even with daily use."
                }]
            }, {
                id: "diawell",
                name: "Diawell",
                keywords: /diawell|diabetes|blood sugar/i,
                image: "https://placehold.co/150/00FFFF/000000?text=Diawell",
                description: "Helps manage blood sugar levels and supports pancreatic health.",
                price: "₦33,600",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/diawell",
                qna: [{
                    question: "Can Diawell replace my diabetes medication?",
                    answer: "No, Diawell is a supplement and should not replace prescribed diabetes medication. Always consult your doctor before making any changes to your medication."
                }]
            }, {
                id: "golden-six",
                name: "Golden Six",
                keywords: /golden six|hormonal balance|kidney liver/i,
                image: "https://placehold.co/150/FF8000/FFFFFF?text=GoldenSix",
                description: "Supports hormonal balance, strengthens the kidney and liver, anti-aging.",
                price: "₦15,500",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/golden-six",
                qna: []
            }, {
                id: "cello-q10",
                name: "Cello Q10",
                keywords: /cello q10|cardiovascular|heart health/i,
                image: "https://placehold.co/150/800080/FFFFFF?text=CelloQ10",
                description: "Supports cardiovascular health and energy production at cellular level.",
                price: "₦45,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/cello-q10",
                qna: []
            }, {
                id: "lycovite",
                name: "Lycovite",
                keywords: /lycovite|prostate health|antioxidant/i,
                image: "https://placehold.co/150/FFC0CB/000000?text=Lycovite",
                description: "Beneficial for prostate health and antioxidant support.",
                price: "₦38,500",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/lycovite",
                qna: []
            }, {
                id: "magilim",
                name: "Magilim",
                keywords: /magilim|weight management|fat burning/i,
                image: "https://placehold.co/150/00FF00/000000?text=Magilim",
                description: "Aids in weight management by promoting satiety and fat burning.",
                price: "₦30,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/magilim",
                qna: []
            }, {
                id: "gum-care-toothpaste",
                name: "Gum Care Toothpaste",
                keywords: /gum care toothpaste|oral hygiene|toothache|dental pain/i,
                image: "https://placehold.co/150/A0A0A0/FFFFFF?text=GumCare",
                description: "Promotes oral hygiene, strengthens gums, and freshens breath.",
                price: "₦6,999",
                type: "Oral Care",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/gum-care-toothpaste",
                qna: []
            }, {
                id: "jointeez",
                name: "Jointeez",
                keywords: /jointeez|joint pain|arthritis|rheumatic/i,
                image: "https://placehold.co/150/808000/FFFFFF?text=Jointeez",
                description: "Relieves muscular, joint, and waist pain; supports bone health.",
                price: "₦18,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/jointeez",
                qna: []
            }, {
                id: "refresh-tea",
                name: "Refresh Tea",
                keywords: /refresh tea|detox|vision|throat/i,
                image: "https://placehold.co/150/FFD700/000000?text=RefreshTea",
                description: "Clears the throat, improves vision, and detoxifies.",
                price: "₦20,000",
                type: "Teas",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/refresh-tea",
                qna: []
            }, {
                id: "memory-24-7-capsule",
                name: "Memory 24/7 Capsule",
                keywords: /memory 24\/7|brain functionality|memory|concentration/i,
                image: "https://placehold.co/150/4B0082/FFFFFF?text=Memory24/7",
                description: "Enhances brain functionality, memory, and concentration.",
                price: "₦36,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/memory-24-7-capsule",
                qna: []
            }, {
                id: "eye-beta-capsule",
                name: "Eye Beta Capsule",
                keywords: /eye beta|vision|eye fatigue/i,
                image: "https://placehold.co/150/8A2BE2/FFFFFF?text=EyeBeta",
                description: "Promotes healthy vision and relieves eye fatigue.",
                price: "₦30,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/eye-beta-capsule",
                qna: []
            }, {
                id: "gastrifort-capsule",
                name: "Gastrifort Capsule",
                keywords: /gastrifort|stomach health|digestion|ulcers/i,
                image: "https://placehold.co/150/DC143C/FFFFFF?text=Gastrifort",
                description: "Premium tonic for stomach health, digestion, and ulcers.",
                price: "₦35,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/gastrifort-capsule",
                qna: []
            }, {
                id: "constilease",
                name: "Constilease",
                keywords: /constilease|constipation|digestive regularity/i,
                image: "https://placehold.co/150/964B00/FFFFFF?text=Constilease",
                description: "Herbal solution for chronic constipation and digestive regularity.",
                price: "₦25,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/constilease",
                qna: []
            }, {
                id: "vigor-essential",
                name: "Vigor Essential",
                keywords: /vigor essential|energy|stamina|male vitality/i,
                image: "https://placehold.co/150/FF4500/FFFFFF?text=VigorEssential",
                description: "Herbal supplement for energy, stamina, and male vitality.",
                price: "₦24,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/vigor-essential",
                qna: []
            }, {
                id: "gynapharm-capsule",
                name: "Gynapharm Capsule",
                keywords: /gynapharm|female reproductive health|hormonal balance|pid|ovarian cysts/i,
                image: "https://placehold.co/150/FF69B4/000000?text=Gynapharm",
                description: "Supports female reproductive health and hormonal balance.",
                price: "₦28,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/gynapharm-capsule",
                qna: []
            }, {
                id: "qinghao",
                name: "Qinghao",
                keywords: /qinghao|artemisia|malaria support/i,
                image: "https://placehold.co/150/00BFFF/FFFFFF?text=Qinghao",
                description: "A traditional herbal supplement often associated with supporting the body's response to fever and general well-being. *Note: Not a cure for malaria; always consult a doctor.*",
                price: "₦22,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/qinghao",
                qna: []
            }, {
                id: "colon-cleanse",
                name: "Colon Cleanse",
                keywords: /colon cleanse|detox|digestive health|constipation relief/i,
                image: "https://placehold.co/150/8B4513/FFFFFF?text=Colon+Cleanse",
                description: "Supports digestive health, promotes regularity, and aids in detoxification.",
                price: "₦28,000",
                type: "Capsules",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/colon-cleanse",
                qna: []
            }, {
                id: "kedi-coffee",
                name: "Kedi Coffee",
                keywords: /kedi coffee|healthy coffee|energy drink|ginseng coffee/i,
                image: "https://placehold.co/150/6F4E37/FFFFFF?text=Kedi+Coffee",
                description: "A unique blend of coffee with herbal extracts for energy and overall well-being.",
                price: "₦12,000",
                type: "Beverages",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/kedi-coffee",
                qna: []
            }, {
                id: "blood-circulatory-massager",
                name: "Blood Circulatory Massager",
                keywords: /blood circulatory massager|bcm|circulation machine|massager|blood flow/i,
                image: "https://placehold.co/150/FF6347/FFFFFF?text=BCM",
                description: "Enhances blood circulation, relieves muscle tension, and promotes overall well-being through vibration and massage.",
                price: "₦120,000",
                type: "Devices",
                buyNowLink: "https://wa.me/message/WNGLZNUXKXXIF1",
                blogLink: "https://example.com/blog/blood-circulatory-massager",
                qna: [{
                    question: "How does the Blood Circulatory Massager work?",
                    answer: "The BCM uses high-frequency vibrations to stimulate blood flow, relax muscles, and improve circulation throughout the body."
                }, {
                    question: "What are the benefits of using the BCM?",
                    answer: "Benefits include improved blood circulation, pain relief, reduced fatigue, enhanced metabolism, and relaxation."
                }, {
                    question: "How often should I use the Blood Circulatory Massager?",
                    answer: "It is generally recommended to use it for 15-30 minutes once or twice daily, but always refer to the product manual for precise instructions."
                }]
            }];

               // Health Conditions Data
const healthConditions = [{
        name: "Hypertension",
        keywords: /hypertension|high blood pressure|headache|dizziness|shortness of breath/i,
        images: [ // Changed to images array
            "https://placehold.co/150x150/FF0000/FFFFFF?text=High+BP+1",
            "https://placehold.co/150x150/CC0000/FFFFFF?text=High+BP+2",
            "https://placehold.co/150x150/990000/FFFFFF?text=High+BP+3"
        ],
        definition: "Hypertension is a condition in which the force of the blood against the artery walls is too high, often leading to serious health issues.",
        symptoms: "Often asymptomatic; may cause headaches, dizziness, shortness of breath, nosebleeds.",
        dosage: [
            "Requires antihypertensive medications as prescribed by a doctor.",
            "Regular monitoring of blood pressure.",
            "Lifestyle changes such as reducing salt intake and regular exercise."
        ],
        recommendedProducts: ["Cello Q10", "Blood Circulatory Massager"],
        qna: [{
            question: "What causes Hypertension?",
            answer: "Causes include genetics, poor diet, lack of physical activity, and stress."
        }, {
            question: "How can I lower my blood pressure naturally?",
            answer: "Lifestyle changes like diet modification, regular exercise, and stress management can help lower blood pressure."
        }]
    }, {
        name: "Arthritis",
        keywords: /arthritis|joint pain|inflammation|stiffness/i,
        images: [
            "https://placehold.co/150x150/008080/FFFFFF?text=Arthritis+Joint",
            "https://placehold.co/150x150/005050/FFFFFF?text=Inflamed+Joint",
            "https://placehold.co/150x150/003030/FFFFFF?text=Hand+Pain"
        ],
        definition: "Arthritis is an inflammation of one or more joints, causing pain and stiffness that can worsen with age.",
        symptoms: "Joint pain, stiffness, swelling, redness, and decreased range of motion.",
        dosage: [
            "Medical consultation for diagnosis and treatment plan.",
            "Pain management, physical therapy, and anti-inflammatory medications.",
            "Lifestyle adjustments, including exercise and diet."
        ],
        recommendedProducts: ["Jointeez"],
        qna: [{
            question: "What are common types of arthritis?",
            answer: "Common types include osteoarthritis, rheumatoid arthritis, and gout."
        }, {
            question: "Can diet affect arthritis?",
            answer: "Some diets, like the Mediterranean diet, may help reduce inflammation associated with certain types of arthritis."
        }]
    }, {
        name: "Anemia",
        keywords: /anemia|low iron|fatigue|weakness|pale skin/i,
        images: [
            "https://placehold.co/150x150/800000/FFFFFF?text=Anemia+Blood",
            "https://placehold.co/150x150/500000/FFFFFF?text=Fatigue+Sign",
            "https://placehold.co/150x150/300000/FFFFFF?text=Pale+Skin"
        ],
        definition: "Anemia is a condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues.",
        symptoms: "Fatigue, weakness, pale skin, shortness of breath, dizziness, cold hands and feet.",
        dosage: [
            "Diagnosis and treatment by a healthcare professional.",
            "Iron supplements (if iron deficiency anemia), dietary changes to include iron-rich foods.",
            "Addressing underlying causes."
        ],
        recommendedProducts: ["Reishi (Blood Tonic)"],
        qna: [{
            question: "What causes anemia?",
            answer: "Causes include iron deficiency, vitamin deficiencies, chronic diseases, and genetic conditions."
        }, {
            question: "How can I increase my iron intake naturally?",
            answer: "Eat iron-rich foods like red meat, beans, spinach, and fortified cereals. Vitamin C helps with iron absorption."
        }]
    },
    {
        name: "Typhoid Fever",
        keywords: /typhoid|enteric fever|typhus/i,
        images: [
            "https://placehold.co/150x150/4CAF50/FFFFFF?text=Typhoid+Fever",
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=High+Fever",
            "https://placehold.co/150x150/CDDC39/FFFFFF?text=Rose+Spots"
        ],
        symptoms: "Sustained high fever (up to 104°F/40°C), weakness, stomach pain, headache, loss of appetite, rash (rose spots).",
        dosage: [
            "Requires antibiotics prescribed by a doctor (e.g., Ciprofloxacin, Azithromycin, Ceftriaxone).",
            "It is crucial to complete the entire course of antibiotics to prevent relapse and resistance.",
            "Maintain good hydration by drinking plenty of fluids.",
            "Eat small, frequent, and easily digestible meals.",
            "Practice strict hygiene to prevent spread (wash hands frequently).",
            "Follow up with your doctor for monitoring and recovery."
        ],
        recommendedProducts: ["Qinghao"],
        qna: [
            { question: "Is Typhoid contagious?", answer: "Yes, Typhoid fever is highly contagious and spreads through contaminated food and water." },
            { question: "How long does Typhoid last?", answer: "Without treatment, symptoms can last for weeks or even months. With proper treatment, recovery can be quicker." }
        ]
    },
    {
        name: "Headache",
        keywords: /headache|migraine|tension headache|cluster headache/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Headache",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Migraine",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Pain+Relief"
        ],
        symptoms: "Pain in the head, throbbing sensation, sensitivity to light/sound.",
        dosage: ["Rest and hydration are recommended. If persistent, consult your physician."],
        recommendedProducts: ["Memory 24/7 Capsule", "Refresh Tea"],
        qna: []
    },
    {
        name: "Fever",
        keywords: /fever|temperature|high temperature/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Fever",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=High+Temp",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Thermometer"
        ],
        symptoms: "Elevated body temperature, indicating an infection.",
        dosage: ["Rest, fluids, and fever-reducing medication can help. If persistent or very high, seek medical advice."],
        recommendedProducts: ["Reishi", "Qinghao"],
        qna: []
    },
    {
        name: "Hepatitis",
        keywords: /hepatitis|i have hepatitis|what can i use for my hepatitis|liver inflammation|hepatitis b|hepatitis c/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Hepatitis",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Liver+Health",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Jaundice"
        ],
        symptoms: "Liver inflammation, fatigue, jaundice.",
        dosage: ["Reishi is recommended to nourish the liver and support overall health. Consult a healthcare professional for specific treatment."],
        recommendedProducts: ["Reishi", "Golden Six"],
        qna: []
    },
    {
        name: "Tuberculosis (TB)",
        keywords: /tuberculosis|tb infection/i,
        images: [
            "https://placehold.co/150x150/795548/FFFFFF?text=Tuberculosis",
            "https://placehold.co/150x150/A1887F/FFFFFF?text=Lung+Health",
            "https://placehold.co/150x150/D7CCC8/FFFFFF?text=TB+Bacteria"
        ],
        symptoms: "Chronic cough, fever, night sweats, weight loss.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
        recommendedProducts: ["Reishi", "Cordy Active"],
        qna: []
    },
    {
        name: "Cough",
        keywords: /cough|dry cough|wet cough/i,
        images: [
            "https://placehold.co/150x150/9E9E9E/FFFFFF?text=Cough",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Sore+Throat",
            "https://placehold.co/150x150/E8EAF6/FFFFFF?text=Cough+Syrup"
        ],
        symptoms: "A sudden expulsion of air from the lungs.",
        dosage: ["Consider using Reishi to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Cordy Active"],
        qna: []
    },
    {
        name: "Flu",
        keywords: /flu|influenza/i,
        images: [
            "https://placehold.co/150x150/2196F3/FFFFFF?text=Flu",
            "https://placehold.co/150x150/64B5F6/FFFFFF?text=Influenza",
            "https://placehold.co/150x150/90CAF9/FFFFFF?text=Virus"
        ],
        symptoms: "Fever, body aches, fatigue, respiratory symptoms.",
        dosage: ["Consider using Reishi to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Cordy Active"],
        qna: []
    },
    {
        name: "Cold",
        keywords: /cold|common cold/i,
        images: [
            "https://placehold.co/150x150/4DD0E1/FFFFFF?text=Cold",
            "https://placehold.co/150x150/80DEEA/FFFFFF?text=Runny+Nose",
            "https://placehold.co/150x150/B2EBF2/FFFFFF?text=Tissue"
        ],
        symptoms: "Runny nose, sore throat, sneezing, mild fatigue.",
        dosage: ["Consider using Reishi to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Refresh Tea"],
        qna: []
    },
    {
        name: "Allergies",
        keywords: /allergies|allergic reaction|hay fever/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Allergies",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Pollen",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Sneezing"
        ],
        symptoms: "Sneezing, itching, rashes, congestion.",
        dosage: ["Consider using Reishi to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi"],
        qna: []
    },
    {
        name: "Sinusitis",
        keywords: /sinusitis|sinus infection/i,
        images: [
            "https://placehold.co/150x150/FFC107/FFFFFF?text=Sinusitis",
            "https://placehold.co/150x150/FFD54F/FFFFFF?text=Sinus+Pain",
            "https://placehold.co/150x150/FFE082/FFFFFF?text=Congestion"
        ],
        symptoms: "Facial pain/pressure, nasal congestion, headache.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
        recommendedProducts: ["Reishi", "Refresh Tea"],
        qna: []
    },
    {
        name: "Pneumonia",
        keywords: /pneumonia|lung infection/i,
        images: [
            "https://placehold.co/150x150/673AB7/FFFFFF?text=Pneumonia",
            "https://placehold.co/150x150/9575CD/FFFFFF?text=Lung+Infection",
            "https://placehold.co/150x150/B39DDB/FFFFFF?text=Chest+Pain"
        ],
        symptoms: "Cough, fever, difficulty breathing, chest pain.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
        recommendedProducts: ["Reishi", "Cordy Active"],
        qna: []
    },
    {
        name: "Diarrhea",
        keywords: /diarrhea|loose stools/i,
        images: [
            "https://placehold.co/150x150/795548/FFFFFF?text=Diarrhea",
            "https://placehold.co/150x150/A1887F/FFFFFF?text=Loose+Stools",
            "https://placehold.co/150x150/D7CCC8/FFFFFF?text=Dehydration"
        ],
        symptoms: "Frequent loose, watery bowel movements.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
        recommendedProducts: ["Reishi", "Constilease"],
        qna: []
    },
    {
        name: "Constipation",
        keywords: /constipation|difficulty passing stools/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Constipation",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Digestive+Health",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Fiber"
        ],
        symptoms: "Infrequent or difficult bowel movements.",
        dosage: ["Consider using Constilease to support digestive health. Ensure adequate fiber and fluid intake."],
        recommendedProducts: ["Constilease"],
        qna: []
    },
    {
        name: "Digestive Health",
        keywords: /digestive health|gut health/i,
        images: [
            "https://placehold.co/150x150/CDDC39/FFFFFF?text=Digestive+Health",
            "https://placehold.co/150x150/DCEDC8/FFFFFF?text=Gut+Health",
            "https://placehold.co/150x150/F0F4C3/FFFFFF?text=Healthy+Stomach"
        ],
        symptoms: "General discomfort, bloating, irregular bowel movements.",
        dosage: ["Gastrifort Capsule is beneficial for supporting overall digestive function."],
        recommendedProducts: ["Gastrifort Capsule", "Constilease"],
        qna: []
    },
    {
        name: "Blood Sugar Management",
        keywords: /blood sugar management|glucose control/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Blood+Sugar",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Glucose+Control",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Diabetes+Care"
        ],
        symptoms: "Fluctuations in blood sugar levels.",
        dosage: ["Consider using Diawell to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Diawell", "Golden Six"],
        qna: []
    },
    {
        name: "Blood Pressure Management",
        keywords: /blood pressure management|hypertension management/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=BP+Management",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Healthy+BP",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Heart+Health"
        ],
        symptoms: "High or low blood pressure.",
        dosage: ["Consider using Cello Q10 and Reishi to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Cello Q10", "Reishi"],
        qna: []
    },
    {
        name: "Heart Disease",
        keywords: /heart disease|cardiac issues/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Heart+Disease",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Cardiac+Care",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Healthy+Heart"
        ],
        symptoms: "Chest pain, shortness of breath, fatigue.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Cello Q10 and Reishi can support overall health."],
        recommendedProducts: ["Cello Q10", "Reishi", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Cardiovascular Health",
        keywords: /cardiovascular health|heart health/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Cardio+Health",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Heart+Wellness",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Blood+Circulation"
        ],
        symptoms: "General concern for heart and blood vessel well-being.",
        dosage: ["Consider using Cello Q10 and Reishi to support overall heart function."],
        recommendedProducts: ["Cello Q10", "Reishi", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Cholesterol Management",
        keywords: /cholesterol|high cholesterol/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Cholesterol",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Healthy+Fats",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Lipid+Control"
        ],
        symptoms: "High levels of harmful cholesterol in blood.",
        dosage: ["Consider using Reishi and Magilim to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Magilim"],
        qna: []
    },
    {
        name: "Stroke",
        keywords: /stroke|cerebrovascular accident/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Stroke",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Brain+Health",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Recovery"
        ],
        symptoms: "Sudden weakness or numbness, difficulty speaking, vision problems.",
        dosage: ["For stroke recovery, please consult a healthcare professional for appropriate treatment. Reishi and Memory 24/7 Capsule can support overall health."],
        recommendedProducts: ["Reishi", "Memory 24/7 Capsule", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Cancer",
        keywords: /cancer|malignancy|oncology/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Cancer",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Oncology",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Research"
        ],
        symptoms: "Uncontrolled growth of abnormal cells.",
        dosage: ["For cancer treatment, please consult a healthcare professional for appropriate care. Golden Hypha and Reishi can support overall health."],
        recommendedProducts: ["Golden Hypha", "Reishi"],
        qna: []
    },
    {
        name: "Tumor",
        keywords: /tumor|neoplasm|mass/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Tumor",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Growth",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Biopsy"
        ],
        symptoms: "Abnormal growth of tissue.",
        dosage: ["For tumor treatment, please consult a healthcare professional for appropriate care. Golden Hypha and Reishi can support overall health."],
        recommendedProducts: ["Golden Hypha", "Reishi"],
        qna: []
    },
    {
        name: "Anemia",
        keywords: /anemia|low blood count/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Anemia",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Blood+Count",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Iron+Deficiency"
        ],
        symptoms: "Fatigue, weakness, pale skin, shortness of breath.",
        dosage: ["Consider using Reishi (Blood Tonic) to support blood health and overall well-being."],
        recommendedProducts: ["Reishi (Blood Tonic)", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Blood Health",
        keywords: /blood health|blood circulation|blood purification/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Blood+Health",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Circulation",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Purification"
        ],
        symptoms: "General concern for blood quality and function.",
        dosage: ["Reishi (Blood Tonic) is beneficial for supporting overall blood function."],
        recommendedProducts: ["Reishi (Blood Tonic)", "Reishi"],
        qna: []
    },
    {
        name: "Iron Deficiency",
        keywords: /iron deficiency|low iron/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Iron+Deficiency",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Low+Iron",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Fatigue"
        ],
        symptoms: "Fatigue, weakness, brittle nails.",
        dosage: ["Consider using Reishi (Blood Tonic) to support blood health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi (Blood Tonic)", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Blood Disorders",
        keywords: /blood disorders|blood diseases/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Blood+Disorders",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Hematology",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Disease"
        ],
        symptoms: "Various symptoms depending on the specific disorder.",
        dosage: ["For blood disorders, please consult a healthcare professional for appropriate treatment. Reishi (Blood Tonic) can support overall health."],
        recommendedProducts: ["Reishi (Blood Tonic)", "Reishi"],
        qna: []
    },
    {
        name: "Immune System Boost",
        keywords: /immune system|immunity enhancement/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Immune+Boost",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Immunity",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Health"
        ],
        symptoms: "Frequent illness, low resistance.",
        dosage: ["Consider using Reishi and Golden Hypha to support overall health."],
        recommendedProducts: ["Reishi", "Golden Hypha", "Cordy Active"],
        qna: []
    },
    {
        name: "Stress Relief",
        keywords: /stress|stress management/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Stress+Relief",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Relaxation",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Calm"
        ],
        symptoms: "Tension, irritability, fatigue due to stress.",
        dosage: ["Consider using Reishi and Golden Six to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Golden Six", "Cordy Active"],
        qna: []
    },
    {
        name: "Anxiety Relief",
        keywords: /anxiety|nervousness|worry/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Anxiety+Relief",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Peace",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Mindfulness"
        ],
        symptoms: "Excessive worry, restlessness, difficulty concentrating.",
        dosage: ["Consider using Reishi and Golden Six to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Golden Six", "Cordy Active"],
        qna: []
    },
    {
        name: "Depression",
        keywords: /depression|mood disorder/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Depression",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Mood+Support",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Mental+Health"
        ],
        symptoms: "Persistent sadness, loss of interest, low energy.",
        dosage: ["For depression, please consult a healthcare professional for appropriate treatment. Reishi and Memory 24/7 Capsule can support overall health."],
        recommendedProducts: ["Reishi", "Memory 24/7 Capsule", "Cordy Active"],
        qna: []
    },
    {
        name: "Mental Health Support",
        keywords: /mental health|cognitive well-being/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Mental+Health",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Well-being",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Cognitive+Support"
        ],
        symptoms: "General concern for cognitive function and emotional balance.",
        dosage: ["Consider using Reishi and Memory 24/7 Capsule to promote overall well-being."],
        recommendedProducts: ["Reishi", "Memory 24/7 Capsule", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Sleep Disorders",
        keywords: /sleep disorders|insomnia|poor sleep/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Sleep+Disorders",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Insomnia",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Restful+Sleep"
        ],
        symptoms: "Difficulty falling or staying asleep, restless sleep.",
        dosage: ["Consider using Reishi and Golden Six to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Golden Six"],
        qna: []
    },
    {
        name: "Insomnia",
        keywords: /insomnia|sleeplessness/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Insomnia",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Sleeplessness",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Sleep+Aid"
        ],
        symptoms: "Inability to sleep.",
        dosage: ["Consider using Reishi and Golden Six to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Golden Six"],
        qna: []
    },
    {
        name: "Fatigue",
        keywords: /fatigue|tiredness|exhaustion/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Fatigue",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Tiredness",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Energy+Boost"
        ],
        symptoms: "Extreme tiredness, lack of energy.",
        dosage: ["Consider using Reishi and Cordy Active to support overall health and energy levels."],
        recommendedProducts: ["Reishi", "Cordy Active", "Vigor Essential"],
        qna: []
    },
    {
        name: "Low Energy",
        keywords: /low energy|lack of vitality/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Low+Energy",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Vitality",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Boost+Energy"
        ],
        symptoms: "Reduced physical and mental energy.",
        dosage: ["Consider using Reishi and Cordy Active to support overall health and vitality."],
        recommendedProducts: ["Reishi", "Cordy Active", "Vigor Essential"],
        qna: []
    },
    {
        name: "Chronic Fatigue",
        keywords: /chronic fatigue|cfs/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Chronic+Fatigue",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=CFS",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Persistent+Tiredness"
        ],
        symptoms: "Persistent and debilitating fatigue.",
        dosage: ["Consider using Reishi and Cordy Active to support overall health. Consult a healthcare professional for specific treatments."],
        recommendedProducts: ["Reishi", "Cordy Active", "Golden Six"],
        qna: []
    },
    {
        name: "Ischemic Heart Disease",
        keywords: /ischemic heart disease|coronary artery disease|cad/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Ischemic+HD",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=CAD",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Heart+Attack"
        ],
        symptoms: "Chest pain, shortness of breath, fatigue due to reduced blood flow to heart.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Cello Q10 and Reishi can support overall health."],
        recommendedProducts: ["Cello Q10", "Reishi", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Obesity",
        keywords: /obesity|weight gain|reduce obesity/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Obesity",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Weight+Loss",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Healthy+Weight"
        ],
        symptoms: "Excessive body fat.",
        dosage: ["Consider using Magilim to support weight loss and fat burning. Combine with diet and exercise."],
        recommendedProducts: ["Magilim"],
        qna: []
    },
    {
        name: "Gastroesophageal Reflux Disease (GERD)",
        keywords: /gastroesophageal reflux disease|acid reflux|heartburn/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=GERD",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Acid+Reflux",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Heartburn"
        ],
        symptoms: "Heartburn, regurgitation, difficulty swallowing.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Gastrifort Capsule can support overall health."],
        recommendedProducts: ["Gastrifort Capsule", "Reishi"],
        qna: []
    },
    {
        name: "Peptic Ulcer Disease",
        keywords: /peptic ulcer disease|stomach ulcer|duodenal ulcer/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Peptic+Ulcer",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Stomach+Ulcer",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Gastric+Pain"
        ],
        symptoms: "Burning stomach pain, bloating, nausea.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Gastrifort Capsule can support overall health."],
        recommendedProducts: ["Gastrifort Capsule", "Reishi"],
        qna: []
    },
    {
        name: "Inflammatory Bowel Disease (IBD)",
        keywords: /inflammatory bowel disease|crohn's disease|ulcerative colitis/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=IBD",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Crohn's",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Colitis"
        ],
        symptoms: "Abdominal pain, diarrhea, weight loss.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi and Gastrifort Capsule can support overall health."],
        recommendedProducts: ["Reishi", "Gastrifort Capsule", "Constilease"],
        qna: []
    },
    {
        name: "Chronic Kidney Disease (CKD)",
        keywords: /chronic kidney disease|kidney failure/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=CKD",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Kidney+Health",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Renal+Care"
        ],
        symptoms: "Fatigue, swelling, changes in urination.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Golden Six and Reishi can support overall health."],
        recommendedProducts: ["Golden Six", "Reishi"],
        qna: []
    },
    {
        name: "Urinary Tract Infections (UTIs)",
        keywords: /urinary tract infections|bladder infection/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=UTI",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Bladder+Infection",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Urinary+Health"
        ],
        symptoms: "Painful urination, frequent urination, urgency.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Golden Six and Reishi can support overall health."],
        recommendedProducts: ["Golden Six", "Reishi"],
        qna: []
    },
    {
        name: "Parkinson's Disease",
        keywords: /parkinson's disease|pd/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Parkinson's",
            "https://placehold.co/150x150/F06292/FFFFFF?text=PD",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Neurological"
        ],
        symptoms: "Tremors, rigidity, bradykinesia, postural instability.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Memory 24/7 Capsule and Reishi can support overall health."],
        recommendedProducts: ["Memory 24/7 Capsule", "Reishi", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Alzheimer's Disease",
        keywords: /alzheimer's disease|ad/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Alzheimer's",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=AD",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Memory+Loss"
        ],
        symptoms: "Memory loss, cognitive decline, confusion.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Memory 24/7 Capsule and Reishi can support overall health."],
        recommendedProducts: ["Memory 24/7 Capsule", "Reishi", "Cordy Royal Jelly"],
        qna: []
    },
    {
        name: "Multiple Sclerosis (MS)",
        keywords: /multiple sclerosis|ms/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=MS",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Neurological+Disorder",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Immune+System"
        ],
        symptoms: "Fatigue, numbness, muscle weakness, vision problems.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Memory 24/7 Capsule and Reishi can support overall health."],
        recommendedProducts: ["Memory 24/7 Capsule", "Reishi", "Golden Hypha"],
        qna: []
    },
    {
        name: "Psoriatic Arthritis",
        keywords: /psoriatic arthritis|psa/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Psoriatic+Arthritis",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=PSA",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Joint+Pain"
        ],
        symptoms: "Joint pain, stiffness, swelling, often with psoriasis.",
        dosage: ["Jointeez is recommended to support joint health and relieve pain. Consult a healthcare professional for management."],
        recommendedProducts: ["Jointeez", "Golden Six"],
        qna: []
    },
    {
        name: "Osteoarthritis",
        keywords: /osteoarthritis|oa|degenerative joint disease/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Osteoarthritis",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=OA",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Joint+Degeneration"
        ],
        symptoms: "Joint pain, stiffness, reduced flexibility.",
        dosage: ["Jointeez is recommended to support joint health and relieve pain. Consult a healthcare professional for management."],
        recommendedProducts: ["Jointeez", "Golden Six"],
        qna: []
    },
    {
        name: "Gout",
        keywords: /gout|uric acid arthritis/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Gout",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Uric+Acid",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Toe+Pain"
        ],
        symptoms: "Severe joint pain, redness, swelling, tenderness.",
        dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
        recommendedProducts: ["Reishi", "Golden Six"],
        qna: []
    },
    {
        name: "Lung Cancer",
        keywords: /lung cancer|bronchogenic carcinoma/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Lung+Cancer",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Bronchial",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Respiratory"
        ],
        symptoms: "Persistent cough, chest pain, shortness of breath, weight loss.",
        dosage: ["For lung cancer, please consult a healthcare professional for appropriate treatment. Golden Hypha and Reishi can support overall health."],
        recommendedProducts: ["Golden Hypha", "Reishi", "Cordy Active"],
        qna: []
    },
    {
        name: "Colorectal Cancer",
        keywords: /colorectal cancer|colon cancer|rectal cancer/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Colorectal+Cancer",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Colon+Cancer",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Rectal+Cancer"
        ],
        symptoms: "Changes in bowel habits, rectal bleeding, abdominal discomfort.",
        dosage: ["For colorectal cancer, please consult a healthcare professional for appropriate treatment. Golden Hypha and Reishi can support overall health."],
        recommendedProducts: ["Golden Hypha", "Reishi", "Constilease"],
        qna: []
    },
    {
        name: "Breast Cancer",
        keywords: /breast cancer|mammary cancer/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Breast+Cancer",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Mammary",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Awareness"
        ],
        symptoms: "Lump in breast, changes in breast size/shape, nipple discharge.",
        dosage: ["For breast cancer, please consult a healthcare professional for appropriate treatment. Golden Hypha and Reishi can support overall health."],
        recommendedProducts: ["Golden Hypha", "Reishi", "Gynapharm Capsule"],
        qna: []
    },
    {
        name: "Prostate Cancer",
        keywords: /prostate cancer|prostate malignancy/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Prostate+Cancer",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Prostate+Health",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Men's+Health"
        ],
        symptoms: "Difficulty urinating, blood in urine/semen, bone pain.",
        dosage: ["For prostate cancer, please consult a healthcare professional for appropriate treatment. Lycovite and Reishi are beneficial for prostate health and men's wellness."],
        recommendedProducts: ["Lycovite", "Reishi", "Vigor Essential"],
        qna: []
    },
    {
        name: "Lumps",
        keywords: /lumps|abnormal growth|mass|lump/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Lumps",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Abnormal+Growth",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Mass"
        ],
        symptoms: "Palpable abnormal growths on or in the body.",
        dosage: ["For lumps, please consult a healthcare professional for appropriate evaluation and treatment. Golden Hypha and Reishi can support overall health."],
        recommendedProducts: ["Golden Hypha", "Reishi"],
        qna: []
    },
    {
        name: "Acne",
        keywords: /acne|pimples|blackheads|skin inflammation/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Acne",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Pimples",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Skin+Care"
        ],
        symptoms: "Redness, swelling, and inflammation of the skin, black and chest caused by inflammation of oil glands.",
        dosage: ["Golden Six 1*2 daily"],
        recommendedProducts: ["Golden Six", "Reishi"],
        qna: []
    },
    {
        name: "Amoebiasis",
        keywords: /amoebiasis|gallbladder inflammation|infection|gallstone/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Amoebiasis",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Gallbladder",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Infection"
        ],
        symptoms: "Gallbladder inflammation and infection caused by a gallstone (a stone-like mass that forms in the gallbladder).",
        dosage: ["Cordy Royal Jelly 3*2 daily"],
        recommendedProducts: ["Cordy Royal Jelly", "Reishi"],
        qna: []
    },
    {
        name: "Adenoids (Adenoma)",
        keywords: /adenoids|adenoma|gland inflammation|throat growth/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Adenoids",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Throat+Growth",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Gland+Inflammation"
        ],
        symptoms: "Inflammation of the adenoid gland (a tonsil-like growth located at the back of the throat).",
        dosage: ["3*2 daily"],
        recommendedProducts: ["Reishi", "Cordy Active"],
        qna: []
    },
    {
        name: "Age Spot",
        keywords: /age spot|pigmentation|melanin patch|skin discoloration/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Age+Spot",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Pigmentation",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Skin+Discoloration"
        ],
        symptoms: "Coloured patch on the skin (pigmentation due to the accumulation of melanin by the sebaceous glands under the skin).",
        dosage: ["3*2 daily"],
        recommendedProducts: ["Reishi", "Golden Six"],
        qna: []
    },
    {
        name: "Aging",
        keywords: /aging|ageing|growing old|senescence/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Aging",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Anti-Aging",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Wellness"
        ],
        symptoms: "Multidimensional process of physical, psychological, and social changes that occur over time.",
        dosage: ["4*2 daily"],
        recommendedProducts: ["Cordy Active", "Golden Six", "Reishi"],
        qna: []
    },
    {
        name: "AIDS/HIV Positive",
        keywords: /aids|hiv|immune deficiency|hiv positive/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=AIDS/HIV",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Immune+Support",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=HIV+Positive"
        ],
        symptoms: "Disease that kills the immune system (defender) of the body, making the body vulnerable to all kinds of diseases.",
        dosage: ["3*2 daily"],
        recommendedProducts: ["Reishi", "Golden Hypha"],
        qna: []
    },
    {
        name: "Alcoholism (Effect)",
        keywords: /alcoholism|alcohol|nervous system damage|collapse/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Alcoholism",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Liver+Damage",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Recovery"
        ],
        symptoms: "Damages the nervous system and organs, characterized by chronic and tendency to collapse.",
        dosage: ["4*2 daily"],
        recommendedProducts: ["Golden Hypha", "Reishi"],
        qna: []
    },
    {
        name: "Allergic Dermatitis",
        keywords: /allergic dermatitis|skin allergy|dermatitis|itching|redness/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Allergic+Dermatitis",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Skin+Allergy",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Itching"
        ],
        symptoms: "Inflammation of the skin, caused by allergic reactions, often accompanied by itching, redness, and swelling.",
        dosage: ["3*2 daily"],
        recommendedProducts: ["Reishi"],
        qna: []
    },
    {
        name: "Allergic Rhinitis (Hay Fever)",
        keywords: /allergic rhinitis|hay fever|sneezing|runny nose|nasal allergy/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Allergic+Rhinitis",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Hay+Fever",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Nasal+Allergy"
        ],
        symptoms: "Inflammation of the nasal mucosa, caused by allergic reactions, often accompanied by sneezing, itching, and a runny nose.",
        dosage: ["3*2 daily"],
        recommendedProducts: ["Reishi", "Refresh Tea"],
        qna: []
    },
    {
        name: "Alzheimer Senility",
        keywords: /alzheimer|senility|memory loss|dementia|brain disorder/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Alzheimer's",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Dementia",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Memory+Care"
        ],
        symptoms: "Progressive brain disorder that affects memory, thinking, and behavior, often leading to dementia.",
        dosage: ["3*2 daily"],
        recommendedProducts: ["Cordy Royal Jelly", "Memory 24/7 Capsule", "Reishi"],
        qna: []
    },
    {
        name: "Amoeba",
        keywords: /amoeba|protozoa|single-celled|cytoplasm projections/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Amoeba",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Protozoa",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Microorganism"
        ],
        symptoms: "A single-celled animal such as protozoa that moves by means of temporary projections of its cytoplasm.",
        recommendedProducts: ["Reishi", "Constilease"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Anemia",
        keywords: /anemia|low hemoglobin|red blood cells deficiency/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Anemia",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Low+Hemoglobin",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Blood+Deficiency"
        ],
        symptoms: "Deficiency in the blood brought about by a decrease in the number of red blood cells or in the haemoglobin content.",
        recommendedProducts: ["Cordy Royal Jelly", "Reishi (Blood Tonic)"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Angina",
        keywords: /angina|heart disease|chest pain|pectoris/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Angina",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Chest+Pain",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Heart+Condition"
        ],
        symptoms: "Heart disease in which the patient suffers pectoris from inadequate supply of blood to the heart.",
        recommendedProducts: ["Reishi", "Cello Q10"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Anorexia",
        keywords: /anorexia|loss of appetite|can't eat/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Anorexia",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Appetite+Loss",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Eating+Disorder"
        ],
        symptoms: "Inability to eat (loss of appetite).",
        recommendedProducts: ["Cordy Active", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Anuria",
        keywords: /anuria|kidney failure|scanty urine/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Anuria",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Kidney+Failure",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Urine+Output"
        ],
        symptoms: "Failure of kidney function causing scanty urine.",
        recommendedProducts: ["Golden Six", "Reishi"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Anxiety",
        keywords: /anxiety|restlessness|apprehension|uneasiness/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Anxiety",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Restlessness",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Worry"
        ],
        symptoms: "Restlessness, feeling of apprehension, the source of which is not recognized.",
        recommendedProducts: ["Cordy Active", "Reishi", "Golden Six"],
        dosage: ["2*2 daily"],
        qna: []
    },
    {
        name: "Arrhythmia",
        keywords: /arrhythmia|irregular heartbeat|palpitations/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Arrhythmia",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Irregular+Heartbeat",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Palpitations"
        ],
        symptoms: "Irregular heartbeat.",
        recommendedProducts: ["Reishi", "Cello Q10", "Cordy Royal Jelly"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Arteriosclerosis",
        keywords: /arteriosclerosis|cholesterol arteries|thickened arteries|hardened arteries/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Arteriosclerosis",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Hardened+Arteries",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Cholesterol"
        ],
        symptoms: "Degeneration and hardening of the (cholesterol) arteries, thickening of arterial walls due to cholesterol deposits. It also reduces blood flow and causes elasticity.",
        recommendedProducts: ["Reishi", "Cello Q10"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Asthma",
        keywords: /asthma|bronchial asthma|difficulty breathing|coughing|trouble breathing/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Asthma",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Breathing+Difficulty",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Inhaler"
        ],
        symptoms: "Disease of the bronchial tubes which lead from the windpipe or trachea into lungs causing paroxysms of coughing or difficulty in breathing (technically called bronchial asthma).",
        recommendedProducts: ["Reishi", "Cordy Active"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Atherosclerosis",
        keywords: /atherosclerosis|artery hardening|plaque buildup|cholesterol|arterial blockage|arteriosclerosis/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Atherosclerosis",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Plaque+Buildup",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Artery+Health"
        ],
        symptoms: "A condition characterized by the buildup of plaque inside the arteries, causing them to narrow and harden, leading to poor blood circulation and increased risk of heart disease.",
        recommendedProducts: ["Reishi", "Cello Q10", "Magilim"],
        dosage: ["Reishi: 3×2 daily", "Cello Q10: 1 capsule daily", "Magilim: 2 capsules twice daily"],
        qna: [
            {
                question: "What causes atherosclerosis?",
                answer: "Atherosclerosis is typically caused by high cholesterol, high blood pressure, smoking, and inflammation of the arteries."
            },
            {
                question: "Can atherosclerosis be reversed?",
                answer: "While plaque buildup can't be completely reversed, lifestyle changes and supplements can slow progression and improve artery health."
            }
        ]
    },
    {
        name: "Athlete’s Foot",
        keywords: /athlete’s foot|foot fungus|toe cracks|itching toes|redness between toes|fungal foot infection/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Athlete's+Foot",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Foot+Fungus",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Itchy+Toes"
        ],
        symptoms: "Fungal infection between the toes characterized by cracks, redness, itching, sores, pains and disabilities.",
        recommendedProducts: ["Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Back Ache",
        keywords: /back ache|back pain|waist pain|spinal pain|backbone pain/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Back+Ache",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Back+Pain",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Spinal+Pain"
        ],
        symptoms: "Severe pains in the backbone, waist or back region.",
        recommendedProducts: ["Golden Six", "Jointeez"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Bacteraemia",
        keywords: /bacteraemia|bacteria in blood|blood poisoning|septicemia/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Bacteraemia",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Blood+Poisoning",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Sepsis"
        ],
        symptoms: "Presence of bacteria in the blood, causing blood poisoning.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Barber’s Itch",
        keywords: /barber’s itch|beard fungus|face fungal infection|itchy beard|bearded area bumps/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Barber's+Itch",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Beard+Fungus",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Skin+Infection"
        ],
        symptoms: "Bumps, fungal infections of the bearded portions in the face, head and neck, causing inflammation of glands, burning and itching.",
        recommendedProducts: ["Golden Hypha", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Bleeding Gums (gingivitis)",
        keywords: /bleeding gums|gingivitis|gum inflammation|swollen gums|gum pain/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Bleeding+Gums",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Gingivitis",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Oral+Health"
        ],
        symptoms: "Inflammation of gums.",
        recommendedProducts: ["Gum Care Toothpaste", "Reishi"],
        dosage: ["Use as toothpaste", "3*2 daily"],
        qna: []
    },
    {
        name: "Blocked Fallopian Tube",
        keywords: /blocked fallopian tube|fallopian tube obstruction|fluid collection in tubes/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Blocked+Fallopian",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Infertility",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Reproductive+Health"
        ],
        symptoms: "Collections of fluid in the skin causing a raised area.",
        recommendedProducts: ["Gynapharm Capsule", "Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Blood Infection",
        keywords: /blood infection|bacterial blood infection|sepsis|septicemia/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Blood+Infection",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Sepsis",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Bacterial"
        ],
        symptoms: "Infection in the blood caused by bacteria.",
        recommendedProducts: ["Golden Six", "Reishi", "Golden Hypha"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Boils",
        keywords: /boils|pus-filled skin|raised skin infection|skin abscess|bacterial boils/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Boils",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Skin+Abscess",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Pus"
        ],
        symptoms: "Pus-filled, raised area on the skin caused by bacteria.",
        recommendedProducts: ["Cordy Active", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Breathing Difficulty",
        keywords: /breathing difficulty|dyspnoea|shortness of breath|trouble breathing|respiratory distress/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Breathing+Difficulty",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Dyspnoea",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Shortness+of+Breath"
        ],
        symptoms: "Inability to breathe normally and painlessly, shortness of breath, also called dyspnoea.",
        recommendedProducts: ["Cordy Active", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Bronchitis",
        keywords: /bronchitis|coughing and sneezing|larynx swelling|upper respiratory tract inflammation/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Bronchitis",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Coughing",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Respiratory"
        ],
        symptoms: "Swelling causing severe coughing and sneezing, thus affecting the larynx and the upper respiratory tract.",
        recommendedProducts: ["Reishi", "Cordy Active"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Bruxism",
        keywords: /bruxism|teeth grinding|night grinding|sleep bruxism|neurotic jaw clenching/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Bruxism",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Teeth+Grinding",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Jaw+Clenching"
        ],
        symptoms: "Grinding of teeth while sleeping, sometimes a manifestation of neurosis.",
        recommendedProducts: ["Reishi", "Golden Six"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Bunion",
        keywords: /bunion|great toe swelling|painful toe joint|foot bunion/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Bunion",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Toe+Swelling",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Foot+Pain"
        ],
        symptoms: "Swelling at the first joint of the great toe. This can be very painful.",
        recommendedProducts: ["Cordy Royal Jelly", "Jointeez"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Burns (Scalds)",
        keywords: /burns|scalds|heat exposure|chemical burn|electrical burn/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Burns",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Scalds",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Heat+Exposure"
        ],
        symptoms: "The effect of undue exposure to heat, chemical or electrical current.",
        recommendedProducts: ["Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Cancer",
        keywords: /cancer|malignant tumour|uncontrolled cell growth|tumor spread|metastasis/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Cancer",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Tumor",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Malignancy"
        ],
        symptoms: "Malignant tumour. Uncontrolled growth of cells that are unusually large and move into embryonic cells, then destroy the body's tissues. It can spread to other parts of the body.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Cardiovascular",
        keywords: /cardiovascular|heart problems|blood vessel issues|hardened heart|heart membrane disorder/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Cardiovascular",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Heart+Health",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Blood+Vessels"
        ],
        symptoms: "Problems in the heart and blood vessels characterized by hardening of the heart and membranes.",
        recommendedProducts: ["Cordy Royal Jelly", "Cello Q10", "Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Cataract",
        keywords: /cataract|eye inflammation|iris inflammation|retina inflammation|clouded vision/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Cataract",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Eye+Health",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Vision"
        ],
        symptoms: "Inflammation of the iris or retina in excess.",
        recommendedProducts: ["Eye Beta Capsule", "Refresh Tea"],
        dosage: ["2*2 daily"],
        qna: []
    },
    {
        name: "Cholera",
        keywords: /cholera|acute diarrhoea|contaminated water|contaminated food|cholera infection/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Cholera",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Diarrhoea",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Contaminated+Water"
        ],
        symptoms: "An acute diarrhoeal infection caused by consumption of contaminated food or water.",
        recommendedProducts: ["Reishi", "Constilease"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Chronic Fatigue Syndrome (Liver Disease)",
        keywords: /chronic fatigue|liver disease|fatigue syndrome|muscle pain|weakness|post-exertional malaise/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Chronic+Fatigue",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Liver+Disease",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Exhaustion"
        ],
        symptoms: "Fatigue, weakness, muscle pain, and other symptoms that worsen with physical or mental activity.",
        recommendedProducts: ["Cordy Active", "Reishi", "Golden Six"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Cirrhosis",
        keywords: /cirrhosis|liver degeneration|infectious liver disease|contagious liver illness/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Cirrhosis",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Liver+Degeneration",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Infectious"
        ],
        symptoms: "Marked by degeneration of the liver, the disease is infectious and contagious.",
        recommendedProducts: ["Golden Six", "Reishi"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Climacteric (Menopause)",
        keywords: /climacteric|menopause|hormonal changes|female transition|perimenopause|postmenopause/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Menopause",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Hormonal+Changes",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Female+Health"
        ],
        symptoms: "The period leading up to and after menopause, characterized by hormonal changes.",
        recommendedProducts: ["Golden Six", "Gynapharm Capsule"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Cold Sore",
        keywords: /cold sore|fever blister|herpes simplex|lip sore|oral herpes/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Cold+Sore",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Herpes+Simplex",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Lip+Sore"
        ],
        symptoms: "Fever blisters (sore on the lips, sometimes appears when the patient has fever) caused by the herpes simplex virus.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Colitis",
        keywords: /colitis|colon inflammation|large intestine inflammation|intestinal swelling/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Colitis",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Colon+Inflammation",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Intestinal+Health"
        ],
        symptoms: "Inflammation of the colon (large intestine).",
        recommendedProducts: ["Reishi", "Gastrifort Capsule", "Constilease"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Conjunctivitis (Pink Eye)",
        keywords: /conjunctivitis|pink eye|eye redness|eye discharge|eye inflammation/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Conjunctivitis",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Pink+Eye",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Eye+Infection"
        ],
        symptoms: "Inflammation of the conjunctiva.",
        recommendedProducts: ["Eye Beta Capsule", "Refresh Tea"],
        dosage: ["2*2 daily"],
        qna: []
    },
    {
        name: "Constipation",
        keywords: /constipation|bowel difficulty|irregular bowel movement|headache from constipation|digestive blockage/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Constipation",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Bowel+Difficulty",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Digestive+Relief"
        ],
        symptoms: "Condition in which the bowels move less often than usual and with difficulty characterized by headache.",
        recommendedProducts: ["Constilease"],
        dosage: ["2*2 daily"],
        qna: []
    },
    {
        name: "Corns",
        keywords: /corns|thickened skin|toe friction|tight shoes|foot pressure/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Corns",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Thickened+Skin",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Foot+Care"
        ],
        symptoms: "Area of thickened skin on the toes. They are usually caused by friction or pressure from tight-fitting shoes.",
        recommendedProducts: ["Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Coronary Thrombosis",
        keywords: /coronary thrombosis|blood clots|heart clot|blocked arteries|heart failure/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Coronary+Thrombosis",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Blood+Clots",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Heart+Health"
        ],
        symptoms: "Formation of blood clots in the coronary arteries, interfering with the blood supply to the heart muscles. This can cause heart failure.",
        recommendedProducts: ["Cordy Royal Jelly", "Cello Q10", "Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Cystitis-Benign",
        keywords: /cystitis|benign cystitis|bladder inflammation|urinary discomfort/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Cystitis",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Bladder+Inflammation",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Urinary+Tract"
        ],
        symptoms: "Inflammation of the bladder.",
        recommendedProducts: ["Cordy Active", "Golden Six"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Debility (General)",
        keywords: /debility|general weakness|body fatigue|low energy/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Debility",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Weakness",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Fatigue"
        ],
        symptoms: "General weakness of the body.",
        recommendedProducts: ["Cordy Active", "Reishi", "Vigor Essential"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Dehydration",
        keywords: /dehydration|water loss|fluid depletion|dry body|lack of hydration/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Dehydration",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Water+Loss",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Hydration"
        ],
        symptoms: "Loss or removal of water from the body.",
        recommendedProducts: ["Reishi", "Refresh Tea"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Dementia (Mental Blockage)",
        keywords: /dementia|mental blockage|memory loss|reasoning deterioration|mental decline/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Dementia",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Memory+Loss",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Cognitive+Decline"
        ],
        symptoms: "Deterioration of mind, especially with respect to reasoning, willpower, and mind.",
        recommendedProducts: ["Cordy Royal Jelly", "Memory 24/7 Capsule", "Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Depression",
        keywords: /depression|low spirit|hopelessness|mental dullness|sadness/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Depression",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Low+Mood",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Sadness"
        ],
        symptoms: "A mental state of being in low spirit characterized by reactive dullness, lack of hope and absence of cheerfulness.",
        recommendedProducts: ["Cordy Active", "Memory 24/7 Capsule", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Dermatitis",
        keywords: /dermatitis|eczema|skin problem|itching skin|microscope rash/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Dermatitis",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Eczema",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Skin+Problem"
        ],
        symptoms: "Problem of skin. Skin may be covered by microscope, eczema, and painful itching.",
        recommendedProducts: ["Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Diabetes Type II",
        keywords: /diabetes type 2|adult-onset diabetes|insulin resistance|type ii diabetes/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Diabetes+Type+II",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Insulin+Resistance",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Blood+Sugar"
        ],
        symptoms: "Also known as adult-onset diabetes, characterized by the body being able to produce insulin but cells are unable to use it effectively.",
        recommendedProducts: ["Diawell", "Golden Six"],
        dosage: ["4*3 daily"],
        qna: []
    },
    {
        name: "Diarrhoea",
        keywords: /diarrhoea|diarrhea|watery stool|abdominal pain|nausea vomiting/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Diarrhoea",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Watery+Stool",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Abdominal+Pain"
        ],
        symptoms: "Frequent, watery, and uncontrolled bowel movements, accompanied by nausea, vomiting, constipation or abdominal pains.",
        recommendedProducts: ["Reishi", "Constilease"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Digestive Problem",
        keywords: /digestive problem|digestion issue|pancreas digestion|fat breakdown|oil digestion/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Digestive+Problem",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Digestion+Issue",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Gut+Health"
        ],
        symptoms: "Problem in the breakdown of body fat (oil) by the pancreas glands and crude fat.",
        recommendedProducts: ["Constilease", "Gastrifort Capsule"],
        dosage: ["2*2 daily"],
        qna: []
    },
    {
        name: "Dry Skin",
        keywords: /dry skin|skin dryness|sebaceous gland deficiency|oil deficiency skin/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Dry+Skin",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Skin+Dryness",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Moisturize"
        ],
        symptoms: "Insufficient production of body fat (oil) by the sebaceous glands and crude oil.",
        recommendedProducts: ["Golden Six", "Reishi"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Dysmenorrhoea",
        keywords: /dysmenorrhoea|painful menstruation|menstrual cramps|period pain/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Dysmenorrhoea",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Painful+Periods",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Menstrual+Cramps"
        ],
        symptoms: "Painful menstruation (monthly flow of blood associated with pains).",
        recommendedProducts: ["Golden Six", "Gynapharm Capsule"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Ear Infection",
        keywords: /ear infection|ear inflammation|earache|pain in ear/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Ear+Infection",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Earache",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Ear+Health"
        ],
        symptoms: "Inflammation, aches and pains in the ear.",
        recommendedProducts: ["Cordy Active", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Eczema",
        keywords: /eczema|skin swelling|fluid filled skin|skin irritation|skin rash/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Eczema",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Skin+Rash",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Itchy+Skin"
        ],
        symptoms: "Swelling covered by collection of fluids.",
        recommendedProducts: ["Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Edema (Hydrops)",
        keywords: /edema|hydrops|capillary discharge|fluid retention|swelling from blood capillaries/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Edema",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Fluid+Retention",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Swelling"
        ],
        symptoms: "Discharge from the blood capillaries.",
        recommendedProducts: ["Cordy Royal Jelly", "Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Elephantiasis",
        keywords: /elephantiasis|limb swelling|genital swelling|enlarged glands/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Elephantiasis",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Limb+Swelling",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Gland+Enlargement"
        ],
        symptoms: "Swelling, especially of the limbs and genitalia by a result of enlargement of glands.",
        recommendedProducts: ["Golden Hypha", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Emaciation (Maciation)",
        keywords: /emaciation|maciation|weight loss|severe thinness|body wasting/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Emaciation",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Weight+Loss",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Thinness"
        ],
        symptoms: "Loss of body weight.",
        recommendedProducts: ["Reishi", "Cordy Active"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Embolism (Arterial Blockage)",
        keywords: /embolism|arterial blockage|blood clot|vessel obstruction|air bubble in blood/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Embolism",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Arterial+Blockage",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Blood+Clot"
        ],
        symptoms: "Obstruction of blood vessels by a blood clot, air bubbles, or other foreign material.",
        recommendedProducts: ["Reishi", "Cello Q10"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Enlarged Spleen",
        keywords: /enlarged spleen|spleen inflammation|chest organ swelling|splenomegaly/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Enlarged+Spleen",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Spleen+Inflammation",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Splenomegaly"
        ],
        symptoms: "Inflammation of organs pertaining to the region over the chest.",
        recommendedProducts: ["Cordy Active", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Epilepsy",
        keywords: /epilepsy|seizures|neurological seizure|brain disorder|convulsions/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Epilepsy",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Seizures",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Brain+Disorder"
        ],
        symptoms: "A severe infectious disease in which the skin becomes pale.",
        recommendedProducts: ["Reishi", "Cordy Royal Jelly", "Memory 24/7 Capsule"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Erysipelas (rev. skin infection)",
        keywords: /erysipelas|skin infection|raised red rash|hot rash|sharp skin redness/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Erysipelas",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Skin+Infection",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Red+Rash"
        ],
        symptoms: "A skin infection characterized by a sharply demarcated, raised, red, and hot rash.",
        recommendedProducts: ["Cordy Active", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Fainting Sickness",
        keywords: /fainting|fainting sickness|loss of consciousness|low blood to brain|syncope/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Fainting",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Loss+of+Consciousness",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Syncope"
        ],
        symptoms: "A sudden and temporary loss of consciousness due to insufficient blood flow to the brain.",
        recommendedProducts: ["Golden Six", "Reishi"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Fatigue",
        keywords: /fatigue|tiredness|exhaustion|mental weariness|physical fatigue/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Fatigue",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Tiredness",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Exhaustion"
        ],
        symptoms: "Extreme tiredness or exhaustion, often accompanied by mental and physical weariness.",
        recommendedProducts: ["Cordy Active", "Reishi", "Vigor Essential"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Female Infertility",
        keywords: /female infertility|infertility in women|inability to conceive|female conception issue/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Female+Infertility",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Conception+Issues",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Reproductive+Health"
        ],
        symptoms: "Inability to conceive after a year of unprotected intercourse.",
        recommendedProducts: ["Gynapharm Capsule", "Golden Six", "Reishi"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Fibroid",
        keywords: /fibroid|uterine fibroid|benign uterine tumor|noncancerous growth uterus/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Fibroid",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Uterine+Fibroid",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Benign+Tumor"
        ],
        symptoms: "Benign tumours that develop in the uterus.",
        recommendedProducts: ["Reishi", "Gynapharm Capsule"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Flatulence (Stomach Gas)",
        keywords: /flatulence|stomach gas|gas discomfort|bloating|intestinal gas/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Flatulence",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Stomach+Gas",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Bloating"
        ],
        symptoms: "Excessive formation of gas in the stomach or intestines, causing discomfort, bloating, and sometimes pain.",
        recommendedProducts: ["Constilease", "Gastrifort Capsule"],
        dosage: ["2*2 daily"],
        qna: []
    },
    {
        name: "Flu (Cough)",
        keywords: /flu|cough|viral infection|fever and sore throat|muscle aches/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Flu",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Viral+Infection",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Fever+Cough"
        ],
        symptoms: "A common viral infection of the respiratory tract, characterized by fever, cough, sore throat, and muscle aches.",
        recommendedProducts: ["Reishi", "Cordy Active", "Refresh Tea"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "German Measles",
        keywords: /german measles|rubella|red rashes|viral rash|rubella virus/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=German+Measles",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Rubella",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Red+Rashes"
        ],
        symptoms: "Caused by a virus, produces red rashes lasting a couple of days.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Goitre",
        keywords: /goitre|goiter|thyroid swelling|neck swelling|enlarged thyroid/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Goitre",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Thyroid+Swelling",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Neck+Swelling"
        ],
        symptoms: "Enlargement of the thyroid gland visible as swelling on the front of the neck.",
        recommendedProducts: ["Reishi", "Golden Six"],
        dosage: ["3*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Gonorrhoea",
        keywords: /gonorrhoea|gonorrhea|genital inflammation|neisseria gonococcus|std gonorrhoea/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Gonorrhoea",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=STD",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Infection"
        ],
        symptoms: "Contagious inflammation of genital mucous membranes, caused by Neisseria gonococcus.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Gout",
        keywords: /gout|metabolic arthritis|joint inflammation|toe pain|uric acid crystal/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Gout",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Joint+Pain",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Uric+Acid"
        ],
        symptoms: "Metabolic disease with acute arthritis and joint inflammation, especially in the great toe.",
        recommendedProducts: ["Golden Hypha", "Reishi", "Jointeez"],
        dosage: ["4*2 daily"],
        qna: []
    },
    {
        name: "Halitosis",
        keywords: /halitosis|bad breath|offensive breath|mouth odor|foul breath/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Halitosis",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Bad+Breath",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Oral+Hygiene"
        ],
        symptoms: "Offensive breath from the mouth or nostrils.",
        recommendedProducts: ["Gum Care Toothpaste", "Reishi"],
        dosage: ["Use as toothpaste", "3*2 daily"],
        qna: []
    },
    {
        name: "Headache",
        keywords: /headache|head pain|frontal pain|temporal headache|occipital pain/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Headache",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Head+Pain",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Migraine"
        ],
        symptoms: "Pain in the head which may be dull, sharp or unbearable, frontal, temporal or occipital.",
        recommendedProducts: ["Memory 24/7 Capsule", "Refresh Tea", "Reishi"],
        dosage: ["2*2 daily", "As needed", "3*2 daily"],
        qna: []
    },
    {
        name: "Heartburn",
        keywords: /heartburn|esophagus burn|acid reflux|chest burning|breastbone pain/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Heartburn",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Acid+Reflux",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Chest+Burning"
        ],
        symptoms: "Burning sensation in the oesophagus or below the breastbone, common in women.",
        recommendedProducts: ["Gastrifort Capsule", "Reishi"],
        dosage: ["2*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Heart Failure",
        keywords: /heart failure|weak heart|cardiac weakness|ineffective pumping|deadly heart issue/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Heart+Failure",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Weak+Heart",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Cardiac+Weakness"
        ],
        symptoms: "Heart is too weak to pump blood effectively. This is deadly.",
        recommendedProducts: ["Cordy Royal Jelly", "Cello Q10", "Reishi"],
        dosage: ["3*2 daily", "1*1 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Heart Palpitation",
        keywords: /heart palpitation|irregular heartbeat|strong heartbeat|poor circulation|fast pulse/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Heart+Palpitation",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Irregular+Heartbeat",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Fast+Pulse"
        ],
        symptoms: "Irregular or strong heartbeat, linked to poor circulation.",
        recommendedProducts: ["Cordy Royal Jelly", "Cello Q10", "Reishi"],
        dosage: ["1*2 daily", "1*1 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Haemorrhoids (Piles)",
        keywords: /haemorrhoids|piles|anal veins|rectal bleeding|constipation piles/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Haemorrhoids",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Piles",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Rectal+Bleeding"
        ],
        symptoms: "Enlarged veins in the anal region causing pain, bleeding, and constipation.",
        recommendedProducts: ["Reishi", "Constilease"],
        dosage: ["3*2 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Hematuria",
        keywords: /hematuria|blood in urine|bloody urine|urinary bleeding/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Hematuria",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Blood+in+Urine",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Urinary+Bleeding"
        ],
        symptoms: "Presence of blood in urine.",
        recommendedProducts: ["Reishi (Blood Tonic)", "Golden Six"],
        dosage: ["3*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Hepatitis",
        keywords: /hepatitis|liver inflammation|jaundice|vomiting|liver disease/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Hepatitis",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Liver+Inflammation",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Jaundice"
        ],
        symptoms: "Inflammation of the liver causing jaundice, nausea and vomiting.",
        recommendedProducts: ["Golden Hypha", "Reishi", "Golden Six"],
        dosage: ["4*2 daily", "3*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Herpes Simplex",
        keywords: /herpes simplex|cold sores|fever blister|lip sore|genital herpes/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Herpes+Simplex",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Cold+Sores",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Genital+Herpes"
        ],
        symptoms: "Virus causing blisters on lips, nostrils or genitals.",
        recommendedProducts: ["Golden Hypha", "Reishi"],
        dosage: ["1*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Herpes Zoster",
        keywords: /herpes zoster|shingles|burning blisters|nerve pain blisters|zoster virus/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Herpes+Zoster",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Shingles",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Blisters"
        ],
        symptoms: "Painful blisters on the body with burning sensation and nerve pain caused by a virus.",
        recommendedProducts: ["Golden Hypha", "Reishi"],
        dosage: ["4*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Hormonal Imbalance",
        keywords: /hormonal imbalance|gland secretion|endocrine disorder|hormone irregularity/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Hormonal+Imbalance",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Endocrine+Disorder",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Hormone+Balance"
        ],
        symptoms: "Irregularities in glandular secretion carried in the bloodstream to the organs it regulates.",
        recommendedProducts: ["Golden Six", "Gynapharm Capsule"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Hot Flushes",
        keywords: /hot flushes|head pain menopause|menopausal sweating|middle head pain/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Hot+Flushes",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Menopause",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Sweating"
        ],
        symptoms: "Severe pain in the middle of the head with sweating, associated with menopause.",
        recommendedProducts: ["Golden Six", "Gynapharm Capsule"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Inflamed Intestines",
        keywords: /inflamed intestines|diverticulitis|intestinal swelling|colon sacs|faeces stagnation/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Inflamed+Intestines",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Diverticulitis",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Intestinal+Swelling"
        ],
        symptoms: "Inflamed intestines causing stagnation of faeces in distended sacs of the colon (diverticula).",
        recommendedProducts: ["Gastrifort Capsule", "Constilease", "Reishi"],
        dosage: ["2*2 daily", "2*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Laryngitis",
        keywords: /laryngitis|voice box inflammation|hoarseness|sore throat|breathing difficulty/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Laryngitis",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Voice+Box",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Hoarseness"
        ],
        symptoms: "Inflammation of the larynx or voice box affecting voice and breathing. May include hoarseness, fever, or sore throat.",
        recommendedProducts: ["Cordy Active", "Reishi", "Refresh Tea"],
        dosage: ["4*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Leg Cramps",
        keywords: /leg cramps|muscle contraction|calf pain|muscle pain legs/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Leg+Cramps",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Muscle+Pain",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Calf+Pain"
        ],
        symptoms: "Muscle contraction causing pain in the calf or other muscles.",
        recommendedProducts: ["Reishi", "Jointeez"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Liver Problem",
        keywords: /liver problem|liver disease|hepatic disorder|liver malfunction/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Liver+Problem",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Liver+Disease",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Hepatic"
        ],
        symptoms: "General liver disease or disorder.",
        recommendedProducts: ["Reishi", "Golden Six"],
        dosage: ["3*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Low Sperm Count",
        keywords: /low sperm count|male infertility|sperm deficiency|poor sperm quality/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Low+Sperm+Count",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Male+Infertility",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Sperm+Health"
        ],
        symptoms: "Inability to produce a sufficient number of sperm cells to impregnate a woman.",
        recommendedProducts: ["Re-Vive", "Vigor Essential", "Cordy Royal Jelly"],
        dosage: ["2*1 daily", "1*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Lupus Erythematosus (LE)",
        keywords: /lupus erythematosus|le|butterfly rash|autoimmune lupus|chronic lupus/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Lupus+Erythematosus",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Butterfly+Rash",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Autoimmune"
        ],
        symptoms: "Chronic, often fatal disease with characteristic butterfly-shaped rash on the face. Common in females between puberty and menopause.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Malnutrition",
        keywords: /malnutrition|undernourishment|inadequate nutrition|weakness|skinny appearance/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Malnutrition",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Undernourishment",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Nutrition"
        ],
        symptoms: "Undernourishment due to inadequate nutritional intake; symptoms include weakness, skinny appearance, or anaemia.",
        recommendedProducts: ["Cordy Royal Jelly", "Reishi"],
        dosage: ["3*3 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Measles Sore",
        keywords: /measles sore|skin eruption|measles aftermath|measles rash/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Measles+Sore",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Skin+Eruption",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Measles+Rash"
        ],
        symptoms: "Sore resulting from skin eruptions following a measles attack.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Mental Block",
        keywords: /mental block|forgetfulness|memory lapse|lack of assimilation/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Mental+Block",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Forgetfulness",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Memory+Lapse"
        ],
        symptoms: "Lack of assimilation or temporary forgetfulness.",
        recommendedProducts: ["Vigor Essential", "Cordy Active", "Reishi", "Golden Hypha", "Memory 24/7 Capsule"],
        dosage: ["1*2 daily", "4*2 daily", "3*2 daily", "4*2 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Migraine (Headache)",
        keywords: /migraine|unilateral headache|nausea and vision issues|recurring headache/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Migraine",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Unilateral+Headache",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Nausea"
        ],
        symptoms: "Usually affects one side of the head, often with nausea and vision issues. Recurs periodically.",
        recommendedProducts: ["Cordy Active", "Reishi", "Cordy Royal Jelly", "Memory 24/7 Capsule"],
        dosage: ["4*2 daily", "3*2 daily", "3*2 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Multiple Sclerosis (MS)",
        keywords: /multiple sclerosis|ms|brain and spinal disorder|loss of mobility/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Multiple+Sclerosis",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=MS+Brain",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Spinal+Disorder"
        ],
        symptoms: "Disabling disease of the brain and spinal cord. Symptoms vary and may result in loss of ability to walk.",
        recommendedProducts: ["Golden Hypha", "Reishi", "Memory 24/7 Capsule"],
        dosage: ["4*2 daily", "3*2 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Mumps (Epidemic Parotitis)",
        keywords: /mumps|epidemic parotitis|swollen glands|painful jaw|fever and chills/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Mumps",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Swollen+Glands",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Parotitis"
        ],
        symptoms: "An acute, contagious, febrile disease with inflammation of the parotid and other salivary glands. Gradual onset with symptoms like chillness, headache, pain below the ear, moderate to high fever, and painful jaw movements due to swelling.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Myocardial Infarction",
        keywords: /myocardial infarction|heart attack|angina|cardiac failure|myocardium damage/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Myocardial+Infarction",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Heart+Attack",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Cardiac+Failure"
        ],
        symptoms: "Damage to the myocardium (heart muscle) causing angina-like pain, shock, heart attack, and potential sudden death due to cardiac failure.",
        recommendedProducts: ["Cordy Royal Jelly", "Cello Q10", "Reishi"],
        dosage: ["3*2 daily", "1*1 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Myocardial Ischemia",
        keywords: /myocardial ischemia|heart muscle oxygen deficiency|angina pectoris|chest pain|heart strain/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Myocardial+Ischemia",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Oxygen+Deficiency",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Angina+Pectoris"
        ],
        symptoms: "Insufficient blood flow to the heart muscle, leading to chest pain (angina pectoris) and potential heart strain.",
        recommendedProducts: ["Cordy Royal Jelly", "Cello Q10", "Reishi"],
        dosage: ["3*2 daily", "1*1 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Myocardial Infarction (Heart Attack)",
        keywords: /myocardial infarction|heart attack|angina|cardiac failure|myocardium damage/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Heart+Attack",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=MI",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Cardiac+Event"
        ],
        symptoms: "Damage to the myocardium (heart muscle) causing angina-like pain, shock, heart attack, and potential sudden death due to cardiac failure.",
        recommendedProducts: ["Cordy Royal Jelly", "Cello Q10", "Reishi"],
        dosage: ["3*2 daily", "1*1 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Malaria",
        keywords: /malaria|mosquito-borne disease|fever and chills|plasmodium infection|tropical disease/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Malaria",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Mosquito",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Fever+Chills"
        ],
        symptoms: "A mosquito-borne infectious disease caused by Plasmodium parasites, characterized by fever, chills, and flu-like illness.",
        recommendedProducts: ["Reishi", "Qinghao"],
        dosage: ["3*2 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Myocarditis (Myocardial Inflammation)",
        keywords: /myocarditis|heart inflammation|apex beat|irregular pulse|heart muscle swelling/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Myocarditis",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Heart+Inflammation",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Irregular+Pulse"
        ],
        symptoms: "Inflammation of the heart muscle due to infections, nephritis, or poisoning (e.g. carbon monoxide), with symptoms like apex beat, weakness, and irregular pulse.",
        recommendedProducts: ["Reishi", "Cello Q10"],
        dosage: ["3*2 daily", "1*1 daily"],
        qna: []
    },
    {
        name: "Muscle Cramps",
        keywords: /muscle cramps|muscle tightening|cold-induced cramps|overwork cramps/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Muscle+Cramps",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Muscle+Tightening",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Painful+Muscles"
        ],
        symptoms: "Sudden and painful tightening of muscles caused by cold, overwork, or inflexibility.",
        recommendedProducts: ["Cordy Active", "Jointeez"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Muscular Dystrophy",
        keywords: /muscular dystrophy|muscle wasting|nutritional deficiency muscle loss/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Muscular+Dystrophy",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Muscle+Wasting",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Nutritional+Deficiency"
        ],
        symptoms: "Wasting away of body parts due to lack of nutrition.",
        recommendedProducts: ["Cordy Active", "Reishi"],
        dosage: ["4*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Nails Whitlow",
        keywords: /nails whitlow|finger inflammation|pus in nails|toe infection/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Nails+Whitlow",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Finger+Infection",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Pus+Nails"
        ],
        symptoms: "Painful inflammation at the tip of fingers or toes involving pus, possibly affecting bone or tissue.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Nausea & Vomiting",
        keywords: /nausea|vomiting|throwing up|feeling sick|stomach upset/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Nausea",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Vomiting",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Stomach+Upset"
        ],
        symptoms: "Feeling sick and throwing up.",
        recommendedProducts: ["Gastrifort Capsule", "Reishi"],
        dosage: ["2*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Nervous Depression",
        keywords: /nervous depression|chronic sadness|low mood|mental fatigue|emotional numbness/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Nervous+Depression",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Chronic+Sadness",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Mental+Fatigue"
        ],
        symptoms: "A mental state marked by chronic low mood, sadness, numbness, and disinterest in activities.",
        recommendedProducts: ["Cordy Active", "Memory 24/7 Capsule", "Reishi"],
        dosage: ["4*2 daily", "2*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Nephritis",
        keywords: /nephritis|kidney inflammation|renal disorder|chronic kidney issue/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Nephritis",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Kidney+Inflammation",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Renal+Disorder"
        ],
        symptoms: "Chronic inflammation of the kidneys.",
        recommendedProducts: ["Golden Six", "Reishi"],
        dosage: ["1*2 daily"],
        qna: []
    },
    {
        name: "Obesity (Exogenous)",
        keywords: /obesity|exogenous obesity|overweight|fat accumulation|overeating/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Exogenous+Obesity",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Overweight",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Fat+Accumulation"
        ],
        symptoms: "Medically refers to abnormal fat accumulation due to overeating.",
        recommendedProducts: ["Magilim"],
        dosage: ["4*3 daily"],
        qna: []
    },
    {
        name: "Osteoporosis",
        keywords: /osteoporosis|bone weakness|calcium deficiency|brittle bones|painful bones/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Osteoporosis",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Bone+Weakness",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Calcium+Deficiency"
        ],
        symptoms: "Softening and weakening of bones due to calcium or vitamin deficiency, making bones brittle and painful.",
        recommendedProducts: ["Cordy Active", "Jointeez", "Golden Six"],
        dosage: ["4*2 daily", "4*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Parkinson’s Disease",
        keywords: /parkinson’s disease|tremors|muscle rigidity|nervous disease|peculiar gait/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Parkinson's+Disease",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Tremors",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Muscle+Rigidity"
        ],
        symptoms: "Chronic nervous disease with slow-spreading tremors, muscular rigidity, weakness, and a peculiar gait. Starts in the hand or foot and progresses.",
        recommendedProducts: ["Memory 24/7 Capsule", "Reishi", "Cordy Royal Jelly"],
        dosage: ["2*2 daily", "3*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Phlebitis",
        keywords: /phlebitis|vein inflammation|vein pain|skin discoloration from veins/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Phlebitis",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Vein+Inflammation",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Vein+Pain"
        ],
        symptoms: "Inflammation of a vein causing pain, skin discoloration, and tenderness.",
        recommendedProducts: ["Constilease", "Cordy Royal Jelly", "Reishi", "Golden Six"],
        dosage: ["2*2 daily", "3*2 daily", "3*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Pneumonia",
        keywords: /pneumonia|lung infection|fever cough|obstructed breathing|chest pain/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Pneumonia",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Lung+Infection",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Chest+Pain"
        ],
        symptoms: "Inflammatory swelling and acute edema causing obstructed breathing, rapid pulse, chills, high temperature, and joint pain. Infection of one or both lungs caused by bacteria, viruses, or fungi. Symptoms include fever, cough with mucus (rusty, green, or blood-tinged), and chest pain worsened by coughing.",
        recommendedProducts: ["Cordy Active", "Reishi", "Golden Hypha"],
        dosage: ["4*2 daily", "3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Polyp",
        keywords: /polyp|nodular tumour|mucous membrane growth|bleeding tumour/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Polyp",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Nodular+Tumour",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Mucous+Growth"
        ],
        symptoms: "A nodular tumour growing from mucous tissues (nose, bladder, stomach, intestine, or uterus). Polyps bleed easily.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Premenstrual Syndrome (PMS)",
        keywords: /pms|premenstrual syndrome|menstrual cramps|period fever|premenstrual pain/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=PMS",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Menstrual+Cramps",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Period+Pain"
        ],
        symptoms: "Pains, cramps, and feverish conditions before menstruation.",
        recommendedProducts: ["Golden Six", "Gynapharm Capsule"],
        dosage: ["1*2 daily", "3*3 daily"],
        qna: []
    },
    {
        name: "Prostatitis",
        keywords: /prostatitis|prostate inflammation|frequent urination|perineal pain|prostate infection/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Prostatitis",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Prostate+Inflammation",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Urinary+Issues"
        ],
        symptoms: "Inflammation of the prostate gland, possibly due to gonorrhoea infection. Symptoms: perineal pain, frequent urination, fever, constipation, thirst, vomiting, discharge from penis. May be chronic.",
        recommendedProducts: ["Vigor Essential", "Lycovite", "Reishi"],
        dosage: ["1*2 daily", "2*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Psoriasis",
        keywords: /psoriasis|inflammatory skin disease|scaly skin|itchy skin|red patches/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Psoriasis",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Skin+Disease",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Scaly+Skin"
        ],
        symptoms: "Chronic inflammatory skin disease with red scaly patches. Very itchy.",
        recommendedProducts: ["Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Pulmonary Emphysema",
        keywords: /pulmonary emphysema|ruptured alveoli|breathing difficulty|lung elasticity loss/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Pulmonary+Emphysema",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Ruptured+Alveoli",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Lung+Disease"
        ],
        symptoms: "Lung alveoli become ruptured due to loss of elasticity. Causes breathing difficulty.",
        recommendedProducts: ["Cordy Active", "Reishi"],
        dosage: ["4*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Rheumatic Fever",
        keywords: /rheumatic fever|joint inflammation|streptococcal fever|migratory pain|cardiac inflammation/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Rheumatic+Fever",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Joint+Inflammation",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Cardiac+Issues"
        ],
        symptoms: "Systemic febrile disease, inflammatory and non-suppurative. Often followed by serious heart disease. Caused by prior streptococcal infection. Symptoms: fever, migratory joint pain, abdominal pain, cardiac issues.",
        recommendedProducts: ["Reishi", "Golden Six", "Jointeez"],
        dosage: ["3*2 daily", "1*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Scarlet Fever",
        keywords: /scarlet fever|scarlet rash|sore throat fever|contagious rash|rapid pulse/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Scarlet+Fever",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Scarlet+Rash",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Sore+Throat"
        ],
        symptoms: "Acute contagious disease with sore throat, fever, scarlet rash, and rapid pulse. Requires rest and isolation.",
        recommendedProducts: ["Reishi", "Cordy Royal Jelly", "Golden Hypha"],
        dosage: ["3*2 daily", "3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Seizures (Epilepsy, Ictus, Raptus)",
        keywords: /seizures|epilepsy|ictus|raptus|muscle contractions/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Seizures",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Epilepsy",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Muscle+Contractions"
        ],
        symptoms: "Involuntary muscle contractions.",
        recommendedProducts: ["Reishi", "Cordy Royal Jelly", "Memory 24/7 Capsule"],
        dosage: ["3*2 daily", "3*2 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Sinusitis",
        keywords: /sinusitis|sinus inflammation|maxillary sinus|catarrh and cough|sinus headache/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Sinusitis",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Sinus+Inflammation",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Headache"
        ],
        symptoms: "Inflammation of sinus cavities, especially maxillary. Symptoms: catarrh, fever, chills, cough, and headache.",
        recommendedProducts: ["Reishi", "Refresh Tea", "Cordy Active"],
        dosage: ["3*2 daily", "As needed", "4*2 daily"],
        qna: []
    },
    {
        name: "Skin Blemish",
        keywords: /skin blemish|wrinkles|skin scars|skin deformities|aging spots/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Skin+Blemish",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Wrinkles",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Skin+Care"
        ],
        symptoms: "Wrinkles, scars, or skin deformities due to aging or damage.",
        recommendedProducts: ["Constilease", "Reishi", "Golden Six"],
        dosage: ["2*2 daily", "3*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Sore (Ulcerated)",
        keywords: /ulcerated sore|chronic sore|non-healing wound|persistent ulcer/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Ulcerated+Sore",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Chronic+Wound",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Non-Healing"
        ],
        symptoms: "A chronic sore that seems incurable.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Spastic Colon (Irritable Bowel Syndrome / Mucous Colitis)",
        keywords: /spastic colon|irritable bowel syndrome|ibs|mucous colitis|colon paralysis/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Spastic+Colon",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=IBS",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Mucous+Colitis"
        ],
        symptoms: "Paralysis in part of the large intestine causing continuous contraction and rigidity.",
        recommendedProducts: ["Constilease", "Gastrifort Capsule", "Reishi"],
        dosage: ["2*2 daily", "2*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Spines and Disc (Pain & Aches)",
        keywords: /back pain|waist pain|spinal aches|disc pain|backache/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Spine+Pain",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Back+Aches",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Disc+Pain"
        ],
        symptoms: "Backache or waist pain.",
        recommendedProducts: ["Jointeez", "Golden Six"],
        dosage: ["4*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Staphylococcus",
        keywords: /staphylococcus|boils|bacterial infection|cluster infection|blood infection/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Staphylococcus",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Bacterial+Infection",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Boils"
        ],
        symptoms: "Pathogenic bacteria in clusters causing boils and infections. Spoils the blood.",
        recommendedProducts: ["Golden Hypha", "Reishi"],
        dosage: ["4*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Stomach Ulcer",
        keywords: /stomach ulcer|ulcer|open sore in stomach|gastric ulcer/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Stomach+Ulcer",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Gastric+Ulcer",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Abdominal+Pain"
        ],
        symptoms: "An open sore in the stomach.",
        recommendedProducts: ["Reishi", "Gastrifort Capsule"],
        dosage: ["3*2 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Stress",
        keywords: /stress|tiredness|body strain|mental exertion|dullness/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Stress",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Tiredness",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Mental+Strain"
        ],
        symptoms: "Strain or exertion on the body causing tiredness and dullness.",
        recommendedProducts: ["Golden Six", "Reishi", "Cordy Active"],
        dosage: ["1*2 daily", "3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Stroke (Thrombosis in the Leg)",
        keywords: /stroke|thrombosis in leg|sudden paralysis|blood clot blockage/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Stroke",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=Thrombosis",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Paralysis"
        ],
        symptoms: "Sudden paralysis or clot formation blocking blood vessels.",
        recommendedProducts: ["Cordy Royal Jelly", "Cello Q10", "Memory 24/7 Capsule"],
        dosage: ["3*2 daily", "1*1 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Sunburn (Erythema Solare)",
        keywords: /sunburn|erythema solare|skin inflammation from sun|prolonged sun exposure/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Sunburn",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Erythema+Solare",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Skin+Inflammation"
        ],
        symptoms: "Inflammation of the skin from prolonged sun exposure.",
        recommendedProducts: ["Reishi"],
        dosage: ["3*2 daily"],
        qna: []
    },
    {
        name: "Tetanus (Lockjaw)",
        keywords: /tetanus|lockjaw|clostridium tetani|jaw stiffness|muscle spasms/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Tetanus",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Lockjaw",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Muscle+Spasms"
        ],
        symptoms: "Infectious disease caused by clostridium tetani toxin. Causes painful muscle spasms, beginning with jaw stiffness and facial contractions.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Tonsillitis",
        keywords: /tonsillitis|inflamed tonsils|difficulty swallowing|throat inflammation/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Tonsillitis",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Inflamed+Tonsils",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Sore+Throat"
        ],
        symptoms: "Inflammation of one or both tonsils. Causes difficulty swallowing.",
        recommendedProducts: ["Reishi", "Refresh Tea", "Cordy Active"],
        dosage: ["3*2 daily", "As needed", "4*2 daily"],
        qna: []
    },
    {
        name: "Tuberculosis (T.B. Bacillus)",
        keywords: /tuberculosis|tb bacillus|lung infection|infectious lung disease/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Tuberculosis",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=TB+Bacillus",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Lung+Infection"
        ],
        symptoms: "Infectious disease affecting lungs and potentially other body systems like bones, joints, and lymph nodes.",
        recommendedProducts: ["Cordy Active", "Reishi", "Golden Hypha"],
        dosage: ["4*2 daily", "3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Tumour / Cancer (Malignant Neoplasm)",
        keywords: /tumour|cancer|malignant neoplasm|abnormal tissue growth/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Tumour/Cancer",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Malignant+Neoplasm",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Abnormal+Growth"
        ],
        symptoms: "New abnormal tissue growth with no physiological function. May be malignant (cancer).",
        recommendedProducts: ["Golden Hypha", "Reishi"],
        dosage: ["4*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Uric Acid",
        keywords: /uric acid|waste metabolism product|urine acid|uric acid in blood/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Uric+Acid",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Waste+Product",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Metabolism"
        ],
        symptoms: "A waste product of metabolism found in blood and urine.",
        recommendedProducts: ["Reishi", "Golden Six"],
        dosage: ["3*2 daily", "1*2 daily"],
        qna: []
    },
    {
        name: "Vaginitis",
        keywords: /vaginitis|vaginal inflammation|vaginal discomfort|vaginal irritation/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Vaginitis",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Vaginal+Inflammation",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Discomfort"
        ],
        symptoms: "Inflammation of the vagina causing discomfort.",
        recommendedProducts: ["Reishi", "Gynapharm Capsule"],
        dosage: ["3*2 daily", "3*3 daily"],
        qna: []
    },
    {
        name: "Varicose Vein",
        keywords: /varicose vein|swollen veins|enlarged leg veins|vein disorder/i,
        images: [
            "https://placehold.co/150x150/009688/FFFFFF?text=Varicose+Vein",
            "https://placehold.co/150x150/4DB6AC/FFFFFF?text=Swollen+Veins",
            "https://placehold.co/150x150/80CBC4/FFFFFF?text=Leg+Veins"
        ],
        symptoms: "Swollen or enlarged veins, especially in the legs.",
        recommendedProducts: ["Reishi", "Cello Q10"],
        dosage: ["3*2 daily", "1*1 daily"],
        qna: []
    },
    {
        name: "Venereal Disease",
        keywords: /venereal disease|std|gonorrhoea|syphilis|sexually transmitted infection/i,
        images: [
            "https://placehold.co/150x150/FFEB3B/FFFFFF?text=Venereal+Disease",
            "https://placehold.co/150x150/FFF176/FFFFFF?text=STD",
            "https://placehold.co/150x150/FFF9C4/FFFFFF?text=Infection"
        ],
        symptoms: "Sexually transmitted infections such as Gonorrhoea and Syphilis.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Vertigo (Light Headedness)",
        keywords: /vertigo|light headedness|dizziness|spinning sensation|imbalance/i,
        images: [
            "https://placehold.co/150x150/E91E63/FFFFFF?text=Vertigo",
            "https://placehold.co/150x150/F06292/FFFFFF?text=Dizziness",
            "https://placehold.co/150x150/F8BBD0/FFFFFF?text=Lightheadedness"
        ],
        symptoms: "Dizziness, giddiness, a feeling of spinning or imbalance. Mentally confused, unable to stand firm.",
        recommendedProducts: ["Cordy Active", "Memory 24/7 Capsule", "Reishi"],
        dosage: ["4*2 daily", "2*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Wart (Veruca)",
        keywords: /wart|veruca|skin bump|skin overgrowth|viral wart/i,
        images: [
            "https://placehold.co/150x150/9C27B0/FFFFFF?text=Wart",
            "https://placehold.co/150x150/BA68C8/FFFFFF?text=Skin+Bump",
            "https://placehold.co/150x150/E1BEE7/FFFFFF?text=Viral+Wart"
        ],
        symptoms: "A small overgrowth or bump on the skin.",
        recommendedProducts: ["Golden Hypha", "Reishi"],
        dosage: ["4*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Weak Erection",
        keywords: /weak erection|erectile dysfunction|sexual dysfunction|incomplete erection/i,
        images: [
            "https://placehold.co/150x150/607D8B/FFFFFF?text=Weak+Erection",
            "https://placehold.co/150x150/90A4AE/FFFFFF?text=Erectile+Dysfunction",
            "https://placehold.co/150x150/B0BEC5/FFFFFF?text=Men's+Sexual+Health"
        ],
        symptoms: "Failure to achieve or maintain a full erection during sexual activity.",
        recommendedProducts: ["Re-Vive", "Vigor Essential", "Lycovite"],
        dosage: ["2*1 daily", "1*2 daily", "2*2 daily"],
        qna: []
    },
    {
        name: "Whitlow (Felon)",
        keywords: /whitlow|felon|finger inflammation|pus filled swelling|painful toe tip/i,
        images: [
            "https://placehold.co/150x150/3F51B5/FFFFFF?text=Whitlow",
            "https://placehold.co/150x150/7986CB/FFFFFF?text=Finger+Inflammation",
            "https://placehold.co/150x150/C5CAE9/FFFFFF?text=Pus+Swelling"
        ],
        symptoms: "Painful pus-filled inflammation at the end of a finger or toe.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Wound (Ulcerated)",
        keywords: /ulcerated wound|chronic wound|non-healing sore|tissue damage wound/i,
        images: [
            "https://placehold.co/150x150/F44336/FFFFFF?text=Ulcerated+Wound",
            "https://placehold.co/150x150/EF5350/FFFFFF?text=Chronic+Wound",
            "https://placehold.co/150x150/E57373/FFFFFF?text=Non-Healing+Sore"
        ],
        symptoms: "Chronic wounds caused by trauma or tissue damage. Persistent and difficult to heal.",
        recommendedProducts: ["Reishi", "Golden Hypha"],
        dosage: ["3*2 daily", "4*2 daily"],
        qna: []
    },
    {
        name: "Wrinkles (Furrow Crease)",
        keywords: /wrinkles|furrow crease|skin folds|aging lines|skin aging/i,
        images: [
            "https://placehold.co/150x150/FF9800/FFFFFF?text=Wrinkles",
            "https://placehold.co/150x150/FFB74D/FFFFFF?text=Aging+Lines",
            "https://placehold.co/150x150/FFCC80/FFFFFF?text=Skin+Aging"
        ],
        symptoms: "Small folds or lines on the skin, especially due to aging.",
        recommendedProducts: ["Constilease", "Golden Six", "Reishi"],
        dosage: ["2*2 daily", "1*2 daily", "3*2 daily"],
        qna: []
    },
    {
        name: "Yeast Infection",
        keywords: /yeast infection|vaginal yeast|candida|vaginal discharge|leucorrhoea/i,
        images: [
            "https://placehold.co/150x150/8BC34A/FFFFFF?text=Yeast+Infection",
            "https://placehold.co/150x150/AED581/FFFFFF?text=Vaginal+Yeast",
            "https://placehold.co/150x150/C5E1A5/FFFFFF?text=Candida"
        ],
        symptoms: "Inflammation of the vagina and vulva. Symptoms include burning, heat, pain, pelvic pressure, and discharge (leucorrhoea).",
        recommendedProducts: ["Reishi", "Gynapharm Capsule"],
        dosage: ["3*2 daily", "3*3 daily"],
        qna: []
    }
];

// Health Tips Data
const healthTips = [
    "🧘‍♀️ Spending time in nature can improve your mood and reduce feelings of stress? 🌳 Try to get outside for at least a few minutes each day!",
    "🧘‍♂️ Practicing self-care can improve your mental health and overall well-being? 🛁 Consider taking time for yourself each day!",
    "🧘‍♀️ Prioritizing sleep can improve your mood and cognitive function? 😴 Aim for 7-9 hours of quality sleep each night.",
    "🧘‍♂️ Staying socially connected can boost your mental health? 🤝 Make time for friends and family, even if it's just a quick call.",
    "🍫 Did you know? Dark chocolate (in moderation) is good for your heart? 🍫❤️ It contains flavonoids that help lower blood pressure!",
    "🍵 Green tea is packed with antioxidants and can boost your metabolism? 🍵🔥 Drinking 2-3 cups a day can be beneficial.",
    "🥦 Eating a variety of colorful fruits and vegetables can improve your overall health? 🌈 Each color provides different nutrients and antioxidants!",
    "🥑 Avocado is a nutrient-dense fruit that can support heart health? 🥑❤️ It's high in healthy fats and fiber!",
    "🍓 Berries are low in calories and high in antioxidants? 🍓💪 They can help improve heart health and reduce inflammation!",
    "🥕 Carrots are good for your eyes and skin? 🥕👀 They're high in beta-carotene, which your body converts to vitamin A!",
    "🥬 Leafy greens are packed with vitamins and minerals? 🥬💚 They can help improve digestion and reduce the risk of chronic diseases!",
    "🧄 Garlic is a natural antibiotic? 🧄 It boosts your immune system and fights bacteria and viruses!",
    "🧘‍♂️ Practicing self-care can improve your mental health and overall well-being? 🛁 Consider taking time for yourself each day!",
    "🦷 Poor oral hygiene is linked to heart disease? 🪥 Brushing and flossing daily protects more than just your teeth!",
    "🫀 Laughter improves blood flow and can protect your heart? 😂❤️It’s like a mini workout for your cardiovascular system!",
    "Blueberries are brain food? 🧠🫐They improve memory and delay brain aging thanks to antioxidants.",
    "🧘‍♀️ Did you know? Practicing gratitude improves sleep, reduces stress, and enhances your mental health? 🙏🧘",
    "Eating nuts can boost your brain power? 🥜🧠 Nuts are rich in omega-3 fatty acids and antioxidants that support cognitive function.",
    "Dark chocolate can improve your mood? 🍫😊 It contains compounds that boost serotonin and endorphin levels in the brain.",
    "Regular exercise can enhance your brain health? 🏃‍♂️🧠 Physical activity increases blood flow to the brain and promotes the growth of new neurons.",
    "Drinking enough water can improve your cognitive function? 💧🧠 Dehydration can lead to fatigue, confusion, and poor concentration.",
    "Getting enough sunlight can boost your mood? ☀️😊 Sunlight increases the production of serotonin, a neurotransmitter that helps regulate mood.",
    "🧘‍♀️ Mindfulness meditation can reduce stress and improve focus? 🧘‍♀️🧘‍♂️ Just a few minutes a day can make a difference.",
    "🧘‍♂️ Practicing gratitude can improve your mental health? 🙏💖 Taking time to reflect on what you're thankful for can boost your mood.",
    "🧘‍♀️ Engaging in creative activities can enhance your well-being? 🎨🖌️ Whether it's painting, writing, or playing music, creativity can be a great outlet.",
    "🧘‍♂️ Taking breaks and disconnecting from technology can improve your mental health? 📵💆‍♀️ Consider a digital detox to recharge.",
    "🧘‍♀️ Practicing mindfulness can reduce stress and improve focus? 🧘‍♀️🧘‍♂️ Just a few minutes a day can make a difference.",
    "🧘‍♂️ Engaging in physical activity can boost your mood? 🏋️‍♀️😊 Exercise releases endorphins, which can help alleviate stress and anxiety.",
    "🧘‍♀️ Connecting with nature can improve your mental health? 🌳💚 Spending time outdoors can reduce feelings of stress and anxiety.",
    "🧘‍♂️ Practicing deep breathing can help reduce stress and anxiety? 🌬️🧘‍♀️ Just a few minutes a day can make a difference.",
    "🧘‍♀️ Engaging in social activities can boost your mood? 👥😊 Connecting with others can provide support and reduce feelings of loneliness.",
    "🧘‍♂️ Seeking professional help can be a sign of strength? 💪🧑‍⚕️ Therapy and counseling can provide valuable support.",
    "🧘‍♀️ Practicing self-compassion can improve your mental health? 💖🧘‍♂️ Being kind to yourself can help reduce feelings of stress and anxiety.",
    "Eating fish rich in omega-3s can boost your brain health? 🐟🧠 Omega-3 fatty acids are essential for cognitive function and mood regulation.",
    "Drinking green tea can improve your metabolism? 🍵🔥 It contains catechins that help burn fat and boost energy levels.",
    "Eating nuts can improve heart health? 🥜❤️ Nuts are packed with healthy fats, fiber, and antioxidants that support cardiovascular health.",
    "Regular physical activity can reduce the risk of chronic diseases? 🏃‍♂️💪 Exercise helps maintain a healthy weight, lowers blood pressure, and improves overall health.",
    "Getting enough sleep is crucial for overall health? 😴🛌 Sleep helps the body recover, boosts the immune system, and improves mental clarity.",
    "Staying hydrated is essential for optimal body function? 💧🚰 Water regulates body temperature, aids digestion, and keeps skin healthy.",
    "Eating a balanced diet rich in fruits and vegetables can improve overall health? 🍎🥦 A variety of nutrients supports immune function and reduces disease risk.",
    "Incorporating whole grains into your diet can improve heart health? 🌾❤️ Whole grains are rich in fiber and can help lower cholesterol levels.",
    "Eating cruciferous veggies like broccoli may help prevent cancer? 🥦🛡️They're rich in compounds that detoxify harmful substances.",
    "Including berries in your diet can boost your brain health? 🍓🧠 Berries are packed with antioxidants that support cognitive function.",
    "Incorporating legumes like beans and lentils can improve heart health? 🥗❤️ They're high in fiber and can help lower cholesterol levels.",
    "Eating a variety of colorful fruits and vegetables can improve overall health? 🌈🥕 Different colors provide different nutrients and antioxidants.",
    "Including seeds like chia and flaxseeds can boost your omega-3 intake? 🌱🐟 These tiny powerhouses are great for heart and brain health.",
    "Incorporating fermented foods like yogurt and kimchi can improve gut health? 🥣🦠 Probiotics support a healthy microbiome and digestion.",
    "Chronic inflammation is the root of many diseases like arthritis, diabetes, and even cancer?🫚 Eating anti-inflammatory foods like turmeric and ginger helps!",
    "Maintaining a healthy weight is crucial for overall health? ⚖️🥗 It reduces the risk of chronic diseases and improves quality of life.",
    "Managing stress is essential for overall health? 🧘‍♀️💆‍♂️ Chronic stress can lead to various health issues, so practicing relaxation techniques is important.",
    "Building strong social connections can improve mental health? 🤝💬 Positive relationships provide support and reduce feelings of loneliness.",
    "Engaging in regular physical activity can boost your mood? 🏋️‍♀️😊 Exercise releases endorphins, which can help alleviate stress and anxiety.",
    "Practicing mindfulness can reduce stress and improve focus? 🧘‍♀️🧘‍♂️ Just a few minutes a day can make a difference.",
    "Prioritizing self-care is essential for overall well-being? 🛁💆‍♀️ Taking time to relax and recharge can improve mental health.",
    "Setting realistic health goals can improve motivation and success? 🎯💪 Break your goals into smaller, achievable steps.",
    "Eating a balanced diet rich in whole foods can improve overall health? 🥗🍎 Focus on fruits, vegetables, whole grains, lean proteins, and healthy fats.",
    "📵 Too much screen time before bed can mess with your sleep? 😵‍💫The blue light from phones blocks melatonin—your sleep hormone. 🌙",
    "💃 Did you know? Dancing improves not only fitness but also mental clarity and memory? 🕺🧠It’s a fun brain-body workout!",
    "🥶 Did you know? Drinking cold water can help you burn a few extra calories? ❄️💦Your body uses energy to warm it up to body temperature.",
    "🧘‍♂️ Did you know? Practicing yoga can improve flexibility and reduce stress? 🧘‍♀️🕉️ It's a great way to connect your mind and body.",
    "💨 Did you know? Deep breathing can lower blood pressure and anxiety in minutes? 🌬️ Just inhale deeply... and exhale slowly. Repeat. It works!,",
    "🧠 Did you know? Your brain uses about 20% of your body's total oxygen and calories? 🧠💡 So, keep it healthy with good nutrition and exercise!",
    "🧴 Did you know? Your skin is your body’s largest organ? 🛡️ It protects you from bacteria, regulates temperature, and even detoxifies!",
    "🦴 Did you know? Your bones are constantly being remodeled? 🦴🔄 This process helps maintain bone strength and integrity throughout your life.",
    "🦷 Did you know? Your teeth are also considered bones? 🦷🦴 They are the hardest substances in your body and play a crucial role in digestion.",
    "🧠 Did you know? Your brain generates enough electricity to power a small light bulb? 💡🧠 It’s the most energy-consuming organ in your body!",
    "🧊 Did you know? Applying ice to a sprain right away can reduce swelling and speed up healing? 🦶❄️",
    "🥚 Did you know? Eggs are one of the most nutrient-dense foods on the planet? 🍳One egg contains over a dozen essential vitamins and minerals!",
    "🍌 Did you know? Bananas can naturally help fight depression? 🍌😊They contain tryptophan, which the body converts to serotonin — the feel-good hormone!",
    "🚶 Sitting too long is now considered as harmful as smoking? 🪑🚫Try to move every 30 minutes to keep your body happy.",
    "🥛 Did you know? Many people lose the ability to digest lactose as they age? 🐄This can cause bloating and discomfort after dairy products.",
    "🧂 Too much salt can silently raise your blood pressure? 🧂⚠️Read labels and opt for natural seasoning like herbs!",
    "🍉 Watermelon is 92% water — making it perfect for hydration and skin health? 🍉💧",
    "🥦 Did you know? Broccoli is a superfood that can help detoxify your body? 🥦💪 It’s packed with vitamins, minerals, and antioxidants!",
    "😴 Napping for 10-20 minutes can improve alertness without making you groggy? 😌🛏️",
    "🧠 Learning new skills can grow your brain? 📚🧠Mental exercises strengthen neural pathways and improve memory.",
    "🍋 Drinking warm lemon water in the morning aids digestion and boosts metabolism? 🍋💦",
    "🫀 High cholesterol has no symptoms, yet it's a major risk factor for heart disease? 🧬Regular checkups are key! 🩺",
    "🥥 Coconut oil has natural antibacterial and antifungal properties? 🥥🛡️It’s great for skin, hair, and even oral health (oil pulling).",
    "🥶 Cold showers can boost circulation, reduce muscle soreness, and even improve mood? 🚿❄️",
    "💉 Your immune system remembers every germ it has ever defeated? 🧬🛡️That’s how vaccines help protect you!",
    "🌾 Did you know? Fiber helps regulate blood sugar, supports heart health, and keeps your gut happy? 🌾🍽️",
    "🍓 Did you know? Strawberries contain more Vitamin C than oranges? 🍓💪They’re great for skin, immune health, and collagen production!",
    "🥬 Did you know? Leafy greens like spinach and kale support detoxification and provide essential nutrients? 🥬🌿",
    "🧊 Did you know? Drinking cold water slightly increases calorie burn as your body works to warm it up? ❄️🔥",
    "📖 Did you know? Reading regularly can reduce stress and keep your brain sharp as you age? 📖🧠",
    "🛌 Did you know? Sleep helps repair your body, balance hormones, and consolidate memories? 🛌💤",
    "🍇 Did you know? Grapes contain resveratrol, a compound that supports heart and cellular health? 🍇❤️",
    "🍠 Did you know? Sweet potatoes are rich in fiber, vitamins, and antioxidants that promote gut and eye health? 🍠👀",
    "🥗 Did you know? Eating a rainbow of fruits and vegetables ensures a wide range of nutrients? 🌈🥗",
    "🧘 Did you know? Deep breathing lowers cortisol levels and promotes relaxation almost instantly? 🌬️🧘‍♀️",
    "🦵 Did you know? Regular stretching improves flexibility, reduces injury risk, and relieves tension? 🤸‍♂️🦵",
    "🧴 Did you know? Sunscreen protects against premature aging and reduces the risk of skin cancer? 🧴☀️",
    "🥛 Did you know? Calcium and vitamin D work together to keep your bones strong and prevent osteoporosis? 🥛🦴",
    "🎧 Did you know? Listening to calming music can lower heart rate and reduce anxiety? 🎧💆",
    "📅 Did you know? Health is a daily habit—not a one-time event. Small steps every day make a big difference! 📅💚",
    "🥜 Did you know? Nuts like almonds and walnuts support heart health and provide healthy fats for brain function? 🥜🧠",
    "🧠 Did you know? Staying mentally active through puzzles, reading, or learning helps delay age-related decline? 🧩📚",
    "🚴 Did you know? Cycling regularly boosts joint mobility, cardiovascular health, and mental wellness? 🚴‍♀️💪",
    "🍋 Did you know? Vitamin C helps your body heal wounds and absorb iron more effectively? 🍋🩹",
    "👁️ Did you know? Omega-3 fatty acids from fish help protect your vision and reduce dry eyes? 🐟👁️",
    "🍄 Did you know? Mushrooms are one of the few plant sources of vitamin D and support immune health? 🍄🌞",
    "🍯 Did you know? Raw honey has natural antibacterial properties and can soothe a sore throat? 🍯👅",
    "🫛 Did you know? Legumes like beans and lentils are rich in plant protein and help lower cholesterol? 🫘❤️",
    "🧂 Did you know? Excess salt can cause water retention and strain your kidneys? Limit processed foods! 🧂🚱",
    "🧃 Did you know? Most fruit juices contain more sugar than soda — eat whole fruits instead! 🍊🚫🥤",
    "🧘 Did you know? Practicing yoga improves flexibility, reduces stress, and strengthens core muscles? 🧘‍♀️💪",
    "💨 Did you know? Shallow breathing reduces oxygen flow — practice slow, deep breaths to energize your body? 🌬️🫁",
    "🍕 Did you know? Highly processed foods can lead to inflammation and increased disease risk over time? 🍕⚠️",
    "🥗 Did you know? Starting meals with salad or veggies can help control hunger and improve digestion? 🥗🕒",
    "🍍 Did you know? Pineapple contains bromelain, an enzyme that aids digestion and reduces inflammation? 🍍🔥",
    "🥤 Did you know? Carbonated drinks can weaken tooth enamel and increase acid reflux risk? 🥤🦷",
    "👃 Did you know? A healthy gut can reduce allergies and even improve skin conditions? 🦠👃",
    "🪞 Did you know? What shows on your skin often reflects what’s going on inside your gut and liver? ✨🧬",
    "🌶️ Did you know? Spicy foods can temporarily boost metabolism and help clear sinus congestion? 🌶️💨",
    "🍵 Did you know? Green tea is rich in antioxidants and can enhance fat burning during exercise? 🍵🔥",
    "🍎 Did you know? Eating fruits with the skin on (like apples) provides more fiber and nutrients? 🍎🧠",
    "🧃 Did you know? Drinking too many sugary drinks can lead to insulin resistance and weight gain? 🧃⚠️",
    "🦠 Did you know? Over 70% of your immune system lives in your gut? Healthy digestion = strong immunity! 🦠💪",
    "🥬 Did you know? Dark leafy greens help protect your eyes and reduce your risk of chronic diseases? 🥬👁️",
    "🧖‍♀️ Did you know? A warm bath with Epsom salts can relax your muscles and improve sleep quality? 🛁😌",
    "💤 Did you know? Consistent sleep schedules support hormone balance, memory, and mood regulation? 💤🧠",
    "🧼 Did you know? Washing your hands properly reduces the risk of respiratory infections by up to 21%? 🧼🤲",
    "🥤 Did you know? Caffeine late in the day can disrupt sleep even if you don’t feel wired? ☕🚫🌙",
    "🥗 Did you know? Fermented foods like yogurt and kimchi contain probiotics that support gut health? 🥗🦠",
    "🧊 Did you know? Icing sore muscles after exercise reduces inflammation and speeds up recovery? 🧊💪",
    "🍊 Did you know? Oranges are not only rich in vitamin C but also boost collagen production for healthy skin? 🍊✨",
    "👟 Did you know? Wearing the right shoes can prevent joint problems and improve your posture? 👟🦵",
    "🫀 Did you know? Deep belly breathing helps slow your heart rate and ease anxiety? 🫀🌬️",
    "🍳 Did you know? Skipping breakfast regularly can lead to poor concentration and low energy? 🍳🕒",
    "🧠 Did you know? Positive thoughts can influence your body’s ability to heal and fight illness? 🧠💭",
    "🍉 Did you know? Foods rich in water content (like cucumber and watermelon) help keep you full and hydrated? 🍉🥒",
    "📵 Did you know? Taking digital breaks improves focus, eye health, and reduces stress levels? 📵👁️",
    "🪥 Did you know? Brushing your tongue can reduce bacteria and improve breath freshness? 🪥👅",
    "🧅 Did you know? Onions contain antioxidants and sulfur compounds that help fight inflammation? 🧅🔥",
    "🏞️ Did you know? Spending time in nature can lower blood pressure, reduce stress, and improve mental health? 🌳🧘",
    "🍳 Did you know? Cooking with olive oil provides healthy fats that support heart and brain function? 🫒🧠",
    "🥒 Did you know? Cucumbers contain antioxidants and help flush out toxins from your body? 🥒💧",
    "🪴 Did you know? Houseplants like aloe vera and peace lily can purify indoor air and improve mental clarity? 🪴🌬️",
    "🍂 Did you know? Seasonal foods often contain the exact nutrients your body needs for that time of year? 🍁🥗",
    "🫁 Did you know? Breathing through your nose filters and humidifies air better than mouth breathing? 👃🫁",
    "🥜 Did you know? Peanut butter is a good source of protein, but choose natural ones without added sugar or oil? 🥜⚖️",
    "💧 Did you know? Even mild dehydration can impair your mood, memory, and motor coordination? 💧😵‍💫",
    "🧠 Did you know? Omega-3 fatty acids found in fish help reduce depression and anxiety? 🐟🧘",
    "🛡️ Did you know? Zinc supports immune function and wound healing, and is found in seeds, beans, and meat? 🥩🛡️",
    "🌽 Did you know? Corn is a whole grain packed with fiber and antioxidants like lutein for eye health? 🌽👁️",
    "🌜 Did you know? Exposure to moonlight and darkness boosts melatonin production for deeper sleep? 🌛😴",
    "🧃 Did you know? Drinking infused water with lemon, cucumber, or mint can encourage better hydration? 🍋🥒💧",
    "🍚 Did you know? Brown rice has more fiber and nutrients than white rice, making it better for blood sugar? 🍚🔁",
    "🌰 Did you know? Brazil nuts are a rich source of selenium, a mineral that supports thyroid function? 🌰🦋",
    "🍳 Did you know? Choline in eggs is essential for brain development and liver function? 🍳🧠",
    "🍵 Did you know? Herbal teas like chamomile and peppermint can calm your digestive system and reduce bloating? 🍵🌿",
    "🧘 Did you know? Practicing mindfulness can reduce inflammation markers in the body? 🧘‍♂️🧬",
    "🩹 Did you know? Vitamin K found in leafy greens helps your blood clot and wounds heal faster? 🥬🩹",
    "🍠 Did you know? Purple sweet potatoes are rich in anthocyanins, which have anti-aging and brain-protective effects? 🍠🧠",
    "🐝 Did you know? Bee pollen is a natural energy booster loaded with enzymes, vitamins, and antioxidants? 🐝⚡",
    "🍒 Did you know? Cherries contain melatonin, which can naturally improve sleep quality? 🍒🌙",
    "🥶 Did you know? Cryotherapy or cold exposure may reduce muscle pain and boost recovery after exercise? ❄️💪",
    "🍇 Did you know? Red grapes are rich in resveratrol, a compound that supports heart and brain health? 🍇🫀",
    "🦴 Did you know? Weight-bearing exercises like walking and dancing help maintain strong bones? 💃🦴",
    "🧼 Did you know? Sanitizing your phone regularly can reduce the spread of harmful bacteria to your face? 📱🧽",
    "🍞 Did you know? Whole grains like oats and quinoa help reduce cholesterol and support digestion? 🌾🍞",
    "🧈 Did you know? Grass-fed butter contains vitamin K2, which is important for bone and heart health? 🧈❤️",
    "🍂 Did you know? Spending time outdoors during fall improves immunity and boosts serotonin levels? 🍂😊",
    "🫒 Did you know? The Mediterranean diet is one of the most researched for reducing chronic disease? 🇬🇷🫒",
    "🥤 Did you know? Drinking water before meals can help control appetite and support weight management? 🥤⚖️",
    "🫖 Did you know? Ginger tea can soothe nausea, reduce bloating, and improve circulation? 🫖🫀",
    "🧄 Did you know? Garlic can help reduce blood pressure and cholesterol levels when eaten regularly? 🧄📉",
    "👣 Did you know? Going barefoot occasionally strengthens foot muscles and improves posture? 👣🌿",
    "🍽️ Did you know? Eating slowly allows your brain time to signal fullness, preventing overeating? 🧠🍽️",
    "🎯 Did you know? Setting health goals makes you more likely to stick to healthy habits long-term? 🎯📈",
    "🍳 Did you know? Cooking at home helps control ingredients and reduces added sugars and unhealthy fats? 🍳🏠",
    "🧃 Did you know? Store-bought smoothies can contain more sugar than soda — always check the label! 🧃🔍",
    "🍋 Did you know? Lemons support liver detoxification and help alkalize the body despite their acidity? 🍋🧼",
    "🧘 Did you know? Just five minutes of daily stretching can improve circulation and reduce muscle tension? 🧘‍♀️🕔",
    "🥦 Did you know? Sulforaphane in broccoli helps fight inflammation and may protect against cancer? 🥦🧬",
    "🦷 Did you know? Chewing sugar-free gum after meals can help prevent tooth decay by increasing saliva? 🦷🍬",
    "🍊 Did you know? Vitamin C boosts collagen production, which keeps your skin firm and youthful? 🍊✨",
    "👂 Did you know? Regular ear cleaning with harsh tools can actually damage your ear canal? 👂🚫",
    "🥚 Did you know? Eggs are one of the few foods that naturally contain vitamin D? 🥚🌞",
    "🌡️ Did you know? A fever is your body’s way of fighting infection — it raises temperature to kill pathogens? 🌡️🦠",
    "🥥 Did you know? Coconut oil can be used for oil pulling to improve oral hygiene and freshen breath? 🥥👄",
    "📚 Did you know? Reading before bed (instead of scrolling) improves sleep quality and reduces stress? 📚😴",
    "🌾 Did you know? Gluten intolerance can cause digestive issues, fatigue, and even brain fog in some people? 🌾🤯",
    "🏋️ Did you know? Strength training not only builds muscle but also boosts metabolism and bone density? 🏋️‍♂️🔥",
    "🦠 Did you know? Antibiotics don’t work on viruses — they’re only effective against bacterial infections? 💊🚫🦠",
    "🌶️ Did you know? Capsaicin in chili peppers boosts metabolism and supports pain relief? 🌶️🔥",
    "🥬 Did you know? Kale contains more calcium per gram than milk — and it's easier to digest for many? 🥬🦴",
    "📴 Did you know? Turning off notifications reduces anxiety and helps you stay focused and productive? 📴🧘",
    "🧃 Did you know? Artificial sweeteners may confuse hunger hormones and increase cravings for sugar? 🍬🤖",
    "🧼 Did you know? Most germs are spread by hands — handwashing is still the #1 defense against illness? 🧼🖐️",
    "🍏 Did you know? Green apples are slightly lower in sugar and higher in fiber than red ones? 🍏⚖️",
    "🚶 Did you know? Standing or walking after meals aids digestion and helps prevent energy crashes? 🚶‍♀️⚡",
    "🥗 Did you know? Adding healthy fats like avocado or olive oil helps your body absorb fat-soluble vitamins? 🥑🛡️",
    "🎧 Did you know? Nature sounds can lower cortisol and help calm your nervous system? 🌲🎧",
    "💤 Did you know? Sleep deprivation can weaken immunity, increase inflammation, and disrupt hormones? 💤⚠️",
    "🥛 Did you know? Lactose intolerance affects over 65% of the world’s population — plant-based milks are great alternatives? 🥛🌱",
    "🪥 Did you know? Replacing your toothbrush every 3 months helps prevent bacterial buildup and improves oral hygiene? 🪥🦷",
    "🍃 Did you know? Moringa leaves contain more iron than spinach and more calcium than milk? 🍃💪",
    "🧘 Did you know? Just 5 minutes of focused breathing can lower heart rate and reduce anxiety? 🧘‍♂️🫁",
    "🍍 Did you know? Bromelain in pineapple helps reduce inflammation and supports faster recovery? 🍍🔥",
    "🍜 Did you know? Bone broth contains collagen and amino acids that support gut, joint, and skin health? 🍜✨",
    "🧴 Did you know? Dry brushing your skin before showering can improve circulation and exfoliate dead cells? 🧴🧽",
    "🏃 Did you know? Morning exercise can help regulate your circadian rhythm and improve nightly sleep? 🏃‍♂️🌞",
    "🌙 Did you know? Exposure to darkness triggers melatonin production, signaling your body it’s time to sleep? 🌙🧠",
    "🍓 Did you know? Berries are among the most antioxidant-rich fruits and help fight free radical damage? 🍓🛡️",
    "🥕 Did you know? Cooking carrots increases beta-carotene absorption, which your body converts to vitamin A? 🥕🔥",
    "💧 Did you know? Drinking water first thing in the morning kickstarts your metabolism and hydrates your organs? 💧🌅",
    "🐟 Did you know? Fatty fish like salmon and sardines are rich in DHA, crucial for brain and eye development? 🐟👁️",
    "📵 Did you know? Avoiding screens 1 hour before bed improves melatonin levels and sleep quality? 📵😴",
    "👟 Did you know? Walking barefoot on natural surfaces (earthing) may help reduce inflammation and improve mood? 👟🌍",
    "🧬 Did you know? Chronic stress can actually alter your DNA expression over time through epigenetics? 🧬⚠️",
    "🍉 Did you know? Eating water-rich fruits like watermelon helps you stay hydrated and supports kidney function? 🍉💧",
    "🧊 Did you know? Ice baths are popular among athletes for reducing inflammation and speeding up recovery? 🧊🏋️",
    "🍠 Did you know? Orange vegetables like sweet potatoes support eye health and immune function due to high beta-carotene? 🍠👁️",
    "🥦 Did you know? Broccoli sprouts may contain up to 100 times more sulforaphane than mature broccoli? 🥦💥 ",
    "🍵 Did you know? Drinking herbal teas like chamomile can help relax your muscles and improve digestion? 🍵🌿",
    "🍇 Did you know? Grapes contain antioxidants that may help protect against heart disease and cancer? 🍇❤️",
    "🧠 Did you know? Regularly challenging your brain with puzzles or learning new skills can help keep it sharp as you age? 🧠🧩",
    "🧴 Did you know? Using sunscreen daily helps prevent premature aging and reduces the risk of skin cancer? 🧴☀️",
    "🥑 Did you know? Avocados provide healthy monounsaturated fats that support heart health and brain function? 🥑🧠",
    "🛌 Did you know? Poor sleep quality can impair memory, concentration, and immune function? 🛌🧠",
    "🥥 Did you know? Coconut water is a natural source of electrolytes, making it great for hydration? 🥥💧",
    "🧄 Did you know? Garlic has compounds that may help reduce blood pressure and cholesterol? 🧄❤️",
    "🦴 Did you know? Vitamin D helps your body absorb calcium to keep your bones strong? 🦴☀️",
    "🧠 Did you know? Regular social interaction can improve brain health and reduce dementia risk? 🧠🤝",
    "🍊 Did you know? Oranges are high in vitamin C, which supports your immune system and skin health? 🍊🛡️",
    "🚶 Did you know? Taking short breaks to walk during the day can boost your energy and reduce stress? 🚶‍♀️⚡",
    "🥚 Did you know? Eggs are a great source of choline, important for brain and liver health? 🥚🧠",
    "🥦 Did you know? Broccoli contains fiber, vitamins, and antioxidants that support digestion and immunity? 🥦🛡️",
    "💧 Did you know? Drinking enough water helps maintain body temperature and lubricates joints? 💧🔥",
    "🧘 Did you know? Meditation can reduce anxiety, lower blood pressure, and improve focus? 🧘‍♂️🧠",
    "🍓 Did you know? Strawberries have antioxidants that support skin health and reduce inflammation? 🍓✨",
    "📵 Did you know? Reducing screen time before bed improves sleep and reduces eye strain? 📵😴",
    "🍯 Did you know? Honey has antibacterial properties and can soothe sore throats? 🍯😌",
    "🧴 Did you know? Applying sunscreen daily protects against UV damage and skin cancer? 🧴☀️",
    "🧠 Did you know? Learning new skills stimulates brain plasticity and cognitive health? 🧠📚",
    "🥒 Did you know? Cucumbers are 95% water and help keep you hydrated and refreshed? 🥒💧",
    "🧃 Did you know? Drinking herbal infusions can support liver health and detoxification? 🍵🧼",
    "🛏️ Did you know? Keeping a consistent sleep schedule improves sleep quality and overall health? 🛏️⏰",
    "🍓 Did you know? Berries are low in calories but high in fiber and antioxidants? 🍓💪",
    "🦷 Did you know? Flossing daily helps prevent gum disease and cavities? 🦷🧵",
    "🌞 Did you know? Moderate sun exposure boosts vitamin D but avoid peak hours to protect your skin? 🌞⛱️",
    "🥬 Did you know? Spinach contains lutein and zeaxanthin, which protect your eyes from UV damage? 🥬👁️",
    "🍵 Did you know? Green tea may boost metabolism and help burn fat? 🍵🔥",
    "🧂 Did you know? Too much salt intake can lead to high blood pressure and heart problems? 🧂⚠️",
    "🥚 Did you know? Eating eggs can improve your cholesterol profile by raising good HDL cholesterol? 🥚💪",
    "🧘‍♀️ Did you know? Yoga improves flexibility, strength, and reduces stress? 🧘‍♀️🕉️",
    "🍎 Did you know? Apples contain pectin, a fiber that supports gut health and lowers cholesterol? 🍎❤️",
    "🚶‍♂️ Did you know? Walking after meals helps digestion and regulates blood sugar? 🚶‍♂️🍽️",
    "🧃 Did you know? Staying hydrated can improve concentration and prevent headaches? 💧🧠",
    "🛁 Did you know? Taking a warm bath before bed can help you fall asleep faster? 🛁😴",
    "🍇 Did you know? Grapes contain resveratrol, which may help protect against heart disease? 🍇❤️",
    "🥑 Did you know? Avocados are rich in healthy fats and can help lower bad cholesterol? 🥑💚",
    "🥑 Did you know? Eating avocados regularly supports heart health with their healthy fats? 🥑❤️",
    "🦴 Did you know? Weight-bearing exercise helps maintain bone density and prevent osteoporosis? 🏋️‍♂️🦴",
    "🍋 Did you know? Vitamin C in lemons boosts your immune system and helps iron absorption? 🍋🛡️",
    "🧠 Did you know? Sleep is critical for memory consolidation and learning? 💤🧠",
    "🥦 Did you know? Broccoli contains sulforaphane, a compound that may protect against cancer? 🥦🛡️",
    "🧃 Did you know? Drinking water instead of sugary drinks reduces calorie intake and supports weight loss? 💧⚖️",
    "🧘‍♂️ Did you know? Meditation can lower blood pressure and reduce stress hormones? 🧘‍♂️🩺",
    "🦷 Did you know? Brushing your teeth twice a day reduces the risk of cavities and gum disease? 🦷🪥",
    "🥕 Did you know? Carrots are rich in beta-carotene which promotes healthy vision? 🥕👁️",
    "🍓 Did you know? Strawberries have antioxidants that support skin health and reduce inflammation? 🍓✨",
    "🚶‍♀️ Did you know? Walking 30 minutes a day improves cardiovascular health and mood? 🚶‍♀️❤️",
    "🛌 Did you know? Poor sleep quality is linked to higher risks of obesity and diabetes? 🛌⚠️",
    "🍄 Did you know? Mushrooms contain vitamin D and antioxidants that support immune function? 🍄🛡️",
    "🧄 Did you know? Garlic has natural antimicrobial properties that help fight infections? 🧄🦠",
    "🍉 Did you know? Watermelon helps keep you hydrated and provides antioxidants? 🍉💧",
    "📵 Did you know? Reducing screen time before bed improves sleep and reduces eye strain? 📵😴",
    "🍯 Did you know? Honey has antibacterial properties and can soothe sore throats? 🍯😌",
    "🧴 Did you know? Applying sunscreen daily protects against UV damage and skin cancer? 🧴☀️",
    "🧠 Did you know? Learning new skills stimulates brain plasticity and cognitive health? 🧠📚",
    "🥛 Did you know? Calcium and vitamin D work together to keep your bones strong? 🥛🦴"
];

           
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
                        <li><strong>Performance Bonuses:</b> As you sell more products and build a team, you earn performance bonuses based on your personal sales volume and the sales volume of your team (downline). Kedi has a structured compensation plan that rewards higher sales and team growth.</li>
                        <li><strong>Leadership Bonuses:</b> For those who build and mentor successful teams, Kedi offers leadership bonuses and incentives, which can include car awards, house funds, and international trips.</li>
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

                // Set the chat icon image source
                // First, remove any existing Font Awesome icon if present
                if (openBtn.querySelector('.fas')) {
                    openBtn.querySelector('.fas').remove();
                }
                // Then, add or update the image element
                let chatIconImg = openBtn.querySelector('img');
                if (!chatIconImg) {
                    chatIconImg = document.createElement('img');
                    openBtn.appendChild(chatIconImg);
                }
                chatIconImg.src = CHAT_ICON_IMAGE_URL;
                chatIconImg.alt = "Chatbot Icon - Replace This Image";


                // === Event Listeners ===
                openBtn.addEventListener('click', handleOpenChatbot);
                closeBtn.addEventListener('click', handleCloseChatbot);
                sendBtn.addEventListener('click', handleSendMessage);
                chatbotInput.addEventListener('keypress', handleInputKeyPress);

                // Event listener for dynamically added Q&A buttons inside product/condition cards
                chatbotMessages.addEventListener('click', (event) => {
                    if (event.target.classList.contains('qna-btn')) {
                        const type = event.target.dataset.type;
                        const name = event.target.dataset.name;
                        displayDetailedInfo(type, name);
                    }
                });

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
                async function handleOpenChatbot() {
                    chatbotWindow.classList.remove('hidden');
                    chatbotWindow.classList.add('open');
                    openBtn.classList.add('hidden'); // Hide open button when chatbot is open
                    console.log('Chatbot opened. hasGreeted:', hasGreeted); // Debug log

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

                        // Send the greeting message first and await its completion
                        await sendBotMessageWithTyping(`${greeting} ${emoji}! I'm your Kedi Healthcare Assistant. I'm here to help you with:
                            <ul>
                                <li>Product information and benefits 💊</li>
                                <li>Insights into various health conditions 🩺</li>
                                <li>How to start your own Kedi business 💰</li>
                                <li>General health tips and FAQs ❓</li>
                            </ul>
                            How can I help you today?`);

                        // Then display the suggestions
                        displaySuggestions([{
                            text: "List all products",
                            type: "text"
                        }, {
                            text: "How to make money with Kedi? 💰",
                            type: "text"
                        }, {
                            text: "Tell me about Hydrogen Cup",
                            type: "text"
                        }, {
                            text: "Tell me about Refresh Tea",
                            type: "text"
                        }, {
                            text: "Tell me about Blood Circulatory Massager",
                            type: "text"
                        }, {
                            text: "Tell me about Colon Cleanse",
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
                        hasGreeted = true; // Set flag after greeting and initial suggestions
                    }
                }

                /** Handles closing the chatbot window. */
                function handleCloseChatbot() {
                    chatbotWindow.classList.remove('open');
                    chatbotWindow.classList.add('hidden');
                    openBtn.classList.remove('hidden'); // Show open button when chatbot is closed
                }

                /** Handles sending a message when the send button is clicked. */
                function handleSendMessage(e) {
                    e.preventDefault();
                    sendMessage();
                }
                
                async function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage === '') return;

    addMessage('user', userMessage);
    chatbotInput.value = '';

    let matchedCondition = null; // IMPORTANT: Initialize it here
    let exactMatchFound = false; // And this too

    // Inside your addMessage function, after appending the new message element:
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    
    // Check if it's a bot message and add avatar/content wrapper
    if (sender === 'bot') {
        const botAvatar = document.createElement('img');
        botAvatar.src = BOT_AVATAR_URL; // Make sure BOT_AVATAR_URL is defined
        botAvatar.classList.add('bot-avatar');
        messageElement.appendChild(botAvatar);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('bot-message-content');
        contentWrapper.innerHTML = text; // Use innerHTML for rich content (like cards/buttons)
        messageElement.appendChild(contentWrapper);
    } else {
        messageElement.textContent = text; // Use textContent for user messages
    }
    
    chatbotMessages.appendChild(messageElement);

    // --- Add this line to auto-scroll to the bottom ---
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    // --------------------------------------------------
}

// And also in your sendBotMessageWithTyping, after the final message is added:
async function sendBotMessageWithTyping(messageHtml) {
    // ... (existing typing indicator logic) ...

    // After the actual message is added:
    const botMessageDiv = document.createElement('div');
    botMessageDiv.classList.add('message', 'bot-message');

    const botAvatar = document.createElement('img');
    botAvatar.src = BOT_AVATAR_URL;
    botAvatar.classList.add('bot-avatar');
    botMessageDiv.appendChild(botAvatar);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('bot-message-content');
    contentWrapper.innerHTML = messageHtml;
    botMessageDiv.appendChild(contentWrapper);

    chatbotMessages.appendChild(botMessageDiv);

    // --- Add this line to auto-scroll to the bottom ---
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    // --------------------------------------------------
}

    // --- Start: Intelligent Health Condition Search Logic ---
    for (const condition of healthConditions) {
        if (condition.keywords.test(userMessage)) {
            matchedCondition = condition;
            exactMatchFound = true;
            break;
        }
    }

    if (matchedCondition) { // Check if a match was found
        await sendBotMessageWithTyping(createHealthConditionCardHtml(matchedCondition));
        return; // Stop here if a direct match is found
    }
    // --- End: Intelligent Health Condition Search Logic ---

    // --- Start: "Did you mean" Suggestions (if no exact match) ---
    const lowerCaseUserMessage = userMessage.toLowerCase();
    const suggestions = [];
    // const FUZZY_THRESHOLD = 0.5; // (Removed as not strictly used in current simple fuzzy logic)

    healthConditions.forEach(condition => {
        const conditionNameLower = condition.name.toLowerCase();
        if (conditionNameLower.includes(lowerCaseUserMessage) || lowerCaseUserMessage.includes(conditionNameLower)) {
            suggestions.push(condition.name);
        } else {
            // More advanced fuzzy matching could be here.
            // For simplicity, let's check if any keyword partially matches
            // This part might need adjustment if your 'keywords' are not simple regex strings
            for (const keywordRegex of condition.keywords.source.split('|')) {
                const cleanKeyword = keywordRegex.replace(/\/\w*$/, '').replace(/\\b/g, ''); // Clean regex
                if (cleanKeyword.includes(lowerCaseUserMessage) || lowerCaseUserMessage.includes(cleanKeyword)) {
                    if (!suggestions.includes(condition.name)) {
                        suggestions.push(condition.name);
                    }
                }
            }
        }
    });
     
                // Inside your addMessage function, after appending the new message element:
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // And also in your sendBotMessageWithTyping, after the final message is added:
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    if (suggestions.length > 0) {
        let suggestionHtml = `Did you mean any of these health challenges? <br>`;
        suggestions.forEach(sug => {
            suggestionHtml += `<button class="suggestion-button" data-type="condition" data-name="${sug}">${sug}</button>`;
        });
        await sendBotMessageWithTyping(suggestionHtml);
        return; // Stop here after showing suggestions
    }
    // --- End: "Did you mean" Suggestions ---

    // --- Existing Product Search Logic (if applicable) ---
    const matchedProduct = products.find(p => p.keywords.test(userMessage));
    if (matchedProduct) {
        await sendBotMessageWithTyping(createProductCardHtml(matchedProduct));
        return;
    }

    // --- Existing Gemini API Call Logic (if no specific match found) ---
    try {
        await sendBotMessageWithTyping('...'); // Initial typing indicator
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: userMessage
                    }]
                }]
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let botResponseText = 'Sorry, I am having trouble understanding that.';
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            botResponseText = data.candidates[0].content.parts[0].text;
        }
        await sendBotMessageWithTyping(botResponseText); // Replace "..." with actual response
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        await sendBotMessageWithTyping('Oops! Something went wrong while connecting to the AI. Please try again later.');
    }
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
                        // Create a div for the actual message content to apply padding and background
                        const contentDiv = document.createElement('div');
                        contentDiv.classList.add('bot-message-content');

                        if (isTypingIndicator) {
                            contentDiv.classList.add('typing-indicator');
                            contentDiv.innerHTML = `<span class="dots"><span></span><span></span><span></span></span>`; // Only dots for indicator
                        } else {
                            contentDiv.innerHTML = text; // Use innerHTML for rich content (like product cards)
                        }

                        // Add bot avatar
                        const avatarImg = document.createElement('img');
                        avatarImg.src = BOT_AVATAR_URL;
                        avatarImg.alt = "Bot Avatar";
                        avatarImg.classList.add('bot-avatar');
                        msg.appendChild(avatarImg);
                        msg.appendChild(contentDiv); // Append content div to message
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
                            <div class="image-container">
                                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/CCCCCC/333333?text=Product';" />
                            </div>
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
                 * Creates the HTML string for a health condition card.
                 * @param {object} condition - The health condition object.
                 * @returns {string} HTML string for the health condition card.
                 */
                function createHealthConditionCardHtml(condition) {
                    const qnaButton = condition.qna && condition.qna.length > 0 ?
                        `<button class="qna-btn suggestion-button" data-type="condition" data-name="${condition.name}">Q&A</button>` :
                        '';

                    let recommendedProductsHtml = '';
                    if (condition.recommendedProducts && condition.recommendedProducts.length > 0) {
                        recommendedProductsHtml += `<h4 class="mt-4 text-lg font-semibold text-gray-800">Kedi Healthcare products that may offer support:</h4>`;
                        condition.recommendedProducts.forEach(prodName => {
                            const product = products.find(p => p.name === prodName);
                            if (product) {
                                recommendedProductsHtml += createProductCardHtml(product);
                            }
                        });
                    } else {
                        recommendedProductsHtml += `<p class="mt-4 text-gray-600">While Kedi Healthcare products focus on general well-being, for ${condition.name}, it's crucial to follow medical advice. No specific Kedi product directly treats this condition, but general health support products may be beneficial.</p>`;
                    }

                    // Generate image tags for all images in the array
                    const imagesHtml = condition.images.map(imgSrc => `
                        <img src="${imgSrc}" alt="${condition.name}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/CCCCCC/333333?text=Condition';" />
                    `).join('');

                    return `
                        <div class="health-condition-card">
                            <div class="image-container">
                                ${imagesHtml}
                            </div>
                            <h4>${condition.name}</h4>
                            ${condition.definition ? `<p><strong class="text-gray-700">Definition:</strong> ${condition.definition}</p>` : ''}
                            <p><strong class="text-gray-700">Symptoms:</strong> ${condition.symptoms}</p>
                            <p><strong class="text-gray-700">Recommended Approach:</strong> ${condition.dosage.join(' ')}</p>
                            ${recommendedProductsHtml}
                            <div class="button-group">
                                ${qnaButton}
                            </div>
                        </div>
                    `;
                }


                /**
                 * Creates the HTML string for a health tip card.
                 * @param {string} tipContent - The content of the health tip.
                 * @returns {string} HTML string for the health tip card.
                 */
                function createHealthTipCardHtml(tipContent) {
                    return `
                        <div class="health-tip-card">
                            <h4 class="font-bold text-lg mb-2">💡 Did you know? 💡</h4>
                            <p>${tipContent}</p>
                            <small class="text-gray-500 mt-2 block"><em>Please note: These are general health tips and not a substitute for professional medical advice. Always consult a healthcare professional for personalized guidance.</em></small>
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
                            responseHtml += `<h3 class="text-xl font-bold text-purple-700 mb-4">Product Details: ${item.name} 💊</h3>`; // Section heading with emoji
                            responseHtml += createProductCardHtml(item);
                            if (item.qna && item.qna.length > 0) {
                                responseHtml += `<h4 class="mt-4 text-lg font-semibold text-gray-800">Frequently Asked Questions about ${item.name}:</h4><ul>`; // Section heading
                                item.qna.forEach(qa => {
                                    responseHtml += `<li class="mb-2"><strong class="text-green-700">${qa.question}</strong><br>${qa.answer}</li>`;
                                });
                                responseHtml += `</ul>`;
                            } else {
                                responseHtml += `<p class="mt-4 text-gray-600">No specific Q&A available for ${item.name} at the moment.</p>`;
                            }

                            // If the product is a soap, suggest other soaps
                            if (item.type === 'Soaps') {
                                const otherSoaps = products.filter(p => p.type === 'Soaps' && p.id !== item.id); // Use ID for uniqueness
                                if (otherSoaps.length > 0) {
                                    responseHtml += `<h4 class="mt-4 text-lg font-semibold text-gray-800">You might also be interested in these other Kedi Healthcare soaps:🧼</h4>`; // Section heading with emoji
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
                            responseHtml += `<h3 class="text-xl font-bold text-purple-700 mb-4">Health Challenge: ${item.name} 🩺</h3>`; // Section heading with emoji
                            responseHtml += createHealthConditionCardHtml(item); // Use the new function here

                            if (item.qna && item.qna.length > 0) {
                                responseHtml += `<h4 class="mt-4 text-lg font-semibold text-gray-800">Frequently Asked Questions:</h4><ul>`; // Section heading
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
                                text: "General health tips 💡",
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
                        // Using the new createHealthTipCardHtml function
                        const styledTip = createHealthTipCardHtml(tip);
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
                    const lowerCaseMessage = message.toLowerCase();
                    let botResponse = "I'm sorry, I didn't quite understand that. Could you please rephrase or ask something else?";
                    let suggestions = [];

                    // 1. Handle "Next Tip" button click
                    if (lowerCaseMessage === "next tip") {
                        currentHealthTipIndex++;
                        await displayHealthTip(currentHealthTipIndex);
                        return;
                    }
                    // 2. Handle "See all health tips"
                    if (lowerCaseMessage === "see all health tips") {
                        let tipsHtml = `<h3 class="text-xl font-bold text-purple-700 mb-4">All General Health Tips: 💡</h3>`; // Section heading with emoji
                        generalHealthTips.forEach(tip => {
                            tipsHtml += createHealthTipCardHtml(tip); // Use card for each tip
                        });
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
                    // 3. Handle "Back to main menu"
                    if (lowerCaseMessage === "back to main menu") {
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

                    // 4. Handle "List all products"
                    if (lowerCaseMessage === "list all products") {
                        const groupedProducts = products.reduce((acc, product) => {
                            (acc[product.type] = acc[product.type] || []).push(product);
                            return acc;
                        }, {});

                        let allProductsHtml = `<h3 class="text-xl font-bold text-purple-700 mb-4">Our Products by Category: 🛍️</h3>`; // Section heading with emoji
                        for (const type in groupedProducts) {
                            allProductsHtml += `<h4 class="text-lg font-semibold text-purple-600 mt-4 mb-2">${type}</h4>`;
                            groupedProducts[type].forEach(product => {
                                allProductsHtml += createProductCardHtml(product);
                                suggestions.push({
                                    text: `Tell me about ${product.name}`,
                                    type: "text"
                                });
                            });
                        }
                        await sendBotMessageWithTyping(allProductsHtml);
                        suggestions.push({
                            text: "General health tips 💡",
                            type: "text"
                        }, {
                            text: "Symptom Checker ✨",
                            type: "text"
                        }, {
                            text: "Personalized Product Recommendation ✨",
                            type: "text"
                        });
                        displaySuggestions(suggestions);
                        return;
                    }

                    // 5. Direct Product/Health Condition Lookup (NEW LOGIC)
                    let foundItem = null;
                    // Check products first
                    for (const product of products) {
                        if (lowerCaseMessage.includes(product.name.toLowerCase()) || product.keywords.test(lowerCaseMessage)) {
                            foundItem = { type: 'product', name: product.name };
                            break;
                        }
                    }
                    // If not a product, check health conditions
                    if (!foundItem) {
                        for (const condition of healthConditions) {
                            if (lowerCaseMessage.includes(condition.name.toLowerCase()) || condition.keywords.test(lowerCaseMessage)) {
                                foundItem = { type: 'condition', name: condition.name };
                                break;
                            }
                        }
                    }

                    if (foundItem) {
                        await displayDetailedInfo(foundItem.type, foundItem.name);
                        return; // Exit function after handling direct lookup
                    }


                    // 6. --- Symptom Checker Logic ---
                    if (lowerCaseMessage.includes("symptom checker")) {
                        waitingForSymptoms = true;
                        await sendBotMessageWithTyping("I can help you with a symptom checker. Please list your symptoms, separated by commas (e.g., 'headache, fever, cough'). 🤒"); // Added emoji
                        suggestions.push({
                            text: "Back to main menu",
                            type: "text"
                        });
                        displaySuggestions(suggestions);
                        return;
                    }

                    if (waitingForSymptoms) {
                        const symptoms = lowerCaseMessage.split(',').map(s => s.trim());
                        await sendBotMessageWithTyping("Thank you for providing your symptoms. Let me analyze them to see if I can find a match or provide some general guidance. 🤔"); // Added emoji

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
                            let conditionsHtml = `<h3 class="text-xl font-bold text-purple-700 mb-4">Possible Health Conditions: 🩺</h3>`; // Section heading with emoji
                            conditionsHtml += `<p class="mb-4">Based on your symptoms, here are some health conditions that might be relevant. Please remember, I am an AI and cannot provide medical diagnoses. Always consult a healthcare professional for accurate diagnosis and treatment:</p>`;
                            matchedConditions.forEach(condition => {
                                conditionsHtml += createHealthConditionCardHtml(condition); // Use the new function here
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

                    // 7. --- Personalized Product Recommendation Logic ---
                    if (lowerCaseMessage.includes("personalized product recommendation")) {
                        waitingForHealthGoal = true;
                        await sendBotMessageWithTyping("I can help you find products based on your health goals! Please tell me what health area you are interested in (e.g., 'immunity', 'energy', 'digestion', 'skin health'). 🎯"); // Added emoji
                        suggestions.push({
                            text: "Back to main menu",
                            type: "text"
                        });
                        displaySuggestions(suggestions);
                        return;
                    }

                    if (waitingForHealthGoal) {
                        const healthGoal = lowerCaseMessage;
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
                            addProductsByKeywords(["gastrifort capsule", "constilease", "colon cleanse"]);
                        }
                        if (healthGoal.includes("female reproductive health") || healthGoal.includes("hormonal balance") || healthGoal.includes("pid") || healthGoal.includes("ovarian cysts") || healthGoal.includes("menstrual")) {
                            addProductsByKeywords(["gynapharm capsule", "golden six"]);
                        }
                        if (healthGoal.includes("prostate health") || healthGoal.includes("urinary health male")) {
                            addProductsByKeywords(["lycovite"]);
                        }
                        if (healthGoal.includes("cardiovascular") || healthGoal.includes("heart health") || healthGoal.includes("blood pressure") || healthGoal.includes("cholesterol")) {
                            addProductsByKeywords(["cello q10", "blood circulatory massager"]); // Added BCM
                        }
                        if (healthGoal.includes("blood health") || healthGoal.includes("anemia") || healthGoal.includes("iron deficiency") || healthGoal.includes("blood circulation")) {
                            addProductsByKeywords(["reishi (blood tonic)", "blood circulatory massager"]); // Added BCM
                        }
                        if (healthGoal.includes("oral hygiene") || healthGoal.includes("toothache") || healthGoal.includes("dental pain") || healthGoal.includes("gum health")) {
                            addProductsByKeywords(["gum care toothpaste"]);
                        }
                        if (healthGoal.includes("detox") || healthGoal.includes("cleanse") || healthGoal.includes("liver detox")) {
                            addProductsByKeywords(["refresh tea", "colon cleanse"]);
                        }
                        if (healthGoal.includes("water") || healthGoal.includes("hydration") || healthGoal.includes("alkaline")) {
                            addProductsByKeywords(["hydrogen cup"]);
                        }
                        if (healthGoal.includes("acne") || healthGoal.includes("skin care") || healthGoal.includes("pimple")) {
                            addProductsByKeywords(["sulphur-anti-acne-soap", "pearl-whitening-soap", "nano-silver-antibacterial-soap"]); // All soaps for skin care
                        }
                        if (healthGoal.includes("whitening") || healthGoal.includes("brighten skin") || healthGoal.includes("lighten skin") || healthGoal.includes("pigmentation")) {
                            addProductsByKeywords(["pearl-whitening-soap"]);
                        }
                        if (healthGoal.includes("antibacterial") || healthGoal.includes("germs") || healthGoal.includes("deep cleansing") || healthGoal.includes("skin hygiene")) {
                            addProductsByKeywords(["nano-silver-antibacterial-soap"]);
                        }
                        if (healthGoal.includes("coffee") || healthGoal.includes("healthy coffee") || healthGoal.includes("energy drink")) {
                            addProductsByKeywords(["kedi coffee"]);
                        }


                        const recommendedProducts = Array.from(recommendedProductsSet); // Convert Set back to Array

                        if (recommendedProducts.length > 0) {
                            // Group recommended products by type
                            const groupedProducts = recommendedProducts.reduce((acc, product) => {
                                (acc[product.type] = acc[product.type] || []).push(product);
                                return acc;
                            }, {});

                            let productHtml = `<h3 class="text-xl font-bold text-purple-700 mb-4">Personalized Product Recommendations: ✨</h3>`; // Section heading with emoji
                            productHtml += `<p class="mb-4">Based on your health goal of "${healthGoal}", here are some Kedi Healthcare products you might find beneficial:</p>`;
                            for (const type in groupedProducts) {
                                productHtml += `<h4 class="text-lg font-semibold text-purple-600 mt-4 mb-2">${type}</h4>`;
                                groupedProducts[type].forEach(product => {
                                    productHtml += createProductCardHtml(product);
                                    suggestions.push({
                                        text: `Tell me about ${product.name}`,
                                        type: "text"
                                    });
                                });
                            }
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

                    // 8. Handle "General health tips"
                    if (lowerCaseMessage.includes("general health tips")) {
                        currentHealthTipIndex = 0; // Reset to first tip
                        await displayHealthTip(currentHealthTipIndex);
                        return;
                    }

                    // 9. Handle general FAQs
                    for (const faq of faqs) {
                        if (faq.q.test(lowerCaseMessage)) {
                            await sendBotMessageWithTyping(faq.a);
                            // Always offer general suggestions after an FAQ response
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
                            return; // Exit function after handling FAQ
                        }
                    }


                    // 10. Fallback to LLM if no specific match
                    // Remove any existing typing indicators before making a new one
                    const existingTypingIndicators = chatbotMessages.querySelectorAll('.typing-indicator');
                    existingTypingIndicators.forEach(indicator => indicator.remove());

                    // Display "thinking" message
                    await sendBotMessageWithTyping("Let me think about that for a moment... 🤔"); // Added emoji
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
                            botResponse = "I'm having trouble connecting to my knowledge base right now. Please try again later or ask a different question. 🚧"; // Added emoji
                            console.warn('Gemini API response structure unexpected or empty.'); // Debug log
                        }
                    } catch (error) {
                        console.error("Error calling Gemini API:", error); // Debug log
                        botResponse = "I'm currently experiencing technical difficulties and cannot process your request. Please try again in a moment. 🛠️"; // Added emoji
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

            // --- LLM Feature Modal Logic (retained from previous version) ---

            // DOM Element References for Modal (these are outside the main chatbot.js scope but are needed)
            const llmModalOverlay = document.getElementById('llm-modal-overlay');
            const llmModalCloseButton = document.getElementById('llm-modal-close-button');
            const llmModalTitle = document.getElementById('llm-modal-title');
            const llmModalBody = document.getElementById('llm-modal-body');
            const llmModalLoading = document.getElementById('llm-loading-indicator');

            // Function to open the LLM output modal
            function openLlmModal(title, content) {
                llmModalTitle.textContent = title;
                llmModalBody.innerHTML = content; // Use innerHTML to render formatted text
                llmModalOverlay.classList.add('active');
            }

            // Function to close the LLM output modal
            function closeLlmModal() {
                llmModalOverlay.classList.remove('active');
                llmModalTitle.textContent = '';
                llmModalBody.innerHTML = '';
                llmModalLoading.classList.add('hidden'); // Ensure loading is hidden on close
            }

            // Event listener for closing modal
            llmModalCloseButton.addEventListener('click', closeLlmModal);
            llmModalOverlay.addEventListener('click', (event) => {
                if (event.target === llmModalOverlay) {
                    closeLlmModal();
                }
            });

            // Function to call Gemini API for LLM features (summarize/FAQ) - retained and adapted
            async function callGeminiForLlmFeature(promptText, modalTitle, isStructuredResponse = false) {
                openLlmModal(modalTitle, ''); // Open modal with title, empty body
                llmModalLoading.classList.remove('hidden'); // Show loading indicator

                try {
                    let payload = { contents: [{ role: "user", parts: [{ text: promptText }] }] };
                    const apiKey = ""; // Canvas will automatically provide this at runtime
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                    if (isStructuredResponse) {
                        payload.generationConfig = {
                            responseMimeType: "application/json",
                            responseSchema: {
                                type: "ARRAY",
                                items: {
                                    type: "OBJECT",
                                    properties: {
                                        "question": { "type": "STRING" },
                                        "answer": { "type": "STRING" }
                                    },
                                    "propertyOrdering": ["question", "answer"]
                                }
                            }
                        };
                    }

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                                    //intelligent health search logic
                                    // This script assumes the 'healthConditions' array is available globally,
                // likely loaded from the 'chatbot.js' file.

                /**
                 * Performs an intelligent search for health conditions based on symptoms.
                 * Prioritizes conditions where symptoms are defining, suggests multiple,
                 * and identifies when a search is too broad.
                 * @param {string} query The user's search query (e.g., "dizziness and headache").
                 * @returns {object} An object containing matching conditions and/or clarifying questions.
                 */
                function searchHealthConditions(query) {
                    // Convert the query to lowercase for case-insensitive matching
                    const lowerCaseQuery = query.toLowerCase();
                    // Split the query into individual symptoms or keywords using various delimiters
                    // Filter out any empty strings that might result from splitting
                    const querySymptoms = lowerCaseQuery.split(/\s*and\s*|\s*,\s*|\s+/).filter(s => s.trim() !== '');

                    let relevantConditions = [];

                    // Step 1: Score each health condition based on how well it matches the query
                    healthConditions.forEach(condition => {
                        let score = 0;
                        let matchedKeywords = [];
                        let matchedSymptoms = [];

                        // Check for matches within the condition's 'keywords' (general terms)
                        // Ensure condition.keywords is a RegExp object before attempting to test
                        if (condition.keywords instanceof RegExp && condition.keywords.test(lowerCaseQuery)) {
                            score += 5; // Assign a base score for a general keyword match
                            // Extract the specific parts of the query that matched the keywords regex
                            const keywordMatches = lowerCaseQuery.match(new RegExp(condition.keywords.source, 'g'));
                            if (keywordMatches) {
                                // Add unique matched keywords to the list for feedback
                                matchedKeywords = [...new Set(matchedKeywords.concat(keywordMatches.filter(m => typeof m === 'string' && m.length > 2)))];
                            }
                        }

                        // Check for more specific matches within the condition's 'symptoms' description
                        if (condition.symptoms) {
                            const lowerCaseConditionSymptoms = condition.symptoms.toLowerCase();
                            // Iterate through each symptom provided in the user's query
                            querySymptoms.forEach(qSymptom => {
                                // If a query symptom is found directly in the condition's symptoms
                                if (lowerCaseConditionSymptoms.includes(qSymptom)) {
                                    score += 10; // Assign a higher score for a direct symptom match
                                    matchedSymptoms.push(qSymptom); // Record the matched symptom
                                }
                            });
                        }

                        // If the condition has any score, it's relevant enough to consider
                        if (score > 0) {
                            relevantConditions.push({
                                condition: condition,
                                score: score,
                                matchedKeywords: matchedKeywords,
                                matchedSymptoms: matchedSymptoms
                            });
                        }
                    });

                    // Sort the relevant conditions by their score in descending order
                    relevantConditions.sort((a, b) => b.score - a.score);

                    // Step 2: Determine the appropriate response based on the search results
                    if (relevantConditions.length === 0) {
                        // No conditions matched the query
                        return {
                            status: "no_match",
                            message: "I couldn't find any health conditions matching your query. Please try rephrasing or providing more details."
                        };
                    } else if (relevantConditions.length === 1) {
                        // Only one condition was found, provide its details directly
                        const topMatch = relevantConditions[0].condition;
                        return {
                            status: "single_match",
                            condition: topMatch,
                            message: `Based on your symptoms, you might be looking for ${topMatch.name}.`
                        };
                    } else {
                        // Multiple relevant conditions were found
                        const topScore = relevantConditions[0].score;
                        // Filter to get all conditions that share the highest score
                        const topMatches = relevantConditions.filter(rc => rc.score === topScore);

                        if (topMatches.length > 1) {
                            // If multiple conditions have the same top score, suggest all and ask for clarification
                            const conditionNames = topMatches.map(m => m.condition.name).join(", ");
                            // Collect all unique matched symptoms from the top matches to suggest for clarification
                            const commonSymptoms = [...new Set(topMatches.flatMap(m => m.matchedSymptoms))].join(", ");

                            let clarifyingQuestions = [];
                            // If the original query was very broad (e.g., just one symptom like "dizziness")
                            if (querySymptoms.length <= 1 && commonSymptoms.length > 0) {
                                clarifyingQuestions.push(`Your query "${query}" is a common symptom for several conditions. To help me narrow down, could you tell me more about other symptoms you are experiencing, such as: ${commonSymptoms}?`);
                            } else {
                                // If the query had multiple symptoms but still resulted in multiple top matches
                                clarifyingQuestions.push("To help me narrow down the results, could you provide more specific symptoms or details?");
                            }

                            return {
                                status: "multiple_matches",
                                message: `Your symptoms might be related to several conditions, including: ${conditionNames}.`,
                                suggestions: topMatches.map(m => ({
                                    name: m.condition.name,
                                    definition: m.condition.definition,
                                    symptoms: m.condition.symptoms,
                                    recommendedProducts: m.condition.recommendedProducts
                                })),
                                clarifyingQuestions: clarifyingQuestions
                            };
                        } else {
                            // One clear top match, but other relevant conditions exist with lower scores
                            const topMatch = relevantConditions[0].condition;
                            const otherRelevant = relevantConditions.slice(1).map(rc => rc.condition.name);
                            return {
                                status: "single_strong_match_with_others",
                                condition: topMatch,
                                message: `The most likely condition based on your symptoms is ${topMatch.name}. Other possibilities include: ${otherRelevant.join(", ")}.`,
                                suggestions: relevantConditions.map(m => ({
                                    name: m.condition.name,
                                    definition: m.condition.definition,
                                    symptoms: m.condition.symptoms,
                                    recommendedProducts: m.condition.recommendedProducts
                                }))
                            };
                        }
                    }
                }

                // --- Example Usage (for demonstration purposes - uncomment to test) ---

                // // Example 1: Specific query for Hypertension
                // const result1 = searchHealthConditions("severe headaches and dizziness");
                // console.log("Result 1:", result1);

                // // Example 2: Broad query for a common symptom like "fatigue" (Anemia, Depression, Arthritis could match)
                // const result2 = searchHealthConditions("fatigue");
                // console.log("Result 2:", result2);

                // // Example 3: Query for a symptom common to multiple top-scoring conditions (e.g., "stomach pain")
                // const result3 = searchHealthConditions("stomach pain"); // Typhoid Fever, Hypertension could have stomach pain
                // console.log("Result 3:", result3);

                // // Example 4: No match found
                // const result4 = searchHealthConditions("purple spots and green hair");
                // console.log("Result 4:", result4);

                // // Example 5: Query for Depression
                // const result5 = searchHealthConditions("persistent sadness and loss of interest");
                // console.log("Result 5:", result5);

                // // Example 6: Query for Arthritis
                // const result6 = searchHealthConditions("joint pain and morning stiffness");
                // console.log("Result 6:", result6);

                // // Example 7: Query for Typhoid Fever
                // const result7 = searchHealthConditions("high fever and rose spots");
                // console.log("Result 7:", result7);


                    if (!response.ok) {
                        const errorBody = await response.text();
                        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
                    }

                    const result = await response.json();
                    llmModalLoading.classList.add('hidden'); // Hide loading indicator

                    if (result.candidates && result.candidates.length > 0 &&
                        result.candidates[0].content && result.candidates[0].content.parts &&
                        result.candidates[0].content.parts.length > 0) {
                        let content = result.candidates[0].content.parts[0].text;

                        if (isStructuredResponse) {
                            try {
                                const parsedJson = JSON.parse(content);
                                let formattedContent = '';
                                if (Array.isArray(parsedJson)) {
                                    parsedJson.forEach(item => {
                                        if (item.question && item.answer) {
                                            formattedContent += `<p class="font-semibold text-lg mt-4 mb-2">${item.question}</p><p>${item.answer}</p>`;
                                        }
                                    });
                                }
                                llmModalBody.innerHTML = formattedContent || '<p>No structured content available.</p>';
                            } catch (jsonError) {
                                llmModalBody.innerHTML = `<p class="text-red-500">Error parsing structured response: ${jsonError.message}</p><p>Raw response: ${content}</p>`;
                                console.error('Error parsing JSON from Gemini API:', jsonError);
                            }
                        } else {
                            llmModalBody.innerHTML = content.replace(/\n/g, '<br>'); // Render newlines as <br>
                        }
                    } else {
                        llmModalBody.innerHTML = '<p class="text-red-500">Sorry, I could not generate content. The AI provided an empty or malformed response. 🤔</p>';
                        console.error('Gemini API response structure unexpected or empty:', result);
                    }
                } catch (error) {
                    llmModalLoading.classList.add('hidden'); // Hide loading indicator
                    llmModalBody.innerHTML = `<p class="text-red-500">Error communicating with the AI: ${error.message}. Please try again later. 🚧</p>`;
                    console.error('Error calling Gemini API for LLM feature:', error);
                }
            }
        })();


function handleUserInput(input) {
    const userInput = input.toLowerCase();

    // Check for product keyword suggestions
    let suggestionMessage = getSuggestions(userInput, products);
    if (!suggestionMessage) {
        // Check for health condition keyword suggestions
        suggestionMessage = getSuggestions(userInput, healthConditions);
    }

    if (suggestionMessage) {
        appendBotMessage(suggestionMessage);
        return;
    }

    // Continue with normal chatbot logic if no suggestion found
    // Example placeholder:
    // processUserInput(userInput);
}

// === SMART ENHANCEMENT BLOCK ===
// === CSS Styling for Smart Suggestion Tags ===
const style = document.createElement('style');
style.innerHTML = `
.suggestion-tag {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  padding: 6px 12px;
  margin: 4px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  display: inline-block;
  transition: background-color 0.2s ease;
}
.suggestion-tag:hover {
  background-color: #ddd;
}
.autocomplete-suggestions {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  z-index: 999;
}
.suggestion-option {
  padding: 8px;
  cursor: pointer;
}
.suggestion-option:hover {
  background-color: #f0f0f0;
}`;
document.head.appendChild(style);


// === Autocomplete Suggestions and Smart Tags ===
function getSuggestions(input, list, matchKey = 'keywords') {
  const matches = list.filter(item => input.match(item[matchKey]));
  if (matches.length > 1) {
    const suggestionTags = matches.map(item => 
      `<button class="suggestion-tag" onclick="handleSuggestionClick('${item.name}')">${item.name}</button>`
    ).join(" ");
    return `🔍 Did you mean:<br>${suggestionTags}`;
  }
  return null;
}

function handleSuggestionClick(suggestion) {
  document.getElementById('chat-input').value = suggestion;
  handleUserInput(suggestion);
}

function selectAutocomplete(name) {
  document.getElementById('chat-input').value = name;
  document.getElementById('autocomplete-suggestions').innerHTML = '';
  handleUserInput(name);
}

// === Handle User Input Function ===
async function handleUserInput(userInput) {
  if (!userInput) return;
  const chatBox = document.getElementById("chat-box");

  // Display user message
  const userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.innerText = userInput;
  chatBox.appendChild(userMessage);

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  // Search for matches
  const matchProduct = products.find(p => userInput.match(p.keywords));
  const matchCondition = healthConditions.find(h => userInput.match(h.keywords));
  const suggestions = getSuggestions(userInput, products.concat(healthConditions));

  if (matchProduct || matchCondition) {
    const matchedItem = matchProduct || matchCondition;
    displayDetailedInfo(matchProduct ? 'product' : 'condition', matchedItem.name);
  } else if (suggestions) {
    sendBotMessageWithTyping(suggestions);
  } else {
    sendBotMessageWithTyping("😕 Sorry, I couldn't find anything related. Please try another keyword.");
  }
}

// === Event Listeners for Input and Send Button ===
document.getElementById("chat-input").addEventListener("input", function (e) {
  const input = e.target.value.toLowerCase();
  const allNames = [...products.map(p => p.name), ...healthConditions.map(h => h.name)];
  const matches = allNames.filter(name => name.toLowerCase().includes(input)).slice(0, 5);

  let suggestionBox = document.getElementById("autocomplete-suggestions");
  if (!suggestionBox) {
    suggestionBox = document.createElement("div");
    suggestionBox.id = "autocomplete-suggestions";
    suggestionBox.className = "autocomplete-suggestions";
    e.target.parentNode.appendChild(suggestionBox);
  }
  suggestionBox.innerHTML = matches.map(name => 
    `<div class="suggestion-option" onclick="selectAutocomplete('${name}')">${name}</div>`
  ).join('');
});

document.getElementById("send-button").addEventListener("click", function () {
  const input = document.getElementById("chat-input").value;
  handleUserInput(input);
});

// --- Start of Chatbot Logic ---

// === DOM Elements ===
const chatbotWindow = document.getElementById('chatbot-window');
const openChatbotBtn = document.getElementById('open-chatbot-btn');
const closeChatbotBtn = document.getElementById('close-chatbot-btn'); // Assuming you have a close button inside the chatbot header
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');
const llmModal = document.getElementById('llm-modal'); // Assuming you have a modal for LLM responses
const llmModalCloseBtn = document.getElementById('llm-modal-close-btn');
const llmModalBody = document.getElementById('llm-modal-body');
const llmModalLoading = document.getElementById('llm-modal-loading');


// === Event Listeners ===
if (openChatbotBtn) {
    openChatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.add('open');
        openChatbotBtn.classList.add('hidden'); // Hide the open button when chatbot is open
        // Optional: Focus on the input field when chatbot opens
        setTimeout(() => chatbotInput.focus(), 300);
        console.log("Chatbot opened.");
    });
} else {
    console.error("open-chatbot-btn not found!");
}


if (closeChatbotBtn) {
    closeChatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.remove('open');
        openChatbotBtn.classList.remove('hidden'); // Show the open button when chatbot is closed
        console.log("Chatbot closed.");
    });
} else {
    console.error("close-chatbot-btn not found!");
}

// ... (rest of your chatbot.js code, like sendMessage, addMessage, etc.)
