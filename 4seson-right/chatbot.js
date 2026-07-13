/**
 * 4 Seasons Right Services - Interactive Chatbot & Logo/Header Enhancer
 * Dynamically injected into all pages of the website to handle active booking & styled enhancements.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // SECTION 1: Logo & Layout Enhancements (User requested text removal from logo)
    // ----------------------------------------------------
    function enhanceLogos() {
        // Query all logo image instances
        const logos = document.querySelectorAll('img[src="images/logo.jpg"], img[src*="logo.jpg"]');
        
        logos.forEach(img => {
            // Apply standard cropping to hide the text and only show the graphical symbol
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'left center';
            img.style.borderRadius = '0.75rem'; // Rounded corners
            
            // If it is a desktop header logo
            if (img.classList.contains('h-20')) {
                img.classList.remove('w-auto', 'object-contain');
                img.classList.add('w-20');
                img.style.width = '5rem';
                img.style.height = '5rem';
            } 
            // If it is a mobile header or footer logo
            else if (img.classList.contains('h-16')) {
                img.classList.remove('w-auto', 'object-contain');
                img.classList.add('w-16');
                img.style.width = '4rem';
                img.style.height = '4rem';
            } 
            // Fallback for general logo styling
            else {
                img.classList.remove('w-auto', 'object-contain');
                img.style.aspectRatio = '1 / 1';
                img.style.width = img.style.height || '4rem';
            }
        });
    }

    // Run logo enhancement
    enhanceLogos();

    // ----------------------------------------------------
    // SECTION 2: Active Contact / Booking Form Integration
    // ----------------------------------------------------
    function integrateBookingForm() {
        const contactForm = document.getElementById('contact-form');
        const formSuccess = document.getElementById('form-success');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get inputs
                const nameInput = contactForm.querySelector('input[type="text"]');
                const emailInput = contactForm.querySelector('input[type="email"]');
                const phoneInput = contactForm.querySelector('input[type="tel"]');
                const serviceSelect = contactForm.querySelector('select');
                const detailsTextarea = contactForm.querySelector('textarea');
                const submitBtn = contactForm.querySelector('button[type="submit"]');

                if (!nameInput || !phoneInput) return;

                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';

                const payload = {
                    name: nameInput.value,
                    email: emailInput ? emailInput.value : '',
                    phone: phoneInput.value,
                    service: serviceSelect ? serviceSelect.value : 'General Remodeling',
                    details: detailsTextarea ? detailsTextarea.value : '',
                    source: 'Contact Page Form'
                };

                try {
                    const response = await fetch('/api/booking', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });

                    const data = await response.json();

                    if (response.ok && data.success) {
                        contactForm.reset();
                        if (formSuccess) {
                            formSuccess.classList.remove('hidden');
                            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        } else {
                            alert('Thank you! Your estimate request has been received.');
                        }
                    } else {
                        throw new Error(data.message || 'Submission failed');
                    }
                } catch (err) {
                    console.error('Booking Form Error:', err);
                    alert('There was a problem sending your request. Please try calling us directly at (425) 466-5469.');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }
            });
        }
    }

    // Run booking form integration
    integrateBookingForm();

    // ----------------------------------------------------
    // SECTION 3: Premium Floating Chatbot Implementation
    // ----------------------------------------------------
    
    // Inject Chatbot CSS
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        @keyframes chatBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }
        @keyframes chatFadeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dot-bounce {
            animation: chatBounce 1.4s infinite ease-in-out both;
        }
        .dot-bounce:nth-child(1) { animation-delay: -0.32s; }
        .dot-bounce:nth-child(2) { animation-delay: -0.16s; }
        
        .chat-scrollbar::-webkit-scrollbar {
            width: 5px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 99px;
        }
    `;
    document.head.appendChild(styleTag);

    // Create Chatbot Container Elements
    const chatWidget = document.createElement('div');
    chatWidget.id = 'four-seasons-chatbot';
    chatWidget.className = 'fixed bottom-24 right-6 z-50 flex flex-col items-end font-sans';
    
    // Chat Trigger Button
    const chatBtn = document.createElement('button');
    chatBtn.id = 'chatbot-toggle-btn';
    chatBtn.className = 'bg-slate-900 hover:bg-slate-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 border-2 border-brand-500 relative group';
    chatBtn.title = 'Chat with us to Book';
    chatBtn.innerHTML = `
        <span class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-ping"></span>
        <span class="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
        <i class="fas fa-comments text-xl group-hover:rotate-12 transition-transform"></i>
    `;
    
    // Chat Window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.className = 'hidden w-[350px] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-4 transition-all duration-300 transform origin-bottom-right';
    chatWindow.style.animation = 'chatFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    
    // Chat Header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'accent-gradient text-white p-4 flex items-center justify-between shadow-md';
    chatHeader.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-white/20">
                <img src="images/logo.jpg" alt="Support Avatar" class="w-full h-full object-cover object-left">
            </div>
            <div>
                <h4 class="font-extrabold text-sm tracking-tight">4 Seasons Booking Bot</h4>
                <div class="flex items-center gap-1.5 mt-0.5">
                    <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-white/80">Supervisor Agent</span>
                </div>
            </div>
        </div>
        <button id="chatbot-close-btn" class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition text-white">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Chat Body (Message Container)
    const chatBody = document.createElement('div');
    chatBody.className = 'flex-1 p-4 overflow-y-auto bg-slate-50 chat-scrollbar space-y-3 flex flex-col';
    
    // Chat Footer (Input Area)
    const chatFooter = document.createElement('div');
    chatFooter.className = 'p-3 bg-white border-t border-slate-100 flex items-center gap-2';
    
    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.placeholder = 'Type your response here...';
    chatInput.className = 'flex-1 bg-slate-100 text-slate-800 text-sm px-4 py-2.5 rounded-xl border border-slate-200/50 focus:outline-none focus:border-brand-500 font-medium';
    
    const sendBtn = document.createElement('button');
    sendBtn.className = 'bg-brand-500 hover:bg-brand-600 text-white w-10 h-10 rounded-xl flex items-center justify-center transition active:scale-95';
    sendBtn.innerHTML = '<i class="fas fa-paper-plane text-sm"></i>';
    
    chatFooter.appendChild(chatInput);
    chatFooter.appendChild(sendBtn);
    
    // Assemble Chat Window
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatBody);
    chatWindow.appendChild(chatFooter);
    
    // Assemble Widget
    chatWidget.appendChild(chatWindow);
    chatWidget.appendChild(chatBtn);
    
    document.body.appendChild(chatWidget);

    // ----------------------------------------------------
    // SECTION 4: Conversational AI Engine (Gemini)
    // ----------------------------------------------------
    let chatHistory = [];

    // Helper: Add message bubble
    function addMessage(text, sender = 'bot') {
        const bubbleWrap = document.createElement('div');
        bubbleWrap.className = sender === 'bot' ? 'flex justify-start w-full animate-fade-in' : 'flex justify-end w-full animate-fade-in';
        
        const bubble = document.createElement('div');
        bubble.className = sender === 'bot' 
            ? 'max-w-[85%] bg-white border border-slate-200/80 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-none text-sm font-medium shadow-sm leading-relaxed'
            : 'max-w-[85%] bg-brand-500 text-white px-4 py-3 rounded-2xl rounded-tr-none text-sm font-semibold shadow-md leading-relaxed';
        
        bubble.innerHTML = text;
        bubbleWrap.appendChild(bubble);
        chatBody.appendChild(bubbleWrap);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Helper: Format Markdown bold and bullets to HTML
    function formatMessageText(text) {
        // Escape HTML to prevent injection
        let formatted = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            
        // Render bold text: **text** -> <strong>text</strong>
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        
        // Render lists: lines starting with "- " or "* " -> bullet points
        formatted = formatted.replace(/^\s*[-*]\s+(.*)$/gm, "<li class='ml-4 list-disc'>$1</li>");
        
        // Replace newlines with <br>
        formatted = formatted.replace(/\n/g, "<br>");
        
        return formatted;
    }

    // Helper: Add Typing Indicator
    let typingBubble = null;
    function showTypingIndicator() {
        if (typingBubble) return;
        
        typingBubble = document.createElement('div');
        typingBubble.className = 'flex justify-start w-full';
        typingBubble.innerHTML = `
            <div class="bg-white border border-slate-200/80 px-4 py-3.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm">
                <span class="w-1.5 h-1.5 bg-slate-400 rounded-full dot-bounce"></span>
                <span class="w-1.5 h-1.5 bg-slate-400 rounded-full dot-bounce"></span>
                <span class="w-1.5 h-1.5 bg-slate-400 rounded-full dot-bounce"></span>
            </div>
        `;
        chatBody.appendChild(typingBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTypingIndicator() {
        if (typingBubble) {
            typingBubble.remove();
            typingBubble = null;
        }
    }

    // Bot message trigger with elegant simulated typing delay
    function botSpeak(text, delay = 1000) {
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addMessage(text, 'bot');
        }, delay);
    }

    // Show suggestion chips for fast conversational discovery
    function showSuggestionChips() {
        // Container for chips
        const chipsContainer = document.createElement('div');
        chipsContainer.id = 'chatbot-suggestion-chips';
        chipsContainer.className = 'flex flex-wrap gap-2 mt-2 w-full pl-2 animate-fade-in';
        
        const chips = [
            { text: "📅 Book Free Estimate", reply: "I would like to book a free contracting estimate." },
            { text: "🛠️ What are your services?", reply: "What services do you offer?" },
            { text: "📍 Area & Location", reply: "Where are you based and what areas do you serve?" },
            { text: "📞 Contact supervisor", reply: "Can I have your phone number and working hours?" }
        ];
        
        chips.forEach(chip => {
            const btn = document.createElement('button');
            btn.className = 'bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50/50 text-slate-700 text-[11px] font-bold py-1.5 px-3 rounded-full transition shadow-sm text-left';
            btn.innerText = chip.text;
            btn.addEventListener('click', () => {
                handleUserResponse(chip.reply);
                chipsContainer.remove(); // Remove chips after selection to keep chat clean
            });
            chipsContainer.appendChild(btn);
        });
        
        chatBody.appendChild(chipsContainer);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Primary conversational engine logic via /api/chat
    async function handleUserResponse(input) {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        // Hide suggestion chips if any exist
        const chips = document.getElementById('chatbot-suggestion-chips');
        if (chips) {
            chips.remove();
        }

        // Display user's text bubble
        addMessage(trimmedInput, 'user');

        // Add user message to history
        chatHistory.push({ role: 'user', text: trimmedInput });

        // Show typing indicator
        showTypingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: chatHistory })
            });

            const data = await response.json();
            removeTypingIndicator();

            if (response.ok && data.success) {
                // Add AI's response to history and screen
                chatHistory.push({ role: 'assistant', text: data.text });
                addMessage(formatMessageText(data.text), 'bot');
            } else {
                throw new Error(data.message || 'Chat API Error');
            }
        } catch (err) {
            console.error('AI Chat Error:', err);
            removeTypingIndicator();
            addMessage(`⚠️ **Oops!** I ran into a minor connection glitch. Please call our supervisor line directly at **(425) 466-5469** or email us at **4srsinc@gmail.com** for immediate booking and estimate scheduling!`, 'bot');
        }
    }

    // Initialize first bot message on load
    function initConversation() {
        chatBody.innerHTML = ''; // Clear prior chat
        chatHistory = [];
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            addMessage(`👋 **Hello!** Welcome to **4 Seasons Right Services Inc.**<br><br>I'm your AI Contracting Assistant. I can answer your questions or help you instantly book a **free contracting estimate** via SMTP!<br><br>How can I help you today?`, 'bot');
            showSuggestionChips();
        }, 600);
    }

    // Event Listeners for UI interaction
    chatBtn.addEventListener('click', () => {
        const isHidden = chatWindow.classList.contains('hidden');
        if (isHidden) {
            chatWindow.classList.remove('hidden');
            // If conversation hasn't started, initialize it
            if (chatBody.children.length === 0) {
                initConversation();
            }
        } else {
            chatWindow.classList.add('hidden');
        }
    });

    document.getElementById('chatbot-close-btn').addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // Handle sending message via button or enter key
    function triggerSend() {
        const text = chatInput.value;
        if (text.trim()) {
            chatInput.value = '';
            handleUserResponse(text);
        }
    }

    sendBtn.addEventListener('click', triggerSend);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            triggerSend();
        }
    });
});
