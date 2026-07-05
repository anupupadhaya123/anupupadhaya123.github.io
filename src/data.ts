import { SkillCategory, Experience, Project, Achievement, Reference } from './types';

export const personalInfo = {
  name: 'Anup Upadhaya',
  title: 'IT Support & Systems Specialist',
  subTitle: 'Master of IT (Data Science & AI) Graduate',
  about: 'Adaptable IT Support Graduate holding a Master of IT and Google IT Certifications, deeply passionate about hands-on technical problem-solving and rapid skill acquisition. Combines strong foundational knowledge in Active Directory and Microsoft Entra ID / M365 Administration with a proven track record of supporting users, optimizing system workflows, and analyzing data to drive strategic decisions.',
  location: 'Darwin, NT, Australia',
  email: 'au.anupupadhaya@gmail.com',
  phone: '0481239601',
  github: 'https://github.com/anupupadhaya123/',
  linkedin: 'https://www.linkedin.com/in/anup-upadhaya-86aa27183',
  availability: 'Full-Time',
  languages: ['English', 'Nepali', 'Hindi'],
  interests: ['Tech Enthusiast', 'Traveling', 'Sports', 'Open Source'],
  completedProjectsCount: 20,
  ticketResolutionRate: '100%'
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'sys_admin',
    name: 'Systems Administration & Cloud',
    iconName: 'Server',
    skills: [
      { name: 'Active Directory (AD DS)', level: 85, details: 'User accounts, group policies, domains' },
      { name: 'Microsoft Entra ID', level: 80, details: 'Cloud identity and access management' },
      { name: 'Windows Server 2019/2022', level: 85, details: 'Domain Controller config, server setups' },
      { name: 'Linux System Administration', level: 75, details: 'Command line, system updates, scripting' },
      { name: 'Group Policy Objects (GPOs)', level: 80, details: 'Security baselines, deployment rules' }
    ]
  },
  {
    id: 'm365_admin',
    name: 'M365 & Endpoint Management',
    iconName: 'Laptop',
    skills: [
      { name: 'M365 Admin Center', level: 90, details: 'License management, account privileges' },
      { name: 'Action1 Cloud Console', level: 80, details: 'Vulnerability remediation, patch management' },
      { name: 'Endpoint Software Provisioning', level: 85, details: 'Automated software deployments' },
      { name: 'VirtualBox / Hypervisors', level: 85, details: 'Lab deployments, resource optimization' },
      { name: 'MS Outlook Administration', level: 90, details: 'Shared mailboxes, calendar coordination' }
    ]
  },
  {
    id: 'networking',
    name: 'Networking & Protocols',
    iconName: 'Network',
    skills: [
      { name: 'IPv4 Static Addressing', level: 85, details: 'Subnet masking, custom gateway config' },
      { name: 'DNS & DHCP Configuration', level: 80, details: 'IP reservations, recursive routing' },
      { name: 'TCP/IP Protocol Stack', level: 80, details: 'Network architecture & communications' },
      { name: 'ICMP Diagnostics', level: 90, details: 'Traceroute, Ping, network troubleshooting' },
      { name: 'POS Hardware Networking', level: 85, details: 'Terminal connections, hardware setup' }
    ]
  },
  {
    id: 'analytics_data',
    name: 'Programming & Analytics',
    iconName: 'BarChart2',
    skills: [
      { name: 'Python', level: 80, details: 'Data analysis, pandas, scripting, automated tasks' },
      { name: 'SQL Database Querying', level: 75, details: 'Relational queries, data modeling' },
      { name: 'Microsoft Power BI', level: 85, details: 'DAX modeling, reports, ETL, interactive dashboards' },
      { name: 'Advanced Excel', level: 90, details: 'Pivot tables, power query, data models' },
      { name: 'Looker & Tableau', level: 70, details: 'Business intelligence visualization' }
    ]
  },
  {
    id: 'itsm_tools',
    name: 'ITSM & Enterprise Workflows',
    iconName: 'ShieldAlert',
    skills: [
      { name: 'Jira Service Management', level: 85, details: 'Ticket handling, SLA prioritization' },
      { name: 'ServiceNow Workflows', level: 75, details: 'Incident lifecycle, request tracking' },
      { name: 'IT Ticket Lifecycle', level: 90, details: 'First-contact, troubleshooting, documentation' },
      { name: 'Standardized Process Authoring', level: 80, details: 'Creating team process sheets' },
      { name: 'POS Hardware Troubleshooting', level: 85, details: 'Printer configurations, scoreboard fixes' }
    ]
  },
  {
    id: 'development',
    name: 'Mobile & Software Dev',
    iconName: 'Code',
    skills: [
      { name: 'Flutter Development', level: 75, details: 'Cross-platform Android & iOS apps' },
      { name: 'Git & Version Control', level: 85, details: 'Repository management, branching, GitHub' },
      { name: 'SEO & Google Analytics', level: 70, details: 'Web traffic modeling, search engine optimization' }
    ]
  }
];

