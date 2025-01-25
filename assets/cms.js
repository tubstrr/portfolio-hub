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
  url: "https://15.joshuapowell.dev",
  video_url: "15.mp4",
  color: "#004643",
};

const numberish = {
  id: "numberish",
  name: "Numberish",
  url: "https://numberish.joshuapowell.dev",
  video_url: "numberish.mp4",
  // color:
};

const triangle_puzzle = {
  id: "triangle_puzzle",
  name: "Triangle Puzzle",
  url: "https://triangle-puzzle.joshuapowell.dev",
  video_url: "triangle_puzzle.mp4",
  // color:
};

const static_fonts = {
  id: "static_fonts",
  name: "Static Fonts",
  url: "https://static-fonts.joshuapowell.dev",
  video_url: "static_fonts.mp4",
  // color:
};

const doughnut = {
  id: "doughnut",
  name: "How to Doughnut?",
  video_url: "doughnut.mp4",
  url: "https://doughnut.joshuapowell.dev",
  // color:
};

const change_blindness = {
  id: "change_blindness",
  name: "Change Blindness",
  video_url: "change_blindness.mp4",
  url: "https://change-blindness.joshuapowell.dev",
  // color:
};

const cubrr = {
  id: "cubrr",
  name: "Cubrr",
  video_url: "cubrr.mp4",
  url: "https://cubrr.joshuapowell.dev",
  // color:
};

export const categories = [
  {
    id: "websites",
    name: "Websites",
    headline: "Websites I've built",
    description:
      "I have built a number of websites for clients and personal projects. Here are a few of my favorites.",
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
    id: "apps",
    name: "Apps",
    headline: "Apps I've built",
    description:
      "I have built a number of apps for clients and personal projects. Here are a few of my favorites.",
    projects: [fifteen, numberish, triangle_puzzle],
  },
  {
    id: "side_projects",
    name: "Side Projects",
    headline: "Side Projects",
    description:
      "I have built a number of side projects. Here are a few of my favorites.",
    projects: [static_fonts, doughnut, change_blindness, cubrr],
  },
];

export const bioHTML = `
<p>As you know by now, my name is Jonathan Knoll and I'm a software engineer with about a decade of experience; if you're interested, here's my full career journey.</p>
<p>It all started in fall of 2015 inside a Panera Bread; While I was working there as a bus boy I would day dream about what my future held.  I didn't know exactly where I was going, but I knew one thing for certain: I did not want to be at Panera forever. With that in mind I started looking for careers that would allow me to have the lifestyle I wanted.   I was split between learning how to be a forex trader, and a web developer.  Naturally, I started teaching myself both careers hoping one would take off. Thankfully web development took off!</p>
<p>In the summer of 2016 I had been teaching myself web development for a bit under a year; I realized I had zero experience applying or interviewing. In order to learn how to interview, I decided to go to a local agency and ask to speak to their hiring manager 😅Little did I know the agency was the owner and one developer!  I ended up talking to the owner of the agency and by the end of the conversation he decided to take a chance on me and gave me a 2 week internship.  That internship turned into a part time position, which turned into four years and my first my first salary.   I think back to that season as an inverted college experience; where I was able to learn about the skills to work in the industry while getting paid.</p>
<p>After four years under my belt I tried to build my own agency.  I really cared about the local economy, and felt that there was an opportunity to build a new kind of agency.  One focused on local businesses, building relationships and focusing on delivering value rather than maximizing profits.  Turns out local businesses don't really want to take a chance on a 22 year old during a global pandemic. More than that though, I learned that I'm not cut out to run a business. The dream of being your own boss is enticing, however the reality of running a business is quite stressful.</p>
<p>Shortly after I closed the doors on my business I got hired at a proper agency in Chicago. Here I really learned the industry; I had the opportunity to work on many projects with many technologies, lead projects for fortune 500 companies, assemble unique tech stacks for each client, negotiate contracts, and lead a team of 7 developers. In my time there I was able to really hone my skills and I learned a lot; A lot about myself, a lot about teams, a lot about technology. My time at this agency came to a close when the agency imploded on itself; After a year of not winning any projects the agency was forced to lay off most of the staff. After a brief bout of unemployment I landed a job at another agency in Chicago and have been continuing to work there.</p>
`;
