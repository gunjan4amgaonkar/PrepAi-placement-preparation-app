// Offline roadmap builder, used when AI is unavailable (or when the student prefers a template).

export const roles = [
  "Software Developer",
  "Web Developer",
  "Full Stack Developer",
  "Data Analyst",
  "QA / Test Engineer",
  "Data Science / ML Trainee",
];

export const focusAreas = ["Aptitude", "Coding / DSA", "Core CS subjects", "Communication", "Projects & Resume", "Mock tests"];

const roleSkills = {
  "Software Developer": ["Core language (Java, C++ or Python) in depth", "OOP concepts and design basics", "REST APIs and a small backend project"],
  "Web Developer": ["HTML, CSS and responsive layouts", "JavaScript fundamentals and DOM", "A React project deployed online"],
  "Full Stack Developer": ["JavaScript and a frontend framework", "Node/Express or Django backend with a database", "An end-to-end project with login and CRUD"],
  "Data Analyst": ["SQL joins, grouping and window functions", "Excel and data cleaning", "Python with pandas and a small dashboard"],
  "QA / Test Engineer": ["Testing types and test case design", "SQL basics and API testing", "Selenium or Playwright basics and bug reports"],
  "Data Science / ML Trainee": ["Python, NumPy and pandas", "Statistics and probability basics", "A simple ML project with scikit-learn"],
};

const themes = [
  { title: "Foundations and diagnosis", tasks: (hrs) => [`Take one mock test from the Mock Tests module to find weak areas`, `Revise percentages, ratios and time-speed-distance for ${hrs} hour(s) on 3 days`, `Set up your coding profile and solve 5 easy problems`, `Update your profile and list your projects and skills`] },
  { title: "Aptitude and problem solving", tasks: () => [`Do 2 timed aptitude sets (Quantitative and Logical)`, `Learn arrays and strings patterns, solve 8 problems`, `Revise number series and coding-decoding`, `Review every mistake in a notebook`] },
  { title: "Data structures", tasks: () => [`Study linked lists, stacks and queues; solve 8 problems`, `Practise hashing problems such as Two Sum and anagrams`, `Revise Big-O for common operations`, `Solve 2 medium problems untimed, then timed`] },
  { title: "Core CS subjects", tasks: () => [`Go through Operating Systems flashcards (processes, deadlock, memory)`, `Go through DBMS flashcards and practise 10 SQL queries`, `Revise OOP pillars with examples in your language`, `Review Computer Networks basics (OSI, TCP vs UDP, HTTP)`] },
  { title: "Algorithms and projects", tasks: () => [`Learn recursion, sorting and binary search; solve 8 problems`, `Introduction to trees and basic graph traversal (BFS and DFS)`, `Work on your main project and write a clear README`, `Prepare a 2-minute explanation of your project`] },
  { title: "Communication and HR", tasks: () => [`Write and practise your Tell me about yourself answer`, `Practise 5 HR questions using the STAR method`, `Do 2 group discussion sessions with the timer and notes`, `Record one extempore talk and review it`] },
  { title: "Mock tests and revision", tasks: () => [`Take a full placement mock test and review it the same day`, `Revise weak topics from your Progress page`, `Do 2 timed coding sessions`, `Polish your resume to one clean page`] },
  { title: "Final polish", tasks: () => [`Take 2 more mock tests under real timing`, `Practise technical flashcards you marked as Revise later`, `Do a full mock interview with a friend`, `Prepare questions to ask the interviewer and research target companies`] },
];

export function buildTemplateRoadmap({ role, level, weeks, hours, focus }) {
  const skills = roleSkills[role] || roleSkills["Software Developer"];
  const count = Math.max(2, Math.min(12, Number(weeks) || 6));
  const plan = [];

  for (let i = 0; i < count; i += 1) {
    // Spread the themes across the chosen number of weeks.
    const themeIndex = Math.min(themes.length - 1, Math.floor((i / count) * themes.length));
    const theme = themes[themeIndex];
    const tasks = theme.tasks(hours);
    const roleTask = skills[i % skills.length];
    const extra = focus.length ? `Spend extra time on: ${focus[i % focus.length]}` : null;

    plan.push({
      week: i + 1,
      title: theme.title,
      goals: [
        level === "Beginner" ? "Build the basics steadily without skipping fundamentals" : "Increase speed and accuracy on medium-level questions",
        i === count - 1 ? "Be interview-ready with a clean resume and mock practice" : "Finish every task below and review mistakes",
      ],
      tasks: [...tasks, `Role skill: ${roleTask}`, ...(extra ? [extra] : [])],
    });
  }

  return {
    summary: `A ${count}-week template plan for a ${role} (${level.toLowerCase()} level) with about ${hours} hour(s) of study per day. It moves from fundamentals to core subjects, communication and mock tests.`,
    weeks: plan,
    source: "template",
  };
}
