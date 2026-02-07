import { DesignRequest, ColorPalette, FontRecommendation } from '../types';

const styleBasePalettes: Record<string, string[][]> = {
  'Soft & Calm': [
    ['#E8D5C4', '#A8C5DA', '#F5E6D3', '#D4E4F7'],
    ['#CEC2B3', '#B3D9E8', '#D4C5B9', '#C8DAF0'],
    ['#D9C9BC', '#9FC5D6', '#E8D5C4', '#BFD7EC'],
  ],
  'Bold & Energetic': [
    ['#FF1744', '#FF6600', '#FFD700', '#00D9FF'],
    ['#EF3B36', '#FF5722', '#FFC107', '#00BCD4'],
    ['#F32C7A', '#FF3D00', '#FFEB3B', '#0097A7'],
  ],
  'Elegant': [
    ['#2C3E50', '#8E7CC3', '#D4A5A5', '#ECE5DD'],
    ['#34495E', '#9B8AA8', '#C9A9A3', '#E8E0D5'],
    ['#3E4A53', '#8B7AA0', '#D4B5B5', '#E5DCD3'],
  ],
  'Fun': [
    ['#FF6B9D', '#00D9FF', '#FFD700', '#6BCB77'],
    ['#FF85B3', '#00E5FF', '#FFE66D', '#90EE90'],
    ['#FF99B5', '#00F0FF', '#FFEC99', '#A8E6A1'],
  ],
  'Serious': [
    ['#1A2332', '#2D3E50', '#455A64', '#78909C'],
    ['#263238', '#37474F', '#546E7A', '#90A4AE'],
    ['#1C2C3B', '#314455', '#4A6278', '#7B92A4'],
  ],
  'Creative': [
    ['#9C27B0', '#FF1493', '#20B2AA', '#FFD700'],
    ['#8B00FF', '#FF006E', '#00CED1', '#FFA500'],
    ['#7B68EE', '#FF1493', '#1E90FF', '#FF6347'],
  ],
  'Professional': [
    ['#0F4C81', '#4A90E2', '#CCCCCC', '#F5F5F5'],
    ['#1A5A96', '#5AA3E8', '#D9D9D9', '#F9F9F9'],
    ['#2E5C8A', '#6BA3DE', '#C0C0C0', '#EFEFEF'],
  ],
};

const themeColorPalettes: Record<string, string[][]> = {
  'Nature / Eco': [
    ['#2D5016', '#6B8E23', '#90EE90'],
    ['#1E4620', '#7BA840', '#98D98E'],
    ['#3D6B24', '#8BC34A', '#A5E699'],
  ],
  'Minimal': [
    ['#FFFFFF', '#F5F5F5', '#333333'],
    ['#F9F9F9', '#E8E8E8', '#444444'],
    ['#FAFAFA', '#EEEEEE', '#222222'],
  ],
  'Luxury': [
    ['#1A1A1A', '#D4AF37', '#E6E6FA'],
    ['#000000', '#FFD700', '#F0F0F0'],
    ['#2F2F2F', '#DAA520', '#E8E0F0'],
  ],
  'Modern': [
    ['#0F0F0F', '#00D9FF', '#FF006E'],
    ['#1A1A1A', '#00B3E5', '#FF4081'],
    ['#2B2B2B', '#00BFFF', '#FF1493'],
  ],
  'Vintage': [
    ['#8B7355', '#D2B48C', '#F08080'],
    ['#9D7E6B', '#D4A899', '#F0A8A0'],
    ['#7A6B5D', '#E5C8B3', '#E8A8A0'],
  ],
  'Playful': [
    ['#FF6B6B', '#FFA500', '#FFD93D'],
    ['#FF8585', '#FFB84D', '#FFE066'],
    ['#FF5252', '#FF8C00', '#FFE680'],
  ],
  'Corporate': [
    ['#003366', '#0066CC', '#CCCCCC'],
    ['#003D82', '#0052A3', '#D9D9D9'],
    ['#004B9E', '#0059B8', '#E6E6E6'],
  ],
  'Futuristic': [
    ['#0A0E27', '#00FF88', '#FF00FF'],
    ['#1A1F3A', '#00FF99', '#FF1493'],
    ['#0F1535', '#00FFB3', '#FF006E'],
  ],
};

