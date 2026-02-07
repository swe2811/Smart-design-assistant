export interface DesignRequest {
  contentType: string;
  description: string;
  feeling: string;
  theme: string;
  stylePreferences: string[];
}

export interface ColorPalette {
  name: string;
  primary: {
    color: string;
    usage: string;
  };
  secondary: {
    color: string;
    usage: string;
  };
  accent: {
    color: string;
    usage: string;
  };
}

export interface FontRecommendation {
  headingFont: string;
  bodyFont: string;
  headingFallback: string;
  bodyFallback: string;
}

export interface DesignResult {
  request: DesignRequest;
  palettes: ColorPalette[];
  fonts: FontRecommendation;
}
