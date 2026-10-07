# Product Requirements Document (PRD)
## Huawei ICT Competition 2026–2027 Practice & Competitive Quiz Platform

---

## 1. Document Overview
* **Product Name:** Huawei ICT Prep & Arena (Competitive Quiz Platform)
* **Version:** 1.0 (Phase 1: Foundation & Preliminary Stage)
* **Status:** Draft / Ready for Review
* **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL, Prisma / Drizzle ORM
* **Target Audience:** Higher-education students in Southern Africa preparing for the **11th Huawei ICT Competition (2026–2027)** across **Network**, **Cloud**, and **Computing** tracks.

---

## 2. Executive Summary & Product Goals

### 2.1 Mission Statement
To provide a dedicated, high-engagement, and competitive learning ecosystem where students rigorously prepare for the **Huawei ICT Competition 2026–2027**, progressing through a 5-week curriculum drill, competing on weekly track leaderboards, and culminating in an official Week 6 **Preliminary Stage Mock Simulation**.

### 2.2 Core Product Objectives
1. **Curriculum Mastery:** Deconstruct the official Huawei 2026–2027 Exam Outlines (Cloud, Computing, Network) into a structured 5-week paced roadmap.
2. **Competitive Drive:** Drive student engagement through locked, once-per-week official competitive quizzes paired with real-time track leaderboards.
3. **Exam Replica:** Replicate exact Huawei exam conditions for the Week 6 Preliminary round (60 questions, 60 minutes, 1000 total points, single-choice, multiple-choice, true/false).
4. **Frictionless Onboarding:** Minimal-barrier registration (Username + 6-digit PIN + UUID device binding) with strict single-track personalization.
5. **Future-Proof Scalability:** Seamless Phase 2 expansion for National (150 questions, 120 minutes) and Regional (4-hour Lab scenarios) rounds.

---

## 3. User Personas & Permissions

| Role | Access Scope | Key Capabilities |
| :--- | :--- | :--- |
| **Student / Contestant** | Strictly locked to their chosen track (*Network*, *Cloud*, or *Computing*) | - Complete registration with Username & 6-digit PIN.<br>- Lock their track upon onboarding.<br>- Access unlimited daily self-paced practice drills for unlocked topics with instant explanations.<br>- Take the official Weekly Competitive Quiz (strict single attempt per week, 30 questions in 30 minutes).<br>- View weekly & cumulative track leaderboards.<br>- Analyze weak areas via diagnostics radar.<br>- Bookmark questions & review incorrect attempts.<br>- Take Week 6 Preliminary Mock Exam (60 questions in 60 minutes, 1000 points). |
| **Admin** | Global access across all tracks via dedicated `/admin` route | - Log in via dedicated `/admin` route secured by `ADMIN_PIN` / `ADMIN_MASTER_KEY` environment variables.<br>- Unlock/lock weekly quizzes across all tracks (Week 1 unlocked by default).<br>- Manage question bank (Create/Read/Update/Delete questions, explanations, tags).<br>- Reset user device session or PIN if requested.<br>- View audit logs, user statistics, and global analytics.<br>- Toggle National & Regional Phase 2 modules. |

---

## 4. User Registration, Authentication & Device Session Architecture

### 4.1 Onboarding Flow
1. **User Registration:**
   - Input: `username` (unique, alphanumeric) and `pin` (exact 6-digit numeric code).
   - The user selects their **Competition Track** (*Network*, *Cloud*, or *Computing*).
   - System creates a new user profile with a unique **UUIDv4**.
   - **Track Immutability:** Once chosen, the user is permanently locked to that track. All navigation, dashboards, and questions for other tracks are completely hidden.
2. **Authentication & Device Binding:**
   - The server hashes the 6-digit PIN using `bcrypt` / `argon2`.
   - On successful registration/login, a cryptographically secure session token is issued and bound to a client-generated `device_uuid` (stored in persistent storage and secure HTTP-Only cookies).
   - **Single Device Session Enforcement:** If the user attempts to log in from a new device, the system prompts them to revoke the existing device session or requires an admin reset, preventing account sharing during competitive quizzes.
3. **Admin Authentication:**
   - Dedicated `/admin` route separate from contestant login.
   - Protected by `ADMIN_MASTER_KEY` / `ADMIN_PIN` configured via environment variables (`.env.local`), bypassing contestant track restrictions and granting global privileges across all tracks.

---