const emotionFontMappings: Record<string, { heading: string; body: string }> = {
  romantic: { heading: 'Cormorant Garamond', body: 'Lora' },
  elegant: { heading: 'Playfair Display', body: 'Lora' },
  bold: { heading: 'Bebas Neue', body: 'Oswald' },
  fun: { heading: 'Fredoka', body: 'Poppins' },
  calm: { heading: 'Raleway', body: 'Lato' },
  serious: { heading: 'IBM Plex Sans', body: 'Source Sans Pro' },
  creative: { heading: 'Righteous', body: 'Quicksand' },
  professional: { heading: 'Roboto', body: 'Roboto' },
  modern: { heading: 'Manrope', body: 'Inter' },
  minimal: { heading: 'Inter', body: 'Inter' },
  playful: { heading: 'Baloo 2', body: 'Nunito' },
  nature: { heading: 'Raleway', body: 'Open Sans' },
  luxury: { heading: 'Bodoni Moda', body: 'Crimson Text' },
  tech: { heading: 'Space Mono', body: 'JetBrains Mono' },
};

const styleToEmotionKeywords: Record<string, string[]> = {
  'Soft & Calm': ['calm', 'peaceful', 'serene'],
  'Bold & Energetic': ['bold', 'energetic', 'vibrant'],
  'Elegant': ['elegant', 'refined', 'sophisticated'],
  'Fun': ['fun', 'playful', 'joyful'],
  'Serious': ['serious', 'professional', 'formal'],
  'Creative': ['creative', 'innovative', 'unique'],
  'Professional': ['professional', 'corporate', 'business'],
};

function containsKeyword(text: string, keywords: string[]): boolean {
  const lowerText = text.toLowerCase();
  return keywords.some((kw) => lowerText.includes(kw));
}

function findFontByEmotion(description: string, feeling: string): { heading: string; body: string } {
  const combinedText = `${description} ${feeling}`.toLowerCase();

  for (const [emotion, fonts] of Object.entries(emotionFontMappings)) {
    if (combinedText.includes(emotion)) {
      return fonts;
    }
  }

  return { heading: 'Roboto', body: 'Roboto' };
}

export function generateColorPalettes(request: DesignRequest): ColorPalette[] {
  let stylePalettes: string[][] = [];
  let themePalettes: string[][] = [];

  const primaryStyle = request.stylePreferences[0] || 'Professional';
  stylePalettes = styleBasePalettes[primaryStyle] || styleBasePalettes['Professional'];

  themePalettes = themeColorPalettes[request.theme] || themeColorPalettes['Modern'];

  const palettes: ColorPalette[] = [];

  for (let i = 0; i < 3; i++) {
    let primary: string;
    let secondary: string;
    let accent: string;

    if (i === 0) {
      primary = stylePalettes[0][0];
      secondary = themePalettes[0][1];
      accent = themePalettes[0][2];
    } else if (i === 1) {
      primary = themePalettes[1][0];
      secondary = stylePalettes[1][1];
      accent = themePalettes[1][2];
    } else {
      primary = stylePalettes[2][0];
      secondary = themePalettes[2][1];
      accent = stylePalettes[2][2];
    }

    const palette: ColorPalette = {
      name: `${request.theme} - ${primaryStyle} ${i + 1}`,
      primary: { color: primary, usage: 'Background & Base' },
      secondary: { color: secondary, usage: 'Text & Components' },
      accent: { color: accent, usage: 'Call-to-Action & Highlights' },
    };

    palettes.push(palette);
  }

  return palettes;
}

