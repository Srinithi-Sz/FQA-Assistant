// ================= FAQ DATA =================

const faqs = [
    { question: "what is computer science", answer: "Computer Science is the study of computers, programming, and computational systems." },

    { question: "what is programming", answer: "Programming is the process of writing instructions that tell a computer what to do." },

    { question: "what is algorithm", answer: "An algorithm is a step-by-step procedure used to solve a problem." },

    { question: "what is data structure", answer: "A data structure is a way of organizing and storing data efficiently." },

    { question: "what is database", answer: "A database is an organized collection of data that can be accessed and managed easily." },

    { question: "what is operating system", answer: "An operating system is system software that manages computer hardware and software resources." },

    { question: "what is compiler", answer: "A compiler translates high-level programming code into machine code." },

    { question: "what is interpreter", answer: "An interpreter executes code line by line." },

    { question: "what is artificial intelligence", answer: "Artificial Intelligence is the simulation of human intelligence in machines." },

    { question: "what is machine learning", answer: "Machine Learning is a branch of AI that allows systems to learn from data." },

    { question: "what is cloud computing", answer: "Cloud computing is the delivery of computing services over the internet." },

    { question: "what is cyber security", answer: "Cyber security protects systems and data from digital attacks." },

    { question: "what is software engineering", answer: "Software Engineering is the process of designing and maintaining software systems." },

    { question: "what is full stack development", answer: "Full stack development involves both front-end and back-end development." },

    { question: "what is networking", answer: "Networking connects computers to share data and resources." }
];

// ================= DOM ELEMENTS =================

const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");

// ================= SEND MESSAGE =================

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    userInput.value = "";

    const reply = findBestMatch(message);
    showTypingEffect(reply);
}

// ================= ADD MESSAGE =================

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// ================= TYPING EFFECT =================

function showTypingEffect(text) {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.innerHTML = `<span class="typing">Typing<span>.</span><span>.</span><span>.</span></span>`;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        typingDiv.innerHTML = "";
        typeText(typingDiv, text);
    }, 1000);
}

function typeText(element, text, index = 0) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        chatBody.scrollTop = chatBody.scrollHeight;
        setTimeout(() => typeText(element, text, index + 1), 25);
    }
}

// ================= SIMILARITY MATCHING =================

 function findBestMatch(userQuestion) {
    userQuestion = userQuestion.toLowerCase();

    let bestScore = 0;
    let bestAnswer = "Sorry, I couldn't understand that. Please ask a valid CSE question.";

    faqs.forEach(faq => {
        const score = similarity(userQuestion, faq.question);
        if (score > bestScore) {
            bestScore = score;
            bestAnswer = faq.answer;
        }
    });

    // 🔥 Important: Minimum threshold
    if (bestScore >= 0.5) {
        return bestAnswer;
    } else {
        return "Sorry, I couldn't understand that. Please ask a valid CSE question.";
    }
}

function similarity(str1, str2) {
    const words1 = str1.split(" ");
    const words2 = str2.split(" ");

    let matches = 0;
    words1.forEach(word => {
        if (words2.includes(word)) matches++;
    });

    return matches / words2.length;
}

// ================= ENTER KEY SUPPORT =================

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// ================= AUTO WELCOME MESSAGE =================

window.onload = function () {
    showTypingEffect("Hello 👋 I am your CSE FAQ Assistant. Ask me any Computer Science related question!");
};