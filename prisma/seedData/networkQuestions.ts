import { RawQuestion } from './cloudQuestions';

export const networkQuestions: RawQuestion[] = [
  {
    "weekNumber": 1,
    "domain": "VRP CLI Foundations",
    "topic": "VRP Command Views",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Huawei VRP operating system, which command transitions from User View `<Huawei>` into System View `[Huawei]`?",
    "explanation": "`system-view` transitions from User View (`<Huawei>`) to System View (`[Huawei]`), where global parameters and interfaces can be configured.",
    "options": [
      {
        "key": "A",
        "text": "enable",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "system-view",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "configure terminal",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "super 3",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "VRP CLI Foundations",
    "topic": "Keyboard Shortcuts",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which keyboard shortcut in Huawei VRP immediately returns the administrator to User View `<Huawei>` from any deep configuration sub-view?",
    "explanation": "`Ctrl+Z` (or `return`) immediately exits the current view back to User View, while `quit` exits up one level.",
    "options": [
      {
        "key": "A",
        "text": "Ctrl+C",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Ctrl+Z",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Ctrl+D",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Ctrl+X",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "VRP Configuration Management",
    "topic": "Saving Configurations",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command saves the currently active configuration in memory (current-configuration) to flash storage (saved-configuration) on a Huawei switch?",
    "explanation": "`save` in User View writes active memory configuration to non-volatile flash storage (`vrpcfg.zip`).",
    "options": [
      {
        "key": "A",
        "text": "write memory",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "save",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "commit",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "copy run start",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "TCP/IP Protocol Suite",
    "topic": "Protocol Encapsulation",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the Protocol field value in an IPv4 packet header that indicates the encapsulated upper-layer payload is TCP?",
    "explanation": "In IPv4 headers, Protocol field 6 denotes TCP, 17 denotes UDP, and 1 denotes ICMP.",
    "options": [
      {
        "key": "A",
        "text": "1",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "6",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "17",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "88",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "TCP/IP Protocol Suite",
    "topic": "TCP Three-Way Handshake",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which control flags are set in the second packet of the standard TCP three-way handshake sent from the server back to the client?",
    "explanation": "The three-way handshake sequence is: 1. Client -> Server: SYN; 2. Server -> Client: SYN + ACK; 3. Client -> Server: ACK.",
    "options": [
      {
        "key": "A",
        "text": "SYN only",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "SYN + ACK",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "ACK only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "FIN + ACK",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Address Resolution Protocol (ARP)",
    "topic": "ARP Request Destination MAC",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the destination Layer 2 MAC address of an ARP Request frame broadcasted by a host to discover the MAC address of its default gateway?",
    "explanation": "ARP Requests are broadcast frames sent to the broadcast Layer 2 address `FF:FF:FF:FF:FF:FF`.",
    "options": [
      {
        "key": "A",
        "text": "00:00:00:00:00:00",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "FF:FF:FF:FF:FF:FF",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "01:00:5E:00:00:01",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The host's own MAC address",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Address Resolution Protocol (ARP)",
    "topic": "Gratuitous ARP",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "What are the primary functions of Gratuitous ARP in enterprise Ethernet networks? (Select all that apply)",
    "explanation": "Gratuitous ARP (where sender IP equals target IP) is used to: 1. Detect duplicate IP addresses on the local link, and 2. Update neighboring switches' ARP caches and MAC tables when hardware changes.",
    "options": [
      {
        "key": "A",
        "text": "Detect duplicate IP address conflicts on the broadcast domain",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Notify neighboring devices to update their ARP tables when a MAC address changes",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Establish OSPF router adjacencies across WAN links",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Assign public IPv6 addresses via SLAAC",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Ethernet Switching",
    "topic": "MAC Address Table Learning",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How does a Layer 2 Ethernet switch learn new entries in its MAC address forwarding table?",
    "explanation": "Switches inspect the Source MAC address of incoming frames and record the mapping between that MAC address and the physical ingress port.",
    "options": [
      {
        "key": "A",
        "text": "By inspecting the Source MAC address of received frames",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "By inspecting the Destination MAC address of received frames",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "By executing DNS lookups on the gateway router",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "By reading IP headers in Layer 3 packets",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Ethernet Switching",
    "topic": "MAC Address Aging Time",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the default aging time for dynamic MAC address table entries on Huawei switches?",
    "explanation": "By default, dynamic entries in the MAC address table age out after 300 seconds (5 minutes) if no renewed frames are received from that source MAC.",
    "options": [
      {
        "key": "A",
        "text": "30 seconds",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "300 seconds (5 minutes)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "3600 seconds (1 hour)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Dynamic entries never age out",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Virtual Local Area Network (VLAN)",
    "topic": "802.1Q Tag Structure",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In an IEEE 802.1Q VLAN tag (4 bytes total), how many bits are allocated for the VLAN Identifier (VID), defining the range of valid VLAN IDs (1\u20134094)?",
    "explanation": "The VID field is 12 bits ($2^{12} = 4096$). VLANs 0 and 4095 are reserved, providing usable VLAN IDs from 1 to 4094.",
    "options": [
      {
        "key": "A",
        "text": "8 bits (256 VLANs)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "12 bits (4096 VLANs, 1\u20134094 usable)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "16 bits (65536 VLANs)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "3 bits (8 priority classes)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Virtual Local Area Network (VLAN)",
    "topic": "TPID Value",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the standard Tag Protocol Identifier (TPID) value in an 802.1Q Ethernet frame header?",
    "explanation": "The TPID is 2 bytes with standard hexadecimal value `0x8100`, identifying the frame as an IEEE 802.1Q-tagged frame.",
    "options": [
      {
        "key": "A",
        "text": "0x0800",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "0x8100",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "0x86DD",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "0x8847",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "VLAN Port Link Types",
    "topic": "Access Ports",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What forwarding action does an Access port perform when transmitting an outgoing frame to an attached end-user PC?",
    "explanation": "Access ports strip the 802.1Q VLAN tag before transmitting the frame to the end host, sending standard untagged Ethernet frames.",
    "options": [
      {
        "key": "A",
        "text": "Strips the VLAN tag and sends an untagged frame",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Adds a second 802.1Q tag (QinQ)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Drops the frame immediately",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Forwards the frame preserving the internal 802.1Q tag",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "VLAN Port Link Types",
    "topic": "Trunk Ports",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On a Huawei switch Trunk port with PVID=1, which command allows VLANs 10, 20, and 30 to traverse the link to an adjacent switch?",
    "explanation": "`port trunk allow-pass vlan 10 20 30` configures the trunk port to permit designated VLAN frames.",
    "options": [
      {
        "key": "A",
        "text": "port trunk allow-pass vlan 10 20 30",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "switchport trunk allowed vlan 10,20,30",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "vlan trunk enable 10 20 30",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "permit vlan 10 20 30 trunk",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "VLAN Port Link Types",
    "topic": "Hybrid Ports",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What unique capability does a Huawei Hybrid port provide that standard Access and Trunk ports cannot perform?",
    "explanation": "Hybrid ports can selectively strip VLAN tags on egress for specific designated VLANs (`port hybrid untagged vlan ...`) while preserving tags for others (`port hybrid tagged vlan ...`).",
    "options": [
      {
        "key": "A",
        "text": "Ability to send frames from specified VLANs untagged while sending other VLANs tagged",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Ability to boost physical wire speed from 1G to 100G",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Ability to connect optical fiber directly to RJ-45 copper without transceivers",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Ability to bypass Layer 2 Spanning Tree loops automatically",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Inter-VLAN Routing",
    "topic": "VLANIF Interfaces",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On a Layer 3 Huawei switch, what virtual interface is created to act as the default gateway for hosts in VLAN 10?",
    "explanation": "`interface Vlanif 10` creates the logical Layer 3 interface corresponding to VLAN 10, to which an IP gateway address is assigned.",
    "options": [
      {
        "key": "A",
        "text": "interface Vlanif 10",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "interface Sub-vlan 10",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "interface Loopback 10",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "interface Gateway 10",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Link Aggregation (Eth-Trunk)",
    "topic": "Modes of Eth-Trunk",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What are the two operational modes of Eth-Trunk link aggregation on Huawei switches?",
    "explanation": "Huawei switches support: 1. Manual load balancing mode (all member links active, no control protocol), and 2. LACP (Link Aggregation Control Protocol) mode (dynamic negotiation, active/backup links).",
    "options": [
      {
        "key": "A",
        "text": "Manual load balancing mode and LACP mode",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "PAgP mode and Dynamic mode",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Token Ring mode and FDDI mode",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Half-duplex mode and Full-duplex mode only",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Link Aggregation (Eth-Trunk)",
    "topic": "Member Link Consistency",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which interface parameters must be strictly identical across all member ports added to an Eth-Trunk bundle? (Select all that apply)",
    "explanation": "All member ports in an Eth-Trunk must have matching transmission speed, duplex mode, link type (Access/Trunk/Hybrid), and allowed VLAN lists.",
    "options": [
      {
        "key": "A",
        "text": "Interface transmission speed (rate)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Duplex mode (Full Duplex)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "VLAN link type and permitted VLAN list",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Physical port MAC address (must be identical)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Switch Virtualization",
    "topic": "iStack & CSS",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary difference between iStack and CSS (Cluster Switch System) in Huawei networking devices?",
    "explanation": "iStack virtualizes multiple fixed-configuration box switches into a single logical switch. CSS virtualizes two modular chassis switches (e.g., CloudEngine / S12800) into a single logical switch.",
    "options": [
      {
        "key": "A",
        "text": "iStack stacks fixed box switches; CSS clusters modular chassis switches",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "iStack is Layer 3 only; CSS is Layer 2 only",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "iStack supports a maximum of 2 switches; CSS supports 100 switches",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Both technologies are legacy and replaced by wireless ad-hoc networks",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Spanning Tree Protocol (STP)",
    "topic": "STP Network Loops",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What catastrophic network problem is caused by Layer 2 loops in redundant Ethernet switching topologies?",
    "explanation": "Layer 2 loops without loop prevention protocols cause Broadcast Storms (frames circulate endlessly without a TTL field), MAC address table flapping, and network paralysis.",
    "options": [
      {
        "key": "A",
        "text": "Broadcast storms and MAC address table flapping",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "IPv4 addresses automatically migrating to IPv6",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Switch cooling fans operating in reverse",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "DNS records being deleted from cloud servers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Spanning Tree Protocol (STP)",
    "topic": "Bridge ID & Root Bridge Election",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In STP (IEEE 802.1D), how is the Root Bridge elected among switches in a broadcast domain?",
    "explanation": "The switch with the lowest Bridge ID (BID = Bridge Priority + MAC address) is elected as the Root Bridge. By default, bridge priority is 32768.",
    "options": [
      {
        "key": "A",
        "text": "The switch with the lowest Bridge ID (BID = Priority + MAC)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "The switch with the highest IP address on Vlanif 1",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "The switch that has been powered on the longest",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The switch with the largest number of connected PCs",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Spanning Tree Protocol (STP)",
    "topic": "STP Port Roles",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which port roles exist in standard 802.1D Spanning Tree Protocol (STP)? (Select all that apply)",
    "explanation": "In classic 802.1D STP, port roles are: Root Port (best path to root bridge on non-root switch), Designated Port (forwards BPDUs onto a segment), and Blocked (Alternate) Port.",
    "options": [
      {
        "key": "A",
        "text": "Root Port",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Designated Port",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Blocked (Alternate) Port",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Master Cluster Port",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Rapid Spanning Tree (RSTP)",
    "topic": "RSTP Convergence",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which handshake mechanism in RSTP (IEEE 802.1w) allows designated ports to transition directly to the Forwarding state within milliseconds on point-to-point links?",
    "explanation": "The Proposal/Agreement handshake mechanism allows switches on point-to-point full-duplex links to rapidly transition designated ports to Forwarding without waiting for timer expirations (30s).",
    "options": [
      {
        "key": "A",
        "text": "Proposal / Agreement (P/A) Handshake",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Forward Delay 15-second timer wait",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Max Age timeout (20s)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Token Passing ring negotiation",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Rapid Spanning Tree (RSTP)",
    "topic": "RSTP Edge Ports",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What happens when an interface connecting to an end-user workstation is configured as an RSTP Edge Port (`stp edged-port enable`)?",
    "explanation": "An Edge Port transitions directly to the Forwarding state immediately upon link up, bypassing STP listening/learning states, and does not trigger Topology Change (TC) notifications.",
    "options": [
      {
        "key": "A",
        "text": "Transitions directly to Forwarding state without causing topology change notifications",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Disables packet forwarding for 60 seconds",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Becomes the Root Port of the switch",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Generates continuous TC BPDUs every second",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Multiple Spanning Tree (MSTP)",
    "topic": "MSTP Instances",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What key architectural benefit does Multiple Spanning Tree Protocol (MSTP / 802.1s) provide compared to standard STP?",
    "explanation": "MSTP maps multiple VLANs to independent MSTI spanning tree instances, enabling per-VLAN load balancing across redundant links while keeping BPDU overhead low.",
    "options": [
      {
        "key": "A",
        "text": "Maps multiple VLANs to independent spanning tree instances for link load balancing",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Eliminates all MAC address tables",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Encrypts all payload traffic with IPsec",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Converts Layer 2 switches to BGP routers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "VRP Port Configuration",
    "topic": "Setting Port Default VLAN (PVID)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command sets the Port VLAN ID (PVID) of interface GigabitEthernet0/0/1 to VLAN 20 on a Huawei switch?",
    "explanation": "`port default vlan 20` assigns PVID 20 to an Access (or Hybrid) port.",
    "options": [
      {
        "key": "A",
        "text": "port default vlan 20",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "set pvid 20",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "vlan pvid 20 enable",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "switchport access vlan 20",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Ethernet Frame Header",
    "topic": "Frame Check Sequence (FCS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What field at the end of a standard Ethernet II frame header verifies that the received frame was not corrupted during physical transmission?",
    "explanation": "The Frame Check Sequence (FCS, 4 bytes) contains a 32-bit Cyclic Redundancy Check (CRC-32) to verify data integrity.",
    "options": [
      {
        "key": "A",
        "text": "Frame Check Sequence (FCS / CRC)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Preamble (7 bytes)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Start Frame Delimiter (SFD)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Type / Length field",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "VRP Diagnostics",
    "topic": "display current-configuration",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which VRP command displays the active configuration currently executing in RAM?",
    "explanation": "`display current-configuration` (or `disp curr`) outputs the running configuration from volatile memory.",
    "options": [
      {
        "key": "A",
        "text": "display current-configuration",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "display saved-configuration",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "show running-config",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "view active-profile",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "Layer 2 Switching",
    "topic": "Unknown Unicast Flooding",
    "questionType": "TRUE_FALSE",
    "questionText": "When a switch receives a frame whose destination MAC address is not found in its MAC address table (Unknown Unicast), it floods the frame out of all ports within the same VLAN except the receiving port.",
    "explanation": "True. Unknown unicast frames are flooded to all ports in the same broadcast domain (VLAN) except the ingress port.",
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
    "domain": "Spanning Tree Protocol",
    "topic": "STP Priority Values",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In STP Bridge Priority configuration, bridge priorities must be configured in multiples of which numerical value?",
    "explanation": "Bridge priorities must be configured in increments of 4096 (e.g., 0, 4096, 8192 ... 32768) because the 12-bit Extended System ID (VLAN ID) occupies the lower bits of the priority field.",
    "options": [
      {
        "key": "A",
        "text": "4096",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "100",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "1024",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "256",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 1,
    "domain": "VRP Management",
    "topic": "Reboot Command",
    "questionType": "TRUE_FALSE",
    "questionText": "In Huawei VRP User View, issuing the `reboot` command restarts the device, with the system prompting whether to save unsaved configuration changes before rebooting.",
    "explanation": "True. `reboot` restarts the switch and prompts: 'Warning: The system will reboot... Save current configuration? [Y/N]'.",
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
    "domain": "IP Routing Principles",
    "topic": "Routing Table Lookup",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When a router receives an IP packet, what fundamental rule does it use to select the best matching route from its routing table?",
    "explanation": "The Longest Prefix Match rule dictates that when multiple routes match a destination IP address, the route with the longest (most specific) subnet mask is chosen.",
    "options": [
      {
        "key": "A",
        "text": "Longest Prefix Match (most specific subnet mask)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Shortest Prefix Match",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Alphabetical order of interface names",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Random round-robin packet distribution",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IP Routing Principles",
    "topic": "Route Preference (Administrative Distance)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On Huawei routers, what is the default Preference value for Direct routes, OSPF internal routes, and Static routes respectively?",
    "explanation": "Huawei default preferences: Direct routes = 0, OSPF internal = 10, Static routes = 60, RIP = 100, BGP = 255. (Lower numerical value = higher priority).",
    "options": [
      {
        "key": "A",
        "text": "Direct: 0, OSPF: 10, Static: 60",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Direct: 10, OSPF: 60, Static: 0",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Direct: 100, OSPF: 110, Static: 1",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Direct: 1, OSPF: 1, Static: 1",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Static Routing",
    "topic": "Default Route Configuration",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command configures a static default route directing all unmatched outbound traffic to next-hop IP `192.168.1.254` on a Huawei router?",
    "explanation": "`ip route-static 0.0.0.0 0.0.0.0 192.168.1.254` (or `ip route-static 0.0.0.0 0 192.168.1.254`) defines a static default route.",
    "options": [
      {
        "key": "A",
        "text": "ip route-static 0.0.0.0 0.0.0.0 192.168.1.254",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ip default-gateway 192.168.1.254",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "route add default gw 192.168.1.254",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "router ospf default 192.168.1.254",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Static Routing",
    "topic": "Floating Static Route",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What configuration parameter creates a Floating Static Route that remains inactive in the routing table until the primary link fails?",
    "explanation": "A floating static route is created by setting a higher Preference value (e.g., `preference 100`) than the primary route (default 60), serving as a standby backup path.",
    "options": [
      {
        "key": "A",
        "text": "Configuring a higher Preference value (e.g., preference 100)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Setting a higher MTU value",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Binding the route to an access control list",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Assigning duplicate IP addresses to the next hop",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF Protocol Basics",
    "topic": "OSPF Overview & Algorithm",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which routing algorithm is utilized by the Open Shortest Path First (OSPF) link-state protocol to calculate loop-free shortest paths?",
    "explanation": "OSPF uses the Dijkstra Shortest Path First (SPF) algorithm, building a Link State Database (LSDB) and calculating a shortest-path tree rooted at the local router.",
    "options": [
      {
        "key": "A",
        "text": "Bellman-Ford Distance Vector Algorithm",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Dijkstra SPF (Shortest Path First) Algorithm",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "DUAL (Diffusing Update Algorithm)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Floyd-Warshall All-Pairs Algorithm",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF Protocol Basics",
    "topic": "Router ID Election",
    "questionType": "SINGLE_CHOICE",
    "questionText": "If a Huawei router does not have a manually configured OSPF Router ID, how does the system automatically select the Router ID?",
    "explanation": "If no manual Router ID is configured, the router selects the highest IP address among configured Loopback interfaces; if no Loopbacks exist, it selects the highest IP address among physical interfaces.",
    "options": [
      {
        "key": "A",
        "text": "Highest IP address among Loopback interfaces, else highest physical IP",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Lowest MAC address on Ethernet port 0",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Random 32-bit integer regenerated at every boot",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Always fixed at 1.1.1.1",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF Protocol Basics",
    "topic": "Area 0 (Backbone Area)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In multi-area OSPF design, which area is the mandatory Backbone Area through which all inter-area traffic must transit to prevent routing loops?",
    "explanation": "Area 0 (Area 0.0.0.0) is the Backbone Area. All non-backbone areas must be connected to Area 0 directly (or via virtual links) to prevent inter-area loops.",
    "options": [
      {
        "key": "A",
        "text": "Area 1",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Area 0 (Area 0.0.0.0)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Area 255",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Area 65535",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF Packet Types",
    "topic": "OSPF Five Packet Types",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which five packet types are used by OSPF for neighbor discovery, database synchronization, and link-state maintenance? (Select all that apply)",
    "explanation": "OSPF defines 5 packet types: 1. Hello, 2. Database Description (DBD), 3. Link State Request (LSR), 4. Link State Update (LSU), and 5. Link State Acknowledgment (LSAck).",
    "options": [
      {
        "key": "A",
        "text": "Hello Packet",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Database Description (DBD) Packet",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Link State Request (LSR) & Link State Update (LSU) Packets",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Link State Acknowledgment (LSAck) Packet",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF Neighbor States",
    "topic": "Neighbor Adjacency Progression",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In OSPF neighbor state progression, in which state are Master/Slave roles negotiated and initial Database Description (DBD) sequence numbers exchanged?",
    "explanation": "In ExStart state, neighbors establish a master/slave relationship and determine initial DD sequence numbers before exchanging actual LSA headers in Exchange state.",
    "options": [
      {
        "key": "A",
        "text": "Init",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "2-Way",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "ExStart",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Loading",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF Neighbor States",
    "topic": "Full Adjacency State",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which OSPF state indicates that two neighboring routers have completed Link State Database (LSDB) synchronization and are fully adjacent?",
    "explanation": "The 'Full' state indicates that link state databases are fully synchronized and routers are fully adjacent.",
    "options": [
      {
        "key": "A",
        "text": "2-Way",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Loading",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Full",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Active",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF DR/BDR Election",
    "topic": "Broadcast Network DR/BDR",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why are a Designated Router (DR) and Backup Designated Router (BDR) elected on OSPF broadcast multi-access Ethernet networks?",
    "explanation": "DR and BDR reduce the number of OSPF adjacencies on multi-access broadcast segments from $N(N-1)/2$ down to $2N-3$, dramatically cutting protocol control overhead.",
    "options": [
      {
        "key": "A",
        "text": "To reduce the number of OSPF full adjacencies and control message flooding",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "To encrypt Ethernet headers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "To prevent unauthorized DHCP allocations",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To convert private IPv4 addresses to public addresses",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF DR/BDR Election",
    "topic": "Priority Override",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command on a Huawei interface prevents that interface from ever participating in the OSPF DR/BDR election (forcing it to remain DROther)?",
    "explanation": "`ospf dr-priority 0` sets the OSPF interface priority to 0, disqualifying the interface from participating in DR/BDR elections.",
    "options": [
      {
        "key": "A",
        "text": "ospf dr-priority 0",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "ospf passive-interface",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "ospf disable-election",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "ospf timer dead 0",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF Multicast Addresses",
    "topic": "OSPF Multicast IPs",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which IPv4 multicast addresses are used by OSPF for all routers and for DR/BDR routers respectively on broadcast networks?",
    "explanation": "224.0.0.5 is listened to by All OSPF Routers (AllSPFRouters); 224.0.0.6 is listened to exclusively by DR and BDR routers (AllDRouters).",
    "options": [
      {
        "key": "A",
        "text": "224.0.0.5 (All OSPF Routers) and 224.0.0.6 (DR/BDR)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "224.0.0.9 and 224.0.0.10",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "224.0.0.1 and 224.0.0.2",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "239.255.255.250 and 224.0.1.1",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF LSA Types",
    "topic": "Type 1 & Type 2 LSAs",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In OSPF, which router generates a Type 2 Network LSA describing the multi-access broadcast network and attached router IDs?",
    "explanation": "Type 2 LSAs (Network LSAs) are generated exclusively by the Designated Router (DR) on broadcast/NBMA networks to describe attached routers.",
    "options": [
      {
        "key": "A",
        "text": "The Designated Router (DR)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "All DROther routers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "The ASBR (Autonomous System Boundary Router)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The Default Gateway",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "OSPF LSA Types",
    "topic": "Type 3 Summary LSA",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which OSPF router role generates Type 3 Network Summary LSAs to advertise network prefixes from one OSPF area into another area?",
    "explanation": "An Area Border Router (ABR) connects one or more non-backbone areas to Area 0, originating Type 3 Summary LSAs into adjacent areas.",
    "options": [
      {
        "key": "A",
        "text": "Area Border Router (ABR)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Autonomous System Boundary Router (ASBR)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Internal Backbone Router only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Layer 2 Bridge",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Access Control Lists (ACL)",
    "topic": "ACL Categories",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On Huawei devices, what is the numerical identifier range for Basic ACLs and Advanced ACLs respectively?",
    "explanation": "Basic ACLs range from 2000 to 2999 (filters only source IP). Advanced ACLs range from 3000 to 3999 (filters source IP, dest IP, protocol, ports).",
    "options": [
      {
        "key": "A",
        "text": "Basic ACL: 2000\u20132999; Advanced ACL: 3000\u20133999",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Basic ACL: 1\u201399; Advanced ACL: 100\u2013199",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Basic ACL: 4000\u20134999; Advanced ACL: 5000\u20135999",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Basic ACL: 1000\u20131999; Advanced ACL: 2000\u20132999",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Access Control Lists (ACL)",
    "topic": "Wildcard Masks",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What wildcard mask is used in a Huawei ACL rule to precisely match the specific host IP address `192.168.1.50`?",
    "explanation": "A wildcard mask of `0.0.0.0` (or `0`) means all 32 bits must match exactly, identifying a single specific host IP.",
    "options": [
      {
        "key": "A",
        "text": "255.255.255.255",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "0.0.0.0 (or 0)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "0.0.0.255",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "255.255.255.0",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "Access Control Lists (ACL)",
    "topic": "Advanced ACL Syntax",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command in an Advanced ACL permits TCP traffic from source network `10.1.1.0/24` to web server `192.168.1.100` port 80?",
    "explanation": "`rule permit tcp source 10.1.1.0 0.0.0.255 destination 192.168.1.100 0 destination-port eq 80` matches source, destination, protocol, and port.",
    "options": [
      {
        "key": "A",
        "text": "rule permit tcp source 10.1.1.0 0.0.0.255 destination 192.168.1.100 0 destination-port eq 80",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "permit ip 10.1.1.0 to 192.168.1.100:80",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "access-list 100 permit tcp 10.1.1.0 192.168.1.100 eq www",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "allow web from 10.1.1.0/24",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IPv6 Foundations",
    "topic": "IPv6 Address Format",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the total bit length of an IPv6 address, and how is it standardly represented in written notation?",
    "explanation": "IPv6 addresses are 128 bits in length, represented as 8 groups of four hexadecimal digits separated by colons (`X:X:X:X:X:X:X:X`).",
    "options": [
      {
        "key": "A",
        "text": "32 bits in dotted decimal",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "128 bits in colon-hexadecimal notation",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "64 bits in octal format",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "256 bits in binary format",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IPv6 Foundations",
    "topic": "IPv6 Address Compression",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the valid abbreviated representation of the IPv6 address `2001:0db8:0000:0000:0000:0000:0000:0001`?",
    "explanation": "Applying leading zero suppression and compressing consecutive zero groups with `::` yields `2001:db8::1`. The double colon `::` can only appear once in an address.",
    "options": [
      {
        "key": "A",
        "text": "2001:db8::1",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "2001:db8:0:0:0:0:0:1",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "2001::db8::1",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "2001.db8.0.1",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IPv6 Address Types",
    "topic": "Link-Local Addresses",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which IPv6 address prefix is designated for Link-Local unicast addresses automatically generated for local segment communication?",
    "explanation": "`fe80::/10` is reserved for IPv6 Link-Local addresses, automatically configured on all IPv6-enabled interfaces.",
    "options": [
      {
        "key": "A",
        "text": "2000::/3",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "fe80::/10",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "fc00::/7",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "ff00::/8",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IPv6 Address Types",
    "topic": "Unique Local & Global Unicast",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which prefix identifies IPv6 Unique Local Addresses (ULA), equivalent to RFC 1918 private addresses in IPv4?",
    "explanation": "`fc00::/7` (commonly `fd00::/8`) defines Unique Local IPv6 Addresses for private enterprise communication.",
    "options": [
      {
        "key": "A",
        "text": "fc00::/7 (ULA)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "2001::/16",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "ff02::1",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "::1/128",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IPv6 Address Types",
    "topic": "IPv6 Loopback Address",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the loopback address in IPv6 (equivalent to `127.0.0.1` in IPv4)?",
    "explanation": "The IPv6 loopback address is `::1` (`::1/128`).",
    "options": [
      {
        "key": "A",
        "text": "::/0",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "::1",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "fe80::1",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "2001::1",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "ICMPv6 & NDP Protocol",
    "topic": "Neighbor Discovery Protocol (NDP)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In IPv6, which protocol replaces legacy IPv4 ARP, ICMP Router Discovery, and ICMP Redirect messages?",
    "explanation": "Neighbor Discovery Protocol (NDP), running on ICMPv6, replaces ARP and router discovery with NS, NA, RS, and RA messages.",
    "options": [
      {
        "key": "A",
        "text": "Neighbor Discovery Protocol (NDP)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Inverse ARP",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "RARP (Reverse ARP)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "DHCPv4 Relay",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "ICMPv6 & NDP Protocol",
    "topic": "NDP Packet Types",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which ICMPv6 message types are used by IPv6 Neighbor Discovery Protocol (NDP)? (Select all that apply)",
    "explanation": "NDP uses 5 ICMPv6 messages: Router Solicitation (Type 133), Router Advertisement (Type 134), Neighbor Solicitation (Type 135), Neighbor Advertisement (Type 136), and Redirect (Type 137).",
    "options": [
      {
        "key": "A",
        "text": "Router Solicitation (RS, Type 133)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Router Advertisement (RA, Type 134)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Neighbor Solicitation (NS, Type 135)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Neighbor Advertisement (NA, Type 136)",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IPv6 Address Autoconfiguration",
    "topic": "SLAAC & EUI-64",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When generating a 64-bit Interface Identifier from a 48-bit MAC address using modified EUI-64 format, which bytes are inserted in the middle, and which bit is inverted?",
    "explanation": "In EUI-64, the 16-bit hex value `FF:FE` is inserted into the middle of the 48-bit MAC address, and the 7th bit (Universal/Local bit) of the first byte is inverted.",
    "options": [
      {
        "key": "A",
        "text": "Insert `FF:FE` in the middle and invert the 7th bit (U/L bit)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Insert `00:00` and invert the 1st bit",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Insert `AA:BB` without inverting bits",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Truncate the MAC address to 32 bits",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IPv6 Address Autoconfiguration",
    "topic": "Duplicate Address Detection (DAD)",
    "questionType": "TRUE_FALSE",
    "questionText": "Before an IPv6 unicast address can be used on an interface, the device must perform Duplicate Address Detection (DAD) using Neighbor Solicitation messages to verify no other device uses the address.",
    "explanation": "True. DAD sends Neighbor Solicitation (NS) messages to the Solicited-Node Multicast address to verify address uniqueness before assigning it to the interface.",
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
    "domain": "OSPFv3 Protocol",
    "topic": "OSPF for IPv6",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which dynamic routing protocol is specifically designed to route IPv6 networks, running directly over link-local addresses rather than IPv4 subnets?",
    "explanation": "OSPFv3 is defined in RFC 5340 for IPv6 routing, operating per link rather than per subnet.",
    "options": [
      {
        "key": "A",
        "text": "OSPFv2",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "OSPFv3",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "RIPv1",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "EIGRPv1",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "IPv6 Enhanced Technologies",
    "topic": "SRv6 (Segment Routing over IPv6)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the key structural advantage of Segment Routing over IPv6 (SRv6) in next-generation cloud and telecom IP networks?",
    "explanation": "SRv6 embeds source-routed network programming instructions (Segment Identifiers - SIDs) directly inside IPv6 Segment Routing Extension Headers (SRH), eliminating MPLS labels.",
    "options": [
      {
        "key": "A",
        "text": "Integrates network programming instructions directly into IPv6 extension headers without MPLS",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Forces all packets to be retransmitted twice",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Disables IP encryption for high throughput",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Restricts router throughput to 10 Gbps",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 2,
    "domain": "VRP Routing Diagnostics",
    "topic": "display ip routing-table",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command in Huawei VRP displays the current active IP routing table on a router?",
    "explanation": "`display ip routing-table` shows all active routes, their destinations, masks, protocols, preferences, metrics, next-hops, and outbound interfaces.",
    "options": [
      {
        "key": "A",
        "text": "display ip routing-table",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "show ip route",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "view routing-information",
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
    "weekNumber": 3,
    "domain": "WAN Technologies",
    "topic": "Point-to-Point Protocol (PPP)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which sub-protocol of PPP is responsible for negotiating link parameters (such as Maximum Receive Unit MRU, authentication type, and magic numbers)?",
    "explanation": "Link Control Protocol (LCP) establishes, configures, and tests the data-link connection in PPP.",
    "options": [
      {
        "key": "A",
        "text": "Network Control Protocol (NCP)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Link Control Protocol (LCP)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "IPCP",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "PPPoE",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "WAN Technologies",
    "topic": "PPP Authentication (PAP vs CHAP)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary security advantage of CHAP (Challenge Handshake Authentication Protocol) over PAP (Password Authentication Protocol) in PPP links?",
    "explanation": "PAP sends usernames and passwords in plaintext over the wire in a two-way handshake. CHAP uses a three-way challenge-response handshake with MD5 hashing, never transmitting the password in plaintext.",
    "options": [
      {
        "key": "A",
        "text": "CHAP uses a 3-way challenge-response handshake without transmitting passwords in plaintext",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "PAP encrypts passwords using RSA 4096-bit keys",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "CHAP requires dedicated optical transceivers",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "PAP supports biometrics; CHAP does not",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "WAN Technologies",
    "topic": "PPPoE Discovery Stage",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What broadcast packet is initially sent by a PPPoE client to discover access concentrators on the local Ethernet segment?",
    "explanation": "The PPPoE client broadcasts a PADI (PPPoE Active Discovery Initiation) packet to discover PPPoE Access Concentrators (ACs).",
    "options": [
      {
        "key": "A",
        "text": "PADI (PPPoE Active Discovery Initiation)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "PADO (PPPoE Active Discovery Offer)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "PADR (PPPoE Active Discovery Request)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "PADS (PPPoE Active Discovery Session-confirmation)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "AAA Architecture",
    "topic": "AAA Functions",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which three security services constitute the AAA network access control framework? (Select all that apply)",
    "explanation": "AAA stands for Authentication (verifying identity), Authorization (determining permissions and commands), and Accounting (logging resource consumption and session duration).",
    "options": [
      {
        "key": "A",
        "text": "Authentication (Who are you?)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Authorization (What are you allowed to do?)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Accounting (What did you do and for how long?)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Anonymization (Hiding all IP headers)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "AAA Architecture",
    "topic": "RADIUS vs HWTACACS",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In enterprise network management, how do RADIUS and HWTACACS protocols differ regarding transport protocol and packet encryption?",
    "explanation": "RADIUS uses UDP (ports 1812/1813) and encrypts only the password field. HWTACACS uses TCP (port 49) and encrypts the entire packet body, separating authentication and authorization.",
    "options": [
      {
        "key": "A",
        "text": "RADIUS uses UDP and encrypts only passwords; HWTACACS uses TCP and encrypts the entire packet body",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "RADIUS uses TCP; HWTACACS uses unencrypted ICMP",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Both protocols use identical UDP port 80",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "HWTACACS is for home WiFi; RADIUS is for Bluetooth",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Network Security Basics",
    "topic": "Stateful Inspection Firewalls",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How does a Stateful Inspection Firewall determine whether to allow an inbound packet returning from an external web server?",
    "explanation": "Stateful firewalls maintain a Session Table (connection state tracking). Inbound packets matching an existing active session in the state table are dynamically permitted.",
    "options": [
      {
        "key": "A",
        "text": "By checking if the packet matches an active entry in the internal Session State Table",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "By asking the user via email",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "By inspecting only the Layer 2 source MAC address",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "By permanently allowing all incoming packets on all ports",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Firewall Security Zones",
    "topic": "Default Security Zones",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On Huawei USG firewalls, what is the default priority of the Trust zone, DMZ zone, and Untrust zone respectively?",
    "explanation": "Huawei default zone priorities: Trust = 85 (internal secure network), DMZ = 50 (public-facing servers), Untrust = 5 (insecure external internet). (Local zone = 100).",
    "options": [
      {
        "key": "A",
        "text": "Trust: 85, DMZ: 50, Untrust: 5",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Trust: 100, DMZ: 100, Untrust: 100",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Trust: 1, DMZ: 2, Untrust: 3",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Trust: 5, DMZ: 50, Untrust: 85",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Firewall Security Zones",
    "topic": "Interzone Traffic Direction",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On a Huawei firewall, what is the directional definition of traffic flowing from the Trust zone (priority 85) to the Untrust zone (priority 5)?",
    "explanation": "Traffic moving from a higher-priority zone to a lower-priority zone is classified as Outbound traffic. Traffic from lower to higher priority is Inbound.",
    "options": [
      {
        "key": "A",
        "text": "Outbound",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Inbound",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Lateral",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Loopback",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Firewall Security Policy",
    "topic": "Default Interzone Policy",
    "questionType": "SINGLE_CHOICE",
    "questionText": "By default, what is the default security policy action applied to interzone traffic across different security zones on a Huawei USG firewall?",
    "explanation": "By default, all interzone traffic between different security zones is denied (Default Deny) until explicit security policies are configured.",
    "options": [
      {
        "key": "A",
        "text": "Deny all traffic",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Permit all traffic",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Allow HTTP only and block DNS",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Forward traffic to the cloud console",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Firewall Session Table",
    "topic": "Session 5-Tuple",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which five fields constitute the standard 5-tuple used by firewall session tables to identify unique network flows?",
    "explanation": "The 5-tuple consists of: Source IP Address, Source Port, Destination IP Address, Destination Port, and Transport Protocol.",
    "options": [
      {
        "key": "A",
        "text": "Source IP, Source Port, Destination IP, Destination Port, and Protocol",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "MAC address, VLAN ID, TTL, TOS, and FCS",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Username, Password, Domain, Email, and Phone",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "GPS Latitude, Longitude, Altitude, Time, and Speed",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Network Address Translation (NAT)",
    "topic": "NAT No-PAT vs NAPT",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the key difference between NAT No-PAT and NAPT (Network Address Port Translation) on Huawei firewalls?",
    "explanation": "No-PAT maps private IPs to public IPs one-to-one without translating port numbers (requires one public IP per active host). NAPT multiplexes multiple private IPs onto a single public IP using port numbers.",
    "options": [
      {
        "key": "A",
        "text": "No-PAT translates only IP addresses 1-to-1; NAPT translates both IP and port numbers (PAT)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "No-PAT translates ports only; NAPT translates IP only",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Both modes require 10 public IPs per host",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "NAPT is supported only on dial-up modems",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Network Address Translation (NAT)",
    "topic": "NAT Server Function",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which NAT technique on Huawei firewalls maps a public IP address and port (e.g., `203.0.113.10:80`) to an internal private server IP (`192.168.1.100:80`)?",
    "explanation": "`nat server` (Destination NAT / Port Forwarding) publishes internal servers to the external internet.",
    "options": [
      {
        "key": "A",
        "text": "NAT Server (Destination NAT / Port Forwarding)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Source NAT with Easy IP",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Twice NAT without proxy",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "NAT Loopback exclusion",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Network Address Translation (NAT)",
    "topic": "Easy IP",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is Easy IP in Huawei router and firewall configuration?",
    "explanation": "Easy IP uses the dynamic public IP address directly assigned to the outbound WAN physical interface as the translated public address, ideal when WAN IPs are assigned dynamically via PPPoE/DHCP.",
    "options": [
      {
        "key": "A",
        "text": "Directly uses the public IP address of the outbound WAN interface for NAT translation",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A tool for automatically guessing router passwords",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A service that disables all firewall security policies",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "An IPv6-to-IPv4 static tunnel protocol",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Firewall High Availability",
    "topic": "HRP Protocol",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which proprietary Huawei protocol synchronizes session state tables, dynamic blacklists, and server maps between active and standby firewalls?",
    "explanation": "Huawei Redundancy Protocol (HRP) synchronizes firewall status information and session tables over dedicated heartbeat links.",
    "options": [
      {
        "key": "A",
        "text": "HRP (Huawei Redundancy Protocol)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "VRRP alone without extension",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "STP 802.1D",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "LACP",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Firewall High Availability",
    "topic": "VGMP Management Group",
    "questionType": "TRUE_FALSE",
    "questionText": "VGMP (VRRP Group Management Protocol) synchronizes multiple VRRP groups on a Huawei firewall so that all groups switch over together if a single interface fails.",
    "explanation": "True. VGMP manages multiple VRRP groups as a unified entity, ensuring consistent active/standby state transitions across all interfaces.",
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
    "domain": "Security Threats & Defense",
    "topic": "DoS/DDoS Attacks",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which type of Denial of Service (DoS) attack sends thousands of TCP SYN packets with spoofed source IPs without completing the 3-way handshake, exhausting server connection memory?",
    "explanation": "A SYN Flood attack exploits the TCP 3-way handshake by leaving half-open connections in the server's backlog queue until resources are exhausted.",
    "options": [
      {
        "key": "A",
        "text": "TCP SYN Flood Attack",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "SQL Injection",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Cross-Site Scripting (XSS)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "ARP Poisoning",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Security Threats & Defense",
    "topic": "ARP Spoofing Mitigation",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which switch security feature prevents Man-in-the-Middle attacks by validating ARP packets against the DHCP Snooping binding database on untrusted ports?",
    "explanation": "Dynamic ARP Inspection (DAI) intercepts and validates ARP packets on untrusted ports against valid DHCP snooping IP-MAC bindings to block ARP poisoning.",
    "options": [
      {
        "key": "A",
        "text": "Dynamic ARP Inspection (DAI)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Port Fast",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "BPDU Guard",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Storm Control",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "DHCP Security",
    "topic": "DHCP Snooping",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the function of configuring 'Trusted Ports' in DHCP Snooping on an enterprise switch?",
    "explanation": "DHCP Snooping designates ports connecting to legitimate DHCP servers as 'Trusted'. DHCP Offer and ACK packets received on Untrusted ports are dropped, blocking rogue DHCP servers.",
    "options": [
      {
        "key": "A",
        "text": "Only trusted ports are permitted to forward DHCP server response packets (Offer/ACK)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Trusted ports operate without passwords",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Trusted ports disable VLAN tagging",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Trusted ports mirror all traffic to Wireshark",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Port Security",
    "topic": "MAC Address Limiting",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which feature on Huawei switch access ports restricts the maximum number of dynamic MAC addresses learned, shutting down the port if an unauthorized device connects?",
    "explanation": "Port Security restricts the number of learned MAC addresses on an interface and triggers protective actions (protect, restrict, or shutdown) upon violations.",
    "options": [
      {
        "key": "A",
        "text": "Port Security",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "LLDP Agent",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Flow Control",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Jumbo Frame Support",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Port Security",
    "topic": "Sticky MAC Addresses",
    "questionType": "TRUE_FALSE",
    "questionText": "Sticky MAC addresses in Port Security convert dynamically learned MAC addresses into persistent security MAC addresses that can be saved into the configuration file.",
    "explanation": "True. Sticky MAC automatically records dynamically learned MACs and adds them as permanent secure MAC entries saved with `save`.",
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
    "domain": "VRP Security Management",
    "topic": "SSH vs Telnet",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is SSH (Stelnet) mandated over Telnet for remote CLI management of Huawei routers and switches?",
    "explanation": "Telnet transmits all credentials and commands in plaintext. SSH encrypts the entire management session using symmetric ciphers and public key authentication.",
    "options": [
      {
        "key": "A",
        "text": "SSH encrypts all management traffic; Telnet transmits in plaintext",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Telnet requires optical fiber cables",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "SSH operates only in GUI mode",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Telnet is limited to 1 byte per second",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "VRP Security Management",
    "topic": "User Privilege Levels",
    "questionType": "SINGLE_CHOICE",
    "questionText": "On Huawei VRP devices, what are the user privilege levels from 0 to 3 respectively?",
    "explanation": "Huawei VRP levels: 0 = Visit (ping, tracert), 1 = Monitoring (display commands), 2 = Configuration (business config), 3 = Management (system reboot, user management).",
    "options": [
      {
        "key": "A",
        "text": "0: Visit, 1: Monitoring, 2: Configuration, 3: Management",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "0: Superuser, 1: Admin, 2: Operator, 3: Guest",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "0: Offline, 1: Read, 2: Write, 3: Delete",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Levels 0 to 3 have identical permissions",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "WAN Technologies",
    "topic": "HDLC Protocol",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What synchronous WAN encapsulation protocol was standardized by ISO and is supported on synchronous serial interfaces on Huawei routers?",
    "explanation": "High-Level Data Link Control (HDLC) is a synchronous data link layer protocol for point-to-point serial links.",
    "options": [
      {
        "key": "A",
        "text": "HDLC (High-Level Data Link Control)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Token Ring",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "ATM AAL5",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Ethernet DIX",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "WAN Technologies",
    "topic": "PPP IPCP Negotiation",
    "questionType": "TRUE_FALSE",
    "questionText": "During PPP NCP negotiation on a point-to-point link, the IP Control Protocol (IPCP) can automatically assign an IP address to the peer router interface.",
    "explanation": "True. IPCP supports dynamic IP address negotiation where one side provides an IP address to the peer router using `peer ip address`.",
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
    "domain": "Firewall Architecture",
    "topic": "Virtual Systems",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which technology on Huawei USG firewalls partitions a single physical firewall into multiple independent virtual firewalls with dedicated routing tables and policies for multi-tenancy?",
    "explanation": "Virtual System (vsys) technology virtualizes one physical firewall into multiple independent logical firewalls for multi-tenant isolation.",
    "options": [
      {
        "key": "A",
        "text": "Virtual System (vsys)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Virtual Local Area Network (VLAN)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Sub-interface dot1q",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "VPN Instance only",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Network Security",
    "topic": "Intrusion Prevention System (IPS)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary function of an Intrusion Prevention System (IPS) deployed on next-generation firewalls?",
    "explanation": "An IPS inspects deep application payloads in real time against signature databases to detect and actively block worms, exploits, and vulnerabilities.",
    "options": [
      {
        "key": "A",
        "text": "Deep packet inspection to detect and actively block network exploits and malware payloads",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Translating public domain names to IP addresses",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Assigning IP addresses via DHCP",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Managing physical data center air conditioning",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Firewall Diagnostics",
    "topic": "display firewall session table",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command in Huawei USG firewalls displays active session table entries in real time?",
    "explanation": "`display firewall session table` displays active connection state entries in the firewall session table.",
    "options": [
      {
        "key": "A",
        "text": "display firewall session table",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "show connections active",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "display ip routes",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "session query all",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Security Policy Configuration",
    "topic": "Action Types",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In a Huawei firewall security policy, what are the two fundamental actions that can be configured when traffic matches all rule criteria?",
    "explanation": "Security policy actions are `permit` (forward traffic and create a session) or `deny` (block traffic).",
    "options": [
      {
        "key": "A",
        "text": "permit or deny",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "forward or mirror",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "encrypt or compress",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "reboot or restart",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 3,
    "domain": "Network Security",
    "topic": "Blacklist Feature",
    "questionType": "TRUE_FALSE",
    "questionText": "A Firewall Blacklist drops packets matching blacklisted source IP addresses before they undergo security policy processing, reducing firewall CPU load.",
    "explanation": "True. Blacklist filtering occurs in early packet processing, immediately dropping matching packets before security policy evaluations.",
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
    "domain": "AAA Configuration",
    "topic": "Local User Configuration",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command in the AAA view on a Huawei device creates a local management user named `admin` with service type SSH?",
    "explanation": "`local-user admin service-type ssh` configures SSH access for the local AAA user.",
    "options": [
      {
        "key": "A",
        "text": "local-user admin service-type ssh",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "username admin access ssh",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "user admin enable-ssh",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "set user admin = ssh",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Cryptography Fundamentals",
    "topic": "Symmetric vs Asymmetric Encryption",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the defining characteristic of Symmetric Key Encryption algorithms (such as AES)?",
    "explanation": "Symmetric encryption uses the exact same shared secret key for both encryption and decryption, offering high throughput and low CPU overhead.",
    "options": [
      {
        "key": "A",
        "text": "The same shared secret key is used for both encryption and decryption",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A public key encrypts and a private key decrypts",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Data cannot be decrypted once encrypted",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Encryption keys must be 1,000,000 bits long",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Cryptography Fundamentals",
    "topic": "Asymmetric Key Algorithms",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which of the following are classic Asymmetric Key (Public-Key) Cryptography algorithms? (Select all that apply)",
    "explanation": "Asymmetric algorithms use public/private key pairs: RSA, Diffie-Hellman (DH for key exchange), and Elliptic Curve Cryptography (ECC). AES and DES are symmetric.",
    "options": [
      {
        "key": "A",
        "text": "RSA",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Diffie-Hellman (DH)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "ECC (Elliptic Curve Cryptography)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "AES (Advanced Encryption Standard)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Cryptography Fundamentals",
    "topic": "Cryptographic Hash Functions",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What security properties are guaranteed by a Cryptographic Hash function (such as SHA-256)?",
    "explanation": "Hash functions generate a fixed-size digest from arbitrary input, providing data integrity verification and one-way irreversibility.",
    "options": [
      {
        "key": "A",
        "text": "Fixed-length digest output and one-way irreversibility for integrity verification",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Reversible decryption using a private key",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Automatic packet routing across BGP peers",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Elimination of TCP packet retransmissions",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Public Key Infrastructure (PKI)",
    "topic": "Digital Certificates",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In a PKI digital certificate (ITU-T X.509 standard), what entity cryptographically signs the certificate to bind a public key to an entity's identity?",
    "explanation": "A trusted Certificate Authority (CA) signs the digital certificate with its own private key.",
    "options": [
      {
        "key": "A",
        "text": "Certificate Authority (CA)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Local Ethernet Switch",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "DNS Root Server",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "DHCP Relay Agent",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Generic Routing Encapsulation (GRE)",
    "topic": "GRE Characteristics",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary benefit of deploying a GRE (Generic Routing Encapsulation) tunnel, and what is its primary security limitation?",
    "explanation": "GRE encapsulates multicast and routing protocol packets (e.g., OSPF) across IPv4 networks (IP protocol 47), but provides zero native encryption or authentication.",
    "options": [
      {
        "key": "A",
        "text": "Supports multicast and dynamic routing protocols, but provides zero data encryption",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Provides military-grade 256-bit encryption natively",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Runs only over optical submarine cables",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Eliminates all IP headers",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "IPsec Architecture",
    "topic": "Security Protocols (AH vs ESP)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the key functional difference between IPsec AH (Authentication Header) and ESP (Encapsulating Security Payload)?",
    "explanation": "AH (IP protocol 51) provides data integrity and authentication but no encryption, and fails through NAT. ESP (IP protocol 50) provides both encryption (confidentiality) and authentication.",
    "options": [
      {
        "key": "A",
        "text": "AH provides authentication without encryption; ESP provides both encryption and authentication",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "AH provides encryption; ESP provides only compression",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "AH runs over UDP; ESP runs over TCP",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Both protocols provide identical encryption algorithms",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "IPsec Architecture",
    "topic": "Encapsulation Modes (Transport vs Tunnel)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which IPsec encapsulation mode encapsulates the entire original IP packet (header and payload) and prepends a brand-new outer IP header?",
    "explanation": "Tunnel Mode encapsulates the entire original IP packet and adds a new outer IP header, standard for site-to-site gateway VPNs.",
    "options": [
      {
        "key": "A",
        "text": "Transport Mode",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Tunnel Mode",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Direct Mode",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Passthrough Mode",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "IPsec Architecture",
    "topic": "NAT-Traversal (NAT-T)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When an IPsec ESP tunnel traverses a NAT gateway device on the internet, which UDP port is used by NAT-Traversal (NAT-T) to encapsulate ESP packets?",
    "explanation": "NAT-T encapsulates ESP packets inside UDP port 4500 (while IKE negotiation uses UDP port 500) so that intermediate NAT routers can translate port numbers.",
    "options": [
      {
        "key": "A",
        "text": "UDP 500",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "UDP 4500",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "TCP 443",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "TCP 80",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Internet Key Exchange (IKE)",
    "topic": "IKEv1 Phases",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In IKEv1 negotiation, what Security Associations (SAs) are negotiated in Phase 1 and Phase 2 respectively?",
    "explanation": "Phase 1 negotiates an IKE SA (bi-directional secure channel). Phase 2 negotiates two unidirectional IPsec SAs used to encrypt user data.",
    "options": [
      {
        "key": "A",
        "text": "Phase 1 negotiates the IKE SA; Phase 2 negotiates IPsec SAs",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Phase 1 encrypts data; Phase 2 terminates the tunnel",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Phase 1 is for IPv4; Phase 2 is for IPv6",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Both phases negotiate the exact same SSL certificate",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Internet Key Exchange (IKE)",
    "topic": "IKEv1 Main vs Aggressive Mode",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How many messages are exchanged in IKEv1 Phase 1 Main Mode versus Aggressive Mode?",
    "explanation": "Main Mode exchanges 6 messages (protecting peer identity); Aggressive Mode exchanges 3 messages (faster, but transmits identity unencrypted).",
    "options": [
      {
        "key": "A",
        "text": "Main Mode: 6 messages; Aggressive Mode: 3 messages",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Main Mode: 2 messages; Aggressive Mode: 10 messages",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Main Mode: 4 messages; Aggressive Mode: 4 messages",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Main Mode: 1 message; Aggressive Mode: 0 messages",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "SSL VPN Technologies",
    "topic": "SSL VPN Access Modes",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which access modes are typically supported by enterprise SSL VPN solutions on Huawei firewalls? (Select all that apply)",
    "explanation": "SSL VPN supports: Web Access (clientless browser portal), Port Forwarding (TCP app proxy), and Network Extension (virtual adapter full IP tunnel).",
    "options": [
      {
        "key": "A",
        "text": "Web Access (Clientless browser access)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Port Forwarding (TCP application redirection)",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Network Extension (Virtual NIC full Layer 3 tunnel)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Physical coaxial cable splicing",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Data Center Networks (DCN)",
    "topic": "Spine-Leaf Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is the two-tier Spine-Leaf Clos architecture preferred over traditional three-tier architectures in modern cloud data centers?",
    "explanation": "Spine-Leaf delivers predictable, consistent low latency for East-West server-to-server traffic, where every Leaf switch is exactly one hop away from any other Leaf switch.",
    "options": [
      {
        "key": "A",
        "text": "Provides consistent, ultra-low latency for East-West traffic with non-blocking ECMP links",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Eliminates all Ethernet cabling",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Restricts data centers to a maximum of 4 servers",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Forces all traffic through a single central hub",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Data Center Networks (DCN)",
    "topic": "M-LAG Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What problem does Multichassis Link Aggregation Group (M-LAG) solve in data center access switching?",
    "explanation": "M-LAG virtualizes two switches at Layer 2 to form active-active link aggregation with downstream servers without running STP, eliminating blocked ports.",
    "options": [
      {
        "key": "A",
        "text": "Enables dual-active link aggregation across two switches without STP blocking ports",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Replaces all IP routing tables with static DNS records",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Eliminates server power supplies",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Compresses database backups by 90%",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Data Center Networks (DCN)",
    "topic": "M-LAG Key Links",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which link between two M-LAG peer switches is responsible for exchanging negotiation packets and forwarding data traffic during single-homed failures?",
    "explanation": "The Peer-link (a Layer 2 aggregation link) connects the two peer switches to exchange negotiation messages and carry transit traffic.",
    "options": [
      {
        "key": "A",
        "text": "Peer-link",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Keepalive link only",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Internet transit link",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Console cable link",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "VXLAN Overlay Networks",
    "topic": "VXLAN Overview & RFC",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What type of network encapsulation technology is Virtual Extensible LAN (VXLAN, RFC 7348)?",
    "explanation": "VXLAN is a MAC-in-UDP network virtualization overlay technology that encapsulates Layer 2 Ethernet frames inside Layer 3 UDP packets.",
    "options": [
      {
        "key": "A",
        "text": "MAC-in-UDP Layer 2 overlay over a Layer 3 underlay network",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Raw IP-in-IP without UDP headers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Layer 1 physical wave division multiplexing",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Token Ring over FDDI",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "VXLAN Overlay Networks",
    "topic": "VNI Capacity",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How many bits are allocated for the VXLAN Network Identifier (VNI), and how many unique virtual tenant networks does it support compared to VLAN's 4096?",
    "explanation": "The VNI is 24 bits wide ($2^{24} = 16,777,216$), expanding the network isolation capability from VLAN's 4,096 up to 16 million virtual networks.",
    "options": [
      {
        "key": "A",
        "text": "24 bits (up to 16 million virtual networks)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "12 bits (4096 networks)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "32 bits (4 billion networks)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "8 bits (256 networks)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "VXLAN Overlay Networks",
    "topic": "VXLAN Destination Port",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the standard IANA-assigned UDP destination port used in outer VXLAN transport headers?",
    "explanation": "IANA officially allocated UDP destination port 4789 for standard VXLAN encapsulation.",
    "options": [
      {
        "key": "A",
        "text": "UDP 4789",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "UDP 500",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "TCP 443",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "UDP 8080",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "VXLAN Overlay Networks",
    "topic": "VTEP Function",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is a VXLAN Tunnel End Point (VTEP) in a cloud data center network?",
    "explanation": "A VTEP is the entity (switch hardware or virtual switch) that performs VXLAN encapsulation and de-encapsulation, terminating VXLAN tunnels.",
    "options": [
      {
        "key": "A",
        "text": "The entity that encapsulates and de-encapsulates VXLAN frames",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A hardware cable tester tool",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A client browser plugin",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A physical patch panel in the server rack",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Ethernet VPN (EVPN)",
    "topic": "EVPN Control Plane",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which protocol serves as the unified control plane for VXLAN in modern enterprise DCNs to discover MAC addresses and VTEP endpoints without flood-and-learn?",
    "explanation": "Multiprotocol BGP Ethernet VPN (MP-BGP EVPN) provides the standard control plane for VXLAN, advertising MAC and IP routes via BGP updates.",
    "options": [
      {
        "key": "A",
        "text": "MP-BGP EVPN",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Spanning Tree Protocol (STP)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "RIPv2",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "SNMPv3",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Ethernet VPN (EVPN)",
    "topic": "EVPN Route Type 2",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In MP-BGP EVPN, what does an EVPN Route Type 2 (MAC/IP Advertisement Route) advertise between VTEPs?",
    "explanation": "Type 2 routes advertise individual host MAC addresses (and optionally host IP addresses) and corresponding VNI mappings across the data center.",
    "options": [
      {
        "key": "A",
        "text": "Host MAC address and IP address advertisement",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Auto-discovery of BGP peers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Inclusive Multicast Ethernet Tag route",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "External IP Prefix route",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Data Center Storage",
    "topic": "SAN vs NAS",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary protocol and addressing difference between Storage Area Networks (SAN) and Network Attached Storage (NAS)?",
    "explanation": "SAN delivers block-level storage over Fibre Channel (FC) or iSCSI. NAS delivers file-level shared storage over network file systems (NFS, CIFS).",
    "options": [
      {
        "key": "A",
        "text": "SAN provides block-level storage (FC/iSCSI); NAS provides file-level storage (NFS/CIFS)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "SAN is for smartphones; NAS is for supercomputers",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Both use identical HTTP protocols without disk drivers",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "NAS is block-level; SAN is file-level",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Data Center Virtualization",
    "topic": "Server Virtualization (vSwitch)",
    "questionType": "TRUE_FALSE",
    "questionText": "In server virtualization, a Virtual Switch (vSwitch) running inside the hypervisor forwards Ethernet frames between virtual machine virtual NICs and physical uplinks.",
    "explanation": "True. Virtual switches (e.g., Open vSwitch) manage Layer 2 frame forwarding among VMs and to physical network interface cards.",
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
    "domain": "IPsec Security Policy",
    "topic": "Security ACL in IPsec",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In route-based or policy-based IPsec VPN on Huawei routers, what does the 'Interesting Traffic' ACL define?",
    "explanation": "The interesting traffic ACL defines which data packets matching source and destination IP subnets must be encrypted and sent through the IPsec tunnel.",
    "options": [
      {
        "key": "A",
        "text": "The traffic flows that match encryption criteria and must be protected by IPsec",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Traffic that should be discarded unconditionally",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Unencrypted DNS queries only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Traffic destined to streaming video services",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "IPsec Diagnostics",
    "topic": "display ipsec sa",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command in Huawei VRP verifies whether an IPsec Security Association (SA) has been successfully negotiated and displays packet encryption counters?",
    "explanation": "`display ipsec sa` shows the status of established IPsec SAs, SPI numbers, encryption/authentication algorithms, and encapsulated packet statistics.",
    "options": [
      {
        "key": "A",
        "text": "display ipsec sa",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "show vpn status",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "display crypto isakmp",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "ipsec verify all",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "IPsec Diagnostics",
    "topic": "display ike sa",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command verifies the establishment status of IKE Phase 1 Security Associations on a Huawei firewall or router?",
    "explanation": "`display ike sa` shows whether IKE Phase 1 negotiations have completed successfully (indicated by `RD` or `DONE` flags).",
    "options": [
      {
        "key": "A",
        "text": "display ike sa",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "display ospf peer",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "ike show debug",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "display nat session",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Network Security",
    "topic": "Diffie-Hellman Key Exchange",
    "questionType": "TRUE_FALSE",
    "questionText": "Diffie-Hellman (DH) key exchange allows two peers to establish a shared symmetric secret over an insecure channel without transmitting the secret itself across the wire.",
    "explanation": "True. Diffie-Hellman uses discrete logarithm mathematics to compute a shared secret across public unencrypted channels.",
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
    "domain": "Data Center Overlay",
    "topic": "Underlay vs Overlay",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In modern cloud data center architectures, what is the Underlay network?",
    "explanation": "The Underlay network is the physical Layer 3 routed fabric (spine-leaf switches running BGP or OSPF) providing high-bandwidth IP connectivity for overlay tunnels.",
    "options": [
      {
        "key": "A",
        "text": "The physical Layer 3 network fabric that provides packet transport for overlays",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A guest operating system running on a laptop",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A wireless Wi-Fi guest portal",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "An external cloud storage bucket",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "Data Center Fabric",
    "topic": "ECMP Routing",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why is Equal-Cost Multi-Path (ECMP) routing heavily utilized in Spine-Leaf data center underlay fabrics?",
    "explanation": "ECMP load-balances network traffic across all parallel spine switches using flow hashes, fully utilizing all available physical link bandwidth without blocking links.",
    "options": [
      {
        "key": "A",
        "text": "Enables traffic load balancing across multiple equal-cost spine links without blocking paths",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Shuts down 50% of switches to conserve electricity",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Converts all packets to IPv6 strictly",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Replaces hardware MAC tables",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "EVPN Route Types",
    "topic": "EVPN Route Type 5",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which EVPN Route Type is an IP Prefix Advertisement route, used for advertising external subnets and routed prefixes into the EVPN domain?",
    "explanation": "Type 5 routes (IP Prefix Advertisement) distribute routed subnet prefixes into EVPN across data centers.",
    "options": [
      {
        "key": "A",
        "text": "Type 5 (IP Prefix Route)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Type 1 (Ethernet Auto-Discovery)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Type 3 (Inclusive Multicast)",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Type 4 (Ethernet Segment)",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 4,
    "domain": "GRE Tunnel Configuration",
    "topic": "Tunnel Protocol GRE",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command on a Huawei Tunnel interface specifies that the tunnel encapsulation protocol is GRE?",
    "explanation": "`tunnel-protocol gre` sets the encapsulation protocol of the tunnel interface to Generic Routing Encapsulation.",
    "options": [
      {
        "key": "A",
        "text": "tunnel-protocol gre",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "encapsulation ipsec",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "mode pppoe",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "link-type trunk",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "802.11 Standards",
    "topic": "Wi-Fi Generations",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which IEEE standard corresponds to the high-efficiency 'Wi-Fi 6' generation, introducing OFDMA and MU-MIMO in both 2.4 GHz and 5 GHz frequency bands?",
    "explanation": "IEEE 802.11ax corresponds to Wi-Fi 6, introducing OFDMA, 1024-QAM, Target Wake Time (TWT), and multi-user MIMO for high-density environments.",
    "options": [
      {
        "key": "A",
        "text": "802.11n (Wi-Fi 4)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "802.11ac (Wi-Fi 5)",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "802.11ax (Wi-Fi 6)",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "802.11b",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "802.11 Physical Layer",
    "topic": "2.4 GHz Non-Overlapping Channels",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In the 2.4 GHz frequency spectrum with standard 20 MHz channel width, which three channels are universally considered non-overlapping in most regulatory domains?",
    "explanation": "Channels 1, 6, and 11 have 25 MHz channel separation, allowing concurrent operation without co-channel interference.",
    "options": [
      {
        "key": "A",
        "text": "Channels 1, 6, and 11",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Channels 1, 2, and 3",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Channels 36, 40, and 44",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Channels 10, 11, and 12",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Architecture",
    "topic": "Fat AP vs Fit AP",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the key architectural difference between a Fat AP and a Fit AP in enterprise wireless networking?",
    "explanation": "A Fat AP operates autonomously (configuring RF, security, and routing standalone). A Fit AP requires an Access Controller (AC) to deliver configurations, managing RF and security centrally via CAPWAP tunnels.",
    "options": [
      {
        "key": "A",
        "text": "Fat APs operate autonomously; Fit APs require an Access Controller (AC) for centralized management",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Fat APs require an AC; Fit APs do not",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Fat APs use 5 GHz only; Fit APs use 2.4 GHz only",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Fit APs do not emit radio waves",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "CAPWAP Protocol",
    "topic": "Tunnel Roles & UDP Ports",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which standard UDP port numbers are used by the CAPWAP protocol for the Control Tunnel and Data Tunnel respectively?",
    "explanation": "CAPWAP uses UDP port 5246 for the Control Tunnel (encrypted with DTLS) and UDP port 5247 for the Data Tunnel.",
    "options": [
      {
        "key": "A",
        "text": "Control: UDP 5246; Data: UDP 5247",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Control: UDP 500; Data: UDP 4500",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Control: TCP 80; Data: TCP 443",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Control: UDP 1812; Data: UDP 1813",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "CAPWAP Forwarding Modes",
    "topic": "Tunnel Forwarding vs Direct Forwarding",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Direct Forwarding (Local Breakout) mode, how are wireless client user data frames handled by the Fit AP?",
    "explanation": "In Direct Forwarding, user data frames are converted into standard 802.3 Ethernet frames by the AP and switched directly onto the local access network without traversing the AC over CAPWAP data tunnels.",
    "options": [
      {
        "key": "A",
        "text": "Switched directly onto the local wired access switch without traversing the AC",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Encapsulated into CAPWAP data tunnels to the AC for centralized breakout",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Broadcasted over FM radio frequencies",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Dropped if the AC connection drops for 1 millisecond",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "AP Online Process",
    "topic": "AP AC Discovery",
    "questionType": "MULTIPLE_CHOICE",
    "questionText": "Which methods can a Huawei Fit AP use to discover the IP address of its designated Access Controller (AC)? (Select all that apply)",
    "explanation": "Fit APs discover ACs via: 1. DHCP Option 43 in the IP offer, 2. DNS domain name lookup, 3. Broadcast discovery (on the local L2 broadcast domain), and 4. Static IP configuration.",
    "options": [
      {
        "key": "A",
        "text": "DHCP Option 43 in the IP address offer",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "DNS resolution of the AC domain name",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Broadcast CAPWAP Discovery Request on the local subnet",
        "isCorrect": true
      },
      {
        "key": "D",
        "text": "Statically configured AC IP on the AP",
        "isCorrect": true
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "AP Online Process",
    "topic": "DTLS Encryption",
    "questionType": "TRUE_FALSE",
    "questionText": "The CAPWAP Control Tunnel between a Fit AP and an AC can be encrypted using Datagram Transport Layer Security (DTLS) to prevent eavesdropping and unauthorized configuration alteration.",
    "explanation": "True. DTLS establishes an encrypted tunnel over UDP 5246, securing CAPWAP management exchanges and configuration delivery.",
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
    "domain": "WLAN Identifiers",
    "topic": "SSID vs BSSID",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the difference between an SSID and a BSSID in wireless networks?",
    "explanation": "SSID (Service Set Identifier) is the human-readable network name broadcasted to users (e.g., 'Huawei-Guest'). BSSID (Basic Service Set Identifier) is the physical MAC address of the radio interface emitting that SSID.",
    "options": [
      {
        "key": "A",
        "text": "SSID is the human-readable wireless network name; BSSID is the radio's MAC address",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "BSSID is the human-readable name; SSID is the frequency channel",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "SSID is 128 bits; BSSID is 2 bits",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Both terms represent the physical antenna gain",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "STA Online Process",
    "topic": "Association Sequence",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the correct sequential order of steps for a wireless client station (STA) connecting to a Wi-Fi network?",
    "explanation": "The client: 1. Scans for beacon/probe responses; 2. Performs link authentication (Open/Shared); 3. Performs 802.11 association; 4. Completes key exchange (WPA2 4-way handshake) / IP acquisition.",
    "options": [
      {
        "key": "A",
        "text": "Scanning -> Link Authentication -> Association -> Key Exchange & DHCP IP",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "DHCP IP -> Scanning -> Association -> Link Authentication",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Key Exchange -> Scanning -> Association -> Disconnect",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Association -> DHCP IP -> Scanning -> Power down",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Security",
    "topic": "WPA2 Security Suite",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which encryption cipher suite and integrity protocol is mandated by the Wi-Fi Alliance for WPA2-level security?",
    "explanation": "WPA2 mandates CCMP (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol) based on the robust AES symmetric encryption algorithm.",
    "options": [
      {
        "key": "A",
        "text": "AES-CCMP",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "WEP with RC4 40-bit",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "TKIP without integrity",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Plaintext base64",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Security",
    "topic": "WPA3 & SAE",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What key exchange protocol was introduced in WPA3-Personal to replace the vulnerable WPA2 Pre-Shared Key 4-way handshake and prevent offline dictionary / KRACK attacks?",
    "explanation": "Simultaneous Authentication of Equals (SAE), based on the Dragonfly key exchange, provides forward secrecy and protects against offline password guessing attacks in WPA3.",
    "options": [
      {
        "key": "A",
        "text": "Simultaneous Authentication of Equals (SAE)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "WEP 64-bit Hex Entry",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "PAP Plaintext",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Telnet prompt login",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Security",
    "topic": "WPA-Enterprise & 802.1X",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In an 802.1X wireless enterprise deployment, which server is responsible for authenticating employee credentials and granting network admission?",
    "explanation": "A central RADIUS (Remote Authentication Dial-In User Service) server authenticates user credentials via EAP protocols (EAP-PEAP, EAP-TLS).",
    "options": [
      {
        "key": "A",
        "text": "RADIUS Server",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "DNS Server",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "NTP Time Server",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "FTP Server",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Roaming",
    "topic": "Layer 2 Roaming",
    "questionType": "SINGLE_CHOICE",
    "questionText": "When a wireless client roams from AP1 to AP2 where both APs belong to the exact same VLAN and IP subnet (Layer 2 Roaming), what happens to the client's IP address and active TCP sessions?",
    "explanation": "In Layer 2 Roaming within the same subnet, the client's IP address remains unchanged, and active TCP sessions continue without interruption.",
    "options": [
      {
        "key": "A",
        "text": "The IP address is preserved and TCP connections remain uninterrupted",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "The client is assigned a completely new IP address and all TCP sessions terminate",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "The client must reboot its operating system",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "The client's MAC address is regenerated",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Roaming",
    "topic": "Layer 3 Roaming",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Layer 3 Roaming where a client moves to an AP on a different subnet, how does Huawei WLAN architecture ensure active sessions do not disconnect?",
    "explanation": "Huawei WLAN establishes a CAPWAP tunnel between the Foreign Agent (new AP/AC) and Home Agent (original AP/AC), tunneling packets to preserve the client's original IP address.",
    "options": [
      {
        "key": "A",
        "text": "Tunnels traffic back to the Home Agent so the client retains its original IP address",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Changes the client's public DNS records every 5 seconds",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Drops all packets until the user logs into a web portal",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Requires a physical Ethernet cable connection",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Radio Resource Management (RRM)",
    "topic": "Dynamic Channel Allocation (DCA)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the function of Dynamic Channel Allocation (DCA) in Huawei Radio Resource Management (RRM)?",
    "explanation": "DCA continuously analyzes environmental radio interference and automatically assigns non-interfering channels to neighboring APs to minimize co-channel interference.",
    "options": [
      {
        "key": "A",
        "text": "Automatically optimizes AP channel assignments to minimize radio co-channel interference",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Changes the switch root password daily",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Limits bandwidth to 56 kbps",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Restricts Wi-Fi access to Android phones only",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Radio Resource Management (RRM)",
    "topic": "Transmit Power Control (TPC)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What does Transmit Power Control (TPC) adjust on enterprise wireless APs?",
    "explanation": "TPC automatically adjusts the transmit power of each AP to cover coverage holes while preventing radio cell overlap and co-channel interference.",
    "options": [
      {
        "key": "A",
        "text": "Adjusts AP radio transmission power to eliminate coverage holes and minimize inter-AP overlap",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Controls electrical power outlet voltage",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Adjusts screen brightness on connected smartphones",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Increases server fan speeds",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Security",
    "topic": "WIDS/WIPS",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary role of a Wireless Intrusion Detection/Prevention System (WIDS/WIPS) on Huawei ACs?",
    "explanation": "WIDS/WIPS monitors the wireless airspace for rogue APs, unauthorized ad-hoc networks, wireless spoofing, and rogue client attacks, containing threats in real time.",
    "options": [
      {
        "key": "A",
        "text": "Detects and contains rogue APs, spoofed SSIDs, and unauthorized wireless attacks",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Compresses video files uploaded to YouTube",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Measures building room humidity",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Charges contestants a fee per Wi-Fi packet",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Wi-Fi 6 Advanced Features",
    "topic": "OFDMA Technology",
    "questionType": "SINGLE_CHOICE",
    "questionText": "How does Orthogonal Frequency Division Multiple Access (OFDMA) in Wi-Fi 6 improve spectrum efficiency compared to Wi-Fi 5 OFDM?",
    "explanation": "OFDMA divides a channel into multiple Resource Units (RUs), allowing the AP to communicate with multiple clients simultaneously in a single transmission cycle.",
    "options": [
      {
        "key": "A",
        "text": "Subdivides channels into Resource Units (RUs) to transmit to multiple clients concurrently",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Transmits data over infrared light instead of radio",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Forces all users to wait in a single queue one by one",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Disables multiple antennas completely",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Wi-Fi 6 Advanced Features",
    "topic": "Target Wake Time (TWT)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is the primary benefit of the Target Wake Time (TWT) mechanism introduced in 802.11ax for IoT battery-powered sensors?",
    "explanation": "TWT allows APs and IoT clients to negotiate specific sleep schedules and wake-up times, dramatically reducing radio contention and extending battery life.",
    "options": [
      {
        "key": "A",
        "text": "Schedules client wake-up times to conserve battery power on mobile and IoT devices",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Sets computer system clocks to UTC",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Sounds an audible alarm when the network disconnects",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Automatically wakes up network administrators at 6 AM",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Antennas",
    "topic": "Antenna Types (Omnidirectional vs Directional)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which type of antenna radiates wireless radio signals equally in all 360-degree horizontal directions, typically used for ceiling-mounted indoor office APs?",
    "explanation": "Omnidirectional antennas provide 360-degree horizontal donut-shaped coverage, ideal for indoor rooms and corridors.",
    "options": [
      {
        "key": "A",
        "text": "Omnidirectional Antenna",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Directional Patch Antenna",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Parabolic Dish Antenna",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Laser Beam Transceiver",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Network Planning",
    "topic": "Signal Attenuation",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which common building material causes the highest radio frequency signal attenuation (loss in dB) when Wi-Fi signals propagate through walls?",
    "explanation": "Reinforced concrete walls with steel rebar cause extreme RF attenuation (often 10\u201325 dB or complete blockage) compared to drywall or wood.",
    "options": [
      {
        "key": "A",
        "text": "Drywall partition (plasterboard)",
        "isCorrect": false
      },
      {
        "key": "B",
        "text": "Reinforced concrete wall with steel rebar",
        "isCorrect": true
      },
      {
        "key": "C",
        "text": "Clear glass window without metal film",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Wooden door",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Network Planning",
    "topic": "RSSI Benchmark",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What minimum Received Signal Strength Indicator (RSSI) benchmark is standardly recommended for high-quality voice and video over Wi-Fi services?",
    "explanation": "An RSSI of $-65$ dBm or better (e.g., $-60$ dBm to $-50$ dBm) is standardly required for enterprise voice/video with low packet loss.",
    "options": [
      {
        "key": "A",
        "text": "-65 dBm or better",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "-95 dBm",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "+50 dBm",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "0 dBm strictly",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Architecture",
    "topic": "Agile Distributed Architecture",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In Huawei's Agile Distributed Wi-Fi solution, what devices are placed in hotel guest rooms or university dormitories to provide full-strength wireless and wired ports?",
    "explanation": "Central APs manage remote units (RUs) deployed in each individual room, connected via standard Ethernet cables without individual AP licensing overhead.",
    "options": [
      {
        "key": "A",
        "text": "Remote Units (RUs / RRUs)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "Core Chassis Switches",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Direct Connect Gateways",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "Mainframe terminals",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Configuration",
    "topic": "VAP (Virtual Access Point)",
    "questionType": "SINGLE_CHOICE",
    "questionText": "What is a Virtual Access Point (VAP) created on a Huawei wireless Access Controller?",
    "explanation": "A VAP is a virtualized AP instance created on an AP radio, binding an SSID profile, security profile, and VAP profile to broadcast a specific wireless network.",
    "options": [
      {
        "key": "A",
        "text": "A logical AP instance created on a radio, binding SSID and security profiles",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "A simulated software switch for testing on PC",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "A physical optical transceiver module",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "A cloud backup repository for AP firmware",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Diagnostics",
    "topic": "display ap all",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command on a Huawei Access Controller displays the list, MAC addresses, state (normal/fault), and IP addresses of all managed APs?",
    "explanation": "`display ap all` outputs the summary of all APs registered with the AC, including their AP IDs, MACs, names, models, and operational states (`nor` for normal).",
    "options": [
      {
        "key": "A",
        "text": "display ap all",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "show wireless ap",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "view access-points",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "list all ap-members",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Diagnostics",
    "topic": "display station all",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which command on a Huawei AC displays all currently associated wireless client stations, their MACs, connected APs, and signal strengths?",
    "explanation": "`display station all` lists all connected wireless client terminals.",
    "options": [
      {
        "key": "A",
        "text": "display station all",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "show clients connected",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "view wifi users",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "display arp table",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Security",
    "topic": "Portal Authentication",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Which authentication method redirects unauthenticated guest users opening a web browser to an HTTP captive portal page for login or SMS verification?",
    "explanation": "Portal Authentication (Web Captive Portal) intercepts initial HTTP traffic and redirects users to a web login portal page.",
    "options": [
      {
        "key": "A",
        "text": "Portal Authentication (Web Captive Portal)",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "802.1X PEAP without web browser",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Pre-Shared Key hex code entry",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "MAC address hard-coding",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "WLAN Security",
    "topic": "MAC Address Whitelisting",
    "questionType": "TRUE_FALSE",
    "questionText": "When a WLAN security profile enables MAC address whitelisting, only wireless clients whose hardware MAC addresses match the whitelist are permitted to associate with the SSID.",
    "explanation": "True. Whitelisting restricts association to pre-approved MAC addresses, dropping association requests from unlisted devices.",
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
    "domain": "WLAN Radio Planning",
    "topic": "Dual-Band Concurrent APs",
    "questionType": "SINGLE_CHOICE",
    "questionText": "Why do modern enterprise APs operate dual-band radios concurrently on both 2.4 GHz and 5 GHz bands?",
    "explanation": "2.4 GHz provides broader signal penetration across walls, while 5 GHz offers wider channels, higher throughput, and substantially less radio interference.",
    "options": [
      {
        "key": "A",
        "text": "2.4 GHz provides better wall penetration; 5 GHz provides higher bandwidth with less interference",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "To double electrical power usage",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "Because 2.4 GHz cannot transmit data packets",
        "isCorrect": false
      },
      {
        "key": "D",
        "text": "To convert analog FM radio to Wi-Fi",
        "isCorrect": false
      }
    ]
  },
  {
    "weekNumber": 5,
    "domain": "Network Track Syllabus Distribution",
    "topic": "Official ICT Competition Weights",
    "questionType": "SINGLE_CHOICE",
    "questionText": "In the official Huawei ICT Competition Network Track preliminary round, what is the official syllabus percentage weighting across Datacom, DCN, Security, and WLAN?",
    "explanation": "According to the official 2026\u20132027 Huawei ICT Competition syllabus, Network Track weighting is strictly: 40% Datacom, 20% DCN, 20% Security, and 20% WLAN.",
    "options": [
      {
        "key": "A",
        "text": "40% Datacom, 20% DCN, 20% Security, and 20% WLAN",
        "isCorrect": true
      },
      {
        "key": "B",
        "text": "25% Datacom, 25% DCN, 25% Security, and 25% WLAN",
        "isCorrect": false
      },
      {
        "key": "C",
        "text": "70% Datacom and 30% Security with zero WLAN",
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
