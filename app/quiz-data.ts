export type PersonalityKey =
  | "boldExplorer"
  | "smoothOperator"
  | "cozyClassic"
  | "wildCard";

export type AnswerOption = {
  id: string;
  text: string;
  personality: PersonalityKey;
  icon: "ember" | "balance" | "comfort" | "spark";
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  answers: AnswerOption[];
};

export type PersonalityProfile = {
  key: PersonalityKey;
  name: string;
  headline: string;
  description: string;
  energy: string;
  coffeeName: string;
  coffeeDescription: string;
  image: string;
  accent: string;
};

export const personalities: PersonalityProfile[] = [
  {
    key: "boldExplorer",
    name: "Bold Explorer",
    headline: "Intense taste, zero hesitation.",
    description:
      "You gravitate toward coffees with depth, drama, and real presence. You want your cup to feel memorable, powerful, and impossible to ignore.",
    energy: "Strong, adventurous, grounded",
    coffeeName: "Midnight Summit",
    coffeeDescription:
      "A smoky, dark roast with commanding body and a finish that feels confident from first sip to last.",
    image: "/results-bold-explorer.svg",
    accent: "from-[#7f4c2f] to-[#3f2416]",
  },
  {
    key: "smoothOperator",
    name: "Smooth Operator",
    headline: "Balanced, polished, effortlessly good.",
    description:
      "You value coffees that feel refined and easy to come back to. For you, the best cup is smooth, elegant, and quietly impressive.",
    energy: "Balanced, polished, dependable",
    coffeeName: "Golden Hour",
    coffeeDescription:
      "A light-medium roast with soft sweetness and a clean finish that feels calm, modern, and beautifully composed.",
    image: "/results-smooth-operator.svg",
    accent: "from-[#c78b4c] to-[#8d6136]",
  },
  {
    key: "cozyClassic",
    name: "Cozy Classic",
    headline: "Comfort-first, warm all the way through.",
    description:
      "You want coffee that feels inviting, familiar, and emotionally easy to love. Your ideal cup is less about surprise and more about settling in.",
    energy: "Warm, familiar, inviting",
    coffeeName: "Sunrise Blend + Sunday Paper",
    coffeeDescription:
      "Comforting caramel, vanilla, hazelnut, and chocolate notes built for slower mornings and dependable favorites.",
    image: "/results-cozy-classic.svg",
    accent: "from-[#b58a68] to-[#72543f]",
  },
  {
    key: "wildCard",
    name: "Wild Card",
    headline: "Curious palate, surprise welcome.",
    description:
      "You are open to the coffees that feel a little different, a little riskier, and a lot more interesting. Discovery is part of the reward.",
    energy: "Curious, expressive, experimental",
    coffeeName: "Off the Map",
    coffeeDescription:
      "A rotating micro-lot with unusual processing and unexpected flavor notes for mornings that should feel a little more alive.",
    image: "/results-wild-card.svg",
    accent: "from-[#6f6a9d] to-[#33435e]",
  },
];

export const questions: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "What kind of coffee flavor do you reach for most often?",
    answers: [
      {
        id: "q1-a",
        text: "Deep, smoky, and intense",
        personality: "boldExplorer",
        icon: "ember",
      },
      {
        id: "q1-b",
        text: "Balanced, smooth, and easy to enjoy every day",
        personality: "smoothOperator",
        icon: "balance",
      },
      {
        id: "q1-c",
        text: "Warm, sweet, and comforting",
        personality: "cozyClassic",
        icon: "comfort",
      },
      {
        id: "q1-d",
        text: "Bright, unusual, and a little unexpected",
        personality: "wildCard",
        icon: "spark",
      },
    ],
  },
  {
    id: "q2",
    prompt: "When you try a new coffee, what matters most to you?",
    answers: [
      {
        id: "q2-a",
        text: "A strong profile that makes an impression immediately",
        personality: "boldExplorer",
        icon: "ember",
      },
      {
        id: "q2-b",
        text: "Consistency and a polished, reliable cup",
        personality: "smoothOperator",
        icon: "balance",
      },
      {
        id: "q2-c",
        text: "A cozy flavor that feels relaxing and familiar",
        personality: "cozyClassic",
        icon: "comfort",
      },
      {
        id: "q2-d",
        text: "Something surprising that feels different from anything else",
        personality: "wildCard",
        icon: "spark",
      },
    ],
  },
  {
    id: "q3",
    prompt: "How adventurous are you with your coffee choices?",
    answers: [
      {
        id: "q3-a",
        text: "I like bold picks, but I still want them to feel powerful and grounded",
        personality: "boldExplorer",
        icon: "ember",
      },
      {
        id: "q3-b",
        text: "I usually stay in a lane that I know works for me",
        personality: "smoothOperator",
        icon: "balance",
      },
      {
        id: "q3-c",
        text: "I prefer easygoing, approachable coffees over anything too intense",
        personality: "cozyClassic",
        icon: "comfort",
      },
      {
        id: "q3-d",
        text: "I want to try whatever sounds the most interesting or unusual",
        personality: "wildCard",
        icon: "spark",
      },
    ],
  },
  {
    id: "q4",
    prompt: "What kind of morning coffee moment sounds best to you?",
    answers: [
      {
        id: "q4-a",
        text: "A strong cup that wakes me up fast and means business",
        personality: "boldExplorer",
        icon: "ember",
      },
      {
        id: "q4-b",
        text: "A smooth, easy cup that fits seamlessly into my routine",
        personality: "smoothOperator",
        icon: "balance",
      },
      {
        id: "q4-c",
        text: "A comforting cup that feels like a slow exhale",
        personality: "cozyClassic",
        icon: "comfort",
      },
      {
        id: "q4-d",
        text: "A cup that makes me curious and gives me something new to think about",
        personality: "wildCard",
        icon: "spark",
      },
    ],
  },
  {
    id: "q5",
    prompt:
      "If NovaBrew were choosing a bag for you, what would you want it to optimize for?",
    answers: [
      {
        id: "q5-a",
        text: "Boldness and depth",
        personality: "boldExplorer",
        icon: "ember",
      },
      {
        id: "q5-b",
        text: "Balance and drinkability",
        personality: "smoothOperator",
        icon: "balance",
      },
      {
        id: "q5-c",
        text: "Comfort and familiarity",
        personality: "cozyClassic",
        icon: "comfort",
      },
      {
        id: "q5-d",
        text: "Discovery and experimentation",
        personality: "wildCard",
        icon: "spark",
      },
    ],
  },
  {
    id: "q6",
    prompt: "Which description feels most like your coffee personality?",
    answers: [
      {
        id: "q6-a",
        text: "Confident, intense, and not here to play it safe",
        personality: "boldExplorer",
        icon: "ember",
      },
      {
        id: "q6-b",
        text: "Calm, polished, and dependably good taste",
        personality: "smoothOperator",
        icon: "balance",
      },
      {
        id: "q6-c",
        text: "Warm, inviting, and all about comfort",
        personality: "cozyClassic",
        icon: "comfort",
      },
      {
        id: "q6-d",
        text: "Curious, expressive, and always open to something new",
        personality: "wildCard",
        icon: "spark",
      },
    ],
  },
];

export const personalityLookup = personalities.reduce<
  Record<PersonalityKey, PersonalityProfile>
>((acc, profile) => {
  acc[profile.key] = profile;
  return acc;
}, {} as Record<PersonalityKey, PersonalityProfile>);
