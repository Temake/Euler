export interface RawQuestion {
  weekNumber: number;
  domain: string;
  topic: string;
  stage?: string;
  questionType: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE';
  questionText: string;
  explanation: string;
  options: {
    key: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export const cloudQuestions: RawQuestion[] = [
  {
    "weekNumber": 1,
    "domain": "Cloud Computing Basics",
    "topic": "Cloud Service Models",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which cloud service model provides virtualized servers, storage, and network infrastructure while leaving the operating system, runtime, and application management to the tenant?",
    "explanation": "Infrastructure as a Service (IaaS) provides virtualized computing infrastructure. The tenant retains full control over the operating system, middleware, and applications.",
    "options": [
      {
        "key": "A",
        "text": "Software as a Service (SaaS)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Infrastructure as a Service (IaaS)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Platform as a Service (PaaS)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Function as a Service (FaaS)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Huawei Cloud Architecture",
    "topic": "Regions & Availability Zones",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following statements regarding Huawei Cloud Regions and Availability Zones (AZs) are CORRECT? (Select all that apply)",
    "explanation": "A Region contains multiple AZs. An AZ comprises one or more physical data centers with independent power and cooling. Different AZs within a Region are connected via low-latency optical private networks. VPCs can span across multiple AZs.",
    "options": [
      {
        "key": "A",
        "text": "An Availability Zone (AZ) contains one or more data centers with independent power and cooling.",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Different AZs in the same Region are interconnected via high-speed, low-latency private networks.",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "A VPC can contain subnets across multiple AZs within the same Region.",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "A single AZ can span across multiple geographical Regions.",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Huawei Cloud Architecture",
    "topic": "Identity and Access Management (IAM)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Huawei Cloud IAM, what mechanism is used to authorize access permissions to an external cloud service (such as allowing ECS to access OBS buckets without hardcoding AK/SK)?",
    "explanation": "An IAM Agency allows a tenant to delegate permissions to another cloud account or cloud service (such as ECS). Temporary security credentials are automatically obtained via instance metadata.",
    "options": [
      {
        "key": "A",
        "text": "IAM User Group",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "IAM Agency",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Virtual Private Cloud Peering",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Access Key ID / Secret Access Key (AK/SK)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Huawei Cloud Architecture",
    "topic": "IAM Security Credentials",
    "questionType": "TRUE_FALSE",
    "questionText": "Permanent Access Keys (AK/SK) can be downloaded multiple times from the Huawei Cloud Management Console after creation.",
    "explanation": "False. For security reasons, the Secret Access Key (SK) can only be viewed or downloaded at creation time. If lost, a new key pair must be generated.",
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
    "weekNumber": 1,
    "domain": "Huawei Cloud Billing",
    "topic": "Billing Modes",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which billing mode on Huawei Cloud offers up to 90% discount compared to Pay-per-use but may be reclaimed by the platform when resource demand spikes?",
    "explanation": "Spot instances allow users to purchase spare compute capacity at steep discounts. However, when platform demand surges, instances may be reclaimed after a grace notice.",
    "options": [
      {
        "key": "A",
        "text": "Yearly/Monthly Billing",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Spot Billing",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Reserved Instance Billing",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "RI Coupon Plan",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Elastic Cloud Server (ECS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When provisioning an Elastic Cloud Server (ECS), which flavor category is most suitable for memory-intensive workloads such as in-memory databases (e.g., Redis, SAP HANA)?",
    "explanation": "Memory-optimized ECS flavors provide a higher memory-to-vCPU ratio (1:8 or 1:16), making them ideal for in-memory databases and large-scale caching.",
    "options": [
      {
        "key": "A",
        "text": "Compute-optimized (c series)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Memory-optimized (m series)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "General-purpose (s series)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Disk-intensive (d series)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "ECS Flavor Modification",
    "questionType": "TRUE_FALSE",
    "questionText": "On Huawei Cloud, an ECS instance must be stopped before its flavor (vCPU and RAM specifications) can be modified.",
    "explanation": "True. In standard Huawei Cloud operations, resizing an ECS requires stopping the instance to ensure data integrity during hardware resource reallocation.",
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
    "domain": "Compute Services",
    "topic": "Bare Metal Server (BMS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary architectural advantage of Huawei Cloud Bare Metal Server (BMS) over Elastic Cloud Server (ECS)?",
    "explanation": "BMS provides dedicated physical servers without virtualization hypervisor overhead, eliminating the noisy neighbor effect and delivering 100% bare-metal performance.",
    "options": [
      {
        "key": "A",
        "text": "Instant provisioning within 5 seconds",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Elimination of virtualization overhead and zero performance penalty",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Automatic multi-AZ live migration",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Ability to share physical CPU cores with other tenants",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Bare Metal Server (BMS)",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which hardware components are utilized by Huawei Cloud BMS to achieve seamless interconnection with VPC software-defined networks? (Select all that apply)",
    "explanation": "Huawei Cloud Bare Metal Servers leverage specialized Smart Data Interface (SDI) acceleration cards and custom hardware offloading to bridge physical interfaces into VPCs and EVS storage.",
    "options": [
      {
        "key": "A",
        "text": "Huawei SDI (Smart Data Interface) acceleration card",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Hardware network offloading modules",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Pure software virtual switches running on CPU",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Host OS hypervisor drivers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Image Management Service (IMS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which type of image on Huawei Cloud IMS is created by a user from an existing ECS or external VHD/QCOW2 file and is visible only to that user's account by default?",
    "explanation": "A Private Image is created by a tenant and contains custom OS/apps. It is private to the creator account unless explicitly shared via IMS.",
    "options": [
      {
        "key": "A",
        "text": "Public Image",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Marketplace Image",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Private Image",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Community Image",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "IMS & Cloud-Init",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What open-source software component must be installed inside a Linux VM image before importing it to Huawei Cloud to allow automatic network and SSH key configuration during ECS creation?",
    "explanation": "Cloud-Init is the industry standard that handles early initialization of cloud instances, including configuring IP addresses, hostnames, and injecting SSH public keys.",
    "options": [
      {
        "key": "A",
        "text": "OpenStack Client",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Cloud-Init",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Ansible Core",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "systemd-networkd",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Auto Scaling (AS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Huawei Cloud Auto Scaling (AS), what component defines the server specifications (flavor, system image, EVS disk configuration, and SSH key pair) used to launch new instances?",
    "explanation": "An AS Configuration defines the template (flavor, image, system disks, key pair) used to spawn instances. An AS Group defines boundaries and network settings.",
    "options": [
      {
        "key": "A",
        "text": "AS Group",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "AS Policy",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "AS Configuration",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "AS Notification",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Auto Scaling (AS)",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which types of scaling policies are supported by Huawei Cloud Auto Scaling (AS)? (Select all that apply)",
    "explanation": "Huawei Cloud Auto Scaling supports: 1. Alarm-based policies (Cloud Eye metrics), 2. Scheduled policies (specific date/time), and 3. Periodic policies (recurring schedule).",
    "options": [
      {
        "key": "A",
        "text": "Alarm-based policy (triggered by Cloud Eye metrics)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Scheduled policy (triggered at a designated timestamp)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Periodic policy (recurring on days/hours)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Hardware degradation speculative policy",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Auto Scaling (AS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What mechanism in Auto Scaling ensures that the scaling group does not trigger successive scaling operations too quickly before newly launched instances finish booting and initializing?",
    "explanation": "The Cooling Down period locks the scaling group from executing further scaling actions for a specified duration after a scaling action completes.",
    "options": [
      {
        "key": "A",
        "text": "Health Check Interval",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Cooling Down Period",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Grace Expiration Time",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Instance Drain Timeout",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Auto Scaling Lifecycle Hook",
    "questionType": "TRUE_FALSE",
    "questionText": "Lifecycle hooks in Auto Scaling allow custom scripts or backup procedures to execute before an instance is terminated and removed from the AS group.",
    "explanation": "True. Lifecycle hooks suspend the removal or addition of instances in an AS group, providing a time window to perform custom operations before final teardown.",
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
    "domain": "Cloud Computing Basics",
    "topic": "Virtualization Technologies",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which type of hypervisor runs directly on the bare-metal physical hardware without an underlying host operating system (e.g., Huawei UVP, VMware ESXi)?",
    "explanation": "Type 1 hypervisors (bare-metal) run directly on host hardware. Type 2 hypervisors run on top of an existing host OS.",
    "options": [
      {
        "key": "A",
        "text": "Type 2 Hypervisor",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Type 1 Hypervisor (Bare-Metal)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Container Runtime",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Microkernel Hypervisor",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "ECS System Disk Replacement",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When replacing the system disk of an ECS instance on Huawei Cloud, what happens to the private IP address and MAC address of the instance?",
    "explanation": "Replacing the system disk changes the OS disk, but preserves the network interfaces, private IP address, and MAC address assigned to the ECS.",
    "options": [
      {
        "key": "A",
        "text": "They are regenerated with random values",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "They remain unchanged",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "The private IP is deleted and must be re-requested",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The entire VPC must be rebuilt",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Huawei Cloud Architecture",
    "topic": "Management Console & APIs",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following methods can be used to interact with and manage Huawei Cloud resources? (Select all that apply)",
    "explanation": "Huawei Cloud resources can be managed via the Web Management Console, RESTful APIs, CLI tools (KooCLI), and Infrastructure-as-Code SDKs / Terraform.",
    "options": [
      {
        "key": "A",
        "text": "Huawei Cloud Management Console (Web GUI)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Huawei Cloud KooCLI (Command Line Interface)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "RESTful open APIs and official SDKs",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Direct physical serial console cable to Huawei data center",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Huawei Cloud Architecture",
    "topic": "IAM Enterprise Projects",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In multi-department enterprises, which Huawei Cloud service enables hierarchical resource isolation, role-based budget management, and independent cost allocation?",
    "explanation": "Enterprise Project Management Service (EPS) enables enterprises to organize cloud resources into logical projects corresponding to departments for centralized management and billing isolation.",
    "options": [
      {
        "key": "A",
        "text": "Enterprise Project Management Service (EPS)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Cloud Eye Service (CES)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Cloud Trace Service (CTS)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Tag Management Service (TMS)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "ECS Deletion Protection",
    "questionType": "TRUE_FALSE",
    "questionText": "Enabling 'Deletion Protection' on a Huawei Cloud ECS instance prevents accidental deletion through both the Web Management Console and API calls.",
    "explanation": "True. When Deletion Protection is enabled, attempts to terminate the ECS fail with an authorization error until the protection switch is explicitly disabled.",
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
    "domain": "Compute Services",
    "topic": "ECS Network Interfaces",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What determines the maximum number of NICs (Network Interface Cards) that an ECS instance can attach on Huawei Cloud?",
    "explanation": "The maximum number of NICs an ECS can attach depends directly on its Flavor specifications (larger flavors support up to 8 or 16 NICs).",
    "options": [
      {
        "key": "A",
        "text": "The ECS Flavor specifications",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Fixed at 1 for all instances",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Fixed at 32 across all regions",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The size of the system disk",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Cloud Computing Basics",
    "topic": "Cloud Deployment Models",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which cloud deployment model combines on-premises private infrastructure with public cloud infrastructure, connected via VPN or Direct Connect, to support cloud bursting?",
    "explanation": "A Hybrid Cloud integrates private cloud and public cloud environments, enabling seamless workload migration and cloud bursting.",
    "options": [
      {
        "key": "A",
        "text": "Public Cloud",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Private Cloud",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Hybrid Cloud",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Community Cloud",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Huawei Cloud Architecture",
    "topic": "Security Compliance",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Under the Huawei Cloud Shared Responsibility Model, which security responsibilities fall on the CUSTOMER for IaaS deployments? (Select all that apply)",
    "explanation": "In IaaS, Huawei Cloud is responsible for security OF the cloud. The customer is responsible for security IN the cloud (OS patches, application code, firewall security group rules, customer data encryption).",
    "options": [
      {
        "key": "A",
        "text": "Physical security of Huawei data centers",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Guest operating system patching and updates",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Security group and firewall configuration",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Data encryption and identity access control",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "ECS Password & Key Pair",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which authentication method is recommended by Huawei Cloud for maximum security when logging in to Linux ECS instances?",
    "explanation": "SSH Key Pair authentication uses asymmetric cryptography and is significantly more secure than passwords against brute-force attacks.",
    "options": [
      {
        "key": "A",
        "text": "Password authentication with 6 characters",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "SSH Key Pair authentication",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Unencrypted Telnet login",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Anonymous guest access",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "ECS Status Lifecycle",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which of the following ECS statuses indicates that the virtual machine has been stopped and no longer incurs compute (vCPU/RAM) charges under the 'Stop and Keep Disks' billing mode?",
    "explanation": "When an ECS is in 'Stopped' status and Stop Mode releases compute resources, vCPU and memory charges halt, leaving only storage (EVS) charges.",
    "options": [
      {
        "key": "A",
        "text": "Running",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Faulty",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Stopped",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Rebooting",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Auto Scaling Health Check",
    "questionType": "TRUE_FALSE",
    "questionText": "If an ECS in an Auto Scaling group fails its periodic health check, AS will automatically delete or stop the faulty instance and launch a healthy one to maintain the target capacity.",
    "explanation": "True. Auto Scaling monitors instance health. If an instance becomes unhealthy, AS triggers a replacement action to restore desired capacity.",
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
    "domain": "Huawei Cloud Architecture",
    "topic": "Audit & Governance",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Huawei Cloud service provides audit trails and records all user operations, API calls, and console activities for compliance and forensic analysis?",
    "explanation": "Cloud Trace Service (CTS) records operations performed on cloud service resources, generating audit logs that can be tracked in real time or shipped to OBS buckets.",
    "options": [
      {
        "key": "A",
        "text": "Cloud Eye Service (CES)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Cloud Trace Service (CTS)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Cloud Backup and Recovery (CBR)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Direct Connect (DC)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "Bare Metal Server Storage",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Can a Huawei Cloud Bare Metal Server attach standard Elastic Volume Service (EVS) block storage disks over the cloud storage network?",
    "explanation": "Yes. Through the SDI hardware acceleration card, BMS instances can mount cloud-native EVS disks (both SCSI and VBD) just like virtualized ECS instances.",
    "options": [
      {
        "key": "A",
        "text": "Yes, BMS can attach and mount EVS disks",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "No, BMS can only use local physical hard drives",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Only if virtualization is enabled inside BMS",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "EVS disks can only be mounted via FTP",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Huawei Cloud Architecture",
    "topic": "Service Quotas",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What should an administrator do when their Huawei Cloud account hits the default quota limit for ECS instances or vCPUs in a specific Region?",
    "explanation": "Service quotas prevent unintended over-allocation. When a limit is reached, users can submit a Quota Increase Request directly in the Management Console.",
    "options": [
      {
        "key": "A",
        "text": "Submit a Quota Increase Request through the console",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Create a completely new cloud account",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Restart the physical data center routers",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Switch to an unsupported overseas region",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Compute Services",
    "topic": "ECS Windows Password Reset",
    "questionType": "TRUE_FALSE",
    "questionText": "On Huawei Cloud, if Cloudbase-Init is installed on a Windows ECS, the administrator password can be reset directly from the Management Console without logging in.",
    "explanation": "True. Cloudbase-Init on Windows allows out-of-band password reset directly through the Huawei Cloud ECS console.",
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
    "domain": "Virtual Private Cloud (VPC)",
    "topic": "VPC CIDR Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which of the following private IP address blocks are standard RFC 1918 CIDR blocks recommended for creating a Virtual Private Cloud (VPC) on Huawei Cloud?",
    "explanation": "Huawei Cloud supports standard RFC 1918 private IPv4 blocks: 10.0.0.0/8\u201310.255.255.0/24, 172.16.0.0/12\u2013172.31.255.0/24, and 192.168.0.0/16\u2013192.168.255.0/24.",
    "options": [
      {
        "key": "A",
        "text": "10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "100.64.0.0/10 and 169.254.0.0/16 only",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "192.0.2.0/24 and 198.51.100.0/24 only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "224.0.0.0/4 multicast block only",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Virtual Private Cloud (VPC)",
    "topic": "Subnet IP Allocation",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When creating a subnet with CIDR block 192.168.1.0/24 on Huawei Cloud, how many IP addresses are reserved by the platform for network infrastructure (network ID, gateway, DNS, broadcast)?",
    "explanation": "In any Huawei Cloud VPC subnet, 5 IP addresses are reserved: .0 (network address), .1 (default gateway), .253 (system reserved), .254 (DNS), and .255 (broadcast address). Thus 251 addresses are assignable.",
    "options": [
      {
        "key": "A",
        "text": "1 IP address",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "5 IP addresses",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "8 IP addresses",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "0 IP addresses (all 256 are available)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Virtual Private Cloud (VPC)",
    "topic": "VPC Route Tables",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What type of route table is automatically created when a new VPC is provisioned, and cannot be deleted while the VPC exists?",
    "explanation": "A Default Route Table is created automatically with each VPC. It controls the routing for all subnets that are not explicitly associated with a custom route table.",
    "options": [
      {
        "key": "A",
        "text": "Custom Route Table",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Default Route Table",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Edge Gateway Route Table",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Dynamic BGP Route Table",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Virtual Private Cloud (VPC)",
    "topic": "VPC Peering Connections",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following statements regarding VPC Peering connections on Huawei Cloud are TRUE? (Select all that apply)",
    "explanation": "VPC Peering connects two VPCs using private IPs. The CIDR blocks of the two VPCs must not overlap. VPC Peering is non-transitive (if VPC A peers with B and B with C, A cannot reach C via B without dedicated configuration).",
    "options": [
      {
        "key": "A",
        "text": "The CIDR blocks of the two peered VPCs must not overlap.",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "VPC Peering routing is non-transitive by default.",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Both VPCs must update their route tables to direct traffic across the peering link.",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "VPC Peering automatically merges the two VPCs into a single broadcast domain.",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Network Security",
    "topic": "Security Groups vs Network ACLs",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary difference in statefulness between Security Groups and Network ACLs on Huawei Cloud?",
    "explanation": "Security Groups are stateful (if inbound traffic is allowed, outbound return traffic is automatically permitted). Network ACLs are stateless (inbound and outbound rules must be defined explicitly).",
    "options": [
      {
        "key": "A",
        "text": "Security Groups are stateful; Network ACLs are stateless",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Security Groups are stateless; Network ACLs are stateful",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Both Security Groups and Network ACLs are stateful",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Both Security Groups and Network ACLs are stateless",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Network Security",
    "topic": "Security Group Default Rules",
    "questionType": "SINGLE_CHOICE",
    "questionText": "By default, what is the traffic filtering behavior of a newly created Security Group before any custom rules are added?",
    "explanation": "A default Security Group denies all inbound traffic from outside the group (allowing intra-group communication) and permits all outbound traffic to any destination.",
    "options": [
      {
        "key": "A",
        "text": "Permits all inbound and denies all outbound traffic",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Denies all inbound traffic from external sources and permits all outbound traffic",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Denies both all inbound and all outbound traffic completely",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Permits all inbound and all outbound traffic unrestricted",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Network Security",
    "topic": "Network ACL Priority Rules",
    "questionType": "TRUE_FALSE",
    "questionText": "Network ACL rules are evaluated in ascending order of their rule priority number (e.g., rule 1 is evaluated before rule 10), and matching stops at the first rule encountered.",
    "explanation": "True. Network ACL rules are processed in priority order (lowest number = highest priority). Once a packet matches a rule, subsequent rules are ignored.",
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
    "domain": "Elastic IP & NAT",
    "topic": "Elastic IP (EIP)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is an Elastic IP (EIP) on Huawei Cloud?",
    "explanation": "An Elastic IP (EIP) is a static public IPv4 address and associated public bandwidth that can be dynamically bound and unbound to cloud resources (ECS, BMS, NAT Gateway, ELB).",
    "options": [
      {
        "key": "A",
        "text": "A private IP address that rotates every 24 hours",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "A static public IP address and bandwidth that can be dynamically bound to instances",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "A hardware load balancer appliance located on-premises",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A DNS record hosted exclusively on domain registrars",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Elastic IP & NAT",
    "topic": "NAT Gateway (SNAT vs DNAT)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which feature of Huawei Cloud NAT Gateway allows multiple ECS instances in a private subnet (without public EIPs) to access the public internet simultaneously?",
    "explanation": "Source NAT (SNAT) translates the private IP addresses of instances inside a VPC into a shared public EIP so they can initiate outbound internet connections.",
    "options": [
      {
        "key": "A",
        "text": "DNAT (Destination NAT)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "SNAT (Source NAT)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "VPN Gateway",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Direct Connect Virtual Interface",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Elastic IP & NAT",
    "topic": "DNAT Functionality",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary function of DNAT (Destination NAT) in a Huawei Cloud NAT Gateway?",
    "explanation": "DNAT maps a public IP address and port to the private IP and port of an ECS, allowing external internet users to access private servers (e.g., web or mail servers).",
    "options": [
      {
        "key": "A",
        "text": "To allow private instances to access external web servers",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "To forward inbound internet traffic to private ECS instances behind the gateway",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "To compress database backups stored in OBS",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To encrypt inter-AZ optical network traffic",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Load Balancing",
    "topic": "Elastic Load Balance (ELB)",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which protocol types are supported by Layer 7 (HTTP/HTTPS) listeners on Huawei Cloud Elastic Load Balance (ELB)? (Select all that apply)",
    "explanation": "ELB supports Layer 4 (TCP, UDP) and Layer 7 (HTTP, HTTPS, and advanced gRPC/QUIC) listeners with URL-based and domain-based content routing.",
    "options": [
      {
        "key": "A",
        "text": "HTTP",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "HTTPS",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Raw ICMP echo packet load balancing",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Layer 7 advanced path routing based on HTTP headers",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Load Balancing",
    "topic": "ELB Session Stickiness",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Elastic Load Balance (ELB), what mechanism ensures that requests from the same client session are consistently forwarded to the exact same backend ECS server?",
    "explanation": "Session Stickiness (session affinity) uses cookies (for HTTP/HTTPS) or source IP hashing (for TCP/UDP) to route subsequent requests from a client to the same backend server.",
    "options": [
      {
        "key": "A",
        "text": "Round Robin Scheduling",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Session Stickiness",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Weighted Least Connections",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Health Check Failure Retries",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Load Balancing",
    "topic": "ELB Health Checks",
    "questionType": "TRUE_FALSE",
    "questionText": "If an ECS in an ELB backend server group fails its health check, ELB immediately shuts down and terminates the faulty ECS instance.",
    "explanation": "False. ELB simply stops forwarding new traffic to the unhealthy instance until it passes health checks again; ELB does not terminate instances (that is the role of Auto Scaling).",
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
    "weekNumber": 2,
    "domain": "Hybrid Networking",
    "topic": "Virtual Private Network (VPN)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which security protocol suite is used by Huawei Cloud Virtual Private Network (VPN) to establish encrypted tunnels over the public internet between on-premises data centers and VPCs?",
    "explanation": "Huawei Cloud VPN uses IPsec (Internet Protocol Security), utilizing IKEv1/IKEv2 for key exchange and ESP for packet encryption and authentication.",
    "options": [
      {
        "key": "A",
        "text": "IPsec (IP Security)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "PPTP (Point-to-Point Tunneling Protocol)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Unencrypted GRE",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "SNMPv1",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Hybrid Networking",
    "topic": "Direct Connect (DC)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "For high-bandwidth, ultra-low latency, and mission-critical enterprise links between an on-premises data center and Huawei Cloud, which dedicated network service is recommended?",
    "explanation": "Direct Connect (DC) provides dedicated physical leased lines (fiber optic connections) bypassing the public internet, offering SLA-backed low latency and bandwidth up to 100 Gbps.",
    "options": [
      {
        "key": "A",
        "text": "Direct Connect (DC)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Public Internet EIP",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Cloud Eye Service",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Elastic File Service",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "Object Storage Service (OBS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the logical storage structure used by Huawei Cloud Object Storage Service (OBS) to store objects?",
    "explanation": "OBS is an object store that uses a flat namespace consisting of Buckets and Objects. Although the console supports visual slashes ('/') resembling folders, there is no real hierarchical directory tree.",
    "options": [
      {
        "key": "A",
        "text": "Hierarchical POSIX tree with inodes and directory tables",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Flat namespace consisting of Buckets and Objects with unique keys",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Block volume sectors addressed by LBA",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Relational database tables with B-tree indexes",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "OBS Storage Classes",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following are valid storage classes available in Huawei Cloud Object Storage Service (OBS)? (Select all that apply)",
    "explanation": "OBS offers four primary storage classes: Standard (frequent access), Warm / Infrequent Access (occasional access), Cold / Archive (long-term archive), and Deep Archive.",
    "options": [
      {
        "key": "A",
        "text": "Standard",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Warm (Infrequent Access)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Cold (Archive)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Quantum Transient",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "OBS Cold Archive Restoration",
    "questionType": "TRUE_FALSE",
    "questionText": "Objects stored in the OBS Cold (Archive) storage class can be downloaded directly and immediately without an initial restore operation.",
    "explanation": "False. Cold (Archive) storage objects must undergo a restoration operation (which typically takes 1 to 5 hours depending on restore tier) before they can be read or downloaded.",
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
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "OBS Lifecycle Management",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which OBS feature automatically transitions objects from Standard storage to Warm or Cold storage after a specified number of days, and eventually deletes them?",
    "explanation": "OBS Lifecycle Management allows administrators to define rules that automatically transition object storage tiers or permanently expire objects based on age.",
    "options": [
      {
        "key": "A",
        "text": "Cross-Region Replication",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Lifecycle Management Rule",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Bucket Policy Enforcement",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Server-Side Encryption",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "OBS Versioning",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What happens when an object with the same name is uploaded to an OBS bucket that has Versioning enabled?",
    "explanation": "When Versioning is enabled, OBS retains all prior versions of an object with unique Version IDs rather than overwriting the original object.",
    "options": [
      {
        "key": "A",
        "text": "The previous object is permanently deleted",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "A new version is created while preserving previous versions",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "The upload is rejected with an HTTP 409 conflict",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The bucket is automatically locked",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "Elastic Volume Service (EVS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What type of cloud storage is Huawei Cloud Elastic Volume Service (EVS)?",
    "explanation": "EVS is persistent block-level storage designed for virtual servers (ECS and BMS). Disks must be partitioned and formatted with a file system before use.",
    "options": [
      {
        "key": "A",
        "text": "Block Storage",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Object Storage",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "File Storage (NFS/CIFS)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Relational Database Storage",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "EVS Device Types (SCSI vs VBD)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which EVS disk device type supports transparent pass-through of SCSI reservation commands, making it mandatory for building shared disk clusters (e.g., Windows WSFC or Oracle RAC)?",
    "explanation": "SCSI disk mode supports SCSI-3 persistent reservations, allowing shared storage access between cluster nodes. VBD (Virtual Block Device) does not pass through SCSI commands.",
    "options": [
      {
        "key": "A",
        "text": "VBD (Virtual Block Device)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "SCSI (Small Computer System Interface)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "IDE Emulated Device",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "USB Mass Storage Device",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "EVS Shared Disks",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On Huawei Cloud, what is the maximum number of ECS instances that can attach a single Shared EVS disk simultaneously?",
    "explanation": "A shared EVS disk can be mounted to a maximum of 16 ECS instances concurrently, typically used for active-active high-availability clusters.",
    "options": [
      {
        "key": "A",
        "text": "2 ECS instances",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "8 ECS instances",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "16 ECS instances",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Unlimited ECS instances",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "EVS Disk Snapshots",
    "questionType": "TRUE_FALSE",
    "questionText": "EVS disk snapshots on Huawei Cloud are incremental; each subsequent snapshot only stores data blocks that changed since the previous snapshot.",
    "explanation": "True. EVS snapshots use redirect-on-write / copy-on-write incremental technology, minimizing storage consumption and backup duration.",
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
    "domain": "Cloud Storage Services",
    "topic": "EVS Disk Expansion",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When expanding the capacity of an EVS data disk on Huawei Cloud, can the disk capacity be scaled up while the disk remains attached to a running ECS?",
    "explanation": "Yes. Huawei Cloud supports online disk expansion for data disks. After expanding the volume in the console, the administrator only needs to resize the file system in the OS.",
    "options": [
      {
        "key": "A",
        "text": "Yes, online disk expansion is supported without detaching the disk",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "No, the ECS must be permanently deleted",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Only if the disk capacity is reduced",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Only during planned quarterly maintenance windows",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "Scalable File Service (SFS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which shared network file system protocols are supported by Huawei Cloud Scalable File Service (SFS) for Linux and Windows instances?",
    "explanation": "SFS supports standard Network File System (NFS) for Linux and Common Internet File System (CIFS / SMB) for Windows, allowing thousands of ECSs to share storage concurrently.",
    "options": [
      {
        "key": "A",
        "text": "NFS (Linux) and CIFS (Windows)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "FTP and SFTP only",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Fibre Channel over IP only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Raw NVMe-oF only",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "SFS Turbo Performance",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which tier of Huawei Cloud Scalable File Service delivers microsecond-level latency and hundreds of thousands of IOPS for HPC, AI training, and container workloads?",
    "explanation": "SFS Turbo is an enterprise-grade high-performance distributed file storage service that delivers sub-millisecond latencies and high throughput for container and AI scenarios.",
    "options": [
      {
        "key": "A",
        "text": "SFS Capacity-oriented",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "SFS Turbo",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "OBS Cold Archive",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Tape Storage Vault",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "Data Encryption via KMS",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following Huawei Cloud storage services can integrate with Key Management Service (KMS) for envelope encryption of data at rest? (Select all that apply)",
    "explanation": "Huawei Cloud OBS, EVS, SFS, and CBR can all integrate with KMS to encrypt data at rest using customer-managed keys (CMK) or default service keys.",
    "options": [
      {
        "key": "A",
        "text": "Object Storage Service (OBS)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Elastic Volume Service (EVS)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Scalable File Service (SFS)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Direct Connect physical cable jackets",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Backup & Disaster Recovery",
    "topic": "Cloud Backup and Recovery (CBR)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Huawei Cloud service provides unified, policy-based backup for ECS instances, BMS, EVS disks, and SFS Turbo file systems using storage backup vaults?",
    "explanation": "Cloud Backup and Recovery (CBR) provides unified backup management with backup policies, crash-consistent or application-consistent backups, and cross-region replication.",
    "options": [
      {
        "key": "A",
        "text": "Cloud Backup and Recovery (CBR)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Cloud Eye Service (CES)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Auto Scaling (AS)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Virtual Private Network (VPN)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Cloud Storage Services",
    "topic": "OBS Cross-Region Replication",
    "questionType": "TRUE_FALSE",
    "questionText": "Cross-Region Replication (CRR) in OBS asynchronously replicates newly uploaded objects from a source bucket in one Region to a destination bucket in another Region for disaster recovery.",
    "explanation": "True. OBS CRR automatically copies new objects across different Regions to achieve geographic redundancy and business continuity.",
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
    "domain": "Relational Database Service (RDS)",
    "topic": "RDS Engine Support",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which relational database engines are officially supported by Huawei Cloud Relational Database Service (RDS)? (Select all that apply)",
    "explanation": "Huawei Cloud RDS officially supports MySQL, PostgreSQL, and Microsoft SQL Server as fully managed database services with automated backups and high availability.",
    "options": [
      {
        "key": "A",
        "text": "RDS for MySQL",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "RDS for PostgreSQL",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "RDS for SQL Server",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "RDS for SQLite Embedded",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Relational Database Service (RDS)",
    "topic": "RDS High Availability Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In an RDS Primary/Standby deployment on Huawei Cloud, how is data synchronized between the primary and standby DB instances?",
    "explanation": "RDS uses synchronous or semi-synchronous replication to stream transaction logs (e.g., MySQL binlog) to the standby instance, ensuring zero data loss and automated failover.",
    "options": [
      {
        "key": "A",
        "text": "Nightly CSV export and import",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Synchronous or semi-synchronous replication of transaction logs (binlog/WAL)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Manual replication triggered by database administrator",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Periodic disk snapshot cloning every 24 hours",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Relational Database Service (RDS)",
    "topic": "RDS Read Replicas",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary purpose of creating Read Replicas for an RDS MySQL database instance on Huawei Cloud?",
    "explanation": "Read Replicas offload read-heavy query traffic from the primary DB instance, scaling read throughput horizontally for read-intensive applications.",
    "options": [
      {
        "key": "A",
        "text": "To process write transactions with ACID isolation",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "To offload read queries and improve read throughput",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "To store encrypted password hashes",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To serve as a cold tape backup archive",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Relational Database Service (RDS)",
    "topic": "RDS Automated Backups & PITR",
    "questionType": "TRUE_FALSE",
    "questionText": "Huawei Cloud RDS supports Point-in-Time Recovery (PITR), allowing an administrator to restore a database to any specific second within the retention period.",
    "explanation": "True. By combining physical automated snapshots and archived binlog transaction logs, RDS can reconstruct database state to any specific second within the retention window.",
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
    "domain": "NoSQL Database Services",
    "topic": "GeminiDB Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the core architectural characteristic of Huawei Cloud GeminiDB multi-model NoSQL service?",
    "explanation": "GeminiDB features a decoupled compute-and-storage architecture backed by Huawei's distributed Taurus storage, allowing compute nodes and storage to scale independently.",
    "options": [
      {
        "key": "A",
        "text": "Shared-nothing architecture with local attached SATA drives",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Decoupled compute and storage with a distributed shared storage pool",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Single-thread in-memory cache without persistence",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Flat CSV file storage on public FTP servers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "NoSQL Database Services",
    "topic": "GeminiDB Protocol Compatibility",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which industry-standard NoSQL database APIs and protocols are compatible with Huawei Cloud GeminiDB? (Select all that apply)",
    "explanation": "GeminiDB offers protocol-compatible engines for Cassandra, MongoDB, Redis, and InfluxDB, allowing migration with zero code changes.",
    "options": [
      {
        "key": "A",
        "text": "GeminiDB Cassandra-compatible",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "GeminiDB Mongo-compatible",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "GeminiDB Redis-compatible",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "GeminiDB InfluxDB-compatible",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Cloud Native Foundations",
    "topic": "Containers vs Virtual Machines",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Linux kernel features provide resource isolation and resource limiting for Docker containers respectively?",
    "explanation": "Namespaces provide isolation (PID, network, mount, IPC, UTS, user), while Control Groups (cgroups) enforce resource allocation limits (CPU, memory, I/O).",
    "options": [
      {
        "key": "A",
        "text": "Namespaces (isolation) and cgroups (resource limits)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "cgroups (isolation) and SELinux (resource limits)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Hypervisor VT-x and BIOS firmware",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "IPtables and Network ACLs",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Docker & Container Basics",
    "topic": "Dockerfile Instructions",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In a Dockerfile, which instruction specifies the base parent image upon which subsequent build layers are added?",
    "explanation": "The 'FROM' instruction initializes a new build stage and sets the Base Image for subsequent instructions.",
    "options": [
      {
        "key": "A",
        "text": "RUN",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "FROM",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "ENTRYPOINT",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "BASE",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Docker & Container Basics",
    "topic": "CMD vs ENTRYPOINT",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the difference between CMD and ENTRYPOINT in a Dockerfile when arguments are passed at `docker run` time?",
    "explanation": "ENTRYPOINT sets the default executable that will always run, while CMD specifies default arguments that can be completely overridden by arguments passed to `docker run`.",
    "options": [
      {
        "key": "A",
        "text": "CMD cannot be overridden; ENTRYPOINT is ignored",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "ENTRYPOINT defines the fixed executable; CMD provides default arguments that can be overridden",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Both instructions are identical in function",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "CMD is used only for Windows containers; ENTRYPOINT for Linux",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Kubernetes Architecture",
    "topic": "K8s Control Plane Components",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following are core components of the Kubernetes Control Plane (Master)? (Select all that apply)",
    "explanation": "The Kubernetes Control Plane consists of kube-apiserver, etcd (distributed key-value store), kube-scheduler, and kube-controller-manager.",
    "options": [
      {
        "key": "A",
        "text": "kube-apiserver",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "etcd",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "kube-scheduler",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "kube-controller-manager",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Kubernetes Architecture",
    "topic": "K8s Worker Node Components",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which agent runs on each Kubernetes worker node to ensure that containers described in PodSpecs are running and healthy?",
    "explanation": "kubelet is the primary node agent that registers nodes with the apiserver and ensures the containers described in PodSpecs are running and healthy.",
    "options": [
      {
        "key": "A",
        "text": "kube-proxy",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "kubelet",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "containerd-shim",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "etcdctl",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Kubernetes Core Concepts",
    "topic": "K8s Pod",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the smallest deployable and manageable computing unit in Kubernetes?",
    "explanation": "A Pod is the smallest execution unit in Kubernetes. It encapsulates one or more containers that share network namespace (IP address) and storage volumes.",
    "options": [
      {
        "key": "A",
        "text": "Container",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Pod",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Deployment",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Namespace",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Kubernetes Core Concepts",
    "topic": "K8s Deployment",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Kubernetes workload controller provides declarative updates for Pods, managing ReplicaSets to enable zero-downtime rolling updates and rollbacks?",
    "explanation": "A Deployment provides declarative management for Pods and ReplicaSets, handling automated rolling updates, rollbacks, and replica scaling.",
    "options": [
      {
        "key": "A",
        "text": "StatefulSet",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Deployment",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "DaemonSet",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Job",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Kubernetes Core Concepts",
    "topic": "K8s StatefulSet",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Kubernetes controller is specifically designed for stateful workloads requiring stable, unique network identifiers and persistent storage bindings (e.g., ZooKeeper, MySQL clusters)?",
    "explanation": "StatefulSet manages the deployment and scaling of a set of Pods, providing guarantees about the ordering and uniqueness of Pod network identifiers and persistent volumes.",
    "options": [
      {
        "key": "A",
        "text": "Deployment",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "StatefulSet",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "DaemonSet",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "ReplicaSet",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Kubernetes Core Concepts",
    "topic": "K8s DaemonSet",
    "questionType": "TRUE_FALSE",
    "questionText": "A Kubernetes DaemonSet ensures that all (or some designated) worker nodes run exactly one copy of a specific Pod, commonly used for log collection and monitoring agents.",
    "explanation": "True. DaemonSets automatically deploy a copy of the specified Pod on every node in the cluster (e.g., Prometheus node-exporter, Fluentd).",
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
    "domain": "Kubernetes Networking",
    "topic": "K8s Service Types",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which type of Kubernetes Service exposes the Service on each node's IP at a static port (typically in the 30000\u201332767 range)?",
    "explanation": "NodePort exposes the Service on each Node's IP at a static assigned port. External traffic can access the Service by requesting <NodeIP>:<NodePort>.",
    "options": [
      {
        "key": "A",
        "text": "ClusterIP",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "NodePort",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "ExternalName",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Headless Service",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Kubernetes Networking",
    "topic": "K8s Ingress",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Kubernetes resource manages external HTTP/HTTPS access to services within a cluster, providing Layer 7 routing based on hostnames and URL paths?",
    "explanation": "An Ingress exposes HTTP and HTTPS routes from outside the cluster to services within the cluster, handling hostname and URI-based traffic distribution.",
    "options": [
      {
        "key": "A",
        "text": "ClusterIP",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Ingress",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "NetworkPolicy",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "ConfigMap",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Kubernetes Configuration",
    "topic": "ConfigMap & Secret",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary difference in use case between a ConfigMap and a Secret in Kubernetes?",
    "explanation": "ConfigMaps store non-confidential configuration data in plaintext key-value pairs, whereas Secrets store sensitive data (passwords, tokens, keys) encoded in Base64.",
    "options": [
      {
        "key": "A",
        "text": "ConfigMaps store non-sensitive config; Secrets store sensitive credentials (passwords, certificates)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ConfigMaps store container images; Secrets store pod logs",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Secrets can only be used by root containers; ConfigMaps only by guest users",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "ConfigMaps are stored on disk; Secrets are stored in public DNS",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Cloud Container Engine (CCE)",
    "topic": "CCE Cluster Types",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which cluster architecture of Huawei Cloud CCE uses the high-performance Yangtse network engine, allocating container ENIs directly to pods to eliminate overlay packet encapsulation overhead?",
    "explanation": "CCE Turbo clusters utilize the Yangtse network engine to bind Elastic Network Interfaces (ENIs) directly to Pods, reducing latency by 20% and eliminating overlay encapsulation.",
    "options": [
      {
        "key": "A",
        "text": "CCE Standard Cluster",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "CCE Turbo Cluster",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Legacy Swarm Cluster",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Virtualbox Bridge Cluster",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Cloud Container Engine (CCE)",
    "topic": "Node Pools & Autoscaling",
    "questionType": "TRUE_FALSE",
    "questionText": "Huawei Cloud CCE Node Pools support cluster autoscaling, automatically provisioning new ECS nodes when Pods cannot be scheduled due to insufficient CPU or RAM resources.",
    "explanation": "True. The CCE Cluster Autoscaler monitors pending pods and automatically expands node pools with new ECS instances to meet scheduling demands.",
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
    "domain": "Cloud Container Instance (CCI)",
    "topic": "Serverless Container Features",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the key characteristic of Huawei Cloud Container Instance (CCI) compared to Cloud Container Engine (CCE)?",
    "explanation": "CCI is a serverless container engine where users run containers without managing or paying for underlying cluster VM nodes, billed strictly per second of container runtime.",
    "options": [
      {
        "key": "A",
        "text": "Users must configure Linux kernel parameters on physical host servers",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Serverless operation with zero node management and per-second billing",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Containers must run exclusively on 32-bit hardware",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "It only supports Windows Server 2003 containers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Cloud Container Instance (CCI)",
    "topic": "Container Isolation Security",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which technology is leveraged by Huawei Cloud CCI to provide hardware-level kernel isolation between tenant containers on shared physical hosts?",
    "explanation": "CCI uses Kata Containers (lightweight microVM technology) to run each container in a dedicated kernel, providing hypervisor-grade isolation without sacrificing container boot speed.",
    "options": [
      {
        "key": "A",
        "text": "Kata Containers (microVM technology)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Standard chroot command",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Pure software process isolation with shared root user",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "VirtualBox GUI sessions",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Software Repository for Container",
    "topic": "SWR Features",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which features are provided by Huawei Cloud Software Repository for Container (SWR)? (Select all that apply)",
    "explanation": "SWR provides full container image lifecycle management: private and public registries, image vulnerability scanning, fine-grained access permissions, and cross-region replication.",
    "options": [
      {
        "key": "A",
        "text": "Hosting public and private container image repositories",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Automated vulnerability scanning for container images",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Cross-region image synchronization",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Automatic physical motherboard soldering",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Application Service Mesh (ASM)",
    "topic": "Service Mesh Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Huawei Cloud Application Service Mesh (ASM) is built on which open-source project and uses which sidecar proxy to intercept microservice communication?",
    "explanation": "ASM is built on open-source Istio and injects Envoy sidecar proxies alongside application containers to transparently manage service-to-service traffic.",
    "options": [
      {
        "key": "A",
        "text": "Apache Dubbo with Zookeeper",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Istio control plane with Envoy sidecar proxies",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Spring Cloud Eureka with Ribbon",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Nginx standalone reverse proxy",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Application Service Mesh (ASM)",
    "topic": "Canary Release & Traffic Shifting",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which capability of ASM allows an operations team to route 10% of production HTTP requests to a new v2 release and 90% to v1 based on weighted routing rules?",
    "explanation": "Traffic Shifting (Canary Release) in ASM allows progressive delivery by splitting user traffic between different service versions using Istio VirtualServices.",
    "options": [
      {
        "key": "A",
        "text": "Traffic Shifting (Canary Release)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Mutual TLS Encryption",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Pod Horizontal Autoscaling",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "DNS Round Robin Record Override",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Application Service Mesh (ASM)",
    "topic": "Circuit Breaking",
    "questionType": "TRUE_FALSE",
    "questionText": "Circuit Breaking in ASM prevents cascading system failures by automatically isolating unhealthy backend instances when error rates or connection pools exceed thresholds.",
    "explanation": "True. Circuit Breaking stops sending requests to overloaded or failing instances, allowing them to recover without bringing down the entire microservice chain.",
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
    "domain": "Cloud Native Storage",
    "topic": "PersistentVolume (PV) & PVC",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Kubernetes on Huawei Cloud CCE, which object represents a storage claim requested by a developer without needing to know underlying storage implementation details?",
    "explanation": "A PersistentVolumeClaim (PVC) is a request for storage by a user (specifying size and access modes). It binds to a PersistentVolume (PV) backed by EVS, SFS, or OBS.",
    "options": [
      {
        "key": "A",
        "text": "PersistentVolume (PV)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "PersistentVolumeClaim (PVC)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "StorageClass Driver",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "VolumeAttachment",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Relational Database Service (RDS)",
    "topic": "Parameter Groups",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What Huawei Cloud RDS feature allows database administrators to manage engine configuration parameters (such as `max_connections`, `innodb_buffer_pool_size`) across multiple DB instances simultaneously?",
    "explanation": "Parameter Groups act as templates for database configuration. Modifying a parameter group applies settings across all RDS instances associated with that group.",
    "options": [
      {
        "key": "A",
        "text": "Security Groups",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Parameter Groups",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Subnet Routing Tables",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "IAM User Groups",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Relational Database Service (RDS)",
    "topic": "RDS SSL Connections",
    "questionType": "TRUE_FALSE",
    "questionText": "Huawei Cloud RDS allows enabling SSL/TLS encryption for database connections, encrypting data in transit between applications and the database server.",
    "explanation": "True. RDS supports SSL certificates to encrypt client-to-database communication against packet interception and eavesdropping.",
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
    "domain": "Cloud Native Architecture",
    "topic": "Microservices Principles",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which design principle is fundamental to Cloud Native microservices architecture?",
    "explanation": "Microservices are loosely coupled, independently deployable services that communicate via lightweight APIs (HTTP/REST or gRPC) with decentralized data management.",
    "options": [
      {
        "key": "A",
        "text": "Monolithic single executable with a single shared global database",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Loosely coupled, independently deployable services communicating via lightweight APIs",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "All services must run on the exact same physical CPU socket",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Complete absence of automated CI/CD pipelines",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "AI Basics & Concepts",
    "topic": "AI Hierarchy",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which of the following correctly describes the hierarchical relationship between Artificial Intelligence (AI), Machine Learning (ML), and Deep Learning (DL)?",
    "explanation": "Artificial Intelligence is the broadest field. Machine Learning is a subset of AI, and Deep Learning is a subset of Machine Learning utilizing multi-layer deep neural networks.",
    "options": [
      {
        "key": "A",
        "text": "Deep Learning includes Machine Learning, which includes AI",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "AI includes Machine Learning, which includes Deep Learning",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Machine Learning and Deep Learning are completely unrelated to AI",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Machine Learning includes AI and Deep Learning",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Machine Learning Paradigms",
    "topic": "Supervised Learning",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which type of machine learning paradigm relies on training datasets consisting of both input features ($X$) and ground-truth target labels ($Y$)?",
    "explanation": "Supervised Learning trains models using labeled data pairs $(X, Y)$ to learn a mapping function from inputs to outputs (e.g., classification, regression).",
    "options": [
      {
        "key": "A",
        "text": "Supervised Learning",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Unsupervised Learning",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Reinforcement Learning",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Self-Supervised Learning without labels",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Machine Learning Paradigms",
    "topic": "Unsupervised Learning Algorithms",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which of the following algorithms is a classic example of Unsupervised Learning used to partition unlabeled data points into $K$ distinct clusters?",
    "explanation": "K-Means is a classic unsupervised clustering algorithm that groups unlabeled data into $K$ clusters by minimizing distance to cluster centroids.",
    "options": [
      {
        "key": "A",
        "text": "Linear Regression",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "K-Means Clustering",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Support Vector Machine with labeled classes",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Decision Tree Classifier",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Deep Learning Fundamentals",
    "topic": "Activation Functions",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary purpose of introducing non-linear activation functions (such as ReLU, Sigmoid) into neural network layers?",
    "explanation": "Without non-linear activation functions, any multi-layer neural network collapses into a single linear combination, incapable of learning complex non-linear patterns.",
    "options": [
      {
        "key": "A",
        "text": "To enable the neural network to approximate complex non-linear functions",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "To convert 32-bit floating point numbers to integers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "To compress weights into hard disk storage",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To prevent network interface cards from dropping packets",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Deep Learning Fundamentals",
    "topic": "ReLU Activation Function",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the mathematical definition of the Rectified Linear Unit (ReLU) activation function for an input $x$?",
    "explanation": "ReLU is defined as $f(x) = \\max(0, x)$. It outputs $x$ if $x > 0$, and 0 otherwise, helping alleviate vanishing gradients during backpropagation.",
    "options": [
      {
        "key": "A",
        "text": "f(x) = 1 / (1 + e^(-x))",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "f(x) = max(0, x)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "f(x) = tanh(x)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "f(x) = x^2",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Deep Learning Fundamentals",
    "topic": "Vanishing Gradient Problem",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why does the traditional Sigmoid activation function often suffer from the Vanishing Gradient problem in deep multi-layer neural networks?",
    "explanation": "The maximum derivative of the Sigmoid function is 0.25. As gradients are multiplied backward across many layers during backpropagation, the gradients shrink exponentially toward zero.",
    "options": [
      {
        "key": "A",
        "text": "Because its derivative is at most 0.25, causing gradients to diminish rapidly through multiple layers",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Because its output is unbounded and causes arithmetic overflow",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Because it requires imaginary numbers",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Because it can only execute on CPU cores",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Deep Learning Fundamentals",
    "topic": "Loss Functions",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which loss function is standardly used for training multi-class classification neural networks paired with a Softmax output layer?",
    "explanation": "Categorical Cross-Entropy loss measures the dissimilarity between predicted probability distributions (from Softmax) and the true one-hot encoded labels.",
    "options": [
      {
        "key": "A",
        "text": "Mean Squared Error (MSE)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Cross-Entropy Loss",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Mean Absolute Percentage Error (MAPE)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Huber Loss for outlier regression",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Deep Learning Optimization",
    "topic": "Gradient Descent & Adam",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which popular optimization algorithm combines the advantages of Momentum (first-moment estimate) and RMSProp (second-moment estimate of squared gradients)?",
    "explanation": "Adam (Adaptive Moment Estimation) maintains exponentially decaying averages of past gradients (momentum) and past squared gradients (adaptive learning rates).",
    "options": [
      {
        "key": "A",
        "text": "Standard Batch Gradient Descent",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Adam Optimizer",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Bubble Sort Optimization",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Simulated Annealing without gradients",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Deep Learning Fundamentals",
    "topic": "Overfitting & Regularization",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following techniques are commonly used to mitigate Overfitting in deep learning models? (Select all that apply)",
    "explanation": "Overfitting (high variance) is addressed by Dropout, L1/L2 weight regularization, data augmentation, early stopping, and adding more training data.",
    "options": [
      {
        "key": "A",
        "text": "Dropout (randomly deactivating neurons during training)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "L2 Weight Decay (Ridge Regularization)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Data Augmentation (cropping, flipping, rotation)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Increasing model parameters ten-fold without adding training data",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Computer Vision (CV)",
    "topic": "Convolutional Neural Networks (CNN)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What key property of convolutional layers in CNNs allows the same filter kernel to detect features (such as edges) anywhere across an input image?",
    "explanation": "Weight sharing (parameter sharing) and translation invariance allow the same learned kernel weights to slide across the entire spatial area of the input.",
    "options": [
      {
        "key": "A",
        "text": "Full matrix inversion",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Parameter (Weight) Sharing across spatial locations",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Recurrent temporal memory loops",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Random weight re-initialization per pixel",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Computer Vision (CV)",
    "topic": "Pooling Operation",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary function of Max Pooling layers in Convolutional Neural Networks?",
    "explanation": "Max Pooling downsamples spatial dimensions (width and height), reducing the number of parameters and computation while providing spatial translation invariance.",
    "options": [
      {
        "key": "A",
        "text": "To downsample feature maps and reduce spatial dimensions and computation",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "To increase the image resolution for display",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "To compute gradients during backpropagation",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To encrypt image channels",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Computer Vision (CV)",
    "topic": "ResNet & Residual Connections",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What architectural innovation introduced in ResNet (Residual Network) solved the degradation problem when training extremely deep neural networks (100+ layers)?",
    "explanation": "ResNet introduced Skip Connections (residual connections / shortcut connections) that allow gradients to flow directly through identity mappings: $F(x) + x$.",
    "options": [
      {
        "key": "A",
        "text": "Fully connected feedback loops",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Residual shortcut connections (identity mappings)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Replacing all convolutions with decision trees",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Elimination of all activation functions",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Computer Vision (CV)",
    "topic": "Object Detection Algorithms",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which of the following object detection algorithms is a single-stage detector known for real-time inference speed by predicting bounding boxes directly in a single pass?",
    "explanation": "YOLO (You Only Look Once) is a single-stage detector that predicts bounding boxes and class probabilities directly from full images in a single forward pass.",
    "options": [
      {
        "key": "A",
        "text": "Faster R-CNN (Two-stage with RPN)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "YOLO (You Only Look Once)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "R-CNN with selective search",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Mask R-CNN",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Computer Vision (CV)",
    "topic": "Non-Maximum Suppression (NMS)",
    "questionType": "TRUE_FALSE",
    "questionText": "Non-Maximum Suppression (NMS) is used in object detection post-processing to eliminate redundant, overlapping bounding boxes that predict the same object.",
    "explanation": "True. NMS sorts detected candidate boxes by confidence score and removes overlapping boxes with Intersection over Union (IoU) above a threshold.",
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
    "domain": "Natural Language Processing (NLP)",
    "topic": "Word Embeddings",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which classic NLP word embedding technique represents words as dense semantic vectors where semantically similar words are close in vector space?",
    "explanation": "Word2Vec (using Continuous Bag of Words or Skip-Gram architectures) learns continuous dense vector representations capturing semantic and syntactic relationships.",
    "options": [
      {
        "key": "A",
        "text": "One-Hot Encoding with sparse vectors",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Word2Vec",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "ASCII code table mapping",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Morse code encoding",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Natural Language Processing (NLP)",
    "topic": "Recurrent Neural Networks (RNN)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What gating mechanism in Long Short-Term Memory (LSTM) networks determines how much of the previous cell state information should be discarded?",
    "explanation": "The Forget Gate in an LSTM computes a value between 0 and 1 for each number in the cell state $C_{t-1}$, where 0 means 'completely discard' and 1 means 'completely retain'.",
    "options": [
      {
        "key": "A",
        "text": "Input Gate",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Forget Gate",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Output Gate",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Reset Gate",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Transformer Architecture",
    "topic": "Self-Attention Mechanism",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In the Transformer architecture, what three vector projections are computed for each token in the Self-Attention mechanism?",
    "explanation": "Self-Attention projects each token embedding into Query ($Q$), Key ($K$), and Value ($V$) vectors, computing attention scores as $\\text{Softmax}(QK^T / \\sqrt{d_k})V$.",
    "options": [
      {
        "key": "A",
        "text": "Query (Q), Key (K), and Value (V)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Queue, Kernel, and Variable",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Quantum, Kinetic, and Velocity",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Question, Knowledge, and Verification",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Transformer Architecture",
    "topic": "Positional Encoding",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is Positional Encoding necessary in Transformer models?",
    "explanation": "Unlike RNNs that process sequences sequentially step-by-step, Transformers process all tokens simultaneously (in parallel). Without Positional Encoding, the model has no awareness of word order.",
    "options": [
      {
        "key": "A",
        "text": "To encode GPS coordinates into input text",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "To inject token sequence order information into the parallelized attention mechanism",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "To compress vocabulary size",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To prevent memory leaks in GPU VRAM",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Large Language Models (LLM)",
    "topic": "LLM Training Stages",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "What are the standard sequential training stages in modern Large Language Model development? (Select all that apply)",
    "explanation": "Modern LLMs typically undergo: 1. Self-supervised Pre-training on massive text corpora, 2. Supervised Fine-Tuning (SFT) on instruction-response pairs, and 3. Alignment via RLHF / DPO.",
    "options": [
      {
        "key": "A",
        "text": "Self-supervised Pre-training (Next token prediction on massive corpora)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Supervised Fine-Tuning (SFT on high-quality instructions)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Reinforcement Learning from Human Feedback (RLHF / Direct Preference Optimization)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Analog tape erasure and manual transistor tuning",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Large Language Models (LLM)",
    "topic": "Parameter-Efficient Fine-Tuning (PEFT)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Parameter-Efficient Fine-Tuning (PEFT) technique freezes the pre-trained model weights and injects low-rank trainable rank-decomposition matrices into transformer layers?",
    "explanation": "LoRA (Low-Rank Adaptation) freezes base model weights and injects trainable low-rank decomposition matrices ($A$ and $B$) into attention projection layers, cutting trainable parameters by over 99%.",
    "options": [
      {
        "key": "A",
        "text": "Full Parameter Fine-Tuning",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "LoRA (Low-Rank Adaptation)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "K-Means Clustering",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Data Pruning",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Large Language Models (LLM)",
    "topic": "Prompt Engineering",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which prompt engineering technique prompts the model to break down a multi-step complex problem into explicit intermediate reasoning steps before giving a final answer?",
    "explanation": "Chain-of-Thought (CoT) prompting encourages language models to generate a step-by-step reasoning trail ('Let's think step by step'), significantly improving complex reasoning accuracy.",
    "options": [
      {
        "key": "A",
        "text": "Zero-Shot Direct Query",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Chain-of-Thought (CoT) Prompting",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Negative Prompt Masking",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Binary Token Inversion",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "RAG Architecture",
    "topic": "Retrieval-Augmented Generation (RAG)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary motivation for deploying a Retrieval-Augmented Generation (RAG) architecture alongside a Large Language Model?",
    "explanation": "RAG retrieves relevant external domain knowledge from document databases and injects it into the prompt context, mitigating LLM hallucinations and providing up-to-date private enterprise data.",
    "options": [
      {
        "key": "A",
        "text": "To increase GPU memory consumption",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "To ground model responses with accurate enterprise knowledge and reduce hallucinations",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "To permanently replace all neural network weights with SQL queries",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To avoid needing any LLM inference at runtime",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "RAG Architecture",
    "topic": "Vector Database & Embeddings",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In a RAG pipeline, which mathematical metric is most commonly computed between the user query embedding and document chunk embeddings to find the most relevant context?",
    "explanation": "Cosine Similarity measures the cosine of the angle between two multi-dimensional dense embedding vectors, assessing semantic similarity independent of vector magnitude.",
    "options": [
      {
        "key": "A",
        "text": "Cosine Similarity",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Hamming Code Parity",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Fibonacci Ratio",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Baud Rate Multiplier",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "RAG Architecture",
    "topic": "Document Chunking",
    "questionType": "TRUE_FALSE",
    "questionText": "In RAG pipelines, chunking large documents into smaller semantic sections with overlapping boundaries helps preserve context and prevents text truncations across token limits.",
    "explanation": "True. Semantic chunking with token overlap ensures that critical sentences spanning boundaries are not bifurcated, maintaining contextual coherence during vector retrieval.",
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
    "domain": "AI Agents",
    "topic": "Agent Frameworks",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which agentic reasoning pattern integrates Reasoning (thinking) and Acting (calling tools/APIs) in an iterative loop to solve user tasks?",
    "explanation": "The ReAct (Reasoning + Acting) framework enables LLM agents to interleave thought generation with action execution (e.g., search, calculate) and observation handling.",
    "options": [
      {
        "key": "A",
        "text": "ReAct Framework",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "MapReduce Paradigm",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Fork-Join Thread Pool",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Model-View-Controller Pattern",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "AI Ethics & Safety",
    "topic": "LLM Hallucination",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does the term 'Hallucination' refer to in the context of generative Large Language Models?",
    "explanation": "Hallucination refers to a phenomenon where an LLM generates plausible-sounding but factually false, unverified, or fabricated information with high confidence.",
    "options": [
      {
        "key": "A",
        "text": "Generating plausible-sounding but factually incorrect or fabricated information",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A physical hardware overheating incident on an Ascend chip",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A network timeout caused by dropped Ethernet frames",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A syntax error detected by the Python interpreter",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Reinforcement Learning",
    "topic": "Core Components",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following are fundamental components of a Reinforcement Learning (RL) environment? (Select all that apply)",
    "explanation": "In Reinforcement Learning, an Agent interacts with an Environment by observing States ($S$), executing Actions ($A$), and receiving Rewards ($R$) according to a Policy ($\\pi$).",
    "options": [
      {
        "key": "A",
        "text": "Agent",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Environment & State",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Reward Signal",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Policy (mapping state to action)",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Speech Processing",
    "topic": "Automatic Speech Recognition (ASR)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary function of an Automatic Speech Recognition (ASR) system?",
    "explanation": "ASR systems convert human audio speech signals into textual representations (Speech-to-Text).",
    "options": [
      {
        "key": "A",
        "text": "Converting spoken audio waveform signals into written text",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Converting written text into spoken synthesized speech",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Compressing MP3 music files",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Detecting optical barcode patterns",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Deep Learning Fundamentals",
    "topic": "Data Preprocessing",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is feature normalization/standardization (such as Z-score or Min-Max scaling) commonly applied to numerical input data before training deep neural networks?",
    "explanation": "Normalization brings all features to a similar scale, preventing features with large magnitudes from dominating gradients and accelerating gradient descent convergence.",
    "options": [
      {
        "key": "A",
        "text": "To prevent features with large scales from dominating gradients and accelerate convergence",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "To encrypt sensitive personally identifiable numbers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "To convert continuous numbers into text strings",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To satisfy database primary key unique constraints",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "AI Foundations",
    "topic": "Turing Test",
    "questionType": "TRUE_FALSE",
    "questionText": "The Turing Test was proposed by Alan Turing in 1950 as a benchmark for determining whether a machine can exhibit intelligent behavior indistinguishable from that of a human.",
    "explanation": "True. In his seminal paper 'Computing Machinery and Intelligence', Alan Turing introduced the imitation game (now known as the Turing Test).",
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
    "domain": "ModelArts Platform",
    "topic": "ModelArts Overview",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is Huawei Cloud ModelArts?",
    "explanation": "ModelArts is a full-stack, one-stop AI development platform providing end-to-end capabilities across data management, model development, distributed training, and inference deployment.",
    "options": [
      {
        "key": "A",
        "text": "A standard relational SQL database engine",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "A one-stop AI development platform covering data, development, training, and deployment",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "A DNS resolution and domain registration tool",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "An operating system distribution for arm64 smartphones",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Data Management",
    "topic": "Data Ingestion & Labeling",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which data labeling/annotation modalities are natively supported by ModelArts Data Management? (Select all that apply)",
    "explanation": "ModelArts supports labeling across multiple modalities: image classification/object detection, audio transcription, text classification/NER, and tabular data.",
    "options": [
      {
        "key": "A",
        "text": "Image annotation (bounding boxes, polygons, classification)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Audio annotation (speech transcription, audio classification)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Text annotation (sentiment classification, entity extraction)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Table/Tabular data labeling and feature engineering",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Data Management",
    "topic": "Dataset Versioning",
    "questionType": "TRUE_FALSE",
    "questionText": "ModelArts datasets support version management (e.g., V001, V002), enabling developers to track dataset iterations and ensure reproducible model training experiments.",
    "explanation": "True. ModelArts provides dataset versioning so teams can freeze specific annotated datasets and trace model performance back to exact training data versions.",
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
    "domain": "ModelArts Development",
    "topic": "Dev Environments (Notebook)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which popular web-based interactive development environment is integrated directly into ModelArts for rapid algorithm prototyping and exploratory data analysis?",
    "explanation": "ModelArts integrates JupyterLab interactive web notebooks, allowing developers to write Python code, visualize datasets, and test models interactively.",
    "options": [
      {
        "key": "A",
        "text": "Eclipse Java IDE",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "JupyterLab Notebook",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Vim standalone terminal only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Xcode macOS environment",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Hardware Acceleration",
    "topic": "Ascend AI Processors",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which proprietary Huawei AI processor is used to power high-performance deep learning model training in ModelArts?",
    "explanation": "The Huawei Ascend 910 AI processor is designed for high-throughput deep learning training, delivering industry-leading FP16/INT8 computing power.",
    "options": [
      {
        "key": "A",
        "text": "Huawei Ascend 910 AI Processor",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Intel 8086 Microprocessor",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "ARM Cortex-M0 Microcontroller",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Motorola 68000 Chip",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Ascend Architecture",
    "topic": "DaVinci Core Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Huawei's DaVinci Core architecture on Ascend processors, which computing unit is specialized for massive matrix multiplication and convolution operations?",
    "explanation": "The 3D Cube computing unit is specifically engineered for high-density matrix-matrix multiplication ($A \\times B + C$), the fundamental operation in deep learning.",
    "options": [
      {
        "key": "A",
        "text": "Scalar Unit",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Cube Unit (3D Matrix Engine)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Vector Unit",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Serial Port Controller",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Ascend Software Stack",
    "topic": "CANN Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is Huawei CANN in the Ascend AI software full stack?",
    "explanation": "CANN (Compute Architecture for Neural Networks) is Huawei's heterogeneous computing architecture bridging AI frameworks (MindSpore, PyTorch, TensorFlow) and Ascend hardware.",
    "options": [
      {
        "key": "A",
        "text": "Compute Architecture for Neural Networks (CANN)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Cloud-Assisted Network Name",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Consumer Audio Noise Neutralizer",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Core Access Node Network",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Software Frameworks",
    "topic": "MindSpore AI Framework",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which open-source, all-scenario deep learning framework was developed by Huawei to provide unified APIs across Device, Edge, and Cloud, natively optimized for Ascend NPUs?",
    "explanation": "MindSpore is Huawei's open-source deep learning framework designed for all-scenario AI development with automatic differentiation, auto-parallelism, and on-device inference.",
    "options": [
      {
        "key": "A",
        "text": "Caffe",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "MindSpore",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Theano",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Scikit-Learn",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Model Training",
    "topic": "MoXing Framework",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary role of the MoXing SDK framework in ModelArts training jobs?",
    "explanation": "MoXing is Huawei Cloud's high-performance distributed training acceleration framework that optimizes I/O reading from OBS and automates distributed data parallelism.",
    "options": [
      {
        "key": "A",
        "text": "High-performance distributed training library and high-speed OBS storage I/O wrapper",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A CSS stylesheet library for web frontends",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A database schema migration tool for PostgreSQL",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "An email notification service for training failures",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Model Training",
    "topic": "Distributed Training Paradigms",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which distributed training paradigms are supported by ModelArts when scaling large model training across multiple Ascend nodes? (Select all that apply)",
    "explanation": "ModelArts supports Data Parallelism (splitting batches across devices), Model Parallelism (splitting model layers/tensors across devices), and Pipeline Parallelism.",
    "options": [
      {
        "key": "A",
        "text": "Data Parallelism",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Model (Tensor) Parallelism",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Pipeline Parallelism",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Pure Serial Unithread Execution",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Model Evaluation",
    "topic": "Evaluation Metrics",
    "questionType": "SINGLE_CHOICE",
    "questionText": "For an object detection model trained on ModelArts, which evaluation metric calculates the Area Under the Precision-Recall curve averaged across all target classes?",
    "explanation": "mAP (mean Average Precision) is the standard benchmark metric for object detection accuracy across multiple object classes.",
    "options": [
      {
        "key": "A",
        "text": "Mean Squared Error (MSE)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "mAP (mean Average Precision)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Perplexity (PPL)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "BLEU Score",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Model Deployment",
    "topic": "Deployment Types",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which ModelArts deployment service provides an online HTTP RESTful endpoint with auto-scaling to handle real-time, low-latency prediction requests?",
    "explanation": "Real-time Service deploys models as containerized microservices behind an API endpoint, supporting autoscaling and real-time request-response cycles.",
    "options": [
      {
        "key": "A",
        "text": "Batch Service",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Real-Time Service",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Edge Service with offline dispatch",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Cloud Trace Service",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Model Deployment",
    "topic": "Batch Inference Service",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When an enterprise needs to perform offline inference on millions of images stored in an OBS bucket overnight without exposing a 24/7 web API, which service is most cost-effective?",
    "explanation": "Batch Service reads input datasets from OBS, processes predictions in parallel using temporary compute resources, writes outputs back to OBS, and automatically terminates.",
    "options": [
      {
        "key": "A",
        "text": "Batch Service",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Real-Time Service with dedicated 24/7 servers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Manual manual inspection in JupyterLab",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Direct Connect Lease",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Edge AI Deployment",
    "topic": "Intelligent EdgeFabric (IEF)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Huawei Cloud service integrates with ModelArts to deploy trained AI models down to edge computing hardware (such as Huawei Atlas 500 edge stations)?",
    "explanation": "Intelligent EdgeFabric (IEF) provides cloud-native edge computing management, deploying containerized AI inference models from ModelArts to edge nodes.",
    "options": [
      {
        "key": "A",
        "text": "Intelligent EdgeFabric (IEF)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Virtual Private Network (VPN)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Elastic IP Service",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Cloud Backup and Recovery (CBR)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Model Compression",
    "topic": "Model Quantization",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does Model Quantization achieve during the preparation of deep learning models for fast edge inference?",
    "explanation": "Quantization converts floating-point weights (e.g., FP32) to lower-bit representations (e.g., INT8), reducing memory footprint and accelerating inference speed with minimal loss of accuracy.",
    "options": [
      {
        "key": "A",
        "text": "Converting FP32 model weights to low-bit integers (e.g., INT8) to reduce model size and latency",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Translating Python source code into HTML",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Adding random noise to model weights to test robustness",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Increasing model disk footprint ten-fold",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Model Compression",
    "topic": "Model Pruning",
    "questionType": "TRUE_FALSE",
    "questionText": "Model Pruning removes redundant or near-zero weight connections from neural networks to create sparse, compact models that require less computation.",
    "explanation": "True. Weight pruning identifies and eliminates non-essential parameters, reducing compute cycles and memory consumption without noticeable degradation in accuracy.",
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
    "domain": "ModelArts AI Ecosystem",
    "topic": "AI Gallery",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the function of the AI Gallery within Huawei Cloud ModelArts?",
    "explanation": "AI Gallery is an open AI community hub where developers can share, discover, and reuse pre-trained foundation models, datasets, algorithms, and interactive notebooks.",
    "options": [
      {
        "key": "A",
        "text": "An open community asset marketplace for sharing models, datasets, algorithms, and notebooks",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "An art auction platform for physical paintings",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A physical warehouse for stocking rackmount servers",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A billing calculator for private optical fibers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Huawei Foundation Models",
    "topic": "Huawei Pangu Models Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the core structural philosophy of Huawei Pangu Large Models (Pangu 5.0)?",
    "explanation": "Huawei Pangu models adopt a '5+N+X' hierarchical architecture: 5 foundation models (NLP, CV, Multi-modal, Prediction, Scientific), N industry models (mining, finance, etc.), and X fine-tuned scenario tasks.",
    "options": [
      {
        "key": "A",
        "text": "The '5+N+X' three-tier architecture (Foundation, Industry, and Scenario models)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A single monolithic rule-based expert system",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A pure decision-tree algorithm restricted to tabular CSVs",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "An embedded firmware BIOS utility",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Huawei Foundation Models",
    "topic": "Pangu Scientific Models",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which Huawei Pangu foundation model was featured in Nature for predicting global weather trajectories 10,000 times faster than traditional numerical weather prediction methods?",
    "explanation": "Pangu-Weather is a deep learning-based meteorological prediction model that delivers global weather forecasts with higher accuracy and dramatically lower computational time than traditional numerical methods.",
    "options": [
      {
        "key": "A",
        "text": "Pangu-Finance",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Pangu-Weather",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Pangu-Mining",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Pangu-Railway",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Huawei Foundation Models",
    "topic": "Pangu Drug Design",
    "questionType": "TRUE_FALSE",
    "questionText": "Huawei Pangu Drug Molecule model accelerates small molecule drug discovery by learning molecular graph representations and predicting drug-target interactions.",
    "explanation": "True. Pangu-Drug utilizes molecular structure pre-training to accelerate lead compound screening and drug design cycles from years to months.",
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
    "domain": "ModelArts Automation",
    "topic": "ExeML (Execution Machine Learning)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which zero-code / low-code feature in ModelArts enables non-expert users to train and deploy computer vision or tabular models simply by uploading labeled data?",
    "explanation": "ExeML (AutoML in ModelArts) provides an automated pipeline for data validation, neural architecture search (NAS), model training, hyperparameter optimization, and deployment without writing code.",
    "options": [
      {
        "key": "A",
        "text": "ExeML (Execution Machine Learning / AutoML)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Manual C++ Driver Compilation",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Linux Kernel GDB Debugger",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Direct Register Peeking",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Governance",
    "topic": "Model Lineage & Metadata",
    "questionType": "TRUE_FALSE",
    "questionText": "ModelArts automatically tracks Model Lineage, linking deployed models back to the exact training job, source algorithm code, dataset version, and hyperparameters used to produce them.",
    "explanation": "True. Full lineage tracking ensures compliance, auditability, and reproducibility across the entire machine learning lifecycle.",
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
    "domain": "Ascend AI Hardware",
    "topic": "Ascend 310 vs Ascend 910",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Huawei's Ascend processor lineup, what is the primary target scenario distinction between the Ascend 310 and Ascend 910 chips?",
    "explanation": "Ascend 310 is an energy-efficient AI processor designed for Inference (edge/cloud deployment), while Ascend 910 is an ultra-high performance AI processor designed for Training.",
    "options": [
      {
        "key": "A",
        "text": "Ascend 310 is optimized for Inference; Ascend 910 is optimized for high-power Training",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Ascend 310 is for supercomputing training; Ascend 910 for low-power IoT watches",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Both chips have identical performance and power envelopes",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Ascend 310 is a sound card; Ascend 910 is a display adapter",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Pipeline",
    "topic": "Workflow Orchestration",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which ModelArts component enables MLOps teams to create graphical, automated directed acyclic graph (DAG) pipelines connecting data preprocessing, training, evaluation, and deployment?",
    "explanation": "ModelArts Workflow provides a graphical drag-and-drop tool and Python SDK to orchestrate end-to-end MLOps pipelines with conditional branching and automated triggers.",
    "options": [
      {
        "key": "A",
        "text": "ModelArts Workflow",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Bash script crontab only",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Static HTML link lists",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Windows Batch CMD runner",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Security",
    "topic": "Resource Access Control",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How does ModelArts securely access training datasets stored in a tenant's private OBS buckets without exposing sensitive cloud account passwords?",
    "explanation": "ModelArts uses IAM Agency authorization, allowing the service to assume temporary delegated credentials with least-privilege bucket access policies.",
    "options": [
      {
        "key": "A",
        "text": "Through IAM Agency delegation with temporary security tokens",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "By making all OBS buckets publicly readable to the entire internet",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "By hardcoding root user passwords into open-source repositories",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "By sending unencrypted passwords via plain SMS",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Storage Integration",
    "topic": "High-Speed Storage Binding",
    "questionType": "SINGLE_CHOICE",
    "questionText": "For high-performance deep learning training jobs requiring thousands of random reads on small image files, which storage type should be bound to ModelArts training instances for optimal I/O?",
    "explanation": "SFS Turbo or high-speed local NVMe cache attached via EVS provides extreme IOPS and low latency compared to direct remote object storage calls over HTTP.",
    "options": [
      {
        "key": "A",
        "text": "SFS Turbo or high-speed local cache",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "OBS Cold Archive storage",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Public USB 2.0 thumb drives",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "External magnetic tape reels",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Inference Optimization",
    "topic": "MindSpore Lite",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which lightweight runtime of Huawei MindSpore is tailored for ultra-fast, on-device AI inference on mobile devices, IoT equipment, and embedded sensors?",
    "explanation": "MindSpore Lite is a lightweight, high-performance inference engine with tiny memory footprint and hardware acceleration support for Ascend, GPU, and CPU devices.",
    "options": [
      {
        "key": "A",
        "text": "MindSpore Lite",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "TensorFlow Heavy Enterprise",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "PyTorch Cluster Server",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Hadoop MapReduce",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Model Format",
    "topic": "Ascend Offline Model (.om)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When deploying deep learning models (from PyTorch, ONNX, or TensorFlow) on Huawei Ascend processors via ATC (Ascend Tensor Compiler), what optimized offline model format is produced?",
    "explanation": "The Ascend Tensor Compiler (ATC) compiles third-party neural network models into the Huawei Ascend Offline Model format (.om), optimized for DaVinci hardware execution.",
    "options": [
      {
        "key": "A",
        "text": ".om (Ascend Offline Model)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": ".exe Windows executable",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": ".docx Microsoft Word format",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": ".wav Audio waveform",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "ModelArts Monitoring",
    "topic": "Model Monitoring & Drift Detection",
    "questionType": "TRUE_FALSE",
    "questionText": "ModelArts Model Monitoring tracks deployed service APIs in real time, detecting data drift and prediction degradation to alert engineers when model retraining is needed.",
    "explanation": "True. ModelArts monitors inference input feature distributions and prediction outputs, alerting when real-world production data drifts significantly from the training distribution.",
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
    "domain": "ModelArts Ecosystem",
    "topic": "Huawei ICT Competition Alignment",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In the official Huawei ICT Competition Cloud Track preliminary examination, what is the official syllabus weighting between Cloud services and Artificial Intelligence?",
    "explanation": "According to the official 2026\u20132027 Huawei ICT Competition syllabus, the Cloud Track examination weighting is strictly 60% Cloud Services and 40% Artificial Intelligence.",
    "options": [
      {
        "key": "A",
        "text": "60% Cloud Services and 40% Artificial Intelligence",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "90% Cloud Services and 10% Artificial Intelligence",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "100% Artificial Intelligence and 0% Cloud Services",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "50% openEuler and 50% openGauss",
        "isCorrect": false
      }
    ]
  }
];
