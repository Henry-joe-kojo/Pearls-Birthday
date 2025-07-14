// Global variables
let attempts = 0;
const maxAttempts = 3;
const correctAnswer = "fire"; // The answer to the riddle
let isMusicPlaying = false;
let audioContext = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Focus on input when page loads
    const answerInput = document.getElementById('answer-input');
    if (answerInput) {
        answerInput.focus();
    }
    
    // Add enter key support
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
    
    // Initialize audio context for music
    initAudio();
});

// Check the user's answer
function checkAnswer() {
    const answerInput = document.getElementById('answer-input');
    const userAnswer = answerInput.value.trim().toLowerCase();
    const submitBtn = document.getElementById('submit-btn');
    
    if (!userAnswer) {
        showMessage('Please enter an answer!', 'error');
        return;
    }
    
    attempts++;
    document.getElementById('attempt-count').textContent = attempts;
    
    if (userAnswer === correctAnswer) {
        // Correct answer!
        showMessage('🎉 Correct! Unlocking your surprise...', 'success');
        submitBtn.classList.add('success-shake');
        
        // Play success sound
        playSuccessSound();
        
        // Show surprise after a short delay
        setTimeout(() => {
            showSurprise();
        }, 2000);
        
    } else {
        // Wrong answer
        const remainingAttempts = maxAttempts - attempts;
        
        if (remainingAttempts > 0) {
            showMessage(`❌ Wrong answer! You have ${remainingAttempts} attempt(s) left.`, 'error');
            submitBtn.classList.add('error-shake');
            
            // Clear input for next attempt
            answerInput.value = '';
            answerInput.focus();
            
            // Remove error animation after delay
            setTimeout(() => {
                submitBtn.classList.remove('error-shake');
            }, 500);
            
        } else {
            // No more attempts
            showMessage('😔 Game over! The answer was "fire". Click "Play Again" to try again!', 'error');
            submitBtn.disabled = true;
            submitBtn.textContent = '❌ No More Attempts';
        }
    }
}

// Show hint
function showHint() {
    const hintText = document.getElementById('hint-text');
    const hintBtn = document.getElementById('hint-btn');
    
    if (hintText.classList.contains('hidden')) {
        hintText.classList.remove('hidden');
        hintBtn.textContent = '🙈 Hide Hint';
        hintBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
    } else {
        hintText.classList.add('hidden');
        hintBtn.textContent = '💡 Need a hint?';
        hintBtn.style.background = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)';
    }
}

// Show surprise section
function showSurprise() {
    const loginSection = document.getElementById('login-section');
    const surpriseSection = document.getElementById('surprise-section');
    
    // Hide login section
    loginSection.classList.remove('active');
    loginSection.classList.add('hidden');
    
    // Show surprise section
    surpriseSection.classList.remove('hidden');
    surpriseSection.classList.add('active');
    
    // Start confetti animation
    startConfetti();
    
    // Play birthday music automatically
    setTimeout(() => {
        toggleMusic();
    }, 1000);
}

// Show message to user
function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        border-radius: 25px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideDown 0.5s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    } else {
        messageDiv.style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
    }
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 3000);
}

// Start confetti animation
function startConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    if (confettiContainer) {
        confettiContainer.style.display = 'block';
    }
}

// Initialize audio context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Audio context not supported');
    }
}

// Play success sound
function playSuccessSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Toggle birthday music
function toggleMusic() {
    const musicBtn = document.getElementById('play-music');
    
    if (!isMusicPlaying) {
        // Create simple birthday tune
        playBirthdayTune();
        musicBtn.textContent = '🔇 Stop Music';
        isMusicPlaying = true;
    } else {
        // Stop music (in a real implementation, you'd stop the audio)
        musicBtn.textContent = '🎵 Play Birthday Music';
        isMusicPlaying = false;
    }
}

// Play birthday tune
function playBirthdayTune() {
    if (!audioContext) return;
    
    const notes = [
        { freq: 261.63, duration: 0.3 }, // C4
        { freq: 261.63, duration: 0.3 }, // C4
        { freq: 293.66, duration: 0.6 }, // D4
        { freq: 261.63, duration: 0.6 }, // C4
        { freq: 349.23, duration: 0.6 }, // F4
        { freq: 329.63, duration: 1.2 }, // E4
        { freq: 261.63, duration: 0.3 }, // C4
        { freq: 261.63, duration: 0.3 }, // C4
        { freq: 293.66, duration: 0.6 }, // D4
        { freq: 261.63, duration: 0.6 }, // C4
        { freq: 392.00, duration: 0.6 }, // G4
        { freq: 349.23, duration: 1.2 }, // F4
    ];
    
    let currentTime = audioContext.currentTime;
    
    notes.forEach((note, index) => {
        setTimeout(() => {
            playNote(note.freq, note.duration);
        }, index * 400);
    });
}

// Play a single note
function playNote(frequency, duration) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Reset puzzle
function resetPuzzle() {
    // Reset variables
    attempts = 0;
    isMusicPlaying = false;
    
    // Reset UI
    document.getElementById('attempt-count').textContent = '0';
    document.getElementById('answer-input').value = '';
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('submit-btn').textContent = '🎁 Unlock Surprise!';
    document.getElementById('submit-btn').classList.remove('success-shake', 'error-shake');
    
    // Hide hint
    const hintText = document.getElementById('hint-text');
    const hintBtn = document.getElementById('hint-btn');
    hintText.classList.add('hidden');
    hintBtn.textContent = '💡 Need a hint?';
    hintBtn.style.background = 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)';
    
    // Switch back to login section
    const loginSection = document.getElementById('login-section');
    const surpriseSection = document.getElementById('surprise-section');
    
    surpriseSection.classList.remove('active');
    surpriseSection.classList.add('hidden');
    
    loginSection.classList.remove('hidden');
    loginSection.classList.add('active');
    
    // Focus on input
    document.getElementById('answer-input').focus();
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 