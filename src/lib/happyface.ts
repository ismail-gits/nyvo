export const removeBackgroundRMBG2 = async (imageUrl: string): Promise<string> => {
  let imageFile: File;
  
  // Convert image URL/data URL to File object
  if (imageUrl.startsWith("data:image/")) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    imageFile = new File([blob], 'image.jpg', { type: blob.type });
  } else {
    const imgResponse = await fetch(imageUrl);
    if (!imgResponse.ok) {
      throw new Error(`Failed to fetch image: ${imgResponse.statusText}`);
    }
    const blob = await imgResponse.blob();
    imageFile = new File([blob], 'image.jpg', { type: blob.type });
  }

  try {
    // JSON payload approach
    const response = await fetch('https://briaai-bria-rmbg-2-0.hf.space/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [imageFile]
      }),
    });

    if (response.ok) {
      const result = await response.json();
      
      if (result.data && result.data[0]) {
        const resultData = result.data[0];
        
        if (typeof resultData === 'string') {
          // If it's already a data URL
          if (resultData.startsWith('data:')) {
            return resultData;
          }
          
          // If it's a file path, fetch it
          const fileUrl = resultData.startsWith('http') ? resultData : `https://briaai-bria-rmbg-2-0.hf.space/file=${resultData}`;
          const fileResponse = await fetch(fileUrl);
          if (fileResponse.ok) {
            const arrayBuffer = await fileResponse.arrayBuffer();
            const base64Data = Buffer.from(arrayBuffer).toString('base64');
            return `data:image/png;base64,${base64Data}`;
          }
        }
      }
    }

    throw new Error(`RMBG-2.0 API error: ${response.statusText}`);
    
  } catch (error) {
    console.error('RMBG-2.0 background removal failed:', error);
    throw new Error(`Background removal failed: ${error}`);
  }
};