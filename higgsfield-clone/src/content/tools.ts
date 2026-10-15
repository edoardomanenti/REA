// Copy and option lists for the studio pages. Section layout and option counts
// follow the original pages (REA capture); the option values are placeholder
// content you can replace.

export interface Attribute {
  readonly id: string;
  readonly label: string;
  readonly options: readonly string[];
}

const words = (list: string): string[] => list.split(",").map((w) => w.trim());

export const influencerAttributes: readonly Attribute[] = [
  {
    id: "type",
    label: "Character type",
    options: words(
      "Average, Bold, Extreme, Insect, Frog, Cat, Dog, Rodent, Bird",
    ),
  },
  {
    id: "gender",
    label: "Gender",
    options: words("Female, Male, Non-binary, Androgynous, Other"),
  },
  {
    id: "build",
    label: "Build",
    options: words("Slim, Athletic, Average, Muscular, Curvy, Heavy, Petite"),
  },
  {
    id: "hairstyle",
    label: "Hairstyle",
    options: words(
      "Bob, Pixie, Buzz cut, Crew cut, Undercut, Mullet, Afro, Braids, Cornrows, Dreadlocks, Bun, Top knot, Ponytail, Pigtails, Long straight, Long wavy, Curly, Shag, Bowl cut, Side part, Slicked back, Pompadour, Mohawk, Bald, Fringe, Wolf cut",
    ),
  },
  {
    id: "hair_color",
    label: "Hair Color",
    options: words(
      "Black, Dark brown, Brown, Light brown, Blonde, Platinum, Red, Ginger, Gray, White, Blue, Pink, Green",
    ),
  },
  {
    id: "style",
    label: "Style",
    options: words(
      "Casual, Streetwear, Formal, Sporty, Vintage, Punk, Boho, Futuristic",
    ),
  },
  {
    id: "ethnicity",
    label: "Ethnicity",
    options: words(
      "African, East Asian, South Asian, European, Latino, Middle Eastern",
    ),
  },
  { id: "age", label: "Age", options: words("Young adult, Adult, Senior") },
  {
    id: "skin",
    label: "Skin color",
    options: words("Porcelain, Fair, Light, Medium, Olive, Tan, Brown, Deep"),
  },
  { id: "height", label: "Height", options: words("Short, Average, Tall") },
  {
    id: "proportions",
    label: "Proportions",
    options: words(
      "Balanced, Long legs, Long torso, Broad shoulders, Exaggerated",
    ),
  },
  {
    id: "head",
    label: "Head shape",
    options: words(
      "Oval, Round, Square, Long, Heart, Diamond, Triangle, Rectangle, Oblong, Pear",
    ),
  },
  { id: "neck", label: "Neck", options: words("Short, Average, Long, Thick") },
  {
    id: "eye_shape",
    label: "Eye shape",
    options: words(
      "Almond, Round, Hooded, Monolid, Upturned, Downturned, Deep-set, Close-set, Wide-set, Protruding, Narrow",
    ),
  },
  {
    id: "eye_color",
    label: "Eye color",
    options: words(
      "Brown, Dark brown, Hazel, Green, Blue, Gray, Amber, Violet",
    ),
  },
  {
    id: "features",
    label: "Features",
    options: words(
      "Freckles, Dimples, Beauty mark, High cheekbones, Strong jaw, Cleft chin, Big nose, Small nose, Hooked nose, Full lips, Thin lips, Gap teeth, Big ears, Thick eyebrows, Thin eyebrows, Unibrow, Long lashes, Rosy cheeks, Wrinkles, Smile lines, Double chin, Sharp chin, Button nose, Wide mouth, Pointy ears",
    ),
  },
  {
    id: "facial_hair",
    label: "Facial hair",
    options: words(
      "None, Stubble, Mustache, Goatee, Short beard, Full beard, Long beard, Sideburns",
    ),
  },
  {
    id: "distinctive",
    label: "Distinctive features",
    options: words(
      "Scar, Tattoos, Piercings, Birthmark, Vitiligo, Heterochromia, Gold tooth, Eye patch, Face paint, Glitter, Mole, Freckle cluster, Albinism, Prosthetic",
    ),
  },
  {
    id: "accessories",
    label: "Accessories",
    options: words("Glasses, Sunglasses, Hat, Earrings, Necklace, Headphones"),
  },
];

