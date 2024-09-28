<template>

  <!-- Page container -->
  <div style="padding: 10px;">

    <!-- Title -->
    <h2 style="margin-top:5px; text-align:center">

      Software Developer "Job Applications Tracker"

      <hr>

      --<span style="color: limegreen">{{ job_apps.length }}</span> jobs applied 
        
      <span style="color:red;">{{ numberOfDays }}</span><span style="color:black;"> of </span>     

      <span style="color:dodgerblue;">{{ numDaysPostGCUgraduation }}</span> 
      
      previous days 
      
      [<span style="color:gray">{{ (numberOfDays / numDaysPostGCUgraduation).toFixed(2) }}</span>%]--

      <br />

      --<span style="color: red">{{ appliesPerDay }}</span>/<span style="color:dodgerblue;">{{ (job_apps.length/numDaysPostGCUgraduation).toFixed(1) }}</span> applies daily--

    </h2>

    <hr/>

    <!-- Num Rejections and Pending -->
    <h4 style="margin:0; line-height:1.6;">

      Pending:
      <span style="color: limegreen">{{ statistics.num_inprogress }}</span> ({{ ((statistics.num_inprogress / job_apps.length) * 100).toFixed(2) }}%)

      <br />

      Rejections:
      <span style="color: red">{{ statistics.num_rejections }}</span> ({{((statistics.num_rejections / job_apps.length) * 100).toFixed(2)}}%)

      <br/>

      RESULT: <big style="color:dodgerblue;">1</big> interview per <big style="color:limegreen;">{{ avgAppliesForInterview }}</big> jobs applied.
      <br/>

      <span v-if="appsBetweenInterviews[appsBetweenInterviews.length-1] < avgAppliesForInterview"> FORECAST: Apply to <big style="color:brown">{{ avgAppliesForInterview - appsBetweenInterviews[appsBetweenInterviews.length-1] }}</big> more jobs to acquire your next interview! 📈 </span>

      <span v-else> FORECAST: You should have gotten another interview <big style="color:red">{{ appsBetweenInterviews[appsBetweenInterviews.length-1] - avgAppliesForInterview }}</big> applies ago! 😢 </span>

      <hr />

      Total interviews acquired:
      <span style="color:dodgerblue; font-size:large;">{{ statistics.num_interviews }}</span> ({{ ((statistics.num_interviews / job_apps.length) * 100).toFixed(2) }}%)

      <br />
      
      <span style="color:red;">REJECTED w/interview: </span> <big>{{ job_apps.filter(e => e.i !== undefined && e.i === false).length }}</big>
      <br />

      <span style="color:limegreen;">PENDING w/interview: </span> <big style="color:dodgerblue;">{{ job_apps.filter(e => e.i !== undefined && e.i === true).length }}</big>
      <br/>

      <span style="color:purple;">JOB OFFERS: </span> 
      <big style="font-weight:bold;">
      
        <span v-if="statistics.num_jobOffers > 0" style="color:limegreen;">{{ statistics.num_jobOffers }}</span>
        <span v-else style="color:red;">{{ statistics.num_jobOffers }}</span> 
      
      </big>

    </h4>

    <div style="border-bottom:1px dashed black; text-align:left; padding-bottom:5px; margin-top:10px;">Daily Applies</div>

    <section v-if="job_apps" style="max-height:72px; overflow-Y:auto; padding:8px;">

      <div v-for="(daily, dailyApplies_index) in Object.keys(job_map).reverse()" :key="dailyApplies_index">

        <span style="font-weight: 400">{{ daily }}</span>: {{ job_map[daily] }}

      </div>

    </section>

    <hr />

    <!-- foreach job applied  -->
    <div v-for="(japp, index) in job_apps" :key="index">

      <!-- display Company Name -->
      <h2 v-if="japp.i !== undefined">
        <span style="color:dodgerblue;">{{ job_apps.length - index }}. {{ japp.a }}</span>
        <span v-if="japp.i === false" style="color:red; font-size:medium;"> REJECTED w/interview</span>
        <span v-else-if="japp.i === true" style="color:limegreen;"> PENDING w/interview</span>
      </h2>
      <h2 v-else>{{ job_apps.length - index }}. {{ japp.a }}</h2>

      <h4>
        <!-- display Position Title -->
        <span style="color: blue">{{ japp.b }}</span>

        <!-- display Application Pending Status -->
        (<span v-if="japp.d" style="color: limegreen">In Progress</span>
        <span v-else style="color: red">Rejected</span>)

        <br />

        <!-- display Date Job Applied and/or Rejected -->
        <i v-if="japp.e">Applied: {{ japp.e }}</i>        
        <i v-if="japp.f"> | Rejected: {{ japp.f }}</i>

      </h4>

      <!-- display Job Requirements -->
      <div style="line-height: 1.75">

        <!-- foreach Duty in Job Requirements, display Duty -->
        <span v-for="(duty, index) in japp.c" :key="index">{{ duty }},&nbsp;</span>

      </div>

      <hr />

    </div>

  </div> <!-- End of page container -->

</template>

