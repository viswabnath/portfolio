// Professional Portfolio JavaScript
// Author: Viswanath Bodasakurthi
// Enhanced with modern features and animations

// Global variables
let currentTerminalLine = 0;
let isTyping = false;
let skillsAnimated = false;

// Terminal commands and responses
const terminalCommands = [
    {
        command: 'whoami',
        output: `<div style="color: #00ff41; margin-bottom: 15px;">
                    <div style="color: #fefe00; font-weight: bold;">👨‍💻 Viswanath Bodasakurthi</div>
                    <div style="color: #00d8ff;">Senior Software Engineer | Full Stack Developer</div>
                    <div style="color: #fff;">Angular Expert • Blockchain Developer • Tech Entrepreneur</div>
                </div>`
    },
    {
        command: 'ls -la skills/',
        output: `<div style="color: #00ff41; margin-bottom: 15px;">
                    <div style="color: #fefe00; font-weight: bold;">🚀 Technical Skills:</div>
                    <div>drwxr-xr-x  frontend/     Angular, React, Ionic, TypeScript</div>
                    <div>drwxr-xr-x  backend/      Node.js, Express.js, REST APIs</div>
                    <div>drwxr-xr-x  blockchain/   Multichain, Smart Contracts, Web3</div>
                    <div>drwxr-xr-x  database/     MongoDB, PostgreSQL, Firebase</div>
                    <div>drwxr-xr-x  devops/       Docker, CI/CD, Git, AWS, Podman</div>
                </div>`
    },
    {
        command: 'cat experience.log',
        output: () => {
            const years = calculateYearsOfExperience();
            return `<div style="color: #00ff41; margin-bottom: 15px;">
                        <div style="color: #fefe00; font-weight: bold;">💼 Professional Journey:</div>
                        <div style="color: #27ca3f;">✓ Senior Software Engineer @ CLARIO (2024-Present)</div>
                        <div style="margin-left: 20px;">→ Leading clinical research applications</div>
                        <div style="color: #27ca3f;">✓ Lead Frontend @ Purple Drive Technologies (2022-2024)</div>
                        <div style="margin-left: 20px;">→ Banking application modernization</div>
                        <div style="color: #27ca3f;">✓ Co-Founder @ Onemark Digital Agency (2017-Present)</div>
                        <div style="margin-left: 20px;">→ 100+ clients served successfully</div>
                    </div>`;
        }
    },
    {
        command: 'grep -r "achievements" portfolio/',
        output: () => {
            const years = calculateYearsOfExperience();
            return `<div style="color: #00ff41; margin-bottom: 15px;">
                        <div style="color: #fefe00; font-weight: bold;">🏆 Key Achievements:</div>
                        <div>• ${years}+ years professional software development</div>
                        <div>• Led teams of 6+ developers</div>
                        <div>• Built 50+ production applications</div>
                        <div>• Founded successful digital agency</div>
                        <div>• IBM Blockchain & Google certifications</div>
                        <div>• 50-60% performance improvements</div>
                    </div>`;
        }
    },
    {
        command: 'curl -X GET contact.json',
        output: `<div style="color: #00ff41; margin-bottom: 15px;">
                    <div style="color: #fefe00; font-weight: bold;">📫 Get In Touch:</div>
                    <div>📧 viswanathbodasakurthi@gmail.com</div>
                    <div>💼 linkedin.com/in/viswabnath</div>
                    <div>🐙 github.com/viswabnath</div>
                    <div>🌐 onemark.co.in</div>
                    <div>📍 Kakinada, India</div>
                </div>`
    },
    {
        command: 'echo "Ready to collaborate!"',
        output: `<div style="color: #00ff41; margin-bottom: 15px;">
                    <div style="color: #27ca3f; font-weight: bold;">🚀 Ready to collaborate!</div>
                    <div style="color: #fff;">Let's build something amazing together!</div>
                    <div style="color: #00d8ff;">Click terminal or press Enter to restart, or try typing commands like 'help', 'skills', 'contact'</div>
                </div>`
    }
];

