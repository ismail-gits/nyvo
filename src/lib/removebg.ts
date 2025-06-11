export const removeBackground = async (imageUrl: string) => {
  console.log("Processing image:", imageUrl.substring(0, 50) + "...");

  // Check if it's a base64 data URL (from Gemini)
  if (imageUrl.startsWith("data:image/")) {
    console.log("Detected base64 data URL, using file upload method");
    return await removeBackgroundFromBase64(imageUrl);
  }

  // Regular URL method
  return await removeBackgroundFromUrl(imageUrl);
};

// Handle base64 data URLs (from Gemini)
const removeBackgroundFromBase64 = async (dataUrl: string) => {
  // Extract base64 data from data URL
  const base64Data = dataUrl.split(",")[1];
  const mimeType = dataUrl.split(";")[0].split(":")[1];

  // Convert base64 to buffer
  const imageBuffer = Buffer.from(base64Data, "base64");

  // Create form data with file upload
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append(
    "image_file",
    new Blob([imageBuffer], { type: mimeType }),
    "image.png"
  );

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": process.env.REMOVE_BG_API_KEY! },
    body: formData,
  });

  if (response.ok) {
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const resultDataUrl = `data:image/png;base64,${base64}`;

    return resultDataUrl;
  } else {
    const errorText = await response.text();
    console.error("Remove.bg API Error (base64):", {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    });

    throw new Error(
      `Remove.bg API Error ${response.status}: ${response.statusText}. Details: ${errorText}`
    );
  }
};

// Handle regular URLs
const removeBackgroundFromUrl = async (imageUrl: string) => {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_url", imageUrl);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": process.env.REMOVE_BG_API_KEY! },
    body: formData,
  });

  if (response.ok) {
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    return dataUrl;
  } else {
    const errorText = await response.text();
    console.error("Remove.bg API Error (URL):", {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
      imageUrl: imageUrl,
    });

    throw new Error(
      `Remove.bg API Error ${response.status}: ${response.statusText}. Details: ${errorText}`
    );
  }
};
