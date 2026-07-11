export const EDUCATION_DATA = [
  {
    institution: "Murdoch University",
    location: "Perth, Australia",
    degree: "Master of IT (Major: Data Science and AI)",
    period: "2024 – 2026",
    highlights: [
      "Specialization in data-driven operations, systems configuration, and digital infrastructure.",
      "Hands-on expertise in advanced analytics, AI integration, and virtual networks."
    ]
  },
  {
    institution: "Patan College For Professional Studies",
    location: "Lalitpur, Nepal",
    degree: "BSc (Hons) Computer Science / Software Engineering",
    period: "2019 – 2023",
    highlights: [
      "Graduated with 73%.",
      "Established strong core foundations in computer networks, operating systems, software engineering, and database management."
    ]
  }
];

export const SKILL_DATA = [
  {
    category: "Systems Administration",
    skills: [
      { name: "Active Directory (AD DS)", level: "Expert", icon: "Users" },
      { name: "User Account Management", level: "Expert", icon: "UserCheck" },
      { name: "Group Policy Objects (GPOs)", level: "Advanced", icon: "ShieldCheck" },
      { name: "Windows Server 2019/2022", level: "Advanced", icon: "Server" },
      { name: "Linux Administration", level: "Intermediate", icon: "Terminal" }
    ]
  },
  {
    category: "M365 & Cloud Identity",
    skills: [
      { name: "M365 Admin Center", level: "Expert", icon: "Box" },
      { name: "Microsoft Entra ID", level: "Expert", icon: "Fingerprint" },
      { name: "Privilege Management", level: "Advanced", icon: "Key" },
      { name: "License & Group Management", level: "Advanced", icon: "UsersRound" }
    ]
  },
  {
    category: "Networking & Security",
    skills: [
      { name: "IPv4 Static Addressing & Subnetting", level: "Advanced", icon: "Hash" },
      { name: "DNS & DHCP Configuration", level: "Advanced", icon: "Network" },
      { name: "TCP/IP Stack Protocols", level: "Advanced", icon: "Activity" },
      { name: "ICMP Diagnostics (Ping, Traceroute)", level: "Expert", icon: "ShieldAlert" },
      { name: "Action1 Cloud Patch Management", level: "Advanced", icon: "ShieldAlert" }
    ]
  },
  {
    category: "ITSM & Enterprise Tools",
    skills: [
      { name: "Jira Service Management", level: "Expert", icon: "Briefcase" },
      { name: "ServiceNow Workflows", level: "Advanced", icon: "Workflow" },
      { name: "Incident & Request Lifecycle", level: "Expert", icon: "LifeBuoy" },
      { name: "Microsoft Outlook Admin", level: "Expert", icon: "Mail" },
      { name: "POS Hardware Troubleshooting", level: "Expert", icon: "Monitor" }
    ]
  },
  {
    category: "Programming & Analytics",
    skills: [
      { name: "Python Programming", level: "Advanced", icon: "FileCode" },
      { name: "SQL Database Querying", level: "Advanced", icon: "Database" },
      { name: "Power BI Dashboards", level: "Advanced", icon: "BarChart" },
      { name: "Data Modeling (Advanced Excel)", level: "Expert", icon: "Grid" }
    ]
  }
];

