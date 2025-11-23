---
slug: getting-off-of-wyze
title: Wyzely saying goodbye to Wyze!
authors: [njl]
tags: [homekit, wyze, scripted]
---

Getting more private from Wyze:
 * Battery Cam Protocol
 * Non-Recent Cameras


```mermaid
---
config:
  layout: dagre
---
flowchart TD
 subgraph IP_Cameras["IP Cameras"]
        IP_Camera1["IP Camera 1"]
        IP_Camera2["IP Camera 2"]
        IP_Camera3["IP Camera 3"]
        IP_Camera4["IP Camera 4"]
        IP_Camera5["IP Camera 5"]
  end
 subgraph s1["Apple Ecosystem"]
        n1["Apple Home Kit"]
  end
    IP_Camera1 -- TCP --> Hub["Hub Service"]
    IP_Camera2 -- TCP --> Hub
    IP_Camera3 -- TCP --> Hub
    IP_Camera4 -- TCP --> Hub
    IP_Camera5 -- TCP --> Hub
    n4["Web / Phone Client"] -- NAT? --> IP_Camera1
    n4["Web / Phone Client"] -- TCP --> Hub
    n1 --> IP_Camera1
    Hub --> n1
    n1@{ shape: disk}
    n4@{ icon: "azure:process-explorer", pos: "t"}
    L_n4_IP_Camera1_0@{ animation: fast }

```

### Outstanding Details

- Outstanding documentation Items
- Add more details about the network architecture
- Include diagrams and screenshots of the setup
