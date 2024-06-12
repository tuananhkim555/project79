const apiKey = "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";
const maxImages = 4; // Number of images to generate for each prompt
const retryLimit = 3; // Limit for retries on error

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to disable the generate button during processing
function disableGenerateButton() {
    document.getElementById("generate").disabled = true;
}

// Function to enable the generate button after processing
function enableGenerateButton() {
    document.getElementById("generate").disabled = false;
}

// Function to clear the image grid
function clearImageGrid() {
    const imageGrid = document.getElementById("image-grid");
    imageGrid.innerHTML = "";
}

// Function to show loading indicator
function showLoading() {
    document.getElementById("loading").style.display = "block";
}

// Function to hide loading indicator
function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

// Function to fetch image from API with retry logic
async function fetchImage(prompt, retryCount = 0) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            if (response.status === 500 && retryCount < retryLimit) {
                console.warn(`Retry ${retryCount + 1}/${retryLimit} for prompt: ${prompt}`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retrying
                return fetchImage(prompt, retryCount + 1);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.blob();
    } catch (error) {
        console.error("Error fetching image:", error);
        throw error;
    }
}

// Function to display image
function displayImage(imgUrl, index) {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = `art-${index + 1}`;
    img.onclick = () => downloadImage(imgUrl, index);
    document.getElementById("image-grid").appendChild(img);
}

// Function to generate images
async function generateImages(input) {
    disableGenerateButton();
    clearImageGrid();
    showLoading();

    for (let i = 0; i < maxImages; i++) {
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `${input} ${randomNumber}`;

        try {
            const blob = await fetchImage(prompt);
            const imgUrl = URL.createObjectURL(blob);
            displayImage(imgUrl, i);
        } catch (error) {
            alert(`An error occurred while generating image ${i + 1}: ${error.message}`);
            hideLoading();
            enableGenerateButton();
            return;
        }

        // Throttle requests to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    hideLoading();
    enableGenerateButton();
}

// Function to download the image
function downloadImage(imgUrl, imageNumber) {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = `image-${imageNumber + 1}.jpg`;
    link.click();
}

document.getElementById("generate").addEventListener('click', () => {
    const input = document.getElementById("user-prompt").value;
    generateImages(input);
});