export const experiences: Experience[] = [
  {
    id: 'playpoint',
    role: 'Customer Service & IT Support All-Rounder',
    company: 'Playpoint Ballajura Indoor Sports',
    location: 'Darwin, NT',
    period: '02/2024 - 04/2026',
    category: 'it_support',
    highlights: [
      'User Account Support: Handled basic user account creation, profile detail configuration, and password resets using Microsoft 365 Admin Center and Microsoft Entra ID.',
      'Email & Calendar Coordination: Managed the company’s daily Microsoft Outlook mailboxes, setting up shared staff calendars and resolving email access issues.',
      'Hardware Deployment & OS Installation: Physically set up venue computer hardware, performed clean Windows OS installations, and configured local networks.',
      'Peripherals & Scoreboard Troubleshooting: Acted as the on-site technician to troubleshoot network printers, fix digital scoreboard connectivity issues, and resolve point-of-sale (POS) terminal errors.',
      'First-Contact Problem Solving: Answered daily phone inquiries, accurately completed user detail tracking documents, and resolved customer booking conflicts.'
    ],
    skillsUsed: ['M365 Admin Center', 'Microsoft Entra ID', 'Windows Installation', 'POS Troubleshooting', 'Outlook Administration']
  },
  {
    id: 'rapidpro',
    role: 'IT Support & Operations Assistant',
    company: 'Rapid Pro Clean',
    location: 'Darwin, NT',
    period: '12/2023 - 04/2026',
    category: 'it_support',
    highlights: [
      'Commenced as an entry-level cleaner and earned a rapid promotion to IT Support due to technical aptitude, subsequently handling a queue of 15+ technical support tickets weekly.',
      'Handled technical incident tracking, remote software configurations, and authored standardized team process sheets to ensure team procedures were fully documented.',
      'Maintained strict confidentiality protocols regarding corporate records, digital account access, and sensitive client identity details.'
    ],
    skillsUsed: ['IT Support Tickets', 'Configuration Management', 'Incident Tracking', 'Documentation', 'Access Control']
  },
  {
    id: 'crust',
    role: 'Customer Service & POS Support',
    company: 'Crust Pizza',
    location: 'Darwin, NT',
    period: '06/2024 - 04/2026',
    category: 'it_support',
    highlights: [
      'Started as a pizza maker and delivery driver, progressing into front-of-house customer service handling 80+ digital and phone orders per shift with 99% order placement accuracy.',
      'Partnered with team members to resolve 100% of front-of-house POS hardware and network connectivity issues during peak weekend hours, minimizing system downtime.'
    ],
    skillsUsed: ['POS Hardware', 'Network Troubleshooting', 'Customer Service', 'Order Management']
  },
  {
    id: 'codehimalaya',
    role: 'Junior Flutter Developer (Intern to Junior)',
    company: 'Code Himalaya',
    location: 'Lalitpur, Nepal',
    period: '2022 - 2023',
    category: 'analytics_dev',
    highlights: [
      'Advanced rapidly from an intern to a Junior Flutter Developer, showcasing strong technical learning capabilities.',
      'Actively contributed to cross-platform mobile application development, crafting responsive layouts and integrating API services.',
      'Honed skills in Dart, state management (Provider/Bloc), and Git workflows in a team environment.'
    ],
    skillsUsed: ['Flutter', 'Dart', 'Mobile Dev', 'API Integration', 'Git']
  },
  {
    id: 'kishaan',
    role: 'Co-founder & Data Analyst',
    company: 'Kishaan Enterprise',
    location: 'Kathmandu, Nepal',
    period: '2021 - 2022',
    category: 'analytics_dev',
    highlights: [
      'Co-founded Kishaan Enterprise, an agritech startup dedicated to enhancing agricultural practices and efficiency in Nepal.',
      'Served as a Data Analyst, utilizing Python (pandas/numpy) and Power BI to analyze market dynamics and agricultural yield data to glean actionable insights.',
      'Integrated real-world tracking metrics and published details on GitHub to emphasize open-source technical solutions for local community impact.'
    ],
    skillsUsed: ['Python', 'Power BI', 'Data Analysis', 'Agritech', 'Data Visualization']
  }
];

