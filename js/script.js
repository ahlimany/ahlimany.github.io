// --- Global State and Utility ---
const defaultLang = 'en';
let currentLang = localStorage.getItem('portfolioLang') || defaultLang;
let translations = {}; // Will be populated by lang files

// Helper function for DOM query
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// --- Language Functions ---

// Loads translations from the global object (en_lang, az_lang)
function loadTranslations() {
    // Assuming en_lang and az_lang are globally available from the script imports
    translations['en'] = typeof en_lang !== 'undefined' ? en_lang : {};
    translations['az'] = typeof az_lang !== 'undefined' ? az_lang : {};
}

// Applies translation based on the currentLang
function setLanguage(lang) {
    if (!translations[lang]) return;

    // Update all elements with data-translate attribute
    $$('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // Handle special cases
    document.title = translations[lang]['seoTitle'] || document.title;
    
    // Update contact links
    const emailLink = $('[href^="mailto:ahliman.abbasov@email.com"]');
    if (emailLink && lang === 'az') {
        emailLink.href = 'mailto:ahliman.abbasov@email.com?subject=Portfolio%20Sorğusu';
    } else if (emailLink && lang === 'en') {
        emailLink.href = 'mailto:ahliman.abbasov@email.com?subject=Portfolio%20Inquiry';
    }

    // Re-render data-driven sections to ensure internal text is correct
    renderWriteups();
    renderProjects();

    currentLang = lang;
    localStorage.setItem('portfolioLang', lang);
    $('#lang-toggle').textContent = lang === 'en' ? 'AZ' : 'EN';
}

// Toggle handler
function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'az' : 'en';
    setLanguage(newLang);
}

// --- Typing Animation (Home Section) ---

const typeEffect = async (element, text, delay = 50, pause = 1000) => {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    await new Promise(resolve => setTimeout(resolve, pause));
};

const initTypingEffect = async () => {
    const line1 = $('#typing-line-1');
    const line2 = $('#typing-line-2');
    const line3 = $('#typing-line-3');
    
    // Reset content
    line1.textContent = '> whoami';
    line2.textContent = '';
    line3.classList.add('cursor');
    line3.textContent = '';

    // Typing sequence
    await typeEffect(line2, 'Ahliman Abbasov', 80, 500);
    await typeEffect(line3, 'SOC Analyst | Threat Hunter | Blue Team Defender', 40, 0);
    line3.classList.remove('cursor'); // Stop blinking after animation
    
    // Show explore button
    $('.explore-btn').style.display = 'inline-block';
};


// --- Data Rendering (Writeups and Projects) ---

// Writeups: Render cards from global writeups_data
function renderWriteups() {
    const container = $('#writeups-grid');
    container.innerHTML = ''; // Clear previous content

    // Assuming writeups_data is globally available from the script import
    const data = typeof writeups_data !== 'undefined' ? writeups_data : [];

    data.forEach(item => {
        const title = item.title[currentLang] || item.title[defaultLang];
        const summary = item.summary[currentLang] || item.summary[defaultLang];

        const card = document.createElement('div');
        card.className = 'card writeup-card';
        card.innerHTML = `
            <h4>${title}</h4>
            <p>${summary}</p>
            <div class="card-actions">
                <button class="terminal-btn read-more-btn" data-id="${item.id}">${translations[currentLang]['cardReadMore']}</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Projects: Render cards from hardcoded data (or a separate file if needed)
function renderProjects() {
    const container = $('#projects-grid');
    container.innerHTML = ''; // Clear previous content

    // Note: Projects data is small, so it's included here.
    const projects_data = [
        {
            id: 'proj1',
            title: { en: 'SIEM Log Analyzer', az: 'SIEM Loq Təhlilçisi' },
            description: { 
                en: 'Python script to parse, normalize, and analyze custom log formats before feeding them into a SIEM system.',
                az: 'SIEM sisteminə daxil etməzdən əvvəl xüsusi loq formatlarını təhlil etmək, normallaşdırmaq üçün Python skripti.'
            },
            github: 'https://github.com/ahliman-code/siem-log-analyzer'
        },
        {
            id: 'proj2',
            title: { en: 'Blue Team Honeypot', az: 'Mavi Komanda Bal Küpü' },
            description: {
                en: 'Low-interaction honeypot simulating common network services (SSH, FTP) for early threat intelligence gathering.',
                az: 'Erkən təhdid kəşfiyyatı üçün ümumi şəbəkə xidmətlərini (SSH, FTP) simulyasiya edən aşağı-interaktiv bal küpü.'
            },
            github: 'https://github.com/ahliman-code/blue-honeypot'
        }
    ];

    projects_data.forEach(item => {
        const title = item.title[currentLang] || item.title[defaultLang];
        const description = item.description[currentLang] || item.description[defaultLang];
        
        const card = document.createElement('div');
        card.className = 'card project-card';
        card.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
            <div class="card-actions">
                <a href="${item.github}" target="_blank" class="terminal-btn">${translations[currentLang]['cardGitHub']}</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- Modal Functionality ---

function setupModal() {
    const modal = $('#writeup-modal');
    const span = $('.close-btn');

    // Close modal when X is clicked
    span.onclick = () => modal.style.display = 'none';

    // Close modal when clicking outside of it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    
    // Open modal handler attached to the writeups grid
    $('#writeups-grid').addEventListener('click', (e) => {
        if (e.target.classList.contains('read-more-btn')) {
            const itemId = e.target.getAttribute('data-id');
            const item = writeups_data.find(w => w.id === itemId);

            if (item) {
                const title = item.title[currentLang] || item.title[defaultLang];
                const content = item.content[currentLang] || item.content[defaultLang];
                const source = item.source || 'N/A';

                $('#modal-title').textContent = title;
                // Simple way to handle paragraphs in the modal content
                $('#modal-body').innerHTML = content.split('\n').map(p => `<p>${p}</p>`).join(''); 
                $('.modal-source').textContent = `${translations[currentLang]['modalSource']} ${source}`;
                
                modal.style.display = 'block';
            }
        }
    });
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load translations and set initial language
    loadTranslations();
    setLanguage(currentLang);
    
    // 2. Set up event listeners
    $('#lang-toggle').addEventListener('click', toggleLanguage);
    setupModal();
    
    // 3. Start the typing effect
    initTypingEffect();
});