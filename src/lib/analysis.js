// API Configuration
// Use environment variable if available, otherwise fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://xai-api-production-e123.up.railway.app";

/**
 * Generate a layman's report using Gemini API
 * @param {Object} analysisData - The analysis results from the ML API
 * @returns {Promise<Object>} Gemini report result
 */
export async function generateGeminiReport(analysisData) {
  try {
    const response = await fetch(`${API_BASE_URL}/gemini-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        classification: analysisData.classification,
        confidence: analysisData.confidence,
        classes: analysisData.classes,
        analysis: analysisData.analysis,
        regions: analysisData.regions
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to generate report');
    }

    return {
      report: result.report,
      timestamp: new Date(result.timestamp),
      success: true
    };

  } catch (error) {
    console.error("Error generating Gemini report:", error);
    throw error;
  }
}

/**
 * Analyze image using the ML API with GradCAM and heatmap generation
 * @param {string|File} imageSource - Image URL or File object
 * @returns {Promise<Object>} Analysis results including visualizations
 */
export async function analyzeImage(imageSource) {
  try {
    let file;
    let filename = "uploaded_image.jpg";

    // Handle both URL and File inputs
    if (typeof imageSource === 'string') {
      // Fetch image from URL and convert to File
      const response = await fetch(imageSource);
      const blob = await response.blob();
      file = new File([blob], filename, { type: 'image/jpeg' });
    } else if (imageSource instanceof File) {
      file = imageSource;
      filename = file.name;
    } else {
      throw new Error("Invalid image source. Expected URL string or File object.");
    }

    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    // Call the ML API
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Analysis failed');
    }

    // Transform API response to frontend format
    return {
      reportId: `LV-${Date.now().toString(36).toUpperCase()}`,
      classification: result.classification,
      confidence: result.confidence,
      classes: result.classes,
      regions: result.regions || [],
      images: {
        original: result.images.original,
        heatmap: result.images.heatmap,
        gradcam: result.images.gradcam,
        overlay: result.images.overlay
      },
      analysis: result.analysis,
      recommendations: result.recommendations,
      timestamp: new Date(result.timestamp),
      allProbabilities: result.all_probabilities,
      geminiReport: result.gemini_report,  // Include auto-generated Gemini report
      success: true
    };

  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}

/**
 * Simple prediction without visualizations (faster)
 * @param {string|File} imageSource - Image URL or File object
 * @returns {Promise<Object>} Classification result only
 */
export async function predictSimple(imageSource) {
  try {
    let file;
    let filename = "uploaded_image.jpg";

    if (typeof imageSource === 'string') {
      const response = await fetch(imageSource);
      const blob = await response.blob();
      file = new File([blob], filename, { type: 'image/jpeg' });
    } else if (imageSource instanceof File) {
      file = imageSource;
      filename = file.name;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/predict/simple`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error in simple prediction:", error);
    throw error;
  }
}

/**
 * Get available classification classes
 * @returns {Promise<Object>} List of classification classes
 */
export async function getClasses() {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
}

/**
 * Check API health
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API health check failed:", error);
    return { status: "unhealthy", error: error.message };
  }
}

/**
 * Check if API is available and model is loaded
 * @returns {Promise<{available: boolean, message: string}>}
 */
export async function checkApiAvailability() {
  try {
    const health = await checkHealth();
    if (health.status === "healthy" && health.model_loaded) {
      return { available: true, message: "API is ready" };
    } else if (health.model_loaded === false) {
      return { available: false, message: "Model is not loaded" };
    }
    return { available: false, message: health.message || "API unavailable" };
  } catch (error) {
    return { available: false, message: `Cannot connect to API: ${error.message}` };
  }
}

/**
 * Fallback simulation for when API is unavailable
 * @param {string} imageUrl
 * @returns {Promise<Object>} Simulated analysis results
 */
export async function simulateAnalysis(imageUrl) {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const classTypes = [
    "Normal",
    "Adenocarcinoma",
    "Large Cell Carcinoma",
    "Squamous Cell Carcinoma",
  ];

  // Generate probabilities
  const rawProbs = classTypes.map(() => Math.random());
  const sum = rawProbs.reduce((a, b) => a + b, 0);
  const normalizedProbs = rawProbs.map((p) => (p / sum) * 100);

  const maxProbIndex = normalizedProbs.indexOf(Math.max(...normalizedProbs));
  const classification = classTypes[maxProbIndex];
  const confidence = normalizedProbs[maxProbIndex];

  const classes = classTypes.map((name, index) => ({
    name,
    probability: normalizedProbs[index],
  })).sort((a, b) => b.probability - a.probability);

  // Generate regions of interest
  const numRegions = Math.floor(Math.random() * 3) + 1;
  const regions = Array.from({ length: numRegions }, () => ({
    x: 30 + Math.random() * 40,
    y: 30 + Math.random() * 40,
    radius: 5 + Math.random() * 10,
    intensity: 0.3 + Math.random() * 0.7,
  }));

  // Use the same analysis text generation logic
  const analysisText = getAnalysisText(classification, confidence, regions.length);

  return {
    reportId: `LV-${Date.now().toString(36).toUpperCase()}`,
    classification,
    confidence,
    classes,
    regions,
    images: {
      original: imageUrl,
      heatmap: imageUrl,
      gradcam: imageUrl,
      overlay: imageUrl
    },
    analysis: analysisText,
    recommendations: getRecommendations(classification),
    timestamp: new Date(),
    simulated: true
  };
}

/**
 * Main analysis function that tries API first, falls back to simulation
 * @param {string|File} imageSource
 * @returns {Promise<Object>}
 */
export async function analyzeImageWithFallback(imageSource) {
  try {
    // Try the real API first
    return await analyzeImage(imageSource);
  } catch (error) {
    console.warn("API call failed, using simulation:", error);
    // Fallback to simulation if API is unavailable
    const imageUrl = typeof imageSource === 'string' 
      ? imageSource 
      : URL.createObjectURL(imageSource);
    return await simulateAnalysis(imageUrl);
  }
}

// Helper functions (matching API implementation)
function getAnalysisText(classification, confidence, regionCount) {
  if (classification === "Normal") {
    return {
      summary: `The AI analysis indicates normal lung tissue with ${confidence.toFixed(1)}% confidence. No significant abnormalities were detected in the submitted CT scan image.`,
      details: `The deep learning model examined the entire lung field and identified ${regionCount} region(s) for detailed analysis. The tissue density, nodule characteristics, and overall lung architecture appear within normal parameters. The GradCAM visualization shows distributed attention across the lung parenchyma without focal concentration indicative of malignancy.`
    };
  }

  return {
    summary: `The AI analysis suggests findings consistent with ${classification} with ${confidence.toFixed(1)}% confidence. This classification requires clinical correlation and further diagnostic workup.`,
    details: `The convolutional neural network identified ${regionCount} region(s) of interest showing characteristics associated with ${classification}. The attention mapping indicates concentrated activation in specific areas that warrant further investigation. Key features detected include abnormal tissue density patterns and architectural distortion typical of this classification.`
  };
}

function getRecommendations(classification) {
  if (classification === "Normal") {
    return [
      "Continue routine screening as recommended by healthcare provider",
      "Maintain healthy lifestyle habits including smoking cessation if applicable",
      "Report any new respiratory symptoms to your healthcare provider",
      "Schedule follow-up imaging as per standard screening guidelines"
    ];
  }

  return [
    "Immediate consultation with a pulmonologist or oncologist is strongly recommended",
    "Additional diagnostic procedures (biopsy, PET scan) may be warranted",
    "Complete clinical history and physical examination should be performed",
    "Discuss treatment options and staging procedures with medical oncology team",
    "Consider genetic testing for targeted therapy eligibility",
    "Multidisciplinary tumor board review is recommended for treatment planning"
  ];
}

