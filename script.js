// Enhanced blinking eye functionality
document.addEventListener('DOMContentLoaded', function() {
    const eye = document.querySelector('.eye');
    const iris = document.querySelector('.iris');
    const pupil = document.querySelector('.pupil');
    const eyeball = document.querySelector('.eyeball');
    
    // Mouse tracking for eye movement
    let isMouseTracking = true;
    
    document.addEventListener('mousemove', function(e) {
        if (!isMouseTracking) return;
        
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate angle and distance
        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 15);
        
        // Move the iris based on mouse position
        const moveX = Math.cos(angle) * distance * 0.3;
        const moveY = Math.sin(angle) * distance * 0.2;
        
        iris.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    });
    
    // Random blink intervals
    function randomBlink() {
        const blinkInterval = Math.random() * 3000 + 2000; // 2-5 seconds
        
        setTimeout(() => {
            triggerBlink();
            randomBlink();
        }, blinkInterval);
    }
    
    function triggerBlink() {
        const topEyelid = document.querySelector('.eyelid.top');
        const bottomEyelid = document.querySelector('.eyelid.bottom');
        
        // Temporarily disable mouse tracking during blink
        isMouseTracking = false;
        
        topEyelid.style.animation = 'none';
        bottomEyelid.style.animation = 'none';
        
        // Force reflow
        topEyelid.offsetHeight;
        bottomEyelid.offsetHeight;
        
        // Trigger blink
        topEyelid.style.transform = 'translateY(-5px)';
        bottomEyelid.style.transform = 'translateY(5px)';
        
        setTimeout(() => {
            topEyelid.style.transform = 'translateY(-40px)';
            bottomEyelid.style.transform = 'translateY(40px)';
            
            setTimeout(() => {
                topEyelid.style.animation = 'blink 4s ease-in-out infinite';
                bottomEyelid.style.animation = 'blink 4s ease-in-out infinite reverse';
                isMouseTracking = true;
            }, 150);
        }, 100);
    }
    
    // Click interaction
    eye.addEventListener('click', function() {
        triggerBlink();
        
        // Add a subtle pulse effect
        eye.style.transform = 'scale(1.05)';
        setTimeout(() => {
            eye.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Add some floating particles for extra cloud effect
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: floatUp 8s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-10px';
        
        document.querySelector('.cloud-bg').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    // Add CSS for floating particles animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) translateX(50px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create particles periodically
    setInterval(createFloatingParticle, 3000);
    
    // Start random blinking
    setTimeout(randomBlink, 2000);
    
    // Gentle breathing effect for the eye
    function breathingEffect() {
        eye.style.transition = 'transform 3s ease-in-out';
        eye.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            eye.style.transform = 'scale(1)';
            setTimeout(breathingEffect, 6000);
        }, 3000);
    }
    
    setTimeout(breathingEffect, 5000);
    
    // Add subtle color changes to iris based on time
    function updateIrisColor() {
        const hour = new Date().getHours();
        let hue = 210; // Base blue
        
        if (hour >= 6 && hour < 12) {
            hue = 200; // Morning - lighter blue
        } else if (hour >= 12 && hour < 18) {
            hue = 210; // Day - normal blue
        } else if (hour >= 18 && hour < 22) {
            hue = 220; // Evening - deeper blue
        } else {
            hue = 240; // Night - purple-blue
        }
        
        iris.style.background = `radial-gradient(circle at 30% 30%, hsl(${hue}, 60%, 70%) 0%, hsl(${hue}, 70%, 60%) 30%, hsl(${hue}, 80%, 50%) 60%, hsl(${hue}, 90%, 40%) 100%)`;
    }
    
    updateIrisColor();
    
    // Console message for developers
    console.log('🌤️ Cloud Dreams - Blinking Eye MVP');
    console.log('✨ Eye follows mouse movement');
    console.log('👁️ Click the eye for instant blink');
    console.log('🎨 Iris color changes with time of day');
});