export const EXPERIENCE_DATA = [
  {
    company: "Playpoint Ballajura Indoor Sports",
    location: "Perth, WA",
    role: "Customer Service & IT Support All-Rounder",
    period: "02/2024 – 04/2026",
    highlights: [
      "User Account Support: Handled basic user account creation, profile detail configuration, and password resets using Microsoft 365 Admin Center and Microsoft Entra ID.",
      "Email & Calendar Coordination: Managed daily Microsoft Outlook mailboxes, setting up shared staff calendars, and resolving email access issues.",
      "Hardware Deployment & OS Installation: Physically set up venue computer hardware, performed clean Windows OS installations, and configured local networking.",
      "Troubleshooting Peripherals: Acted as the sole on-site technician to troubleshoot network printers, resolve digital scoreboard connectivity issues, and resolve POS terminal errors.",
      "First-Contact Resolution: Handled high-priority customer inquiries, resolved booking conflicts, and accurately tracked user details."
    ]
  },
  {
    company: "Rapid Pro Clean",
    location: "Perth, WA",
    role: "IT Support & Operations Assistant",
    period: "12/2023 – 04/2026",
    highlights: [
      "Rapidly promoted from entry-level role to IT Support, taking responsibility for a queue of 15+ technical support tickets weekly.",
      "Handled full technical incident tracking and remote configuration queries, ensuring minimal operational downtime.",
      "Authored standardized team process sheets and SOPs to ensure team procedures were fully documented and reproducible.",
      "Maintained strict confidentiality protocols regarding corporate records, digital account access, and sensitive client identity details."
    ]
  },
  {
    company: "Crust Pizza",
    location: "Perth, WA",
    role: "Customer Service & POS Support",
    period: "06/2024 – 04/2026",
    highlights: [
      "Partnered with team members to resolve 100% of front-of-house POS hardware and network connectivity issues during peak weekend hours.",
      "Delivered high-tempo customer support, managing over 80+ digital and telephone orders per shift with a 99% order accuracy rate.",
      "Started as a delivery driver and pizza maker, progressing quickly to front-of-house client relations and POS system assistance."
    ]
  }
];

export const PROJECTS_DATA = [
  {
    title: "Enterprise Sandbox Rebuild",
    description: "Designed and provisioned an isolated lab environment using Oracle VM VirtualBox featuring a Windows Server 2022 Domain Controller and a Windows 11 client workstation to test secure enterprise Active Directory (AD DS) and cloud patch management workflows.",
    challenges: [
      "Infrastructure Setup: Configured static IPv4 address tables within identical private subnets, routing the client's Preferred DNS path directly to the Domain Controller IP (10.0.2.14).",
      "OS Deployment Bypasses: Bypassed network-isolated deployment phases on Windows 11 using advanced command-line interventions (OOBE\\BYPASSNRO) to create secure localized offline workstation accounts.",
      "Cloud Integration: Engineered a dual-homed network architecture with a secondary NAT gateway to safely integrate the Domain Controller into the Action1 Cloud Patch Management Console for remote patch tracking and deployment.",
      "Hardware Optimization: Successfully resolved virtualization overheads and bottlenecks by fine-tuning CPU resource allocations, storage caches on physical SSDs, and enabling graphics hardware acceleration."
    ],
    technologies: ["Windows Server 2022", "Active Directory", "Action1 Cloud Console", "Oracle VM VirtualBox", "Windows 11", "DHCP/DNS", "IPv4 Subnetting"],
    metrics: "100% Patch Deployment & DNS Resolution"
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    title: "Google IT Support Professional Certificate",
    description: "Comprehensive professional certification covering System Administration, IT Security, Operating Systems, and computer networking. Completed in June 2026.",
    date: "June 2026",
    icon: "Award"
  },
  {
    title: "Operational Excellence Award",
    description: "Recognized with an internal innovation award for designing the Super League Automation system at Playpoint Indoor Sports, resulting in a significant reduction in manual data entry work.",
    date: "2025",
    icon: "Zap"
  },
  {
    title: "Community Builder",
    description: "Established, grew, and moderated a digital community utilizing GitHub and open-source networks to share systems configuration guides and troubleshooting documentation.",
    date: "Ongoing",
    icon: "Users"
  }
];

export const REFERENCES_DATA = [
  {
    name: "Sanjeev Malhotra",
    role: "CEO",
    company: "Playpoint Indoor Sports",
    phone: "+61 424153764",
    email: "sanjeev.malhotra@playpoint.com.au"
  },
  {
    name: "Rajesh Khanal",
    role: "CEO",
    company: "Rapid Pro Clean",
    phone: "0432635667",
    email: "rajesh@rapidproclean.com.au"
  },
  {
    name: "Joe Rechichi",
    role: "CEO",
    company: "Crust Pizza",
    phone: "+61 432902845",
    email: "mountlawley@crust.com.au"
  }
];
