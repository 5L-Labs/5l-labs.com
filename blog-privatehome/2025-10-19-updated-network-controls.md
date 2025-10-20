---
slug: garage-cam-on-the-cheap
title: Adventures in CheapML
authors: [njl]
tags: [homekit, homebridge, pihole, ubiquiti, network, kill-switch]
---

## For exactly zero-users,

I've spent some time firming up the Home Network Kill Switch project due to some breaking changes in Pi-hole v6 and Ubiquiti Control 9.4.19.

## What was hard about this?
 Testing, Testing, Testing. Time management - this took far longer than planned for the limited time I had.

* Not DOSing the Ubiquiti Controller while trying to validate code paths
* Ensuring Pi-hole v6 API calls were working as expected
* Adding in edge-case / race-condition checks
* Making it proper, releasable that someone else might use it

## Did AI Help?
  No, not really. It did do some scaffolding and documentation, but the core logic was still human led.
  I do plan to use [Jules](https://jules.google.com/session) to keep ripping out dead code paths.

## Recent Changes

*   **Pi-hole v6 API Integration:** The project now uses the new `pihole6api` library to interact with the Pi-hole v6 API. This allows for more reliable and efficient management of blocklists.
*   **Ubiquiti Control 9.4.19 Support:** The project has been updated to support the latest version of Ubiquiti Control.
