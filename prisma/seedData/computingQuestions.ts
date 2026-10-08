import { RawQuestion } from './cloudQuestions';

export const computingQuestions: RawQuestion[] = [
  {
    "weekNumber": 1,
    "domain": "openEuler Fundamentals",
    "topic": "openEuler OS Overview",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What type of operating system is openEuler, and by which community was it open-sourced to build a unified digital infrastructure OS?",
    "explanation": "openEuler is an open-source Linux distribution initially developed by Huawei and open-sourced to the OpenAtom Foundation, supporting diverse compute architectures including ARM (Kunpeng), x86, RISC-V, and LoongArch.",
    "options": [
      {
        "key": "A",
        "text": "A proprietary Unix derivative for mainframes only",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "An open-source Linux operating system supporting multiple compute architectures",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "A real-time microkernel OS for microcontrollers only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A mobile smartphone operating system",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "openEuler Fundamentals",
    "topic": "Release Versioning",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openEuler's release lifecycle, how often are Long Term Support (LTS) versions released, and how many years of community lifecycle support do they receive?",
    "explanation": "openEuler releases an LTS version every 2 years, with community maintenance and security updates provided for 5 years.",
    "options": [
      {
        "key": "A",
        "text": "Released every 6 months; 1 year of support",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Released every 2 years; 5 years of community maintenance",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Released every 10 years; 20 years of support",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Released monthly with rolling release without LTS",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Kunpeng Processor Architecture",
    "topic": "ARMv8-A Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "The Huawei Kunpeng 920 processor is built on which processor architecture instruction set?",
    "explanation": "Kunpeng 920 is a 64-bit high-performance server processor designed on the ARMv8.2-A RISC architecture.",
    "options": [
      {
        "key": "A",
        "text": "x86-64 CISC Architecture",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "ARMv8-A 64-bit RISC Architecture",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "MIPS64 Release 6",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "SPARC V9 Architecture",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Kunpeng Processor Architecture",
    "topic": "NUMA Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In multi-socket Kunpeng servers, what does the Non-Uniform Memory Access (NUMA) architecture mean for CPU core memory latency?",
    "explanation": "In NUMA, memory access time depends on memory locality: accessing local memory attached to the CPU's own NUMA node is significantly faster than accessing remote memory across interconnects.",
    "options": [
      {
        "key": "A",
        "text": "Memory access latency is strictly identical for every CPU core across all sockets",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Accessing local memory on the same node is faster than accessing remote node memory",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "CPUs do not use RAM, relying solely on L1 cache",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "NUMA disables all multi-threading",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "openEuler Installation",
    "topic": "Disk Partitioning",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which disk partitions are mandatory or standardly recommended when installing openEuler on UEFI-based server hardware? (Select all that apply)",
    "explanation": "UEFI installations require `/boot/efi` (FAT32), `/boot` (for kernel images), `/` (root file system), and typically a `swap` partition.",
    "options": [
      {
        "key": "A",
        "text": "/boot/efi partition (FAT32 for UEFI firmware)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "/boot partition (for kernel and initramfs)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "/ (root file system)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "swap partition",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Bash CLI Foundations",
    "topic": "Environment Variables",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openEuler Bash shell, which environment variable defines the list of directory paths where the shell searches for executable binary commands?",
    "explanation": "The PATH environment variable contains a colon-separated list of directories searched by the shell when executing commands.",
    "options": [
      {
        "key": "A",
        "text": "$HOME",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$PATH",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$SHELL",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "$LD_LIBRARY_PATH",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Bash CLI Foundations",
    "topic": "I/O Redirection",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which redirection operator in Bash appends standard output (stdout) to an existing file without overwriting the previous contents?",
    "explanation": "`>` overwrites the destination file, while `>>` appends stdout to the end of the file.",
    "options": [
      {
        "key": "A",
        "text": ">",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": ">>",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "<",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "2>",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Bash CLI Foundations",
    "topic": "Standard Error Redirection",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openEuler CLI, how do you redirect standard error (stderr, file descriptor 2) to `/dev/null` while keeping standard output on the terminal?",
    "explanation": "`2>/dev/null` redirects file descriptor 2 (stderr) to the null device, discarding error messages while stdout remains visible.",
    "options": [
      {
        "key": "A",
        "text": "1>/dev/null",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2>/dev/null",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "&>/dev/null",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "< /dev/null",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Bash CLI Foundations",
    "topic": "Pipes",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does the pipe operator `|` do in Linux command lines?",
    "explanation": "A pipe connects the standard output (stdout) of the preceding command to the standard input (stdin) of the following command.",
    "options": [
      {
        "key": "A",
        "text": "Connects stdout of the left command to stdin of the right command",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Runs both commands in reverse alphabetical order",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Deletes the output file if errors occur",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Compresses output with gzip",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Bash CLI Foundations",
    "topic": "Exit Status ($?)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Linux Bash shell, what does an exit status value of `0` returned in the special variable `$?` indicate?",
    "explanation": "In Unix/Linux, an exit code of 0 indicates that the previous command executed successfully without errors. Any non-zero value (1\u2013255) indicates a failure or error code.",
    "options": [
      {
        "key": "A",
        "text": "The command encountered a fatal segmentation fault",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "The command executed successfully without errors",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "The command was killed by SIGKILL signal 9",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The command is still running in background",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "File Management Utilities",
    "topic": "Hard Links vs Soft Links",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What happens to a Hard Link when the original file it points to is deleted (`rm original.txt`)?",
    "explanation": "A hard link shares the exact same inode and data blocks as the original file. Deleting the original file decrements the inode link count, but the hard link retains full access to the data until the link count reaches 0.",
    "options": [
      {
        "key": "A",
        "text": "The hard link becomes broken and inaccessible",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "The hard link continues to access the file data intact",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "The entire file system is automatically remounted read-only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The operating system crashes",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "File Management Utilities",
    "topic": "Symbolic Link Creation",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command creates a symbolic (soft) link named `link_config` pointing to `/etc/my.cnf`?",
    "explanation": "`ln -s <target> <linkname>` creates a symbolic link. Running `ln -s /etc/my.cnf link_config` creates the soft link.",
    "options": [
      {
        "key": "A",
        "text": "ln -s /etc/my.cnf link_config",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ln /etc/my.cnf link_config",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "link /etc/my.cnf -s link_config",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "cp -l /etc/my.cnf link_config",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "File Management Utilities",
    "topic": "tar Archive Tool",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which `tar` command parameters are used to create a gzip-compressed archive named `backup.tar.gz` from the `/data` directory?",
    "explanation": "`tar -czvf backup.tar.gz /data` uses: `c` (create), `z` (filter through gzip), `v` (verbose), `f` (specify archive filename).",
    "options": [
      {
        "key": "A",
        "text": "tar -czvf backup.tar.gz /data",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "tar -xzvf backup.tar.gz /data",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "tar -tzvf backup.tar.gz /data",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "tar -djvf backup.tar.gz /data",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "File Management Utilities",
    "topic": "grep & Regular Expressions",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command searches recursively for the string 'ERROR' across all files under `/var/log` while ignoring letter case?",
    "explanation": "`grep -ri 'ERROR' /var/log` uses `-r` (recursive) and `-i` (case-insensitive).",
    "options": [
      {
        "key": "A",
        "text": "grep -ri 'ERROR' /var/log",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "find /var/log -name 'ERROR'",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "cat /var/log | search 'ERROR'",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "sed -n 'ERROR' /var/log",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "File Management Utilities",
    "topic": "find Command",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command searches the entire file system for files larger than 100 Megabytes ending with `.log`?",
    "explanation": "`find / -name \"*.log\" -size +100M` searches by filename pattern and file size greater than 100MB.",
    "options": [
      {
        "key": "A",
        "text": "find / -name \"*.log\" -size +100M",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ls -lh / | grep 100M",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "locate --size > 100M *.log",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "whereis --large *.log",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Text Editing in openEuler",
    "topic": "Vim Editor Modes",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When opening a file in the Vim editor, which mode does Vim start in by default?",
    "explanation": "Vim starts in Normal (Command) mode by default, where keyboard keys execute navigation, yank, delete, and mode switching commands.",
    "options": [
      {
        "key": "A",
        "text": "Insert Mode",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Normal (Command) Mode",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Visual Block Mode",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Ex Command-Line Mode",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Text Editing in openEuler",
    "topic": "Vim Keybindings",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Vim Normal mode, which shortcut jumps the cursor directly to the very last line of the document?",
    "explanation": "In Normal mode, `G` (uppercase) jumps to the last line of the file, while `gg` jumps to the first line.",
    "options": [
      {
        "key": "A",
        "text": "gg",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "G",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "$",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "0",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Text Editing in openEuler",
    "topic": "Vim Search & Replace",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Vim command-line string replaces all occurrences of the word 'old' with 'new' globally throughout the entire open file?",
    "explanation": "`:%s/old/new/g` applies a substitute (`s`) globally across all lines (`%`) and all matches per line (`g`).",
    "options": [
      {
        "key": "A",
        "text": ":s/old/new",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": ":%s/old/new/g",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": ":replace old new all",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "/old/new/all",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Text Editing in openEuler",
    "topic": "Vim Save & Exit",
    "questionType": "TRUE_FALSE",
    "questionText": "In Vim Command-line mode, typing `:wq` or `:x` saves modifications to the file and exits the editor.",
    "explanation": "True. `:wq` (write and quit) and `:x` write changes and quit Vim.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Text Editing in openEuler",
    "topic": "Vim Line Deletion",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Vim Normal mode, which command deletes (cuts) 5 consecutive lines starting from the current cursor line?",
    "explanation": "In Normal mode, `dd` deletes one line, and `5dd` deletes 5 lines into the default register.",
    "options": [
      {
        "key": "A",
        "text": "5dd",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "dd5",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": ":del 5",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "d5w",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Shell Scripting",
    "topic": "Shebang Header",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the purpose of the shebang line `#!/bin/bash` placed on the very first line of a Shell script?",
    "explanation": "The shebang (`#!`) informs the Linux kernel program loader which interpreter executable (`/bin/bash`) should parse and run the script file.",
    "options": [
      {
        "key": "A",
        "text": "It is a standard comment ignored by the kernel",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "It instructs the kernel which interpreter should execute the script",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "It compiles the script into ARM machine code",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "It sets the file permissions to chmod 777",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Shell Scripting",
    "topic": "Positional Parameters",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In a Bash script, which special variable holds the total count of positional arguments passed to the script?",
    "explanation": "`$#` stores the total number of command-line arguments passed to the script or function.",
    "options": [
      {
        "key": "A",
        "text": "$*",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "$@",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "$#",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "$0",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Shell Scripting",
    "topic": "Loop Constructs",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Bash loop syntax iterates over a sequence of numbers from 1 to 10 in openEuler?",
    "explanation": "`for i in {1..10}; do ... done` uses brace expansion to iterate over the integer sequence 1 through 10.",
    "options": [
      {
        "key": "A",
        "text": "for i in {1..10}; do echo $i; done",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "loop i from 1 to 10 { echo $i }",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "repeat(10) [ echo $i ]",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "while [ i < 10 ] => echo $i",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Shell Scripting",
    "topic": "Conditional Statements",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Bash conditional expressions, which test operator checks if a file exists and is a regular file (not a directory or socket)?",
    "explanation": "`[ -f file ]` tests if `file` exists and is a regular file. `[ -d file ]` tests if it is a directory.",
    "options": [
      {
        "key": "A",
        "text": "-d",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "-f",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "-e",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "-r",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Shell Scripting",
    "topic": "String Comparison",
    "questionType": "TRUE_FALSE",
    "questionText": "In Bash `[ -z \"$var\" ]` evaluates to true if the variable `$var` is empty (has a string length of zero).",
    "explanation": "True. `-z` tests for zero string length, while `-n` tests for non-zero string length.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Bash Job Control",
    "topic": "Background Execution",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How can an administrator execute a long-running script `task.sh` in the background and ensure it continues running even if the SSH terminal session disconnects?",
    "explanation": "`nohup ./task.sh &` runs the process in the background and ignores the SIGHUP (hangup) signal sent when the terminal terminates.",
    "options": [
      {
        "key": "A",
        "text": "nohup ./task.sh &",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "./task.sh --pause",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "kill -9 ./task.sh",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "bg ./task.sh --disconnect",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "openEuler CLI",
    "topic": "File Permissions (chmod)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which numeric mode in `chmod` sets permissions to Read/Write/Execute for owner, Read/Execute for group, and Read only for others (`rwxr-xr--`)?",
    "explanation": "rwx = 7, r-x = 5, r-- = 4. Therefore `rwxr-xr--` corresponds to numeric octal mode 754.",
    "options": [
      {
        "key": "A",
        "text": "777",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "754",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "644",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "755",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "openEuler CLI",
    "topic": "Special Permissions (SUID)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does the SetUID (SUID, octal 4000) permission bit on an executable binary file (e.g., `/bin/passwd`) do when executed by a regular unprivileged user?",
    "explanation": "SUID causes the program to execute with the effective privileges of the file owner (e.g., root) rather than the calling user.",
    "options": [
      {
        "key": "A",
        "text": "It runs the program with the permissions of the file owner (e.g., root)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "It deletes the file immediately after execution",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "It encrypts the process memory in hardware",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "It restricts execution to Sundays only",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "openEuler CLI",
    "topic": "Command Aliases",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openEuler Bash, which command defines a shortcut alias `ll` that executes `ls -la --color=auto`?",
    "explanation": "`alias ll='ls -la --color=auto'` creates a temporary shell alias. Adding it to `~/.bashrc` makes it persistent.",
    "options": [
      {
        "key": "A",
        "text": "alias ll='ls -la --color=auto'",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "set ll = 'ls -la'",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "export ll='ls -la'",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "link ll 'ls -la'",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "openEuler Community",
    "topic": "Community SIGs",
    "questionType": "TRUE_FALSE",
    "questionText": "In the openEuler community, technical domains, software packages, and kernel sub-systems are maintained by Special Interest Groups (SIGs).",
    "explanation": "True. The openEuler community organizes collaboration and code governance through specialized SIG groups (e.g., SIG-Kernel, SIG-openGauss, SIG-Security).",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Memory Management",
    "topic": "Virtual Memory & Paging",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On 64-bit openEuler running on Kunpeng ARMv8-A architecture, what is the default standard virtual memory page size configured by the Linux kernel?",
    "explanation": "While ARMv8-A supports 4KB, 16KB, and 64KB page sizes, openEuler standard enterprise kernel builds default to 4KB (or 64KB on high-throughput server builds) page tables with 4-level translation.",
    "options": [
      {
        "key": "A",
        "text": "4 KB (or 64 KB on specialized server builds)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1 MB strictly",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "512 Bytes",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "128 KB strictly",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Memory Management",
    "topic": "Kernel Allocators (Buddy & SLUB)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which kernel memory allocation subsystem in openEuler manages physical page frames in power-of-two page blocks to minimize external fragmentation?",
    "explanation": "The Buddy System allocator manages physical page allocation in power-of-two contiguous page frames ($2^n$), while the SLUB/SLAB allocator handles smaller object caches on top of it.",
    "options": [
      {
        "key": "A",
        "text": "The Buddy System Allocator",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "glibc malloc heap",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Virtual File System (VFS)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Swap daemon thread",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Memory Management",
    "topic": "kmalloc vs vmalloc",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Linux kernel development on openEuler, what is the key difference between `kmalloc()` and `vmalloc()`?",
    "explanation": "`kmalloc()` allocates memory that is physically contiguous in RAM (essential for DMA hardware), whereas `vmalloc()` allocates memory that is contiguous in virtual address space but may be fragmented physically.",
    "options": [
      {
        "key": "A",
        "text": "kmalloc() allocates physically contiguous memory; vmalloc() allocates virtually contiguous memory",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "kmalloc() is for user applications; vmalloc() for kernel drivers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Both allocators allocate from the exact same swap partition",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "vmalloc() is limited to 128 bytes total",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Memory Monitoring",
    "topic": "vmstat & free",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When analyzing memory usage on openEuler with `free -m`, which field represents memory used by the Linux kernel to cache disk block contents to speed up read I/O?",
    "explanation": "The `buff/cache` field represents page cache and slab memory used to buffer disk writes and cache disk reads.",
    "options": [
      {
        "key": "A",
        "text": "used",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "buff/cache",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "shared",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "swap",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Process Management",
    "topic": "Process States",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Linux process state in `ps` output indicates a process that has finished execution but whose exit status has not yet been collected by its parent process?",
    "explanation": "State 'Z' (Zombie) represents a terminated process whose entry remains in the process table until the parent process calls `wait()` / `waitpid()`.",
    "options": [
      {
        "key": "A",
        "text": "D (Uninterruptible Sleep)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Z (Zombie)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "R (Running/Runnable)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "T (Stopped)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Process Management",
    "topic": "Kill Signals",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which signal number is sent by `kill -9 <PID>` on openEuler, and can it be caught or ignored by the target process?",
    "explanation": "Signal 9 is SIGKILL, an uncatchable and unignorable signal that forces the Linux kernel to immediately terminate the process.",
    "options": [
      {
        "key": "A",
        "text": "SIGTERM (15); can be caught",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "SIGKILL (9); cannot be caught or ignored",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "SIGHUP (1); can be ignored",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "SIGINT (2); can be caught",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Process Management",
    "topic": "Process Priority & Nice",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the numerical range of the `nice` value in openEuler, and how does a lower nice value (e.g., -20) affect CPU scheduling priority?",
    "explanation": "Nice values range from -20 to +19. A lower nice value (negative) means higher CPU scheduling priority (less nice to other processes).",
    "options": [
      {
        "key": "A",
        "text": "-20 to 19; lower values grant higher CPU scheduling priority",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "0 to 100; higher values grant higher priority",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1 to 10; lower values mean paused process",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "-100 to 100; zero is reserved for root",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Process Scheduling",
    "topic": "Completely Fair Scheduler (CFS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which red-black tree data structure metric does the Linux Completely Fair Scheduler (CFS) use to track and balance CPU execution time among runnable processes?",
    "explanation": "CFS tracks `vruntime` (virtual runtime). The task with the smallest vruntime sits on the leftmost node of the red-black tree and is picked next for CPU execution.",
    "options": [
      {
        "key": "A",
        "text": "Virtual Runtime (vruntime)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Total bytes read from disk",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "PID integer magnitude",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Network packet sequence number",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Inter-Process Communication (IPC)",
    "topic": "IPC Mechanisms",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following are standard Inter-Process Communication (IPC) mechanisms supported on openEuler? (Select all that apply)",
    "explanation": "Linux IPC mechanisms include Anonymous Pipes, Named Pipes (FIFOs), Shared Memory, Message Queues, Semaphores, and Unix Domain Sockets.",
    "options": [
      {
        "key": "A",
        "text": "Shared Memory (shmget / mmap)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Named Pipes (FIFOs)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Unix Domain Sockets",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "POSIX Message Queues",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Inter-Process Communication (IPC)",
    "topic": "Shared Memory Performance",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is Shared Memory considered the fastest inter-process communication mechanism in Linux systems?",
    "explanation": "Shared memory maps the same physical memory pages into the address spaces of multiple processes, allowing data sharing without copying data between user space and kernel space.",
    "options": [
      {
        "key": "A",
        "text": "Because it avoids data copying between user space and kernel space",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Because it encrypts data with AES in hardware",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Because it runs over optical network interfaces",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Because it does not require process synchronization",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "User & Account Security",
    "topic": "/etc/shadow File",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openEuler, which file stores encrypted user password hashes and password aging policies, readable only by the root user?",
    "explanation": "`/etc/shadow` stores encrypted password hashes (e.g., SHA-512) and password expiration parameters, secured with strict permissions (0000 or 0600).",
    "options": [
      {
        "key": "A",
        "text": "/etc/passwd",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "/etc/shadow",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "/etc/group",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "/etc/security/limits.conf",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "File System Access Control",
    "topic": "Access Control Lists (ACL)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command is used on openEuler to grant read and write permissions on `/data/report.txt` specifically to user `alex` using POSIX ACLs?",
    "explanation": "`setfacl -m u:alex:rw /data/report.txt` modifies the ACL to grant specific permissions to user `alex` without altering standard group ownership.",
    "options": [
      {
        "key": "A",
        "text": "setfacl -m u:alex:rw /data/report.txt",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "chmod alex+rw /data/report.txt",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "chown alex /data/report.txt",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "getfacl -w alex /data/report.txt",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Package Management",
    "topic": "DNF Package Manager",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which package manager is the default, next-generation RPM package manager utilized in openEuler for dependency resolution and package installation?",
    "explanation": "DNF (Dandified YUM) is the default package manager in modern openEuler releases, replacing legacy YUM with faster dependency resolution using libsolv.",
    "options": [
      {
        "key": "A",
        "text": "APT",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "DNF (Dandified YUM)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Pacman",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Zypper",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Package Management",
    "topic": "RPM Query Commands",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which RPM command lists all files installed by an already installed package named `nginx` on an openEuler system?",
    "explanation": "`rpm -ql nginx` queries (`q`) and lists (`l`) all files belonging to the specified installed package.",
    "options": [
      {
        "key": "A",
        "text": "rpm -ql nginx",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "rpm -qa nginx",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "rpm -qi nginx",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "rpm -qf nginx",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Package Management",
    "topic": "YUM Repo Configuration",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In which directory are software repository configuration files (`.repo`) stored on openEuler?",
    "explanation": "Repository configuration files are located in `/etc/yum.repos.d/` with a `.repo` file extension.",
    "options": [
      {
        "key": "A",
        "text": "/etc/yum.repos.d/",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "/var/cache/dnf/",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "/usr/local/repo/",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "/opt/packages/",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Systemd Service Management",
    "topic": "systemctl Commands",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command starts the OpenSSH daemon and simultaneously enables it to start automatically at system boot on openEuler?",
    "explanation": "`systemctl enable --now sshd` configures the service to enable auto-start at boot and immediately starts the service in a single command.",
    "options": [
      {
        "key": "A",
        "text": "systemctl enable --now sshd",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "service sshd start --boot",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "chkconfig sshd on",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "/etc/init.d/sshd restart",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Systemd Service Management",
    "topic": "Systemd Targets",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which systemd target represents standard multi-user command-line server operation without a graphical desktop environment (equivalent to legacy runlevel 3)?",
    "explanation": "`multi-user.target` represents the multi-user CLI environment without a display manager (graphical.target is runlevel 5).",
    "options": [
      {
        "key": "A",
        "text": "graphical.target",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "multi-user.target",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "rescue.target",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "emergency.target",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Systemd Logging",
    "topic": "journalctl Utility",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command inspects systemd journal logs specifically for the `nginx` service in real-time follow mode (like `tail -f`)?",
    "explanation": "`journalctl -u nginx -f` filters logs by unit name (`-u nginx`) and follows new output continuously (`-f`).",
    "options": [
      {
        "key": "A",
        "text": "journalctl -u nginx -f",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "cat /var/log/messages | grep nginx",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "systemctl log -u nginx",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "dmesg -u nginx",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Storage & Disk Partitioning",
    "topic": "Partition Tables (MBR vs GPT)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is GUID Partition Table (GPT) required instead of MBR for partitioning disks larger than 2 Terabytes?",
    "explanation": "MBR uses 32-bit sector addressing with 512-byte sectors, limiting maximum addressable disk capacity to 2.2 TB. GPT supports 64-bit logical block addresses and up to 128 partitions.",
    "options": [
      {
        "key": "A",
        "text": "MBR 32-bit sector addressing cannot address disks larger than 2.2 TB",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "GPT is required by USB flash drives only",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "MBR requires Windows activation",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "GPT compresses data by 50%",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Storage & File Systems",
    "topic": "/etc/fstab Configuration",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In `/etc/fstab`, which column represents the file system check order executed by `fsck` during system boot?",
    "explanation": "The 6th column defines the fsck pass order: 1 for root file system `/`, 2 for other partitions, and 0 to disable fsck.",
    "options": [
      {
        "key": "A",
        "text": "The 6th column (pass number)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "The 1st column (device identifier)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "The 3rd column (file system type)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The 4th column (mount options)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Logical Volume Manager (LVM)",
    "topic": "LVM Hierarchy",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the correct logical architectural hierarchy of LVM storage layers from physical storage up to mountable volumes?",
    "explanation": "Physical Volumes (PV) are initialized from raw partitions; PVs are combined into Volume Groups (VG); and VGs are carved into Logical Volumes (LV).",
    "options": [
      {
        "key": "A",
        "text": "Physical Volume (PV) -> Volume Group (VG) -> Logical Volume (LV)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Logical Volume (LV) -> Physical Volume (PV) -> Volume Group (VG)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Volume Group (VG) -> Logical Volume (LV) -> Physical Volume (PV)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "File System -> Partition Table -> PV",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Logical Volume Manager (LVM)",
    "topic": "LVM Volume Expansion",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command extends an existing Logical Volume `/dev/vg_data/lv_data` by 20 Gigabytes and automatically expands the underlying file system?",
    "explanation": "`lvextend -L +20G -r /dev/vg_data/lv_data` uses `-r` (resizefs) to extend the logical volume and resize the underlying ext4/xfs file system in a single step.",
    "options": [
      {
        "key": "A",
        "text": "lvextend -L +20G -r /dev/vg_data/lv_data",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "lvcreate -s 20G /dev/vg_data/lv_data",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "vgextend +20G /dev/vg_data/lv_data",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "pvresize -L 20G /dev/vg_data/lv_data",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Performance Monitoring",
    "topic": "CPU Monitoring with mpstat",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which performance monitoring command reports real-time individual CPU core utilization breakdown on a multi-core Kunpeng server every 2 seconds?",
    "explanation": "`mpstat -P ALL 2` reports CPU utilization statistics for every individual processor core (`-P ALL`) at 2-second intervals.",
    "options": [
      {
        "key": "A",
        "text": "mpstat -P ALL 2",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "uptime 2",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "uname -r 2",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "df -h 2",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Performance Monitoring",
    "topic": "Disk I/O with iostat",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In `iostat -x` output, what does a `%util` metric approaching 100% on a storage block device indicate?",
    "explanation": "`%util` represents the percentage of elapsed time during which I/O requests were issued to the device. Approaching 100% indicates the device is saturated.",
    "options": [
      {
        "key": "A",
        "text": "The storage device is saturated and experiencing an I/O bottleneck",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "The disk has run out of file inodes",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "The disk has been formatted with FAT32",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The disk controller is operating in low power standby",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "System Troubleshooting",
    "topic": "strace Utility",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does the `strace` diagnostic tool trace when attached to a running process on openEuler?",
    "explanation": "`strace` intercepts and records the system calls (syscalls) made by a process and the signals received by the process.",
    "options": [
      {
        "key": "A",
        "text": "System calls (syscalls) and signals",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "DNS query resolution packets",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "User keyboard typing speed",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Hard drive temperature sensors",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Kernel Parameters",
    "topic": "sysctl Tuning",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which configuration file is used to persist Linux kernel runtime parameters (such as `net.ipv4.ip_forward = 1`) across reboots on openEuler?",
    "explanation": "Kernel tunable parameters are persisted in `/etc/sysctl.conf` (and files under `/etc/sysctl.d/`), loaded with `sysctl -p`.",
    "options": [
      {
        "key": "A",
        "text": "/etc/sysctl.conf",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "/etc/resolv.conf",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "/etc/hosts",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "/etc/environment",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Resource Limits",
    "topic": "/etc/security/limits.conf",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which file configures per-user resource limits (such as maximum open file descriptors `nofile` and maximum processes `nproc`) on openEuler?",
    "explanation": "The PAM pam_limits module reads resource limits from `/etc/security/limits.conf` (and `/etc/security/limits.d/`).",
    "options": [
      {
        "key": "A",
        "text": "/etc/security/limits.conf",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "/etc/profile",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "/etc/login.defs",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "/etc/pam.d/system-auth",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "openEuler Security",
    "topic": "SELinux Modes",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which operational modes are supported by Security-Enhanced Linux (SELinux) on openEuler? (Select all that apply)",
    "explanation": "SELinux supports three modes: Enforcing (policies enforced, denials blocked), Permissive (policies not enforced, denials logged), and Disabled.",
    "options": [
      {
        "key": "A",
        "text": "Enforcing",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Permissive",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Disabled",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Speculative",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "openEuler Networking",
    "topic": "NetworkManager & nmcli",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command line tool is the standard utility for configuring network connections, static IP addresses, and DNS in openEuler?",
    "explanation": "`nmcli` (NetworkManager CLI) is the standard command line tool used to manage network connections and interfaces in openEuler.",
    "options": [
      {
        "key": "A",
        "text": "nmcli",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ifconfig (deprecated)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "route -n",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "netstat -r",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Performance Tuning",
    "topic": "tuned Daemon",
    "questionType": "TRUE_FALSE",
    "questionText": "The `tuned` dynamic adaptive system tuning daemon on openEuler provides pre-configured profiles (such as `throughput-performance`) to optimize kernel, disk, and network parameters.",
    "explanation": "True. `tuned-adm profile throughput-performance` applies tuned server profiles for high-throughput enterprise workloads.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Architecture",
    "topic": "openGauss Overview",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What type of database is openGauss, and what enterprise computing workloads is it optimized for?",
    "explanation": "openGauss is an enterprise-grade open-source relational database management system deeply optimized for multi-core processors like Huawei Kunpeng, delivering high-concurrency OLTP performance.",
    "options": [
      {
        "key": "A",
        "text": "A key-value cache engine stored only in volatile memory",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "An enterprise relational database management system (RDBMS) optimized for multi-core hardware",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "A graph database for social network traversal",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A static text file parser without ACID guarantees",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Architecture",
    "topic": "Memory Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openGauss memory architecture, which shared memory area caches data table and index disk pages to reduce physical disk I/O?",
    "explanation": "Shared Buffers (shared_buffers) is the primary shared memory cache where database table pages and index pages are cached in RAM for read and write operations.",
    "options": [
      {
        "key": "A",
        "text": "Work Mem (work_mem)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Shared Buffers (shared_buffers)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Maintenance Work Mem",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Temp Buffers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Architecture",
    "topic": "Work Mem (work_mem)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What operations in openGauss utilize the per-operation `work_mem` private memory allocation before spilling data to temporary disk files?",
    "explanation": "`work_mem` specifies the amount of memory to be used by internal sort operations (ORDER BY, DISTINCT) and hash tables (Hash Join, Hash Aggregation) before writing to temporary disk files.",
    "options": [
      {
        "key": "A",
        "text": "Sort operations (ORDER BY) and Hash Join hash tables",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Storing WAL redo log records",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Caching client SSL connection certificates",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Storing database user password hashes",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Architecture",
    "topic": "Storage Engines (Astore vs Ustore)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which in-place update storage engine in openGauss separates undo log segments to prevent table bloat and maximize high-concurrency OLTP performance?",
    "explanation": "Ustore (Undo-store) is openGauss's in-place update engine that writes previous versions of updated data to Undo logs rather than creating duplicate row versions in the data page (as in Astore Append-only).",
    "options": [
      {
        "key": "A",
        "text": "Astore (Append-only Store)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Ustore (In-place Update Store with Undo)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Cstore (Column Store)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Memory-only engine",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Architecture",
    "topic": "Column-Store Engine (Cstore)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "For which database query workload is openGauss Columnar Storage (Cstore) specifically designed?",
    "explanation": "Cstore stores table data column-by-column rather than row-by-row, offering high compression ratios and high scan efficiency for OLAP analytical queries.",
    "options": [
      {
        "key": "A",
        "text": "High-frequency single-row banking transfer OLTP transactions",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Large-scale analytical queries, aggregations, and data warehousing (OLAP)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Real-time key-value session cache",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Handling raw unparsed audio files",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Architecture",
    "topic": "Background Processes",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following are essential background threads in openGauss? (Select all that apply)",
    "explanation": "openGauss background threads include the Gaussdb master process, WAL writer (flushes write-ahead logs), Checkpointer (flushes dirty buffers), Autovacuum (reclaims dead rows in Astore), and Page Cleaner.",
    "options": [
      {
        "key": "A",
        "text": "WAL Writer (flushes transaction redo logs to disk)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Checkpointer (creates recovery checkpoints)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Autovacuum (automates garbage row collection)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Page Cleaner (proactively writes dirty pages to disk)",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Deployment",
    "topic": "Default Admin Account (omm)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the default system operating system user and initial database superuser created during standard openGauss enterprise installation?",
    "explanation": "The default OS user and initial database administrator user created by openGauss installation scripts is `omm`.",
    "options": [
      {
        "key": "A",
        "text": "root",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "omm",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "gaussdba",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "admin",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Deployment",
    "topic": "Installation Scripts (gs_install)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which openGauss installation utility is executed to verify environmental prerequisites, user accounts, and kernel parameters across cluster nodes before installation?",
    "explanation": "`gs_preinstall` prepares and verifies the system environment, creates users, distributes trust keys, and configures kernel parameters before `gs_install` installs the database.",
    "options": [
      {
        "key": "A",
        "text": "gs_preinstall",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "gs_install",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "gs_om",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "gs_check",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Operations",
    "topic": "gs_ctl Command",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which `gs_ctl` command starts a single-instance openGauss database located at data directory `$GAUSSHOME/data`?",
    "explanation": "`gs_ctl start -D $GAUSSHOME/data -Z single_node` is used to start openGauss in single-instance mode.",
    "options": [
      {
        "key": "A",
        "text": "gs_ctl start -D $GAUSSHOME/data -Z single_node",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "gs_ctl init -D $GAUSSHOME/data",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "systemctl start opengauss.exe",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "gauss_run -dir $GAUSSHOME/data",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Configuration",
    "topic": "postgresql.conf",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openGauss, which parameter in `postgresql.conf` specifies the IP addresses on which the database server listens for incoming connections from client applications?",
    "explanation": "`listen_addresses` controls which network interfaces openGauss binds to. Setting it to `*` or specific IPs allows remote connections.",
    "options": [
      {
        "key": "A",
        "text": "listen_addresses",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "bind_ip",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "network_interface",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "remote_hosts",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Configuration",
    "topic": "pg_hba.conf Client Authentication",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which configuration file controls client connection authentication rules, allowed client IP subnets, and password encryption methods in openGauss?",
    "explanation": "`pg_hba.conf` (Host-Based Authentication) defines who can connect, from which client IP subnets, to which databases, and using which authentication methods.",
    "options": [
      {
        "key": "A",
        "text": "postgresql.conf",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "pg_hba.conf",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "server.crt",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "hosts.allow",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Configuration",
    "topic": "Reloading Configuration without Restart",
    "questionType": "TRUE_FALSE",
    "questionText": "Modifications to `pg_hba.conf` require a full database instance shutdown and cold restart to take effect.",
    "explanation": "False. `pg_hba.conf` changes take effect immediately upon reloading configuration using `gs_ctl reload -D <data_dir>` or `SELECT pg_reload_conf();`.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Database Objects",
    "topic": "Tablespaces",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is a Tablespace in openGauss?",
    "explanation": "A Tablespace is a logical storage container that maps to a specific physical directory on the server file system, allowing administrators to store high-traffic tables on fast NVMe drives.",
    "options": [
      {
        "key": "A",
        "text": "A virtual RAM disk that deletes on reboot",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "A logical location mapping to a physical directory where database data files reside",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "A list of database user passwords",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A backup tape drive identifier",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Database Objects",
    "topic": "Default Tablespaces",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which default tablespace is created automatically by openGauss to store user tables and indexes when no specific tablespace is specified during table creation?",
    "explanation": "`pg_default` is the default tablespace used for user database objects, located in the `base` subdirectory of the data directory.",
    "options": [
      {
        "key": "A",
        "text": "pg_global",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "pg_default",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "userspace",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "system_tbs",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Database Objects",
    "topic": "Schemas vs Databases",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openGauss, what is the architectural relationship between a Database and a Schema?",
    "explanation": "A Database contains one or more Schemas (namespaces), and a Schema contains tables, views, and functions. Two tables in different schemas within the same database can share the same name.",
    "options": [
      {
        "key": "A",
        "text": "A Database contains multiple Schemas; a Schema is a namespace for tables and views",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A Schema contains multiple independent Databases",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Database and Schema are strictly identical concepts with identical names",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Schemas can only exist in memory; Databases on disk",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Administration",
    "topic": "gsql CLI Terminal",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which meta-command in the `gsql` interactive command-line terminal lists all databases present in the openGauss instance?",
    "explanation": "In `gsql`, `\\l` (or `\\list`) lists all databases with their owners, character encodings, and collations.",
    "options": [
      {
        "key": "A",
        "text": "\\d",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "\\l",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "\\dt",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "\\du",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Administration",
    "topic": "gsql Table Description",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In `gsql`, which meta-command describes the column definitions, data types, and indexes of a table named `students`?",
    "explanation": "`\\d students` displays the table schema, columns, constraints, and indexes.",
    "options": [
      {
        "key": "A",
        "text": "\\d students",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "\\c students",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "\\e students",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "\\s students",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Administration",
    "topic": "gsql Connection Switching",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In `gsql`, which meta-command switches the current session connection to another database named `finance_db`?",
    "explanation": "`\\c finance_db` connects to the specified database.",
    "options": [
      {
        "key": "A",
        "text": "USE finance_db;",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "\\c finance_db",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "SWITCH finance_db;",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "\\q finance_db",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss High Availability",
    "topic": "Primary/Standby Replication",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What technology does openGauss use to replicate transaction data from the Primary node to Standby nodes in high-availability clusters?",
    "explanation": "openGauss streams Write-Ahead Logging (WAL) records over TCP connections using a dedicated replication connection (WAL sender and receiver threads).",
    "options": [
      {
        "key": "A",
        "text": "Write-Ahead Log (WAL) streaming replication",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Periodic FTP file synchronizations",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "RSYNC on raw block devices",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Re-executing raw SQL queries via client re-play",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss High Availability",
    "topic": "Replication Modes",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which replication modes are supported between Primary and Standby instances in openGauss? (Select all that apply)",
    "explanation": "openGauss supports Synchronous replication (commit waits for standby write/flush) and Asynchronous replication (primary commits immediately without waiting).",
    "options": [
      {
        "key": "A",
        "text": "Synchronous replication (zero RPO, waits for standby acknowledgment)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Asynchronous replication (lowest transaction commit latency)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Semi-synchronous replication",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Quantum entanglement replication",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Security",
    "topic": "User Creation Syntax",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which SQL statement creates a database user `app_user` with password `SecurePass123!` and granted login privileges in openGauss?",
    "explanation": "`CREATE USER app_user WITH PASSWORD 'SecurePass123!';` creates a user account with login privileges and password.",
    "options": [
      {
        "key": "A",
        "text": "CREATE USER app_user WITH PASSWORD 'SecurePass123!';",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ADD USER app_user PASS 'SecurePass123!';",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "INSERT INTO users VALUES ('app_user', 'SecurePass123!');",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "MAKE ACCOUNT app_user 'SecurePass123!';",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Permissions",
    "topic": "GRANT Statement",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which SQL command grants SELECT and INSERT permissions on table `orders` to user `analyst` in openGauss?",
    "explanation": "`GRANT SELECT, INSERT ON orders TO analyst;` grants specified table permissions to the designated role/user.",
    "options": [
      {
        "key": "A",
        "text": "GRANT SELECT, INSERT ON orders TO analyst;",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ALLOW analyst TO READ, WRITE orders;",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "PERMIT analyst ON orders WITH (SELECT, INSERT);",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "SET PERMISSION analyst = 'orders:rw';",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Permissions",
    "topic": "REVOKE Statement",
    "questionType": "TRUE_FALSE",
    "questionText": "The `REVOKE` command in openGauss removes previously granted database privileges from a user or role.",
    "explanation": "True. `REVOKE <privileges> ON <object> FROM <role>;` revokes permissions.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss System Catalogs",
    "topic": "pg_tables View",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which openGauss system catalog view can be queried with standard SQL to retrieve metadata regarding all tables across all schemas in the database?",
    "explanation": "`pg_tables` provides information about each table in the database, including schemaname, tablename, tableowner, and tablespace.",
    "options": [
      {
        "key": "A",
        "text": "pg_tables",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "sys_files",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "db_objects_all",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "user_catalogs",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Maintenance",
    "topic": "VACUUM Command",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In openGauss Astore row storage, what is the primary role of the `VACUUM` maintenance command?",
    "explanation": "In Astore, deleted or updated rows leave behind dead row versions (tuples). `VACUUM` reclaims storage occupied by dead tuples and updates table statistics for the query planner.",
    "options": [
      {
        "key": "A",
        "text": "Reclaims disk space occupied by dead tuples and updates statistics",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Deletes all tables from the database",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Resets the database root password",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Recompiles openGauss source code",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Backup & Restore",
    "topic": "gs_dump Tool",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which openGauss logical backup tool exports database objects and data into an SQL script or custom-format archive file?",
    "explanation": "`gs_dump` is an openGauss logical backup utility that extracts database definitions and data into script files or archive formats for backup and migration.",
    "options": [
      {
        "key": "A",
        "text": "gs_dump",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "gs_tar",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "gs_zip",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "db_backup_cli",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Backup & Restore",
    "topic": "gs_restore Tool",
    "questionType": "TRUE_FALSE",
    "questionText": "`gs_restore` is used to restore openGauss databases from non-plaintext archives created by `gs_dump`.",
    "explanation": "True. `gs_restore` restores an openGauss database from archive formats created by `gs_dump`.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Physical Backup",
    "topic": "gs_basebackup Tool",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which tool performs an online physical baseline backup of an openGauss database cluster without taking the database offline?",
    "explanation": "`gs_basebackup` takes a base backup of a running openGauss database cluster by streaming raw data files and WAL logs over the replication protocol.",
    "options": [
      {
        "key": "A",
        "text": "gs_basebackup",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "cp -r /data",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "tar -czf db.tar.gz",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "dd if=/dev/sda",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Connection Management",
    "topic": "Connection Pooling",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is client connection pooling (e.g., using HikariCP, PgBouncer) recommended for applications connecting to openGauss?",
    "explanation": "Establishing new database connections creates new backend threads and allocates process memory. Connection pools maintain reusable open connections, eliminating connection setup overhead.",
    "options": [
      {
        "key": "A",
        "text": "To eliminate the CPU and memory overhead of creating and destroying connections per request",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Because openGauss supports a maximum of 3 concurrent connections",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "To convert SQL statements to JSON",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To bypass database user authentication",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "openGauss Security",
    "topic": "Password Encryption Algorithm",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What modern, cryptographically secure password hashing algorithm is standardly used by openGauss for user authentication in `pg_hba.conf`?",
    "explanation": "openGauss standardly implements SHA-256 (and SM3 national secret algorithm) password hashing, deprecating weak MD5.",
    "options": [
      {
        "key": "A",
        "text": "Plaintext plaintext",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "SHA-256 (or SM3)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "ROT13 substitution",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "DES 56-bit",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Data Definition Language (DDL)",
    "topic": "CREATE TABLE",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which DDL statement creates a table named `contestants` with an auto-incrementing integer primary key `id` and a non-null username in openGauss?",
    "explanation": "`CREATE TABLE contestants (id SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL);` uses SERIAL (or BIGSERIAL) for auto-incrementing primary keys.",
    "options": [
      {
        "key": "A",
        "text": "CREATE TABLE contestants (id SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL);",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "MAKE TABLE contestants [id INT, username STR];",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "NEW TABLE contestants (id AUTO, username TEXT);",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "DEFINE TABLE contestants (id KEY, username CHAR);",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Data Manipulation Language (DML)",
    "topic": "INSERT Statement",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which SQL statement inserts a new record into table `tracks` with columns `code` and `name`?",
    "explanation": "`INSERT INTO tracks (code, name) VALUES ('CLOUD', 'Cloud Computing');` is standard ANSI SQL DML syntax supported by openGauss.",
    "options": [
      {
        "key": "A",
        "text": "INSERT INTO tracks (code, name) VALUES ('CLOUD', 'Cloud Computing');",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ADD TO tracks SET code='CLOUD', name='Cloud Computing';",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "APPEND tracks ('CLOUD', 'Cloud Computing');",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "PUT INTO tracks ('CLOUD', 'Cloud Computing');",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Data Query Language (DQL)",
    "topic": "JOIN Operations",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which JOIN type returns all records from the left table, and matching records from the right table (filling NULLs for non-matching rows on the right)?",
    "explanation": "A LEFT OUTER JOIN (or LEFT JOIN) returns all records from the left table and matched values from the right table, or NULL if no match is found.",
    "options": [
      {
        "key": "A",
        "text": "INNER JOIN",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "LEFT OUTER JOIN",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "RIGHT OUTER JOIN",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "CROSS JOIN",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Data Query Language (DQL)",
    "topic": "GROUP BY & HAVING",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the key difference between the `WHERE` clause and the `HAVING` clause in an openGauss SQL query?",
    "explanation": "`WHERE` filters individual rows before grouping takes place; `HAVING` filters group aggregation results (e.g., `HAVING COUNT(*) > 5`) after grouping.",
    "options": [
      {
        "key": "A",
        "text": "WHERE filters rows before aggregation; HAVING filters aggregated groups after GROUP BY",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "WHERE filters numbers; HAVING filters strings only",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "WHERE can only be used on primary keys; HAVING on foreign keys",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Both clauses are identical and interchangeable",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Window Functions",
    "topic": "ROW_NUMBER()",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which window function assigns a unique sequential integer (1, 2, 3...) to rows within each partition, ordered by score descending?",
    "explanation": "`ROW_NUMBER() OVER (PARTITION BY track ORDER BY score DESC)` assigns unique sequential ranks without gaps.",
    "options": [
      {
        "key": "A",
        "text": "ROW_NUMBER() OVER (ORDER BY score DESC)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "COUNT(score) ALL",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "SUM(score) OVER()",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "GROUP_CONCAT(score)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Window Functions",
    "topic": "RANK() vs DENSE_RANK()",
    "questionType": "SINGLE_CHOICE",
    "questionText": "If two contestants tie for 1st place with identical scores, what ranks will `RANK()` assign to the two tied contestants and the subsequent 3rd contestant?",
    "explanation": "`RANK()` leaves gaps after ties: two contestants tied for rank 1 will both receive rank 1, and the next contestant receives rank 3 (whereas `DENSE_RANK()` would assign rank 2).",
    "options": [
      {
        "key": "A",
        "text": "1, 1, 3 (leaves a gap)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "1, 1, 2 (no gap)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1, 2, 3",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "1, 2, 4",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Transaction Management",
    "topic": "ACID Properties",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which four properties constitute the ACID transaction guarantees in openGauss? (Select all that apply)",
    "explanation": "ACID stands for Atomicity (all-or-nothing), Consistency, Isolation (independent execution), and Durability (persistence of committed data).",
    "options": [
      {
        "key": "A",
        "text": "Atomicity (All operations succeed or all are rolled back)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Consistency (Database transitions from one valid state to another)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Isolation (Concurrent transactions execute without interference)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Durability (Committed transactions survive crashes permanently)",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Transaction Management",
    "topic": "Isolation Levels",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the default transaction isolation level in openGauss?",
    "explanation": "The default transaction isolation level in openGauss is Read Committed, which prevents dirty reads while allowing non-repeatable reads.",
    "options": [
      {
        "key": "A",
        "text": "Read Uncommitted",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Read Committed",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Repeatable Read",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Serializable",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Transaction Management",
    "topic": "Dirty Read Phenomenon",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does a 'Dirty Read' anomaly mean in database transaction concurrency?",
    "explanation": "A Dirty Read occurs when Transaction A reads uncommitted modifications made by concurrent Transaction B, which is later rolled back by B.",
    "options": [
      {
        "key": "A",
        "text": "Reading uncommitted data modified by another transaction that might be rolled back",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Reading data from a corrupted sector on disk",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Reading data without having database administrator privileges",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Reading data across an unencrypted network connection",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Transaction Management",
    "topic": "SAVEPOINT",
    "questionType": "TRUE_FALSE",
    "questionText": "In openGauss, `SAVEPOINT` allows partial transaction rollback using `ROLLBACK TO SAVEPOINT`, rolling back subsequent statements without aborting the entire transaction.",
    "explanation": "True. Savepoints create intermediate rollback points within a transaction block.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Database Indexing",
    "topic": "B-Tree Indexes",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which index type is the default index structure created by openGauss when executing `CREATE INDEX`, ideal for equality and range queries (`<`, `<=`, `=`, `>=`, `>`)?",
    "explanation": "B-Tree (Balanced Tree) is the default index type in openGauss, supporting equality and range scans with logarithmic lookup complexity $O(\\log N)$.",
    "options": [
      {
        "key": "A",
        "text": "Hash Index",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "B-Tree Index",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "GIN Index",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "GiST Index",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Database Indexing",
    "topic": "Hash Indexes",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why are Hash Indexes unsuitable for range queries (such as `WHERE age BETWEEN 20 AND 30`)?",
    "explanation": "Hash indexes map values to hash buckets without preserving order, meaning they can only evaluate simple equality comparisons (`=`), not range comparisons.",
    "options": [
      {
        "key": "A",
        "text": "Hash functions destroy value ordering and can only evaluate equality comparisons (=)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Hash indexes cannot be created on integer columns",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Hash indexes take up 100 times more disk space than B-tree",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Hash indexes require hardware GPUs",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Database Indexing",
    "topic": "GIN Indexing",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which index type in openGauss is designed for indexing composite items such as JSON/JSONB documents, full-text search documents, and arrays?",
    "explanation": "Generalized Inverted Indexes (GIN) map individual component elements (words, keys) to rows containing them, ideal for full-text search and JSONB containment queries.",
    "options": [
      {
        "key": "A",
        "text": "GIN (Generalized Inverted Index)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "B-Tree Index",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "BRIN Index",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "R-Tree Index",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Query Optimization",
    "topic": "EXPLAIN Command",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does running `EXPLAIN ANALYZE <SELECT ...>` do in openGauss?",
    "explanation": "`EXPLAIN ANALYZE` actually executes the query, displaying both the query optimizer's cost estimates and the real execution time and row counts for each plan node.",
    "options": [
      {
        "key": "A",
        "text": "Executes the query and displays both estimated costs and actual execution times/row counts",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Only estimates the cost without running the query",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Deletes the table if it takes longer than 1 second",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Translates the query to C++",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Query Optimization",
    "topic": "Cost Model",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In an `EXPLAIN` query plan output line like `Seq Scan on users (cost=0.00..35.50 rows=1000 width=40)`, what does `35.50` represent?",
    "explanation": "The second number (`35.50`) represents the estimated total cost to retrieve all matching rows from the plan node (the first number is the startup cost).",
    "options": [
      {
        "key": "A",
        "text": "Startup cost before first row is returned",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Estimated total cost to execute the plan node to completion",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Actual execution time in milliseconds",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Number of CPU cores utilized",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Query Optimization",
    "topic": "Join Algorithms",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which join algorithm in openGauss builds a hash table in memory from the smaller inner relation and probes it with rows from the outer relation?",
    "explanation": "Hash Join builds an in-memory hash table on the join key from the inner table, then scans the outer table to probe matching rows.",
    "options": [
      {
        "key": "A",
        "text": "Nested Loop Join",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Hash Join",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Merge Join",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Cartesian Product Join",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Query Optimization",
    "topic": "Merge Join Prerequisites",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Under what condition is a Merge Join most efficiently chosen by the openGauss query optimizer?",
    "explanation": "Merge Join requires both input relations to be sorted on the join key. When both inputs are already sorted (e.g., via B-tree index scans), Merge Join is extremely fast.",
    "options": [
      {
        "key": "A",
        "text": "When both relations are already sorted on the join keys",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "When tables have zero indexes and random order",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "When one table has only 1 row",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "When the query uses cross-database federation",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Database Views",
    "topic": "Materialized Views",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary difference between a standard View and a Materialized View in openGauss?",
    "explanation": "A standard View is a stored SQL query executed dynamically upon access. A Materialized View stores the query result physically on disk, requiring explicit refresh (`REFRESH MATERIALIZED VIEW`).",
    "options": [
      {
        "key": "A",
        "text": "A standard View stores query results on disk; Materialized Views do not",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "A Materialized View physically caches query results on disk for fast retrieval",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Materialized Views can only be created by root users in Linux",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Standard Views cannot use WHERE clauses",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "openGauss Security Architecture",
    "topic": "Separation of Three Duties",
    "questionType": "SINGLE_CHOICE",
    "questionText": "To prevent privilege abuse in enterprise environments, openGauss supports the 'Separation of Three Duties'. Which three administrator roles are separated?",
    "explanation": "openGauss separates System Administrator (system maintenance), Security Administrator (secadm - user management and permissions), and Audit Administrator (auditadm - security audit logs).",
    "options": [
      {
        "key": "A",
        "text": "System Administrator, Security Administrator, and Audit Administrator",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Developer, Tester, and Project Manager",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Network Admin, Storage Admin, and Server Admin",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Root, Guest, and Anonymous",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "openGauss Security Architecture",
    "topic": "Audit Administrator Privileges",
    "questionType": "TRUE_FALSE",
    "questionText": "Under the Separation of Three Duties in openGauss, the Audit Administrator (`auditadm`) cannot modify audit logs, drop database tables, or alter user permissions.",
    "explanation": "True. To ensure audit trail integrity, the audit administrator can only view and manage audit configuration/logs, with no privileges to modify user data or table schemas.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "openGauss Security",
    "topic": "Account Lockout Policy",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which openGauss parameter sets the number of consecutive failed login attempts before a user account is automatically locked to prevent brute-force attacks?",
    "explanation": "`failed_login_attempts` specifies the threshold of consecutive authentication failures that triggers automatic account locking.",
    "options": [
      {
        "key": "A",
        "text": "failed_login_attempts",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "max_connections",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "session_timeout",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "lock_counter",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "openGauss Security",
    "topic": "Dynamic Data Masking",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What security feature in openGauss automatically obfuscates sensitive columns (e.g., masking credit card numbers as `**** **** **** 1234`) when queried by unprivileged users?",
    "explanation": "Dynamic Data Masking (DDM) masks sensitive data in query results based on masking policies without altering the underlying data stored in the database.",
    "options": [
      {
        "key": "A",
        "text": "Dynamic Data Masking (DDM)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Transparent Data Compression",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "SSL Handshake Decryption",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Foreign Key Cascade Delete",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "openGauss Security",
    "topic": "Transparent Data Encryption (TDE)",
    "questionType": "TRUE_FALSE",
    "questionText": "Transparent Data Encryption (TDE) in openGauss encrypts data files and WAL logs on disk, preventing data leakage if physical storage media are stolen.",
    "explanation": "True. TDE performs real-time I/O encryption and decryption of data files at rest, transparent to client applications.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Data Types",
    "topic": "Arbitrary Precision NUMERIC",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which data type should be used in openGauss for monetary currency amounts where floating-point rounding errors cannot be tolerated?",
    "explanation": "`NUMERIC(precision, scale)` (or `DECIMAL`) provides exact, arbitrary-precision decimal representation without binary floating-point rounding artifacts.",
    "options": [
      {
        "key": "A",
        "text": "FLOAT4",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "NUMERIC(precision, scale)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "REAL",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "DOUBLE PRECISION",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Integrity Constraints",
    "topic": "Foreign Keys",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What action occurs when a referenced primary key row is deleted if the foreign key constraint is configured with `ON DELETE CASCADE`?",
    "explanation": "`ON DELETE CASCADE` automatically deletes all referencing child rows in the foreign key table when the referenced parent row is deleted.",
    "options": [
      {
        "key": "A",
        "text": "The referencing child rows are automatically deleted as well",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "The deletion is blocked with a foreign key violation error",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "The foreign key column is filled with random characters",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The entire database is dropped",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL Subqueries",
    "topic": "EXISTS Operator",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How does the `EXISTS (SELECT 1 ...)` subquery operator evaluate in openGauss?",
    "explanation": "`EXISTS` tests for the existence of rows in the subquery result. It returns TRUE as soon as the first matching row is found without scanning the remaining rows.",
    "options": [
      {
        "key": "A",
        "text": "Returns TRUE immediately as soon as a single matching row is found",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Calculates the mathematical sum of all returned integers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Always evaluates to FALSE if NULL values exist",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Only works on temporary tables",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "openGauss Audit Logging",
    "topic": "Audit Trails",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which openGauss configuration parameter enables audit recording of DDL statements (such as `CREATE TABLE`, `DROP TABLE`) for compliance?",
    "explanation": "`audit_ddl` specifies whether DDL operations executed on the database are recorded in the audit trail.",
    "options": [
      {
        "key": "A",
        "text": "audit_ddl",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "log_connections",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "track_activities",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "enable_ddl_log",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SQL String Functions",
    "topic": "Pattern Matching with LIKE",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In SQL `LIKE` pattern matching, which wildcard character matches any single character?",
    "explanation": "In SQL LIKE clauses, `_` (underscore) matches exactly one single character, while `%` (percent) matches zero or more characters.",
    "options": [
      {
        "key": "A",
        "text": "%",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "_ (underscore)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "*",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "?",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Database Sequences",
    "topic": "nextval() Function",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which function call advances an openGauss sequence named `user_seq` and returns its next integer value?",
    "explanation": "`nextval('user_seq')` advances the sequence and returns the new value. `currval('user_seq')` returns the current value in the session.",
    "options": [
      {
        "key": "A",
        "text": "nextval('user_seq')",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "currval('user_seq')",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "seq_advance('user_seq')",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "increment('user_seq')",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "openGauss Competition Weighting",
    "topic": "Syllabus Distribution",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In the official Huawei ICT Competition Computing Track preliminary round, what is the official syllabus percentage weighting across openEuler, openGauss, and Kunpeng?",
    "explanation": "According to the official 2026\u20132027 Huawei ICT Competition syllabus, Computing Track weighting is strictly: 50% openEuler, 30% openGauss, and 20% Kunpeng.",
    "options": [
      {
        "key": "A",
        "text": "50% openEuler, 30% openGauss, and 20% Kunpeng",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "33% openEuler, 33% openGauss, and 33% Kunpeng",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "80% openEuler and 20% openGauss without Kunpeng",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "60% Cloud and 40% AI",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Computer Architecture Comparison",
    "topic": "ARM RISC vs x86 CISC",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary instruction set difference between the ARMv8 architecture used by Kunpeng and the legacy x86 architecture?",
    "explanation": "ARMv8 uses Reduced Instruction Set Computing (RISC) with fixed 32-bit instruction length and load-store architecture. x86 uses Complex Instruction Set Computing (CISC) with variable-length instructions.",
    "options": [
      {
        "key": "A",
        "text": "ARM is RISC with fixed instruction length; x86 is CISC with variable instruction length",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ARM has no CPU registers; x86 has 1,000 registers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "ARM cannot run multi-threaded code",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "x86 instructions are always 8 bits wide",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Computer Architecture Comparison",
    "topic": "Memory Consistency Models",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How does the memory consistency model of ARMv8 differ from the Total Store Order (TSO) model of x86?",
    "explanation": "ARMv8 utilizes a Weakly Ordered memory consistency model where loads and stores can be reordered by hardware for performance, requiring explicit memory barrier instructions (`DMB`/`DSB`) when order matters.",
    "options": [
      {
        "key": "A",
        "text": "ARM is Weakly Ordered; x86 is Strongly Ordered (TSO)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ARM does not allow multi-core memory sharing",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "x86 requires manual bus locking for every instruction",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Both architectures have strictly identical memory ordering rules",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Hardware Architecture",
    "topic": "Kunpeng 920 Specifications",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which high-speed bus interface is integrated on-chip in the Huawei Kunpeng 920 processor, supporting up to 16 GT/s per lane?",
    "explanation": "Kunpeng 920 features native on-chip PCIe 4.0 controllers, delivering high bandwidth for NVMe SSDs, network accelerators, and GPUs.",
    "options": [
      {
        "key": "A",
        "text": "PCIe 2.0",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "PCIe 4.0",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "AGP 8x",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "ISA Bus",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Software Porting Workflow",
    "topic": "Porting Steps",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "What are the standard phases of migrating software from x86 to the Huawei Kunpeng computing platform? (Select all that apply)",
    "explanation": "The standard porting workflow comprises: 1. Software evaluation / migration check, 2. Porting plan preparation, 3. Code modification & build adaptation, 4. Performance testing and tuning.",
    "options": [
      {
        "key": "A",
        "text": "Migration Evaluation & Dependency Analysis",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Compilation & Code Adaptation",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Functional Verification & Performance Tuning",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Replacing server motherboards with smartphone batteries",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "C/C++ Porting",
    "topic": "Char Type Signedness",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When porting C/C++ source code from x86 to Kunpeng ARM, what is the default signedness of the plain `char` data type, and which GCC compiler option forces it to be signed?",
    "explanation": "On x86, `char` is signed by default. On ARM, `char` is unsigned by default (0 to 255). Compiling with `-fsigned-char` ensures x86-compatible signed char behavior.",
    "options": [
      {
        "key": "A",
        "text": "ARM default is unsigned char; use `-fsigned-char` to force signed",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ARM default is signed char; use `-funsigned-char`",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "char is always 16 bits on ARM",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "No compiler flag exists for char signedness",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "C/C++ Porting",
    "topic": "Memory Barrier Instructions",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which ARM assembly instruction acts as a Data Memory Barrier (DMB), ensuring that memory accesses appearing before the barrier complete before accesses appearing after the barrier?",
    "explanation": "`DMB` (Data Memory Barrier) ensures memory access ordering. `DSB` (Data Synchronization Barrier) waits for memory accesses to complete before proceeding.",
    "options": [
      {
        "key": "A",
        "text": "DMB (Data Memory Barrier)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "NOP (No Operation)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "SVC (Supervisor Call)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "WFI (Wait for Interrupt)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "C/C++ Porting",
    "topic": "Inline Assembly Porting",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When migrating code with x86 inline assembly (`__asm__(\"cpuid\")` or SSE/AVX vector intrinsics) to Kunpeng, what must be done?",
    "explanation": "x86 assembly instructions and SIMD intrinsics (SSE/AVX) are not supported on ARM. They must be rewritten using ARMv8 assembly, NEON SIMD intrinsics, or portable C code.",
    "options": [
      {
        "key": "A",
        "text": "Rewrite using ARMv8 assembly or ARM NEON SIMD intrinsics",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Simply change the file extension to `.arm`",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Add a `//` comment mark before all x86 instructions",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Inline assembly runs unmodified on ARM",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng DevKit Tools",
    "topic": "Porting Advisor Overview",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary function of the Kunpeng DevKit Porting Advisor tool?",
    "explanation": "Porting Advisor scans C/C++, Fortran, and Python source code and compiled binaries, automatically identifying x86-specific dependencies, inline assembly, and compiler flags, providing ARM migration advice.",
    "options": [
      {
        "key": "A",
        "text": "Automated code scanning, migration workload evaluation, and porting suggestions for ARM",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Measuring power grid voltage in data centers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Automatic physical packaging of chipsets",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Managing user credit card transactions",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng DevKit Tools",
    "topic": "64-Bit Mode Check",
    "questionType": "TRUE_FALSE",
    "questionText": "The Kunpeng Porting Advisor includes 64-bit verification capabilities to identify legacy 32-bit pointers and integer truncation issues before migrating to 64-bit Kunpeng.",
    "explanation": "True. The tool checks for data truncation risks when converting 32-bit legacy code structures to 64-bit ARM architectures.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng DevKit Tools",
    "topic": "Dependency Advisor",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Kunpeng DevKit tool analyzes binary software packages to determine if all dependent dynamic and static libraries are compatible with the Kunpeng platform?",
    "explanation": "Dependency Advisor checks binary software packages, shared objects (`.so`), and archive libraries (`.a`) to determine if Kunpeng-compatible versions exist.",
    "options": [
      {
        "key": "A",
        "text": "Dependency Advisor",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Disk Optimizer",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Memory Defragmenter",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Network Pinger",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng DevKit Performance Tools",
    "topic": "Tuning Assistant",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which tool in the Kunpeng DevKit provides automated system-level bottleneck diagnosis and guided tuning recommendations for CPU, memory, storage, and network?",
    "explanation": "Tuning Assistant collects performance data across hardware, OS, and runtime stacks, pinpointing bottlenecks and offering step-by-step optimization recommendations.",
    "options": [
      {
        "key": "A",
        "text": "Tuning Assistant",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Terminal Ping",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Vim syntax highlighter",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Bash history search",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng DevKit Performance Tools",
    "topic": "Java Profiler",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does the Kunpeng Java Profiler tool analyze for Java enterprise applications running on Kunpeng servers?",
    "explanation": "Java Profiler diagnoses JVM performance, heap memory allocation hotspots, garbage collection (GC) pauses, thread lock contention, and I/O bottlenecks.",
    "options": [
      {
        "key": "A",
        "text": "JVM heap allocations, GC pauses, thread lock contention, and hotspots",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "HTML webpage typography",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Optical fiber transceiver frequencies",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Fan rotation tachometers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Performance Optimization",
    "topic": "NUMA Binding with numactl",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command binds a database process `gaussdb` to CPU cores and memory strictly located on NUMA Node 0 to eliminate cross-node memory latency?",
    "explanation": "`numactl --cpunodebind=0 --membind=0 <cmd>` binds CPU execution and physical memory allocation strictly to NUMA node 0.",
    "options": [
      {
        "key": "A",
        "text": "numactl --cpunodebind=0 --membind=0 ./gaussdb",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "nice -n 0 ./gaussdb",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "taskset -p 999 ./gaussdb",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "chcpu -e 0 ./gaussdb",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Performance Optimization",
    "topic": "Huge Pages",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why does enabling Huge Pages (e.g., 2MB or 1GB pages) improve performance for memory-intensive workloads like openGauss on Kunpeng?",
    "explanation": "Huge pages drastically reduce the number of entries in the Translation Lookaside Buffer (TLB), cutting TLB misses and accelerating virtual-to-physical address translation.",
    "options": [
      {
        "key": "A",
        "text": "Reduces TLB misses and overhead of virtual address translation",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Compresses data on disk by 80%",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Eliminates the need for physical RAM",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Allows 32-bit software to run on 16-bit CPUs",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Acceleration Engine (KAE)",
    "topic": "KAE Features",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which cryptographic and compression algorithms can be accelerated by hardware offloading using the Kunpeng Accelerating Engine (KAE)? (Select all that apply)",
    "explanation": "KAE offloads symmetric cryptography (AES, SM4), asymmetric cryptography (RSA, SM2), hashing (MD5, SHA), and lossless data compression (zlib, gzip) to Kunpeng hardware accelerators.",
    "options": [
      {
        "key": "A",
        "text": "RSA and SM2 asymmetric cryptography",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "AES and SM4 symmetric encryption",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Zlib and Gzip data compression",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Analog video signal rendering",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Acceleration Engine (KAE)",
    "topic": "KAE CPU Offloading Benefit",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary benefit of deploying KAE for HTTPS web servers or encrypted database communication?",
    "explanation": "KAE offloads CPU-intensive SSL/TLS handshake calculations (RSA/SM2) to hardware accelerators, freeing CPU cores for core business logic.",
    "options": [
      {
        "key": "A",
        "text": "Frees CPU cores by offloading encryption/decryption to hardware accelerators",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Eliminates the need for domain names",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Allows plaintext unencrypted passwords over public WiFi",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Reduces network bandwidth from 10G to 10M",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "BoostKit Tuning",
    "topic": "BoostKit Concept",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is Huawei BoostKit in the Kunpeng computing ecosystem?",
    "explanation": "BoostKit is an application enablement suite providing hardware-software co-optimized acceleration algorithms and reference architectures for Big Data, Databases, Web, and HPC on Kunpeng.",
    "options": [
      {
        "key": "A",
        "text": "A hardware-software acceleration enablement suite for enterprise workloads on Kunpeng",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A physical thermal paste applicator kit",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A consumer video game emulator",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "An external battery bank for laptops",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "BoostKit Tuning",
    "topic": "Big Data Acceleration",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How does BoostKit for Big Data accelerate Apache Spark and Hadoop workloads on Kunpeng servers?",
    "explanation": "BoostKit optimizes vectorized query engines (OmniRuntime), improves shuffle data movement, leverages KAE for data compression, and optimizes memory allocation.",
    "options": [
      {
        "key": "A",
        "text": "Through vectorized computing engines (OmniRuntime), KAE compression, and NUMA optimization",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "By replacing all code with static HTML files",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "By executing queries only on Sundays",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "By deleting 50% of the input data randomly",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Network Optimization",
    "topic": "Interrupt Affinity (smp_affinity)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is network card interrupt affinity (`smp_affinity`) configured to bind specific network queue interrupts to designated CPU cores on multi-core Kunpeng servers?",
    "explanation": "Binding NIC interrupts to dedicated CPU cores on the local NUMA node prevents cross-node context switching and cache bouncing, stabilizing network latency.",
    "options": [
      {
        "key": "A",
        "text": "To prevent interrupt distribution across nodes and eliminate cache bouncing",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "To change the MAC address of the network card",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "To disable IPv6 on the server",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To limit network traffic to 100 Mbps",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Compiler Optimization",
    "topic": "BiSheng Compiler",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which high-performance compiler was developed by Huawei specifically optimized for Kunpeng processor microarchitectures, based on LLVM/Clang?",
    "explanation": "BiSheng Compiler is Huawei's LLVM-based high-performance compiler, featuring automatic vectorization, loop optimization, and architecture-specific pipeline scheduling for Kunpeng.",
    "options": [
      {
        "key": "A",
        "text": "BiSheng Compiler",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Turbo Pascal",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "MS-DOS QBasic",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Borland C++ 3.1",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Compiler Optimization",
    "topic": "BiSheng JDK",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What optimizations does Huawei BiSheng JDK provide for enterprise Java workloads on Kunpeng servers?",
    "explanation": "BiSheng JDK provides Kunpeng-tailored garbage collection optimizations, intrinsic function acceleration, escape analysis, and FastSerializer.",
    "options": [
      {
        "key": "A",
        "text": "Hardware-tuned GC algorithms, intrinsic function acceleration, and FastSerializer",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Removal of all Java classes and interfaces",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Mandatory conversion of Java code to PHP",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Disabling the Java virtual machine entirely",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Storage Optimization",
    "topic": "I/O Scheduler Selection",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Linux I/O scheduler is recommended on openEuler for high-performance NVMe SSD drives attached to Kunpeng servers?",
    "explanation": "For fast multi-queue NVMe SSDs, `none` (or `mq-deadline`) is recommended because hardware handles queuing efficiently without overhead from complex software schedulers.",
    "options": [
      {
        "key": "A",
        "text": "none (or mq-deadline for multi-queue NVMe SSDs)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "CFQ (Completely Fair Queuing designed for rotational disks)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Anticipatory scheduler",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Floppy drive scheduler",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng SIMD Vectorization",
    "topic": "ARM NEON Technology",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What 128-bit Single Instruction Multiple Data (SIMD) vector processing engine is integrated into Kunpeng ARM cores for media, signal, and mathematical processing?",
    "explanation": "ARM NEON technology provides 128-bit wide SIMD execution pipelines for accelerated multimedia, signal processing, and matrix mathematics.",
    "options": [
      {
        "key": "A",
        "text": "ARM NEON SIMD Engine",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Intel AVX-512",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "AMD 3DNow!",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "AltiVec",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng System Profiling",
    "topic": "Hotspot Analysis",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In performance optimization, what is a 'Hotspot' identified by the Kunpeng System Profiler?",
    "explanation": "A hotspot is a specific function, instruction loop, or memory access location that consumes a disproportionately high percentage of CPU execution time.",
    "options": [
      {
        "key": "A",
        "text": "A code function or instruction loop consuming high percentages of CPU time",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A physical area on the motherboard with high thermal temperature",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A public wireless Wi-Fi access point",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A cracked Ethernet cable connector",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng System Profiling",
    "topic": "perf Command",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which standard Linux command-line tool collects hardware performance monitoring unit (PMU) counters such as CPU cycles, cache misses, and branch mispredictions?",
    "explanation": "`perf stat` and `perf record` collect hardware PMU counters (cycles, cache-misses, branch-misses) directly from CPU hardware.",
    "options": [
      {
        "key": "A",
        "text": "perf",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "echo",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "grep",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "mkdir",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Memory Optimization",
    "topic": "Memory Alignment",
    "questionType": "TRUE_FALSE",
    "questionText": "On ARM architectures, accessing unaligned memory addresses can trigger hardware alignment faults or incur extra bus cycle penalties compared to aligned accesses.",
    "explanation": "True. Proper natural alignment (4-byte for 32-bit, 8-byte for 64-bit) ensures optimal single-cycle memory reads without penalty.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Hardware Tuning",
    "topic": "CPU Frequency Governor",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Linux CPU frequency scaling governor locks all Kunpeng CPU cores at their maximum frequency for consistent high-performance benchmarking?",
    "explanation": "The `performance` governor sets the CPU statically to the highest available frequency, eliminating frequency ramp-up latency.",
    "options": [
      {
        "key": "A",
        "text": "performance",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "powersave",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "ondemand",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "conservative",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Ecosystem",
    "topic": "TaiShan Servers",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the brand name of Huawei's enterprise rackmount servers powered by Kunpeng processors?",
    "explanation": "Huawei TaiShan (e.g., TaiShan 200 series) is the enterprise server family built with Kunpeng 920 processors.",
    "options": [
      {
        "key": "A",
        "text": "Huawei TaiShan Servers",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "FusionServer Pro x86",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Atlas Workstations",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "BladeCenter Alpha",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng Porting Advisor",
    "topic": "Assembly Translation",
    "questionType": "TRUE_FALSE",
    "questionText": "Kunpeng Porting Advisor includes assembly translation capabilities that can automatically convert common x86 assembly instructions into equivalent ARMv8 instructions.",
    "explanation": "True. The tool includes an assembly translation assistant that translates assembly patterns to ARM64 syntax.",
    "options": [
      {
        "key": "A",
        "text": "True",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "False",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Kunpeng DevKit Ecosystem",
    "topic": "IDE Plugins",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How can developers integrate Kunpeng DevKit tools into their daily development workflows?",
    "explanation": "Kunpeng DevKit provides plugins for popular IDEs (VS Code, IntelliJ IDEA) and web-based graphical management consoles.",
    "options": [
      {
        "key": "A",
        "text": "Via plugins for VS Code and IntelliJ IDEA, as well as web consoles",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Only through printed paper manuals",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Only through MS-DOS command prompts",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "By mailing code to Huawei support centers",
        "isCorrect": false
      }
    ]
  }
];
