// TV Show Rating Data - Tech-120 Brainrot Bar Analysis
export const tvShowData = [
  {
    id: 1,
    tvShow: "The Goonies",
    image: "/images/the-goonies.jpg",
    sensoryHijack: 7,
    timeSink: 8,
    adPressure: 3,
    frictionToIntent: 5,
    cognitiveCaptureNegative: 23,
    educational: 4,
    quality: 7,
    moralLesson: 5,
    theme: 7,
    cognitiveNutrition: 23,
    total: 23,
    notes: 0
  },
  {
    id: 2,
    tvShow: "Star Wars: Rebels",
    image: "/images/star-wars-rebels.jpg",
    sensoryHijack: 8,
    timeSink: 7,
    adPressure: 10,
    frictionToIntent: 6,
    cognitiveCaptureNegative: 31,
    educational: 4,
    quality: 8,
    moralLesson: 9,
    theme: 8,
    cognitiveNutrition: 29,
    total: 29,
    notes: -2
  },
  {
    id: 3,
    tvShow: "Paw Patrol",
    image: "/images/paw-patrol.jpg",
    sensoryHijack: 7,
    timeSink: 9,
    adPressure: 5,
    frictionToIntent: 6,
    cognitiveCaptureNegative: 27,
    educational: 4,
    quality: 5,
    moralLesson: 8,
    theme: 6,
    cognitiveNutrition: 27,
    total: 27,
    notes: 0
  },
  {
    id: 4,
    tvShow: "Peppa Pig",
    image: "/images/peppa-pig.jpg",
    sensoryHijack: 3,
    timeSink: 6,
    adPressure: 1,
    frictionToIntent: 2,
    cognitiveCaptureNegative: 12,
    educational: 6,
    quality: 7,
    moralLesson: 7,
    theme: 6,
    cognitiveNutrition: 26,
    total: 26,
    notes: 14
  },
  {
    id: 5,
    tvShow: "Doc McStuffins",
    image: "/images/doc-mcstuffins.jpg",
    sensoryHijack: 2,
    timeSink: 4,
    adPressure: 3,
    frictionToIntent: 4,
    cognitiveCaptureNegative: 13,
    educational: 7,
    quality: 9,
    moralLesson: 9,
    theme: 8,
    cognitiveNutrition: 33,
    total: 33,
    notes: 20
  },
  {
    id: 6,
    tvShow: "My Little Pony",
    image: "/images/my-little-pony.jpg",
    sensoryHijack: 7,
    timeSink: 4,
    adPressure: 5,
    frictionToIntent: 4,
    cognitiveCaptureNegative: 20,
    educational: 5,
    quality: 8,
    moralLesson: 10,
    theme: 8,
    cognitiveNutrition: 31,
    total: 31,
    notes: 11
  },
  {
    id: 7,
    tvShow: "Transformers: Prime",
    image: "/images/transformers-prime.jpg",
    sensoryHijack: 10,
    timeSink: 6,
    adPressure: 8,
    frictionToIntent: 5,
    cognitiveCaptureNegative: 29,
    educational: 3,
    quality: 8,
    moralLesson: 8,
    theme: 8,
    cognitiveNutrition: 27,
    total: 27,
    notes: -2
  },
  {
    id: 8,
    tvShow: "Transformers: Roll Out",
    image: "/images/transformers-roll-out.jpg",
    sensoryHijack: 7,
    timeSink: 6,
    adPressure: 7,
    frictionToIntent: 6,
    cognitiveCaptureNegative: 26,
    educational: 7,
    quality: 8,
    moralLesson: 9,
    theme: 7,
    cognitiveNutrition: 31,
    total: 31,
    notes: 5
  },
  {
    id: 9,
    tvShow: "Teen Titans GO",
    image: "/images/teen-titans-go.jpg",
    sensoryHijack: 9,
    timeSink: 9,
    adPressure: 7,
    frictionToIntent: 9,
    cognitiveCaptureNegative: 34,
    educational: 3,
    quality: 4,
    moralLesson: 4,
    theme: 6,
    cognitiveNutrition: 17,
    total: 17,
    notes: -17
  },
  {
    id: 10,
    tvShow: "The Amazing World of Gumball",
    image: "/images/the-amazing-world-of-gumball.jpg",
    sensoryHijack: 8,
    timeSink: 6,
    adPressure: 3,
    frictionToIntent: 7,
    cognitiveCaptureNegative: 24,
    educational: 3,
    quality: 6,
    moralLesson: null,
    theme: null,
    cognitiveNutrition: 9,
    total: 9,
    notes: -15
  }
];

// Helper functions for data analysis
export const getBrainrotLevel = (notes) => {
  if (notes === null || notes === undefined) return "Unknown";
  if (notes >= 15) return "Excellent";
  if (notes >= 5) return "Good";
  if (notes >= 0) return "Neutral";
  if (notes >= -10) return "Concerning";
  return "High Brainrot";
};

export const getBrainrotColor = (notes) => {
  if (notes === null || notes === undefined) return "#9ca3af";
  if (notes >= 15) return "#10b981";
  if (notes >= 5) return "#34d399";
  if (notes >= 0) return "#fbbf24";
  if (notes >= -10) return "#fb923c";
  return "#ef4444";
};

export const getAverageRating = (shows, category) => {
  const validShows = shows.filter(show => show[category] !== null && show[category] !== undefined);
  if (validShows.length === 0) return 0;
  const sum = validShows.reduce((acc, show) => acc + show[category], 0);
  return (sum / validShows.length).toFixed(1);
};

export const categoryLabels = {
  sensoryHijack: "Sensory Hijack",
  timeSink: "Time Sink",
  adPressure: "Ad Pressure",
  frictionToIntent: "Friction to Intent",
  cognitiveCaptureNegative: "Cognitive Capture",
  educational: "Educational",
  quality: "Quality",
  moralLesson: "Moral Lesson",
  theme: "Theme",
  cognitiveNutrition: "Cognitive Nutrition",
  total: "Total",
  notes: "Notes"
};