// Interactive terminal commands
const interactiveCommands = {
    'help': `<div style="color: #00ff41; margin-bottom: 15px;">
                <div style="color: #fefe00; font-weight: bold;">📋 Available Commands:</div>
                <div>whoami          - Display user information</div>
                <div>skills          - Show technical skills</div>
                <div>experience      - View work experience</div>
                <div>contact         - Get contact information</div>
                <div>projects        - List recent projects</div>
                <div>clear           - Clear terminal</div>
                <div>restart         - Restart demo animation</div>
            </div>`,
    'skills': `<div style="color: #00ff41; margin-bottom: 15px;">
                <div style="color: #fefe00; font-weight: bold;">🚀 Technical Expertise:</div>
                <div>Frontend: Angular, React, Ionic, TypeScript, JavaScript</div>
                <div>Backend: Node.js, Express.js, REST APIs</div>
                <div>Blockchain: Multichain, Smart Contracts, Web3</div>
                <div>Database: MongoDB, PostgreSQL, Firebase</div>
                <div>DevOps: Docker, Podman, CI/CD, Git, AWS</div>
            </div>`,
    'experience': () => {
        const years = calculateYearsOfExperience();
        return `<div style="color: #00ff41; margin-bottom: 15px;">
                    <div style="color: #fefe00; font-weight: bold;">💼 ${years}+ Years Experience:</div>
                    <div>🏢 Senior Software Engineer @ CLARIO (2024-Present)</div>
                    <div>🏢 Lead Frontend Developer @ Purple Drive (2022-2024)</div>
                    <div>🏢 Software Developer @ Gariyasi Systems (2021-2022)</div>
                    <div>🚀 Co-Founder @ Onemark Digital (2017-Present)</div>
                </div>`;
    },
    'contact': `<div style="color: #00ff41; margin-bottom: 15px;">
                <div style="color: #fefe00; font-weight: bold;">📫 Let's Connect:</div>
                <div>📧 Email: viswanathbodasakurthi@gmail.com</div>
                <div>💼 LinkedIn: linkedin.com/in/viswabnath</div>
                <div>🐙 GitHub: github.com/viswabnath</div>
                <div>🌐 Website: onemark.co.in</div>
                <div>📍 Location: Kakinada, India</div>
            </div>`,
    'projects': `<div style="color: #00ff41; margin-bottom: 15px;">
                <div style="color: #fefe00; font-weight: bold;">🚀 Featured Projects:</div>
                <div>• Clinical Research Platform (Angular, HIPAA Compliant)</div>
                <div>• Blockchain Supply Chain Solution (Multichain)</div>
                <div>• Banking Application Modernization (Angular 14)</div>
                <div>• Onemark Digital Agency Platform</div>
            </div>`,
    'clear': 'CLEAR_TERMINAL',
    'restart': 'RESTART_DEMO'
};

// Helper function to calculate years of experience
function calculateYearsOfExperience() {
    const startDate = new Date('2017-11-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365.25));
}

// Initialize typewriter effect
function initializeTypewriter() {
    const terminalContent = document.getElementById('terminal-content');
    if (!terminalContent) return;
    
    terminalContent.innerHTML = '';
    currentTerminalLine = 0;
    typeNextCommand();
}

// Type a single command and its output
function typeNextCommand() {
    if (currentTerminalLine >= terminalCommands.length) {
        // All commands typed, add interactive prompt
        addInteractivePrompt();
        return;
    }
    
    const command = terminalCommands[currentTerminalLine];
    const terminalContent = document.getElementById('terminal-content');
    
    // Clear previous content to show one command at a time
    terminalContent.innerHTML = '';
    
    // Add command line
    const commandLine = document.createElement('div');
    commandLine.innerHTML = `<span style="color: #00d8ff;">viswanath@portfolio:~$ </span><span id="typing-command-${currentTerminalLine}"></span>`;
    terminalContent.appendChild(commandLine);
    
    // Type the command
    typeText(command.command, document.getElementById(`typing-command-${currentTerminalLine}`), () => {
        // Add output after command is typed
        setTimeout(() => {
            const outputDiv = document.createElement('div');
            // Handle dynamic outputs (functions) and static outputs (strings)
            const output = typeof command.output === 'function' ? command.output() : command.output;
            outputDiv.innerHTML = output;
            terminalContent.appendChild(outputDiv);
            
            currentTerminalLine++;
            // Wait longer before showing next command to let user read the current one
            setTimeout(typeNextCommand, 3000);
        }, 800);
    });
}

// Type text with typewriter effect
function typeText(text, element, callback, speed = 50) {
    if (!element) return;
    
    isTyping = true;
    element.innerHTML = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            if (callback) callback();
        }
    }, speed);
}

// Add interactive prompt at the end
function addInteractivePrompt() {
    const terminalContent = document.getElementById('terminal-content');
    
    // Remove any existing input fields first
    const existingInputs = terminalContent.querySelectorAll('#terminal-input');
    existingInputs.forEach(input => input.remove());
    
    const promptLine = document.createElement('div');
    promptLine.innerHTML = `<span style="color: #00d8ff;">viswanath@portfolio:~$ </span><input type="text" id="terminal-input" style="background: transparent; border: none; outline: none; color: #00ff41; font-family: 'JetBrains Mono', monospace; font-size: 14px; width: 300px;" placeholder="Type 'help' for commands">`;
    terminalContent.appendChild(promptLine);
    
    const input = document.getElementById('terminal-input');
    if (input) {
        input.focus();
        input.addEventListener('keypress', handleTerminalInput);
    }
}

