const API_BASE_URL = 'https://us-central1-feraset-case-120ad.cloudfunctions.net/api';

export async function generateLogo(prompt: string) {
    try {
        const result = await fetch(`${API_BASE_URL}/generate-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!result.ok) {
            throw new Error('Failed to generate logo');
        }

        const data = await result.json();
        return data.image_url;
    } catch (error) {
        console.error('Error generating logo:', error);
        throw error;
    }
}