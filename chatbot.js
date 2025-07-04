 (function() {
            // --- Start of Chatbot Logic ---

            // === Constants ===
            const WHATSAPP_BUSINESS_LINK = "https://wa.me/message/WNGLZNUXKXXIF1";
            const API_KEY = ""; // Gemini API Key (leave empty for Canvas runtime)
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

            // === Products Data (separated) ===
            const products = [
               {
      name: "Reishi",
      keywords: /reishi|lingzhi|ganoderma/i,
      image: "https://via.placeholder.com/150/0000FF/808080?text=Reishi",
      description: "Immune-boosting and anti-fatigue properties.",
      price: "₦35,000",
      buyNowLink: "https://www.jumia.com.ng/kedi-reishi-capsule-immune-booster-jumia-health-111162791.html",
      blogLink: "https://blog.example.com/reishi-benefits",
      qna: [
        { question: "How often should I take Reishi?", answer: "Typically, Reishi is taken once or twice daily, but always refer to the product packaging for precise dosage instructions or consult a healthcare professional." },
        { question: "Is Reishi good for liver health?", answer: "Yes, Reishi is well-known for its hepatoprotective properties and can support liver function." }
      ]
    },
    {
      name: "Re-Vive",
      keywords: /re-vive|revive|sexual health male/i,
      image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Re-Vive",
      description: "Supports male sexual health and vitality.",
      price: "₦39,000",
      buyNowLink: "https://www.jumia.com.ng/kedi-healthcare-kedi-revive-capsules-x-10-3-packs-99885856.html",
      blogLink: "https://blog.example.com/re-vive-for-vitality",
      qna: [
        { question: "What are the main benefits of Re-Vive?", answer: "Re-Vive primarily enhances male sexual function, increases libido, and improves overall vitality." },
        { question: "Are there any side effects?", answer: "Generally, Re-Vive is well-tolerated. For specific concerns, it's best to consult your doctor." }
      ]
    },
    {
      name: "Cordy Active",
      keywords: /cordy active|stamina|athletic performance|respiratory health/i,
      image: "https://via.placeholder.com/150/008000/FFFFFF?text=CordyActive",
      description: "Enhances stamina, athletic performance, and respiratory health.",
      price: "₦25,000",
      buyNowLink: "https://www.jumia.com.ng/kedi-healthcare-cordy-active-natural-formula-for-stamina-and-vitality-big-99885871.html",
      blogLink: "https://blog.example.com/cordy-active-stamina",
      qna: []
    },
    {
      name: "Cordy Royal Jelly",
      keywords: /cordy royal jelly|cordyceps|royal jelly/i,
      image: "https://via.placeholder.com/150/FFFF00/000000?text=CordyRoyal",
      description: "Comprehensive health benefits, combining Cordyceps and Royal Jelly.",
      price: "₦39,999",
      buyNowLink: "https://www.konga.com/product/kedi-cordy-royal-jelly-2432655",
      blogLink: "https://blog.example.com/cordy-royal-jelly-health",
      qna: []
    },
    {
      name: "Diawell",
      keywords: /diawell|diabetes|blood sugar/i,
      image: "https://via.placeholder.com/150/00FFFF/000000?text=Diawell",
      description: "Helps manage blood sugar levels and supports pancreatic health.",
      price: "₦33,600",
      buyNowLink: "https://www.konga.com/product/kedi-diawell-capsule-manages-blood-sugar-level-3972620",
      blogLink: "https://blog.example.com/diawell-diabetes-support",
      qna: [
        { question: "Can Diawell replace my diabetes medication?", answer: "No, Diawell is a supplement and should not replace prescribed diabetes medication. Always consult your doctor before making any changes to your medication." }
      ]
    },
    {
      name: "Golden Six",
      keywords: /golden six|hormonal balance|kidney liver/i,
      image: "https://via.placeholder.com/150/FF8000/FFFFFF?text=GoldenSix",
      description: "Supports hormonal balance, strengthens the kidney and liver, anti-aging.",
      price: "₦30,000",
      buyNowLink: "https://www.konga.com/product/kedi-golden-six-capsules-30s-for-yin-yang-balance-3972621",
      blogLink: "https://blog.example.com/golden-six-hormonal-balance",
      qna: []
    },
    {
      name: "Cello Q10",
      keywords: /cello q10|cardiovascular|heart health/i,
      image: "https://via.placeholder.com/150/800080/FFFFFF?text=CelloQ10",
      description: "Supports cardiovascular health and energy production at cellular level.",
      price: "₦45,000",
      buyNowLink: "#",
      blogLink: "https://blog.example.com/cello-q10-heart-health",
      qna: []
    },
    {
      name: "Lycovite",
      keywords: /lycovite|prostate health|antioxidant/i,
      image: "https://via.placeholder.com/150/FFC0CB/000000?text=Lycovite",
      description: "Beneficial for prostate health and antioxidant support.",
      price: "₦38,500",
      buyNowLink: "https://www.konga.com/product/kedi-i-revive-last-long-in-bed-strong-erection-bo-5645543",
      blogLink: "https://blog.example.com/lycovite-prostate-care",
      qna: []
    },
    {
      name: "Magilim",
      keywords: /magilim|weight management|fat burning/i,
      image: "https://via.placeholder.com/150/00FF00/000000?text=Magilim",
      description: "Aids in weight management by promoting satiety and fat burning.",
      price: "₦30,000",
      buyNowLink: "https://www.konga.com/product/kedi-magilim-natural-weight-management-digestive-3972625",
      blogLink: "https://blog.example.com/magilim-weight-loss",
      qna: []
    },
    {
      name: "Golden Hypha",
      keywords: /golden hypha|immune booster|anti-cancer|anti-tumor/i,
      image: "https://via.placeholder.com/150/C0C0C0/000000?text=GoldenHypha",
      description: "Powerful immune system booster and anti-cancer properties.",
      price: "₦52,000",
      buyNowLink: "https://www.jumia.com.ng/kedi-healthcare-golden-hypha-capsule-90s-99885859.html",
      blogLink: "https://blog.example.com/golden-hypha-immunity",
      qna: []
    },
    {
      name: "Gum Care Toothpaste",
      keywords: /gum care toothpaste|oral hygiene|toothache|dental pain/i,
      image: "https://via.placeholder.com/150/A0A0A0/FFFFFF?text=GumCare",
      description: "Promotes oral hygiene, strengthens gums, and freshens breath.",
      price: "₦6,999",
      buyNowLink: "#",
      blogLink: "https://blog.example.com/gum-care-toothpaste",
      qna: []
    },
    {
      name: "Reishi (Blood Tonic)",
      keywords: /reishi|reishi blood tonic|blood health|anemia|iron deficiency/i,
      image: "https://via.placeholder.com/150/000080/FFFFFF?text=Reishi",
      description: "Supports blood health, liver function, and overall well-being.",
      price: "₦28,000",
      buyNowLink: "https://www.jumia.com.ng/kedi-healthcare-reishi-blood-tonic-blood-purifier-iron-supplement-99885857.html",
      blogLink: "https://blog.example.com/reishi-blood-tonic",
      qna: []
    },
    {
      name: "Jointeez",
      keywords: /jointeez|joint pain|arthritis|rheumatic/i,
      image: "https://via.placeholder.com/150/808000/FFFFFF?text=Jointeez",
      description: "Relieves muscular, joint, and waist pain; supports bone health.",
      price: "₦18,000",
      buyNowLink: "https://www.jumia.com.ng/kedi-healthcare-jointeez-capsule-eliminates-muscular-joint-and-waist-pain-99885858.html",
      blogLink: "https://blog.example.com/jointeez-joint-pain",
      qna: []
    },
    {
      name: "Refresh Tea",
      keywords: /refresh tea|detox|vision|throat/i,
      image: "https://via.placeholder.com/150/FFD700/000000?text=RefreshTea",
      description: "Clears the throat, improves vision, and detoxifies.",
      price: "₦20,000",
      buyNowLink: "https://www.jumia.com.ng/kedi-healthcare-refresh-tea-clears-the-throat-and-improves-vision-20-bags-99885873.html",
      blogLink: "https://blog.example.com/refresh-tea-detox",
      qna: []
    },
    {
      name: "Memory 24/7 Capsule",
      keywords: /memory 24\/7|brain functionality|memory|concentration/i,
      image: "https://via.placeholder.com/150/4B0082/FFFFFF?text=Memory24/7",
      description: "Enhances brain functionality, memory, and concentration.",
      price: "₦36,000",
      buyNowLink: "https://www.jumia.com.ng/kedi-healthcare-memory-247-capsule-secret-of-brain-functionality-99885860.html",
      blogLink: "https://blog.example.com/memory-24-7-brain-health",
      qna: []
    },
    {
      name: "Eye Beta Capsule",
      keywords: /eye beta|vision|eye fatigue/i,
      image: "https://via.placeholder.com/150/8A2BE2/FFFFFF?text=EyeBeta",
      description: "Promotes healthy vision and relieves eye fatigue.",
      price: "₦30,000",
      buyNowLink: "https://www.konga.com/product/kedi-eye-beta-capsule-30-capsules-4375080",
      blogLink: "https://blog.example.com/eye-beta-vision-support",
      qna: []
    },
    {
      name: "Gastrifort Capsule",
      keywords: /gastrifort|stomach health|digestion|ulcers/i,
      image: "https://via.placeholder.com/150/DC143C/FFFFFF?text=Gastrifort",
      description: "Premium tonic for stomach health, digestion, and ulcers.",
      price: "₦35,000",
      buyNowLink: "https://www.konga.com/product/kedi-gastrifort-capsule-90-capsules-premium-toni-3972624",
      blogLink: "https://blog.example.com/gastrifort-stomach-health",
      qna: []
    },
    {
      name: "Constilease",
      keywords: /constilease|constipation|digestive regularity/i,
      image: "https://via.placeholder.com/150/964B00/FFFFFF?text=Constilease",
      description: "Herbal solution for chronic constipation and digestive regularity.",
      price: "₦25,000",
      buyNowLink: "https://www.konga.com/product/kedi-constilease-herbal-solution-for-constipation-3972623",
      blogLink: "https://blog.example.com/constilease-digestion",
      qna: []
    },
    {
      name: "Vigor Essential",
      keywords: /vigor essential|energy|stamina|male vitality/i,
      image: "https://via.placeholder.com/150/FF4500/FFFFFF?text=VigorEssential",
      description: "Herbal supplement for energy, stamina, and male vitality.",
      price: "₦24,000",
      buyNowLink: "https://www.konga.com/product/kedi-vigor-essential-herbal-supplement-for-energy-3972626",
      blogLink: "https://blog.example.com/vigor-essential-male-health",
      qna: []
    },
    {
      name: "Gynapharm Capsule",
      keywords: /gynapharm|female reproductive health|hormonal balance|pid|ovarian cysts/i,
      image: "https://via.placeholder.com/150/FF69B4/000000?text=Gynapharm",
      description: "Supports female reproductive health and hormonal balance.",
      price: "₦28,000",
      buyNowLink: "#",
      blogLink: "https://blog.example.com/gynapharm-female-health",
      qna: []
    },
    {
      name: "Qinghao",
      keywords: /qinghao|artemisia|malaria support/i,
      image: "https://via.placeholder.com/150/00BFFF/FFFFFF?text=Qinghao",
      description: "A traditional herbal supplement often associated with supporting the body's response to fever and general well-being. *Note: Not a cure for malaria; always consult a doctor.*",
      price: "₦22,000",
      buyNowLink: "#", // Placeholder link
      blogLink: "#", // Placeholder link
      qna: []
    }
       
            ];

            // === Health Conditions Data (separated) ===
            const healthConditions = [
                {
                    name: "Malaria",
                    keywords: /malaria|fever|chills|headache|vomiting/i,
                    definition: "Malaria is a serious and sometimes fatal disease caused by a parasite that commonly infects a certain type of mosquito which feeds on humans. It is characterized by recurrent attacks of chills and fever.",
                    symptoms: "Fever, chills, headache, muscle aches, fatigue, nausea, vomiting, diarrhea. Can be severe.",
                    dosage: [
                        "Requires antimalarial drugs prescribed by a doctor (e.g., Artemether-Lumefantrine, Arthesunate).",
                        "Complete the full course of medication.",
                        "Rest and stay hydrated.",
                        "Seek immediate medical attention if symptoms worsen."
                    ],
                    recommendedProducts: ["Qinghao"], // Added Qinghao here
                    qna: [
                        { question: "How is Malaria transmitted?", answer: "Malaria is transmitted through the bite of infected female Anopheles mosquitoes." },
                        { question: "Can Malaria be prevented?", answer: "Yes, prevention methods include using insecticide-treated bed nets, insect repellents, and prophylactic medications." }
                    ]
                },
                                {
                    name: "Diabetes",
                    keywords: /diabetes|blood sugar|high sugar/i,
                    symptoms: "Frequent urination, increased thirst, increased hunger, unexplained weight loss, fatigue, blurred vision, slow-healing sores.",
                    dosage: [
                        "Medical management with insulin or oral medications as prescribed by a doctor.",
                        "Dietary changes: balanced meals, controlled carbohydrate intake.",
                        "Regular exercise.",
                        "Blood sugar monitoring.",
                        "Regular check-ups with a healthcare professional."
                    ],
                    recommendedProducts: ["Blood Fat Reducing", "Golden Six"], // Example Kedi products for support
                    qna: [
                        { question: "What are the types of Diabetes?", answer: "The main types are Type 1 (autoimmune, insulin-dependent) and Type 2 (insulin resistance, often lifestyle-related)." },
                        { question: "Is Diabetes curable?", answer: "Type 1 is not curable but manageable. Type 2 can sometimes be put into remission with significant lifestyle changes." }
                    ]
                },
                {
                    name: "Hypertension",
                    keywords: /hypertension|high blood pressure|blood|eje riru|eje ruru/i,
                    symptoms: "Often no symptoms, but can include headache, shortness of breath, nosebleeds in severe cases.",
                    dosage: [
                        "Medication as prescribed by a doctor.",
                        "Lifestyle changes: healthy diet (low sodium), regular exercise, stress management, limiting alcohol.",
                        "Regular blood pressure monitoring."
                    ],
                    recommendedProducts: ["Blood Fat Reducing", "Golden Six"], // Example Kedi products for support
                    qna: [
                        { question: "What causes Hypertension?", answer: "Causes can include genetics, age, obesity, high sodium intake, lack of exercise, smoking, and stress." },
                        { question: "How can I lower my blood pressure naturally?", answer: "Lifestyle changes like a healthy diet, regular exercise, maintaining a healthy weight, and reducing stress can help." }
                    ]
                },
                {
                    name: "Arthritis",
                    keywords: /arthritis|joint pain|inflammation/i,
                    symptoms: "Joint pain, stiffness, swelling, redness, decreased range of motion.",
                    dosage: [
                        "Medication (pain relievers, anti-inflammatories) as prescribed by a doctor.",
                        "Physical therapy.",
                        "Exercise (low-impact).",
                        "Heat and cold therapy.",
                        "Weight management."
                    ],
                    recommendedProducts: ["Golden Six"], // Example Kedi products for support
                    qna: [
                        { question: "What are the common types of Arthritis?", answer: "Osteoarthritis (wear-and-tear) and Rheumatoid Arthritis (autoimmune) are common types." },
                        { question: "Can diet affect Arthritis?", answer: "Yes, an anti-inflammatory diet rich in fruits, vegetables, and omega-3 fatty acids can help manage symptoms." }
                    ]
                },
                {
      name: "Typhoid Fever",
      keywords: /typhoid|enteric fever|typhus/i,
      symptoms: "Sustained high fever (up to 104°F/40°C), weakness, stomach pain, headache, loss of appetite, rash (rose spots).",
      dosage: [
        "Requires antibiotics prescribed by a doctor (e.g., Ciprofloxacin, Azithromycin, Ceftriaxone).",
        "It is crucial to complete the entire course of antibiotics to prevent relapse and resistance.",
        "Maintain good hydration by drinking plenty of fluids.",
        "Eat small, frequent, and easily digestible meals.",
        "Practice strict hygiene to prevent spread (wash hands frequently).",
        "Follow up with your doctor for monitoring and recovery."
      ],
      recommendedProducts: [],
      qna: [
        { question: "Is Typhoid contagious?", answer: "Yes, Typhoid fever is highly contagious and spreads through contaminated food and water." },
        { question: "How long does Typhoid last?", answer: "Without treatment, symptoms can last for weeks or even months. With proper treatment, recovery can be quicker." }
      ]
    },
    {
      name: "Headache/Migraine",
      keywords: /headache|migraine|tension headache|cluster headache/i,
      symptoms: "Pain in the head, throbbing sensation, sensitivity to light/sound.",
      dosage: ["Rest and hydration are recommended. If persistent, consult your physician."],
      recommendedProducts: [],
      qna: []
    },
    {
      name: "Fever",
      keywords: /fever|temperature|high temperature/i,
      symptoms: "Elevated body temperature, indicating an infection.",
      dosage: ["Rest, fluids, and fever-reducing medication can help. If persistent or very high, seek medical advice."],
      recommendedProducts: [],
      qna: []
    },
    {
      name: "Hepatitis",
      keywords: /hepatitis|i have hepatitis|what can i use for my hepatitis|liver inflammation|hepatitis b|hepatitis c/i,
      symptoms: "Liver inflammation, fatigue, jaundice.",
      dosage: ["Reishi is recommended to nourish the liver and support overall health. Consult a healthcare professional for specific treatment."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Tuberculosis (TB)",
      keywords: /tuberculosis|tb infection/i,
      symptoms: "Chronic cough, fever, night sweats, weight loss.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Cough",
      keywords: /cough|dry cough|wet cough/i,
      symptoms: "A sudden expulsion of air from the lungs.",
      dosage: ["Consider using Reishi to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Flu",
      keywords: /flu|influenza/i,
      symptoms: "Fever, body aches, fatigue, respiratory symptoms.",
      dosage: ["Consider using Reishi to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Cold",
      keywords: /cold|common cold/i,
      symptoms: "Runny nose, sore throat, sneezing, mild fatigue.",
      dosage: ["Consider using Reishi to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Allergies",
      keywords: /allergies|allergic reaction|hay fever/i,
      symptoms: "Sneezing, itching, rashes, congestion.",
      dosage: ["Consider using Reishi to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Sinusitis",
      keywords: /sinusitis|sinus infection/i,
      symptoms: "Facial pain/pressure, nasal congestion, headache.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Pneumonia",
      keywords: /pneumonia|lung infection/i,
      symptoms: "Cough, fever, difficulty breathing, chest pain.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Diarrhea",
      keywords: /diarrhea|loose stools/i,
      symptoms: "Frequent loose, watery bowel movements.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Constipation",
      keywords: /constipation|difficulty passing stools/i,
      symptoms: "Infrequent or difficult bowel movements.",
      dosage: ["Consider using Constilease to support digestive health. Ensure adequate fiber and fluid intake."],
      recommendedProducts: ["Constilease"],
      qna: []
    },
    {
      name: "Digestive Health",
      keywords: /digestive health|gut health/i,
      symptoms: "General discomfort, bloating, irregular bowel movements.",
      dosage: ["Gastrifort Capsule is beneficial for supporting overall digestive function."],
      recommendedProducts: ["Gastrifort Capsule"],
      qna: []
    },
    {
      name: "Blood Sugar Management",
      keywords: /blood sugar management|glucose control/i,
      symptoms: "Fluctuations in blood sugar levels.",
      dosage: ["Consider using Diawell to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Diawell"],
      qna: []
    },
    {
      name: "Blood Pressure Management",
      keywords: /blood pressure management|hypertension management/i,
      symptoms: "High or low blood pressure.",
      dosage: ["Consider using Cello Q10 and Reishi to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Cello Q10", "Reishi"],
      qna: []
    },
    {
      name: "Heart Disease",
      keywords: /heart disease|cardiac issues/i,
      symptoms: "Chest pain, shortness of breath, fatigue.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Cello Q10 and Reishi can support overall health."],
      recommendedProducts: ["Cello Q10", "Reishi"],
      qna: []
    },
    {
      name: "Cardiovascular Health",
      keywords: /cardiovascular health|heart health/i,
      symptoms: "General concern for heart and blood vessel well-being.",
      dosage: ["Consider using Cello Q10 and Reishi to support overall heart function."],
      recommendedProducts: ["Cello Q10", "Reishi"],
      qna: []
    },
    {
      name: "Cholesterol Management",
      keywords: /cholesterol|high cholesterol/i,
      symptoms: "High levels of harmful cholesterol in blood.",
      dosage: ["Consider using Reishi and Magilim to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi", "Magilim"],
      qna: []
    },
    {
      name: "Stroke",
      keywords: /stroke|cerebrovascular accident/i,
      symptoms: "Sudden weakness or numbness, difficulty speaking, vision problems.",
      dosage: ["For stroke recovery, please consult a healthcare professional for appropriate treatment. Reishi and Memory 24/7 Capsule can support overall health."],
      recommendedProducts: ["Reishi", "Memory 24/7 Capsule"],
      qna: []
    },
    {
      name: "Cancer",
      keywords: /cancer|malignancy|oncology/i,
      symptoms: "Uncontrolled growth of abnormal cells.",
      dosage: ["For cancer treatment, please consult a healthcare professional for appropriate care. Golden Hypha and Reishi can support overall health."],
      recommendedProducts: ["Golden Hypha", "Reishi"],
      qna: []
    },
    {
      name: "Tumor",
      keywords: /tumor|neoplasm|mass/i,
      symptoms: "Abnormal growth of tissue.",
      dosage: ["For tumor treatment, please consult a healthcare professional for appropriate care. Golden Hypha and Reishi can support overall health."],
      recommendedProducts: ["Golden Hypha", "Reishi"],
      qna: []
    },
    {
      name: "Anemia",
      keywords: /anemia|low blood count/i,
      symptoms: "Fatigue, weakness, pale skin, shortness of breath.",
      dosage: ["Consider using Reishi (Blood Tonic) to support blood health and overall well-being."],
      recommendedProducts: ["Reishi (Blood Tonic)"],
      qna: []
    },
    {
      name: "Blood Health",
      keywords: /blood health|blood circulation|blood purification/i,
      symptoms: "General concern for blood quality and function.",
      dosage: ["Reishi (Blood Tonic) is beneficial for supporting overall blood function."],
      recommendedProducts: ["Reishi (Blood Tonic)"],
      qna: []
    },
    {
      name: "Iron Deficiency",
      keywords: /iron deficiency|low iron/i,
      symptoms: "Fatigue, weakness, brittle nails.",
      dosage: ["Consider using Reishi (Blood Tonic) to support blood health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi (Blood Tonic)"],
      qna: []
    },
    {
      name: "Blood Disorders",
      keywords: /blood disorders|blood diseases/i,
      symptoms: "Various symptoms depending on the specific disorder.",
      dosage: ["For blood disorders, please consult a healthcare professional for appropriate treatment. Reishi (Blood Tonic) can support overall health."],
      recommendedProducts: ["Reishi (Blood Tonic)"],
      qna: []
    },
    {
      name: "Immune System Boost",
      keywords: /immune system|immunity enhancement/i,
      symptoms: "Frequent illness, low resistance.",
      dosage: ["Consider using Reishi and Golden Hypha to support overall health."],
      recommendedProducts: ["Reishi", "Golden Hypha"],
      qna: []
    },
    {
      name: "Stress Relief",
      keywords: /stress|stress management/i,
      symptoms: "Tension, irritability, fatigue due to stress.",
      dosage: ["Consider using Reishi and Golden Six to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi", "Golden Six"],
      qna: []
    },
    {
      name: "Anxiety Relief",
      keywords: /anxiety|nervousness|worry/i,
      symptoms: "Excessive worry, restlessness, difficulty concentrating.",
      dosage: ["Consider using Reishi and Golden Six to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi", "Golden Six"],
      qna: []
    },
    {
      name: "Depression",
      keywords: /depression|mood disorder/i,
      symptoms: "Persistent sadness, loss of interest, low energy.",
      dosage: ["For depression, please consult a healthcare professional for appropriate treatment. Reishi and Memory 24/7 Capsule can support overall health."],
      recommendedProducts: ["Reishi", "Memory 24/7 Capsule"],
      qna: []
    },
    {
      name: "Mental Health Support",
      keywords: /mental health|cognitive well-being/i,
      symptoms: "General concern for cognitive function and emotional balance.",
      dosage: ["Consider using Reishi and Memory 24/7 Capsule to promote overall well-being."],
      recommendedProducts: ["Reishi", "Memory 24/7 Capsule"],
      qna: []
    },
    {
      name: "Sleep Disorders",
      keywords: /sleep disorders|insomnia|poor sleep/i,
      symptoms: "Difficulty falling or staying asleep, restless sleep.",
      dosage: ["Consider using Reishi and Golden Six to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi", "Golden Six"],
      qna: []
    },
    {
      name: "Insomnia",
      keywords: /insomnia|sleeplessness/i,
      symptoms: "Inability to sleep.",
      dosage: ["Consider using Reishi and Golden Six to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi", "Golden Six"],
      qna: []
    },
    {
      name: "Fatigue",
      keywords: /fatigue|tiredness|exhaustion/i,
      symptoms: "Extreme tiredness, lack of energy.",
      dosage: ["Consider using Reishi and Cordy Active to support overall health and energy levels."],
      recommendedProducts: ["Reishi", "Cordy Active"],
      qna: []
    },
    {
      name: "Low Energy",
      keywords: /low energy|lack of vitality/i,
      symptoms: "Reduced physical and mental energy.",
      dosage: ["Consider using Reishi and Cordy Active to support overall health and vitality."],
      recommendedProducts: ["Reishi", "Cordy Active"],
      qna: []
    },
    {
      name: "Chronic Fatigue",
      keywords: /chronic fatigue|cfs/i,
      symptoms: "Persistent and debilitating fatigue.",
      dosage: ["Consider using Reishi and Cordy Active to support overall health. Consult a healthcare professional for specific treatments."],
      recommendedProducts: ["Reishi", "Cordy Active"],
      qna: []
    },
    {
      name: "Ischemic Heart Disease",
      keywords: /ischemic heart disease|coronary artery disease|cad/i,
      symptoms: "Chest pain, shortness of breath, fatigue due to reduced blood flow to heart.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Cello Q10 and Reishi can support overall health."],
      recommendedProducts: ["Cello Q10", "Reishi"],
      qna: []
    },
    {
      name: "Obesity",
      keywords: /obesity|weight gain|reduce obesity/i,
      symptoms: "Excessive body fat.",
      dosage: ["Consider using Magilim to support weight loss and fat burning. Combine with diet and exercise."],
      recommendedProducts: ["Magilim"],
      qna: []
    },
    {
      name: "Gastroesophageal Reflux Disease (GERD)",
      keywords: /gastroesophageal reflux disease|acid reflux|heartburn/i,
      symptoms: "Heartburn, regurgitation, difficulty swallowing.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Gastrifort Capsule can support overall health."],
      recommendedProducts: ["Gastrifort Capsule"],
      qna: []
    },
    {
      name: "Peptic Ulcer Disease",
      keywords: /peptic ulcer disease|stomach ulcer|duodenal ulcer/i,
      symptoms: "Burning stomach pain, bloating, nausea.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Gastrifort Capsule can support overall health."],
      recommendedProducts: ["Gastrifort Capsule"],
      qna: []
    },
    {
      name: "Inflammatory Bowel Disease (IBD)",
      keywords: /inflammatory bowel disease|crohn's disease|ulcerative colitis/i,
      symptoms: "Abdominal pain, diarrhea, weight loss.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi and Gastrifort Capsule can support overall health."],
      recommendedProducts: ["Reishi", "Gastrifort Capsule"],
      qna: []
    },
    {
      name: "Chronic Kidney Disease (CKD)",
      keywords: /chronic kidney disease|kidney failure/i,
      symptoms: "Fatigue, swelling, changes in urination.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Golden Six and Reishi can support overall health."],
      recommendedProducts: ["Golden Six", "Reishi"],
      qna: []
    },
    {
      name: "Urinary Tract Infections (UTIs)",
      keywords: /urinary tract infections|bladder infection/i,
      symptoms: "Painful urination, frequent urination, urgency.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Golden Six and Reishi can support overall health."],
      recommendedProducts: ["Golden Six", "Reishi"],
      qna: []
    },
    {
      name: "Parkinson's Disease",
      keywords: /parkinson's disease|pd/i,
      symptoms: "Tremors, rigidity, bradykinesia, postural instability.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Memory 24/7 Capsule and Reishi can support overall health."],
      recommendedProducts: ["Memory 24/7 Capsule", "Reishi"],
      qna: []
    },
    {
      name: "Alzheimer's Disease",
      keywords: /alzheimer's disease|ad/i,
      symptoms: "Memory loss, cognitive decline, confusion.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Memory 24/7 Capsule and Reishi can support overall health."],
      recommendedProducts: ["Memory 24/7 Capsule", "Reishi"],
      qna: []
    },
    {
      name: "Multiple Sclerosis (MS)",
      keywords: /multiple sclerosis|ms/i,
      symptoms: "Fatigue, numbness, muscle weakness, vision problems.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Memory 24/7 Capsule and Reishi can support overall health."],
      recommendedProducts: ["Memory 24/7 Capsule", "Reishi"],
      qna: []
    },
   
    {
      name: "Psoriatic Arthritis",
      keywords: /psoriatic arthritis|psa/i,
      symptoms: "Joint pain, stiffness, swelling, often with psoriasis.",
      dosage: ["Jointeez is recommended to support joint health and relieve pain. Consult a healthcare professional for management."],
      recommendedProducts: ["Jointeez"],
      qna: []
    },
    {
      name: "Osteoarthritis",
      keywords: /osteoarthritis|oa|degenerative joint disease/i,
      symptoms: "Joint pain, stiffness, reduced flexibility.",
      dosage: ["Jointeez is recommended to support joint health and relieve pain. Consult a healthcare professional for management."],
      recommendedProducts: ["Jointeez"],
      qna: []
    },
    {
      name: "Gout",
      keywords: /gout|uric acid arthritis/i,
      symptoms: "Severe joint pain, redness, swelling, tenderness.",
      dosage: ["Please consult a healthcare professional for appropriate treatment. Reishi can support overall health."],
      recommendedProducts: ["Reishi"],
      qna: []
    },
    {
      name: "Lung Cancer",
      keywords: /lung cancer|bronchogenic carcinoma/i,
      symptoms: "Persistent cough, chest pain, shortness of breath, weight loss.",
      dosage: ["For lung cancer, please consult a healthcare professional for appropriate treatment. Golden Hypha and Reishi can support overall health."],
      recommendedProducts: ["Golden Hypha", "Reishi"],
      qna: []
    },
    {
      name: "Colorectal Cancer",
      keywords: /colorectal cancer|colon cancer|rectal cancer/i,
      symptoms: "Changes in bowel habits, rectal bleeding, abdominal discomfort.",
      dosage: ["For colorectal cancer, please consult a healthcare professional for appropriate treatment. Golden Hypha and Reishi can support overall health."],
      recommendedProducts: ["Golden Hypha", "Reishi"],
      qna: []
    },
    {
      name: "Breast Cancer",
      keywords: /breast cancer|mammary cancer/i,
      symptoms: "Lump in breast, changes in breast size/shape, nipple discharge.",
      dosage: ["For breast cancer, please consult a healthcare professional for appropriate treatment. Golden Hypha and Reishi can support overall health."],
      recommendedProducts: ["Golden Hypha", "Reishi"],
      qna: []
    },
    {
      name: "Prostate Cancer",
      keywords: /prostate cancer|prostate malignancy/i,
      symptoms: "Difficulty urinating, blood in urine/semen, bone pain.",
      dosage: ["For prostate cancer, please consult a healthcare professional for appropriate treatment. Lycovite and Reishi are beneficial for prostate health and men's wellness."],
      recommendedProducts: ["Lycovite", "Reishi"],
      qna: []
    },
    {
      name: "Lumps",
      keywords: /lumps|abnormal growth|mass|lump/i,
      symptoms: "Palpable abnormal growths on or in the body.",
      dosage: ["For lumps, please consult a healthcare professional for appropriate evaluation and treatment. Golden Hypha and Reishi can support overall health."],
      recommendedProducts: ["Golden Hypha", "Reishi"],
      qna: []
    },
    
  {
    name: "Acne",
    keywords: /acne|pimples|blackheads|skin inflammation/i,
    symptoms: "Redness, swelling, and inflammation of the skin, black and chest caused by inflammation of oil glands.",
    dosage: ["Golden Six 1*2 daily"],
    recommendedProducts: ["Wormore"],
    qna: []
  },
  {
    name: "Amoebiasis",
    keywords: /amoebiasis|gallbladder inflammation|infection|gallstone/i,
    symptoms: "Gallbladder inflammation and infection caused by a gallstone (a stone-like mass that forms in the gallbladder).",
    dosage: ["Cordy Royal Jelly 3*2 daily"],
    recommendedProducts: ["Contibetter"],
    qna: []
  },
  {
    name: "Adenoids (Adenoma)",
    keywords: /adenoids|adenoma|gland inflammation|throat growth/i,
    symptoms: "Inflammation of the adenoid gland (a tonsil-like growth located at the back of the throat).",
    dosage: ["3*2 daily"],
    recommendedProducts: ["Reishi"],
    qna: []
  },
  {
    name: "Age Spot",
    keywords: /age spot|pigmentation|melanin patch|skin discoloration/i,
    symptoms: "Coloured patch on the skin (pigmentation due to the accumulation of melanin by the sebaceous glands under the skin).",
    dosage: ["3*2 daily"],
    recommendedProducts: ["Reishi"],
    qna: []
  },
  {
    name: "Aging",
    keywords: /aging|ageing|growing old|senescence/i,
    symptoms: "Multidimensional process of physical, psychological, and social changes that occur over time.",
    dosage: ["4*2 daily"],
    recommendedProducts: ["Cordy Active"],
    qna: []
  },
  {
    name: "AIDS/HIV Positive",
    keywords: /aids|hiv|immune deficiency|hiv positive/i,
    symptoms: "Disease that kills the immune system (defender) of the body, making the body vulnerable to all kinds of diseases.",
    dosage: ["3*2 daily"],
    recommendedProducts: ["Reishi"],
    qna: []
  },
  {
    name: "Alcoholism (Effect)",
    keywords: /alcoholism|alcohol|nervous system damage|collapse/i,
    symptoms: "Damages the nervous system and organs, characterized by chronic and tendency to collapse.",
    dosage: ["4*2 daily"],
    recommendedProducts: ["Golden Hyphae"],
    qna: []
  },
  {
    name: "Allergic Dermatitis",
    keywords: /allergic dermatitis|skin allergy|dermatitis|itching|redness/i,
    symptoms: "Inflammation of the skin, caused by allergic reactions, often accompanied by itching, redness, and swelling.",
    dosage: ["3*2 daily"],
    recommendedProducts: ["Reishi"],
    qna: []
  },
  {
    name: "Allergic Rhinitis (Hay Fever)",
    keywords: /allergic rhinitis|hay fever|sneezing|runny nose|nasal allergy/i,
    symptoms: "Inflammation of the nasal mucosa, caused by allergic reactions, often accompanied by sneezing, itching, and a runny nose.",
    dosage: ["3*2 daily"],
    recommendedProducts: ["Reishi"],
    qna: []
  },
  {
    name: "Alzheimer Senility",
    keywords: /alzheimer|senility|memory loss|dementia|brain disorder/i,
    symptoms: "Progressive brain disorder that affects memory, thinking, and behavior, often leading to dementia.",
    dosage: ["3*2 daily"],
    recommendedProducts: ["Cordy Royal Jelly"],
    qna: []
  },
  {
    name: "Amoeba",
    keywords: /amoeba|protozoa|single-celled|cytoplasm projections/i,
    symptoms: "A single-celled animal such as protozoa that moves by means of temporary projections of its cytoplasm.",
    recommendedProducts: ["Reishi"],
    dosage: ["3*2 daily"],
    qna: []
  },
  {
    name: "Anemia",
    keywords: /anemia|low hemoglobin|red blood cells deficiency/i,
    symptoms: "Deficiency in the blood brought about by a decrease in the number of red blood cells or in the haemoglobin content.",
    recommendedProducts: ["Cordy Royal Jelly"],
    dosage: ["3*2 daily"],
    qna: []
  },
  {
    name: "Angina",
    keywords: /angina|heart disease|chest pain|pectoris/i,
    symptoms: "Heart disease in which the patient suffers pectoris from inadequate supply of blood to the heart.",
    recommendedProducts: ["Reishi"],
    dosage: ["3*2 daily"],
    qna: []
  },
  {
    name: "Anorexia",
    keywords: /anorexia|loss of appetite|can't eat/i,
    symptoms: "Inability to eat (loss of appetite).",
    recommendedProducts: ["Cordy Active"],
    dosage: ["4*2 daily"],
    qna: []
  },
  {
    name: "Anuria",
    keywords: /anuria|kidney failure|scanty urine/i,
    symptoms: "Failure of kidney function causing scanty urine.",
    recommendedProducts: ["Golden Six"],
    dosage: ["1*2 daily"],
    qna: []
  },
  {
    name: "Anxiety",
    keywords: /anxiety|restlessness|apprehension|uneasiness/i,
    symptoms: "Restlessness, feeling of apprehension, the source of which is not recognized.",
    recommendedProducts: ["Cordyceps"],
    dosage: ["2*2 daily"],
    qna: []
  },
  {
    name: "Arrhythmia",
    keywords: /arrhythmia|irregular heartbeat|palpitations/i,
    symptoms: "Irregular heartbeat.",
    recommendedProducts: ["Reishi"],
    dosage: ["3*2 daily"],
    qna: []
  },
  {
    name: "Arteriosclerosis",
    keywords: /arteriosclerosis|cholesterol arteries|thickened arteries|hardened arteries/i,
    symptoms: "Degeneration and hardening of the (cholesterol) arteries, thickening of arterial walls due to cholesterol deposits. It also reduces blood flow and causes elasticity.",
    recommendedProducts: ["Reishi"],
    dosage: ["3*2 daily"],
    qna: []
  },
  {
    name: "Asthma",
    keywords: /asthma|bronchial asthma|difficulty breathing|coughing|trouble breathing/i,
    symptoms: "Disease of the bronchial tubes which lead from the windpipe or trachea into lungs causing paroxysms of coughing or difficulty in breathing (technically called bronchial asthma).",
    recommendedProducts: ["Reishi"],
    dosage: ["3*2 daily"],
    qna: []
  },
  {
  name: "Atherosclerosis",
  keywords: /atherosclerosis|artery hardening|plaque buildup|cholesterol|arterial blockage|arteriosclerosis/i,
  symptoms: "A condition characterized by the buildup of plaque inside the arteries, causing them to narrow and harden, leading to poor blood circulation and increased risk of heart disease.",
  recommendedProducts: ["Reishi", "Omega-3", "Garlic Extract"],
  dosage: ["Reishi: 3×2 daily", "Omega-3: 1,000 mg twice daily", "Garlic Extract: 600–1,200 mg daily"],
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
  symptoms: "Fungal infection between the toes characterized by cracks, redness, itching, sores, pains and disabilities.",
  recommendedProducts: ["Diawell"],
  dosage: ["4*3 daily"],
  qna: []
},
{
  name: "Back Ache",
  keywords: /back ache|back pain|waist pain|spinal pain|backbone pain/i,
  symptoms: "Severe pains in the backbone, waist or back region.",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Bacteraemia",
  keywords: /bacteraemia|bacteria in blood|blood poisoning|septicemia/i,
  symptoms: "Presence of bacteria in the blood, causing blood poisoning.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Barber’s Itch",
  keywords: /barber’s itch|beard fungus|face fungal infection|itchy beard|bearded area bumps/i,
  symptoms: "Bumps, fungal infections of the bearded portions in the face, head and neck, causing inflammation of glands, burning and itching.",
  recommendedProducts: ["Golden Hyphae"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Bleeding Gums (gingivitis)",
  keywords: /bleeding gums|gingivitis|gum inflammation|swollen gums|gum pain/i,
  symptoms: "Inflammation of gums.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Blocked Fallopian Tube",
  keywords: /blocked fallopian tube|fallopian tube obstruction|fluid collection in tubes/i,
  symptoms: "Collections of fluid in the skin causing a raised area.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Blood Infection",
  keywords: /blood infection|bacterial blood infection|sepsis|septicemia/i,
  symptoms: "Infection in the blood caused by bacteria.",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Boils",
  keywords: /boils|pus-filled skin|raised skin infection|skin abscess|bacterial boils/i,
  symptoms: "Pus-filled, raised area on the skin caused by bacteria.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Breathing Difficulty",
  keywords: /breathing difficulty|dyspnoea|shortness of breath|trouble breathing|respiratory distress/i,
  symptoms: "Inability to breathe normally and painlessly, shortness of breath, also called dyspnoea.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Bronchitis",
  keywords: /bronchitis|coughing and sneezing|larynx swelling|upper respiratory tract inflammation/i,
  symptoms: "Swelling causing severe coughing and sneezing, thus affecting the larynx and the upper respiratory tract.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Bruxism",
  keywords: /bruxism|teeth grinding|night grinding|sleep bruxism|neurotic jaw clenching/i,
  symptoms: "Grinding of teeth while sleeping, sometimes a manifestation of neurosis.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Bunion",
  keywords: /bunion|great toe swelling|painful toe joint|foot bunion/i,
  symptoms: "Swelling at the first joint of the great toe. This can be very painful.",
  recommendedProducts: ["Cordy Royal Jelly"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Burns (Scalds)",
  keywords: /burns|scalds|heat exposure|chemical burn|electrical burn/i,
  symptoms: "The effect of undue exposure to heat, chemical or electrical current.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Cancer",
  keywords: /cancer|malignant tumour|uncontrolled cell growth|tumor spread|metastasis/i,
  symptoms: "Malignant tumour. Uncontrolled growth of cells that are unusually large and move into embryonic cells, then destroy the body's tissues. It can spread to other parts of the body.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Cardiovascular",
  keywords: /cardiovascular|heart problems|blood vessel issues|hardened heart|heart membrane disorder/i,
  symptoms: "Problems in the heart and blood vessels characterized by hardening of the heart and membranes.",
  recommendedProducts: ["Cordy Royal Jelly"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Cataract",
  keywords: /cataract|eye inflammation|iris inflammation|retina inflammation|clouded vision/i,
  symptoms: "Inflammation of the iris or retina in excess.",
  recommendedProducts: ["Contibetter"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Cholera",
  keywords: /cholera|acute diarrhoea|contaminated water|contaminated food|cholera infection/i,
  symptoms: "An acute diarrhoeal infection caused by consumption of contaminated food or water.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Chronic Fatigue Syndrome (Liver Disease)",
  keywords: /chronic fatigue|liver disease|fatigue syndrome|muscle pain|weakness|post-exertional malaise/i,
  symptoms: "Fatigue, weakness, muscle pain, and other symptoms that worsen with physical or mental activity.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Cirrhosis",
  keywords: /cirrhosis|liver degeneration|infectious liver disease|contagious liver illness/i,
  symptoms: "Marked by degeneration of the liver, the disease is infectious and contagious.",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Climacteric (Menopause)",
  keywords: /climacteric|menopause|hormonal changes|female transition|perimenopause|postmenopause/i,
  symptoms: "The period leading up to and after menopause, characterized by hormonal changes.",
  recommendedProducts: ["Ginseng"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Cold Sore",
  keywords: /cold sore|fever blister|herpes simplex|lip sore|oral herpes/i,
  symptoms: "Fever blisters (sore on the lips, sometimes appears when the patient has fever) caused by the herpes simplex virus.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Colitis",
  keywords: /colitis|colon inflammation|large intestine inflammation|intestinal swelling/i,
  symptoms: "Inflammation of the colon (large intestine).",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Conjunctivitis (Pink Eye)",
  keywords: /conjunctivitis|pink eye|eye redness|eye discharge|eye inflammation/i,
  symptoms: "Inflammation of the conjunctiva.",
  recommendedProducts: ["Eye Beta"],
  dosage: ["2*2 daily"],
  qna: []
},
{
  name: "Constipation",
  keywords: /constipation|bowel difficulty|irregular bowel movement|headache from constipation|digestive blockage/i,
  symptoms: "Condition in which the bowels move less often than usual and with difficulty characterized by headache.",
  recommendedProducts: ["ConstiEase"],
  dosage: ["2*2 daily"],
  qna: []
},
{
  name: "Corns",
  keywords: /corns|thickened skin|toe friction|tight shoes|foot pressure/i,
  symptoms: "Area of thickened skin on the toes. They are usually caused by friction or pressure from tight-fitting shoes.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Coronary Thrombosis",
  keywords: /coronary thrombosis|blood clots|heart clot|blocked arteries|heart failure/i,
  symptoms: "Formation of blood clots in the coronary arteries, interfering with the blood supply to the heart muscles. This can cause heart failure.",
  recommendedProducts: ["Cordy Royal Jelly"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Cystitis-Benign",
  keywords: /cystitis|benign cystitis|bladder inflammation|urinary discomfort/i,
  symptoms: "Inflammation of the bladder.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Debility (General)",
  keywords: /debility|general weakness|body fatigue|low energy/i,
  symptoms: "General weakness of the body.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Dehydration",
  keywords: /dehydration|water loss|fluid depletion|dry body|lack of hydration/i,
  symptoms: "Loss or removal of water from the body.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Dementia (Mental Blockage)",
  keywords: /dementia|mental blockage|memory loss|reasoning deterioration|mental decline/i,
  symptoms: "Deterioration of mind, especially with respect to reasoning, willpower, and mind.",
  recommendedProducts: ["Cordy Royal Jelly"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Depression",
  keywords: /depression|low spirit|hopelessness|mental dullness|sadness/i,
  symptoms: "A mental state of being in low spirit characterized by reactive dullness, lack of hope and absence of cheerfulness.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Dermatitis",
  keywords: /dermatitis|eczema|skin problem|itching skin|microscope rash/i,
  symptoms: "Problem of skin. Skin may be covered by microscope, eczema, and painful itching.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Diabetes Type II",
  keywords: /diabetes type 2|adult-onset diabetes|insulin resistance|type ii diabetes/i,
  symptoms: "Also known as adult-onset diabetes, characterized by the body being able to produce insulin but cells are unable to use it effectively.",
  recommendedProducts: ["Diawell"],
  dosage: ["4*3 daily"],
  qna: []
},
{
  name: "Diarrhoea",
  keywords: /diarrhoea|diarrhea|watery stool|abdominal pain|nausea vomiting/i,
  symptoms: "Frequent, watery, and uncontrolled bowel movements, accompanied by nausea, vomiting, constipation or abdominal pains.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Digestive Problem",
  keywords: /digestive problem|digestion issue|pancreas digestion|fat breakdown|oil digestion/i,
  symptoms: "Problem in the breakdown of body fat (oil) by the pancreas glands and crude fat.",
  recommendedProducts: ["ConstiEase"],
  dosage: ["2*2 daily"],
  qna: []
},
{
  name: "Dry Skin",
  keywords: /dry skin|skin dryness|sebaceous gland deficiency|oil deficiency skin/i,
  symptoms: "Insufficient production of body fat (oil) by the sebaceous glands and crude oil.",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Dysmenorrhoea",
  keywords: /dysmenorrhoea|painful menstruation|menstrual cramps|period pain/i,
  symptoms: "Painful menstruation (monthly flow of blood associated with pains).",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Ear Infection",
  keywords: /ear infection|ear inflammation|earache|pain in ear/i,
  symptoms: "Inflammation, aches and pains in the ear.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Eczema",
  keywords: /eczema|skin swelling|fluid filled skin|skin irritation|skin rash/i,
  symptoms: "Swelling covered by collection of fluids.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Edema (Hydrops)",
  keywords: /edema|hydrops|capillary discharge|fluid retention|swelling from blood capillaries/i,
  symptoms: "Discharge from the blood capillaries.",
  recommendedProducts: ["Cordy Royal Jelly"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Elephantiasis",
  keywords: /elephantiasis|limb swelling|genital swelling|enlarged glands/i,
  symptoms: "Swelling, especially of the limbs and genitalia by a result of enlargement of glands.",
  recommendedProducts: ["Golden Hyphae"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Emaciation (Maciation)",
  keywords: /emaciation|maciation|weight loss|severe thinness|body wasting/i,
  symptoms: "Loss of body weight.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Embolism (Arterial Blockage)",
  keywords: /embolism|arterial blockage|blood clot|vessel obstruction|air bubble in blood/i,
  symptoms: "Obstruction of blood vessels by a blood clot, air bubbles, or other foreign material.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Enlarged Spleen",
  keywords: /enlarged spleen|spleen inflammation|chest organ swelling|splenomegaly/i,
  symptoms: "Inflammation of organs pertaining to the region over the chest.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Epilepsy",
  keywords: /epilepsy|seizures|neurological seizure|brain disorder|convulsions/i,
  symptoms: "A severe infectious disease in which the skin becomes pale.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Erysipelas (rev. skin infection)",
  keywords: /erysipelas|skin infection|raised red rash|hot rash|sharp skin redness/i,
  symptoms: "A skin infection characterized by a sharply demarcated, raised, red, and hot rash.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Fainting Sickness",
  keywords: /fainting|fainting sickness|loss of consciousness|low blood to brain|syncope/i,
  symptoms: "A sudden and temporary loss of consciousness due to insufficient blood flow to the brain.",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Fatigue",
  keywords: /fatigue|tiredness|exhaustion|mental weariness|physical fatigue/i,
  symptoms: "Extreme tiredness or exhaustion, often accompanied by mental and physical weariness.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Female Infertility",
  keywords: /female infertility|infertility in women|inability to conceive|female conception issue/i,
  symptoms: "Inability to conceive after a year of unprotected intercourse.",
  recommendedProducts: ["Golden Hyphae"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Fibroid",
  keywords: /fibroid|uterine fibroid|benign uterine tumor|noncancerous growth uterus/i,
  symptoms: "Benign tumours that develop in the uterus.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Flatulence (Stomach Gas)",
  keywords: /flatulence|stomach gas|gas discomfort|bloating|intestinal gas/i,
  symptoms: "Excessive formation of gas in the stomach or intestines, causing discomfort, bloating, and sometimes pain.",
  recommendedProducts: ["ConstiEase"],
  dosage: ["2*2 daily"],
  qna: []
},
{
  name: "Flu (Cough)",
  keywords: /flu|cough|viral infection|fever and sore throat|muscle aches/i,
  symptoms: "A common viral infection of the respiratory tract, characterized by fever, cough, sore throat, and muscle aches.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "German Measles",
  keywords: /german measles|rubella|red rashes|viral rash|rubella virus/i,
  symptoms: "Caused by a virus, produces red rashes lasting a couple of days.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Goitre",
  keywords: /goitre|goiter|thyroid swelling|neck swelling|enlarged thyroid/i,
  symptoms: "Enlargement of the thyroid gland visible as swelling on the front of the neck.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Gonorrhoea",
  keywords: /gonorrhoea|gonorrhea|genital inflammation|neisseria gonococcus|std gonorrhoea/i,
  symptoms: "Contagious inflammation of genital mucous membranes, caused by Neisseria gonococcus.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Gout",
  keywords: /gout|metabolic arthritis|joint inflammation|toe pain|uric acid crystal/i,
  symptoms: "Metabolic disease with acute arthritis and joint inflammation, especially in the great toe.",
  recommendedProducts: ["Golden Hypha"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Halitosis",
  keywords: /halitosis|bad breath|offensive breath|mouth odor|foul breath/i,
  symptoms: "Offensive breath from the mouth or nostrils.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Headache",
  keywords: /headache|head pain|frontal pain|temporal headache|occipital pain/i,
  symptoms: "Pain in the head which may be dull, sharp or unbearable, frontal, temporal or occipital.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Heartburn",
  keywords: /heartburn|esophagus burn|acid reflux|chest burning|breastbone pain/i,
  symptoms: "Burning sensation in the oesophagus or below the breastbone, common in women.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Heart Failure",
  keywords: /heart failure|weak heart|cardiac weakness|ineffective pumping|deadly heart issue/i,
  symptoms: "Heart is too weak to pump blood effectively. This is deadly.",
  recommendedProducts: ["Cordy Royal Jelly", "Cordy Active"],
  dosage: ["3*2 daily", "4*2 daily"],
  qna: []
},
{
  name: "Heart Palpitation",
  keywords: /heart palpitation|irregular heartbeat|strong heartbeat|poor circulation|fast pulse/i,
  symptoms: "Irregular or strong heartbeat, linked to poor circulation.",
  recommendedProducts: ["Cordy Royal Jelly", "Cordy Active"],
  dosage: ["1*2 daily", "4*2 daily"],
  qna: []
},
{
  name: "Haemorrhoids (Piles)",
  keywords: /haemorrhoids|piles|anal veins|rectal bleeding|constipation piles/i,
  symptoms: "Enlarged veins in the anal region causing pain, bleeding, and constipation.",
  recommendedProducts: ["Reishi", "Haemorate"],
  dosage: ["3*2 daily", "2*2 daily"],
  qna: []
},
{
  name: "Hematuria",
  keywords: /hematuria|blood in urine|bloody urine|urinary bleeding/i,
  symptoms: "Presence of blood in urine.",
  recommendedProducts: ["Cardibyter", "Carmoletter", "Reishi"],
  dosage: ["4*3 daily", "4*3 daily", "3*2 daily"],
  qna: []
},
{
  name: "Hepatitis",
  keywords: /hepatitis|liver inflammation|jaundice|vomiting|liver disease/i,
  symptoms: "Inflammation of the liver causing jaundice, nausea and vomiting.",
  recommendedProducts: ["Golden Hypha", "Reishi"],
  dosage: ["4*2 daily", "3*2 daily"],
  qna: []
},
{
  name: "Herpes Simplex",
  keywords: /herpes simplex|cold sores|fever blister|lip sore|genital herpes/i,
  symptoms: "Virus causing blisters on lips, nostrils or genitals.",
  recommendedProducts: ["Golden Hypha", "Reishi"],
  dosage: ["1*2 daily", "3*2 daily"],
  qna: []
},
{
  name: "Herpes Zoster",
  keywords: /herpes zoster|shingles|burning blisters|nerve pain blisters|zoster virus/i,
  symptoms: "Painful blisters on the body with burning sensation and nerve pain caused by a virus.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Hormonal Imbalance",
  keywords: /hormonal imbalance|gland secretion|endocrine disorder|hormone irregularity/i,
  symptoms: "Irregularities in glandular secretion carried in the bloodstream to the organs it regulates.",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Hot Flushes",
  keywords: /hot flushes|head pain menopause|menopausal sweating|middle head pain/i,
  symptoms: "Severe pain in the middle of the head with sweating, associated with menopause.",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Inflamed Intestines",
  keywords: /inflamed intestines|diverticulitis|intestinal swelling|colon sacs|faeces stagnation/i,
  symptoms: "Inflamed intestines causing stagnation of faeces in distended sacs of the colon (diverticula).",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Laryngitis",
  keywords: /laryngitis|voice box inflammation|hoarseness|sore throat|breathing difficulty/i,
  symptoms: "Inflammation of the larynx or voice box affecting voice and breathing. May include hoarseness, fever, or sore throat.",
  recommendedProducts: ["Cordy Active", "Reishi"],
  dosage: ["4*2 daily", "3*2 daily"],
  qna: []
},
{
  name: "Leg Cramps",
  keywords: /leg cramps|muscle contraction|calf pain|muscle pain legs/i,
  symptoms: "Muscle contraction causing pain in the calf or other muscles.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Liver Problem",
  keywords: /liver problem|liver disease|hepatic disorder|liver malfunction/i,
  symptoms: "General liver disease or disorder.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Low Sperm Count",
  keywords: /low sperm count|male infertility|sperm deficiency|poor sperm quality/i,
  symptoms: "Inability to produce a sufficient number of sperm cells to impregnate a woman.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Lupus Erythematosus (LE)",
  keywords: /lupus erythematosus|le|butterfly rash|autoimmune lupus|chronic lupus/i,
  symptoms: "Chronic, often fatal disease with characteristic butterfly-shaped rash on the face. Common in females between puberty and menopause.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Malnutrition",
  keywords: /malnutrition|undernourishment|inadequate nutrition|weakness|skinny appearance/i,
  symptoms: "Undernourishment due to inadequate nutritional intake; symptoms include weakness, skinny appearance, or anaemia.",
  recommendedProducts: ["Lirich"],
  dosage: ["3*3 daily"],
  qna: []
},
{
  name: "Measles Sore",
  keywords: /measles sore|skin eruption|measles aftermath|measles rash/i,
  symptoms: "Sore resulting from skin eruptions following a measles attack.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Mental Block",
  keywords: /mental block|forgetfulness|memory lapse|lack of assimilation/i,
  symptoms: "Lack of assimilation or temporary forgetfulness.",
  recommendedProducts: ["Vigor Essential", "Cordy Active", "Reishi", "Golden Hypha"],
  dosage: ["1*2 daily", "4*2 daily", "3*2 daily", "4*2 daily"],
  qna: []
},
{
  name: "Migraine (Headache)",
  keywords: /migraine|unilateral headache|nausea and vision issues|recurring headache/i,
  symptoms: "Usually affects one side of the head, often with nausea and vision issues. Recurs periodically.",
  recommendedProducts: ["Cordy Active", "V-Ca", "Reishi", "Cordy Royal Jelly"],
  dosage: ["4*2 daily", "1*1 daily", "3*2 daily", "3*2 daily"],
  qna: []
},
{
  name: "Multiple Sclerosis (MS)",
  keywords: /multiple sclerosis|ms|brain and spinal disorder|loss of mobility/i,
  symptoms: "Disabling disease of the brain and spinal cord. Symptoms vary and may result in loss of ability to walk.",
  recommendedProducts: ["Golden Hypha"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Mumps (Epidemic Parotitis)",
  keywords: /mumps|epidemic parotitis|swollen glands|painful jaw|fever and chills/i,
  symptoms: "An acute, contagious, febrile disease with inflammation of the parotid and other salivary glands. Gradual onset with symptoms like chillness, headache, pain below the ear, moderate to high fever, and painful jaw movements due to swelling.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Myocardial Infarction",
  keywords: /myocardial infarction|heart attack|angina|cardiac failure|myocardium damage/i,
  symptoms: "Damage to the myocardium (heart muscle) causing angina-like pain, shock, heart attack, and potential sudden death due to cardiac failure.",
  recommendedProducts: ["Cordy Royal Jelly", "Cardibetter"],
  dosage: ["3*2 daily", "4*3 daily"],
  qna: []
},
{
  name: "Myocarditis (Myocardial Inflammation)",
  keywords: /myocarditis|heart inflammation|apex beat|irregular pulse|heart muscle swelling/i,
  symptoms: "Inflammation of the heart muscle due to infections, nephritis, or poisoning (e.g. carbon monoxide), with symptoms like apex beat, weakness, and irregular pulse.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Muscle Cramps",
  keywords: /muscle cramps|muscle tightening|cold-induced cramps|overwork cramps/i,
  symptoms: "Sudden and painful tightening of muscles caused by cold, overwork, or inflexibility.",
  recommendedProducts: ["Cordy Active", "V-Ca"],
  dosage: ["3*2 daily", "1*1 daily"],
  qna: []
},
{
  name: "Muscular Dystrophy",
  keywords: /muscular dystrophy|muscle wasting|nutritional deficiency muscle loss/i,
  symptoms: "Wasting away of body parts due to lack of nutrition.",
  recommendedProducts: ["Cordy Active", "V-Ca"],
  dosage: ["4*2 daily", "1*1 daily"],
  qna: []
},
{
  name: "Nails Whitlow",
  keywords: /nails whitlow|finger inflammation|pus in nails|toe infection/i,
  symptoms: "Painful inflammation at the tip of fingers or toes involving pus, possibly affecting bone or tissue.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Nausea & Vomiting",
  keywords: /nausea|vomiting|throwing up|feeling sick|stomach upset/i,
  symptoms: "Feeling sick and throwing up.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Nervous Depression",
  keywords: /nervous depression|chronic sadness|low mood|mental fatigue|emotional numbness/i,
  symptoms: "A mental state marked by chronic low mood, sadness, numbness, and disinterest in activities.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Nephritis",
  keywords: /nephritis|kidney inflammation|renal disorder|chronic kidney issue/i,
  symptoms: "Chronic inflammation of the kidneys.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Obesity (Exogenous)",
  keywords: /obesity|exogenous obesity|overweight|fat accumulation|overeating/i,
  symptoms: "Medically refers to abnormal fat accumulation due to overeating.",
  recommendedProducts: ["Magilim", "Colon Cleanser"],
  dosage: ["4*3 daily", "1*2 daily"],
  qna: []
},
{
  name: "Osteoporosis",
  keywords: /osteoporosis|bone weakness|calcium deficiency|brittle bones|painful bones/i,
  symptoms: "Softening and weakening of bones due to calcium or vitamin deficiency, making bones brittle and painful.",
  recommendedProducts: ["Cordy Active", "V-Ca", "Jointeez"],
  dosage: ["4*2 daily", "1*1 daily", "4*2 daily"],
  qna: []
},
{
  name: "Parkinson’s Disease",
  keywords: /parkinson’s disease|tremors|muscle rigidity|nervous disease|peculiar gait/i,
  symptoms: "Chronic nervous disease with slow-spreading tremors, muscular rigidity, weakness, and a peculiar gait. Starts in the hand or foot and progresses.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Phlebitis",
  keywords: /phlebitis|vein inflammation|vein pain|skin discoloration from veins/i,
  symptoms: "Inflammation of a vein causing pain, skin discoloration, and tenderness.",
  recommendedProducts: ["Constilease", "Cordy Royal Jelly", "Reishi", "Golden Six"],
  dosage: ["2*2 daily", "3*2 daily", "3*2 daily", "1*2 daily"],
  qna: []
},
{
  name: "Pneumonia",
  keywords: /pneumonia|lung infection|fever cough|obstructed breathing|chest pain/i,
  symptoms: "Inflammatory swelling and acute edema causing obstructed breathing, rapid pulse, chills, high temperature, and joint pain. Infection of one or both lungs caused by bacteria, viruses, or fungi. Symptoms include fever, cough with mucus (rusty, green, or blood-tinged), and chest pain worsened by coughing.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Polyp",
  keywords: /polyp|nodular tumour|mucous membrane growth|bleeding tumour/i,
  symptoms: "A nodular tumour growing from mucous tissues (nose, bladder, stomach, intestine, or uterus). Polyps bleed easily.",
  recommendedProducts: ["Reishi", "Golden Hypha"],
  dosage: ["3*2 daily", "4*2 daily"],
  qna: []
},
{
  name: "Premenstrual Syndrome (PMS)",
  keywords: /pms|premenstrual syndrome|menstrual cramps|period fever|premenstrual pain/i,
  symptoms: "Pains, cramps, and feverish conditions before menstruation.",
  recommendedProducts: ["Golden Six", "Eve's Comfort"],
  dosage: ["1*2 daily", "3*3 daily"],
  qna: []
},
{
  name: "Prostatitis",
  keywords: /prostatitis|prostate inflammation|frequent urination|perineal pain|prostate infection/i,
  symptoms: "Inflammation of the prostate gland, possibly due to gonorrhoea infection. Symptoms: perineal pain, frequent urination, fever, constipation, thirst, vomiting, discharge from penis. May be chronic.",
  recommendedProducts: ["Vigor Essential"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Psoriasis",
  keywords: /psoriasis|inflammatory skin disease|scaly skin|itchy skin|red patches/i,
  symptoms: "Chronic inflammatory skin disease with red scaly patches. Very itchy.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Pulmonary Emphysema",
  keywords: /pulmonary emphysema|ruptured alveoli|breathing difficulty|lung elasticity loss/i,
  symptoms: "Lung alveoli become ruptured due to loss of elasticity. Causes breathing difficulty.",
  recommendedProducts: ["Cordy Active", "Cardibetter"],
  dosage: ["4*2 daily", "4*3 daily"],
  qna: []
},
{
  name: "Rheumatic Fever",
  keywords: /rheumatic fever|joint inflammation|streptococcal fever|migratory pain|cardiac inflammation/i,
  symptoms: "Systemic febrile disease, inflammatory and non-suppurative. Often followed by serious heart disease. Caused by prior streptococcal infection. Symptoms: fever, migratory joint pain, abdominal pain, cardiac issues.",
  recommendedProducts: ["Reishi", "Qinghao"],
  dosage: ["3*2 daily", "as directed by your doctor"],
  qna: []
},
{
  name: "Scarlet Fever",
  keywords: /scarlet fever|scarlet rash|sore throat fever|contagious rash|rapid pulse/i,
  symptoms: "Acute contagious disease with sore throat, fever, scarlet rash, and rapid pulse. Requires rest and isolation.",
  recommendedProducts: ["Reishi", "Cordy Royal Jelly"],
  dosage: ["3*2 daily", "3*2 daily"],
  qna: []
},
{
  name: "Seizures (Epilepsy, Ictus, Raptus)",
  keywords: /seizures|epilepsy|ictus|raptus|muscle contractions/i,
  symptoms: "Involuntary muscle contractions.",
  recommendedProducts: ["Reishi", "Cordy Royal Jelly"],
  dosage: ["3*2 daily", "3*2 daily"],
  qna: []
},
{
  name: "Sinusitis",
  keywords: /sinusitis|sinus inflammation|maxillary sinus|catarrh and cough|sinus headache/i,
  symptoms: "Inflammation of sinus cavities, especially maxillary. Symptoms: catarrh, fever, chills, cough, and headache.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Skin Blemish",
  keywords: /skin blemish|wrinkles|skin scars|skin deformities|aging spots/i,
  symptoms: "Wrinkles, scars, or skin deformities due to aging or damage.",
  recommendedProducts: ["Constilease"],
  dosage: ["2*2 daily"],
  qna: []
},
{
  name: "Sore (Ulcerated)",
  keywords: /ulcerated sore|chronic sore|non-healing wound|persistent ulcer/i,
  symptoms: "A chronic sore that seems incurable.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Spastic Colon (Irritable Bowel Syndrome / Mucous Colitis)",
  keywords: /spastic colon|irritable bowel syndrome|ibs|mucous colitis|colon paralysis/i,
  symptoms: "Paralysis in part of the large intestine causing continuous contraction and rigidity.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Spines and Disc (Pain & Aches)",
  keywords: /back pain|waist pain|spinal aches|disc pain|backache/i,
  symptoms: "Backache or waist pain.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Staphylococcus",
  keywords: /staphylococcus|boils|bacterial infection|cluster infection|blood infection/i,
  symptoms: "Pathogenic bacteria in clusters causing boils and infections. Spoils the blood.",
  recommendedProducts: [],
  dosage: [],
  qna: []
},
{
  name: "Stomach Ulcer",
  keywords: /stomach ulcer|ulcer|open sore in stomach|gastric ulcer/i,
  symptoms: "An open sore in the stomach.",
  recommendedProducts: ["Reishi", "Golden Hypha"],
  dosage: ["3*2 daily", "4*2 daily"],
  qna: []
},
{
  name: "Stress",
  keywords: /stress|tiredness|body strain|mental exertion|dullness/i,
  symptoms: "Strain or exertion on the body causing tiredness and dullness.",
  recommendedProducts: ["Golden Six"],
  dosage: ["1*2 daily"],
  qna: []
},
{
  name: "Stroke (Thrombosis in the Leg)",
  keywords: /stroke|thrombosis in leg|sudden paralysis|blood clot blockage/i,
  symptoms: "Sudden paralysis or clot formation blocking blood vessels.",
  recommendedProducts: ["Cordy Royal Jelly"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Sunburn (Erythema Solare)",
  keywords: /sunburn|erythema solare|skin inflammation from sun|prolonged sun exposure/i,
  symptoms: "Inflammation of the skin from prolonged sun exposure.",
  recommendedProducts: ["Constilease"],
  dosage: ["2*2 daily"],
  qna: []
},
{
  name: "Tetanus (Lockjaw)",
  keywords: /tetanus|lockjaw|clostridium tetani|jaw stiffness|muscle spasms/i,
  symptoms: "Infectious disease caused by clostridium tetani toxin. Causes painful muscle spasms, beginning with jaw stiffness and facial contractions.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Tonsillitis",
  keywords: /tonsillitis|inflamed tonsils|difficulty swallowing|throat inflammation/i,
  symptoms: "Inflammation of one or both tonsils. Causes difficulty swallowing.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Tuberculosis (T.B. Bacillus)",
  keywords: /tuberculosis|tb bacillus|lung infection|infectious lung disease/i,
  symptoms: "Infectious disease affecting lungs and potentially other body systems like bones, joints, and lymph nodes.",
  recommendedProducts: ["Cordy Active", "Reishi"],
  dosage: ["4*2 daily", "3*2 daily"],
  qna: []
},
{
  name: "Tumour / Cancer (Malignant Neoplasm)",
  keywords: /tumour|cancer|malignant neoplasm|abnormal tissue growth/i,
  symptoms: "New abnormal tissue growth with no physiological function. May be malignant (cancer).",
  recommendedProducts: ["Golden Hypha", "Reishi"],
  dosage: ["4*2 daily", "3*2 daily"],
  qna: []
},
{
  name: "Uric Acid",
  keywords: /uric acid|waste metabolism product|urine acid|uric acid in blood/i,
  symptoms: "A waste product of metabolism found in blood and urine.",
  recommendedProducts: ["Reishi", "Gastrifort"],
  dosage: ["3*2 daily", "4*2 daily"],
  qna: []
},
{
  name: "Vaginitis",
  keywords: /vaginitis|vaginal inflammation|vaginal discomfort|vaginal irritation/i,
  symptoms: "Inflammation of the vagina causing discomfort.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Varicose Vein",
  keywords: /varicose vein|swollen veins|enlarged leg veins|vein disorder/i,
  symptoms: "Swollen or enlarged veins, especially in the legs.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Venereal Disease",
  keywords: /venereal disease|std|gonorrhoea|syphilis|sexually transmitted infection/i,
  symptoms: "Sexually transmitted infections such as Gonorrhoea and Syphilis.",
  recommendedProducts: ["Reishi", "Golden Hypha"],
  dosage: ["3*2 daily", "4*2 daily"],
  qna: []
},
{
  name: "Vertigo (Light Headedness)",
  keywords: /vertigo|light headedness|dizziness|spinning sensation|imbalance/i,
  symptoms: "Dizziness, giddiness, a feeling of spinning or imbalance. Mentally confused, unable to stand firm.",
  recommendedProducts: ["Cordy Active"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Wart (Veruca)",
  keywords: /wart|veruca|skin bump|skin overgrowth|viral wart/i,
  symptoms: "A small overgrowth or bump on the skin.",
  recommendedProducts: ["Golden Hypha"],
  dosage: ["4*2 daily"],
  qna: []
},
{
  name: "Weak Erection",
  keywords: /weak erection|erectile dysfunction|sexual dysfunction|incomplete erection/i,
  symptoms: "Failure to achieve or maintain a full erection during sexual activity.",
  recommendedProducts: ["Re-vive"],
  dosage: ["2*1 daily"],
  qna: []
},
{
  name: "Whitlow (Felon)",
  keywords: /whitlow|felon|finger inflammation|pus filled swelling|painful toe tip/i,
  symptoms: "Painful pus-filled inflammation at the end of a finger or toe.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Wound (Ulcerated)",
  keywords: /ulcerated wound|chronic wound|non-healing sore|tissue damage wound/i,
  symptoms: "Chronic wounds caused by trauma or tissue damage. Persistent and difficult to heal.",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
},
{
  name: "Wrinkles (Furrow Crease)",
  keywords: /wrinkles|furrow crease|skin folds|aging lines|skin aging/i,
  symptoms: "Small folds or lines on the skin, especially due to aging.",
  recommendedProducts: ["Constilease"],
  dosage: ["2*2 daily"],
  qna: []
},
{
  name: "Yeast Infection",
  keywords: /yeast infection|vaginal yeast|candida|vaginal discharge|leucorrhoea/i,
  symptoms: "Inflammation of the vagina and vulva. Symptoms include burning, heat, pain, pelvic pressure, and discharge (leucorrhoea).",
  recommendedProducts: ["Reishi"],
  dosage: ["3*2 daily"],
  qna: []
}
               
            ];


            // === FAQs ===
            const faqs = [
                { q: /how can i order|where to buy|buy products/i, a: "You can place an order directly on our website, or through our mobile app. You can also click the 'Buy Now' links provided for each product." },
                { q: /shipping information|delivery time/i, a: "Shipping usually takes 3-5 business days depending on your location within Nigeria. International shipping times vary." },
                { q: /return policy|refunds/i, a: "We have a 30-day return policy for unopened products. Please see our website for more details or contact our support team." },
                { q: /contact support|customer service|helpline/i, a: "You can contact our support team via email at support@kedihealthcare.com or call us at +234 800 123 4567. You can also reach us via WhatsApp using the link: <a href='https://wa.me/message/WNGLZNUXKXXIF1' target='_blank' class='text-green-600 underline'>Chat on WhatsApp</a>." },
                { q: /what is kedi healthcare|about kedi healthcare/i, a: "Kedi Healthcare is a leading traditional Chinese medicine (TCM) company in Nigeria, dedicated to providing high-quality herbal and nutritional supplements for various health needs. We focus on natural solutions for overall well-being." },
                { q: /kedi healthcare products|what products do you offer/i, a: "Kedi Healthcare offers a wide range of natural health products, including supplements for immune support (Reishi), male sexual health (Re-Vive), kidney health (Golden Six), digestive health (Colon Cleanse), energy (Vigor Essential), respiratory health (Cordy Active), weight management (Magilim), and cardiovascular health (Blood Fat Reducing)." },
                { q: /kedi healthcare products list|list all products/i, a: "Certainly! Here is a list of Kedi Healthcare products: Reishi, Re-Vive, Golden Six, Colon Cleanse, Vigor Essential, Cordy Active, Magilim, and Blood Fat Reducing. You can ask for details on any of these." },
                { q: /kedi healthcare products details|tell me about your products/i, a: "To get details about a specific product, please ask me about it by name, e.g., 'Tell me about Reishi' or 'What is Re-Vive?'" },
                { q: /kedi healthcare product prices|how much are your products/i, a: "Product prices vary. For example, Reishi is ₦35,000, and Re-Vive is ₦39,000. You can ask me about the price of a specific product." },
                {
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
                            <li><strong>Training and Support:</strong> Kedi often provides training, seminars, and support materials to help distributors succeed.</li>
                            <li><strong>Community:</strong> Become part of a network of like-minded individuals.</li>
                        </ul>
                        <p class="font-semibold text-green-700">To get detailed information on the compensation plan, registration process, and to start your Kedi business, we recommend visiting the official Kedi Healthcare website or contacting their nearest office/distributor directly. You can also reach out to our customer service for general inquiries.</p>
                    `
                }
            ];

            // === Chatbot Responses for general queries ===
            const chatbotResponses = [
                { keywords: /general health tips|health advice/i, answer: "Maintaining good health involves several key practices. Here are some general health tips:" },
            ];

            // === Health Tips ===
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
                "Engaging in regular physical activity can boost your mood? 🏋️‍♀️😊 Exercise releases endorphins, which are natural mood lifters.",
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
                "🧴 Did you know? Using sunscreen daily helps prevent premature aging and reduces skin cancer risk? 🧴☀️",
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
                "🍓 Did you know? Strawberries contain antioxidants and vitamin C that support skin and immune health? 🍓✨",
                "📵 Did you know? Reducing screen time before bed can improve sleep quality? 📵😴",
                "🧴 Did you know? Moisturizing daily helps keep skin hydrated and prevents dryness and cracking? 🧴💧",
                "🛀 Did you know? Warm baths can relax muscles, improve circulation, and reduce stress? 🛀😌",
                "🥜 Did you know? Nuts provide healthy fats, protein, and fiber that support heart health? 🥜❤️",
                "🍋 Did you know? Lemon water can aid digestion and boost your vitamin C intake? 🍋💧",
                "🧃 Did you know? Choosing whole fruits over fruit juices reduces sugar intake and increases fiber? 🍎🚫🧃",
                "🦵 Did you know? Regular leg exercises improve circulation and reduce the risk of blood clots? 🦵❤️",
                "🍯 Did you know? Raw honey contains antioxidants and has antibacterial properties? 🍯🛡️",
                "🧴 Did you know? Applying moisturizer right after a shower locks in hydration and keeps skin soft? 🧴🚿",
                "🧠 Did you know? Learning a new language or skill strengthens neural connections in your brain? 🧠📚",
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


            ];  // End of health tips array

            // === Product Suggestions ===
            // === UI Element References ===
            let openBtn, closeBtn, chatbotWindow, chatbotInput, chatbotMessages, sendBtn, scrollIndicator;

            let currentSuggestions = [];
            let waitingForSymptoms = false; // Flag to manage symptom checker state
            let waitingForHealthGoal = false; // New flag for personalized recommendations
            let currentHealthTipIndex = 0; // Index for "Did you know" health tips

            document.addEventListener('DOMContentLoaded', async () => {
                openBtn = document.getElementById('open-chatbot-btn');
                closeBtn = document.getElementById('close-chatbot-btn');
                chatbotWindow = document.getElementById('chatbot-window');
                chatbotInput = document.getElementById('chatbot-input');
                chatbotMessages = document.getElementById('chatbot-messages');
                sendBtn = document.getElementById('send-btn');
                scrollIndicator = document.getElementById('scroll-indicator'); // Get the new scroll indicator element

                // Event Listeners
                openBtn.addEventListener('click', () => {
                    chatbotWindow.classList.remove('hidden');
                    chatbotWindow.classList.add('open');
                    // Initial welcome message and suggestions
                    if (chatbotMessages.children.length <= 1) { // Check if only the indicator is present
                        // Get current time for greeting in Lagos timezone
                        const options = { hour: 'numeric', hourCycle: 'h23', timeZone: 'Africa/Lagos' };
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
                        displaySuggestions([
                            { text: "List all products", type: "text" },
                            { text: "How to make money with Kedi? 💰", type: "text" },
                            { text: "Tell me about Diabetes", type: "text" },
                            { text: "General health tips 💡", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "Contact support 📞", type: "text" }
                        ]);
                    }
                });


                closeBtn.addEventListener('click', () => {
                    chatbotWindow.classList.remove('open');
                    chatbotWindow.classList.add('hidden');
                });

                sendBtn.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default form submission if it were a form
                    sendMessage();
                });

                chatbotInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent default Enter key behavior (e.g., new line)
                        sendMessage();
                    }
                });

                // Scroll indicator logic
                let hideIndicatorTimeout;

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
                        scrollIndicator.style.opacity = '0';
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
                    if (chatbotMessages.scrollHeight > chatbotMessages.clientHeight) {
                        hideIndicatorTimeout = setTimeout(() => {
                            scrollIndicator.style.opacity = '0';
                        }, 500); // Fade out faster on mouse leave
                    }
                });

                // Initial update of the scroll indicator when the chatbot opens
                // This will be called when the chatbot is made visible.
                const observer = new MutationObserver((mutationsList, observer) => {
                    for (const mutation of mutationsList) {
                        if (mutation.attributeName === 'class' && chatbotWindow.classList.contains('open')) {
                            updateScrollIndicator();
                            observer.disconnect(); // Disconnect once opened for the first time
                            break;
                        }
                    }
                });
                observer.observe(chatbotWindow, { attributes: true });


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
                            // Create a span for the text content and a span for the dots
                            msg.innerHTML = `<span class="typing-text-content"></span><span class="dots"><span></span><span></span><span></span></span>`;
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
                    const qnaButton = product.qna && product.qna.length > 0
                        ? `<button class="qna-btn suggestion-button" data-type="product" data-name="${product.name}">Q&A</button>`
                        : '';

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
                 * @param {Array<Object>} suggestions - An array of suggestion objects { text: string, type: string }.
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
                    const typingMsgElement = addMessage("bot", "", true); // Add typing indicator
                    const textContentSpan = typingMsgElement.querySelector('.typing-text-content');
                    const dotsSpan = typingMsgElement.querySelector('.dots');

                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

                    await new Promise(resolve => setTimeout(resolve, delayBetweenStages)); // Initial delay

                    // If there's a text content span, type into it
                    if (textContentSpan) {
                        let currentText = '';
                        for (let i = 0; i < messageContent.length; i++) {
                            currentText += messageContent[i];
                            textContentSpan.innerHTML = currentText; // Use innerHTML to allow for HTML content
                            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                            await new Promise(resolve => setTimeout(resolve, delayPerChar));
                        }
                    }

                    // After typing, remove typing indicator and ensure full message is displayed
                    typingMsgElement.classList.remove('typing-indicator');
                    if (dotsSpan) {
                        dotsSpan.remove(); // Remove the dots
                    }
                    if (textContentSpan) {
                        textContentSpan.innerHTML = messageContent; // Set final HTML content
                        textContentSpan.classList.remove('typing-text-content'); // Clean up class
                    } else {
                        // Fallback if textContentSpan wasn't found (shouldn't happen with correct addMessage)
                        typingMsgElement.innerHTML = messageContent;
                    }
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                    updateScrollIndicator(); // Update indicator after bot message
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
                            // Add specific buy suggestions after product details
                            suggestions.push({ text: `Buy ${item.name}`, type: "link", url: item.buyNowLink });
                            suggestions.push({ text: `Chat to Buy ${item.name} 💬`, type: "link", url: WHATSAPP_BUSINESS_LINK });
                            suggestions.push({ text: `More about Kedi products`, type: "text" });
                            suggestions.push({ text: `List all products`, type: "text" });
                            suggestions.push({ text: `General health tips 💡`, type: "text" });
                            suggestions.push({ text: "Symptom Checker ✨", type: "text" });
                            suggestions.push({ text: "Personalized Product Recommendation ✨", type: "text" });
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
                                        suggestions.push({ text: `Tell me about ${product.name}`, type: "text" });
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
                            suggestions.push({ text: `More health conditions`, type: "text" });
                            suggestions.push({ text: `General health tips 💡`, type: "text" });
                            suggestions.push({ text: "Symptom Checker ✨", type: "text" });
                            suggestions.push({ text: "Personalized Product Recommendation ✨", type: "text" });
                        }
                    }

                    if (responseHtml) {
                        await sendBotMessageWithTyping(responseHtml);
                        if (suggestions.length > 0) {
                            displaySuggestions(suggestions);
                        }
                    }
                }

                /**
                 * Handles sending a message from the user.
                 */
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
                        suggestions.push({ text: "Next Tip", type: "text", action: "next-tip" });
                        suggestions.push({ text: "See all health tips", type: "text" }); // Option to see all tips at once
                        suggestions.push({ text: "Back to main menu", type: "text" });
                        displaySuggestions(suggestions);
                    } else {
                        // If all tips have been shown, or index is out of bounds
                        await sendBotMessageWithTyping("That's all the tips I have for now! I hope they were helpful.");
                        currentHealthTipIndex = 0; // Reset for next time
                        displaySuggestions([
                            { text: "List all products", type: "text" },
                            { text: "General health tips 💡", type: "text" }, // Offer to restart tips
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "Contact support 📞", type: "text" }
                        ]);
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
                        suggestions = [
                            { text: "List all products", type: "text" },
                            { text: "General health tips 💡", type: "text" }, // Offer to restart tips
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "Contact support 📞", type: "text" }
                        ];
                        displaySuggestions(suggestions);
                        return;
                    }
                    if (message.toLowerCase() === "back to main menu") {
                        await sendBotMessageWithTyping("Welcome back to the main menu! How can I help you further?");
                        suggestions = [
                            { text: "List all products", type: "text" },
                            { text: "How to make money with Kedi? 💰", type: "text" },
                            { text: "Tell me about Diabetes", type: "text" },
                            { text: "General health tips 💡", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "Contact support 📞", type: "text" }
                        ];
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
                            suggestions.push({ text: "General health tips 💡", type: "text" });
                        }
                        waitingForSymptoms = false; // Reset flag
                        suggestions.push({ text: "List all products", type: "text" });
                        suggestions.push({ text: "How to make money with Kedi? 💰", type: "text" });
                        suggestions.push({ text: "Personalized Product Recommendation ✨", type: "text" });
                        displaySuggestions(suggestions);
                        return;
                    }

                    // --- Personalized Product Recommendation Logic ---
                    if (waitingForHealthGoal) {
                        const healthGoal = message.toLowerCase();
                        await sendBotMessageWithTyping("Understood. Let me see if I can suggest some Kedi products that align with your health goal.");

                        let recommendedProducts = [];
                        // Simple keyword matching for demonstration. In a real app, this would be more sophisticated.
                        if (healthGoal.includes("immune") || healthGoal.includes("immunity") || healthGoal.includes("boost health")) {
                            recommendedProducts.push(products.find(p => p.name === "Reishi"));
                            recommendedProducts.push(products.find(p => p.name === "Golden Hypha"));
                        }
                        if (healthGoal.includes("energy") || healthGoal.includes("stamina") || healthGoal.includes("vitality")) {
                            recommendedProducts.push(products.find(p => p.name === "Vigor Essential"));
                            recommendedProducts.push(products.find(p => p.name === "Cordy Active"));
                        }
                        if (healthGoal.includes("male sexual health") || healthGoal.includes("libido") || healthGoal.includes("erection")) {
                            recommendedProducts.push(products.find(p => p.name === "Re-Vive"));
                            recommendedProducts.push(products.find(p => p.name === "Vigor Essential"));
                        }
                        if (healthGoal.includes("diabetes") || healthGoal.includes("blood sugar")) {
                            recommendedProducts.push(products.find(p => p.name === "Diawell"));
                        }
                        if (healthGoal.includes("joint pain") || healthGoal.includes("arthritis")) {
                            recommendedProducts.push(products.find(p => p.name === "Jointeez"));
                        }
                        if (healthGoal.includes("weight management") || healthGoal.includes("lose weight")) {
                            recommendedProducts.push(products.find(p => p.name === "Magilim"));
                        }
                        if (healthGoal.includes("memory") || healthGoal.includes("concentration") || healthGoal.includes("brain")) {
                            recommendedProducts.push(products.find(p => p.name === "Memory 24/7 Capsule"));
                        }
                        if (healthGoal.includes("vision") || healthGoal.includes("eye")) {
                            recommendedProducts.push(products.find(p => p.name === "Eye Beta Capsule"));
                            recommendedProducts.push(products.find(p => p.name === "Refresh Tea"));
                        }
                        if (healthGoal.includes("stomach") || healthGoal.includes("digestion") || healthGoal.includes("ulcers")) {
                            recommendedProducts.push(products.find(p => p.name === "Gastrifort Capsule"));
                            recommendedProducts.push(products.find(p => p.name === "Constilease"));
                        }
                        if (healthGoal.includes("female reproductive health") || healthGoal.includes("hormonal balance")) {
                            recommendedProducts.push(products.find(p => p.name === "Gynapharm Capsule"));
                            recommendedProducts.push(products.find(p => p.name === "Golden Six"));
                        }
                        if (healthGoal.includes("prostate health")) {
                            recommendedProducts.push(products.find(p => p.name === "Lycovite"));
                        }
                        if (healthGoal.includes("cardiovascular") || healthGoal.includes("heart")) {
                            recommendedProducts.push(products.find(p => p.name === "Cello Q10"));
                        }
                         if (healthGoal.includes("blood health") || healthGoal.includes("anemia")) {
                            recommendedProducts.push(products.find(p => p.name === "Reishi (Blood Tonic)"));
                        }


                        if (recommendedProducts.length > 0) {
                            let productHtml = "Based on your goal, here are some Kedi Healthcare products you might find beneficial:<br><br>";
                            recommendedProducts.forEach(product => {
                                if (product) { // Ensure product is not undefined
                                    productHtml += createProductCardHtml(product);
                                    suggestions.push({ text: `Tell me about ${product.name}`, type: "text" });
                                }
                            });
                            productHtml += `<small class="text-gray-500"><em>Please note: These recommendations are based on general health goals and are not a substitute for professional medical advice. Always consult a healthcare professional for personalized guidance.</em></small>`;
                            await sendBotMessageWithTyping(productHtml);
                        } else {
                            await sendBotMessageWithTyping("I couldn't find specific product recommendations for that health goal in my current database. Kedi Healthcare has many products for general well-being. Would you like to see a list of all products or get general health tips?");
                            suggestions.push({ text: "List all products", type: "text" });
                            suggestions.push({ text: "General health tips 💡", type: "text" });
                        }
                        waitingForHealthGoal = false; // Reset flag
                        suggestions.push({ text: "Symptom Checker ✨", type: "text" });
                        suggestions.push({ text: "How to make money with Kedi? 💰", type: "text" });
                        displaySuggestions(suggestions);
                        return;
                    }

                    // --- Predefined Responses (FAQs, Products, Conditions, General Tips) ---

                    // Check for product-specific queries
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
                        suggestions = [
                            { text: "List all products", type: "text" },
                            { text: "General health tips 💡", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "How to make money with Kedi? 💰", type: "text" },
                            { text: "Contact support 📞", type: "text" }
                        ];
                        // The WhatsApp button is now handled by the FAQ answer itself, but we keep the suggestion for consistency if needed elsewhere.
                        // if (faqMatch.q.test("contact support")) {
                        //     suggestions.push({ text: "WhatsApp Us", type: "link", url: WHATSAPP_BUSINESS_LINK });
                        // }
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
                            suggestions = [
                                { text: "List all products", type: "text" },
                                { text: "How to make money with Kedi? 💰", type: "text" },
                                { text: "Tell me about Diabetes", type: "text" },
                                { text: "General health tips 💡", type: "text" },
                                { text: "Symptom Checker ✨", type: "text" },
                                { text: "Personalized Product Recommendation ✨", type: "text" },
                                { text: "Contact support 📞", type: "text" }
                            ];
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
                        suggestions = [
                            { text: "Tell me about Reishi", type: "text" },
                            { text: "Tell me about Re-Vive", type: "text" },
                            { text: "General health tips 💡", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "How to make money with Kedi? 💰", type: "text" },
                        ];
                        displaySuggestions(suggestions);
                        return;
                    }

                    // Special handling for "Symptom Checker"
                    if (message.toLowerCase().includes("symptom checker")) {
                        waitingForSymptoms = true;
                        await sendBotMessageWithTyping("Okay, let's try the Symptom Checker. Please tell me your symptoms, separated by commas (e.g., 'fever, headache, fatigue').");
                        suggestions = [
                            { text: "Cancel Symptom Checker", type: "text" },
                            { text: "List all products", type: "text" },
                            { text: "General health tips 💡", type: "text" },
                        ];
                        displaySuggestions(suggestions);
                        return;
                    }

                    // Special handling for "Cancel Symptom Checker"
                    if (message.toLowerCase().includes("cancel symptom checker")) {
                        waitingForSymptoms = false;
                        await sendBotMessageWithTyping("Symptom Checker cancelled. How else can I assist you?");
                        suggestions = [
                            { text: "List all products", type: "text" },
                            { text: "Tell me about Diabetes", type: "text" },
                            { text: "General health tips 💡", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "How to make money with Kedi? 💰", type: "text" },
                            { text: "Contact support 📞", type: "text" }
                        ];
                        displaySuggestions(suggestions);
                        return;
                    }

                    // Special handling for "Personalized Product Recommendation"
                    if (message.toLowerCase().includes("personalized product recommendation")) {
                        waitingForHealthGoal = true;
                        await sendBotMessageWithTyping("Great! To give you a personalized recommendation, please tell me your primary health goal or concern (e.g., 'boost immunity', 'improve energy', 'manage blood sugar', 'support joint health').");
                        suggestions = [
                            { text: "Cancel Recommendation", type: "text" },
                            { text: "List all products", type: "text" },
                            { text: "General health tips 💡", type: "text" },
                        ];
                        displaySuggestions(suggestions);
                        return;
                    }

                    // Special handling for "Cancel Recommendation"
                    if (message.toLowerCase().includes("cancel recommendation")) {
                        waitingForHealthGoal = false;
                        await sendBotMessageWithTyping("Personalized Product Recommendation cancelled. How else can I assist you?");
                        suggestions = [
                            { text: "List all products", type: "text" },
                            { text: "Tell me about Diabetes", type: "text" },
                            { text: "General health tips 💡", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "How to make money with Kedi? 💰", type: "text" },
                            { text: "Contact support 📞", type: "text" }
                        ];
                        displaySuggestions(suggestions);
                        return;
                    }


                    // Fallback to LLM if no specific match
                    await sendBotMessageWithTyping("Let me think about that for a moment...");
                    try {
                        const chatHistory = [{ role: "user", parts: [{ text: message }] }];
                        const payload = { contents: chatHistory };
                        const response = await fetch(API_URL, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        const result = await response.json();

                        if (result.candidates && result.candidates.length > 0 &&
                            result.candidates[0].content && result.candidates[0].content.parts &&
                            result.candidates[0].content.parts.length > 0) {
                            botResponse = result.candidates[0].content.parts[0].text;
                        } else {
                            botResponse = "I'm having trouble connecting to my knowledge base right now. Please try again later or ask a different question.";
                        }
                    } catch (error) {
                        console.error("Error calling Gemini API:", error);
                        botResponse = "I'm currently experiencing technical difficulties and cannot process your request. Please try again in a moment.";
                    }

                    // Added disclaimer for LLM generated responses
                    await sendBotMessageWithTyping(`${botResponse}<br><br><small class="text-gray-500"><em>Please note: This information is AI-generated and for general informational purposes only. It is not medical advice. Always consult a healthcare professional for specific health concerns.</em></small>`);
                    // Always offer general suggestions after an LLM response
                    displaySuggestions([
                        { text: "List all products", type: "text" },
                        { text: "How to make money with Kedi? 💰", type: "text" },
                        { text: "General health tips 💡", type: "text" },
                        { text: "Symptom Checker ✨", type: "text" },
                        { text: "Personalized Product Recommendation ✨", type: "text" },
                        { text: "Contact support 📞", type: "text" }
                    ]);
                }
            });
        })();
