Title:

**Hbridge (Half-Bridge)**

**Use Case:**

These circuits are often used to allow DC motors to run forward or backward, with a saperated power source.

Also useful for any application where changing the direction of current is helpful (Solenoids, bi-color Leds, etc.)



**What this circuit does:**

Switches the polarity of a voltage applied to a load using four &#39;switches&#39;. This is especially useful because it keeps the control current separate from the supply current. great for controlling things with GPIO!

![](https://2.bp.blogspot.com/-rukfP-mRul4/V1RA\_oIcaBI/AAAAAAAADkk/corNcSAUHxQtIThqKSMcfvHygg1jJ57dgCKgB/s1600/hbridge.png)

An Hbridge is more of a concept than a specific circuit, any number of things can be used as switches (Mosfets, transistors, Relays, DPDT toggle switches, etc.)



In most applications, transistors are used as the switches in these circuits.

There are several off the shelf Hbridge ICs; in single, double, or even quadruple packages to control multiple outputs. the most common are:  L293D (dual hbridge), SN754410N (quad Hbridge)



**Key Parts:**

Four Switches (Power transistors or Relays)

Flyback Diodes (If powering inductor like a motor or solenoid)
