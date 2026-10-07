import { RawQuestion } from './cloudQuestions';

export const computingQuestions: RawQuestion[] = [
  // --- WEEK 1: openEuler Basics & CLI Foundations ---
  {
    weekNumber: 1,
    domain: 'openEuler Basics',
    topic: 'openEuler Overview & Architecture',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'What is openEuler and which instruction set architectures does it natively support?',
    explanation: 'openEuler is an open-source operating system distribution backed by the OpenAtom Foundation, natively supporting ARM64 (Kunpeng), x86_64, RISC-V, and LoongArch architectures.',
    options: [
      { key: 'A', text: 'An open-source OS distribution natively supporting ARM64 (Kunpeng), x86_64, and RISC-V', isCorrect: true },
      { key: 'B', text: 'A proprietary Windows clone running exclusively on Intel x86 CPUs', isCorrect: false },
      { key: 'C', text: 'A real-time microcontroller firmware for switches only', isCorrect: false },
      { key: 'D', text: 'A closed-source Android distribution for tablets', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'openEuler Basics',
    topic: 'Vim Editor Modes',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'In the Vim editor on openEuler, which of the following are fundamental working modes? (Select all that apply)',
    explanation: 'Vim has three primary modes: Normal (Command) mode, Insert mode, and Command-Line (Last-Line) mode (plus Visual mode).',
    options: [
      { key: 'A', text: 'Normal / Command Mode', isCorrect: true },
      { key: 'B', text: 'Insert Mode', isCorrect: true },
      { key: 'C', text: 'Command-Line / Last-Line Mode (:)', isCorrect: true },
      { key: 'D', text: 'Kernel Debug Mode', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'openEuler Basics',
    topic: 'Bash Shell & Redirection',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Which Bash operator in openEuler appends standard output (stdout) to an existing file without overwriting its previous contents?',
    explanation: 'The ">>" operator appends stdout to the destination file. Single ">" truncates and overwrites.',
    options: [
      { key: 'A', text: '>', isCorrect: false },
      { key: 'B', text: '>>', isCorrect: true },
      { key: 'C', text: '2>', isCorrect: false },
      { key: 'D', text: '<', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'openEuler Basics',
    topic: 'File Permissions',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'In openEuler, if a file has permissions `-rwxr-xr--`, what numeric octal representation does `chmod` use to set these permissions?',
    explanation: 'rwx = 4+2+1=7; r-x = 4+0+1=5; r-- = 4+0+0=4. Total octal permission is 754.',
    options: [
      { key: 'A', text: '754', isCorrect: true },
      { key: 'B', text: '744', isCorrect: false },
      { key: 'C', text: '654', isCorrect: false },
      { key: 'D', text: '751', isCorrect: false }
    ]
  },

  // --- WEEK 2: openEuler System Management & Optimization ---
  {
    weekNumber: 2,
    domain: 'openEuler Management',
    topic: 'Package Management with DNF',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'What is the default next-generation RPM package manager used in openEuler for resolving dependencies and installing software packages?',
    explanation: 'DNF (Dandified YUM) is the default package manager in openEuler for installing, updating, and removing RPM packages.',
    options: [
      { key: 'A', text: 'apt-get', isCorrect: false },
      { key: 'B', text: 'dnf', isCorrect: true },
      { key: 'C', text: 'pacman', isCorrect: false },
      { key: 'D', text: 'brew', isCorrect: false }
    ]
  },
  {
    weekNumber: 2,
    domain: 'openEuler Management',
    topic: 'Memory Management & Allocation',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'In the Linux/openEuler kernel, what are the differences between `kmalloc` and `vmalloc`? (Select all that apply)',
    explanation: '`kmalloc` allocates physically contiguous and virtually contiguous memory pages. `vmalloc` allocates memory that is virtually contiguous, but the underlying physical pages may not be contiguous.',
    options: [
      { key: 'A', text: '`kmalloc` ensures allocated memory is physically contiguous.', isCorrect: true },
      { key: 'B', text: '`vmalloc` allocates memory that is contiguous in virtual address space, but physical pages may be non-contiguous.', isCorrect: true },
      { key: 'C', text: '`kmalloc` is typically faster and preferred for DMA device drivers.', isCorrect: true },
      { key: 'D', text: '`vmalloc` can only be invoked from user-space applications.', isCorrect: false }
    ]
  },
  {
    weekNumber: 2,
    domain: 'openEuler Management',
    topic: 'Performance Monitoring Tools',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Which performance monitoring command in openEuler provides real-time statistics on disk I/O metrics such as %util, await, r/s, and w/s?',
    explanation: '`iostat -x` from the sysstat package provides detailed disk I/O metrics including average service wait time and percentage utilization (%util).',
    options: [
      { key: 'A', text: 'iostat -x', isCorrect: true },
      { key: 'B', text: 'free -m', isCorrect: false },
      { key: 'C', text: 'netstat -r', isCorrect: false },
      { key: 'D', text: 'uname -a', isCorrect: false }
    ]
  },

  // --- WEEK 3: openGauss Deployment & Database Management ---
  {
    weekNumber: 3,
    domain: 'openGauss Database',
    topic: 'openGauss Architecture & Processes',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Which process in openGauss is the master daemon responsible for accepting client connections, spawning backends, and coordinating database subprocesses?',
    explanation: '`gaussdb` is the core database server process and daemon in openGauss.',
    options: [
      { key: 'A', text: 'gaussdb', isCorrect: true },
      { key: 'B', text: 'mysqld', isCorrect: false },
      { key: 'C', text: 'oracle_listener', isCorrect: false },
      { key: 'D', text: 'mongod', isCorrect: false }
    ]
  },
  {
    weekNumber: 3,
    domain: 'openGauss Database',
    topic: 'Connection Security & pg_hba.conf',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which configuration file controls client authentication rules (IP addresses, databases, users, and authentication methods like sha256) in openGauss? (Select all that apply)',
    explanation: 'Client connection permissions in openGauss are governed by `pg_hba.conf` (Host-Based Authentication), and server listening ports are configured in `postgresql.conf`.',
    options: [
      { key: 'A', text: 'pg_hba.conf', isCorrect: true },
      { key: 'B', text: 'postgresql.conf (for listen_addresses and port)', isCorrect: true },
      { key: 'C', text: 'httpd.conf', isCorrect: false },
      { key: 'D', text: 'resolv.conf', isCorrect: false }
    ]
  },
  {
    weekNumber: 3,
    domain: 'openGauss Database',
    topic: 'Tablespaces in openGauss',
    stage: 'PRELIMINARY',
    questionType: 'TRUE_FALSE',
    questionText: 'In openGauss, a tablespace defines a physical location on the file system where data files (tables and indexes) residing in the database are stored.',
    explanation: 'True. Tablespaces map logical database entities to specific physical storage directories, facilitating I/O performance tuning across storage disks.',
    options: [
      { key: 'A', text: 'True', isCorrect: true },
      { key: 'B', text: 'False', isCorrect: false }
    ]
  },

  // --- WEEK 4: openGauss SQL & Core Security ---
  {
    weekNumber: 4,
    domain: 'openGauss SQL',
    topic: 'SQL Language Classification',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Which category of SQL statements do `CREATE TABLE`, `ALTER TABLE`, and `DROP TABLE` belong to in openGauss?',
    explanation: 'Data Definition Language (DDL) statements define or modify the structure of database objects (tables, views, indexes, schemas).',
    options: [
      { key: 'A', text: 'Data Definition Language (DDL)', isCorrect: true },
      { key: 'B', text: 'Data Manipulation Language (DML)', isCorrect: false },
      { key: 'C', text: 'Data Control Language (DCL)', isCorrect: false },
      { key: 'D', text: 'Transaction Control Language (TCL)', isCorrect: false }
    ]
  },
  {
    weekNumber: 4,
    domain: 'openGauss Security',
    topic: 'Role-Based Access Control (RBAC)',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which SQL statements are used to assign and revoke privileges on database objects to users and roles in openGauss? (Select all that apply)',
    explanation: '`GRANT` confers object or system privileges, and `REVOKE` withdraws privileges from users or roles in openGauss.',
    options: [
      { key: 'A', text: 'GRANT', isCorrect: true },
      { key: 'B', text: 'REVOKE', isCorrect: true },
      { key: 'C', text: 'ASSIGN', isCorrect: false },
      { key: 'D', text: 'AUTHORIZE', isCorrect: false }
    ]
  },

  // --- WEEK 5: Kunpeng DevKit & BoostKit Tuning ---
  {
    weekNumber: 5,
    domain: 'Kunpeng Computing',
    topic: 'Kunpeng 920 & ARM Architecture',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'What type of instruction set architecture does the Huawei Kunpeng 920 processor utilize, and how does its execution differ from traditional x86 processors?',
    explanation: 'Kunpeng 920 is based on the ARMv8.2-A 64-bit architecture, utilizing Reduced Instruction Set Computer (RISC) principles with fixed instruction lengths, high multi-core density, and power efficiency.',
    options: [
      { key: 'A', text: 'ARMv8 64-bit RISC architecture with energy-efficient multi-core scaling', isCorrect: true },
      { key: 'B', text: 'Complex Instruction Set (CISC) x86 microcode emulation', isCorrect: false },
      { key: 'C', text: 'PowerPC 32-bit architecture', isCorrect: false },
      { key: 'D', text: 'MIPS architecture', isCorrect: false }
    ]
  },
  {
    weekNumber: 5,
    domain: 'Kunpeng DevKit',
    topic: 'Porting Advisor Tool',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'What capabilities are provided by the Huawei Kunpeng Porting Advisor tool when migrating software from x86 to Kunpeng platforms? (Select all that apply)',
    explanation: 'Kunpeng Porting Advisor automates source code scanning (identifying x86 intrinsics, inline assembly), provides modification advice, and scans compiled binary packages to verify dependency compatibility.',
    options: [
      { key: 'A', text: 'Source code scanning for x86-specific assembly instructions and compiler intrinsics', isCorrect: true },
      { key: 'B', text: 'Binary dependency analysis to identify x86 dynamic libraries requiring recompilation', isCorrect: true },
      { key: 'C', text: 'Automated guidance and replacement suggestions for ARM64 code', isCorrect: true },
      { key: 'D', text: 'Direct hardware conversion of physical x86 motherboards', isCorrect: false }
    ]
  },
  {
    weekNumber: 5,
    domain: 'Kunpeng BoostKit',
    topic: 'BoostKit Performance Acceleration',
    stage: 'PRELIMINARY',
    questionType: 'TRUE_FALSE',
    questionText: 'Huawei Kunpeng BoostKit offers performance acceleration algorithms, software libraries, and NUMA-aware tuning packages for Big Data, Distributed Storage, and Database workloads.',
    explanation: 'True. BoostKit leverages Kunpeng hardware features (e.g. high core count, multi-channel memory, KAE acceleration engine) to deliver domain-specific speedups.',
    options: [
      { key: 'A', text: 'True', isCorrect: true },
      { key: 'B', text: 'False', isCorrect: false }
    ]
  }
];
