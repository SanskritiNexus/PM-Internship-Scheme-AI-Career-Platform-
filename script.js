// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !menu.contains(event.target)) {
                menu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    
    // Form Submission Handlers
    const miniForm = document.querySelector('.mini-form');
    if (miniForm) {
        const createResumeBtn = miniForm.querySelector('button');
        if (createResumeBtn) {
            createResumeBtn.addEventListener('click', function() {
                alert('Your resume is being generated! This feature will be available soon.');
            });
        }
    }

    
    // Apply Now Button Handlers
    const applyButtons = document.querySelectorAll('.card .btn.primary');
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.trim() === 'Apply Now') {
                e.preventDefault();
                alert('You will be redirected to the application form. This feature will be available soon.');
            }
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animation on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step, .card, .resume-content, .resume-preview');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // --- AI-Assisted Cybersecurity Module ---
    const CyberSecurityModule = (function() {
        let threatScore = 0;
        let lastActivity = Date.now();
        let inactivityTimeout;
        const INACTIVITY_THRESHOLD = 10000; // 10 seconds
        let threatBadge;

        const init = () => {
            injectUI();
            setupTabSwitchDetection();
            setupInactivityMonitoring();
            setupDOMMonitoring();
            startHeuristicEngine();
            console.log("CyberSecurity Module initialized.");
        };

        const setupDOMMonitoring = () => {
            const observer = new MutationObserver((mutations) => {
                let unauthorizedChange = false;
                
                mutations.forEach(mutation => {
                    const isSecurityElement = (node) => {
                        if (!node || !node.classList) return false;
                        const classes = ['ai-threat-badge', 'security-log-drawer', 'session-lock-overlay', 'threat-alert', 'log-entry', 'locked-session'];
                        return classes.some(cls => node.classList.contains(cls)) || (node.parentElement && isSecurityElement(node.parentElement));
                    };

                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(node => {
                            if (!isSecurityElement(node) && node.nodeType === 1) unauthorizedChange = true;
                        });
                        mutation.removedNodes.forEach(node => {
                            if (!isSecurityElement(node) && node.nodeType === 1) unauthorizedChange = true;
                        });
                    } else if (mutation.type === 'characterData') {
                        if (!isSecurityElement(mutation.target.parentElement)) {
                            unauthorizedChange = true;
                        }
                    }
                });

                if (unauthorizedChange) {
                    updateScore(15, "Unauthorized DOM manipulation detected");
                    showAlert("Critical DOM Manipulation Detected");
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });
        };


        const injectUI = () => {
            // Inject Floating Badge
            threatBadge = document.createElement('div');
            threatBadge.className = 'ai-threat-badge';
            threatBadge.innerHTML = `
                <div class="status-dot"></div>
                <span>AI Threat Score: <span id="threat-score-value">0</span></span>
            `;
            document.body.appendChild(threatBadge);

            // Inject Log Drawer
            const drawer = document.createElement('div');
            drawer.className = 'security-log-drawer';
            drawer.id = 'security-log-drawer';
            drawer.innerHTML = `
                <div class="log-header">
                    <h3><i class="fas fa-terminal"></i> Security Activity Log</h3>
                    <button class="close-logs" id="close-logs"><i class="fas fa-times"></i></button>
                </div>
                <div class="log-container" id="log-container">
                    <div class="log-entry info">
                        <span class="time">${new Date().toLocaleTimeString()}</span>
                        <span class="message">Security Monitoring Initialized.</span>
                    </div>
                </div>
            `;
            document.body.appendChild(drawer);

            // Add View Logs button to monitor panel if it exists
            const monitorPanel = document.querySelector('.security-monitor-panel .container');
            if (monitorPanel) {
                const logBtn = document.createElement('button');
                logBtn.className = 'view-logs-btn';
                logBtn.innerHTML = '<i class="fas fa-list-ul"></i> View Logs';
                logBtn.onclick = toggleLogs;
                monitorPanel.appendChild(logBtn);
            }

            threatBadge.onclick = toggleLogs;
            document.getElementById('close-logs').onclick = toggleLogs;
        };

        const toggleLogs = () => {
            document.getElementById('security-log-drawer').classList.toggle('active');
        };

        const addLog = (message, type = 'info') => {
            const container = document.getElementById('log-container');
            if (!container) return;

            const entry = document.createElement('div');
            entry.className = `log-entry ${type}`;
            entry.innerHTML = `
                <span class="time">${new Date().toLocaleTimeString()}</span>
                <span class="message">${message}</span>
            `;
            container.prepend(entry);
            
            if (container.children.length > 50) {
                container.lastChild.remove();
            }
        };

        const updateScore = (points, reason) => {
            threatScore = Math.min(100, Math.max(0, threatScore + points));
            
            // Update Floating Badge
            const scoreElement = document.getElementById('threat-score-value');
            if (scoreElement) scoreElement.textContent = Math.round(threatScore);
            
            // Update Monitor Panel if exists
            const monitorScore = document.getElementById('monitor-threat-score');
            if (monitorScore) monitorScore.textContent = Math.round(threatScore);
            
            const monitorStatus = document.getElementById('monitor-session-status');
            if (monitorStatus) {
                if (threatScore > 80) monitorStatus.textContent = "CRITICAL";
                else if (threatScore > 40) monitorStatus.textContent = "WARNING";
                else monitorStatus.textContent = "SECURE";
            }
            
            updateBadgeStatus();
            
            if (threatScore > 30) {
                blurSensitiveData(true);
            }


            if (threatScore >= 90 && !document.querySelector('.session-lock-overlay')) {
                lockSession();
            }

            if (points > 0 && reason !== "Natural decay") {
                const type = points > 10 ? 'critical' : 'warning';
                addLog(`${reason} (+${points} pts)`, type);
                showAlert(`Suspicious Activity: ${reason}`);
            }
        };

        const lockSession = () => {
            document.body.classList.add('locked-session');
            addLog("Critical Threat Level: Session Locked", "critical");
            
            const overlay = document.createElement('div');
            overlay.className = 'session-lock-overlay';
            overlay.innerHTML = `
                <div class="lock-content">
                    <div class="lock-icon"><i class="fas fa-user-shield"></i></div>
                    <h2>Secure Session Locked</h2>
                    <p style="color: #ef4444; font-weight: 600; margin-bottom: 20px;">Due To Suspicious Activity</p>
                    <p>Your session has been secured by AI monitoring to prevent unauthorized data exposure.</p>
                    <button id="restore-session" class="btn primary" style="background: #ef4444; border: none; width: 100%; margin-top: 20px;">Unlock Session</button>
                </div>
            `;
            document.body.appendChild(overlay);
            
            document.getElementById('restore-session').addEventListener('click', () => {

                document.body.classList.remove('locked-session');
                threatScore = 10; 
                updateScore(0, "Session Unlocked");
                addLog("Session Manually Restored by User", "info");
                overlay.remove();
            });
        };


        const updateBadgeStatus = () => {
            threatBadge.classList.remove('warning', 'critical');
            if (threatScore > 60) {
                threatBadge.classList.add('critical');
            } else if (threatScore > 30) {
                threatBadge.classList.add('warning');
            }
        };

        const setupTabSwitchDetection = () => {
            document.addEventListener("visibilitychange", function() {
                if (document.hidden) {
                    const resume = document.querySelector(".resume-preview");
                    if (resume) {
                        resume.classList.add("locked-session");
                    }
                    updateScore(5, "Tab switched/hidden");
                }
            });
        };



        const setupInactivityMonitoring = () => {
            const resetTimer = () => {
                lastActivity = Date.now();
                clearTimeout(inactivityTimeout);
                inactivityTimeout = setTimeout(handleInactivity, INACTIVITY_THRESHOLD);
            };

            ['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
                window.addEventListener(event, resetTimer);
            });

            resetTimer();
        };

        const handleInactivity = () => {
            updateScore(10, "User inactivity detected");
            showAlert("Inactive session detected. Monitoring for suspicious background activity.");
        };

        const blurSensitiveData = (shouldBlur) => {
            const elements = document.querySelectorAll('.resume-preview');
            elements.forEach(el => {
                if (shouldBlur) {
                    el.classList.add('locked-session');
                } else {
                    // Only remove if not in a critical lock state
                    if (threatScore < 30) {
                        el.classList.remove('locked-session');
                    }
                }
            });
        };



        const showAlert = (message) => {
            if (document.querySelector('.threat-alert')) return;
            const alert = document.createElement('div');
            alert.className = 'threat-alert';
            alert.innerHTML = `<i class="fas fa-exclamation-triangle"></i> <span>${message}</span>`;
            document.body.appendChild(alert);
            setTimeout(() => {
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 500);
            }, 3000);
        };

        const startHeuristicEngine = () => {
            setInterval(() => {
                if (threatScore > 0) {
                    updateScore(-0.5, "Natural decay");
                }
            }, 5000);
        };

        return { init };
    })();

    // Initialize Module
    try {
        CyberSecurityModule.init();
    } catch (e) {
        console.error("CyberSecurity Module failed to initialize:", e);
    }
});