export const educationHistory = [
  {
    degree: 'Master of IT Major in Data Science and AI',
    school: 'Murdoch University',
    location: 'Darwin, Australia',
    period: '2024 - 2026',
    grade: 'GPA: 2.88/4.0',
    details: 'Specialization in data-driven operations, systems configuration, machine learning models, and digital infrastructure.'
  },
  {
    degree: 'BSc (Hons) Computer Science / Software Engineering',
    school: 'Patan College for Professional Studies',
    location: 'Lalitpur, Nepal',
    period: '2019 - 2023',
    grade: 'Grade: First Class Distinction (73%)',
    details: 'Commenced software engineering journey, building strong core foundations in computer science, software development, data structures, and business management.'
  },
  {
    degree: 'Higher Secondary School (Science)',
    school: 'Kathmandu Model School',
    location: 'Kathmandu, Nepal',
    period: '2018 - 2019',
    grade: 'Grade: First Class Distinction',
    details: 'Focused on physics, chemistry, mathematics, and computer fundamentals.'
  }
];

export const projects: Project[] = [
  {
    id: 'enterprise_sandbox',
    title: 'Enterprise Sandbox Rebuild: Active Directory & Cloud Patching',
    description: 'Designed and provisioned an isolated system lab containing Windows Server 2022 Domain Controller and Windows 11 client workstation to simulate secure enterprise configurations.',
    category: 'systems_networking',
    tags: ['Windows Server 2022', 'Active Directory', 'VirtualBox', 'Action1 Cloud', 'GPO', 'DNS/DHCP'],
    githubUrl: 'https://github.com/anupupadhaya123/Enterprise-Sandbox-Rebuild',
    highlights: [
      'Infrastructure Deployment: Provisioned an isolated laboratory environment in Oracle VM VirtualBox featuring a Domain Controller (DarwinNepal.onmicrosoft.com) and a Windows 11 workstation.',
      'Hardware Optimization: Eliminated hypervisor bottlenecks by calibrating multi-core CPU allocations, activating graphics hardware acceleration, and optimizing storage caching zones.',
      'Deployment Workarounds: Implemented local offline account setups during network-isolated build phases using advanced command-line bypass codes (OOBE\\BYPASSNRO).',
      'Network Routing & DNS: Configured static IPv4 address tables in identical subnets, routing the client\'s Preferred DNS path directly to the Domain Controller\'s IP (10.0.2.14). Verified via ICMP ping utilities.',
      'Cloud Endpoint Management: Engineered a dual-homed network architecture on the host controller to introduce a secondary NAT gateway. Enrolled the DC into the Action1 Cloud Patch Management Console for patch automated scans.'
    ]
  },
  {
    id: 'python_big_data',
    title: 'Big Data Analysis & Exploration with Python',
    description: 'A comprehensive collection of 10+ hands-on projects exploring, modeling, and gaining insight from diverse, massive real-world datasets using python notebooks.',
    category: 'data_analytics',
    tags: ['Python', 'Pandas', 'Numpy', 'Matplotlib', 'Data Analysis', 'Jupyter'],
    githubUrl: 'https://github.com/anupupadhaya123/data_analysis_python',
    highlights: [
      'Analyzed 10+ massive datasets including Police statistics, weather tracking records, Udemy enrollment metrics, global COVID-19 dashboards, London housing indices, and Netflix databases.',
      'Implemented robust data cleansing, handling of missing indices, data type normalization, and advanced groupings.',
      'Constructed correlation matrices, scatter plots, and distributions to extract hidden statistics and reports.'
    ]
  },
  {
    id: 'powerbi_reports',
    title: 'Interactive Dashboard Reports & Analysis in Power BI',
    description: 'Constructed custom business intelligence models and visual reporting layouts representing diwali sales statistics, Ecommerce indicators, and operations performance.',
    category: 'data_analytics',
    tags: ['Power BI', 'DAX', 'Power Query', 'Data Modeling', 'Business Intelligence'],
    githubUrl: 'https://github.com/anupupadhaya123/PowerBI-Project',
    highlights: [
      'Developed end-to-end Power BI report builds starting from multi-source data extraction, schema normalization in Power Query, and DAX calculations.',
      'Engineered clean user-interface layouts featuring responsive slicers, drill-down groups, and dynamic KPIs.',
      'Transformed complex sales datasets into clear stories mapping geography, demographic groups, and purchase patterns.'
    ]
  },
  {
    id: 'excel_sales_dashboard',
    title: 'Excel Sales Analytics & Modeling Dashboard',
    description: 'Designed interactive Excel dashboards to monitor, filter, and analyze operational sales metrics across varying business contexts.',
    category: 'data_analytics',
    tags: ['Excel', 'Data Modeling', 'Pivot Tables', 'Slicers', 'VLOOKUP', 'Dashboard Design'],
    githubUrl: 'https://github.com/anupupadhaya123/Data-Analysis-By-Excel',
    highlights: [
      'Aggregated separate tables into an unified workbook model using advanced Excel functions (INDEX, MATCH, nested VLOOKUPs).',
      'Constructed highly structured Pivot Tables and pivot charts mapping performance over time and sales splits.',
      'Designed neat interactive UI with color-coded alerts, custom slicers, and performance bars.'
    ]
  },
  {
    id: 'flutter_portfolio',
    title: 'Cross-Platform Flutter Mobile Apps Portfolio',
    description: 'A showcase of various mobile applications developed utilizing Google\'s Flutter SDK and Dart, demonstrating clean UI implementation and API management.',
    category: 'software_dev',
    tags: ['Flutter', 'Dart', 'Mobile App', 'State Management', 'REST APIs', 'UI/UX'],
    githubUrl: 'https://github.com/anupupadhaya123?tab=repositories',
    highlights: [
      'Crafted multiple responsive cross-platform application layouts supporting both Android and iOS targets.',
      'Configured local caching solutions, dark theme presets, state management providers, and asynchronous HTTP client communication.',
      'Optimized asset sizes, transition performance, and system thread interactions.'
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: 'google_it_cert',
    title: 'Google IT Support Professional Certificate',
    issuer: 'Google (Coursera)',
    date: 'June 2026',
    description: 'Rigorous professional program consisting of five core sections: System Administration & IT Infrastructure Services, IT Security (Defense against the digital dark arts), Operating Systems and You (Becoming a Power User), Bits and Bytes of Networking, and Technical Support Fundamentals.',
    badgeText: 'Verified Credential'
  },
  {
    id: 'op_excellence',
    title: 'Operational Excellence Award',
    issuer: 'Playpoint Indoor Sports',
    date: '2025',
    description: 'Awarded for conceptualizing, designing, and rolling out the "Super League Automation System", which drastically lowered manual scoresheet data entry errors and optimized system staff productivity.',
    badgeText: 'Internal Innovation'
  },
  {
    id: 'community_building',
    title: 'Open Source Community Organizer',
    issuer: 'GitHub Community',
    date: 'Ongoing',
    description: 'Established, moderated, and grew a localized open-source digital hub helping junior developers learn best practices in Python data scripting and collaborative Git version control workflows.',
    badgeText: 'Community Leader'
  }
];

export const references: Reference[] = [
  {
    id: 'sanjeev',
    name: 'Sanjeev Malhotra',
    role: 'CEO',
    company: 'Playpoint Indoor Sports',
    phone: '+61 424153764',
    email: 'sanjeev.malhotra@playpoint.com.au'
  },
  {
    id: 'rajesh',
    name: 'Rajesh Khanal',
    role: 'CEO',
    company: 'Rapid Pro Clean',
    phone: '0432635667',
    email: 'rajesh@rapidproclean.com.au'
  },
  {
    id: 'joe',
    name: 'Joe Rechichi',
    role: 'CEO',
    company: 'Crust Pizza',
    phone: '+61 432902845',
    email: 'mountlawley@crust.com.au'
  }
];