## 5. Curriculum Taxonomy & Question Mapping (Official 2026–2027 Syllabus)

Based on the verified official Huawei ICT Competition outlines, the question bank and topics are structured as follows:

### 5.1 Cloud Track (Weighting: 60% Cloud, 40% AI)
* **Preliminary Standard:** HCIA-Cloud / HCIA-AI level (60 questions, 60 mins, 1000 pts).

| Category | Key Items & Topics | Preliminary Scope |
| :--- | :--- | :---: |
| **Cloud Basics & Operations** | - IT evolution (physical $\rightarrow$ virtualization $\rightarrow$ private/public cloud)<br>- Cloud benefits, IaaS, PaaS, SaaS<br>- Huawei Cloud AZs, Regions, IAM, billing modes | Yes |
| **Compute Services** | - Elastic Cloud Server (ECS)<br>- Bare Metal Server (BMS)<br>- Image Management Service (IMS)<br>- Auto Scaling (AS) | Yes |
| **Networking Services** | - Virtual Private Cloud (VPC), Security Groups, Network ACL<br>- Elastic IP (EIP), Elastic Load Balance (ELB)<br>- Virtual Private Network (VPN), NAT Gateway | Yes |
| **Cloud Storage Services** | - Object Storage Service (OBS)<br>- Elastic Volume Service (EVS)<br>- Scalable File Service (SFS) | Yes |
| **Database Services** | - Relational Database Service (RDS)<br>- Non-relational database service GeminiDB | Yes |
| **Cloud Native Applications** | - Cloud Native Architecture & evolution<br>- Containers (Docker), Kubernetes (K8s)<br>- Cloud Container Engine (CCE), Cloud Container Instance (CCI)<br>- Software Repository for Container (SWR), Application Service Mesh (ASM) | Yes |
| **AI Basics & Concepts** | - AI fundamentals, history, and applications<br>- Computer Vision (CV), NLP, Speech Recognition (ASR)<br>- LLM fundamentals, RAG, AI Agents | Yes |
| **Huawei AI Platform** | - ModelArts full-stack architecture & workflows<br>- Development environment, data management, training, inference, and AI Gallery | Yes |

---

### 5.2 Computing Track (Weighting: 50% openEuler, 30% openGauss, 20% Kunpeng)
* **Preliminary Standard:** HCIA-openEuler, HCIA-openGauss, HCIA-Kunpeng level (60 questions, 60 mins, 1000 pts).

| Category | Key Items & Topics | Preliminary Scope |
| :--- | :--- | :---: |
| **openEuler Basics & Core** | - openEuler history, features, Kunpeng processor architecture<br>- Installation, login, Bash shell usage & common operations<br>- Vim editor fundamentals, Shell scripting & programming | Yes |
| **openEuler System Management** | - Memory management (paging, MMU, address translation, malloc/kmalloc)<br>- Process management (address space, system calls, scheduling, IPC)<br>- Users, groups, and file permissions (rwx)<br>- Package management (DNF, source compilation), systemd<br>- File systems, mounting, Logical Volume Management (LVM)<br>- Performance monitoring (CPU, memory, disk I/O, network) | Yes |
| **openEuler Community** | - Community organizations, contribution, code release | Yes |
| **openGauss Database** | - openGauss architecture (logical/physical structure) & components<br>- Single-instance installation, deployment, and uninstallation<br>- Tablespaces, users, roles, system catalogs & views<br>- Data import/export, pg_hba/SSL remote access, terminal tools<br>- SQL Basics: DDL, DML, DCL, functions, operators, data types<br>- Security: connection control, user management, account policies | Yes |
| **Kunpeng Architecture & Porting** | - Computer system architecture differences (ARM vs. x86)<br>- Kunpeng hardware (processors, motherboards, servers)<br>- Software porting workflow, policies, C/C++ porting & troubleshooting<br>- Fortran and Rust porting basics<br>- Kunpeng Porting Advisor installation & usage<br>- Performance profilers (Java Profiler, System Profiler, Tuning Assistant)<br>- BoostKit tuning methodology (CPU, memory, I/O, network, Java) | Yes |

---

### 5.3 Network Track (Weighting: 40% Datacom, 20% DCN, 20% Security, 20% WLAN)
* **Preliminary Standard:** HCIA-Datacom, HCIA-Security, HCIA-WLAN level (60 questions, 60 mins, 1000 pts).