<script>
export default 
{
  name: "JobApps",
  data() {
    return {
      job_map: null,
      numberOfDays: 0,
      appliesPerDay: 0,
      appsBetweenInterviews: [],
      avgAppliesForInterview: 0,
      numDaysPostGCUgraduation: 0,
      reverseJobsList: [],
      statistics: {
        num_rejections: 0,
        num_inprogress: 0,
        num_interviews: 0,
        num_jobOffers: 0,
      },
      job_apps: [
        {
          a: "PlayStation Global",
          b: "Full Stack Software Engineer II (Contract Role)",
          c: [
            "jQuery",
            "Java",
            "Spring Framework",
            "Spring Boot",
            "JavaScript",
            "React.js",
            "Redux",
            "MySQL",
            "AWS",
            "NoSQL",
            "Node.js",
            "Redis",
            "DynamoDB",
            "BS",
            "Git",
            "CI/CD",
            "API",
          ],
          d: true,
        },
        {
          a: "Activision Blizzard Entertainment",
          b: "Software Engineer, WoW Classic",
          c: ["C++", "C#", "MySQL", "Oracle", "Lua"],
          d: false,
        },
        {
          a: "SpaceX",
          b: "Full Stack Software Engineer (Starlink)",
          c: [
            "HTML",
            "CSS",
            "TypeScript",
            "BS",
            "Python",
            "C#",
            ".NET",
            "Go",
            "Scala",
            "Python",
            "Java",
            "Docker",
            "Kubernetes",
            "React",
            "Angular",
            "JavaScript",
            "PostgreSQL",
            "SQL Server",
            "CI/CD",
            "Gradle",
            "pip",
            "npm",
            "UNIX",
          ],
          d: false,
        },
        {
          a: "Apple",
          b: "Software Security Engineer",
          c: [
            "BS",
            "C",
            "C++",
            "Containerized Server Applications",
            "Deployment",
            "Security",
          ],
          d: false,
        },
        {
          a: "Alphatec Spine",
          b: "Software Engineer I, AIX",
          c: [
            "C#",
            ".NET Core",
            "Unit Tests",
            "OOP",
            "SOLID",
            "Embedded Systems",
            "WPF",
            "SQL",
            "NoSQL",
            "ORM",
            "EFCore",
            "CI/CD",
            "Git",
            "Azure",
            "DevOps",
            "C++",
            "xUnit",
            "nUnit",
            "Python",
            "JavaScript",
            "Agile",
            "Prism",
            "Routing",
            "Data Binding",
            "Hibernate",
            "Dependency Injection",
          ],
          d: true,
        },
        {
          a: "OpenAI | San Francisco, California",
          b: "Software Engineer, Backend",
          c: null,
          d: true,
        },
        {
          a: "Actalent",
          b: "Software Test Engineer",
          c: ["BS", "Python", "C#", "Internship experience"],
          d: false,
        },
        {
          a: "Aviation Training Consulting | Albuquerque, New Mexico",
          b: "Associate Web Developer",
          c: [
            "BS",
            "1 year experience",
            "JavaScript",
            "JQuery",
            "HTML",
            "CSS",
            "XML",
            "Microsoft Office",
            "Photoshop",
            "Dreamweaver",
            "Illustrator",
            "2D animation",
            "Mobile",
          ],
          d: true,
        },
        {
          a: "Rocket Software | Bentonville, Arkansas",
          b: "Software Engineer I",
          c: ["Java", "Minimal professional software engineering experience"],
          d: true,
        },
        {
          a: "Discovery Education | Charlotte, North Carolina",
          b: "Software Engineer",
          c: [
            "Web applications",
            "2+ years of production back-end experience",
            "Python",
            "Flask",
            "SQL",
            "MS SQL Server",
            "MongoDB",
            "Redis",
            "Kubernetes",
            "Docker",
            "i18n",
            "ML",
            "NLP",
            "BS",
            "Elastic Search",
            "Memcached",
            "AWS",
            "EC2",
            "Lambda",
            "Terraform",
          ],
          d: true,
        },
        {
          a: "Kforce Inc | Phoenix, Arizona",
          b: "Java Development Engineer 1",
          c: [
            "BS",
            "Java",
            "1 to 2 years of experience",
            "ReactJS",
            "Next.js",
            "HTML",
            "CSS",
            "JavaScript",
            "Data Structures",
            "Algorithms",
            "Software Design",
            "AWS",
            "Terraforms",
            "Git",
            "Bitbucket",
            "AEM",
            "AEP",
            "Unit Testing",
          ],
          d: true,
        },
        {
          a: "AESC | Carlsbad, California",
          b: "Software Engineer",
          c: [
            "BS",
            "6+ years experience",
            ".NET",
            "C#",
            "ASP.NET",
            "MVC",
            "Angular",
            "JavaScript",
            "SQL Server",
            "Azure",
            "DevOps",
            "Full-Stack",
            "Testing",
            "Software Maintenance",
            "Collaborate",
          ],
          d: true,
          e: "5/3/2024",
        },
        {
          a: "Community Health Accreditation Partner | Riverside, California",
          b: "Software Engineer (.NET)",
          c: [
            "BS",
            "MS preferred",
            ".NET",
            "MVC",
            "Entity Framework",
            "C#",
            "jQuery",
            ".NET Core",
            "React JS",
            "SQL",
            "Microsoft Power Platform",
            "Cloud Flows",
            "Dataflows",
            "Canvas applications",
          ],
          d: true,
          e: "5/3/2024",
        },
        {
          a: "Cognizant Technology Solutions | Lake Forest, California",
          b: "Associate - Software Development Engineer",
          c: [
            "BS",
            "1-4 years experience",
            "API",
            "C#",
            ".NET",
            "WPF",
            "WinForms",
            "Agile",
            "SQL",
            "C++",
            ".NET Core",
            ".NET Standard",
            "Windows",
            "Linux OS",
            "Azure DevOps",
            "Git",
            "TFVC",
          ],
          d: true,
          e: "5/3/2024",
        },
        {
          a: "Microsoft | Redmond, Washington",
          b: "Software Engineering",
          c: [
            "BS",
            "C",
            "C++",
            "C#",
            "Java",
            "JavaScript",
            "Python",
            "Debugging",
            "WebUI3",
            "XAML",
            "Web UI Frameworks",
          ],
          d: true,
          e: "5/4/2024",
        },
        {
          a: "Walgreens | Bellevue, Washington",
          b: "Software Engineer (Frontend, JavaScript, React)",
          c: [
            "BS",
            "2 years experience",
            "APIs",
            "Moblie applications",
            "SDLC",
            "Agile",
            "JavaScript",
            "React",
            "Azure",
            "AWS",
            "GCP",
            "Java",
            "Python",
            "C#",
          ],
          d: true,
          e: "5/6/2024",
        },
        {
          a: "U-Haul | Remote",
          b: "Mobile API Developer",
          c: [
            "3+ years experience",
            "C#",
            ".NET",
            "WebAPI",
            "SOAP",
            "REST",
            "OpenAPI",
            "API",
            "JSON",
            "SQL",
            "Git",
            "Source Control",
            "Visual Studio",
            "Debugging",
            "Unit/Integration Tests",
            "ELK Stack",
            "Kafka",
            "Postman",
            "Azure API",
            "Android",
            "iOS",
          ],
          d: false,
          e: "5/6/2024",
          f: "5/8/2024",
        },
        {
          a: "Upstart Network, Inc. | Remote",
          b: "Software Engineer, Home Lending",
          c: [
            "1+ year experience",
            "Kotlin",
            "Java",
            "C#",
            "JavaScript",
            "React",
            "SQL",
            "AWS",
            "Kafka",
            "Spring Boot",
            "Next.js",
            "Kubernetes",
            "Jira",
          ],
          d: true,
          e: "5/7/2024",
        },
        {
          a: "RSI | United States",
          b: "Software Engineer",
          c: [
            "BS",
            "1-3 years experience",
            "Agile",
            "SDLC",
            "OOD",
            "C#",
            "Entity Framework",
            "REST",
            "Azure",
            "AWS",
            "React",
            "JavaScript",
            "SQL",
          ],
          d: true,
          e: "5/7/2024",
        },
        {
          a: "Complex | Los Angeles, California",
          b: "Software Engineer",
          c: [
            "React",
            "ReactNative",
            "TypeScript",
            "3 years experience",
            "APIs",
          ],
          d: false,
          e: "5/8/2024",
          f: "",
        },
        {
          a: "Orange County Water District | Fountain Valley, California",
          b: "Programmer/Analyst",
          c: [
            "BS",
            "SQL Server",
            "C#",
            ".NET",
            "HTML",
            "JavaScript",
            "C Driver License",
            "3 years experience",
            "Web development",
          ],
          d: false,
          e: "5/8/2024",
          f: "6/4/2024",
        },
        {
          a: "IBISWorld | Los Angeles, California",
          b: "Software Developer",
          c: [
            "5+ years experience",
            "BS",
            "ASP.NET",
            ".NET Core",
            "VB.NET",
            "C#",
            "Visual Studio 2008-2019",
            "SQL Server",
            "XML",
            "JSON",
            "HTML",
            "CSS",
            "JavaScript",
            "JQuery",
            "MVC",
            "WebForms",
            "Azure",
            "DevOps",
            "Git",
            "CMS",
          ],
          d: true,
          e: "5/8/2024",
        },
        {
          a: "Cox Automotive | Irvine, California",
          b: "Software Engineer I",
          c: [
            "BS",
            "C#",
            "C++",
            "OOP",
            "AWS",
            "SQL",
            "NoSQL",
            "React.js",
            ".NET",
            "Agile",
            "Scrum",
          ],
          d: false,
          e: "5/8/2024",
          f: "5/17/2024",
        },
        {
          a: "Crowns Now Inc | Remote",
          b: "Web Developer",
          c: [
            "1 year experience",
            "CSS",
            "Angular",
            "HTML",
            "React",
            "JavaScript",
            "UI/UX",
            "Azure",
          ],
          d: true,
          e: "5/9/2024",
        },
        {
          a: "Microsoft | Redmond, Washington",
          b: "Software Engineer",
          c: [
            "BS",
            "C",
            "C++",
            "C#",
            "Java",
            "JavaScript",
            "Python",
            "Azure",
            "AWS",
            "GCP",
          ],
          d: false,
          e: "5/9/2024",
          f: '7/25/2025'
        },
        {
          a: "Robert Half | Los Angeles, California",
          b: "Software Engineer",
          c: [
            "Python",
            "API",
            "Apache",
            "C++",
            "Database",
            "Hibernate",
            "ORM",
            "AB Testing",
            "Ajax",
            "ASP.NET",
            "CSS",
            "JavaScript",
          ],
          d: true,
          e: "5/9/2024",
        },
        {
          a: "Alpine Data Solutions | Salt Lake City, Utah",
          b: "Full Stack Developer",
          c: [
            "2+ years exp",
            "Java",
            "Angular",
            "ORMs",
            "Postres",
            "SQL Server",
          ],
          d: true,
          e: "5/11/2024",
        },
        {
          a: "NTS - National Taxi Services | Los Angeles, California",
          b: "Full Stack Software Engineer",
          c: [
            "3+ years exp",
            ".NET",
            "SQL",
            "AWS",
            "API",
            "BS",
            "Testing",
            "Documenting",
            "Bugs",
          ],
          d: true,
          e: "5/11/2024",
        },
        {
          a: "Exelon Corporation | Villa Park, Illinois",
          b: "Software Engineer (L1) - Chicago area",
          c: [
            "BS",
            "2-5 years exp",
            "Java",
            ".Net",
            "C#",
            "html",
            "Angular",
            "typescript",
            "ACID",
            "Relational Database",
            "APIs",
            "Troubleshooting",
            "Windows",
            "Solaris",
            "Linux",
            "SCRUM",
            "Kanban",
            "Agile",
            "MS",
            "Test-driven development",
          ],
          d: false,
          e: "5/12/2024",
          f: '8/21/2024'
        },
        {
          a: "Engtal | North Billerica, Michigan",
          b: "C# Software Engineer II",
          c: [
            "BS",
            "3+ years exp",
            "C#",
            "Visual Studio",
            "Agile",
            "Scrum",
            "C++",
            "Robotics",
            "Electro-mechanical systems",
          ],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "firstPRO, Inc. | Boston, Massachusetts",
          b: "Software Engineer (C#, .NET)",
          c: [
            "BS",
            "2+ years exp",
            "C#",
            ".NET",
            "Debug",
            "Troubleshoot",
            "Relational databases",
            "Web applications",
            "Agile",
            "Git",
            "RESTful API",
            "Azure",
            "AWS",
            "ASP.NET",
            "Entity Framework",
            "MVC",
            "React",
            "Vue.js",
            "Kubernetes",
            "Docker",
          ],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "Stashlete, Inc. | Atlanta, Georgia (Remote)",
          b: "Full Stack Developer",
          c: [
            "API",
            "Troubleshoot",
            "Debug",
            "Desktop and mobile applications",
            "HTML",
            "CSS",
            "JavaScript",
            "XML",
            "jQuery",
            "C#",
            "Java",
            "Python",
            "Angular",
            "React",
            "Node.js",
            "MySQL",
            "MongoDB",
            "Apache",
            "UI/UX",
            "BS",
          ],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "Coforge | Atlanta, Georgia",
          b: "C++ Developer with C# & Insurance experience",
          c: [
            "C++",
            "CLI",
            "MS MVC (razor .cshtml)",
            "C#",
            "Javascript",
            "HTML/CSS",
            "SQL",
            "MS Visual Studio",
            "MS .Net framework",
            "WCF service",
            "REST service",
            "WIX for installers",
          ],
          d: false,
          e: "5/12/2024",
          f: "5/15/2024",
        },
        {
          a: "Finturf | Glendale, California",
          b: "Full Stack Developer",
          c: ["HTML", "CSS", "JavaScript", "SQL", "REST API", "Git", "Tableau"],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "Trinus Corporation | Newport Beach, California",
          b: "Software Developer",
          c: [
            "Java",
            "Spring Boot",
            "Micronaut",
            "Containers",
            "Debug",
            "OOA",
            "OOD",
            "REST",
            "SOAP",
            "CI/CD",
            "GIT",
            "Azure DevOps",
            "SonarQube",
            "Unit Testing",
            "API",
          ],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "Closet World | Whittier, California",
          b: "Software Engineer",
          c: [
            "BS",
            "2+ years exp",
            "SQL",
            "JavaScript",
            "VBS",
            "Python",
            "Bash",
            "HTML",
            "xml",
            "wml",
          ],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "Industry Software | Arcadia, California",
          b: "Software Developer Intern",
          c: [
            "JavaScript",
            "HTML",
            "CSS",
            "Python",
            "Django",
            "UX/UI",
            "BS",
            "MySQL",
            "MongoDB",
            "Scripting",
          ],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "Zoom Video Communications | San Jose, California",
          b: "Software Engineer",
          c: [
            "BS",
            "C",
            "C++",
            "2 years exp",
            "WinDbg",
            "Visual Studio",
            "Multi-thread",
            "Multi-processes",
          ],
          d: false,
          e: "5/12/2024",
          f: "5/23/2024",
        },
        {
          a: "Trans Astronautica Corporation | Los Angeles, California",
          b: "Software Developer",
          c: [
            "BS",
            "Python",
            "Rust",
            "C++",
            "Kubernetes",
            "DevOps",
            "GitLab",
            "Linux",
            "Windows",
            "macOS",
          ],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "AssistRx | Irvine, California",
          b: "Software Developer w Angular ( remote )",
          c: [
            ".NET",
            ".NET Core",
            "ASP.NET",
            "C#",
            "Unit Tests",
            "User Stories",
            "Use Cases",
            "Design Patterns",
            "Microservices",
          ],
          d: true,
          e: "5/12/2024",
        },
        {
          a: "SpaceX | Hawthorne, California",
          b: "Full Stack Software Engineer (Starlink)",
          c: [
            "BS",
            "1+ years exp",
            "Python",
            "C#",
            "Go",
            ".NET",
            "Scala",
            "Java",
            "Docker",
            "Kubernetes",
            "React",
            "Angular",
            "JavaScript",
            "PostgreSQL",
            "SQL Server",
            "CI/CD",
            "Gradle",
            "pip",
            "npm",
            "UNIX",
            "CSS",
            "HTML",
            "TypeScript",
            ".NET Core",
            "Microservices",
          ],
          d: false,
          e: "5/12/2024",
          f: "5/16/2024",
        },
        {
          a: "Samsara | United Kingdom (remote)",
          b: "Software Engineer, Full Stack",
          c: [
            "GoLang",
            "GraphQL",
            "Typescript",
            "React",
            "ReactNative",
            "2+ years exp",
          ],
          d: false,
          e: "5/12/2024",
          f: "5/14/2024",
        },
        {
          a: "Amazon.com Services LLC | Seattle, Washington",
          b: "Software Development Engineer, Mesa Terra",
          c: [
            "Java",
            "C++",
            "C#",
            "BS",
            "1+ years experience",
            "C",
            "Python",
            "Data Structures",
            "Algorithm Design",
            "Problem Solving",
            "Complexity Analysis",
            "Node JS",
            "SDLC",
            "Version Control",
            "Agile",
            "Code Reviews",
            "Test-Driven Development",
            "Continuous Deployment",
          ],
          d: false,
          e: "5/13/2024",
          f: '5/15/2024'
        },
        {
          a: "Deloitte | Rosslyn, Virginia",
          b: "Full Stack Developer",
          c: [
            "BS",
            "Active Secret or Top Secret Clearance",
            "Travel up to 25%",
            "2+ years exp",
            "Java",
            "Spring",
            "Node.js",
            "Frontend",
            "JavaScript",
            "Angular",
            "React",
            "RESTful API",
            "Microservice",
          ],
          d: false,
          e: "5/13/2024",
          f: "5/22/2024",
        },
        {
          a: "Bluebeam | Pasadena, California",
          b: "Software Engineer 2",
          c: [
            ".NET",
            "C#",
            "Desktop development",
            "SDLC",
            "Unit Tests",
            "UX/UI",
            "Daily Standups",
            "Sprint Planning",
            "Design Documents",
            "Deployment",
          ],
          d: false,
          e: "5/13/2024",
          f: "5/17/2024",
          g: "https://career55.sapsf.eu/career?company=nemetschek&site=&lang=en_US&login_ns=login&loginFlowRequired=true&showLogOutMsg=true&brandUrl=&_s.crb=KsT3K8flYTlJ2YnINzPL7H36Vuo0069bfvdogKj0Jb8%253d",
        },
        {
          a: "Capgemini Engineering | Ontario, California",
          b: "Software Engineer - UIQ Test Automation",
          c: ["Test Automation", "QA"],
          d: true,
          e: "5/13/2024",
        },
        {
          a: "CivicEye | Charlotte, North Carolina",
          b: "Software Engineer I",
          c: [
            "HTML",
            "CSS",
            "JavaScript",
            "Databases",
            "GitHub",
            "BS",
            "1-3 years exp",
            "Agile",
          ],
          d: false,
          e: "5/14/2024",
          f: "5/21/2024",
        },
        {
          a: "Jobot | Minneapolis, Minnesota",
          b: ".NET Developer",
          c: [
            "C#",
            ".NET",
            "Visual Studio",
            "Code Reviews",
            "BS",
            ".NET Core",
            "OOA",
            "OOD",
            "Architecture",
          ],
          d: false,
          e: "5/14/2024",
          f: "5/16/2024",
        },
        {
          a: "Bright Digital Solutions | Los Angeles, California",
          b: "Entry-Level Software Engineer - Remote",
          c: [
            "BS",
            "Data Structures",
            "Algorithms",
            "Java",
            "Python",
            "C++",
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Angular",
          ],
          d: false,
          e: "5/14/2024",
          f: "5/18/2024",
        },
        {
          a: "CNA National | Scottsdale, Arizona",
          b: "Software Engineer II",
          c: [
            "BS",
            "2+ years exp",
            "Java",
            "Angular",
            "Spring Framework",
            "Spring Boot",
            "REST",
            "Microservices",
            "Junit",
            "Mockito",
            "UI Design",
            "HTML",
            "CSS",
            "JavaScript",
            "SQL",
            "jQuery",
            "Karma",
            "Jasmine",
            "JSP",
            "Git",
            "Kubernetes",
            "Apache Camel",
            "RabbitMQ",
            "Drupal",
            "Eclipse",
            "STS",
            "WebStorm",
            "PL/SQL",
            "Jira",
            "SDLC",
          ],
          d: true,
          e: "5/14/2024",
        },
        {
          a: "Phoenix Recruitment | Chicago, Illinois",
          b: "Website Developer",
          c: ["HTML", "CSS", "Databases", "1+ years exp", "OOP", "SEO", "BS"],
          d: true,
          e: "5/14/2024",
        },
        {
          a: "StockX | Remote",
          b: "Associate Software Development Engineer in Test",
          c: [
            "2-3 years exp",
            "OOP",
            "C#",
            "Java",
            "TypeScript",
            "Web & Mobile applications",
            "QA",
            "Unit Tests",
            "Agile",
            "Scrum",
            "Frontend",
            "Backend",
            "CI/CD",
            "Github",
            "Debugging",
            "Spring Planning",
            "Sprint Grooming",
          ],
          d: false,
          e: "5/14/2024",
          f: '7/25/2024'
        },
        {
          a: "McDonald's Corporation | Chicago, Illinois",
          b: "Software Engineer II - C/C++ [Remote]",
          c: [
            "2+ years exp",
            "C",
            "C++",
            "C#",
            ".NET",
            "Architecture",
            "Design Patterns",
            "Scaling",
            "Reliability",
            "BS",
            "Data Structures",
            "Algorithm Analysis",
            "Agile",
            "OOP",
          ],
          d: true,
          e: "5/14/2024",
        },
        {
          a: "Inland Empire Health Plan | Rancho Cucamonga, California",
          b: "Developer I - Application Development",
          c: [
            "1 year exp",
            "Web Development",
            "BS",
            "AngularJS",
            "C#",
            "Java",
            "WCF",
            "Web API",
            "JavaScript",
            "JQuery",
            "CSS",
            "HTML",
            "MVVM",
            "MVC",
            "MS SQL",
            "Oracle",
            "MySQL",
            "IIS",
          ],
          d: false,
          e: "5/15/2024",
          f: "6/18/2024",
        },
        {
          a: "Electronic Arts | Los Angeles, California",
          b: "Build Engineer (Apex Legends)",
          c: [
            "BS",
            "C#",
            "Java",
            "OOP",
            "Groovy",
            "Python",
            "Bash",
            "Jenkins",
            "TeamCity",
            "Perforce",
            "Ansible",
            "VMWare",
            "GAAS",
            "ADX",
            "Jira",
          ],
          d: true,
          e: "5/15/2024",
          g: "https://ea.gr8people.com/my-jobs",
        },
        {
          a: "SpaceX | Hawthorne, California",
          b: "Full Stack Software Engineer (Starlink Operations)",
          c: [
            "BS",
            "1+ years exp",
            "OOP",
            "Technical Documentation",
            "Angular",
            "React",
            "Docker",
            "Kubernetes",
            "MS SQL",
            "PostgreSQL",
            "GIT",
          ],
          d: false,
          e: "5/16/2024",
          f: "6/4/2024",
        },
        {
          a: "UCLA | Los Angeles, California",
          b: "Full Stack Developer, Human Resources Information Products",
          c: [
            "3 years exp",
            "MySQL",
            "PostgreSQL",
            "MongoDB",
            "5+ years exp",
            "HTML5",
            "CSS3",
            "JavaScript",
            "React",
            "Angular",
            "Vue",
            "Node.js",
            "Python",
            "Java",
            "C#",
            "AWS",
            "Azure",
            "GCP",
            "BS",
          ],
          d: true,
          e: "5/16/2024",
        },
        {
          a: "Property Matrix | Culver City, California",
          b: "Entry Level Software Developer",
          c: [
            "BS",
            "HTML",
            "CSS",
            "JavaScript",
            "Strong work ethic",
            "Positive Attitude",
            "Motivation to learn",
            "Ability to work independently",
            "High level of professionalism and ethics",
            "Design and development of software",
            "Self-starter",
            "Strong desire to increase efficiencies",
            "Make an impact while contributing to a cross-functional team",
            "Display leadership qualities",
          ],
          d: false,
          e: "5/17/2024",
          f: '8/8/2024',
        },
        {
          a: "GEICO | Chevy Chase, Maryland",
          b: "Software Engineer I",
          c: [
            "Java",
            "C++",
            "C#",
            "HTML-5",
            "JavaScript",
            "TypeScript",
            "XML",
            "JSON",
            "RESTful Web Services",
            "Powershell Scripting",
            "SDLC",
            "BS",
            "Azure",
            "Machine Learning",
            "Data Visualization",
            "Python",
            "SQL",
            "NoSQL",
            "Container Orchestration",
            "User requirements",
            "Web applications",
            "Coding reviews",
            "Code quality",
            "Oral and written ommunication skills",
            "Algorithms",
            "Data Structures",
            "Collaboration with Data Scientists, Architects, and Engineers",
            "Big Data",
            "Integration",
            "Distributed Systems",
            "Scalable",
          ],
          d: false,
          e: "5/17/2024",
          f: "6/4/2024",
        },
        {
          a: "UCLA | Los Angeles, California",
          b: "Applications Programmer 3",
          c: [
            ".NET",
            "C#",
            "Angular",
            "NodeJS",
            "ReactJS",
            "SQL",
            "NoSQL",
            "CSS",
            "JavaScript",
            "Cloud",
          ],
          d: true,
          e: "5/20/2024",
        },
        {
          a: "Loma Linda University | Loma Linda, California",
          b: "Full Stack Developer & Database Manager",
          c: ["Java", "JavaScript", "SQL", "MySQL", "Office 365", "BS"],
          d: false,
          e: "5/20/2024",
          f: "5/23/2024",
          g: "https://egln.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/my-profile",
        },
        {
          a: "Disney Entertainment & ESPN Technology | Santa Monica, California",
          b: "Software Engineer I",
          c: [
            "JavaScript", 
            "BS", 
            "Write code", 
            "Web based applications"
          ],
          d: false,
          e: "5/20/2024",
          f: '7/1/2024',
          g: "https://disney.wd5.myworkdayjobs.com/en-US/disneycareer/userHome",
        },
        {
          a: "Esri | Redlands, California",
          b: "Software Development Engineer II - Front End Web Developer",
          c: [
            "JavaScript",
            "TypeScript",
            "React",
            "2D and 3D data visualization",
            "2+ years exp",
            "MySQL",
            "SQL Server",
            "Oracle",
            "SQL",
            "HTML5",
            "CSS3",
            "AngularJS",
            "JQuery",
            "Dojo",
            "REST",
            "BS",
            "MS",
            "GIS",
            "PostgreSQL",
            "Kubernetes",
            "Docker",
            "Spatial data modeling",
          ],
          d: false,
          e: "5/20/2024",
          f: "6/1/2024",
        },
        {
          a: "Socure | (Remote) United States",
          b: "Software Engineer",
          c: [
            "BS",
            "2-3 years exp",
            "Java",
            "Go",
            "JavaScript",
            "React",
            "SQL",
            "NoSQL",
            "AWS",
            "SDLC",
            "Computer Vision",
            "Machine Learning",
            "Data Structures",
            "Algorithms",
            "Distributed Systems",
          ],
          d: false,
          e: "5/20/2024",
          f: '6/22/2024'
        },
        {
          a: "DevDocs | (Remote) United States",
          b: "Software Developer with Documentation Experience (SaaS)",
          c: [
            "BS",
            "API documentation",
            "Swagger",
            "Postman",
            "CI/CD",
            "DevOps",
            "JavaScript",
            "TypeScript",
            "GitHub",
            "Markdown",
            "Docs as Code",
          ],
          d: true,
          e: "5/20/2024",
        },
        {
          a: "Nebula | (Remote) United States",
          b: "Dotnet Developer / ASP.NET MVC",
          c: ["BS", "OOP", ".NET Core", "ASP.NET MVC"],
          d: true,
          e: "5/20/2024",
        },
        {
          a: "Eventeny | (Remote) United States",
          b: "Software Engineer",
          c: [
            "1-4 years exp",
            "BS",
            "HTML5",
            "CSS",
            "JavaScript",
            "PHP",
            "Python",
            "Flutter",
            "SQL",
            "Test-driven development",
          ],
          d: true,
          e: "5/20/2024",
        },
        {
          a: "Super Micro Computer | San Jose, California",
          b: "Software Engineer - System Validation",
          c: [
            "BS",
            "3+ years exp",
            "Python",
            "JavaScript",
            "React",
            "JQuery",
            "Node",
            "Git",
            "Django",
            "API",
            "Docker",
          ],
          d: true,
          e: "5/21/2024",
        },
        {
          a: "ByteDance | San Jose, California",
          b: "Fullstack Software Engineer - Authorization",
          c: [
            "BS",
            "3+ years exp",
            "Golang",
            "JavaScript",
            "TypeScript",
            "HTML",
            "CSS",
            "React",
          ],
          d: true,
          e: "5/21/2024",
          g: "https://jobs.bytedance.com/en/position/application?spread=A3T3U6W",
        },
        {
          a: "DocuSign | San Francisco, California",
          b: "Software Engineer",
          c: [
            "C#",
            "CI/CD",
            "Agile",
            "Scrum",
            "GIT",
            "BS",
            "2+ years exp",
            "API",
            ".Net",
            "Java",
            "NoSQL",
            "SaaS eCommerce",
          ],
          d: false,
          e: "5/21/2024",
          f: '6/26/2024'
        },
        {
          a: "SpaceX | Hawthorne, California",
          b: "Application Software Engineer, Data",
          c: [
            "2+ years exp",
            "BS",
            "Python",
            "Java",
            "Scala",
            "Go",
            "C#",
            "Apache Kafka",
            "Spark",
            "Flink",
            "SQL",
            "HBase",
            "Hive",
            "Delta Lake",
            "PostgreSQL",
            "CockroachDB",
            "Grafana",
            "Jupyter Notebooks",
            "Metabase",
            "PowerBI",
            "Angular",
            "React",
            "JavaScript",
            "Machine learning algorithms",
          ],
          d: false,
          e: "5/21/2024",
          f: "5/25/2024",
        },
        {
          a: "Redbird Flight Simulations | Kyle, Texas",
          b: "Software Engineer",
          c: [
            "BS",
            "C#",
            ".NET",
            "Visual Studio",
            "Elixir",
            "AWS",
            "UI/UX",
            "Databases",
            "Flutter",
            "Git",
            "Unit Tests",
          ],
          d: true,
          e: "5/21/2024",
        },
        {
          a: "Apple | San Diego, California",
          b: "Distributed Activities Software Engineer - Applied Networking",
          c: [
            "BS",
            "OOP",
            "Test-driven development",
            "User interfaces",
            "Functional programming",
          ],
          d: true,
          e: "5/21/2024",
          g: "https://jobs.apple.com/app/en-us/profile/roles",
        },
        {
          a: "Esri | Redlands, California",
          b: "C++ Windows Developer II",
          c: [
            "C++",
            "C#",
            "Asynchronous programming with Task Parallel library",
            "BS",
            "DBMS",
            "MVVM",
            "Written and verbal communication skills",
          ],
          d: true,
          e: "5/21/2024",
        },
        {
          a: "Apple | San Diego, California",
          b: "Software Build Engineer",
          c: [
            "Python",
            "JavaScript",
            "Objective-C",
            "Swift",
            "Git",
            "Sublime",
            "vim",
            "emacs",
            "Xcode",
            "Makefiles",
            "BS",
            "MS",
          ],
          d: true,
          e: "5/21/2024",
          g: "https://jobs.apple.com/app/en-us/profile/roles",
        },
        {
          a: "Apple | San Diego, California",
          b: "Software Development in Test, OS Battery Life",
          c: [
            "BS",
            "MS",
            "C++",
            "Swift",
            "Objective-C",
            "Python",
            "JavaScript",
            "Test automation",
            "QA experience",
            "Analyze, debug, and solve problems",
            "Communication skills",
          ],
          d: false,
          e: "5/21/2024",
          g: "https://jobs.apple.com/app/en-us/profile/roles",
        },
        {
          a: "Liberty Mutual Insurance | Boston, Massachusetts",
          b: "Software Engineer",
          c: [
            "3 years exp",
            "BS",
            "Scrum",
            "Kanban",
            "XP",
            "REST",
            "Microservices",
            "AWS",
            "Azure",
            "Google Cloud",
            "Java",
            "NodeJS",
            "Spring Boot",
            "J2EE",
            "CI/CD",
            "DevOps",
          ],
          d: false,
          e: "5/21/2024",
          f: '7/23/2024'
        },
        {
          a: "Aristocrat Gaming | Reno, Nevada",
          b: "Software Engineer",
          c: [
            "C++",
            "C#",
            "BS",
            "Object-oriented design",
            "Debugging",
            "Agile",
            "Waterfall",
            "Code reviews",
          ],
          d: false,
          e: "5/21/2024",
          f: "6/12/2024",
        },
        {
          a: "TikTok | San Jose, California",
          b: "Fullstack Software Engineer - TikTok Account",
          c: [
            "BS",
            "2 years exp",
            "JavaScript",
            "HTML",
            "CSS",
            "User Interface",
            "User Experience",
            "Go",
            "Java",
            "C++",
            "Python",
            "Distributed systems",
            "API",
            "Unit testing",
            "Authentication",
            "Access Management",
            "Identity",
          ],
          d: true,
          e: "5/27/2024",
        },
        {
          a: "Applied Research Associates, Inc. | Niceville, Florida",
          b: "JWS Junior Software Engineer",
          c: [
            "C#",
            "C++",
            "Git",
            "Agile",
            "Test-Driven development (TDD)",
            "Visual Studio",
            ".NET",
            "3D modeling/visualization",
            "0-2 years exp",
            "DoD Security Clearance",
          ],
          d: true,
          e: "5/27/2024",
        },
        {
          a: "Revature | Tucson, Arizona",
          b: "Entry Level Software Engineer",
          c: ["College Degree", "Desire to learn code"],
          d: true,
          e: "5/28/2024",
          h: ["Java Software Engineer"],
        },
        {
          a: "Wayfair | Austin, Texas",
          b: "Software Engineer I - Summer 2024",
          c: [
            "<1-2 years exp",
            "BS",
            "Full stack",
            "Mobile development",
            "Debugging code",
            "OOP languages",
            "SQL",
            "Java",
            "Python",
            "Machine learning",
            "Agile environments",
            "Communication skills",
            "Cloud platforms",
          ],
          d: false,
          e: "5/28/2024",
          f: '7/11/2024'
        },
        {
          a: "Cognizant | Lake Forest, California",
          b: "Software Engineer - C# .Net Angular (Onsite)",
          c: ["C#", "Azure", "Microsoft Certifications"],
          d: true,
          e: "5/29/2024",
        },
        {
          a: "Apollo | El Segundo, California",
          b: "Full Stack Engineer Analyst",
          c: [
            "BS",
            "0-2+ years exp",
            "Python",
            "C++",
            "Java",
            "CI/CD",
            "GitHub",
            "Docker",
            "Jenkins",
            "Git",
            "Kafka",
            "Messaging systems",
          ],
          d: true,
          e: "5/29/2024",
          g: "https://athene.wd5.myworkdayjobs.com/en-US/Apollo_Careers/userHome",
        },
        {
          a: ".Net Software Developer | Florence, Alabama",
          b: "Advanced Information Technologies, Inc.",
          c: [
            "BS",
            "1 year exp",
            "OOP",
            "Relational databases",
            "MS SQL Server",
            "HTTP",
            "HTML",
            "CSS",
            "JS",
            "Git",
          ],
          d: true,
          e: "6/3/2024",
        },
        {
          a: "USC | Los Angeles, California",
          b: "Programmer Analyst I",
          c: [
            "BS",
            "0-6 months exp",
            "Programming and documentation knowledge",
            "One or more computer programming languages",
          ],
          d: false,
          e: "6/3/2024",
          f: '8/17/2024',
          g: "https://usc.wd5.myworkdayjobs.com/en-US/ExternalUSCCareers/userHome",
        },
        {
          a: "Rober Half | Santa Barbara, California",
          b: ".NET Developer",
          c: [".NET", "ASP.NET", "SQL Server", "SDLC", "GitHub", "Blazor"],
          d: true,
          e: "6/3/2024",
        },
        {
          a: "Enterprise Mobility Inc | San Diego, California",
          b: "Backend Developer",
          c: [
            "4 to 5 years exp",
            "Must know Spanish language",
            "OOP",
            "Springboot",
            "Node JS",
            "APIs",
            "BS",
            "Databases",
            "Front-End",
          ],
          d: true,
          e: "6/3/2024",
        },
        {
          a: "Cambridge Associates LLC | Boston, Massachusetts",
          b: "Jr. Developer",
          c: ["0-2 years exp", "HTML", "Java", "R", "JDBC", "JPA", "Hibernate"],
          d: true,
          e: "6/3/2024",
        },
        {
          a: "New Relic | Atlanta, Georgia",
          b: "Software Engineer",
          c: [
            "2+ years exp",
            "HTML",
            "CSS",
            "Angular",
            "React",
            "HTTP",
            "Test Automation",
            "Mobile app development",
          ],
          d: false,
          e: "6/3/2024",
          f: '7/22/2024'
        },
        {
          a: "Outcomes Operating Inc | Dublin, Ohio",
          b: "Software Engineer I",
          c: [
            "Python",
            "BS",
            "1 year exp",
            "AWS",
            "Airflow",
            "HTML",
            "CSS",
            "JavaScript",
            "Unit Tests",
          ],
          d: false,
          e: '6/3/2024',
          f: '6/21/2024',
          i: false
        },
        {
          a: "Dot Foods, Inc. | Mount Sterling, Illinois",
          b: "Software Engineer - Warehouse",
          c: [
            "BS",
            "2+ years exp",
            ".NET",
            "C#",
            "COBOL",
            "Node JS",
            "HTML",
            "CSS",
            "JavaScript",
            "Angular",
            "Jira",
          ],
          d: false,
          e: "6/3/2024",
          f: "6/16/2024",
        },
        {
          a: "PayPal | San Jose, California",
          b: "Software Engineer - Recent Graduate",
          c: [
            "BS",
            "Unit testing",
            "Test automation",
            "Continuous Integration",
            "TCP/IP",
            "Kafka",
            "Java",
            "Spring Framework",
            "GIT",
            "REST",
            "Asynchronous",
            "Cryptography",
            "JS frameworks",
            "TypeScript",
            "Kotlin",
          ],
          d: false,
          e: "6/3/2024",
          f: "6/12/2024",
        },
        {
          a: "Confluent | Austin, Texas",
          b: "Software Engineer",
          c: [
            "1+ years exp",
            "BS",
            "Go",
            "C/C++",
            "AWS",
            "Azure",
            "GCP",
            "Operating Systems",
            "Kubernetes",
            "Terraform",
          ],
          d: true,
          e: "6/3/2024",
        },
        {
          a: "Teradyne | North Reading, Massachusetts",
          b: "Software Engineer",
          c: [
            "2-5 years exp",
            "C++",
            "C#",
            ".NET",
            "OOD",
            "Python",
            "JSON",
            "BS",
            "Internship exp",
            "Agile",
            "Git",
            "Visual Studio",
            "Windows/Linux",
            "Data structures and Algorithms",
          ],
          d: false,
          e: "6/3/2024",
          f: "6/5/2024",
        },
        {
          a: "American Specialty Health Incorporated | Carmel, Indiana",
          b: "Associate Software Engineer",
          c: [
            "BS",
            "OOD",
            "ASP.Net",
            "SQL Server",
            "Agile",
            "Scrum",
            "VB.Net",
            "C#",
            "6 months exp",
            "SQL queries",
            "SDLC",
          ],
          d: true,
          e: "6/3/2024",
        },
        {
          a: "EVONA | Colorado, United States",
          b: "Junior Backend Software Engineer",
          c: [
            "BS",
            "Agile",
            "Kanban",
            "AWS",
            "Python",
            "C/C++",
            "Rust",
            "Docker",
            "Kubernetes",
            "SQL",
            "NoSQL",
            "Linux",
          ],
          d: true,
          e: "6/3/2024",
        },
        {
          a: "UPS | Parsippany, New Jersey",
          b: "Software Development Engineer I",
          c: [
            "1-2 year exp",
            "C#",
            ".NET",
            "Angular",
            "HTML",
            "SQL",
            "PL/SQL",
            "DevOps",
            "CI/CD",
            "Agile",
            "Scrum",
            "BS",
          ],
          d: false,
          e: "6/3/2024",
          f: '7/8/2024',
          g: "https://hcmportal.wd5.myworkdayjobs.com/en-US/Search/userHome",
        },
        {
          a: "Lockheed Martin Corporation | King of Prussia, Pennsylvania",
          b: "Software Engineer - Early Career",
          c: [
            "Python",
            "C++",
            "Java",
            "DevSecOps",
            "BS",
            "Docker",
            "Kubernetes",
            "Gitlab",
            "MLOps Pipeline",
            "CI/CD",
            "C#",
            "AWS",
            "Azure",
            "TS/SCI",
          ],
          d: false,
          e: "6/3/2024",
          f: '6/19/2024',
          g: "https://sjobs.brassring.com/TGnewUI/ApplyWithPreLoad?partnerid=25037&siteid=5014&bruid=%5EL3wlJoBsW386AjCOrqxSsdJwb75CeQC%2FnsCJTlaN4fs%3D&reqid=762788&localeid=&tqid=300&aipid=0&pageid=0&noback=&ShowNewPolicy=False&wftype=-1#Applications",
        },
        {
          a: "DCS Corp | Belcamp, Maryland",
          b: "Junior Computer Engineer",
          c: [
            "Java",
            "JavaScript",
            "Python",
            "Ruby",
            "C#",
            "Agile",
            "BS",
            "Secret Security clearance",
            "C++",
            "Perl",
          ],
          d: false,
          e: "6/3/2024",
          f: 'Mon 6/24/2024',
          g: "https://phh.tbe.taleo.net/phh04/ats/careers/v2/myJobs?org=DCSCORP2&cws=37",
        },
        {
          a: "McDonald's Corporation | Chicago, Illinois",
          b: "Software Engineer I",
          c: ["BS", "Java", "C++", "C#", "OOD"],
          d: true,
          e: "6/3/2024",
        },
        {
          a: "Garmin | Chandler, Arizona",
          b: "Software Engineer 1 - Mobile Development",
          c: [
            "C",
            "C++",
            "C#",
            "Java",
            "Assembly language",
            "BS",
            ">3.0 GPA",
            "Pilot certificate",
            "Kotlin",
            "SwiftUI",
            "Objective-C",
          ],
          d: false,
          e: "6/4/2024",
          f: "6/6/2024",
        },
        {
          a: "San Diego Zoo Wildlife Alliance | San Diego, California",
          b: "Junior Web Developer",
          c: [
            "BS",
            "HTML5",
            "CSS3",
            "SASS",
            "JavaScript",
            "PHP",
            "Drupal template engine",
            "APIs",
          ],
          d: false,
          e: "6/4/2024",
          f: "6/6/2024",
        },
        {
          a: "Collinwood Technology Partners | Frisco, Texas",
          b: "Junior .NET Developer",
          c: [
            "1-3 years exp",
            ".NET",
            ".NET Core",
            "SDLC",
            "REST APIs",
            "Azure",
            "Azure Functions",
            "Logic Apps",
            "BS",
            "GIT",
            "SQL queries",
          ],
          d: true,
          e: "6/4/2024",
        },
        {
          a: "Fanatics | (Remote) United States",
          b: "Software Engineer I (Java/React)",
          c: [
            "Java",
            "Spring Boot",
            "Microservices",
            "React framework",
            "SCRUM",
          ],
          d: true,
          e: "6/4/2024",
          g: "https://fa-exki-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/my-profile",
        },
        {
          a: "LightBox | Irvine, California",
          b: "Software Engineer",
          c: [
            "OOP",
            "Data structures and algorithms",
            "Multi-threaded and asynchronous programming",
            "Angular",
            "React",
            "Vue",
            "Java",
            "Scala",
            "Git",
            "Gitlab",
            "SVN",
            "Python",
            "TypeScript",
            "JavaScript",
            "Spring",
            "FastAPI",
            "Flask",
            "AWS",
            "Google Vision",
            "Azure",
            "Docker containerization and orchestration",
            "PDF skills",
          ],
          d: true,
          e: "6/5/2024",
        },
        {
          a: "SpaceX | Hawthorne, California",
          b: "Software Engineer (Space Operations)",
          c: [
            "BS",
            "2+ years exp (internships and school projects qualify)",
            "Python",
            "JavaScript",
            "HTML",
            "CSS",
            "LitElement",
            "React",
            "Angular",
            "Flask",
            "Django",
            "FastAPI",
            "SQL",
            "Docker",
            "CI/CD",
            "API",
            "HTTP",
            "REST",
          ],
          d: false,
          e: "6/5/2024",
          f: "6/9/2024",
        },
        {
          a: "Esri | Redlands, California",
          b: "Software Development Engineer in Test I (SDET) - 3D Scene Layers",
          c: [
            "1+ years exp with C++ or C#",
            "OOP",
            "Test Cases",
            "Selenium WebDriver",
            "Appium",
            "Junit",
            "Cunit",
            "Jenkins",
            "Chef",
            "BS",
            "Problem-sovling skills to resolve software issues",
            "XUnit",
            "JSON",
            "REST",
            "JavaScript",
            "3D visualization",
            "Esri ArcGIS",
            "DevOps",
            "Microsoft Unit Testing Framework",
          ],
          d: false,
          e: "6/9/2024",
          f: "6/12/2024",
        },
        {
          a: "hangzzz | Los Angeles, California",
          b: "Full Stack Developer & Cofounder for Startup",
          c: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Angular",
            "Node.js",
            "Python",
            "Ruby",
            "Java",
            "SQL",
            "NoSQL",
            "AWS",
            "Google Cloud",
            "Git",
            "GitHub",
          ],
          d: true,
          e: "6/9/2024",
        },
        {
          a: "Twitch Interactive, Inc. | Seattle, Washington",
          b: "Software Engineer - Identity",
          c: [
            "1+ years of non-internship exp",
            "BS",
            "2+ years working in Service Oriented Architectures",
            "Authentication",
            "Authorization",
            "Federated Identity",
            "Identity Management",
            "Data Privacy Management",
          ],
          d: false,
          e: "6/9/2024",
          f: "6/11/2024",
          g: "https://account.amazon.jobs/en-US",
        },
        {
          a: "Confluent | Austin, Texas (Remote)",
          b: "Software Engineer",
          c: [
            "BS graduate 2023 January - June 2024",
            "Java",
            "C++",
            "C",
            "Python",
            "Go",
            "Interested in building large scale distributed systems",
            "Data structures and algorithms",
          ],
          d: true,
          e: "6/10/2024",
        },
        {
          a: "DoorDash | New York, New York",
          b: "Software Engineer, Backend (All Levels / All Teams)",
          c: [
            "BS",
            "REST API",
            "HTTP",
            "SQL",
            "NoSQL",
            "Postgres",
            "Redis",
            "ElasticSearch",
            "RabbitMQ",
            "Unit Testing",
          ],
          d: false,
          e: "6/10/2024",
          f: '9/9/2024'
        },
        {
          a: "Reli | Cerritos, California",
          b: "Junior Software Developer (Hybrid Remote)",
          c: ["BS", "Python", "eCommerce", "Generate scripts"],
          d: false,
          e: "6/10/2024",
          f: "6/13/2024",
        },
        {
          a: "Joinrs US | (Remote) United States",
          b: "Full Stack Developer [Full Remote]",
          c: [
            "Frontend and Backend development",
            "Collaboration in Software Architecture",
            "Performance Optimization",
            "API Integration and Web Services",
            "Security in Development",
            "Testing and Debugging",
            "Research and Technological development",
          ],
          d: false,
          e: "6/10/2024",
          f: "6/18/2024",
        },
        {
          a: "SkillStorm | Battle Creek, Michigan",
          b: "Entry Level Software Developer",
          c: [
            "BS",
            "1 year exp",
            "Java",
            "C#",
            "OOP",
            "SQL",
            "Data structures and algorithms",
            "Ability to obtain Secret Clearance",
          ],
          d: true,
          e: "6/10/2024",
        },
        {
          a: "BeaconFire, Inc. | New York, United States",
          b: "Java Software Engineer",
          c: [
            "Java",
            "JavaScript",
            "OOP",
            "SQL Server",
            "Oracle",
            "APIs",
            "SDLC",
            "MS",
            "0-1 year Java coding",
            "Spring",
            "Maven",
            "Angular",
            "HTML",
            "CSS",
            "RabbitMQ",
            "JDBC",
            "Tomcat",
          ],
          d: true,
          e: "6/10/2024",
        },
        {
          a: "First Class Appliance Repair | Los Angeles, California",
          b: "Expreienced .NET Developer (Entry Level)",
          c: [
            "BS",
            ".NET",
            "C#",
            "ASP.NET",
            "MVC",
            "SQL Server",
            "HTML",
            "CSS",
            "JavaScript",
            "Agile",
            "Waterfall",
          ],
          d: true,
          e: "6/10/2024",
        },
        {
          a: "J.B. Hunt Transport Services, Inc. | Lowell, Arkansas",
          b: "Software Engineer I",
          c: [
            "BS",
            "Java",
            "JavaScript",
            "TypeScript",
            "CI/CD",
            "Troubleshoot Bugs",
          ],
          d: false,
          e: "6/10/2024",
          f: "6/14/2024",
          g: "https://jbhunt.wd5.myworkdayjobs.com/en-US/Careers/userHome",
        },
        {
          a: "Toast | Ontario, Oregon",
          b: "Software Engineer II",
          c: ["OOP", "Full-Stack", "Logging and Metrics"],
          d: false,
          e: "6/10/2024",
          f: '8/6/2024'
        },
        {
          a: "Dexian Inc | San Francisco, California",
          b: "F1-OPT Junior Web Developer",
          c: [
            "BS",
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap",
            "Git",
            "Responsive web design",
          ],
          d: true,
          e: "6/10/2024",
        },
        {
          a: "Almo Corporation | Philadelphia, Pennsylvania",
          b: "Software Engineer",
          c: [
            "BS",
            "0-3 years exp",
            "C#",
            "Java",
            "Data structures and Algorithms",
            "Vault version control",
          ],
          d: false,
          e: "6/10/2024",
          f: '7/16/2024',
          g: "https://www.linkedin.com/jobs/view/3945772858/",
        },
        {
          a: "Sandalwood Engineering & Ergonomics | Redford, Michigan",
          b: "Full Stack Developer",
          c: [
            "Strong software development background",
            "C#",
            "Node.js",
            "Angular",
            "CSS",
            "BS",
          ],
          d: true,
          e: "6/10/2024",
          g: "https://www.indeed.com/cmp/Sandalwood-Engineering-&-Ergonomics/jobs?jk=cc074dbe491df599&start=0",
        },
        {
          a: "Boyd Watterson Asset Management | Cleveland, Ohio",
          b: "Junior Programmer Analyst",
          c: [
            "BS",
            "Delphi in a client server",
            "SQL",
            "Customer Service skills",
            "Detail-oriented with strong analytical skills",
            "Abilitiy to prioritize multiple tasks",
            "Excellent organization skills",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.indeed.com/cmp/Boyd-Watterson-Asset-Management/jobs?start=0",
        },
        {
          a: "Los Angeles Community College District | Los Angeles, California",
          b: "Applications Developer/Programmer",
          c: [
            "BS",
            "Java",
            ".Net",
            "C++",
            "C#",
            "PHP",
            "Python is preferred",
            "2 years exp",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.indeed.com/cmp/Los-Angeles-Community-College-District/jobs?jk=a7131f5f81f2a477&start=0",
        },
        {
          a: "Prelim | Los Angeles, California",
          b: "Software Engineer In Test (LA Remote)",
          c: [
            "Selenium",
            "Playwright",
            "JavaScript",
            "Excellent analytical and problem-solving skills",
            "Strong attention to detail and a commitment to delivering high-quality software",
            "Excellent communication and teamwork skills",
            "Regression testing",
            "SDLC",
          ],
          d: true,
          e: "6/10/2024",
          g: "https://www.indeed.com/cmp/Prelim/jobs",
        },
        {
          a: "Triller Platform Co | Los Angeles, California",
          b: "Jr. Developer - UI/UX",
          c: [
            "Use your influence to identify and pursue user-centric outcomes within and across products",
            "Create design deliverables representative of the design process phase – such as journey maps, wireframes, user flows, UI design and prototypes",
            "Effectively facilitate multiple cross functional working teams and collaborate across multiple design and product teams",
            "Develop and contribute to UX strategy and vision for product experiences across digital platforms – influencing investment, collaborations, and the balance of new vs. Iteration",
          ],
          d: true,
          e: "6/11/2024",
        },
        {
          a: "Logix Federal Credit Union | Valencia, California",
          b: "Software Engineer Senior (Full Time Hybrid, CA)",
          c: [
            "BS",
            "5+ years exp",
            ".NET Framework/Core",
            "WCF",
            "microservices",
            "JavaScript",
            "JSON",
            "XML",
            "Development with SQL Server databases, views, triggers, and stored procedures",
            "Candidates for this position must provide a recent code sample in ASP.Net or C#",
          ],
          d: true,
          e: "6/11/2024",
        },
        {
          a: "Europe HR Solutions | (Remote) United States",
          b: "Software Engineer for Biotronics3D USA",
          c: [
            "BS",
            "Excellent problem-solving abilities",
            "Strong organizational and time management skills",
            "Meticulous attention to detail",
            "High sense of responsibility and accountability",
            "Effective communication tailored to various audiences and situations",
            "Proficiency in .NET and C# development",
            "Experience with web services security and deployment.",
            "Familiarity with Azure DevOps Pipelines.",
            "Expertise in React and TypeScript.",
            "Knowledge of SQL Server.",
            "Experience with Agile methodology (Scrum).",
            "Competence in unit testing.",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3947602946/?alternateChannel=search&refId=4TorL8CLM9n7qolbX8Mlww%3D%3D&trackingId=SRdPufBJK%2FYsGnOkThk19w%3D%3D",
        },
        {
          a: "Bright Digital Solutions | Los Angeles, California",
          b: "Software Engineer (Remote)",
          c: [
            "BS",
            "Java",
            "Python",
            "C++",
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Angular",
            "Data structures and algorithms",
          ],
          d: true,
          e: "6/11/2024",
        },
        {
          a: "Brillio | (Remote) United States",
          b: "NodeJS Backend Developer",
          c: [
            "Docker",
            "Express",
            "Java",
            "Spring Boot",
            "RDBMS",
            "Typescript",
            "Nestjs",
            "jQuery",
            "MongoDB",
            "JavaScript (ES6)",
            "React JS",
            "Angular JS",
            "HTML",
            "CSS",
          ],
          d: true,
          e: "6/11/2024",
        },
        {
          a: "Career Movement | Los Angeles, California",
          b: "Dotnet Developer",
          c: [
            "Create and integrate new API's",
            "Troubleshoot, maintain, and enhance existing applications",
            "Write SQL queries",
            "C# and .NET",
            "Web API's",
            "SQL",
            "Cloud Services",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3947414539/?alternateChannel=search&refId=qzFnp3Dv%2BkwWpwlj%2FWCjRA%3D%3D&trackingId=xLSERNj29gTuXmGpR8Evxg%3D%3D&trk=d_flagship3_job_details",
        },
        {
          a: "Acushnet Company | Carlsbad, California",
          b: "Programmer Technician | Titleist",
          c: [
            "High school diploma or equivalent required",
            "A minimum of one year experience modifying programs with VBA and/or SQL is required",
            "Must have demonstrated troubleshooting skills as it pertains to the necessary databases",
          ],
          d: false,
          e: "6/11/2024",
          f: '6/23/2024',
          g: "https://eiro.fa.us6.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/my-profile",
        },
        {
          a: "Gannett | USA TODAY NETWORK | (Remote) United States",
          b: "Website Developer",
          c: [
            "Experience in Website Development",
            "BS",
            "HTML/HTML5",
            "CSS/CSS3",
            "JavaScript",
            "jQuery",
            "WordPress",
            "GIT",
            "Kanban",
          ],
          d: false,
          e: "6/11/2024",
          f: '7/18/2024',
          g: "https://www.linkedin.com/jobs/view/3947177128/?alternateChannel=search&refId=qzFnp3Dv%2BkwWpwlj%2FWCjRA%3D%3D&trackingId=%2Fjdq2bO2MXqKqX5wmwwYGg%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Piper Companies | (Remote) United States",
          b: "Backend Software Engineer",
          c: [
            "2+ years exp as Database Adminstrator",
            "1 year exp of SQL Server T-SQL development/programming",
            "Agile",
            "SCRUM",
            "GIT",
            "BS",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3943032925/?alternateChannel=search&refId=uIFO8uGHLd%2F1bZCwM%2FNJjw%3D%3D&trackingId=zRlNI0z7ebDwpcoAZ8%2B47w%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "State Farm | Tempe, Arizona",
          b: "Software Engineer",
          c: [
            ".NET",
            "C#",
            "ASP.NET",
            "HTML",
            "CSS",
            "JavaScript",
            "SQL Server",
            "API",
            "DevOps",
            "Agile",
            "AWS",
          ],
          d: false,
          e: "6/11/2024",
          f: "6/17/2024",
          g: "https://www.linkedin.com/jobs/view/3943095847/?alternateChannel=search&refId=%2FLvEr3xh%2BAVyC6sYlyfkSg%3D%3D&trackingId=Xt%2B1rgoCsrbLhpMDJf%2BnGg%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "ONE (Open Network Exchange) | Scottsdale, Arizona",
          b: "Data Engineer (On-site Scottsdale AZ)",
          c: [
            "BS",
            "SQL",
            "Python",
            "Java",
            "Scala",
            "AWS",
            "Azure",
            "GCP",
            "Hadoop",
            "Spark",
            "ETL processes",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3943043800/?alternateChannel=search&refId=zImN8iUpN7RoZ5607v5KZA%3D%3D&trackingId=az3DTgxASO7JD5u6msASbA%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Epic | Fresno, California",
          b: "Web Developer",
          c: [
            "BS"
          ],
          d: false,
          e: "6/11/2024",
          f: "6/18/2024",
          g: "https://www.linkedin.com/jobs/view/3945917833/?alternateChannel=search&refId=dP55sD4vzsrFaC0rCOiAeA%3D%3D&trackingId=h3%2BNMfYlU9kNwZ9IGi6aVQ%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Codeium | Mountain View, California",
          b: "Software Engineer",
          c: [
            "Python",
            "C++",
            "Go",
            "TypeScript",
            "Copilot",
            "ChatGPT",
            "AI/ML",
            "Ability to learn and become an expert quickly",
          ],
          d: false,
          e: "6/11/2024",
          f: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3947627004/?alternateChannel=search&refId=MsHcQa%2F92f0eQD4XJd4qwQ%3D%3D&trackingId=rqeE6%2FdNzy62ZtkQa%2BwOTw%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Synapse | San Francisco, California",
          b: "Software Engineer",
          c: [
            "Builds AI support experiences for large enterprises and fast growing startups like Eventbrite, ClassPass, Substack, Rippling, BILT, etc",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3945989274/?alternateChannel=search&refId=MsHcQa%2F92f0eQD4XJd4qwQ%3D%3D&trackingId=iqbz5JfmnP8OyQX5Wm0Jvg%3D%3D&trk=d_flagship3_postapply_immediate_premium",
        },
        {
          a: "Aditi Consulting | Sunnyvale, California",
          b: "Systems Engineer II",
          c: [
            "0-2 years of experience (Academia or Post Grad - any industry)- degree in life sciences or math preferred",
            "BS",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3945788316/?alternateChannel=search&refId=bF6f3lMzT0NQ3AbDHgHF4w%3D%3D&trackingId=C%2FicD0O5SBeUhnSftWcUJw%3D%3D&trk=d_flagship3_postapply_default_confirmation",
        },
        {
          a: "Vellum | San Francisco, California",
          b: "Software Engineer - Backend / Fullstack",
          c: [
            "Google Cloud Platform",
            "Postgres",
            "Python",
            "Django",
            "Flask",
            "Typescript",
            "React",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3945768508/?alternateChannel=search&refId=bF6f3lMzT0NQ3AbDHgHF4w%3D%3D&trackingId=T6hUrh%2Bq9BRUljZhXrVQqA%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Sleeper | Las Vegas, New Mexico",
          b: "Senior Front-End Web Engineer",
          c: [
            "5+ years exp",
            "Proven ability to develop and implement algorithms or systems in a professional setting, with strong coding skills in Javascript and strong a web technologies skillset",
            "Highly proactive, with a track record of building processes from scratch and a willingness to challenge traditional risk management paradigms",
          ],
          d: false,
          e: "6/11/2024",
          f: "6/14/2024",
          g: "https://www.linkedin.com/jobs/view/3947130788/?alternateChannel=search&refId=HRoqW3rjt0Lkx2yW8A5S2A%3D%3D&trackingId=n2%2FQqjCtmmKSf8JaonxVxg%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Actalent | Aurora, Colorado",
          b: "Fullstack Software Engineer",
          c: [
            "2+ years of Java, C++, or Python 2+ years of JavaScript or TypeScript Experience with React, Spring Boot or Dockerwinnin Experience with DevSecOps and Agile Scrum software development methodology including using tools like Git, Jira and Confluence Experience creating software tests to verify functionality and quality",
            "Kubernetes",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3947644427/?alternateChannel=search&refId=B1uIYg9E2JqPS5ZJ9U1yPg%3D%3D&trackingId=3nd1gS3gToh%2FPXbM6PiKrw%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Interclypse | Aurora, Colorado",
          b: "Software Engineer",
          c: [
            "Java/JavaScript",
            "Spring Framework",
            "React/React Native/VueJS/EmberJS",
            "C#/JavaScript",
            "ASP.NET/.NET Core",
            "MSSQL/MongoDB",
          ],
          d: false,
          e: "6/11/2024",
          f: "6/14/2024",
          g: "https://www.linkedin.com/jobs/view/3946464378/?alternateChannel=search&refId=B1uIYg9E2JqPS5ZJ9U1yPg%3D%3D&trackingId=GRZ3AJQUG2WfUmTi6KZ9nQ%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "TEKsystems | Westlake, Texas",
          b: "Full Stack Engineer 60/40",
          c: [
            "Java 30%",
            "70% Angular",
            "Building SPA's from scratch (should've built more than 10 in their career)",
            "AWS",
            "Unit Testing",
          ],
          d: true,
          e: "6/11/2024",
          g: "https://www.linkedin.com/jobs/view/3946449540/?alternateChannel=search&refId=SQrKQSWppJGrbN%2BfkiOnTw%3D%3D&trackingId=%2Bw89IIxIhumFGzUI3vd3zA%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Veranex | Orange, California",
          b: "Software Engineer I",
          c: [
            "BS",
            "1+ years exp",
            "Proficiency or knowledge of SOME/NOT ALL the following technologies (JavaScript, Java, C++. C#, HTML/CSS, TypeScript, SQL, Python, Go), Open-Source RDBMS, NoSQL databases, Docker, Kubernetes, AWS tools, and services",
            "Willingness to work on medical device software in a consulting environment which requires you to work on 2-3 different projects at the same time (and be able to “switch hats” several times during the week).",
            " 1 + years of experience in Medical Devices or other Safety Critical software or related field. Proficiency in creating test cases using C++, GTest and GMock framework, or a similar framework.",
          ],
          d: false,
          e: "6/11/2024",
          f: '6/21/2024',
          g: "https://www.linkedin.com/jobs/view/3946912391/?alternateChannel=search&refId=Zwy6k%2FjHbSLqGeEiF8i%2Bbg%3D%3D&trackingId=h1XtLaSeZxVORqePA2PSkg%3D%3D&trk=d_flagship3_search_srp_jobs",
        },
        {
          a: "Cox Automotive Inc. | Austin, Texas",
          b: "Software Engineer I",
          c: [
            "18 months exp in object-oriented programming (C#, Java, C++, or similar), in a job or through schoolwork",
            "BS",
            "SQL",
            "Cloud experience",
          ],
          d: false,
          e: "6/12/2024",
          f: '6/28/2024',
          g: [
            "https://cox.wd1.myworkdayjobs.com/en-US/Cox_External_Career_Site_1/userHome",
          ],
        },
        {
          a: 'Westlake Services, LLC | Los Angeles, California',
          b: 'Software Engineer I',
          c: [
            'BS',
            '1+ years Java',
            '1+ years Oracle',
            '1+ years views, functions, stored procedures, and SQL queries',
            'Angular, Node JS, JavaScript',
            'Web-Services/API',
            'SVN/Git',
            'Unix or Linux',
            'JDBC, Spring Framework, Spring Boot, Spring Batch, JSON/XML, Servlet, JSP/JSF',
          ],
          d: true,
          e: '6/19/2024',
          g: 'https://www.indeed.com/cmp/Westlake-Financial-2/jobs?jk=b3fb5231ac7116a2&start=0'
        },
        {
          a: 'Westlake Services, LLC | Los Angeles, California',
          b: 'Software Engineer Intern',
          c: [
            'BS',
            'Java',
            'C++',
            'Python',
            'JavaScript',
            'AWS or GCP',
            'SQL database'
          ],
          d: true,
          e: '6/19/2024',
          g: 'https://www.indeed.com/cmp/Westlake-Financial-2/jobs?jk=421ca98e6e6c69a5&start=0'
        },
        {
          a: 'Kaynes | (Remote) United States',
          b: 'Dotnet Developer',
          c: [
            '2+ years exp',
            'C#',
            '.NET Framework',
            'ASP.NET',
            '.NET Core',
            'HTML',
            'CSS',
            'JavaScript',
            'SQL',
            'Git'
          ],
          d: false,
          e: '6/21/2024',
          f: '6/24/2024',
          g: 'https://www.linkedin.com/jobs/view/3955835968/?alternateChannel=search&refId=LuhCHd9hNp6ylsXISAFbLQ%3D%3D&trackingId=DjKQHPtSLJqZ0gKUEC5Xbw%3D%3D&trk=d_flagship3_postapply_open_to_work'
        },
        {
          a: 'In-N-Out | Irvine, California',
          b: 'Software Engineer',
          c: [
            'Angular',
            '.NET',
            'Oracle',
            'PL/SQL',
            'BS',
            'C#',
            'JavaScript',
            'LESS/SASS',
            'HTML',
            'SQL',
            'React',
            'RESTful API',
            '.NET Core',
            '3-5 years exp',
            'WinForms',
            'Azure DevOps',
            'CI/CD'
          ],
          d: false,
          e: '6/21/2024',
          f: '7/1/2024',
        },
        {
          a: 'Phoenix Operations Group | San Diego, California',
          b: 'Software Developer - TS/SCI Required',
          c: [
            'Java',
            'C',
            'C++',
            'GUIs',
            'SDLC',
            'BS'
          ],
          d: false,
          f: '7/8/2024',
          e: '6/21/2024'
        },
        {
          a: 'Oracle | Santa Clara, California',
          b: 'Software Developer',
          c: [
            'Java',
            'REST',
            'Docker and Kubernetes',
            'Oracle Cloud, AWS, Google Cloud, or Azure',
            'Git',
            'IDEs (VSCode and IntelliJDEA)',
            'MySQL',
            'Python or Bash',
            'HTML',
            'JavaScript',
            'ReactJs',
            'NodeJs'
          ],
          d: true,
          e: '6/21/2024',
          g: 'https://eeho.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/jobsearch/my-profile'
        },
        {
          a: 'WSP | Denver, Colorado',
          b: '.Net Developer',
          c: [
            '1-3 years exp',
            'C# and .NET',
            'BS',
            'ASP.NET',
            'Microsoft SQL Server',
            'HTML5',
            'JavaScript',
            'CSS3',
            'XML',
            'JSON',
            'Visual Studio',
            'React (preferred), Vue, Angular'
          ],
          d: true,
          e: '6/21/2024',
          g: 'https://emit.fa.ca3.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2001/my-profile'
        },
        {
          a: 'Atomus | San Francisco, California',
          b: 'Backend Software Engineer',
          c: [
            '3+ years exp',
            'CI/CD',
            'Operating Systems',
            'Databases',
            'NextJS',
            'Postgres',
            'Azure',
            'TypeScript',
            'Go'
          ],
          d: false,
          e: '6/23/2024',
          f: '6/26/2024'
        },
        {
          a: 'SAIC | Point Mugu NAWC, California',
          b: 'Software Engineer',
          c: [
            'BS',
            '2+ years exp',
            'Java Swing',
            'C#',
            'Python',
            'Java',
            'SQL',
            'SECRET clearance'
          ],
          d: false,
          e: '6/23/2024',
          f: '6/24/2024',
          g: 'https://www.indeed.com/cmp/SAIC/jobs'
        },
        {
          a: 'Immigration and Customs Enforcement | (Remote) United States',
          b: 'Information Technology Specialist (Information Security)',
          c: [
            'US Citizen'
          ],
          d: true,
          e: '6/23/2024',
          g: 'https://www.usajobs.gov/job/743747400/'
        },
        {
          a: 'FYIN | Denver, Colorado',
          b: '.NET Web Developer (eCommerce)',
          c: [
            '.NET Core / .NET Framework',
            'HTML, CSS, JS, jQuery, ASP.NET MVC',
            'Microsoft SQL Server / SQL',
            'REST, SOAP, API',
            'Angular, Vue,js',
            'TFS or GIT',
            'SDLC',
            'OOP'
          ],
          d: true,
          e: '6/24/2024'
        },
        {
          a: "Red Hat | (Remote) United States",
          b: 'Associate Software Engineer',
          c: [
            'BS',
            'Python 3',
            'Git',
            'CI/CD',
            'Linux'
          ],
          d: true,
          e: '6/24/2024',
          g: 'https://redhat.wd5.myworkdayjobs.com/en-US/jobs/job/Remote-US-IL/Associate-Software-Engineer_R-039703?q=software&a=bc33aa3152ec42d4995f4791a106ed09&c=48e76bf7cb5510011a9542195ab40001'
        },
        {
          a: 'Genuine Parts Company | Atlanta, Georgia',
          b: 'Software Engineer - Supply chain technology',
          c: [
            'BS',
            '2+ years exp SQL',
            '2+ years exp .NET and C#',
            'Familiarity with Manhattan Associates WMOS software or any other WMS system'
          ],
          d: true,
          e: '6/25/2024',
          g: 'https://www.linkedin.com/jobs/view/3818324350/?alternateChannel=search&refId=PFC1bsI2Y%2F7GV9sZBqDncg%3D%3D&trackingId=0U7mjU6Q6AwR5utsqYhhRA%3D%3D&trk=d_flagship3_search_srp_jobs'
        },
        {
          a: 'Innovative Defense Technologies (IDT) | San Diego, California',
          b: 'Junior IT Engineer',
          c: [
            'BS',
            '2+ years of exp',
            'Operating Systems',
            'networking concepts– TCP/IP, Switching, Routing, Firewalls, Subnetting',
            'Understanding or conceptual knowledge of container technologies such as Docker and Podman',
            'Some experience with scripting (ex. Python, Bash, Powershell)'
          ],
          d: true,
          e: '6/25/2024',
          g: 'https://www.linkedin.com/jobs/view/3959890636/?alternateChannel=search&refId=b5cJxuKf1i%2FsQ%2B45L7oo1g%3D%3D&trackingId=e8F9R5rCF7mZZi3rKSkn2w%3D%3D&trk=d_flagship3_search_srp_jobs'
        },
        {
          a: 'Costco Wholesale | Schaumburg, Illinois',
          b: 'Software Developer 1',
          c: [
            'BS',
            'JavaScript ES6',
            'HTML',
            'CSS',
            'React and Redux',
            'Jest and Jenikns',
            'MySQL',
            'AWS and Azure'
          ],
          d: true,
          e: '6/25/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3945013197/?alternateChannel=search&refId=6GWAJonv9IB4un0EI%2FdnlQ%3D%3D&trackingId=f7OTe4PvEXLEn7p2UcVQCg%3D%3D&trk=d_flagship3_search_srp_jobs',
            'https://phf.tbe.taleo.net/phf02/ats/careers/v2/myJobs?org=COSTCO&cws=41'
          ]
        },
        {
          a: 'FLEETCOR | Louisville, Kentucky',
          b: 'Application Developer',
          c: [
            'BS',
            '1-2 years exp'
          ],
          d: true,
          e: '6/25/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3938778896/?alternateChannel=search&refId=6GWAJonv9IB4un0EI%2FdnlQ%3D%3D&trackingId=%2FPvYjPDy9tIqX2VIfcguMg%3D%3D&trk=d_flagship3_search_srp_jobs',
            'https://us241.dayforcehcm.com/CandidatePortal/u/cp/en-US/fleetcor/AppliedJobs'
          ]
        },
        {
          a: 'Robert Half | Brookfield, Wisconsin',
          b: 'Software & Data Developer',
          c: [
            'C# .NET',
            'SQL',
            'CRM systems',
            'SSRS and Power BI',
            'Web services'
          ],
          d: true,
          e: '6/25/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3959195604/?alternateChannel=search&refId=6GWAJonv9IB4un0EI%2FdnlQ%3D%3D&trackingId=DSvGSuGvUP0LL53fYYR3Ow%3D%3D&trk=d_flagship3_search_srp_jobs',
            'https://www.roberthalf.com/us/en/job/brookfield-wi/software-data-developer/04600-0013010540-usen?ref_=rh_ja'
          ]
        },
        {
          a: 'Reputation | San Ramon, California',
          b: 'Software Engineer',
          c: [
            'BS',
            '2+ years exp',
            'Angular, React, Ember, Backbone, or jQuery, HTML5, CSS3, PHP, Node, Ruby, Ajax, C#, XML, SQL, MySQL, SCRUM, Jira, MongoDB'
          ],
          d: true,
          e: '6/26/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3959192686/?eBP=NON_CHARGEABLE_CHANNEL&refId=6GWAJonv9IB4un0EI%2FdnlQ%3D%3D&trackingId=bT7HA%2Ffm8xCoZJXBgkXF1g%3D%3D&trk=flagship3_search_srp_jobs',
            'https://reputation.wd1.myworkdayjobs.com/en-US/External/userHome',
          ]
        },
        {
          a: 'ExtensisHR | Sterling Heights, Michigan',
          b: 'Software Engineer',
          c: [
            'BS',
            '2+ years exp',
            'C#, WPF, Python',
            'TCP/IP and PC Networking',
            'CAN and LIN serial communications protocols'
          ],
          d: true,
          e: '6/26/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3959883198/?alternateChannel=search&refId=%2BY89s%2BIUnhYMhBLgNir88A%3D%3D&trackingId=g4DGYT3rwwu%2F92aUgESwUQ%3D%3D&trk=d_flagship3_search_srp_jobs',
            'https://careers2-extensishr.icims.com/jobs/dashboard?hashed=1255477617'
          ]
        },
        {
          a: 'Hinkal | Menlo Park, California',
          b: 'Front-end Developer',
          c: [
            '1+ years exp',
            'BS/MS',
            'React'
          ],
          d: true,
          e: '6/26/2024',
          g: 'https://www.linkedin.com/jobs/view/3958985822/?alternateChannel=search&refId=%2BY89s%2BIUnhYMhBLgNir88A%3D%3D&trackingId=T4MY1KXv0FGWWjC5mBixHQ%3D%3D&trk=d_flagship3_postapply_premium_top_choice'
        },
        {
          a: 'ActioNet, Inc. | New Orleans, Louisiana',
          b: 'Computer Programmer/Analyst - Junior Level',
          c: [
            '1+ year exp',
            'Database development',
            'Git',
            'Java',
            'SQL',
            'Oracle'
          ],
          d: true,
          e: '6/26/2024',
          g: 'https://www.linkedin.com/jobs/view/3959883193/?alternateChannel=search&refId=%2BY89s%2BIUnhYMhBLgNir88A%3D%3D&trackingId=%2F2y4tqeLGv%2B1BzHcnSxbvA%3D%3D&trk=d_flagship3_search_srp_jobs'
        },
        {
          a: 'T-Mobile | Atlanta, Georgia',
          b: 'Software Engineer',
          c: [
            '2+ years exp',
            'Java',
            'JavaScript',
            'Angular',
            'Node.js',
            'Vue.js',
            'SpringBoot',
            'Kafka',
            'MySQL',
            'MongoDB',
            'REST API',
            'Splunk',
            'Kubernetes',
            'Python',
            'TensorFlow',
            'ML',
            'deep learning',
            'PCF'
          ],
          d: false,
          e: '6/26/2024',
          f: '8/6/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3959427558/?alternateChannel=search&refId=Sz6R1YkTkjHq2FGxH9bQyg%3D%3D&trackingId=W8M99aXuDuUU4ydIPbHJdQ%3D%3D&trk=d_flagship3_search_srp_jobs',
            'https://tmobile.wd1.myworkdayjobs.com/en-US/External/userHome'
          ]
        },
        {
          a: 'Synergy Interactive | Chicago, Illinois',
          b: 'Web Developer',
          c: [
            'HTML5/CSS3, JavaScript, jQuery, React',
            'PHP and MySQL',
            'WordPress'
          ],
          d: true,
          e: '6/26/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3960792327/?alternateChannel=search&refId=N6agj2AaujEcjy4h8vRFjg%3D%3D&trackingId=XJkLfzHyzTH%2F6m1kDiV7Cw%3D%3D&trk=d_flagship3_postapply_immediate_screener_modal'
          ]
        },
        {
          a: 'Meta | Cambridge, Massachusetts',
          b: 'Software Engineer',
          c: [
            'BS',
            'C, C++, Java, or C#',
            'Python, PHP, or Haskell',
            'SQL',
            'HTML, CSS, JavaScript'
          ],
          d: true,
          e: '6/26/2024',
          g: 'https://www.ziprecruiter.com/co/Meta/Jobs/--in-United-States?id=Yozib578VTASnRBJEa3yEmsWZhE='
        },
        {
          a: 'Thermo Fisher Scientific | Carlsbad, California',
          b: 'Software Engineer I',
          c: [
            'BS',
            '0-2 years exp',
            'NoSQL, Cloud/AWS',
            'GIT, SVN, JIRA/HP, Jenkins/Bamboo',
            'Python, Perl, Ruby, Shell, AWK',
            'Troubleshooting skills'
          ],
          d: false,
          e: '6/26/2024',
          f: '8/1/2024',
          g: 'https://www.ziprecruiter.com/co/Thermo-Fisher-Scientific/Jobs/--in-United-States?id=PpIoRcQrbrMgrSryPqAJEVt5QsI='
        },
        {
          a: 'Stuller | Lafayette, Louisiana',
          b: 'Software UI/UX Developer',
          c: [
            'BS',
            'C#, Python, Java',
            'WPF or MAUI/Blazor',
            '2-10 years exp',
          ],
          d: false,
          e: '6/26/2024',
          f: '8/28/2024',
          g: [
            'https://www.ziprecruiter.com/co/Stuller/Jobs/--in-United-States?id=Jv_VDhjRXtJ_mtwtW6k2CFiVcN4=',
            'https://secure4.saashr.com/ta/6052029.careers?rnd=UKG&Ext=careers&sft=VFXCHJKCLQ&ActiveSessionId=20231010533#applicant/applications'
          ],
          i: false,
        },
        {
          a: 'LineLeader | Dallas, Texas',
          b: 'Full Stack Developer',
          c: [
            '3+ years exp',
            'JavaScript and TypeScript',
            'Node.js',
            'MongoDB',
            'Agile/Scrum',
            'VueJS',
            'GraphQL',
            'AWS',
            'PHP',
            'MySQL'
          ],
          d: true,
          e: '6/26/2024',
          g: 'https://www.ziprecruiter.com/co/LineLeader/Jobs/--in-United-States'
        },
        {
          a: 'Posted Software | Denver, Colorado',
          b: 'Bubble Developer',
          c: [
            'We are looking for a developer to take the lead on a substantial new buildout of our gig work platform',
            'This role will include integrating with our new 3rd party partners, building new features and workflows, QA testing, and maintenance of existing features'
          ],
          d: true,
          e: '6/26/2024',
          g: 'https://www.ziprecruiter.com/co/Posted-Software/Jobs/--in-United-States'
        },
        {
          a: 'JDA | Dallas, Texas',
          b: 'Software Engineer I',
          c: [
            '1-2 years exp',
            'Git and Jenkins',
            'REST, JSON, web services',
            'Unix/Linux',
            'Agile (Scrum or Kanban)',
            'OOP, data structures and algorithms, Java, MVC, J2EE, Web development'
          ],
          d: false,
          e: '6/26/2024',
          f: '8/15/2024',
        },
        {
          a: 'SquareTrade | Denver, Colorado',
          b: 'Associate Software Engineer',
          c: [
            '0-2 years exp',
            'RESTful services using Java, SpringBoot, UI/UX using Angular',
            'Kafka, SQS, Kinesis',
            'PostgreSQL',
            'Scrum and Agile'
          ],
          d: true,
          e: '6/26/2024',
          g: [
            'https://www.ziprecruiter.com/co/SquareTrade/Jobs/--in-United-States?id=Ljv1vQzECV8x0rFjDJoc7194cco='
          ]
        },
        {
          a: 'V2Soft | Dearborn, Michigan',
          b: 'Software Engineer Associate',
          c: [
            'BS',
            '1+ years exp',
            'React or Angular',
            'Java, JavaScript, TypeScript, C#, and C++, Node.js, Spring Boot'
          ],
          d: true,
          e: '6/26/2024'
        },
        {
          a: 'Sabanto | Itasca, Illinois',
          b: 'Full Stack Engineer (Nodejs)',
          c: [
            'BS',
            '4+ years exp JavaScript, Node.js, React or React Native',
            '2+ years exp AWS',
            'Git, CI/CD, RESTful APIs and GraphQL'
          ],
          d: true,
          e: '6/26/2024',
          g: 'https://www.ziprecruiter.com/co/Sabanto/Jobs/--in-United-States?id=dLswiZp+PTmhBH3_Bk_5Ox1b+cU='
        },
        {
          a: 'One Day Doors & Closets | Lincoln, California',
          b: 'Entry Level Full Stack Developer',
          c: [
            '0-3 years exp',
            'React.js and TypeScript',
            'Node.js and PHP',
            'API integrations, CMS, CRUD/RESTful, SQL databases',
            'Tailwind CSS, Next.js, Laravel, Sass, Figma, Elementor, Webflow'
          ],
          d: false,
          e: '6/26/2024',
          f: '6/30/2024',
          g: 'https://www.glassdoor.com/Jobs/One-Day-Doors-and-Closets-Jobs-E3257238.htm?filter.countryId=1'
        },
        {
          a: 'Proofpoint | Texas',
          b: 'Software Engineer',
          c: [
            '2+ years exp .NET/C#, Bootstrap/CSS, JavaScript, AI/ML, Azure, UI design, Mock-ups, Git'
          ],
          d: false,
          e: '6/26/2024',
          f: '7/26/2024',
          g: 'https://www.glassdoor.com/Jobs/Proofpoint-Jobs-E39140.htm?filter.countryId=1',
          i: false
        },
        {
          a: 'Hoffmann Brothers | Brentwood, Missouri',
          b: 'Web Developer',
          c: [
            '3+ years exp',
            'HTML, CSS, JavaScript',
            'React or Angular',
            'PHP, Python, Ruby, Laravel, and Django',
            'WordPress and CMS, SEO, Git, Adobe XD, Figma, UI/UX'
          ],
          d: true,
          e: '6/26/2024',
          g: 'https://www.glassdoor.com/Jobs/Hoffmann-Brothers-Jobs-E1400533.htm?filter.countryId=1'
        },
        {
          a: 'BOEING | Mesa, Arizona',
          b: 'Entry Level Software Engineer',
          c: [
            'BS',
            'Linux',
            'C, C++, C#',
            '1+ years internship exp',
            'SDLC',
            'Python or other scripting languages'
          ],
          d: false,
          e: '6/27/2024',
          f: '2/28/2024',
          g: [
            'https://www.indeed.com/cmp/Boeing/jobs',
            'https://boeing.wd1.myworkdayjobs.com/en-US/EXTERNAL_CAREERS/userHome'
          ]
        },
        {
          a: 'Safelite Group | Columbus, Ohio',
          b: 'Full Stack Developer',
          c: [
            'BS',
            '1-3 years exp',
            'C#, .NET, HTML/CSS, JavaScript',
            'Vue.JS, Knockout, Bootstrap',
            'AWS, GCP, Azure'
          ],
          d: true,
          e: '6/27/2024',
          g: 'https://www.indeed.com/cmp/Safelite-9b768f42/jobs'
        },
        {
          a: 'RealDash | Miami, Florida',
          b: 'Full Stack Developer',
          c: [
            'HTML, CSS, JavaScript, PHP, JSON'
          ],
          d: true,
          e: '6/27/2024',
          g: 'https://www.indeed.com/cmp/Realdash/jobs'
        },
        {
          a: 'San Bernardino County | San Bernardino, California',
          b: 'Programmer III',
          c: [
            'ASP.Net, or C#',
            'SSRS / SSIS',
            'SQL Server',
            '.NET Core',
            'Azure SQL',
            'JavaScript',
            'HTML/CSS'
          ],
          d: false,
          e: '6/29/2024',
          f: '8/6/2024',
          g: [
            'https://www.indeed.com/cmp/SAN-Bernardino-County/jobs?jk=1795b0566ac99942&start=0',
            'https://www.governmentjobs.com/careers/sanbernardino/jobs/4522663/programmer-iii'
          ]
        },
        {
          a: 'Esri | Redlands, California',
          b: 'Web Developer I - Geodatabase',
          c: [
            '1+ years exp, JavaScript or TypeScript',
            'BS',
            'MySQL, SQL Server, Oracle',
            'REST',
          ],
          d: false, 
          e: '6/30/2024',
          f: '7/6/2024',
          g: [
            'https://www.esri.com/careers/web-developer-i-geodatabase-4418677007#job-application'
          ]
        },
        {
          a: 'Career finder | Milwaukee, Wisconsin',
          b: 'Software Developer',
          c: [
            'BS',
            '.NET, C#, Angular, SQL Server, RESTful, SOAP',
            'Azure DevOps, Testing, Waterfall, Agile, Scrum, Docker and Kubernetes'
          ],
          d: false,
          e: '7/2/2024',
          f: '',
          g: [
            'https://www.indeed.com/cmp/Wec-Energy-Group/jobs',
            'https://career8.successfactors.com/portalcareer?_s.crb=gzyx6wNppO4lSCU4%252baQQrV58zwhDehD%252f4%252bLleWRn1BI%253d'
          ],
          i: false,
          j: false,
        },
        {
          a: 'Plasser American Corp | Danbury, Connecticut',
          b: 'Software Engineer',
          c: [
            'BS',
            '1+ years exp',
            '.NET/C#/MS SQL Server',
            'TFVS and/or Git',
          ],
          d: true,
          e: '7/2/2024',
          g: [
            'https://www.indeed.com/cmp/Plasser-American-Corporation/jobs'
          ]
        },
        {
          a: 'Entrust Datacard | Shakopee, Minnesota',
          b: 'Software Developer II (C#/.Net)',
          c: [
            '3+ years exp C#.NET or Java/J2EE',
            'Visual Studio, VS Code, IntelliJ, Eclipse, Jira, Azure DevOps',
            'RESTful API, HTML, CSS, JavaScript, SaaS',
            '.NET Core or Spring (Boot), AngularJS, JQuery, noSQL'
          ],
          d: true,
          e: '7/3/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Entrust-Jobs-E1104613.htm?filter.countryId=1',
            'https://entrust.wd1.myworkdayjobs.com/en-US/EntrustCareers/userHome'
          ]
        },
        {
          a: 'Workday | Mason, Ohio',
          b: 'Associate Full Stack Engineer (VNDLY)',
          c: [
            '1-3 years exp (including internships)',
            'RESTful web services',
            'Relational databases',
            'Python, Django, Flask',
            'Git/GitHub, Bitbucket, JavaScript, TDD, SaaS, AWS, React.js, HTML, CSS, Agile'
          ],
          d: false,
          e: '7/3/2024',
          f: '7/11/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Workday-Jobs-E197851.htm?filter.countryId=1',
            'https://workday.wd5.myworkdayjobs.com/en-US/Workday/userHome'
          ]
        },
        {
          a: 'Infor | United States Remote (St. Paul, MN, Dallas, TX, Alpharetta, GA)',
          b: 'Software Engineer, Associate',
          c: [
            'C#, JavaScript, SQL',
            'Agile, Scrum, React/Redux, TypeScript'
          ],
          d: true, 
          e: '7/6/2024',
          g: 'https://www.glassdoor.com/Jobs/Infor-Jobs-E15375.htm?filter.countryId=1'
        },
        {
          a: 'Zoom | San Jose, California',
          b: 'Software Development Engineer',
          c: [
            'BS',
            '2+ years exp',
            'Java, Cloud, Microservices, JavaScript, OOP'
          ],
          d: false,
          e: '7/6/2024',
          f: '8/24/2024',
          g: [
            'Glassdoor',
            'https://zoom.wd5.myworkdayjobs.com/en-US/Zoom/userHome'
          ]
        },
        {
          a: 'Fox Corporation | Blue Ash, Ohio',
          b: 'Software Engineer I',
          c: [
            'C#, SQL, .NET 6+, ASP.NET Web API, Blazor, Entity Framework'
          ],
          d: false,
          e: '7/17/2024',
          f: '8/9/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Fox-Corporation-Jobs-E2938629.htm?filter.countryId=1',
            'https://fox.wd1.myworkdayjobs.com/en-US/Domestic/userHome',
          ]
        },
        {
          a: 'ForeFlight LLC | Austin, Texas',
          b: 'Software Engineer I',
          c: [
            'BS',
            'Java',
            'JavaScript',
            'TypeScript',
            'Python',
            'React',
            'Node.js',
            'SQL',
            'NoSQL',
            'AWS, Azure'
          ],
          d: true,
          e: '7/17/2024',
          g: [
            'https://www.glassdoor.com/Jobs/ForeFlight-Jobs-E1171602.htm?filter.countryId=1'
          ]
        },
        {
          a: 'Vertaforce | East Lansing, Michigan',
          b: 'Software Engineer I',
          c: [
            'No exp required',
            'Popular coding languages, Agile and Scrum, NoSQL'
          ],
          d: false,
          e: '7/17/2024',
          f: '7/20/2024',
          g: 'https://www.glassdoor.com/Jobs/Vertafore-Jobs-E35307.htm?filter.countryId=1'
        },
        {
          a: 'Horrocks | Pleasant Grove, Utah',
          b: 'Junior Front-End Software Developer',
          c: [
            'BS',
            '1-3 years exp',
            '1 year exp UI/UX',
            'HTML/CSS/JavaScript',
            'RESTful API\'S',
            'React',
            'GIT',
            'ArcGIS Platform and JavaScript API',
            'Tailwind CSS, TypeScript, Vite'
          ],
          d: false,
          e: '7/17/2024',
          f: '7/26/2024',
          g: 'https://www.glassdoor.com/Jobs/Horrocks-Jobs-E312491.htm?filter.countryId=1'
        },
        {
          a: 'Fedex | Collierville, Tennessee',
          b: 'Full Stack Developer I',
          c: [
            'BS',
            '0-1 years exp',
          ],
          d: true,
          e: '7/17/2024',
          g: 'https://www.glassdoor.com/Jobs/FedEx-Jobs-E246.htm?filter.countryId=1'
        },
        {
          a: 'Home Depot / THD | Atlanta, Georgia',
          b: 'Software Engineer',
          c: [
            'BS',
            'HTML, CSS, JavaScript/Typescript Framworks, OOP, Java, Version Control',
            'SQL/NoSQL, CI/CD, Microservices'
          ],
          d: true,
          e: '7/17/2024',
          g: [
            'https://www.glassdoor.com/Jobs/The-Home-Depot-Jobs-E655.htm?filter.countryId=1',
            'https://homedepot.wd5.myworkdayjobs.com/en-US/CareerDepot/userHome'
          ]
        },
        {
          a: 'Humana | Kentucky',
          b: 'Junior Full Stack Engineer',
          c: [
            'BS',
            '0-2 years exp',
            'Angular, React, SpringBoot, .Net, Vue'
          ],
          d: false,
          e: '7/17/2024',
          f: '7/24/2024',
          g: 'https://www.glassdoor.com/Jobs/Humana-Jobs-E340.htm?filter.countryId=1'
        },
        {
          a: 'Loopback Analytics | Dallas, Texas',
          b: 'Software Engineer',
          c: [
            'BS',
            'React.js, C#, HTML, CSS, JavaScript, RESTful API, SQL, Git, Angular, Vue.js, AWS, Azure, DevOps'
          ],
          d: true,
          e: '7/17/2024',
          g: 'https://www.glassdoor.com/Jobs/Loopback-Analytics-Jobs-E918837.htm?filter.countryId=1'
        },
        {
          a: 'Deltek, Inc. | (Remote) United States',
          b: 'Software Engineer',
          c: [
            'Java, C, C#, .NET'
          ],
          d: true,
          e: '7/17/2024',
          g: 'https://www.glassdoor.com/Jobs/Deltek-Jobs-E6642.htm?filter.countryId=1'
        },
        {
          a: 'Accenture Federal Services | San Antonio, Texas',
          b: 'Full Stack Java Developer',
          c: [
            'BS',
            '2+ years exp',
            'Java, Ruby on Rails, Spring MVC, Spring Boot, Angular, NodeJS, ReactJS, Express',
            'REST/SOAP APIs, Git/Bitbucket, Jenkins, SQL, IntelliJ, Unit Testing',
            'Maven, NPM, Jira, IOS, Android, Mongo/Dynamo DB, etc.'
          ],
          d: true,
          e: '7/17/2024',
          g: 'https://www.glassdoor.com/Jobs/Accenture-Federal-Services-Jobs-E8502974.htm?filter.countryId=1'
        },
        {
          a: 'T-Mobile | Bellevue, Washington',
          b: 'Associate Engineer, Software',
          c: [
            'BS',
            'Less than 2 years exp'
          ],
          d: false,
          e: '7/17/2024',
          f: '7/30/2024',
          g: [
            'https://www.glassdoor.com/Jobs/T-Mobile-Jobs-E9302.htm?filter.countryId=1',
            'https://tmobile.wd1.myworkdayjobs.com/en-US/External/userHome'
          ]
        },
        {
          a: 'Fairfax Software | (Remote) United States',
          b: 'Software Engineer',
          c: [
            'BS',
            'C#, .NET/WCF, SQL, Unit Testing, REST API, ReactJS',
            'JavaScript, HTML5, CSS, SDLC'
          ],
          d: true,
          e: '7/17/2024',
          g: 'https://www.glassdoor.com/Jobs/Fairfax-Software-Jobs-E335048.htm?filter.countryId=1'
        },
        {
          a: 'Pittsburgh Steelers | Pittsburgh, Pennsylvania',
          b: 'Jr Software Developer',
          c: [
            'BS plus 1+ years exp',
            'SQL, C#, JavaScript, HTML, CSS, AngularJS, Azure, Blazor, REST APIs'
          ],
          d: true,
          e: '7/18/2024',
          g: 'https://www.glassdoor.com/Jobs/Pittsburgh-Steelers-Jobs-E5272.htm'
        },
        {
          a: 'Lumina Spes Group Inc | Scottsdale, Arizona',
          b: 'Full Stack Software Engineer',
          c: [
            'BS',
            'Angular, RESTful Web API, Nest.js, TypeScript',
            'PostgreSQL, SQL, Git, OpenAPI, Azure, CI/CD, Docker, Kubernetes'
          ],
          d: true,
          e: '7/20/2024'
        },
        {
          a: 'Orenco Systems | Sutherlin, Oregon',
          b: 'Full-Stack Developer',
          c: [
            'BS',
            'Visual Studio',
            'SQL, .NET, C#, C++, Java, HTML, XML'
          ],
          d: false,
          e: '7/20/2024',
          f: '8/1/2024',
          g: 'https://www.glassdoor.com/Jobs/Orenco-Systems-Jobs-E1175837.htm'
        },
        {
          a: 'TMG GD LIMITED | (Remote) United States',
          b: 'web developer',
          c: [
            'BS',
            'HTML, CSS, JavaScript, Bootstrap, SASS, Git, Adobe Photoshop'
          ],
          d: true,
          e: '7/20/2024',
          g: 'https://www.glassdoor.com/Jobs/TMG-Jobs-E764017.htm'
        },
        {
          a: 'Match Made Tech | Irvine, California',
          b: 'Java Backend Engineer (Hybrid)',
          c: [
            'BS',
            'Agile, Java, Spring, NodeJS, TypeScript, Python, Git, Jira',
            'PostgreSQL, MySQL, SQL Server, NoSQL, Redis, MongoDB',
            'JavaScript testing frameworks',
            'Maven, NPM, Docker, Kubernetes, React, Angular, Vue'
          ],
          d: true,
          e: '7/20/2024',
          g: 'https://www.glassdoor.com/Jobs/Match-Made-in-Therapy-Jobs-E7718473.htm'
        },
        {
          a: 'Best Buy | Richfield, Minnesota',
          b: 'Software Engineer II',
          c: [
            'BS',
            '5+ years exp',
            '2+ years exp Agile, Java, HTML, XML, MySQL, RESTful API',
          ],
          d: false,
          e: '7/22/2024',
          f: '7/23/2024',
          g: 'https://www.ziprecruiter.com/co/Best-Buy/Jobs/--in-United-States?id=dcy_mznIPn8IMFWLkT89j+r9O2M='
        },
        {
          a: 'enlatics | Colorado City, Colorado',
          b: 'Front End Software Engineer',
          c: [
            'BS',
            '2+ years exp',
          ],
          d: true,
          e: '7/22/2024',
          g: 'https://www.ziprecruiter.com/co/enlatics/Jobs/--in-United-States'
        },
        {
          a: 'G. Loomis, Inc. | Woodland, Washington',
          b: 'Application Developer',
          c: [
            'BS',
            '1-3 years exp',
            'SQL, JavaScript, HTML, REST API, JSON'
          ],
          d: true,
          e: '7/22/2024',
          g: 'https://www.indeed.com/cmp/G.-Loomis,-Inc./jobs'
        },
        {
          a: 'Hype Pharm, The Agency | Chandler, Arizona',
          b: 'Web Developer & SEO Specialist (In-House Marketing Agency)',
          c: [
            '3+ years exp',
            'HTML'
          ],
          d: true,
          e: '7/22/2024',
          g: 'https://www.indeed.com/cmp/Hype-Pharm,-the-Agency/jobs'
        },
        {
          a: 'Wells Fargo | Westlake, Texas',
          b: 'Engineering Associate',
          c: [
            '6+ months exp',
            'Java, React, JavaScript'
          ],
          d: false,
          e: '7/23/2024',
          f: '8/15/2024',
          g: [
            'https://www.indeed.com/cmp/Wells-Fargo/jobs',
            'https://wd1.myworkdaysite.com/en-US/recruiting/wf/WellsFargoJobs/userHome'
          ]
        },
        {
          a: 'Infusion Software Inc | Chandler, Arizona',
          b: 'Software Engineer I',
          c: [
            'BS',
            '2+ years exp',
            'Java, Spring, HTML5, Vue, React, JavaScript, Git/GitHub',
            'Maven, Gradle, Jira'
          ],
          d: false,
          e: '7/24/2024',
          f: '8/6/2024',
          g: 'https://www.glassdoor.com/Jobs/Keap-Jobs-E332306.htm'
        },
        {
          a: 'Harvest Power | Islip Terrace, New York',
          b: 'Junior Software Developer',
          c: [
            'APIs, JSON, REST, SOAP, HTML'
          ],
          d: true,
          e: '7/25/2024',
          g: 'https://www.indeed.com/cmp/Harvest-Power-LLC/jobs'
        },
        {
          a: 'Beyond The Brand Media LLC | Goffstown, New Hampshire',
          b: 'Web Developer for Established Web Agency',
          c: [
            '1+ years exp',
            'HTML, CSS, JavaScript, PHP, WordPress'
          ],
          d: true,
          e: '7/25/2024',
          g: 'https://www.indeed.com/cmp/Beyond-the-Brand-Media-LLC/jobs'
        },
        {
          a: 'Stax.ai | Scottsdale, Arizona',
          b: 'Front-End Software Developer',
          c: [
            'HTML5, CSS3, JavaScript, SolidJS, Golang, Python, Git'
          ],
          d: true,
          e: '7/25/2024',
          g: 'https://www.indeed.com/cmp/Stax.ai,-Inc./jobs'
        },
        {
          a: 'Antra, Inc. | Virginia, Nebraska',
          b: 'Entry Level Angular Developer',
          c: [
            'BS',
            'OOP',
            'JavaScript',
            'Angular.js',
            'React.js',
            'Express.js',
            'CSS',
            'Agile, Scrum, Version control'
          ],
          d: false,
          e: '7/25/2024',
          f: '8/1/2024',
          g: 'https://www.indeed.com/cmp/Antra,-Inc/jobs',
          i: false
        },
        {
          a: 'Technology Recovery Group, LTD | Westlake, Ohio',
          b: 'Software Engineer 1',
          c: [
            'BS',
            '1+ years exp',
            '.NET Core, C#, Git, MVC, ASP.NET, SQL Server, HTML, CSS, JSON, REST API',
            'JavaScript, JQuery, Bootstrap'
          ],
          d: true,
          e: '7/25/2024',
          g: 'https://www.indeed.com/cmp/Trg-be6a68b9/jobs'
        },
        {
          a: 'Vision IT | Richmond, Virginia',
          b: 'Angular Developer',
          c: [
            'Angular, HTML, CSS, JavaScript, RESTful API, OOP',
            'SQL, Wireframes, Bootstrap, C#, XML'
          ],
          d: true, 
          e: '7/25/2024',
          g: 'https://www.indeed.com/cmp/Vision-IT/jobs'
        },
        {
          a: 'United States Cold Storage Inc | Camden, New Jersey',
          b: 'Full Stack Java Developer',
          c: [
            'BS',
            'Java',
            'SQL Server, Oracle, ORM, JavaScript, Angular, TypeScript',
            'REST, Git, Maven, Confluence, Jira'
          ],
          d: true,
          e: '7/25/2024',
          g: 'https://www.indeed.com/cmp/United-States-Cold-Storage/jobs'
        },
        {
          a: 'The State of FLorida | Tallahassee, Florida',
          b: 'Systems Programmer I',
          c: [
            'BS',
            '4+ years exp',
            'T-SQL, C#, MVC, Bootstrap, SQL Server, Azure, DevOps, GitHub',
            'Azure AD, Agile, Scrum, Kanban'
          ],
          d: true,
          e: '7/25/2024',
          g: 'https://www.indeed.com/cmp/State-of-Florida/jobs'
        },
        {
          a: 'ExecHires | Los Angeles, California',
          b: 'Software Engineer',
          c: [
            'Python, AI, PyTorch'
          ],
          d: true,
          e: '7/25/2024',
          g: 'https://www.indeed.com/cmp/Exechires/jobs'
        },
        {
          a: 'Focus Camera | Brooklyn, New York',
          b: 'In-Office Junior Web Developer - Brooklyn, NY',
          c: [
            'BS',
            'HTML, CSS, JavaScript, PHP, Node.js, Express, Django, Ruby on Rails',
            'Git, Shopify, RESTful API, SQL, MySQL, MongoDB, Unit Testing',
            'Agile/Scrum'
          ],
          d: false,
          e: '7/25/2024',
          f: '8/3/2024',
          g: 'Glassdoor'
        },
        {
          a: 'GitHub | (Remote) United States',
          b: 'Software Engineer II, Billing',
          c: [],
          d: true,
          e: '7/25/2024',
          g: 'Glassdoor'
        },
        {
          a: 'Adobe | San Jose, California',
          b: '2025 University Graduate - Software Development Engineer',
          c: [
            'BS',
            '0-1+ years exp',
            'Python, Java, C++',
            'C#, Ruby, PHP, React, Vue, Angular, JQuery',
            'DevOps'
          ],
          d: false,
          e: '7/25/2024',
          f: '8/25/2024',
          g: 'https://www.glassdoor.com/Jobs/Adobe-Jobs-E1090.htm'
        },
        {
          a: 'California Institute of Technology | Pasadena, California',
          b: 'Software Developer',
          c: [
            'BS',
            '1+ years exp',
            'Gravitational wave analysis'
          ],
          d: true,
          e: '7/26/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Caltech-California-Jobs-E22139.htm',
            'https://phf.tbe.taleo.net/phf03/ats/careers/v2/myJobs?org=CALTECH&cws=37'
          ]
        },
        {
          a: 'California State University, Long Beach | Long Beach, California',
          b: 'Software Developer',
          c: [
            'BS',
            '2+ years exp',
            'Java, C#, VB.NET, XML, HTML, JavaScript, SQL, PL/SQL'
          ],
          d: false,
          e: '7/26/2024',
          f: '8/14/2024',
          g: 'https://www.glassdoor.com/Jobs/CSU-Long-Beach-Jobs-E112602.htm'
        },
        {
          a: 'Pennymac | Agoura Hills, California',
          b: 'Software Development Engineer in Test [SDET]',
          c: [
            'JavaScript, Node.js, Python, Selenium, Jest, REST APIs, GraphQL',
            'Postman, JIRA, CI/CD, SQL Server, PostgreSQL, AWS'
          ],
          d: true,
          e: '7/26/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Pennymac-Jobs-E230027.htm',
            'https://careers-pennymac.icims.com/jobs/dashboard?hashed=1781592878'
          ]
        },
        {
          a: 'ByteDance | San Jose, California',
          b: 'Recommendation Platform Backend Engineer Graduate [TikeTok E-Commerce Recommendation Infrastructure] - 2024 Start[BS/MS]',
          c: [
            'BS',
            'C++, Python3, Flask, FastAPI, MySQL, MongoDB, Redis'
          ],
          d: true,
          e: '7/26/2024',
          g: [
            'https://www.glassdoor.com/Jobs/ByteDance-Jobs-E1624196.htm',
            'https://jobs.bytedance.com/en/position/application'
          ]
        },
        {
          a: 'TikTok | San Jose, California',
          b: 'Software Engineer Graduate (Intelligent Creation Backend/Frontend) - 2025 Start (BS/MS)',
          c: [
            'BS',
            'Internship exp',
            'Python, Java, C++, Go, Git, Agile, Scrum'
          ],
          d: true,
          e: '7/28/2024',
          g: [
            'https://www.glassdoor.com/Jobs/TikTok-Jobs-E2230881.htm',
            'https://careers.tiktok.com/position/application'
          ]
        },
        {
          a: 'Plaid | San Francisco, California',
          b: 'Software Engineer - Investments',
          c: [
            '1+ years exp',
          ],
          d: true,
          e: '7/28/2024',
          g: 'https://www.glassdoor.com/Jobs/Plaid-Jobs-E1156368.htm'
        },
        {
          a: 'The Marlin Alliance | San Diego, California',
          b: 'Angular Software Developer',
          c: [
            'BS',
            '2+ years exp',
            'Angular 2+, JavaScript, Git, C#, C, C++, Java'
          ],
          d: true,
          e: '7/28/2024',
          g: 'https://www.glassdoor.com/Jobs/The-Marlin-Alliance-Jobs-E809656.htm'
        },
        {
          a: 'Meta | Burlingame, California',
          b: 'Software Engineer, Computer Vision',
          c: [
            'BS',
            'C++',
            'API, C#, MS or PhD'
          ],
          d: true,
          e: '7/28/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Meta-Jobs-E40772.htm',
            'https://www.metacareers.com/profile/home/'
          ]
        },
        {
          a: 'YouTube | Mountain View, California',
          b: 'Software Engineer III',
          c: [
            'BS',
            '1-2+ years exp',
            'C++'
          ],
          d: true,
          e: '7/28/2024',
          g: [
            'https://www.glassdoor.com/Jobs/YouTube-Jobs-E40803.htm',
            'https://www.google.com/about/careers/applications/dashboard'
          ]
        },
        {
          a: 'Delta Air Lines, Inc. | Atlanta, Georgia',
          b: 'Associate Software Development Engineer',
          c: [
            'BS',
            '0-2 years exp',
            'Java/J2EE framework, OOP, Design Patterns, Relational DBs, Oracle, Linux/Unix',
            'Shell Scripting, MS SQL, JQuery, AngularJS, Swagger, Springboot',
            'AWS, DevOps, GIT, GitHub, Bitbucket, CI/CD, TDD, SDLC, Agile'
          ],
          d: true,
          e: '8/1/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Delta-Air-Lines-Jobs-E197.htm',
            'https://delta.avature.net/en_US/careers/Profile'
          ]
        },
        {
          a: 'LEGO | Irvine, California',
          b: 'Backend Software Engineer',
          c: [
            '2+ years exp',
            'C#, .Net Framework, .NET Core, NoSQL, SQL, AWS, CDN, DNS, E-Commerce, APIs'
          ],
          d: true,
          e: '8/3/2024',
          g: [
            'https://www.glassdoor.com/Jobs/the-LEGO-Group-Jobs-E3944.htm',
            'https://lego.wd3.myworkdayjobs.com/en-US/LEGO_External/userHome'
          ]
        },
        {
          a: 'Triunity Software | San Francisco, California',
          b: 'Jr Junior Java Developer',
          c: [
            'Java 8 or higher, OOP, Spring framework'
          ],
          d: true,
          e: '8/4/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Triunity-Software-Inc-Jobs-E5916226.htm'
          ]
        },
        {
          a: 'SoCal Z | Colton, California',
          b: 'Web Developer',
          c: [
            'Drupal, MongoDB, Java, GraphQL, RESTful APIs, Redux, WordPress',
            'UI/UX designs, JavaScript, HTML, CSS, Angular, Front-end'
          ],
          d: true,
          e: '8/4/2024',
          g: [
            'https://www.indeed.com/cmp/Socal-Z-Inc./jobs'
          ]
        },
        {
          a: 'U-Haul | Phoenix, Arizona',
          b: 'Applications Programmer',
          c: [
            'BS',
            '1-2 years exp',
            'Java, C#, Python, SQL Server, MySQL, Oracle, HTML'          
          ],
          d: false,
          e: '8/5/2024',
          f: '8/9/2024',
          g: [
            'https://www.glassdoor.com/Jobs/U-Haul-Jobs-E236315.htm',
            'https://uhaul.wd1.myworkdayjobs.com/en-US/UhaulJobs/userHome'
          ]
        },
        {
          a: 'Apple | New York, New York',
          b: 'Software Engineer',
          c: [
            '2+ years exp',
            'Java, Scala, JVM, SQL, NoSQL, NewSQL'
          ],
          d: false,
          e: '8/5/2024',
          f: '8/8/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Apple-Jobs-E1138.htm',
            'https://jobs.apple.com/app/en-us/profile/roles'
          ]
        },
        {
          a: 'Education At Work | Tempe, Arizona',
          b: 'Programmer/Developer',
          c: [
            'BS',
            'HTML, JavaScript, Bootstrap, jQuery, TFS, GitHub, SOAP, REST',
            'C#, ASP.NET, SQL, SDLC, Azure DevOps, Active Directory, Web API'
          ],
          d: false,
          e: '8/5/2024',
          f: '8/7/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Education-at-Work-Jobs-E955643.htm'
          ]
        },
        {
          a: 'ProIT Inc. | Sunnyvale, California',
          b: 'Vue.js Developer',
          c: [
            'JavaScript, ES6, Vue.js, Vue CLI, Vuex, Vue Router, ReactJS, DOM, Git, NPM, CSS3'
          ],
          d: true,
          e: '8/5/2024',
          g: [
            'Glassdoor'
          ]
        },
        {
          a: 'Apple | San Diego, California',
          b: 'Software Quality Engineer - Mail, Messages, and FaceTime',
          c: [
            'BS',
            'QA methodologies, Python, Swift, UI'
          ],
          d: true,
          e: '8/5/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Apple-Jobs-E1138.htm',
            'https://jobs.apple.com/app/en-us/profile/roles'
          ]
        },
        {
          a: 'BEUMER Group | Somerset, New Jersey',
          b: 'Software Systems Engineer II',
          c: [
            'BS/MS',
            'C++, C#, SQL',
            'TCP sockets, Restful APRIs, Angular'
          ],
          d: false,
          e: '8/5/2024',
          f: '8/10/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Beumer-Jobs-E264397.htm'
          ]
        },
        {
          a: 'Autodesk | (Remote) Oregon, United States',
          b: 'Software Development Engineer, Platform Services',
          c: [
            '2+ years exp',
            'Go, Java, Python, .NET, DevOps, AWS, Agile, Lambda, Cloud'
          ],
          d: false,
          e: '8/6/2024',
          f: '8/8/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3992981256/?alternateChannel=search&refId=gBZHJvtEdSivg4iSONQ%2BZw%3D%3D&trackingId=Ubxwoej53PqJe7aeoSlU8Q%3D%3D',
            'https://autodesk.wd1.myworkdayjobs.com/en-US/Ext/userHome'
          ]
        },
        {
          a: 'Paycor | (Remote) West Virginia, United States',
          b: 'Software Engineer I',
          c: [
            'BS',
            '1+ years exp',
            '.NET, C#, MVC, Spring Boot, NodeJS, AWS Lambda, Docker, REST Web API, GraphQL, MySQL, SQL Server, DynamoDB, TDD, Junit, Jest, Agile'
          ],
          d: true,
          e: '8/6/2024',
          g: [
            'https://www.ziprecruiter.com/co/Paycor/Jobs?id=6I+Twdeh_5ofQ5nhD+8IDXyoS08='
          ]
        },
        {
          a: 'American Express | Phoenix, Arizona',
          b: 'Backend Software Engineer, Digital Banking-Payments',
          c: [
            'Kotlin, Java 17+, Spring Boot, Micronaut, Quarkus, API, PostgreSQL, Agile, Distributed Systems'
          ],
          d: false,
          e: '8/6/2024',
          f: '8/15/2024',
          g: [
            'https://www.ziprecruiter.com/co/American-Express/Jobs?id=zNbKYp_nTuWHNrc9DSntre6xTgE=',
            'https://axp.taleo.net/careersection/2/mysubmissions.ftl?lang=en'
          ]
        },
        {
          a: 'Ping, Inc. | Phoenix, Arizona',
          b: 'Software Quality Assurance Analyst',
          c: [
            'BS',
            '2+ years exp',
            'Jira, MS Office, Agile, Scrum, API testing'
          ],
          d: false,
          e: '8/6/2024',
          f: '8/13/2024',
          g: [
            'https://www.ziprecruiter.com/co/Ping,-Inc./Jobs'
          ]
        },
        {
          a: 'Noblis | Reston, Virginia',
          b: 'Software Developer (All Levels)',
          c: [
            'BS',
            '0-3 years exp',
            'Top Secret with SCI and Polygraph',
            'Python, Java, TypeScript, JavaScript, Go, Rust, C, PostgreSQL, MySQL, MongoDB, Oracle, SDLC, Git, REST, GraphQL, AWS, Azure, FastAPI, Vue.js, React, Angular, Flask, Express, Spring Boot',
          ],
          d: true,
          e: '8/6/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Noblis-Jobs-E39879.htm',
            'https://jobs-noblis.icims.com/jobs/dashboard?hashed=-188325108'
          ]
        },
        {
          a: 'ATC (American Technology Consulting) | Johnston, Iowa',
          b: 'Software Engineer',
          c: [
            'BS',
            'JavaScript, HTML, CSS, React, ASP.NET, C#, JQuery, SQL',
            'Visual Studio 2022, Github'
          ],
          d: true,
          e: '8/6/2024',
          g: [
            'https://www.glassdoor.com/Jobs/American-Technology-Consulting-Jobs-E597510.htm'
          ]
        },
        {
          a: 'ATSC IES INC | Gilbert, Arizona',
          b: 'Software Engineer',
          c: [
            'BS',
            '0-2 years exp',
            'JSON & XML',
            'Java, Python, C++, etc.',
            'Junit/testNG, netBeans'
          ],
          d: true,
          e: '8/6/2024',
          g: [
            'Glassdoor'
          ]
        },
        {
          a: 'Apex Imaging Services | Pomona, California',
          b: 'Systems Developer',
          c: [
            'BS',
            'Java, Python, QuickBase, CI/CD'
          ],
          d: true,
          e: '8/6/2024',
          g: [
            'Glassdoor'
          ]
        },
        {
          a: 'Powermind Solutions INC. | Georgia, United States',
          b: 'Software Developer',
          c: [
            'BS',
            '1+ years exp',
            'Java, Angular, Oracle, AWS, DevOps'
          ],
          d: true,
          e: '8/7/2024',
          g: [
            'https://www.glassdoor.com/Jobs/PowerMind-Solutions-Jobs-E718601.htm'
          ]
        },
        {
          a: 'Twitch Interactive, Inc. | Seattle, Washington',
          b: 'Software Development Engineer',
          c: [
            'BS',
            '3+ years non-intern exp',
            'Go, Python'
          ],
          d: false,
          e: '8/7/2024',
          f: '8/9/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Amazon-Jobs-E6036.htm',
            'https://account.amazon.jobs/en-US/applicant'
          ]
        },
        {
          a: 'Equifax | Alpharetta, Georgia',
          b: 'Software Engineer - Full Stack Developer',
          c: [
            'BS',
            '2+ years exp',
            'Java, Python, JavaScript, Maven, Gradle, HTML, CSS, GCP, AWS, Azure',
            'Angular 16+, Spring, Spring Cloud, Spring Boot, GIT, NoSQL, Scrum, XP, Agile, JUnit, Github, Confluence, Selenium'
          ],
          d: false,
          e: '8/7/2024',
          f: '8/14/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Equifax-Jobs-E232.htm',
            'https://equifax.wd5.myworkdayjobs.com/en-US/External/userHome'
          ]
        },
        {
          a: 'Grand Canyon University | Phoenix, Arizona',
          b: 'Jr. Developer',
          c: [
            'BS',
            'SQL Server, .NET, C#, ASP.NET, ADO.NET, VBScript, XML, HTML, JavaScript, Python, Perl, Bash, TCP/IP, ARM, Linux'
          ],
          d: false,
          e: '8/9/2024',
          f: '8/13/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Grand-Canyon-Education-Jobs-E2186155.htm',
            'https://gcu.wd1.myworkdayjobs.com/en-US/GCE/userHome'
          ]
        },
        {
          a: 'LA Clippers | Inglewood, California',
          b: 'Full-Stack Developer, Basketball',
          c: [
            'BS',
            'Python, R, JavaScript, GitHub, BitBucket, HTML, CSS, Bootstrap, Tailwind, SQL, Postgres, Azure, AWS, Svelte, APIs'
          ],
          d: false,
          e: '8/15/2024',
          f: '9/5/2024',
          g: [
            'https://www.glassdoor.com/Jobs/LA-Clippers-Jobs-E3584914.htm'
          ]
        },
        {
          a: 'Netflix | Los Gatos, California',
          b: 'Software Engineer (L4) - Continuous Integration',
          c: [
            'Java, Jenkins, GraphQL, APIs, databases'
          ],
          d: true, 
          e: '8/15/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Netflix-Jobs-E11891.htm'
          ]
        },
        {
          a: 'Netflix | Los Gatos, California',
          b: 'Frontend Engineer L4 - Delivery',
          c: [
            '3-5 years exp',
            'JavaScript, TypeScript, React, Material UI, REST, GraphQL, Jest, HTML, CSS',
          ],
          d: true, 
          e: '8/15/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Netflix-Jobs-E11891.htm'
          ]
        },
        {
          a: 'Lockheed Martin | Sunnyvale, California',
          b: 'Software Engineer, Entry Level',
          c: [
            'BS',
            'C/C++, C#, Java, JSON, TCP/IP'
          ],
          d: true,
          e: '8/15/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Lockheed-Martin-Jobs-E404.htm'
          ]
        },
        {
          a: 'Xylem | Morrisville, North Carolina',
          b: 'Software Engineer',
          c: [
            'BS',
            '1+ years exp',
            'Java, C++, UNIX, Linux, Data Structures & Algorithms, REST/SOAP, SQL database, Unit Testing, Agile'
          ],
          d: true,
          e: '8/15/2024',
          g: [
            'https://www.indeed.com/cmp/Xylem/jobs',
            'https://xylem.wd5.myworkdayjobs.com/en-US/xylem-careers/userHome'
          ]
        },
        {
          a: 'Amentum | Fort Belvoir, Virginia',
          b: 'Software Engineer II',
          c: [
            'BS',
            '1+ years exp',
            'Active Secret Clearance'
          ],
          d: true,
          e: '8/15/2024',
          g: [
            'https://www.indeed.com/cmp/Amentum/jobs',
            'https://pae.wd1.myworkdayjobs.com/en-US/Amentum_Careers/userHome'
          ]
        },
        {
          a: 'State Farm | Bloomington, Illinois',
          b: 'Software Engineer',
          c: [
            'Python, JavaScript, Java, React, Vue, AWS, Terraform, Scalr, Docker, CI/CD, GitLab'
          ],
          d: false,
          e: '8/15/2024',
          f: '8/20/2024',
          g: [
            'https://www.indeed.com/cmp/State-Farm-319b4913/jobs'
          ]
        },
        {
          a: 'Apple | Cupertino, California',
          b: 'Software Engineer, Shortcuts',
          c: [
            'BS',
            'Objective-C, Swift, AppKit, SwiftUI, UIKit, Xcode'
          ],
          d: true,
          e: '8/15/2024',
          g: [
            'https://www.indeed.com/cmp/Apple/jobs',
            'https://jobs.apple.com/app/en-us/profile/roles'
          ]
        },
        {
          a: 'Toyota | Plano, Texas',
          b: 'Software Engineer - EV',
          c: [
            'BS',
            'Java, Golang'
          ],
          d: false,
          e: '8/15/2024',
          f: '9/13/2024',
          g: [
            'https://www.indeed.com/cmp/Toyota-North-America-9/jobs',
            'https://toyota.wd5.myworkdayjobs.com/en-US/TMNA/userHome?Job_Application_ID=JOB_APPLICATION-3-976223'
          ]
        },
        {
          a: 'Disney Entertainment & ESPN Technology | New York, New York',
          b: 'Software Engineer I',
          c: [
            'BS',
            'AWS, Golang, APIs, CI/CD, Kubernetes, Jenkins, Spinnaker'
          ],
          d: true,
          e: '8/16/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Walt-Disney-Company-Jobs-E717.htm',
            'https://disney.wd5.myworkdayjobs.com/en-US/disneycareer/userHome'
          ]
        },
        {
          a: 'Quorso | Ontario, California',
          b: 'Full Stack Software Engineer',
          c: [
            'JavaScript, TypeScript, REST, Rails, '
          ],
          d: true,
          e: '8/19/2024',
          g: [
            'https://www.indeed.com/cmp/Quorso/jobs'
          ]
        },
        {
          a: 'Altera.AI | Menlo Park, California',
          b: 'Software Engineer',
          c: [
            'BS',
            'Python, Java, Go, SQL, NoSQL, Docker, Kubernetes, AWS, Azure, CI/CD'
          ],
          d: true,
          e: '8/19/2024',
          g: [
            'https://www.indeed.com/cmp/Altera-Corporation/jobs'
          ]
        },
        {
          a: 'Fortinet | Sunnyvale, California',
          b: 'Full Stack Engineer',
          c: [
            'Typescript, Nodejs, Docker, Linux, Git, NoSQL, Couchbase, DevOps, GitOps, Terraform'
          ],
          d: true,
          e: '8/19/2024',
          g: [
            'https://www.indeed.com/cmp/Fortinet/jobs',
            'https://edel.fa.us2.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2001/my-profile'
          ]
        },
        {
          a: 'Ascendion | Costa Mesa, California',
          b: 'Full Stack Engineer',
          c: [
            'BS',
            'React, NodeJS, JavaScript, HTML, CSS, Java/J2EE, SQL, Unix, Oracle, Jboss, SOAP, REST, AWS'
          ],
          d: true,
          e: '8/19/2024',
          g: [
            'https://www.indeed.com/cmp/Ascendion/jobs'
          ]
        },
        {
          a: 'Blizzard Entertainment | Irvine, California',
          b: 'Game Designer, WoW Classic',
          c: [
            ''
          ],
          d: false,
          e: '8/19/2024',
          f: '8/23/2024',
          g: [
            'https://www.indeed.com/cmp/Blizzard-Entertainment/jobs'
          ]
        },
        {
          a: 'Kohler | Palo Alto, California',
          b: 'Software Engineering Intern - Kohler Ventures',
          c: [
            'IoT'
          ],
          d: true,
          e: '8/19/2024',
          g: [
            'https://www.ziprecruiter.com/co/KOHLER/Jobs/--in-United-States?id=o5O+ohFAhIKO+pBA2agsn0mPxI4='
          ]
        },
        {
          a: 'Corelation Inc | San Diego, California',
          b: 'Core Developer I',
          c: [
            'BS',
            '1-2 years exp',
            'C++, SQL, XML, AIX, Agile, Scrum'
          ],
          d: false,
          e: '8/21/2024',
          f: '9/11/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Corelation-Jobs-E1161444.htm'
          ]
        },
        {
          a: 'Tricon Residential | Tustin, California',
          b: 'Software Developer - TriPOD',
          c: [
            'BS',
            '.NET Core, NodeJS, ASP.CORE MVC, MySQL, Git, AWS, Razor, Docker, Kubernetes',
            'RESTful APIs'
          ],
          d: true,
          e: '8/21/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Tricon-Residential-Jobs-E1107797.htm',
            'https://tricon.wd3.myworkdayjobs.com/en-US/tricon/userHome'
          ]
        },
        {
          a: 'Lytx | San Diego, California',
          b: 'Software Engineer II',
          c: [
            'BS',
            '1+ years exp',
            'C#, Java, Python, JavaScript, Ruby, Unit Testing, RESTful APIs, SQL, NoSQL'
          ],
          d: true,
          e: '8/21/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Lytx-Jobs-E813859.htm',
            'https://lytx.wd1.myworkdayjobs.com/en-US/Lytx/userHome'
          ]
        },
        {
          a: 'ASML | San Diego, California',
          b: 'Software Engineer',
          c: [
            'BS',
            '3-5 years exp',
            'Core Java',
            'C/C++, Postgres, Shell scripting, DevOps, Jenkins, GitHub',
            'Redhat, OOP'
          ],
          d: false,
          e: '9/3/2024',
          f: '9/16/2024',
          g: [
            'https://www.indeed.com/cmp/Asml/jobs',
            'https://asml.wd3.myworkdayjobs.com/en-US/ASMLEXT1/userHome'
          ]
        },
        {
          a: 'Curacao | Los Angeles, California',
          b: 'Junior Data Analyst',
          c: [
            'BS',
            'Python'
          ],
          d: true,
          e: '9/3/2024',
          g: 'https://www.indeed.com/cmp/Curacao/jobs'
        },
        {
          a: 'Syncreon | Perris, California',
          b: 'IT QA Analyst - Associate',
          c: [
            'BS'
          ],
          d: true,
          e: '9/3/2024',
          g: [
            'https://www.indeed.com/cmp/Syncreon/jobs',
            'https://career5.successfactors.eu/career?company=syncreonam&site=&lang=en_US&login_ns=login&loginFlowRequired=true&showLogOutMsg=true&brandUrl=&_s.crb=73E1O%252bb4PvIwHdaFqdC%252bpypOmRR%252bT18aOmZs5J%252fdlaM%253d'
          ]
        },
        {
          a: 'Arup | Los Angeles, California',
          b: 'Graduate Software Developer (Available 2025)',
          c: [
            'BS',
            'Python, PowerBI, Tableau, AI, ML, AR, VR, AWS, Azure'
          ],
          d: true,
          e: '9/3/2024',
          g: [
            'https://www.indeed.com/cmp/Arup/jobs',
            'https://tas-arupjobs.taleo.net/careersection/careersection/ex/mysubmissions.ftl?lang=en'
          ]
        },
        {
          a: 'Blizzard Entertainment | Irvine, California',
          b: 'Senior Software Engineer - Tools | Overwatch',
          c: [
            'BS',
            'C#, C++, WPF, SQL Databases'
          ],
          d: false,
          e: '9/3/2024',
          f: '9/13/2024',
          g: [
            'https://www.indeed.com/cmp/Blizzard-Entertainment/jobs'
          ]
        },
        {
          a: 'Peraton | Colorado Springs, Colorado',
          b: 'Software Development, Senior Associate',
          c: [
            'BS',
            '2+ years exp',
            'Java, AngularJS, HTML, CSS, JavaScript, Bootstrap, Eclipse, JUnit, Git'
          ],
          d: false,
          e: '9/4/2024',
          f: '9/4/2024',
          g: [
            'https://www.indeed.com/cmp/Peraton/jobs'
          ]
        },
        {
          a: 'ZipRecruiter | Santa Monica, California',
          b: 'Software Engineer - New Grad',
          c: [
            'Python, Java, Go, C++, JavaScript',
            'Kubernetes, HTML, CSS, React, Big Data, IOS, Mobile, Android'
          ],
          d: true,
          e: '9/5/2024',
          f: '9/10/2024',
          g: [
            'ZipRecruiter'
          ]
        },
        {
          a: 'Summit Interconnect, Inc | Anaheim, California',
          b: 'Software Developer',
          c: [
            'BS',
            'Python, Node.js, MySQL, MongoDB',
            'HTML5, CSS3, JavaScript, React, Vue.js, RESTful APIs, CI/CD, Git, AWS, Azure, GCP, Docker, Kubernetes, Agile/Scrum, GitHub',
          ],
          d: true,
          e: '9/5/2024',
          g: [
            'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?lang=en_US&cid=734c8047-a53a-4286-8a05-2b1b38e7c95e&ccId=19000101_000001'
          ]
        },
        {
          a: 'StrongMind | Chandler, Arizona',
          b: 'Junior Software Engineer',
          c: [
            'BS',
            'Ruby/Rails, JS/TS, C#, Python/Django, Agile, UX'
          ],
          d: true,
          e: '9/5/2024',
          g: [
            'https://recruiting2.ultipro.com/STR1017SMINC/JobBoard/e883a137-8797-484c-bf4d-c3d514ec5e38/?q=&o=postedDateDesc&w=&wc=&we=&wpst='
          ]
        },
        {
          a: 'Crelate | Boise, Idaho',
          b: 'Junior Software Developer',
          c: [
            'BS',
            '2+ years exp',
            '.NET / C#, SQL'
          ],
          d: true,
          e: '9/5/2024',
          g: [
            'https://app.crelate.com/portal/bes/'
          ]
        },
        {
          a: 'Urban Air Adventure Parks | Moreno Valley, California',
          b: 'Full Stack Software Developer',
          c: [
            '3+ years exp',
            'HTML, CSS, JavaScript, React',
            'Node.js, Express, MongoDB'
          ],
          d: true,
          e: '9/5/2024',
          g: [
            'ZipRecruiter'
          ]
        },
        {
          a: 'Intelliswift Software Inc | San Jose, California',
          b: 'Software Developer - JAVA',
          c: [
            'React, Nodejs, Flask, REST, NoSQL, AWS / Azure, Apache Storm, Elastic Search'
          ],
          d: true,
          e: '9/5/2024',
          g: [
            'ZipRecruiter',
            'https://www.intelliswift.com/careers/current-openings'
          ]
        },
        {
          a: 'Electronic Arts | Software Engineer I',
          b: 'Software Engineer I',
          c: [
            'BS',
            '1+ years exp',
            'C++ or Python, Visual Studio, HTML, CSS, JavaScript'
          ],
          d: true,
          e: '9/5/2024',
          g: [
            'ZipRecruiter',
            'https://ea.gr8people.com/jobs'
          ]
        },
        {
          a: 'WEX Inc, Bodega Bay, California',
          b: 'Software Engineer - Entry Level',
          c: [
            'BS',
            'Java, C#, TypeScript'
          ],
          d: true,
          e: '9/6/2024',
          g: [
            'ZipRecruiter',
            'https://careers.wexinc.com/us/en/home'
          ]
        },
        {
          a: 'Micron Technology | Boise, Idaho',
          b: 'IT Software Engineer',
          c: [
            'BS',
            '1-3+ years exp',
            'Clustering, Coding, C++, NET, Database'
          ],
          d: false,
          e: '9/9/2024',
          f: '9/28//2024',
          g: [
            'https://www.linkedin.com/jobs/view/3966178295/?alternateChannel=search&refId=EIUnwsiV7Zo3F0NxhBwa2g%3D%3D&trackingId=pKzjwNmYx8nxi%2FM35BAD6w%3D%3D&trk=d_flagship3_search_srp_jobs',
            'https://micron.wd1.myworkdayjobs.com/en-US/External/userHome'
          ]
        },
        {
          a: 'PF1 Professional Services, Inc. | Florida, United States',
          b: 'Java Software Engineer',
          c: [
            'BS',
            '1-2+ years exp',
            'JS, React, Agile, AWS, Azure'
          ],
          d: true,
          e: '9/11/2024',
          g: [
            'https://www.linkedin.com/jobs/view/4024026282/?alternateChannel=search&refId=aDmONyeT0FDd8NnR6ceSyQ%3D%3D&trackingId=MAoVUUN355FPiVBQNzlx3g%3D%3D&trk=d_flagship3_postapply_open_to_work'
          ]
        },
        {
          a: 'Alto Pharmacy | (Remote) United States',
          b: 'Early Career Software Engineer',
          c: [
            'BS',
            '1-2+ years exp',
            'C#, C/C++, Ruby, Rust, Golang, Java, Python, TypeScript, JavaScript, AWS, Google Cloud, Azure, PostgreSQL, Git, Github, Slack, Angular, React, .NET, Spring Boot, Rails'
          ],
          d: true,
          e: '9/11/2024',
          g: [
            'https://www.linkedin.com/jobs/view/4022264240/?alternateChannel=search&refId=aDmONyeT0FDd8NnR6ceSyQ%3D%3D&trackingId=otjhCyipUnIjNfqjwOQfEw%3D%3D&trk=d_flagship3_search_srp_jobs'
          ]
        },
        {
          a: 'TD Bank | New York, New York',
          b: 'Software Engineer I',
          c: [
            'BS',
            '2+ years exp',
          ],
          d: true,
          e: '9/18/2024',
          g: [
            'https://td.wd3.myworkdayjobs.com/en-US/TD_Bank_Careers?q=software',
            'https://td.wd3.myworkdayjobs.com/en-US/TD_Bank_Careers/userHome'
          ]
        },
        {
          a: 'TKC Holdings | West Des Moines, Iowa',
          b: '.Net Software Developer I',
          c: [
            'BS, 0-3+ years exp',
            '.Net, MVC, JavaScript, HTML5, CSS'
          ],
          d: true,
          e: '9/18/2024',
          g: [
            'https://careers.tkcholdings.com/why-us/jobs?keywords=software',
            'https://corporatecareers-tkcholdings.icims.com/jobs/dashboard?hashed=-1027616988'
          ]
        },
        {
          a: 'ASSYST, Inc. | Sterling, Virginia',
          b: 'Junior Software Developer',
          c: [
            'BS',
            'HTML, CSS, JavaScript, Java, C#, Python, Angular, React, Vue, Agile Scrum',
            'Debug, Design, Test, Collaborate, UI'
          ],
          d: true,
          e: '9/18/2024',
          g: [
            'https://assyst.catsone.com/careers/112636-ASSYST-Inc/'
          ]
        },
        {
          a: 'VideoAmp | Los Angeles, California',
          b: 'Entry Backend Engineer',
          c: [
            'BS',
            'Go, Java, C#, C++, GitHub'
          ],
          d: true,
          e: '9/20/2024',
          g: [
            'https://videoamp.com/jobs'
          ]
        },
        {
          a: 'Komatsu | Tucson, Arizona',
          b: 'Software Engineer I',
          c: [
            'BS',
            '1-5 years exp',
            'C#, Java, SDLC, ASP.NET MVC, Spring, HTML, CSS, JavaScript, TCP/IP, Entity Framework, JPA, Hibernate, Linux, Windows',
            'Docker, Kubernetes, RabbitMQ, Kafka, ZeroMQ'
          ],
          d: true,
          e: '9/20/2024',
          g: [
            'https://komatsu.jobs/'
          ]
        },
        {
          a: 'Compass | Seattle, Washington',
          b: 'Software Engineer I',
          c: [
            'BS',
            '1-2 years exp',
            'Java, Python, C#, Go, SQL, AWS, ElasticSearch, Kubernetes, Redis, Lambda, Kafka, Databricks'
          ],
          d: true,
          e: '9/20/2024',
          g: [
            'https://www.compass.com/careers/jobs'
          ]
        },
        {
          a: 'OpenPath Products | Annapolis, Marlyand',
          b: 'Mobile and IoT Quality Assurance Automation Engineer',
          c: [
            'BS',
          ],
          d: true,
          e: '9/23/2024',
          g: [
            'https://www.indeed.com/cmp/Openpath-Products-1/jobs'
          ]
        },
        {
          a: 'Mesa Natural Gas Solutions LLC | Loveland, Colorado',
          b: 'Applications Analyst I',
          c: [
            'BS',
            '0-2 years exp',
            'SQL'
          ],
          d: true,
          e: '9/23/2024',
          g: [
            'https://247mesa.com/careers/'
          ]
        },
        {
          a: 'The Travelers Companies, Inc. | Hartford, Connecticut',
          b: 'Software Engineer I - full stack AWS / Python',
          c: [
            'BS',
            '1-3+ years exp',
            'SQL, Python, JavaScript, AWS'
          ],
          d: true,
          e: '9/23/2024',
          g: [
            'https://careers.travelers.com/'
          ]
        },
        {
          a: 'Leading Edge Fundraising | (Remote) United States',
          b: 'Software Developer',
          c: [
            '1+ years exp',
            '.NET, C#, Microsoft SQL, PHP, Azure, Angular, React, Vue, Blazor'
          ],
          d: true, 
          e: '9/23/2024',
          g: [
            'https://www.indeed.com/cmp/Adrenaline-Fundraising-4/jobs'
          ]
        },
        {
          a: 'TherapyNotes.com | (Remote) United States',
          b: 'Software Developer',
          c: [
            'BS',
            '1-3+ years exp',
            'OOP, ASP.NET Core, C#, JavaScript, TypeScript, CSS, SASS, HTML, APIs, SOA, PostgreSQL, Entity Framework Core'
          ],
          d: true,
          e: '9/23/2024',
          g: [
            'https://www.therapynotes.com/careers/'
          ]
        },
        {
          a: 'Reynolds and Reynolds | Andover, Massachusetts',
          b: 'Entry Level Software Developer',
          c: [
            'BS',
            'C#, .NET, Linux, iOS, Android'
          ],
          d: true,
          e: '9/23/2024',
          g: [
            'https://www.reyrey.com/company/careers/job-openings'
          ]
        },
        {
          a: 'Reynolds and Reynolds | Tallahassee, Florida',
          b: 'Entry Level Software Developer',
          c: [
            'BS',
            'JavaScript, React, Redux, Java, SQL'
          ],
          d: true,
          e: '9/23/2024',
          g: [
            'https://www.reyrey.com/company/careers/job-openings'
          ]
        },
        {
          a: 'Pressure Products Company | Charleston, West Virginia',
          b: 'Web Designer',
          c: [
            'BS',
            'GCU transcript'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://www.indeed.com/cmp/Pressure-Products-Company-1/jobs'
          ]
        },
        {
          a: 'Dynamic Animation Systems, Inc. | McLean, Virginia',
          b: 'Software Engineer',
          c: [
            'BS',
            'JavaScript/TypeScript, Java, C++, Python, Agile, React, Angular, Gradle, Podman, Docker, Linux, Scala, Rust, Go'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://www.indeed.com/cmp/Pressure-Products-Company-1/jobs'
          ]
        },
        {
          a: 'Boothwyn Pharmacy | Kennett Square, Pennsylvania',
          b: 'Software Engineer',
          c: [
            'BS',
            '3-5+ years exp',
            'JavaScript, C#, .NET, Azure, AWS, APIs, SignalR, Git, DevOps, React, Express, SQL, Ruby on Rails, RESTful, HIPAA, Agile'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Boothwyn-Pharmacy-Jobs-E731392.htm'
          ]
        },
        {
          a: 'Comcast Corporation | United States',
          b: 'Full Stack Software Engineer 2 (Angular/Java)',
          c: [
            'BS',
            '2-5 years exp',
            'Angular, RESTful APIs, Java, SQL/JDBC, Spring/Spring Boot, NPM/Webpack, RxJS, PostgreSQL, Docker, Kubernetes, AWS, SDLC, Agile, Git, Microservices, '
          ],
          d: true,
          e: '9/24/2024',
          g: [
          'https://comcast.wd5.myworkdayjobs.com/en-US/Comcast_Careers/userHome',
            'https://jobs.comcast.com/search-jobs/software%20engineer/45483/1'
          ]
        },
        {
          a: 'Comcast Corporation | United States',
          b: 'Engineer 3, Software Development & Engineering - 3435',
          c: [
            'BS',
            '2+ years exp',
            'PHP, REST API, SOAP API, JQuery, MySQL, JSON, VueJS, React, Django, Drupal'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://comcast.wd5.myworkdayjobs.com/en-US/Comcast_Careers/userHome',
            'https://jobs.comcast.com/search-jobs/software%20engineer/45483/1'
          ]
        },
        {
          a: 'Motion Recruitment | Fort Worth, Texas',
          b: 'IT Applications Developer',
          c: [
            'BS',
            '2+ years exp',
            'Java, XML, HTML, JavaScript, CSS, GIT, JQuery, Angular, SOAP/REST, GitHub, MySQL, PostgreSQL, Sockets, TCP/IP, Agile, Postman, HTTP Analyzer, Dynatrace'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://motionrecruitment.com/tech-jobs'
          ]
        },
        {
          a: 'ELM Utility Services | Missoula, Montana',
          b: 'Application Developer',
          c: [
            'BS',
            '3-5 years exp',
            'T-SQL, C#, .NET Core, ASP.NET Core, RESTful API, OAuth, Azure, SQL database, CORS'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://elmllc.easyapply.co/'
          ]
        },
        {
          a: 'Town Fair Tire | East Haven, Connecticut',
          b: 'Junior C#.NET Developer',
          c: [
            'BS',
            '1-3+ years exp',
            '.NET, C#, ASP.NET, ADO.NET, SQL Server, REST, SOAP,, Visual Studio, Git, HTML, CSS, JavaScript, JSON, AJAX, Jira, .NET Core, Agile'
          ],
          d: true, 
          e: '9/24/2024',
          g: [
            'https://www.indeed.com/cmp/Town-Fair-Tire-4/jobs'
          ]
        },
        {
          a: 'Cahoon Farms Inc | Wolcott, New York',
          b: 'IT Technician and Programmer',
          c: [
            '2+ years exp',
            'Microsoft Visual FoxPro, Python, PostgreSQL, Docker, Django, Excel, PowerAps, PowerAutomate'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://www.indeed.com/cmp/Cahoon-Farms-Inc/jobs'
          ]
        },
        {
          a: 'Founders Software | Buffalo, New York',
          b: 'Web Application Developer',
          c: [
            'BS',
            '5+ years exp',
            'C# .NET Framework 4.8 & .NET Core 7',
            'Azure SQL, Angular 15+, DevOps CI/CD, VS Code, Visual Studio 2022, Postman, SSMS, Docker, GitHub, Scrum, AWS, REST APIs'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://www.indeed.com/cmp/Founders-Software-1/jobs'
          ]
        },
        {
          a: 'SYSCO | Houston, Texas',
          b: 'Associate Software Engineer - GSC - US',
          c: [
            'BS',
            '0-2+ years exp',
            'Java, JavaScript, C#, Python, Ruby, Groovy, Salesforce, Git, Scrum, XP, Kanban, DevOps, Agile'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://careers.sysco.com/search-jobs/software/1105/1',
            'https://wd5.myworkdaysite.com/en-US/recruiting/sysco/syscoprivatecareers/userHome'
          ]
        },
        {
          a: 'Microsoft | Redmond, Washington',
          b: 'Software Engineer II',
          c: [
            'BS',
            '2+ years exp',
            'C, C++, C#, Java, JavaScript, Python'
          ],
          d: false,
          e: '9/24/2024',
          f: '9/25/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Microsoft-Jobs-E1651.htm'
          ]
        },
        {
          a: 'Sacramento Kings | Sacramento, California',
          b: 'Associate Basketball Data Engineer',
          c: [
            'SQL, APIs, R, Git, HTML, CSS'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://www.teamworkonline.com/basketball-jobs/sacramento-kings-jobs/sacramento-kings',
            'https://kings.wd1.myworkdayjobs.com/en-US/KingsCareers/userHome'
          ]
        },
        {
          a: 'Bethesda Game Studios | Rockville, Maryland',
          b: 'Backend Programmer',
          c: [
            '2+ years exp',
            'RESTful APIs, Go, Linux, AWS, Azure, Docker, CI/CD, NoSQL, MongoDB, Redis, GitHub, C++, TypeScript, React, Redux, Splunk'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://www.glassdoor.com/Jobs/Bethesda-Softworks-Jobs-E1047242.htm',
            'https://jobs.zenimax.com/jobs?department=C8723&located=&location='
          ]
        },
        {
          a: 'Adobe | Seattle, Washington',
          b: '2025 University Graduate - Software Development Engineer',
          c: [
            'BS',
            '0-1+ years exp',
            'Python, Java, C++, C#, Ruby, PHP, React, Angular, Vue, jQuery'
          ],
          d: true,
          e: '9/24/2024',
          g: [
            'https://careers.adobe.com/us/en/search-results?keywords=software'
          ]
        },
        {
          a: 'Stripe | Seattle, San Francisco, New York, United States',
          b: 'Software Engineer, Intern (Summer & Winter)',
          c: [
            'BS',
            '2+ years exp',
            'Java, Ruby, JavaScript, Scala, Go, HTTP',
          ],
          d: true,
          e: '9/26/2024',
          g: [
            'https://stripe.com/jobs/search'
          ]
        },
        {
          a: 'Shopee | Singapore, Singapore',
          b: 'Backend Engineer - Marketplace (Campus Recruitment 2023/2024)',
          c: [
            'BS',
            'Java, Python, Golang, C++, MySQL',
            'Data Structures, Algorithms, Operating Systems, Networks, Databases'
          ],
          d: true, 
          e: '9/26/2024',
          g: [
            'https://www.linkedin.com/jobs/view/3965129278/?alternateChannel=search&refId=o6ivVNkhMXnpiDGExuRY7w%3D%3D&trackingId=y1m5e63C8MgOFZ7Ojr2xgA%3D%3D&trk=d_flagship3_search_srp_jobs',
            'https://careers.shopee.sg/'
          ]
        }
      ]
    }
  },

  methods: 
  {
    /**
     * 
     */
    getAppliedVsRejectedStatistics() 
    {
      var job_map = {};
      let betweenInterviewsCounter = 0; 

      for (const job of this.job_apps) 
      {
        betweenInterviewsCounter++; 

        // count inprogress and rejections
        if (job.d) 
        {
          this.statistics.num_inprogress++;
        }
        else 
        {
          this.statistics.num_rejections++;
        }

        // count daily jobs applied
        if (job.e in job_map) 
        { 
          job_map[job.e]++; 
        }
        else if (job.e !== undefined) 
        { 
          job_map[job.e] = 1; 
        }

        // if interviewed scheduled
        if (job.i !== undefined) 
        {
          this.statistics.num_interviews++; 
          this.appsBetweenInterviews.push(betweenInterviewsCounter);
          betweenInterviewsCounter = 0;

          if (job.j !== undefined && job.j === true)
          {
            this.statistics.num_jobOffers++; 
            console.log('= ', this.statistics.num_jobOffers);
          }
        }
      }
      
      this.appsBetweenInterviews.push(betweenInterviewsCounter);

      console.log(this.appsBetweenInterviews) // debug

      console.log(`${this.appsBetweenInterviews[this.appsBetweenInterviews.length-1]} applies since last interview.`)

      this.avgAppliesForInterview = Math.floor(this.appsBetweenInterviews.slice(0, -1).reduce((total, e) => total + e, 0) / (this.appsBetweenInterviews.length-1) );

      return job_map;
    },

    /**
     * 
     * @param {*} date 
     */
    getDaysPassedSinceDate(date)
    {
      var targetDate = new Date(date);

      var remainingTime = targetDate.getTime() - new Date().getTime();

      var days = Math.floor( remainingTime / 86400000 ); 

      return (days * -1) ;
    },

  },

  /**
   * 
   */
  created() 
  {
    this.job_map = this.getAppliedVsRejectedStatistics();

    this.numberOfDays = Object.keys(this.job_map).length;

    this.appliesPerDay = (this.job_apps.length / this.numberOfDays).toFixed(2);

    this.numDaysPostGCUgraduation = this.getDaysPassedSinceDate("2024/04/27 00:00:00");

    this.reverseJobsList = this.job_apps.reverse();
  },

};

// https://www.linkedin.com/posts/robynnstorey_resumewriting-jobsearch-hiring-activity-7217195973033263106-xl1w?utm_source=share&utm_medium=member_desktop

</script>

<style scoped></style>
