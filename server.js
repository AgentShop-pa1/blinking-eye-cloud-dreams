const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// Route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        app: 'Blinking Eye - Cloud Dreams',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🌤️ Cloud Dreams server running on port ${PORT}`);
    console.log(`👁️ Blinking Eye MVP is live!`);
});