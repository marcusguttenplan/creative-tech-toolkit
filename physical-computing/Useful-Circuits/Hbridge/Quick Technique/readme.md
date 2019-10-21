Title:

**Hbridge (Half-Bridge)**

**Quick Version**

**Use Case:**

If the load isn&#39;t inductive (like a Bi-directional led), or if the supply current is low enough where inductance spikes won&#39;t pass your transistors&#39; maximum collector current. (for example small vibration motors, dc motors that wont have a lot of applied torque)

Probably not a great idea to do PWM with this setup either.



**What this circuit does:**

This is a super minimal version of a transistor Hbridge. Removed flyback diodes and reduced number of resistors (would probably work without the resistors too). Works fine for prototyping.

**Key Parts:**

Four transistors
