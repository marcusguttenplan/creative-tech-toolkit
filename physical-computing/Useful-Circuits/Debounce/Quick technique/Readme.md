Title:

**Button Debouncing**

(quick version)

**Use Case:**

switches or other mechanical inputs often can have a lot of &#39;noise&#39;. electrical mis-signaling that can cause a lot of problems with misreadings.

![](https://i1.wp.com/embedds.com/wp-content/uploads/2013/08/button\_bounce.jpeg?ssl=1)



**What this circuit does:**

An easy way to debounce switches in hardware is to use an RC (resistor/capacitor) filter.  Traditionally, RC filters are used as low and high pass filters in audio and radio projects.

By bumping up the size of the resistor and capacitor (a lot), we can make the capacitor discharge slow enough(about 1.6 HZ) for the circuit to filter any noise coming from the button or switch.

[http://www.muzique.com/schem/filter.htm](http://www.muzique.com/schem/filter.htm)



**Key Parts:**

Resistor (10k)

Capacitor (10 Ohm)
