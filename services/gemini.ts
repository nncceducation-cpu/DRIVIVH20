import { GoogleGenAI } from "@google/genai";
import { DiagnosisResult, PHVDReportData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateParentExplanation = async (diagnosis: DiagnosisResult): Promise<string> => {
  try {
    const prompt = `Acting as a compassionate neonatal clinician, use the "FIGURE" communication framework (Bernstein & Lemmon, 2021) to formulate a spoken explanation for parents regarding a new diagnosis of "${diagnosis.title}".

    Clinical Context: ${diagnosis.desc}

    Please draft a script that explicitly incorporates these elements of the framework:
    1. **Give Information**: Explain the finding clearly using simple, jargon-free language (avoiding "medical speak").
    2. **Acknowledge Uncertainty**: Honestly communicate that while the image shows an injury, it is difficult to predict exactly how an individual child will develop.
    3. **Recognize Emotions**: Include a statement that validates their feelings (e.g., shock, guilt, fear) and offers support.
    4. **Establish Follow-up**: Briefly mention that the team will continue to care for their baby and monitor development.

    Keep the tone warm, honest, and under 200 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Unable to generate explanation.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please check your connection or API key.";
  }
};

export const generateClinicalReport = async (diagnosis: DiagnosisResult): Promise<string> => {
  try {
    const prompt = `Draft a concise Clinical Ultrasound Report for a neonatal cranial ultrasound.
    
    Diagnosis: ${diagnosis.title}
    Findings: ${diagnosis.desc}
    
    Format nicely with Markdown-style headers:
    **Findings:** [Generate plausible specific findings based on diagnosis]
    **Impression:** [One sentence summary]
    **Recommendations:** [Standard follow-up recommendation based on severity]
    
    Keep it professional and concise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate report.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please check your connection or API key.";
  }
};

export const generatePHVDReport = async (data: PHVDReportData): Promise<string> => {
  try {
    const prompt = `Draft a concise Clinical Ultrasound Report for a neonatal cranial ultrasound focusing on Post-Hemorrhagic Ventricular Dilatation (PHVD).

    **Patient Info:**
    - PMA: ${data.pma} weeks
    - Date: ${data.date}

    **Measurements:**
    - Ventricular Index (VI): Left ${data.measurements.viLeft}mm, Right ${data.measurements.viRight}mm
    - Anterior Horn Width (AHW): Left ${data.measurements.ahwLeft}mm, Right ${data.measurements.ahwRight}mm
    - Thalamo-Occipital Distance (TOD): Left ${data.measurements.todLeft}mm, Right ${data.measurements.todRight}mm

    **Assessment:**
    - Risk Zone: ${data.riskZone} (based on El-Dib et al. 2020)
    - Clinical Signs: ${data.clinicalSigns.length > 0 ? data.clinicalSigns.join(', ') : 'None'}

    **Instructions:**
    - Format with Markdown headers: **Findings**, **Impression**, **Plan**.
    - Under **Findings**, summarize the measurements and symmetry.
    - Under **Impression**, state the severity/risk level clearly.
    - Under **Plan**, suggest management based on the risk zone (e.g., observation, LPs, neurosurgery referral).
    - Keep it professional, concise, and suitable for a medical chart.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate report.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please check your connection or API key.";
  }
};