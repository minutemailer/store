const quotes = [
    ["Time is a created thing. To say 'I don't have time,' is like saying, 'I don't want to.'", 'Lao Tzu'],
    ["Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.", 'Paul J. Meyer'],
    ["The best way to get things done is to simply begin.", 'Walt Disney'],
    ["The key is not to prioritize what's on your schedule, but to schedule your priorities.", 'Stephen Covey'],
    ["Efficiency is doing things right; effectiveness is doing the right things.", 'Peter Drucker'],
];

export default function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}