export function generateFontPairings(request: DesignRequest): FontRecommendation {
  const emotionFonts = findFontByEmotion(request.description, request.feeling);

  let headingFont = emotionFonts.heading;
  let bodyFont = emotionFonts.body;

  if (containsKeyword(request.feeling, styleToEmotionKeywords['Elegant'])) {
    headingFont = 'Playfair Display';
    bodyFont = 'Lora';
  } else if (containsKeyword(request.feeling, styleToEmotionKeywords['Bold & Energetic'])) {
    headingFont = 'Bebas Neue';
    bodyFont = 'Poppins';
  } else if (containsKeyword(request.feeling, styleToEmotionKeywords['Fun'])) {
    headingFont = 'Fredoka';
    bodyFont = 'Nunito';
  } else if (containsKeyword(request.feeling, styleToEmotionKeywords['Soft & Calm'])) {
    headingFont = 'Raleway';
    bodyFont = 'Lato';
  } else if (containsKeyword(request.feeling, styleToEmotionKeywords['Serious'])) {
    headingFont = 'IBM Plex Sans';
    bodyFont = 'Source Sans Pro';
  } else if (request.theme === 'Luxury') {
    headingFont = 'Bodoni Moda';
    bodyFont = 'Crimson Text';
  } else if (request.theme === 'Vintage') {
    headingFont = 'Abril Fatface';
    bodyFont = 'Dosis';
  } else if (request.theme === 'Minimal') {
    headingFont = 'Inter';
    bodyFont = 'Inter';
  } else if (request.theme === 'Modern') {
    headingFont = 'Manrope';
    bodyFont = 'Inter';
  } else if (request.theme === 'Futuristic') {
    headingFont = 'Space Mono';
    bodyFont = 'JetBrains Mono';
  } else if (request.theme === 'Playful') {
    headingFont = 'Baloo 2';
    bodyFont = 'Nunito';
  } else if (request.theme === 'Corporate') {
    headingFont = 'Roboto';
    bodyFont = 'Open Sans';
  }

  const fontMap: Record<string, { heading: string; fallback: string }> = {
    'Playfair Display': { heading: 'Playfair Display', fallback: 'Georgia' },
    'Lora': { heading: 'Lora', fallback: 'serif' },
    'Bebas Neue': { heading: 'Bebas Neue', fallback: 'Impact' },
    'Poppins': { heading: 'Poppins', fallback: 'Arial' },
    'Fredoka': { heading: 'Fredoka', fallback: 'Comic Sans MS' },
    'Nunito': { heading: 'Nunito', fallback: 'Arial' },
    'Raleway': { heading: 'Raleway', fallback: 'Helvetica' },
    'Lato': { heading: 'Lato', fallback: 'Arial' },
    'IBM Plex Sans': { heading: 'IBM Plex Sans', fallback: 'Helvetica' },
    'Source Sans Pro': { heading: 'Source Sans Pro', fallback: 'sans-serif' },
    'Bodoni Moda': { heading: 'Bodoni Moda', fallback: 'Times New Roman' },
    'Crimson Text': { heading: 'Crimson Text', fallback: 'serif' },
    'Abril Fatface': { heading: 'Abril Fatface', fallback: 'Georgia' },
    'Dosis': { heading: 'Dosis', fallback: 'sans-serif' },
    'Inter': { heading: 'Inter', fallback: 'Arial' },
    'Manrope': { heading: 'Manrope', fallback: 'Helvetica' },
    'Space Mono': { heading: 'Space Mono', fallback: 'Courier New' },
    'JetBrains Mono': { heading: 'JetBrains Mono', fallback: 'Courier New' },
    'Roboto': { heading: 'Roboto', fallback: 'Arial' },
    'Open Sans': { heading: 'Open Sans', fallback: 'Helvetica' },
    'Baloo 2': { heading: 'Baloo 2', fallback: 'Verdana' },
    'Cormorant Garamond': { heading: 'Cormorant Garamond', fallback: 'Garamond' },
  };

  const headingData = fontMap[headingFont] || { heading: 'Roboto', fallback: 'Arial' };
  const bodyData = fontMap[bodyFont] || { heading: 'Roboto', fallback: 'Arial' };

  return {
    headingFont: headingFont,
    bodyFont: bodyFont,
    headingFallback: headingData.fallback,
    bodyFallback: bodyData.fallback,
  };
}
