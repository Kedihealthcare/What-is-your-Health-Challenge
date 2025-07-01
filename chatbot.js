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
                    image: "https://placehold.co/150x150/0000FF/808080?text=Reishi",
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
                    image: "https://placehold.co/150x150/FF0000/FFFFFF?text=Re-Vive",
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
                    name: "Golden Six",
                    keywords: /golden six|golden6|kidney support/i,
                    image: "https://placehold.co/150x150/FFD700/000000?text=Golden+Six",
                    description: "Supports kidney health and overall well-being.",
                    price: "₦32,000",
                    buyNowLink: "https://www.jumia.com.ng/kedi-golden-six-capsule-111162791.html",
                    blogLink: "https://blog.example.com/golden-six-benefits",
                    qna: [
                        { question: "Who can take Golden Six?", answer: "Golden Six is generally suitable for adults looking to support kidney health. Consult a doctor if you have pre-existing conditions." },
                        { question: "Does Golden Six help with fatigue?", answer: "By supporting kidney function, Golden Six can indirectly help with fatigue associated with kidney imbalances." }
                    ]
                },
                {
                    name: "Colon Cleanse",
                    keywords: /colon cleanse|detox|digestive health/i,
                    image: "https://placehold.co/150x150/8B4513/FFFFFF?text=Colon+Cleanse",
                    description: "Promotes healthy digestion and colon detoxification.",
                    price: "₦28,000",
                    buyNowLink: "https://www.jumia.com.ng/kedi-colon-cleanse-capsule-111162791.html",
                    blogLink: "https://blog.example.com/colon-cleanse-benefits",
                    qna: [
                        { question: "How often should I use Colon Cleanse?", answer: "Follow the product's recommended usage. It's typically used for a short period as part of a detox regimen." },
                        { question: "Is it safe for long-term use?", answer: "Colon cleansers are generally not recommended for long-term continuous use. Consult a healthcare professional for advice on prolonged use." }
                    ]
                },
                {
                    name: "Vigor Essential",
                    keywords: /vigor essential|energy booster|fatigue/i,
                    image: "https://placehold.co/150x150/008000/FFFFFF?text=Vigor+Essential",
                    description: "Boosts energy and reduces fatigue.",
                    price: "₦37,000",
                    buyNowLink: "https://www.jumia.com.ng/kedi-vigor-essential-capsule-111162791.html",
                    blogLink: "https://blog.example.com/vigor-essential-benefits",
                    qna: [
                        { question: "When is the best time to take Vigor Essential?", answer: "It's usually recommended to take it in the morning or early afternoon to benefit from its energy-boosting effects throughout the day." },
                        { question: "Can women take Vigor Essential?", answer: "While often marketed for men, women can also take it. However, always check the specific product's recommendations." }
                    ]
                },
                {
                    name: "Cordy Active",
                    keywords: /cordy active|respiratory health|lung support/i,
                    image: "https://placehold.co/150x150/ADD8E6/000000?text=Cordy+Active",
                    description: "Supports respiratory and immune health.",
                    price: "₦36,500",
                    buyNowLink: "https://www.jumia.com.ng/kedi-cordy-active-capsule-111162791.html",
                    blogLink: "https://blog.example.com/cordy-active-benefits",
                    qna: [
                        { question: "Is Cordy Active good for asthma?", answer: "Cordy Active can support respiratory function, which may be beneficial for individuals with asthma, but it is not a cure and should be used as a supplement under medical advice." },
                        { question: "What are the main ingredients?", answer: "Cordy Active primarily contains Cordyceps sinensis, a mushroom known for its respiratory benefits." }
                    ]
                },
                {
                    name: "Magilim",
                    keywords: /magilim|weight loss|appetite control/i,
                    image: "https://placehold.co/150x150/90EE90/000000?text=Magilim",
                    description: "Aids in weight management and appetite control.",
                    price: "₦30,000",
                    buyNowLink: "https://www.jumia.com.ng/kedi-magilim-capsule-111162791.html",
                    blogLink: "https://blog.example.com/magilim-benefits",
                    qna: [
                        { question: "How does Magilim work for weight loss?", answer: "Magilim contains ingredients that help create a feeling of fullness, reducing overall food intake and supporting weight management." },
                        { question: "Are there any dietary restrictions with Magilim?", answer: "It's always best to combine Magilim with a balanced diet and regular exercise for optimal results." }
                    ]
                },
                {
                    name: "Blood Fat Reducing",
                    keywords: /blood fat reducing|cholesterol|heart health/i,
                    image: "https://placehold.co/150x150/FF6347/FFFFFF?text=Blood+Fat+Reducing",
                    description: "Helps reduce blood fat and supports cardiovascular health.",
                    price: "₦33,000",
                    buyNowLink: "https://www.jumia.com.ng/kedi-blood-fat-reducing-capsule-111162791.html",
                    blogLink: "https://blog.example.com/blood-fat-reducing-benefits",
                    qna: [
                        { question: "Is Blood Fat Reducing suitable for diabetics?", answer: "Individuals with diabetes should consult their doctor before taking this product, as it may affect blood sugar levels." },
                        { question: "How long until I see results?", answer: "Results vary, but consistent use along with a healthy lifestyle is key. Regular check-ups with your doctor are recommended." }
                    ]
                }
            ];

            // === Health Conditions Data (separated) ===
            const healthConditions = [
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
                    recommendedProducts: [], // No Kedi products directly treat Typhoid, only support recovery
                    qna: [
                        { question: "Is Typhoid contagious?", answer: "Yes, Typhoid fever is highly contagious and spreads through contaminated food and water." },
                        { question: "How long does Typhoid last?", answer: "Without treatment, symptoms can last for weeks or even months. With proper treatment, recovery can be quicker." }
                    ]
                },
                {
                    name: "Malaria",
                    keywords: /malaria|fever|chills|headache|vomiting/i,
                    symptoms: "Fever, chills, headache, muscle aches, fatigue, nausea, vomiting, diarrhea. Can be severe.",
                    dosage: [
                        "Requires antimalarial drugs prescribed by a doctor (e.g., Artemether-Lumefantrine, Arthesunate).",
                        "Complete the full course of medication.",
                        "Rest and stay hydrated.",
                        "Seek immediate medical attention if symptoms worsen."
                    ],
                    recommendedProducts: [], // No Kedi products directly treat Malaria
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
                    keywords: /hypertension|high blood pressure/i,
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
                }
            ];


            // === FAQs ===
            const faqs = [
                { q: /how can i order|where to buy|buy products/i, a: "You can place an order directly on our website, or through our mobile app. You can also click the 'Buy Now' links provided for each product." },
                { q: /shipping information|delivery time/i, a: "Shipping usually takes 3-5 business days depending on your location within Nigeria. International shipping times vary." },
                { q: /return policy|refunds/i, a: "We have a 30-day return policy for unopened products. Please see our website for more details or contact our support team." },
                { q: /contact support|customer service|helpline/i, a: "You can contact our support team via email at support@kedihealthcare.com or call us at +234 800 123 4567. You can also reach us via WhatsApp using the link below." },
                { q: /what is kedi healthcare|about kedi healthcare/i, a: "Kedi Healthcare is a leading traditional Chinese medicine (TCM) company in Nigeria, dedicated to providing high-quality herbal and nutritional supplements for various health needs. We focus on natural solutions for overall well-being." },
                { q: /kedi healthcare products|what products do you offer/i, a: "Kedi Healthcare offers a wide range of natural health products, including supplements for immune support (Reishi), male sexual health (Re-Vive), kidney health (Golden Six), digestive health (Colon Cleanse), energy (Vigor Essential), respiratory health (Cordy Active), weight management (Magilim), and cardiovascular health (Blood Fat Reducing)." },
                { q: /kedi healthcare products list|list all products/i, a: "Certainly! Here is a list of Kedi Healthcare products: Reishi, Re-Vive, Golden Six, Colon Cleanse, Vigor Essential, Cordy Active, Magilim, and Blood Fat Reducing. You can ask for details on any of these." },
                { q: /kedi healthcare products details|tell me about your products/i, a: "To get details about a specific product, please ask me about it by name, e.g., 'Tell me about Reishi' or 'What is Re-Vive?'" },
                { q: /kedi healthcare product prices|how much are your products/i, a: "Product prices vary. For example, Reishi is ₦35,000, and Re-Vive is ₦39,000. You can ask me about the price of a specific product." }
            ];

            // === Chatbot Responses for general queries ===
            const chatbotResponses = [
                { keywords: /general health tips|health advice/i, answer: "Maintaining good health involves several key practices. Here are some general health tips:" },
            ];

            // === Health Tips ===
            const generalHealthTips = [
                "Drink plenty of water daily to stay hydrated.",
                "Exercise regularly (at least 30 minutes most days) and stay active.",
                "Get at least 7–8 hours of quality sleep per night.",
                "Eat a balanced and nutritious diet rich in fruits, vegetables, and whole grains.",
                "Practice stress-reducing techniques like meditation, yoga, or deep breathing.",
                "Limit processed foods, sugary drinks, and unhealthy fats.",
                "Avoid smoking and excessive alcohol consumption.",
                "Get regular medical check-ups and screenings."
            ];

            // === UI Element References ===
            let openBtn, closeBtn, chatbotWindow, chatbotForm, chatbotInput, chatbotMessages, sendBtn;

            let currentSuggestions = [];
            let waitingForSymptoms = false; // Flag to manage symptom checker state
            let waitingForHealthGoal = false; // New flag for personalized recommendations

            document.addEventListener('DOMContentLoaded', () => {
                openBtn = document.getElementById('open-chatbot-btn');
                closeBtn = document.getElementById('close-chatbot-btn');
                chatbotWindow = document.getElementById('chatbot-window');
                chatbotForm = document.getElementById('chatbot-form'); // This might be null if not present, but it's okay if using sendBtn click
                chatbotInput = document.getElementById('chatbot-input');
                chatbotMessages = document.getElementById('chatbot-messages');
                sendBtn = document.getElementById('send-btn'); // Get the new send button

                // Event Listeners
                openBtn.addEventListener('click', () => {
                    chatbotWindow.classList.remove('hidden');
                    chatbotWindow.classList.add('open');
                    // Initial welcome message and suggestions
                    if (chatbotMessages.children.length === 0) {
                        sendBotMessageWithTyping("Hello! I'm your Kedi Healthcare assistant. How can I help you today?");
                        displaySuggestions([
                            { text: "List all products", type: "text" },
                            { text: "Tell me about Diabetes", type: "text" },
                            { text: "General health tips", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" }, // New suggestion button
                            { text: "Contact support", type: "text" }
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

                // Automatically open chatbot and send initial message on page load
                chatbotWindow.classList.add('open');
                if (chatbotMessages.children.length === 0) {
                    sendBotMessageWithTyping("Hello! I'm your Kedi Healthcare assistant. How can I help you today?");
                    displaySuggestions([
                        { text: "List all products", type: "text" },
                        { text: "Tell me about Diabetes", type: "text" },
                        { text: "General health tips", type: "text" },
                        { text: "Symptom Checker ✨", type: "text" },
                        { text: "Personalized Product Recommendation ✨", type: "text" },
                        { text: "Contact support", type: "text" }
                    ]);
                }


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
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
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

                        button.addEventListener('click', () => {
                            addMessage('user', suggestion.text); // Show user's "click" as a message
                            chatbotInput.value = ''; // Clear input after suggestion click
                            respondToUser(suggestion.text);
                            // Remove suggestions after one is clicked
                            suggestionsContainer.remove();
                            currentSuggestions = [];
                        });
                        suggestionsContainer.appendChild(button);
                    });
                    chatbotMessages.appendChild(suggestionsContainer);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
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
                                suggestions.push({ text: `Buy ${item.name}`, type: "text" });
                                suggestions.push({ text: `More about Kedi products`, type: "text" });
                            } else {
                                responseHtml += `<p class="mt-4 text-gray-600">No specific Q&A available for ${item.name} at the moment.</p>`;
                            }
                            suggestions.push({ text: `List all products`, type: "text" });
                            suggestions.push({ text: `General health tips`, type: "text" });
                            suggestions.push({ text: "Symptom Checker ✨", type: "text" });
                            suggestions.push({ text: "Personalized Product Recommendation ✨", type: "text" });
                        }
                    } else if (type === 'condition') {
                        item = healthConditions.find(c => c.name === name);
                        if (item) {
                            responseHtml += `<h4 class="text-lg font-semibold text-green-700 mb-2">${item.name}</h4>`;
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
                            suggestions.push({ text: `General health tips`, type: "text" });
                            suggestions.push({ text: "Symptom Checker ✨", type: "text" });
                            suggestions.push({ text: "Personalized Product Recommendation ✨", type: "text" });
                        }
                    }

                    if (responseHtml) {
                        await sendBotMessageWithTyping(responseHtml);
                        if (suggestions.length > 0) {
                            displaySuggestions(suggestions);
                        }
                    } else {
                        await sendBotMessageWithTyping("I couldn't find detailed information for that request. Please try again or ask a different question.");
                    }
                }

                /**
                 * Finds matching products or health conditions based on the user query.
                 * @param {string} query - The user's input query.
                 * @returns {object} An object containing arrays of matched products and conditions.
                 */
                function findMatches(query) {
                    const lowerQuery = query.toLowerCase();
                    const matchedProducts = products.filter(p => p.keywords.test(lowerQuery) || p.name.toLowerCase().includes(lowerQuery));
                    const matchedConditions = healthConditions.filter(c => c.keywords.test(lowerQuery) || c.name.toLowerCase().includes(lowerQuery));
                    return { matchedProducts, matchedConditions };
                }

                /**
                 * Calls the Gemini API with a given prompt.
                 * @param {string} promptText - The text to send to the LLM.
                 * @returns {Promise<string>} The response text from the LLM.
                 */
                async function callGeminiAPI(promptText) {
                    try {
                        const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
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
                            return result.candidates[0].content.parts[0].text;
                        } else {
                            console.error("Gemini API returned an unexpected structure:", result);
                            return "I apologize, I couldn't generate a response at this time. Please try again later.";
                        }
                    } catch (error) {
                        console.error("Error calling Gemini API:", error);
                        return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
                    }
                }

                /**
                 * Handles the symptom checker logic using Gemini API.
                 * @param {string} symptoms - The user's described symptoms.
                 */
                async function handleSymptomChecker(symptoms) {
                    await sendBotMessageWithTyping("Analyzing your symptoms and consulting my knowledge base...");

                    const prompt = `You are a helpful Kedi Healthcare chatbot. Based on the user's symptoms, suggest potential health conditions and relevant Kedi Healthcare products that might offer *support*. Always include a disclaimer that this is not medical advice and they should consult a doctor.

Here is a list of Kedi Healthcare products and their descriptions:
${JSON.stringify(products, null, 2)}

Here is a list of common health conditions, their symptoms, and recommended approaches (Kedi products are for support, not direct treatment):
${JSON.stringify(healthConditions, null, 2)}

User's symptoms: "${symptoms}"

Please provide:
1. Potential health conditions based on symptoms.
2. Kedi Healthcare products that may offer support for these conditions (if any).
3. A clear disclaimer about consulting a doctor.`;

                    const llmResponse = await callGeminiAPI(prompt);
                    await sendBotMessageWithTyping(llmResponse);
                    waitingForSymptoms = false; // Reset flag

                    displaySuggestions([
                        { text: "List all products", type: "text" },
                        { text: "General health tips", type: "text" },
                        { text: "Personalized Product Recommendation ✨", type: "text" },
                        { text: "Contact support", type: "text" }
                    ]);
                }

                /**
                 * Handles the personalized product recommendation logic using Gemini API.
                 * @param {string} healthGoal - The user's described health goal.
                 */
                async function handlePersonalizedRecommendation(healthGoal) {
                    await sendBotMessageWithTyping("Understanding your health goals and finding the best Kedi products for you...");

                    const prompt = `You are a helpful Kedi Healthcare chatbot. Based on the user's health goal, suggest relevant Kedi Healthcare products that might offer *support*. Explain why each product is suitable. Always include a disclaimer that this is not medical advice and they should consult a doctor.

Here is a list of Kedi Healthcare products and their descriptions:
${JSON.stringify(products, null, 2)}

User's health goal: "${healthGoal}"

Please provide:
1. Kedi Healthcare products that may offer support for this health goal.
2. A brief explanation for each recommended product.
3. A clear disclaimer about consulting a doctor.`;

                    const llmResponse = await callGeminiAPI(prompt);
                    await sendBotMessageWithTyping(llmResponse);
                    waitingForHealthGoal = false; // Reset flag

                    displaySuggestions([
                        { text: "List all products", type: "text" },
                        { text: "General health tips", type: "text" },
                        { text: "Symptom Checker ✨", type: "text" },
                        { text: "Contact support", type: "text" }
                    ]);
                }

                /**
                 * Responds to the user's message based on predefined rules and data.
                 * @param {string} userMsg - The user's input message.
                 */
                async function respondToUser(userMsg) {
                    const normalizedMsg = userMsg.toLowerCase().trim();

                    // If waiting for symptoms, process the input as symptoms
                    if (waitingForSymptoms) {
                        await handleSymptomChecker(userMsg);
                        return;
                    }

                    // If waiting for health goal, process the input as health goal
                    if (waitingForHealthGoal) {
                        await handlePersonalizedRecommendation(userMsg);
                        return;
                    }

                    // 1. Check for greetings
                    const greetings = /^(hi|hello|hey|greetings|good day|how are you|whats up|sup|yo|hola|bonjour|konnichiwa|namaste)\b/i;
                    if (greetings.test(normalizedMsg)) {
                        await sendBotMessageWithTyping("Hello there! How can I assist you today? Feel free to ask about health conditions, products, or general inquiries.");
                        displaySuggestions([
                            { text: "List all products", type: "text" },
                            { text: "Tell me about Diabetes", type: "text" },
                            { text: "General health tips", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" }, // New suggestion button
                            { text: "Contact support", type: "text" }
                        ]);
                        return;
                    }

                    // 2. Check for "list all products"
                    if (normalizedMsg.includes("list all products") || normalizedMsg.includes("show me all products") || normalizedMsg.includes("what products do you have")) {
                        await sendBotMessageWithTyping("Certainly! Here are all our Kedi Healthcare products:");
                        for (const product of products) {
                            await sendBotMessageWithTyping(createProductCardHtml(product));
                        }
                        displaySuggestions([
                            { text: "Tell me about Reishi", type: "text" },
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" },
                            { text: "General health tips", type: "text" }
                        ]);
                        return;
                    }


                    // 3. Check for Symptom Checker trigger
                    if (normalizedMsg.includes("symptom checker") || normalizedMsg.includes("check my symptoms") || normalizedMsg.includes("what product for my symptoms")) {
                        await sendBotMessageWithTyping("Please describe your symptoms, and I'll do my best to suggest potential conditions and supporting Kedi Healthcare products. Remember, this is not medical advice.");
                        waitingForSymptoms = true; // Set flag to true
                        return;
                    }

                    // 4. Check for Personalized Product Recommendation trigger
                    if (normalizedMsg.includes("personalized product recommendation") || normalizedMsg.includes("recommend product") || normalizedMsg.includes("health goal")) {
                        await sendBotMessageWithTyping("I can help with that! Please tell me your health goal or what you are looking to improve (e.g., 'boost energy', 'support digestion', 'improve sleep').");
                        waitingForHealthGoal = true; // Set flag to true
                        return;
                    }

                    // 5. Check for specific product/health condition details or Q&A
                    let detailedMatchFound = false;
                    for (const product of products) {
                        const productKeywords = new RegExp(`(tell me about|what is|q&a about|qna about|details on|info on|${product.name})\\s*${product.name.toLowerCase()}|${product.name.toLowerCase()}\\s*(q&a|qna|details|info)`, 'i');
                        if (productKeywords.test(normalizedMsg) || normalizedMsg === product.name.toLowerCase()) {
                            await displayDetailedInfo('product', product.name);
                            detailedMatchFound = true;
                            break;
                        }
                    }
                    if (detailedMatchFound) return;

                    for (const condition of healthConditions) {
                        const conditionKeywords = new RegExp(`(tell me about|what is|q&a about|qna about|details on|info on|${condition.name})\\s*${condition.name.toLowerCase()}|${condition.name.toLowerCase()}\\s*(q&a|qna|details|info)`, 'i');
                        if (conditionKeywords.test(normalizedMsg) || normalizedMsg === condition.name.toLowerCase()) {
                            await displayDetailedInfo('condition', condition.name);
                            detailedMatchFound = true;
                            break;
                        }
                    }
                    if (detailedMatchFound) return;

                    // 6. Check for general FAQs
                    for (const faq of faqs) {
                        if (faq.q.test(normalizedMsg)) {
                            await sendBotMessageWithTyping(faq.a);
                            if (faq.q.source.includes('contact support')) { // Special handling for contact support
                                const whatsappLinkHtml = `
                                    <a href="${WHATSAPP_BUSINESS_LINK}" target="_blank" class="whatsapp-link-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.6-3.882-1.6-6.063c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12c-1.933 0-3.812-.579-5.442-1.657l-6.082 1.626zm18.704-5.429c-.198-.307-1.334-.676-1.86-.916-.525-.24-.904-.36-1.283.36-.379.72-.485.916-.964.916-.481 0-.964-.12-.198-.36.66-.24 1.86-1.816 2.325-2.583.464-.767.333-1.416-.165-2.064-.5-.648-1.283-1.547-1.81-2.072-.526-.526-.648-.787-.033-1.205.615-.418 1.579-.922 2.104-.922.526 0 1.052.198 1.283.496.23.297.307.72.082 1.204-.225.483-.526.916-.757 1.188-.231.272-.462.36-.12.629.34.27.97.877 1.674 1.334.704.457 1.254.654 1.6.849.34.196.571.294.757.389.19.098.381.184.57.265.189.082.381.171.569.249.57.246 1.139.426 1.64.473.502.047 1.205.033 1.64-.311.436-.343.896-.804 1.127-1.163.231-.359.231-.663.165-.787-.066-.124-.198-.307-.297-.495z"/>
                                        </svg>
                                        Chat on WhatsApp
                                    </a>
                                `;
                                await sendBotMessageWithTyping(whatsappLinkHtml);
                            }
                            displaySuggestions([
                                { text: "List all products", type: "text" },
                                { text: "General health tips", type: "text" },
                                { text: "Symptom Checker ✨", type: "text" },
                                { text: "Personalized Product Recommendation ✨", type: "text" },
                                { text: "Tell me about Reishi", type: "text" }
                            ]);
                            return;
                        }
                    }

                    // 7. Check for general health tips
                    if (chatbotResponses[0].keywords.test(normalizedMsg)) {
                        await sendBotMessageWithTyping(chatbotResponses[0].answer);
                        generalHealthTips.forEach(async (tip, index) => {
                            await sendBotMessageWithTyping(`- ${tip}`);
                            if (index === generalHealthTips.length - 1) {
                                displaySuggestions([
                                    { text: "List all products", type: "text" },
                                    { text: "Tell me about Diabetes", type: "text" },
                                    { text: "Symptom Checker ✨", type: "text" },
                                    { text: "Personalized Product Recommendation ✨", type: "text" },
                                    { text: "Contact support", type: "text" }
                                ]);
                            }
                        });
                        return;
                    }

                    // 8. If no specific match, try to find product/condition by name/keyword
                    const { matchedProducts, matchedConditions } = findMatches(normalizedMsg);

                    if (matchedProducts.length > 0 && matchedConditions.length === 0) {
                        if (matchedProducts.length === 1) {
                            await displayDetailedInfo('product', matchedProducts[0].name);
                        } else {
                            let response = "I found several products matching your query: ";
                            matchedProducts.forEach((p, index) => {
                                response += `${p.name}${index < matchedProducts.length - 1 ? ', ' : '.'}`;
                            });
                            response += " Which one would you like to know more about?";
                            await sendBotMessageWithTyping(response);
                            const productSuggestions = matchedProducts.map(p => ({ text: p.name, type: "text" }));
                            displaySuggestions([...productSuggestions, { text: "Symptom Checker ✨", type: "text" }, { text: "Personalized Product Recommendation ✨", type: "text" }]);
                        }
                        return;
                    }

                    if (matchedConditions.length > 0 && matchedProducts.length === 0) {
                        if (matchedConditions.length === 1) {
                            await displayDetailedInfo('condition', matchedConditions[0].name);
                        } else {
                            let response = "I found several health conditions matching your query: ";
                            matchedConditions.forEach((c, index) => {
                                response += `${c.name}${index < matchedConditions.length - 1 ? ', ' : '.'}`;
                            });
                            response += " Which one would you like to know more about?";
                            await sendBotMessageWithTyping(response);
                            const conditionSuggestions = matchedConditions.map(c => ({ text: c.name, type: "text" }));
                            displaySuggestions([...conditionSuggestions, { text: "Symptom Checker ✨", type: "text" }, { text: "Personalized Product Recommendation ✨", type: "text" }]);
                        }
                        return;
                    }

                    if (matchedProducts.length > 0 && matchedConditions.length > 0) {
                        let response = "I found both products and health conditions related to your query. Could you please specify if you're looking for a product or a health condition?";
                        await sendBotMessageWithTyping(response);
                        const combinedSuggestions = [
                            ...matchedProducts.map(p => ({ text: `Tell me about ${p.name}`, type: "text" })),
                            ...matchedConditions.map(c => ({ text: `Tell me about ${c.name}`, type: "text" })),
                            { text: "Symptom Checker ✨", type: "text" },
                            { text: "Personalized Product Recommendation ✨", type: "text" }
                        ];
                        displaySuggestions(combinedSuggestions);
                        return;
                    }

                    // 9. Default fallback
                    await sendBotMessageWithTyping("I'm sorry, I didn't understand that. Could you please rephrase your question or ask about our products, health conditions, or general inquiries?");
                    displaySuggestions([
                        { text: "List all products", type: "text" },
                        { text: "Tell me about Malaria", type: "text" },
                        { text: "General health tips", type: "text" },
                        { text: "Symptom Checker ✨", type: "text" },
                        { text: "Personalized Product Recommendation ✨", type: "text" },
                        { text: "Contact support", type: "text" }
                    ]);
                }

                /**
                 * Handles sending a message from the user.
                 */
                function sendMessage() {
                    const userMessage = chatbotInput.value.trim();
                    if (userMessage) {
                        addMessage("user", userMessage);
                        chatbotInput.value = ""; // Clear input immediately
                        // Remove any existing suggestions before responding
                        const existingSuggestions = chatbotMessages.querySelector('.suggestions-container');
                        if (existingSuggestions) {
                            existingSuggestions.remove();
                            currentSuggestions = [];
                        }
                        respondToUser(userMessage);
                    }
                }
            });
        })();