| Category | Key Items & Topics | Preliminary Scope |
| :--- | :--- | :---: |
| **Datacom Basics** | - Huawei VRP operating system & command line<br>- TCP/IP protocol suite (TCP, UDP, ARP, IP, ICMP, NAT, Telnet, FTP, DHCP) | Yes |
| **Switching Technologies** | - Ethernet switching & MAC address learning process<br>- VLAN, VLANIF, MUX VLAN, VLAN aggregation<br>- Link aggregation (Eth-Trunk)<br>- iStack and CSS (Cluster Switch System)<br>- Spanning Tree Protocol (STP) loop protection | Yes |
| **Routing Technologies** | - IPv4 and IPv6 static routing<br>- OSPF basic principles, neighbor states, LSAs, and configurations<br>- Access Control Lists (ACL: Basic & Advanced) | Yes |
| **IPv6 Technologies** | - IPv6 address structure & notation<br>- ICMPv6, Stateless Address Autoconfiguration (SLAAC), DHCPv6<br>- IPv6 Enhanced concepts | Yes |
| **WAN & Security Basics** | - WAN basics: PPP (PAP/CHAP) and PPPoE<br>- AAA authentication, authorization, and accounting<br>- Information security fundamentals, common threats & defense<br>- Firewall fundamentals: security zones, security policies, NAT, hot standby | Yes |
| **VPN Basics** | - Encryption, hashing, PKI digital certificates<br>- GRE, IPsec VPN (IKEv1/IKEv2), and SSL VPN basics | Yes |
| **DCN Fundamentals** | - M-LAG, VXLAN basics, EVPN basics<br>- Server and network virtualization, storage fundamentals<br>- Cloud-network integration and DCN planning overview | Yes |
| **WLAN Fundamentals** | - CAPWAP tunnel establishment, key packets, STA online process<br>- WLAN architectures: Fat AP, Fit AP + AC, Agile Distributed, Mesh<br>- WLAN security: WEP, WPA/WPA2-PSK, WPA/WPA2-802.1X, Blacklist/Whitelist<br>- WLAN roaming fundamentals & basic network planning/troubleshooting | Yes |

---

## 6. 5-Week Curriculum & Progression Schedule

To prepare students systematically, each track is mapped into 5 focused weekly modules followed by the Week 6 Preliminary Mock Simulation:

### 6.1 Weekly Topic Breakdown Matrix

| Week | Cloud Track | Computing Track | Network Track |
| :---: | :--- | :--- | :--- |
| **Week 1** *(Unlocked by default)* | **Cloud Basics & Compute Infrastructure:** Cloud Evolution, IaaS/PaaS/SaaS, Huawei Cloud IAM/Regions/AZs, ECS, BMS, IMS, Auto Scaling. | **openEuler Basics & CLI Foundations:** openEuler overview, Kunpeng architecture, installation, Bash CLI, Vim editor, Shell scripting. | **Datacom Basics & Layer 2 Switching:** VRP commands, TCP/IP stack, Ethernet switching, VLAN, VLANIF, Eth-Trunk, iStack/CSS, STP. |
| **Week 2** *(Admin Unlocked)* | **Cloud Network & Storage Services:** VPC, Security Groups, ACL, EIP, ELB, VPN, NAT Gateway, OBS, EVS, SFS. | **openEuler Management & Optimization:** Memory paging/allocation, process scheduling/IPC, users/groups, DNF/systemd, LVM, performance monitoring tools. | **IP Routing, OSPF & IPv6 Foundations:** Static routing, OSPF principles & configuration, ACLs, IPv6 address architecture, SLAAC, DHCPv6, IPv6 Enhanced. |
| **Week 3** *(Admin Unlocked)* | **Cloud Databases & Cloud Native:** RDS, GeminiDB, Cloud Native concepts, Containers, Kubernetes (K8s), CCE, CCI, SWR, ASM. | **openGauss Deployment & Database Management:** openGauss architecture, single-instance deployment, tablespaces, user permissions, pg_hba/SSL remote access, terminal tools. | **WAN Technologies, AAA & Network Security:** WAN PPP/PPPoE, AAA, information security basics, firewall architecture, security zones, packet filtering policies. |
| **Week 4** *(Admin Unlocked)* | **AI Foundations & Large Model Concepts:** AI history & applications, Computer Vision, NLP, ASR, LLM principles, RAG, AI Agents. | **openGauss SQL & Core Security:** SQL syntax (DDL, DML, DCL), data types, functions, user management, connection control, basic query optimization. | **VPN Technologies & DCN Fundamentals:** PKI, IPsec VPN, SSL VPN, basic threat defense, DCN fundamentals (M-LAG, VXLAN, EVPN basics, virtualization). |
| **Week 5** *(Admin Unlocked)* | **Huawei AI Platform (ModelArts):** ModelArts all-scenario architecture, data management, model training, deployment, inference, AI Gallery. | **Kunpeng DevKit & BoostKit Tuning:** ARM architecture, software porting principles, C/C++ porting, Porting Advisor, profilers, BoostKit tuning methods. | **WLAN Services, Security & Planning:** CAPWAP tunnel, STA online flow, Fat/Fit AP architectures, WPA2/802.1X security, roaming, basic planning & troubleshooting. |
| **Week 6** *(Admin Unlocked)* | **Full Preliminary Mock Simulation:** 60 questions, 60 minutes, 1000 pts (60% Cloud, 40% AI). | **Full Preliminary Mock Simulation:** 60 questions, 60 minutes, 1000 pts (50% openEuler, 30% openGauss, 20% Kunpeng). | **Full Preliminary Mock Simulation:** 60 questions, 60 minutes, 1000 pts (40% Datacom, 20% DCN, 20% Security, 20% WLAN). |