export const influencerMotions = words(
  "Runway walk, Dance loop, Mirror selfie, Unboxing, Reaction, Talking head, Slow turn, Jump cut, Street interview, Product demo, Laughing, Wave hello",
);

export const quickCutPresets = [
  { title: "Late study", category: "Personalized edits" },
  { title: "Outfit check", category: "Style transfer" },
  { title: "Back tattoo", category: "Personalized edits" },
  { title: "Color wheel", category: "Motion transfer" },
  { title: "Mirror room", category: "Style transfer" },
  { title: "Office walk", category: "Motion transfer" },
  { title: "Neon chase", category: "Personalized edits" },
  { title: "Paper city", category: "Style transfer" },
  { title: "Slow zoom", category: "Motion transfer" },
  { title: "Crowd surf", category: "Personalized edits" },
  { title: "Glitch drop", category: "Style transfer" },
  { title: "Run cycle", category: "Motion transfer" },
] as const;

export const quickCutFilters = [
  "All",
  "Personalized edits",
  "Motion transfer",
  "Style transfer",
] as const;

export const effectPresets = words(
  "Floating fall, Incline, Act natural, Lacewalker, Burning man, Melting, World morphing, High flip, Street colossus, Selfception, Cutout, Eyes in, Wild ride, Smash and grab, Studio slide, Paper tear, Time freeze, Rewind, Giant step, Rain room",
);

export const cinemaControls = [
  {
    id: "film",
    label: "Film setup",
    options: words(
      "Auto, 35mm film, 16mm film, Digital cinema, Anamorphic, VHS, IMAX",
    ),
  },
  {
    id: "camera",
    label: "Camera",
    options: words(
      "Auto, Static, Dolly in, Dolly out, Orbit, Crane up, Handheld, Drone, Whip pan",
    ),
  },
  {
    id: "palette",
    label: "Color palette",
    options: words(
      "Auto, Teal & orange, Noir, Pastel, Neon, Desaturated, Warm, Cold",
    ),
  },
  {
    id: "lighting",
    label: "Lighting",
    options: words(
      "Auto, Golden hour, Blue hour, Low key, High key, Neon, Candlelight, Overcast",
    ),
  },
] as const;

export const marketingShots = words(
  "Closeup, Hero, Flat lay, Lifestyle, Macro, Wide",
);

export const marketingFilters = [
  "All",
  "Product shot",
  "Motion",
  "UGC",
  "TikTok",
  "Ads",
  "Posters",
  "Marketplace",
] as const;

export const marketingTemplates = [
  { title: "Frost float", category: "Product shot", kind: "image" },
  { title: "Brushed metal", category: "Product shot", kind: "image" },
  { title: "Tea macro", category: "Motion", kind: "video" },
  { title: "Cold can", category: "Product shot", kind: "image" },
  { title: "Silk set", category: "Product shot", kind: "image" },
  { title: "Lid lift", category: "Motion", kind: "video" },
  { title: "Block yard", category: "Posters", kind: "image" },
  { title: "Morning dew", category: "Product shot", kind: "image" },
  { title: "Chili sky", category: "Ads", kind: "image" },
  { title: "Before / after", category: "UGC", kind: "video" },
  { title: "Mono callouts", category: "Motion", kind: "video" },
  { title: "Cap on blue", category: "Marketplace", kind: "image" },
  { title: "Unbox it", category: "TikTok", kind: "video" },
  { title: "Shelf ready", category: "Marketplace", kind: "image" },
  { title: "Sale poster", category: "Posters", kind: "image" },
  { title: "Try-on", category: "UGC", kind: "video" },
] as const;

export const editTools = [
  "Relight",
  "Inpaint",
  "Layer decomposition",
  "Edit text",
  "Effects",
] as const;

export const audioTabs = [
  "Text to Speech",
  "Voice Change",
  "Translate",
] as const;
export const audioLanguages = words(
  "English, Italian, Spanish, French, German, Portuguese, Japanese, Korean, Chinese, Hindi, Arabic",
);
