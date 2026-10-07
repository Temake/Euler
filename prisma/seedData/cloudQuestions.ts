export interface RawQuestion {
  weekNumber: number;
  domain: string;
  topic: string;
  stage: string;
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
  // --- WEEK 1: Cloud Basics & Compute Infrastructure ---
  {
    weekNumber: 1,
    domain: 'Cloud Computing Basics',
    topic: 'Cloud Service Models',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Which cloud deployment model provides users with computing resources (such as servers, storage, and networking) while leaving operating system and application management entirely to the tenant?',
    explanation: 'Infrastructure as a Service (IaaS) provides virtualized computing resources, storage, and networking over the internet. The customer is responsible for managing the OS, middleware, and applications.',
    options: [
      { key: 'A', text: 'Software as a Service (SaaS)', isCorrect: false },
      { key: 'B', text: 'Infrastructure as a Service (IaaS)', isCorrect: true },
      { key: 'C', text: 'Platform as a Service (PaaS)', isCorrect: false },
      { key: 'D', text: 'Function as a Service (FaaS)', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'Huawei Cloud Architecture',
    topic: 'Regions & Availability Zones',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which of the following statements regarding Huawei Cloud Regions and Availability Zones (AZs) are CORRECT? (Select all that apply)',
    explanation: 'A Region is a physical geographic area with multiple AZs. An AZ consists of one or more physical data centers with independent power and cooling connected via low-latency optical cables. Latency between AZs within the same Region is typically sub-millisecond.',
    options: [
      { key: 'A', text: 'An Availability Zone (AZ) contains one or more data centers with independent power and cooling systems.', isCorrect: true },
      { key: 'B', text: 'Different AZs within the same Region are interconnected through high-speed, low-latency private networks.', isCorrect: true },
      { key: 'C', text: 'VPCs cannot span across multiple AZs within the same Region.', isCorrect: false },
      { key: 'D', text: 'Deploying ECS instances across multiple AZs enhances application disaster tolerance and high availability.', isCorrect: true }
    ]
  },
  {
    weekNumber: 1,
    domain: 'Compute Services',
    topic: 'Elastic Cloud Server (ECS)',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'When creating an Elastic Cloud Server (ECS) on Huawei Cloud, which resource provides the operating system image, memory, virtual CPU, and disk storage?',
    explanation: 'An ECS is composed of CPU/Memory (Flavor), Image (OS via IMS), EVS disks (storage), and VPC/Subnet (network). Flavors define the vCPU and memory ratio.',
    options: [
      { key: 'A', text: 'Flavor and Image Management Service (IMS)', isCorrect: true },
      { key: 'B', text: 'Direct Connect and Cloud Eye', isCorrect: false },
      { key: 'C', text: 'Object Storage Service and SFS', isCorrect: false },
      { key: 'D', text: 'Auto Scaling Policy and SWR', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'Compute Services',
    topic: 'Bare Metal Server (BMS)',
    stage: 'PRELIMINARY',
    questionType: 'TRUE_FALSE',
    questionText: 'A Bare Metal Server (BMS) on Huawei Cloud is a dedicated physical server that eliminates virtualization overhead, delivering native hardware performance and direct access to CPU hardware instructions.',
    explanation: 'True. BMS provides dedicated physical servers without hypervisor virtualization performance penalties, ideal for core databases, high-performance computing, and virtualization nesting.',
    options: [
      { key: 'A', text: 'True', isCorrect: true },
      { key: 'B', text: 'False', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'Compute Services',
    topic: 'Auto Scaling (AS)',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'In Huawei Cloud Auto Scaling (AS), what triggers an AS group to automatically increase or decrease ECS instances based on real-time CPU utilization or network bandwidth?',
    explanation: 'Auto Scaling relies on Cloud Eye alarm policies or scheduled policies to trigger scaling actions when metrics like CPU or memory cross predefined thresholds.',
    options: [
      { key: 'A', text: 'Cloud Eye Alarm Policy', isCorrect: true },
      { key: 'B', text: 'IAM Role Policy', isCorrect: false },
      { key: 'C', text: 'SFS Turbo Mount Policy', isCorrect: false },
      { key: 'D', text: 'KMS Key Policy', isCorrect: false }
    ]
  },

  // --- WEEK 2: Cloud Network & Storage Services ---
  {
    weekNumber: 2,
    domain: 'Networking Services',
    topic: 'Virtual Private Cloud (VPC)',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'What is the primary difference between a Security Group and a Network Access Control List (ACL) in Huawei Cloud VPC?',
    explanation: 'Security Groups are stateful and operate at the ECS instance (NIC) level, whereas Network ACLs are stateless and operate at the subnet boundary level.',
    options: [
      { key: 'A', text: 'Security Groups operate at the subnet level, while Network ACLs operate at the instance NIC level.', isCorrect: false },
      { key: 'B', text: 'Security Groups are stateful (inbound return traffic is automatically allowed), while Network ACLs are stateless.', isCorrect: true },
      { key: 'C', text: 'Security Groups only support deny rules, whereas Network ACLs only support allow rules.', isCorrect: false },
      { key: 'D', text: 'Network ACLs filter traffic between AZs, while Security Groups filter traffic across Regions.', isCorrect: false }
    ]
  },
  {
    weekNumber: 2,
    domain: 'Networking Services',
    topic: 'Elastic Load Balance (ELB)',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which load balancing protocols are supported by Huawei Cloud Dedicated Elastic Load Balance (ELB)? (Select all that apply)',
    explanation: 'Dedicated ELB supports Layer 4 protocols (TCP, UDP) and Layer 7 protocols (HTTP, HTTPS, and QUIC/gRPC).',
    options: [
      { key: 'A', text: 'TCP', isCorrect: true },
      { key: 'B', text: 'UDP', isCorrect: true },
      { key: 'C', text: 'HTTP / HTTPS', isCorrect: true },
      { key: 'D', text: 'RIPv2', isCorrect: false }
    ]
  },
  {
    weekNumber: 2,
    domain: 'Cloud Storage Services',
    topic: 'OBS vs. EVS vs. SFS',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'An enterprise application requires shared file storage that can be simultaneously mounted by hundreds of ECS Linux instances via standard NFS/CIFS protocols. Which Huawei Cloud storage service is designed for this scenario?',
    explanation: 'Scalable File Service (SFS) provides high-performance, shared file storage accessible over standard NFS/CIFS network protocols for concurrent access across multiple ECS instances.',
    options: [
      { key: 'A', text: 'Elastic Volume Service (EVS)', isCorrect: false },
      { key: 'B', text: 'Object Storage Service (OBS)', isCorrect: false },
      { key: 'C', text: 'Scalable File Service (SFS)', isCorrect: true },
      { key: 'D', text: 'Dedicated Storage Service (DSS)', isCorrect: false }
    ]
  },
  {
    weekNumber: 2,
    domain: 'Cloud Storage Services',
    topic: 'Object Storage Service (OBS)',
    stage: 'PRELIMINARY',
    questionType: 'TRUE_FALSE',
    questionText: 'Huawei Cloud Object Storage Service (OBS) organizes data in a flat namespace of buckets and objects, offering 99.9999999999% (12 nines) data durability.',
    explanation: 'True. OBS is an object-based storage architecture with ultra-high durability (12 9s) designed for unstructured big data, media files, and backups.',
    options: [
      { key: 'A', text: 'True', isCorrect: true },
      { key: 'B', text: 'False', isCorrect: false }
    ]
  },

  // --- WEEK 3: Cloud Databases & Cloud Native ---
  {
    weekNumber: 3,
    domain: 'Database Services',
    topic: 'Relational Database Service (RDS)',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Which of the following database engines is NOT supported natively by Huawei Cloud RDS?',
    explanation: 'Huawei Cloud RDS natively supports MySQL, PostgreSQL, and Microsoft SQL Server. Redis is provided as a distributed cache service (DCS) rather than under RDS.',
    options: [
      { key: 'A', text: 'MySQL', isCorrect: false },
      { key: 'B', text: 'PostgreSQL', isCorrect: false },
      { key: 'C', text: 'Microsoft SQL Server', isCorrect: false },
      { key: 'D', text: 'Redis (Distributed In-Memory)', isCorrect: true }
    ]
  },
  {
    weekNumber: 3,
    domain: 'Database Services',
    topic: 'GeminiDB Multi-Model NoSQL',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Huawei Cloud GeminiDB is based on a decoupled compute-and-storage architecture. Which open-source database protocol APIs does GeminiDB support compatibility with?',
    explanation: 'GeminiDB supports compatibility with Cassandra, MongoDB, Redis, and InfluxDB APIs, featuring compute-storage separation for elasticity.',
    options: [
      { key: 'A', text: 'Cassandra, Mongo, Redis, and InfluxDB', isCorrect: true },
      { key: 'B', text: 'Oracle PL/SQL and DB2', isCorrect: false },
      { key: 'C', text: 'SQLite and Microsoft Access', isCorrect: false },
      { key: 'D', text: 'Neo4j only', isCorrect: false }
    ]
  },
  {
    weekNumber: 3,
    domain: 'Cloud Native',
    topic: 'CCE & K8s Architecture',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'In Huawei Cloud Container Engine (CCE), which components constitute the Kubernetes Master (Control Plane) node? (Select all that apply)',
    explanation: 'The Kubernetes control plane includes kube-apiserver, kube-scheduler, kube-controller-manager, and etcd. Kubelet and Kube-proxy run on worker nodes.',
    options: [
      { key: 'A', text: 'kube-apiserver', isCorrect: true },
      { key: 'B', text: 'etcd', isCorrect: true },
      { key: 'C', text: 'kube-scheduler', isCorrect: true },
      { key: 'D', text: 'kubelet', isCorrect: false }
    ]
  },
  {
    weekNumber: 3,
    domain: 'Cloud Native',
    topic: 'Software Repository for Container (SWR)',
    stage: 'PRELIMINARY',
    questionType: 'TRUE_FALSE',
    questionText: 'Software Repository for Container (SWR) on Huawei Cloud provides container image lifecycle management, vulnerability scanning, and accelerates image distribution to CCE clusters.',
    explanation: 'True. SWR manages Docker/OCI images with fine-grained access control, security vulnerability scanning, and high-concurrency image distribution.',
    options: [
      { key: 'A', text: 'True', isCorrect: true },
      { key: 'B', text: 'False', isCorrect: false }
    ]
  },

  // --- WEEK 4: AI Foundations & Large Model Concepts ---
  {
    weekNumber: 4,
    domain: 'AI Basics',
    topic: 'Machine Learning & Deep Learning',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'What is the primary role of an Activation Function (such as ReLU, Sigmoid, or GELU) in a deep neural network?',
    explanation: 'Activation functions introduce non-linearity into neural network layers, enabling the network to learn and model complex, non-linear representations.',
    options: [
      { key: 'A', text: 'To introduce non-linearity so the network can learn complex patterns', isCorrect: true },
      { key: 'B', text: 'To reduce the dataset dimension to prevent disk exhaustion', isCorrect: false },
      { key: 'C', text: 'To normalize RGB image pixels into hexadecimal numbers', isCorrect: false },
      { key: 'D', text: 'To encrypt weights before sending them to the GPU', isCorrect: false }
    ]
  },
  {
    weekNumber: 4,
    domain: 'Large Language Models',
    topic: 'RAG Architecture',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'In Large Language Model (LLM) application development, what does Retrieval-Augmented Generation (RAG) accomplish?',
    explanation: 'RAG retrieves relevant external knowledge or documents from a vector database and includes them in the LLM prompt context to provide up-to-date, accurate answers without retraining the base model.',
    options: [
      { key: 'A', text: 'It completely retrains model base weights from scratch using reinforcement learning', isCorrect: false },
      { key: 'B', text: 'It retrieves authoritative external documents and injects them into the prompt context to mitigate hallucinations', isCorrect: true },
      { key: 'C', text: 'It compresses 70B parameter models down to 8-bit integers', isCorrect: false },
      { key: 'D', text: 'It translates user prompts into assembly instructions for the Ascend NPU', isCorrect: false }
    ]
  },
  {
    weekNumber: 4,
    domain: 'Large Language Models',
    topic: 'Pangu Models',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which domains are covered by the Huawei Pangu Big Model family? (Select all that apply)',
    explanation: 'Huawei Pangu models feature a 5+N+X hierarchy, including Pangu NLP, Pangu CV, Pangu Multimodal, Pangu Scientific Computing (Meteorology, Molecule, Wave), and Pangu Predictive models.',
    options: [
      { key: 'A', text: 'Pangu NLP (Natural Language Processing)', isCorrect: true },
      { key: 'B', text: 'Pangu CV (Computer Vision)', isCorrect: true },
      { key: 'C', text: 'Pangu Meteorology / Scientific Computing', isCorrect: true },
      { key: 'D', text: 'Pangu BIOS firmware assembler', isCorrect: false }
    ]
  },

  // --- WEEK 5: Huawei AI Platform (ModelArts) ---
  {
    weekNumber: 5,
    domain: 'Huawei AI Platform',
    topic: 'ModelArts Architecture',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Which one-stop AI development platform provided by Huawei Cloud covers data preparation, model training, parameter optimization, and service deployment?',
    explanation: 'ModelArts is Huawei Cloud’s one-stop AI development platform offering full-stack capabilities from automated data labeling, distributed training on Ascend chips, to one-click deployment.',
    options: [
      { key: 'A', text: 'ModelArts', isCorrect: true },
      { key: 'B', text: 'CloudBuild', isCorrect: false },
      { key: 'C', text: 'CodeArts Pipeline', isCorrect: false },
      { key: 'D', text: 'DataArts Studio', isCorrect: false }
    ]
  },
  {
    weekNumber: 5,
    domain: 'Huawei AI Platform',
    topic: 'AI Gallery & Inference Deployment',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which deployment options are provided by Huawei Cloud ModelArts for deploying trained machine learning models? (Select all that apply)',
    explanation: 'ModelArts supports deploying models as Real-Time Services (online RESTful APIs), Batch Services (processing large datasets in batch), and Edge Services (running on Huawei HiLens edge hardware).',
    options: [
      { key: 'A', text: 'Real-Time Service (Online RESTful API)', isCorrect: true },
      { key: 'B', text: 'Batch Service (Scheduled dataset processing)', isCorrect: true },
      { key: 'C', text: 'Edge Service (Deploying to HiLens edge devices)', isCorrect: true },
      { key: 'D', text: 'Bare Metal BIOS microcode patch', isCorrect: false }
    ]
  },
  {
    weekNumber: 5,
    domain: 'Huawei AI Platform',
    topic: 'Ascend AI Full-Stack',
    stage: 'PRELIMINARY',
    questionType: 'TRUE_FALSE',
    questionText: 'Huawei ModelArts accelerates deep learning training workloads using Huawei Ascend AI processors combined with the CANN (Compute Architecture for Neural Networks) heterogeneous computing architecture.',
    explanation: 'True. CANN is the heterogeneous chip computing architecture that connects Ascend processors with high-level AI frameworks like MindSpore and PyTorch.',
    options: [
      { key: 'A', text: 'True', isCorrect: true },
      { key: 'B', text: 'False', isCorrect: false }
    ]
  }
];
