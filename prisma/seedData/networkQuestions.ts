import { RawQuestion } from './cloudQuestions';

export const networkQuestions: RawQuestion[] = [
  // --- WEEK 1: Datacom Basics & Layer 2 Switching ---
  {
    weekNumber: 1,
    domain: 'Datacom Basics',
    topic: 'Huawei VRP CLI & Navigation',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'On a Huawei VRP network device, which command is executed from User View (`<Huawei>`) to enter System View (`[Huawei]`)?',
    explanation: '`system-view` (or `sys`) is used in Huawei VRP to navigate from User View (`<Huawei>`) to System View (`[Huawei]`).',
    options: [
      { key: 'A', text: 'enable', isCorrect: false },
      { key: 'B', text: 'system-view', isCorrect: true },
      { key: 'C', text: 'configure terminal', isCorrect: false },
      { key: 'D', text: 'switch to admin', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'Switching Technologies',
    topic: 'VLAN & VLANIF',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'Which link type on a Huawei switch is typically used to connect to a host PC, stripping the 802.1Q tag from outgoing frames and tagging untagged incoming frames with the port default VLAN (PVID)?',
    explanation: 'Access ports are designed for connecting to end-user devices (PCs, servers). They send untagged frames and tag incoming untagged frames with their PVID.',
    options: [
      { key: 'A', text: 'Access', isCorrect: true },
      { key: 'B', text: 'Trunk', isCorrect: false },
      { key: 'C', text: 'Hybrid', isCorrect: false },
      { key: 'D', text: 'Dot1q-tunnel (QinQ)', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'Switching Technologies',
    topic: 'Link Aggregation (Eth-Trunk)',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which modes are supported when configuring an Eth-Trunk interface on Huawei switches? (Select all that apply)',
    explanation: 'Huawei Eth-Trunk supports Manual load balancing mode and LACP (Link Aggregation Control Protocol) dynamic mode.',
    options: [
      { key: 'A', text: 'Manual mode', isCorrect: true },
      { key: 'B', text: 'Static LACP mode', isCorrect: true },
      { key: 'C', text: 'Token Ring mode', isCorrect: false },
      { key: 'D', text: 'ATM PVC mode', isCorrect: false }
    ]
  },
  {
    weekNumber: 1,
    domain: 'Switching Technologies',
    topic: 'Spanning Tree Protocol (STP)',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'In standard IEEE 802.1D Spanning Tree Protocol (STP), what is the default forward delay timer for transitions between Listening $\rightarrow$ Learning $\rightarrow$ Forwarding states?',
    explanation: 'The default forward delay timer in standard STP is 15 seconds, requiring 30 seconds for a port to reach the Forwarding state.',
    options: [
      { key: 'A', text: '15 seconds', isCorrect: true },
      { key: 'B', text: '5 seconds', isCorrect: false },
      { key: 'C', text: '60 seconds', isCorrect: false },
      { key: 'D', text: '2 seconds', isCorrect: false }
    ]
  },

  // --- WEEK 2: IP Routing, OSPF & IPv6 Foundations ---
  {
    weekNumber: 2,
    domain: 'Routing Technologies',
    topic: 'OSPF Neighbor States',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'During the OSPF adjacency formation process, in which state do two OSPF routers negotiate the Master/Slave relationship and exchange initial Database Description (DD) packets with empty sequence numbers?',
    explanation: 'In the ExStart state, OSPF routers determine master/slave roles and initialize DD sequence numbers.',
    options: [
      { key: 'A', text: 'ExStart', isCorrect: true },
      { key: 'B', text: 'Init', isCorrect: false },
      { key: 'C', text: '2-Way', isCorrect: false },
      { key: 'D', text: 'Loading', isCorrect: false }
    ]
  },
  {
    weekNumber: 2,
    domain: 'Routing Technologies',
    topic: 'Access Control Lists (ACL)',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'On Huawei routers, what is the valid number range for Basic ACLs that can only filter packets based on source IP address?',
    explanation: 'Basic ACLs range from 2000 to 2999 (source IP only). Advanced ACLs range from 3000 to 3999 (source/destination IP, protocol, port).',
    options: [
      { key: 'A', text: '2000 to 2999', isCorrect: true },
      { key: 'B', text: '3000 to 3999', isCorrect: false },
      { key: 'C', text: '4000 to 4999', isCorrect: false },
      { key: 'D', text: '1000 to 1999', isCorrect: false }
    ]
  },
  {
    weekNumber: 2,
    domain: 'IPv6 Technologies',
    topic: 'IPv6 Address Architecture',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which address types are defined in the IPv6 protocol specification? (Select all that apply)',
    explanation: 'IPv6 defines Unicast, Anycast, and Multicast addresses. Broadcast is eliminated in IPv6 and replaced by multicast.',
    options: [
      { key: 'A', text: 'Unicast', isCorrect: true },
      { key: 'B', text: 'Anycast', isCorrect: true },
      { key: 'C', text: 'Multicast', isCorrect: true },
      { key: 'D', text: 'Broadcast', isCorrect: false }
    ]
  },
  {
    weekNumber: 2,
    domain: 'IPv6 Technologies',
    topic: 'ICMPv6 SLAAC Autoconfiguration',
    stage: 'PRELIMINARY',
    questionType: 'TRUE_FALSE',
    questionText: 'In IPv6 Stateless Address Autoconfiguration (SLAAC), a host generates its interface ID using the IEEE EUI-64 format by inserting `0xFFFE` into the middle of its 48-bit MAC address and inverting the universal/local (U/L) bit.',
    explanation: 'True. In EUI-64 address generation, the 7th bit of the first byte is inverted and 0xFFFE is inserted between the OUI and device identifier.',
    options: [
      { key: 'A', text: 'True', isCorrect: true },
      { key: 'B', text: 'False', isCorrect: false }
    ]
  },

  // --- WEEK 3: WAN Technologies, AAA & Network Security ---
  {
    weekNumber: 3,
    domain: 'WAN Technologies',
    topic: 'PPP Authentication (PAP vs. CHAP)',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'What is the key security difference between PAP and CHAP authentication protocols in Point-to-Point Protocol (PPP)?',
    explanation: 'PAP transmits passwords in plaintext over the link, while CHAP utilizes a three-way challenge-response handshake with MD5 hashing, keeping passwords private.',
    options: [
      { key: 'A', text: 'PAP sends credentials in plain text, while CHAP uses a 3-way challenge-response MD5 handshake', isCorrect: true },
      { key: 'B', text: 'PAP uses RSA 2048-bit certificates, while CHAP uses plain text', isCorrect: false },
      { key: 'C', text: 'PAP works only over fiber, while CHAP works only over serial cables', isCorrect: false },
      { key: 'D', text: 'There is no difference in security between PAP and CHAP', isCorrect: false }
    ]
  },
  {
    weekNumber: 3,
    domain: 'Network Security',
    topic: 'Huawei Firewall Security Zones',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'What are the default security levels for the built-in zones on a Huawei USG Series Firewall? (Select all that apply)',
    explanation: 'Huawei firewalls assign priority values: Trust (85), DMZ (50), Untrust (5), and Local (100). Higher priority zones represent higher trust levels.',
    options: [
      { key: 'A', text: 'Trust Zone = 85', isCorrect: true },
      { key: 'B', text: 'DMZ Zone = 50', isCorrect: true },
      { key: 'C', text: 'Untrust Zone = 5', isCorrect: true },
      { key: 'D', text: 'Local Zone = 100', isCorrect: true }
    ]
  },
  {
    weekNumber: 3,
    domain: 'Network Security',
    topic: 'AAA Architecture',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'In network security, what three functions do the three letters in the "AAA" framework represent?',
    explanation: 'AAA stands for Authentication (who you are), Authorization (what you can do), and Accounting (logging what you did).',
    options: [
      { key: 'A', text: 'Authentication, Authorization, and Accounting', isCorrect: true },
      { key: 'B', text: 'Access, Allocation, and Architecture', isCorrect: false },
      { key: 'C', text: 'Address, Association, and Acknowledgment', isCorrect: false },
      { key: 'D', text: 'Algorithm, Analysis, and Audit', isCorrect: false }
    ]
  },

  // --- WEEK 4: VPN Technologies & DCN Fundamentals ---
  {
    weekNumber: 4,
    domain: 'VPN Technologies',
    topic: 'IPsec VPN & IKE Protocol',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'In IPsec VPN architecture, which protocol provides both data confidentiality (encryption) and data integrity/authentication?',
    explanation: 'Encapsulating Security Payload (ESP, IP protocol 50) provides encryption, authentication, and anti-replay protection. AH (protocol 51) only provides authentication without encryption.',
    options: [
      { key: 'A', text: 'Encapsulating Security Payload (ESP)', isCorrect: true },
      { key: 'B', text: 'Authentication Header (AH)', isCorrect: false },
      { key: 'C', text: 'GRE Tunnel Header', isCorrect: false },
      { key: 'D', text: 'L2TP Control Connection', isCorrect: false }
    ]
  },
  {
    weekNumber: 4,
    domain: 'Data Center Networks',
    topic: 'VXLAN & Underlay / Overlay',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'Which statements regarding Virtual Extensible LAN (VXLAN) in Data Center Networks are TRUE? (Select all that apply)',
    explanation: 'VXLAN encapsulates Layer 2 Ethernet frames into Layer 4 UDP packets (destination port 4789). It uses a 24-bit VNI supporting up to 16 million virtual segments (overcoming the 4096 VLAN limit).',
    options: [
      { key: 'A', text: 'VXLAN encapsulates Layer 2 frames in UDP packets using destination UDP port 4789.', isCorrect: true },
      { key: 'B', text: 'VXLAN uses a 24-bit Virtual Network Identifier (VNI), supporting up to 16 million virtual broadcast domains.', isCorrect: true },
      { key: 'C', text: 'VXLAN enables Layer 2 communication across Layer 3 underlay routed networks.', isCorrect: true },
      { key: 'D', text: 'VXLAN is limited to a maximum of 4,096 VLAN IDs.', isCorrect: false }
    ]
  },

  // --- WEEK 5: WLAN Services, Security & Planning ---
  {
    weekNumber: 5,
    domain: 'WLAN Technologies',
    topic: 'CAPWAP Tunnel Establishment',
    stage: 'PRELIMINARY',
    questionType: 'SINGLE_CHOICE',
    questionText: 'In Huawei centralized WLAN architecture (AC + Fit AP), what protocol is used to establish control and data tunnels between the Access Controller (AC) and Fit APs?',
    explanation: 'Control And Provisioning of Wireless Access Points (CAPWAP) uses UDP ports 5246 (Control) and 5247 (Data) to communicate between AC and Fit APs.',
    options: [
      { key: 'A', text: 'CAPWAP (Control and Provisioning of Wireless Access Points)', isCorrect: true },
      { key: 'B', text: 'LWAPP', isCorrect: false },
      { key: 'C', text: 'SNMPv3', isCorrect: false },
      { key: 'D', text: 'Netconf', isCorrect: false }
    ]
  },
  {
    weekNumber: 5,
    domain: 'WLAN Technologies',
    topic: 'WLAN Forwarding Modes',
    stage: 'PRELIMINARY',
    questionType: 'MULTIPLE_CHOICE',
    questionText: 'What are the two primary data packet forwarding modes in Huawei AC + Fit AP WLAN deployments? (Select all that apply)',
    explanation: 'Huawei WLAN supports Direct Forwarding (Local Forwarding, where the AP forwards data locally to the access switch) and Tunnel Forwarding (Centralized Forwarding, where user traffic is encapsulated in CAPWAP data tunnels to the AC).',
    options: [
      { key: 'A', text: 'Direct Forwarding (Local Forwarding)', isCorrect: true },
      { key: 'B', text: 'Tunnel Forwarding (Centralized / AC Forwarding)', isCorrect: true },
      { key: 'C', text: 'Broadcast Flooding Mode', isCorrect: false },
      { key: 'D', text: 'Peer-to-Peer Tor Mode', isCorrect: false }
    ]
  },
  {
    weekNumber: 5,
    domain: 'WLAN Technologies',
    topic: 'WLAN Roaming',
    stage: 'PRELIMINARY',
    questionType: 'TRUE_FALSE',
    questionText: 'In Huawei WLAN, when a mobile station (STA) roams between APs within the same subnet (Layer 2 Roaming), its assigned IP address remains unchanged and ongoing user sessions are preserved without re-authentication.',
    explanation: 'True. In Layer 2 roaming within the same ESS and subnet, the STA retains its IP address and authorization tokens for seamless handover.',
    options: [
      { key: 'A', text: 'True', isCorrect: true },
      { key: 'B', text: 'False', isCorrect: false }
    ]
  }
];
