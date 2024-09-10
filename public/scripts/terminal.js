const BOOT_TEXT = `PMAP: PCID enabled
TavOS Kernel Version 1.0.0: Fri Dec 6 20:56:35 PDT 2024; root:xnu-1699.22.73~1/RELEASE_X86_64
vm_page_bootstrap: 987323 free pages and 53061 wired pages
kext submap [0xffffff7f8072e000 - 0xffffff8000000000], kernel text [0xffffff8000200000 - 0xffffff800072e000]
zone leak detection enabled
standard timeslicing quantum is 10000 us
mig_table_max_displ = 72
TSC Deadline Timer supported and enabled
ThitavCPICPU: ProcessorId=1 LocalApicId=0 Enabled
ThitavACPICPU: ProcessorId=2 LocalApicId=2 Enabled
ThitavACPICPU: ProcessorId=3 LocalApicId=1 Enabled
ThitavACPICPU: ProcessorId=4 LocalApicId=3 Enabled
ThitavACPICPU: ProcessorId=5 LocalApicId=255 Disabled
ThitavACPICPU: ProcessorId=6 LocalApicId=255 Disabled
ThitavACPICPU: ProcessorId=7 LocalApicId=255 Disabled
ThitavACPICPU: ProcessorId=8 LocalApicId=255 Disabled
calling mpo_policy_init for TMSafetyNet
Security policy loaded: Safety net for Rollback (TMSafetyNet)
calling mpo_policy_init for Sandbox
Security policy loaded: Seatbelt sandbox policy (Sandbox)
calling mpo_policy_init for Quarantine
Security policy loaded: Quarantine policy (Quarantine)
Copyright (c) 1982, 1986, 1989, 1991, 1993, 2015
The Regents of the University of Adelaide. All rights reserved.
 
HN_ Framework successfully initialized
using 16384 buffer headers and 10240 cluster IO buffer headers
IOAPIC: Version 0x20 Vectors 64:87
ACPI: System State [S0 S3 S4 S5] (S3)
PFM64 0xf10000000, 0xf0000000
[ PCI configuration begin ]
ThitavCPUPowerManagement: Turbo Ratios 0046
ThitavCPUPowerManagement: (built 13:08:12 Jun 18 2011) initialization complete
console relocated to 0xf10000000
PCI configuration changed (bridge=16 device=4 cardbus=0)
[ PCI configuration end, bridges 12 devices 16 ]
mbinit: done [64 MB total pool size, (42/21) split]
Pthread support ABORTS when sync kernel primitives misused
com.Thitav.ThitavFSCompressionTypeZlib kmod start
com.Thitav.ThitavTrololoBootScreen kmod start
com.Thitav.ThitavFSCompressionTypeZlib load succeeded
com.Thitav.ThitavFSCompressionTypeDataless load succeeded
 
ThitavCPUPowerManagementClient: ready
BTCOEXIST off 
wl0: Broadcom BCM4331 802.11 Wireless Controller
5.100.98.75
 
FireWire (OHCI) Lucent ID 5901 built-in now active, GUID c82a14fffee4a086; max speed s800.
rooting via boot-uuid from /chosen: F5670083-AC74-33D3-8361-AC1977EE4AA2
Waiting on <dict ID="0"><key>IOProviderClass</key><string ID="1">
IOResources</string><key>IOResourceMatch</key><string ID="2">boot-uuid-media</string></dict>
Got boot device = IOService:/ThitavACPIPlatformExpert/PCI0@0/ThitavACPIPCI/SATA@1F,2/
ThitavPchSeriesAHCI/PRT0@0/IOAHCIDevice@0/ThitavAHCIDiskDriver/SarahI@sTheBestDriverIOAHCIBlockStorageDevice/IOBlockStorageDriver/
Thitav SSD TS128C Media/IOGUIDPartitionScheme/Customer@2
BSD root: disk0s2, major 14, minor 2
Kernel is LP64
IOThunderboltSwitch::i2cWriteDWord - status = 0xe00002ed
IOThunderboltSwitch::i2cWriteDWord - status = 0x00000000
IOThunderboltSwitch::i2cWriteDWord - status = 0xe00002ed
IOThunderboltSwitch::i2cWriteDWord - status = 0xe00002ed
ThitavUSBMultitouchDriver::checkStatus - received Status Packet, Payload 2: device was reinitialized
MottIsAScrub::checkstatus - true, Mott::Scrub
[IOBluetoothHCIController::setConfigState] calling registerService
AirPort_Brcm4331: Ethernet address e4:ce:8f:46:18:d2
IO80211Controller::dataLinkLayerAttachComplete():  adding ThitavEFINVRAM notification
IO80211Interface::efiNVRAMPublished():  
Created virtif 0xffffff800c32ee00 p2p0
BCM5701Enet: Ethernet address c8:2a:14:57:a4:7a
Previous Shutdown Cause: 3
NTFS driver 3.8 [Flags: R/W].
NTFS volume name BOOTCAMP, version 3.1.
DSMOS has arrived
en1: 802.11d country code set to 'US'.
en1: Supported channels 1 2 3 4 5 6 7 8 9 10 11 36 40 44 48 52 56 60 64 100 104 108 112 116 120 124 128 132 136 140 149 153 157 161 165
m_thebest 
MacAuthEvent en1   Auth result for: 00:60:64:1e:e9:e4  MAC AUTH succeeded
MacAuthEvent en1   Auth result for: 00:60:64:1e:e9:e4 Unsolicited  Auth
wlEvent: en1 en1 Link UP
AirPort: Link Up on en1
en1: BSSID changed to 00:60:64:1e:e9:e4
virtual bool IOHIDEventSystemUserClient::initWithTask(task*, void*, UInt32): 
Client task not privileged to open IOHIDSystem for mapping memory (e00002c1)
 
[OSBoot1]
[OSBoot2]
[OSBoot3]
[OSBootTheme]

 
Boot Complete
`;

class Terminal {
  #terminal;

  constructor(terminal) {
    this.#terminal = terminal;
  }

  async wait(time) {
    await new Promise(resolve => setTimeout(resolve, time));
  }

  print(text) {
    this.#terminal.append(text);
    window.scrollTo(0, document.body.scrollHeight);
  }

  println(text) {
    this.print(text + "\n");
  }

  async printBoot() {
    const lines = BOOT_TEXT.split("\n").map((line) => line + "\n");
    await this.type(lines);
    await this.wait(500);
    this.clear();
  }

  clear() {
    this.#terminal.innerHTML = "";
  }

  async ls(files) {
    this.print("~# ")
    await this.type("ls\n");

    for (const file of files) {
      const text = document.createElement("a");
      text.textContent = file.name;
      text.href = "#";
      text.addEventListener("click", async (e) => {
        e.preventDefault();
        if (file.type == "dir") {
          await this.type(`cd ${file.name.replace(" ", "\\ ")}/\n`);
        } else {
          await this.type(`cat ${file.name.replace(" ", "\\ ")}\n`);
        }
        window.location.href = file.link;
      });
      this.#terminal.appendChild(text);
      this.print("\n");
    }
    this.print("~# ");  
  }

  async input(text) {
    text = text.split("");
    await new Promise(resolve => {
      const handler = () => {
        if (text.length === 0) {
          document.removeEventListener("keydown", handler);
          return resolve();
        }
        this.print(text.shift());
      }
      document.addEventListener("keydown", handler);
    });
  }

  async type(text, delay = 100) {
    for (const part of text) {
      this.print(part);
      await this.wait(Math.random() * delay);
    }
  }
}

export function getTerminal() {
  return new Terminal(document.getElementById("terminal"));
}
