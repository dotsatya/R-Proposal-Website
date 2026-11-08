export interface ProposalConfig {
  senderName: string;
  recipientName: string;
  title: string;

  // Screen 1: Welcome Screen
  welcomeCatImage: string;
  welcomeTitleLine1: string;
  welcomeTitleSpecial: string;
  welcomeTitleLine3: string;
  welcomeSubtitle: string;
  welcomeButton: string;

  // Screen 2: Trust Question
  trustCatImage: string;
  trustTitle: string;
  trustSubtitle: string;
  trustQuestion: string;
  trustYesButton: string;
  trustNoButton: string;

  // Screen 3: Love Confirmation
  loveCatImage: string;
  loveTitle: string;
  loveSubtitle: string;
  loveQuestion: string;
  loveYesButton: string;
  loveNoButton: string;

  // Screen 4: Final Proposal Question & Modal
  finalFlorkImage: string;
  modalGunCatImage: string;
  finalTitle: string;
  finalSubtitle: string;
  finalQuestion: string;
  finalYesButton: string;
  finalThinkButton: string;
  modalTitle: string;
  modalText: string;
  modalButton: string;

  // Screen 5: Couple Graphics Coverflow Gallery
  coupleGraphics: { src: string; alt: string }[];
  coupleGallerySubtitle: string;
  coupleGalleryButton: string;

  // Screen 6: Special Message Envelope & Card
  secretEnvelopeImage: string;
  secretCatImage: string;
  secretTitleWhite: string;
  secretTitlePink: string;
  secretCardPrompt: string;

  // Screen 7: Heartfelt Letter
  letterCatImage: string;
  letterParagraph1: string;
  letterParagraph2: string;
  letterHighlight: string;
  letterParagraph3: string;
  letterButton: string;

  // Screen 8: Celebration Screen
  celebrationEmojiRow: string[];
  celebrationTitleLine1: string;
  celebrationTitleLine2: string;
  celebrationSubtitle1: string;
  celebrationSubtitle2: string;
  celebrationReplayButton: string;

  // Background Audio
  music: string;
  musicFallback: string;
}

export const proposalConfig: ProposalConfig = {
  senderName: "Ranajit",
  recipientName: "My Dearest Love",
  title: "A Special Journey Made Just For You",

  // Screen 1: Welcome Screen
  welcomeCatImage: "/images/cat-sticker.png",
  welcomeTitleLine1: "I have something",
  welcomeTitleSpecial: "special",
  welcomeTitleLine3: "to tell you...",
  welcomeSubtitle: "Something that will change everything ✧",
  welcomeButton: "Tap to Begin",

  // Screen 2: Trust Question
  trustCatImage: "/images/crying-cat.png",
  trustTitle: "Be honest with me...",
  trustSubtitle: "This is important to me 💕",
  trustQuestion: "Do you trust me?",
  trustYesButton: "Yes, I do 💕",
  trustNoButton: "No 🥺",

  // Screen 3: Love Confirmation
  loveCatImage: "/images/flower-cat.png",
  loveTitle: "One more thing...",
  loveSubtitle: "I need to know this 💖",
  loveQuestion: "Do you also love me?",
  loveYesButton: "Yes, I love you! 💖",
  loveNoButton: "No 😳",

  // Screen 4: Final Proposal Question & Modal
  finalFlorkImage: "/images/flork-heart.png",
  modalGunCatImage: "/images/gun-cat.png",
  finalTitle: "Last question, I promise!",
  finalSubtitle: "This one is the most important 🌟",
  finalQuestion: "Will you be mine forever?",
  finalYesButton: "Yes, forever! 🫀",
  finalThinkButton: "Let me think... 🤔",

  modalTitle: "Just Say YES! 💕",
  modalText:
    "Come on, don't make me wait! You know deep down in your heart that you want to say yes. Let's make this moment magical together! 🌟",
  modalButton: "Yes, I'll Say YES! 🫀 ✨",

  // Screen 5: Couple Graphics Coverflow Gallery
  coupleGraphics: [
    { src: "/images/couple-night.jpg", alt: "Starry night picnic cuddled together" },
    { src: "/images/couple-meadow.jpg", alt: "Sitting hand-in-hand in sunlit meadow under the tree" },
    { src: "/images/couple-sunset.jpg", alt: "Golden sunset walk by the ocean waves" }
  ],
  coupleGallerySubtitle: "Now for the most important part...",
  coupleGalleryButton: "See My Message",

  // Screen 6: Special Message Envelope & Card
  secretEnvelopeImage: "/images/love-envelope.png",
  secretCatImage: "/images/pointing-cat.png",
  secretTitleWhite: "This is just for ",
  secretTitlePink: "you...",
  secretCardPrompt: "Tap to see what's inside",

  // Screen 7: Heartfelt Letter
  letterCatImage: "/images/heart-crown-cat.png",
  letterParagraph1:
    "I keep coming back to you because what I feel for you isn't just a simple liking. I believe there's something much deeper in my heart for you. Even after you said no, I still tried to reach out because my feelings for you are genuine.",
  letterParagraph2:
    "I truly love you, and this isn't just some temporary attraction that will disappear if you reject me. It's not like I'll simply give up and start trying with someone else just because you said no.",
  letterHighlight: "Attraction and love are not the same thing.",
  letterParagraph3:
    "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my forever. You complete me in ways words could never express. Every sunrise reminds me of your warmth, and every star reminds me of the sparkle in your eyes.",
  letterButton: "Yes, I'm Yours Forever! ♥",

  // Screen 8: Celebration Screen
  celebrationEmojiRow: ["💕", "🎉", "💖", "✨", "💕"],
  celebrationTitleLine1: "You made me the",
  celebrationTitleLine2: "happiest!",
  celebrationSubtitle1: "Thank you for saying yes 💝",
  celebrationSubtitle2: "I promise to love you forever and always...",
  celebrationReplayButton: "Replay All",

  // Audio Configuration
  music: "/audio/romantic-music.mp3",
  musicFallback: "/audio/romantic-music.mp3"
};