// Handle user input in terminal
function handleTerminalInput(e) {
    if (e.key === 'Enter') {
        const command = e.target.value.trim().toLowerCase();
        const terminalContent = document.getElementById('terminal-content');
        
        // Remove the current input field to prevent multiple inputs
        e.target.parentElement.remove();
        
        // Show the command that was typed
        const commandEcho = document.createElement('div');
        commandEcho.innerHTML = `<span style="color: #00d8ff;">viswanath@portfolio:~$ </span><span style="color: #00ff41;">${command}</span>`;
        terminalContent.appendChild(commandEcho);
        
        // Process the command
        if (interactiveCommands[command]) {
            const output = interactiveCommands[command];
            
            if (output === 'CLEAR_TERMINAL') {
                terminalContent.innerHTML = '';
                addInteractivePrompt();
                return;
            } else if (output === 'RESTART_DEMO') {
                restartTerminalAnimation();
                return;
            } else {
                const outputDiv = document.createElement('div');
                // Handle dynamic outputs (functions) and static outputs (strings)
                const finalOutput = typeof output === 'function' ? output() : output;
                outputDiv.innerHTML = finalOutput;
                terminalContent.appendChild(outputDiv);
            }
        } else if (command === '') {
            // Empty command, just show new prompt
        } else {
            // Unknown command
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = `<div style="color: #ff6b6b; margin-bottom: 10px;">Command not found: ${command}. Type 'help' for available commands.</div>`;
            terminalContent.appendChild(errorDiv);
        }
        
        // Add new prompt
        addInteractivePrompt();
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
}

// Calculate years of experience dynamically
function calculateExperience() {
    const startDate = new Date('2017-11-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    
    // Update hero section experience counter
    const experienceElement = document.getElementById('experience-years');
    if (experienceElement) {
        experienceElement.textContent = diffYears + '+';
    }
    
    // Update about section experience text
    const aboutExperienceElement = document.getElementById('about-experience-years');
    if (aboutExperienceElement) {
        aboutExperienceElement.textContent = diffYears;
    }
}

// Initialize animations and interactions
function initializeAnimations() {
    // Navbar scroll effect
    handleNavbarScroll();
    
    // Smooth scrolling for navigation links
    initializeSmoothScrolling();
    
    // Mobile menu toggle
    initializeMobileMenu();
    
    // Intersection Observer for animations
    initializeScrollAnimations();
    
    // Skill bars animation
    initializeSkillBars();
    
    // Particles effect
    initializeParticles();
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink(navLinks);
    });
}

// Update active navigation link
function updateActiveNavLink(navLinks) {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Initialize scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger skill bars animation when skills section is visible
                if (entry.target.classList.contains('skills-section') && !skillsAnimated) {
                    animateSkillBars();
                    skillsAnimated = true;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.expertise-item, .timeline-item, .project-card, .skill-category, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize skill bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 200);
    });
}

// Initialize particles background effect
function initializeParticles() {
    const particlesBg = document.getElementById('particles-bg');
    if (!particlesBg) return;
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(59, 130, 246, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        particlesBg.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Terminal interaction handlers
function handleTerminalInteraction() {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;
    
    terminalBody.addEventListener('click', () => {
        // Focus on input if it exists
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.focus();
        } else if (!isTyping && currentTerminalLine >= terminalCommands.length) {
            restartTerminalAnimation();
        }
    });
}

// Restart terminal animation
function restartTerminalAnimation() {
    const terminalContent = document.getElementById('terminal-content');
    if (!terminalContent) return;
    
    terminalContent.innerHTML = '';
    currentTerminalLine = 0;
    isTyping = false;
    
    setTimeout(() => {
        typeNextCommand();
    }, 500);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced scroll performance
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink(document.querySelectorAll('.nav-link'));
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all elements are rendered
    setTimeout(() => {
        initializeTypewriter();
        calculateExperience();
        initializeAnimations();
        handleTerminalInteraction();
        
        // Log successful initialization
        console.log('🚀 Portfolio initialized successfully!');
        console.log('👨‍💻 Built by Viswanath Bodasakurthi');
        console.log('🔧 Technologies: HTML5, CSS3, JavaScript ES6+');
        console.log('✨ Features: Terminal simulation, smooth animations, responsive design');
    }, 100);
});

// Performance monitoring
function logPerformanceMetrics() {
    if (typeof performance !== 'undefined' && performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                console.log(`⚡ Page load time: ${loadTime}ms`);
                
                if (loadTime < 2000) {
                    console.log('🟢 Excellent performance!');
                } else if (loadTime < 4000) {
                    console.log('🟡 Good performance');
                } else {
                    console.log('🔴 Consider optimization');
                }
            }, 0);
        });
    }
}

logPerformanceMetrics();

// Add some Easter eggs
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            console.log('🎮 Konami Code activated!');
            console.log('🎨 You found an Easter egg!');
            console.log('👨‍💻 Thanks for exploring my portfolio thoroughly!');
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Export functions for potential external use
window.PortfolioAPI = {
    restartTerminal: restartTerminalAnimation,
    calculateExperience: calculateExperience,
    animateSkills: animateSkillBars
};
