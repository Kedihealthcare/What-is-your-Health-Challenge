 <script>
      // Chatbot open/close logic
      const openBtn = document.getElementById('open-chatbot-btn');
      const closeBtn = document.getElementById('close-chatbot-btn');
      const chatbotWindow = document.getElementById('chatbot-window');
      openBtn.onclick = () => chatbotWindow.style.display = 'flex';
      closeBtn.onclick = () => chatbotWindow.style.display = 'none';

      // Simple AI chatbot logic (demo, not real AI)
      const chatbotForm = document.getElementById('chatbot-form');
      const chatbotInput = document.getElementById('chatbot-input');
      const chatbotMessages = document.getElementById('chatbot-messages');
      function addMessage(text, fromUser = false) {
        const msg = document.createElement('div');
        msg.style.margin = fromUser ? '8px 0 8px auto' : '8px auto 8px 0';
        msg.style.background = fromUser ? '#27ae60' : '#e0f7ea';
        msg.style.color = fromUser ? '#fff' : '#222';
        msg.style.padding = '10px 14px';
        msg.style.borderRadius = '16px';
        msg.style.maxWidth = '80%';
        msg.style.textAlign = 'left';
        msg.textContent = text;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
      chatbotForm.onsubmit = function(e) {
        e.preventDefault();
        const userMsg = chatbotInput.value.trim();
        if (!userMsg) return;
        addMessage(userMsg, true);
        chatbotInput.value = '';
        setTimeout(() => {
          // Get current greeting based on time
          const now = new Date();
          const hour = now.getHours();
          let greeting = "Hello";
          if (hour < 12) greeting = "Good morning";
          else if (hour < 18) greeting = "Good afternoon";
          else greeting = "Good evening";

          let reply = `${greeting}! I'm here to help with your Reishi and health questions.`;

          // Health challenge Q&A
          if (/health challenge|challenge ideas|wellness challenge/i.test(userMsg)) {
            reply = "Here are some health challenges you can try:\n" +
              "1. 7-Day Hydration Challenge: Drink at least 8 glasses of water daily.\n" +
              "2. 10,000 Steps a Day Challenge: Track your steps for a week.\n" +
              "3. Sugar-Free Week: Avoid added sugars for 7 days.\n" +
              "4. Mindful Meditation: Practice 10 minutes of meditation each day.\n" +
              "5. Sleep Reset: Aim for 7-8 hours of sleep nightly for a week.\n" +
              "Ask me about any of these for more details!";
          } else if (/hydration/i.test(userMsg)) {
            reply = "Hydration Challenge: Drink at least 8 glasses of water each day for 7 days. Track your progress and notice how you feel!";
          } else if (/step|walk/i.test(userMsg)) {
            reply = "10,000 Steps Challenge: Try to walk at least 10,000 steps every day for a week. Use a pedometer or phone app to track your steps.";
          } else if (/sugar/i.test(userMsg)) {
            reply = "Sugar-Free Week: Avoid foods and drinks with added sugars for 7 days. Focus on whole foods, fruits, and vegetables.";
          } else if (/meditation|mindful/i.test(userMsg)) {
            reply = "Mindful Meditation Challenge: Set aside 10 minutes each day for meditation or deep breathing. This can help reduce stress and improve focus.";
          } else if (/sleep/i.test(userMsg)) {
            reply = "Sleep Reset Challenge: Aim for 7-8 hours of quality sleep each night for a week. Try to go to bed and wake up at the same time daily.";
          }else if (/can reishi cure|treat infection/i.test(userMsg)) {
            reply = "Yes,following prescribed usage.";
          }
            // General health questions
            else if (/health|wellness/i.test(userMsg)) {
                reply = `${greeting}! I'm here to help with your health and wellness questions. Ask me anything!`;
            } else if (/benefit|good for|help/i.test(userMsg)) {
                reply = `${greeting}! Reishi may help with immune support, stress reduction, better sleep, and overall energy.`;
            } else if (/where.*buy|purchase/i.test(userMsg)) {
                reply = `${greeting}! You can buy Reishi supplements from reputable health stores or online at kedihealthcare.com.`;
            } else if (/article|news|update|latest|blog/i.test(userMsg)) {
                reply = `${greeting}! Here are the latest articles and updates about Reishi:\n` +
                "• Reishi & Immunity: What the Latest Research Shows (June 1, 2025)\n" +
                "• Can Reishi Help with Stress & Sleep? (May 28, 2025)\n" +
                "• How to Choose a Quality Reishi Supplement (May 20, 2025)\n" +
                "You can read more on our blog or ask about any topic above!";
            }
          // Existing Reishi Q&A
          else if (/what is reishi|about reishi/i.test(userMsg)) {
            reply = `${greeting}! Reishi is a medicinal mushroom (Ganoderma lucidum) known for supporting immunity, vitality, and overall wellness.`;
          } else if (/immune|immunity/i.test(userMsg)) {
            reply = `${greeting}! Reishi may help support your immune system and overall health.`;
          } else if (/energy|tired|fatigue/i.test(userMsg)) {
            reply = `${greeting}! Many users take Reishi to help with energy and reduce fatigue.`;
          } else if (/stress|anxiety/i.test(userMsg)) {
            reply = `${greeting}! Reishi is considered an adaptogen and may help your body manage stress.`;
          } else if (/side effect|safe|danger/i.test(userMsg)) {
            reply = `${greeting}! Reishi is generally safe, but some may experience mild side effects like digestive upset or dry mouth. Always consult your healthcare provider before use.`;
          } else if (/how.*use|dosage|take/i.test(userMsg)) {
            reply = `${greeting}! The typical dosage is 2 capsules daily with water, preferably in the morning. Follow the product instructions or consult your doctor.`;
          } else if (/benefit|good for|help/i.test(userMsg)) {
            reply = `${greeting}! Reishi may help with immune support, stress reduction, better sleep, and overall energy.`;
          } else if (/where.*buy|purchase/i.test(userMsg)) {
            reply = `${greeting}! You can buy Reishi supplements from reputable health stores or online at kedihealthcare.com.`;
          } else if (/article|news|update|latest|blog/i.test(userMsg)) {
            reply = `${greeting}! Here are the latest articles and updates about Reishi:\n` +
              "• Reishi & Immunity: What the Latest Research Shows (June 1, 2025)\n" +
              "• Can Reishi Help with Stress & Sleep? (May 28, 2025)\n" +
              "• How to Choose a Quality Reishi Supplement (May 20, 2025)\n" +
              "You can read more on our blog or ask about any topic above!";
          }

          addMessage(reply, false);
        }, 700);
      };
    </script>

