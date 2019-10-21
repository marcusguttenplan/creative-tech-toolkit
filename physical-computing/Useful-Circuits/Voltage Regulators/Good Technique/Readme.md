Title:
Linear Voltage Regulators


**Use Case and Warnings:**

Use these when the input voltage is higher than the required voltage.

Linear regulators are cheap, simple, and responsive. their only disadvantage is that they are inefficient. This can cause them to get
 hot, so adequate heatsinking is a good idea in any high-load applications.

 Some linear voltage regulators have a set output voltage, others have a variable output voltage that can be controlled via a variable resistor.
 
 ![](https://www.elprocus.com/wp-content/uploads/2014/09/voltage-regulator1.jpg)

**What this circuit does:**
There's a bunch of great voltage regulator packages available to pick from. with a little bit of support circuitry, they'll work super reliably.

Often, these regulators require two decoupling capacitors between the input and output pins.
Recommended decoupling capacitors are on each chips datasheet, and best practice is to keep these as close to the regulator chip as possible to reduce noise.
Additional electrolytic capacitors can be used in parallel to these for smoothing.


**Key Parts:**

LD1117V33 (+3.3V, 800mA)

L7805 (+5 Volt, 1.5A)

L7812 (+12 Volt, 1.5A)

LM317 (Variable Voltage from 1.2V to 37V, 1.5A)

TO-220 (Heatsink, 2.5W dissipation)
