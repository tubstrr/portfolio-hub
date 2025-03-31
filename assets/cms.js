const inbound = {
  id: "inbound",
  name: "INBOUND 2024",
  url: "https://www.inbound.com",
  video_url: "inbound.mp4",
  color: "#213343",
  // dark_color: "#fef5eb",
  dark_color: "#66d9c8",
};

const cac = {
  id: "cac",
  name: "Chicago Architecture Center",
  url: "https://www.architecture.org",
  video_url: "cac.mp4",
  color: "#CC0000",
  // dark_color: "#c66",
  dark_color: "#9d9fa2",
};

const chicago_beyond = {
  id: "chicago_beyond",
  name: "Chicago Beyond",
  url: "https://chicagobeyond.org",
  video_url: "chicago_beyond.mp4",
  color: "#0055b7",
  dark_color: "#ffb000",
};

const rabs = {
  id: "rabs",
  name: "RABS",
  url: "https://www.runabetterset.com",
  video_url: "rabs.mp4",
  color: "#0073cf",
  dark_color: "#ed474a",
};

const netjets = {
  id: "netjets",
  name: "NetJets",
  url: "https://www.netjets.com/en-us/bombardier-global-7500",
  video_url: "netjets.mp4",
  color: "#444240",
  dark_color: "#86b4ce",
};

const precision_vision = {
  id: "precision_vision",
  name: "Precision Vision",
  url: "https://precision-vision.com",
  video_url: "pv.mp4",
  color: "#e60000",
  dark_color: "#e0a814",
};

const streamlit = {
  id: "streamlit",
  name: "Streamlit",
  url: "https://streamlit.io/",
  video_url: "streamlit.mp4",
  color: "#ff4f00",
  dark_color: "#5ce488",
};

const fifteen = {
  id: "fifteen",
  name: "15 Puzzle",
  url: "https://15-puzzle.jonknoll.dev",
  video_url: "15.mp4",
  color: "#004643",
  dark_color: "#6eb784",
};

const numberish = {
  id: "numberish",
  name: "Numberish",
  url: "https://numberish.jonknoll.dev",
  video_url: "numberish.mp4",
  color: "#00c951",
  dark_color: "#05df72",
};

const triangle_puzzle = {
  id: "triangle_puzzle",
  name: "Triangle Puzzle",
  url: "https://triangle-puzzle.jonknoll.dev",
  video_url: "triangle_puzzle.mp4",
  color: "#000000",
  dark_color: "#ffffff",
};

const static_fonts = {
  id: "static_fonts",
  name: "Static Fonts",
  url: "https://static-fonts.jonknoll.dev",
  video_url: "static_fonts.mp4",
  color: "#3d6fb1",
  dark_color: "#8bb5cb",
};

const doughnut = {
  id: "doughnut",
  name: "How to Doughnut?",
  video_url: "doughnut.mp4",
  url: "https://doughnut.jonknoll.dev",
  color: "#3d6fb1",
  dark_color: "#edeeef",
  // color:
};

const change_blindness = {
  id: "change_blindness",
  name: "Change Blindness",
  video_url: "change_blindness.mp4",
  url: "https://change-blindness.jonknoll.dev",
  color: "#000000",
  dark_color: "#ffffff",
  // color:
};

const cubrr = {
  id: "cubrr",
  name: "Cubrr",
  video_url: "cubrr.mp4",
  url: "https://cubrr.jonknoll.dev",
  color: "#000000",
  dark_color: "#ffffff",
  // color:
};

export const categories = [
  {
    id: "professional",
    name: "Professional",
    projects: [
      cac,
      inbound,
      chicago_beyond,
      streamlit,
      rabs,
      netjets,
      precision_vision,
    ],
  },
  {
    id: "personal",
    name: "Personal",
    projects: [
      fifteen,
      numberish,
      static_fonts,
      doughnut,
      // change_blindness,
      cubrr,
    ],
  },
];

export const bioHTML = `
<p>I’m Jonathan Knoll, a self-taught full-stack developer who’s spent the last decade building, problem-solving, and leading teams on high-impact projects. I started in the agency world, where I learned to juggle tight deadlines, tricky client requests, and fast-moving projects. Over time, I worked my way up to managing an eight-person development team, tackling projects for Fortune 500 companies, and refining my ability to turn complex ideas into clean, scalable solutions.</p>
<p>After years of agency life, I’ve realized that I don’t just want to build things—I want to build things that last. I’m looking for a team where I can invest long-term, refine and improve a product over time, and collaborate with people who push each other to be better. I thrive in environments that balance challenge with sustainability, where developers can grow without burning out, and where great work is done together.</p>
<p>Right now, my wife and I are traveling full-time, chasing adventure while planning for the next chapter of our lives. That vision shapes my next career move—I’m looking for meaningful work, a strong team, and the opportunity to build something that truly matters.</p>
`;
