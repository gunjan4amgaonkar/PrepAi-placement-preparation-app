// Group discussion topics, frameworks and phrases.

export const gdCategories = ["Technology", "Business", "Society", "Education", "Abstract"];

// [category, topic, a point in favour, a point against]
const gdRaw = [
  ["Technology", "AI watermarking: should every AI-generated image and text carry a visible mark?", "It helps people spot misinformation and protects creators from impersonation.", "Marks can be removed or faked, and strict rules may hurt small developers and privacy."],
  ["Technology", "Smart city surveillance: safety or privacy loss?", "Cameras and sensors can cut crime and speed up emergency response.", "Mass data collection risks misuse, profiling and a chilling effect on freedom."],
  ["Technology", "Biometric data for everyday services: convenient or risky?", "Fingerprints and face ID are quick and hard to forget or share like passwords.", "You cannot change your biometrics if they leak, so breaches cause lifelong risk."],
  ["Technology", "Brain-computer interfaces: the next big leap or an ethical minefield?", "They can restore movement and communication for people with severe disabilities.", "Neural data is deeply private, and enhancement could create a new inequality."],
  ["Technology", "Will AI take away more jobs than it creates?", "Automation can replace repetitive work faster than workers can retrain.", "Past technologies created new roles, and AI can boost productivity and new industries."],
  ["Technology", "Should coding be compulsory in schools?", "It builds logic and problem solving and prepares students for a digital economy.", "Not every student needs it, and it may crowd out other subjects without enough teachers."],
  ["Technology", "Social media: a boon or a bane for students?", "It connects people, spreads learning and creates opportunities.", "It affects focus, sleep and mental health, and spreads misinformation."],
  ["Technology", "Is work from home here to stay?", "It saves commute time and widens the talent pool.", "It can weaken team bonding, mentoring for freshers and work-life boundaries."],

  ["Business", "Startup vs corporate job: which is better for a fresher?", "Startups give wide ownership, faster learning and quicker growth.", "Corporates offer structured training, stability and brand value to start a career."],
  ["Business", "Should the gig economy be regulated like regular employment?", "Gig workers need basic protections like insurance and minimum earnings.", "Heavy rules could raise costs and reduce the flexibility that makes gig work attractive."],
  ["Business", "Is cryptocurrency the future of money?", "It enables fast, borderless payments and reduces dependence on intermediaries.", "High volatility, scams and energy use raise doubts about it as everyday money."],
  ["Business", "Do we need a cashless economy?", "Digital payments improve transparency, convenience and reduce cash handling costs.", "Digital divide, connectivity gaps and security risks can exclude many people."],
  ["Business", "Make in India: can the country become a manufacturing hub?", "A big workforce and market can attract global manufacturers and create jobs.", "Infrastructure, skills and supply chain gaps still need long-term investment."],
  ["Business", "Is a four-day work week practical?", "Trials suggest happier, more focused employees with similar output.", "Not every industry can compress work, and customer-facing roles may struggle."],

  ["Society", "Is reservation or quota still needed in education and jobs?", "It addresses historical disadvantage and widens representation.", "Critics argue benefits should be targeted by need and that merit should be the main criterion."],
  ["Society", "Should voting be made compulsory?", "Higher turnout makes results more representative of the whole population.", "Forcing people to vote conflicts with freedom of choice and may produce uninformed votes."],
  ["Society", "Is nuclear family better than joint family today?", "Smaller homes give privacy, independence and faster decisions.", "Joint families offer emotional support, shared costs and care for children and elders."],
  ["Society", "Climate change: who should bear the cost, nations or individuals?", "Large emitters and rich nations have caused more harm and have more resources.", "Individual choices add up, and every country must act for any real result."],
  ["Society", "Are electric vehicles the answer to pollution?", "They cut tailpipe emissions and noise, especially with clean electricity.", "Battery mining, charging infrastructure and grid power sources create new challenges."],

  ["Education", "Online learning vs classroom learning.", "Online learning is flexible, affordable and gives access to top teachers anywhere.", "Classrooms give discipline, interaction and hands-on practice that screens cannot fully replace."],
  ["Education", "Are marks and grades the right way to judge students?", "Grades give a standard and objective way to compare and select.", "They push rote learning and ignore creativity, practical skills and effort."],
  ["Education", "Should English be the medium of instruction everywhere?", "It improves access to global jobs, research and technology.", "Learning in the mother tongue helps understanding and protects local languages."],
  ["Education", "Is a college degree still necessary for a good career?", "A degree gives structured learning, credentials and a network.", "Skills, projects and certifications can matter more in many tech roles."],

  ["Abstract", "Is failure the stepping stone to success?", "Failure teaches resilience and shows what to fix.", "Repeated failure without reflection or support can drain confidence and resources."],
  ["Abstract", "Is honesty always the best policy?", "Trust built on honesty lasts longer and saves you from bigger problems.", "Sometimes tact and context matter, and brutal honesty can hurt without helping."],
  ["Abstract", "Money vs passion in choosing a career.", "Financial security gives freedom and stability to take care of responsibilities.", "Passion drives long-term effort and growth, which often leads to money too."],
  ["Abstract", "Is multitasking a skill or a myth?", "Switching between simple tasks can be efficient and is a daily requirement.", "Research suggests it reduces quality and focus for complex work."],
];

export const gdTopics = gdRaw.map(([category, title, pro, con], i) => ({ id: `g${i + 1}`, category, title, pro, con }));

export const gdFrameworks = [
  {
    name: "PEEL for every point",
    steps: ["Point: state your idea in one line", "Evidence: a fact, example or number", "Explain: why it matters", "Link: tie it back to the topic or to the previous speaker"],
  },
  {
    name: "Define – Debate – Decide",
    steps: ["Define the topic and key terms in the first 20 seconds", "Debate: cover two or three angles (social, economic, technical)", "Decide: summarise the common ground and a balanced conclusion"],
  },
  {
    name: "Pros – Cons – Way forward",
    steps: ["Pros: strongest 2 benefits", "Cons: strongest 2 risks", "Way forward: a practical solution such as rules, awareness or phased rollout"],
  },
  {
    name: "Time, People, Place lens",
    steps: ["Past vs present vs future impact", "Individuals vs society vs government", "Urban vs rural or India vs the world"],
  },
];

export const gdOpeners = [
  "Let me begin by defining what this topic really means...",
  "This is a timely topic, and I would like to look at it from two angles...",
  "A quick fact to set the context: ...",
  "Before we go into the details, it would help to agree on the scope...",
];

export const gdLinkers = [
  "Building on what [name] said, ...",
  "I partly agree with that point, but ...",
  "To add a different perspective, ...",
  "That's a fair concern. A practical way to address it is ...",
];

export const gdClosers = [
  "To summarise, we agreed that ... while the open question is ...",
  "In conclusion, the balanced way forward is ...",
  "Both sides have merit, and the best outcome comes from ...",
];

export const gdDos = [
  "Speak early if you have a clear point, since the first 2 minutes matter",
  "Listen and refer to others by name",
  "Use short, structured points with one example",
  "Invite quiet members in politely",
  "Stay calm when someone disagrees",
];

export const gdDonts = [
  "Do not interrupt or raise your voice",
  "Do not repeat the same point or go off topic",
  "Do not quote numbers you are unsure about",
  "Do not turn the discussion into a personal argument",
  "Do not stay silent for the whole discussion",
];
