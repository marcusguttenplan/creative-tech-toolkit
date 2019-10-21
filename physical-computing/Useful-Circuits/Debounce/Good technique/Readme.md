Title:

**Button Debouncing**



**Use Case:**

Switches of other mechanical inputs often can have a lot of &#39;noise&#39;. Electrical mis-signaling that can cause a lot of problems with misreadings.

![](https://i1.wp.com/embedds.com/wp-content/uploads/2013/08/button\_bounce.jpeg?ssl=1)



**What this circuit does:**

We can Debounce digital inputs, like buttons, in a lot of different ways. The most comprehensive of which is with a **schmitt trigger** :

      a Schmitt trigger is a logic input type that provides hysteresis or two different threshold voltage levels for rising and falling edge.  [https://en.wikipedia.org/wiki/Schmitt\_trigger](https://en.wikipedia.org/wiki/Schmitt_trigger)

![](https://howtomechatronics.com/wp-content/uploads/2015/08/Schmitt-Trigger-Symbol-300x127.png)

Basically, a schmitt trigger introduces an upper and lower threshold for reading a signal, instead of a single threshold. If the signal falls between the upper and lower limit, then the output signal remains the same(hysteresis). This acts like a buffer zone that cleans up even the dirtiest signal.

![](https://howtomechatronics.com/wp-content/uploads/2015/08/Input-Signals.png)



There are lots of ways to make schmitt triggers. The two most common are using an Operational amplifier, transistors, or a prebuilt schmitt trigger IC(recommended) like the _SN74HC14N_ six-channel package (which can handle up to six buttons)



**Key Parts:**

SN74HC14N