---

## 7. Core Functional Features & Modes

### 7.1 Mode 1: Weekly Competitive Quiz (The Arena)
* **Access Rules:**
  - Unlocked by Admin per schedule (Week 1 unlocked upon registration).
  - **Strict Single Attempt:** A student can only submit the weekly quiz **once**.
  - **Timed Countdown & Format:** Exactly 30 questions in 30 minutes.
  - **No Pausing:** Exiting the browser or closing the tab leaves the timer running.
* **Scoring & Leaderboard Engine:**
  - Total Points: Sum of correct answers.
  - **Tie-Breaker Metric:** Submission time elapsed (e.g., Student A and Student B both score 900 points, but Student A finished in 18m 30s vs. Student B's 24m 10s $\rightarrow$ Student A ranks higher).
  - **Leaderboards Display:**
    1. **Weekly Leaderboard:** Ranks within that week's unlocked module.
    2. **Cumulative Season Leaderboard:** Sum of all completed weekly official quizzes.

### 7.2 Mode 2: Self-Paced Practice Drills (Daily Training)
* Available anytime for unlocked weeks.
* **Immediate Feedback:** Instant reveal of the correct answer, in-depth explanation, and Huawei documentation reference upon answering each question.
* **Filters:** Drill by Topic (e.g., "Just OSPF", "Just VPC", "Just openEuler Permissions").
* Unlimited attempts (does **not** impact official weekly leaderboard).

### 7.3 Mode 3: Week 6 Preliminary Mock Exam Simulation
* Exact replica of Huawei Preliminary Competition rules:
  - **Questions:** 60 questions.
  - **Duration:** 60 minutes strict countdown.
  - **Question Mix:** True/False, Single Choice, Multiple Choice.
  - **Total Score:** 1,000 points (Passing score benchmark: 600 points).
  - **Weighted Distribution:** Automatically drawn from the question bank matching official track percentages.

### 7.4 Mode 4: Weak Area Diagnostic & Mistake Notebook
* **Knowledge Radar:** Visual proficiency chart broken down by domain (e.g., "Datacom: 88%", "DCN: 45%", "WLAN: 72%").
* **Mistake Notebook:** All questions answered incorrectly during practice or weekly quizzes are automatically categorized here for targeted review and retrying.
* **Bookmark System:** Users can star challenging questions during review for future drills.

---

## 8. Question Bank Data Format & Schema

### 8.1 Supported Question Types
1. **Single-Choice (`SINGLE_CHOICE`):** Exactly 1 correct option among 4 choices.
2. **Multiple-Choice (`MULTIPLE_CHOICE`):** 2 or more correct options among 4–5 choices.
   - *Scoring Rule:* Full match required (Huawei official competition standard: selecting any incorrect option or missing a correct option yields 0 points for that question).
3. **True / False (`TRUE_FALSE`):** Binary assessment.

### 8.2 Question Attributes
* `id`: UUID
* `track`: `NETWORK` | `CLOUD` | `COMPUTING`
* `domain`: e.g., `Datacom`, `WLAN`, `AI`, `openGauss`
* `topic`: e.g., `OSPFv2`, `VPC`, `ModelArts`
* `week_number`: 1–5
* `difficulty`: `PRELIMINARY` (HCIA) | `NATIONAL` (HCIP) | `REGIONAL` (HCIE)
* `question_text`: Markdown-supported text (supports topology diagrams/code snippets)
* `options`: Array of options `{ id: "A", text: "...", is_correct: boolean }`
* `explanation`: Detailed technical explanation with Huawei documentation citations

---

## 9. Database Architecture (PostgreSQL Schema)

```sql
-- User Profile & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    pin_hash VARCHAR(255) NOT NULL,
    track VARCHAR(20) NOT NULL CHECK (track IN ('NETWORK', 'CLOUD', 'COMPUTING')),
    role VARCHAR(20) DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Device Session Binding
CREATE TABLE device_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_uuid VARCHAR(100) NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Tracks & Weeks
CREATE TABLE track_weeks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track VARCHAR(20) NOT NULL,
    week_number INT NOT NULL CHECK (week_number BETWEEN 1 AND 6),
    title VARCHAR(150) NOT NULL,
    is_unlocked BOOLEAN DEFAULT FALSE,
    unlocked_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(track, week_number)
);

-- Question Bank
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track VARCHAR(20) NOT NULL,
    week_number INT NOT NULL,
    domain VARCHAR(50) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    stage VARCHAR(20) DEFAULT 'PRELIMINARY',
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE')),
    question_text TEXT NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Question Options
CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    option_key VARCHAR(5) NOT NULL, -- 'A', 'B', 'C', 'D'
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL
);

-- Official Weekly Quiz & Mock Attempts (Single official attempt for leaderboard)
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    track VARCHAR(20) NOT NULL,
    week_number INT NOT NULL,
    attempt_type VARCHAR(20) NOT NULL CHECK (attempt_type IN ('WEEKLY_ARENA', 'PRACTICE_DRILL', 'MOCK_EXAM')),
    score INT NOT NULL,
    total_possible_score INT NOT NULL,
    time_taken_seconds INT NOT NULL,
    is_official_submission BOOLEAN DEFAULT TRUE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Answers / Mistake Tracking
CREATE TABLE user_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    selected_option_keys TEXT[] NOT NULL,
    is_correct BOOLEAN NOT NULL
);

-- Question Bookmarks
CREATE TABLE bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, question_id)
);
```

---

## 10. Technical Architecture & Next.js Implementation

* **Framework:** Next.js 14+ (App Router)
* **Frontend:**
  - Tailwind CSS + Shadcn UI components
  - Lucide React icons
  - Canvas-confetti for quiz completion animations
  - KaTeX / Markdown rendering for technical equations and config snippets
* **Backend:**
  - Next.js Route Handlers / Server Actions for zero-latency operations
  - PostgreSQL hosted on Supabase / Neon / Local Docker
  - Prisma ORM or Drizzle ORM with schema migrations
* **Security & Anti-Abuse:**
  - Rate limiting on API routes
  - Device session token verification on every request
  - Question randomization and option shuffling to discourage rote memorization

---

## 11. Phased Roadmap

| Phase | Milestone | Scope |
| :---: | :--- | :--- |
| **Phase 1 (Current)** | **Foundation & Preliminary Arena** | - Auth with Username + 6-digit PIN + Device Session UUID.<br>- Track Selection & strict personalized isolation.<br>- 5-Week Weekly Arena with Admin unlock mechanism.<br>- Week 6 Preliminary Mock Exam Simulator.<br>- Weekly & Cumulative Leaderboards.<br>- Daily Self-Paced Practice Drills & Mistake Notebook. |
| **Phase 2 (Update 1)** | **National Round Expansion** | - National Stage Question Bank (150 questions, 120 minutes, HCIP level).<br>- Advanced topics (SRv6, BGP, ModelArts Large Models, openEuler Clusters, etc.). |
| **Phase 3 (Update 2)** | **Regional Round & Team Labs** | - Comprehensive Lab Simulator & Scenario-based questions (HCIE level).<br>- Team creation & 3-person team scoring mode matching official Regional rules. |

---

## 12. Verification & Next Steps
1. Review the PRD structure and weekly topic breakdown.
2. Confirm the exact behavior for self-paced practice vs. weekly official arena.
3. Proceed with project scaffolding (Next.js + PostgreSQL database setup).
