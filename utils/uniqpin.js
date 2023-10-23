function generateUniquePin(length) {
    // Récupère le timestamp actuel
    const timestamp = Date.now().toString();

    // Utilise les derniers chiffres du timestamp
    const uniquePart = timestamp.slice(-length);

    return uniquePart;
}

module.exports = generateUniquePin(4)