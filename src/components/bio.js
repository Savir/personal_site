import React from "react";

export const words = [
    "Geek", "Traveler", "Backend", "Full-stack", "Pythonist", "Data wrangler", "Cloud architect",
    "Builder", "Scalability", "Tinkerer", "Automator", "Big data", "SSH tunneler", "Mentor",
    "Human Clippo", "Workhorse", "Kafka folk", "Postgres curious", "Problem solver",
    "Systems thinker", "API craftsman", "Dog with a bone", "Distributed thinker", "Geospatial querist",
    "AI/ML assistant", "Globetrotter"];

const internshipStart = new Date(2009, 1, 15); // Feb 15, 2009
const secondsInYear = 60 * 60 * 24 * 365.25;
const now = Date.now();
const diffInSeconds = (now - internshipStart.getTime()) / 1000;
const dynamicYears = Math.floor(diffInSeconds / secondsInYear);

export const bioParagraphs = [
    <>
        I was once asked by a coworker, <em>"What made you work with computers?"</em> And the answer is very clear:
        an Elven archer
        moving through the snow in <a
        href="https://en.wikipedia.org/wiki/Warcraft_II:_Tides_of_Darkness"
        target="_blank"
        rel="noopener noreferrer"
    >
        Warcraft II
    </a>
        . Seeing all the fun a computer could provide, and the capabilities a piece of burnt sand could have, I thought
        to myself, <em>"This is amazing! I have to learn more about this!!"</em>
    </>,

    <>
        I studied computer science in Spain, my birthplace, where I was immensely lucky to be surrounded by
        professors and classmates I could learn a lot from.
    </>,

    <>
        From my Programming professor, who was truly into design patterns, to the Networking professor I got into a very
        public argument with over IP address classes A, B, and C (and who later ended up directing my thesis), to the
        Digital Electronics professor I once explained why planes can fly, demonstrating the Bernoulli
        principle by blowing over a piece of paper after one too many beers.
    </>,

    <>
        Same with my classmates. For instance, my first encounter with Linux happened because of one of them. He had a
        (back then bulky) laptop with a really sleek desktop. I asked, <em>"Hey! What's that?"</em> He said, <em>"Linux,
        yo! Linux!! 'Tis awesome, 'tis great, 'tis amazing!!'</em>"
    </>,

    <>
        He explained that I had to go to <a
        href="https://wiki.debian.org/DebianWoody"
        target="_blank"
        rel="noopener noreferrer"
    >
        debian.org
    </a>, download some CD <code>.iso</code> files, and install it.
        So I did. I went through the installation process, formatted the drive, created a username and password,
        and then my computer asked, <code><em>"Reboot now?"</em></code> I rebooted. Then, a black screen with a
        blinking cursor appeared. I thought, <em>"What the heck?? Where are the fancy icons? Where's the cool
        background?"</em>
    </>,

    <>
        I remembered the username and password from the installation process, entered them, and saw <code><em>"Welcome
        to your Debian 3.0."</em></code>. Just that. No fancy icons. No cool background. The next day, I went back to
        my classmate, complaining. He explained how
        X-Windows worked, how it was a separate set of utilities in a Linux distribution, and how you could have
        different ones.
    </>,

    <>
        I asked, <em>"Ok... so which one is yours?"</em> He replied, <em>"Fluxbox, yo! Fluxbox!! 'Tis awesome,
        'tis great, 'tis amazing!!'</em>"
    </>,

    <>
        I proceeded to run <code>apt-get install fluxbox</code>. A lot was downloaded (over a single-channel ISDN
        connection, 64 kbps). I typed <code>startx</code>. Now a gray screen with an "X" popped up. Again,
        I thought, <em>"What the heck??"</em> I started hitting random keys, moving my mouse... until I clicked the
        right mouse button. A menu appeared. That was when I got it. I had just installed the basic scaffolding to
        run window-based apps.
    </>,

    <>
        It was a long process to get my desktop exactly how I wanted it, and I loved it. That's still me. My fondest
        memories involve strolling through the office asking, <em>"Heeeeey... What cool feature did you
        find in SQLAlchemy?"</em> or explaining why an <code>os.fork()</code> would cause those pesky
        <code>"Database connection closed"</code> errors.
    </>,

    <>
        I enjoy software. I enjoy everything a computer can do, and I love learning new things and sharing what
        I know with people who are interested in learning more. And probably with a few people who weren't interested
        but were too polite to tell me to shut up.
    </>,

    <>
        I arrived in the U.S. for what was supposed to be a five-month paid internship. That was {dynamicYears} years
        ago.
        During one of my first interviews, a company told me, <em>"All our backend is programmed in Python"</em>.
        I admitted, <em>"I learned with Java. I don't know Python"</em>. <em>"You're hired!!"</em>, they replied. So
        I started learning Python, and I liked it a lot.
    </>,

    <>
        Since then, I've been fortunate to work in fast-paced startups where any day could be different, allowing me to
        learn a lot and wear multiple hats. From working on web applications (where I spent most of my time), to
        figuring out AWS security groups and how to open a port because the platform team was too busy, to assembling
        tables. No, not SQL tables: Ikea furniture, because our new desks had just been delivered.
    </>,
    <>
        I also learned how different a problem can be when you're dealing with a file that has 10 rows versus 10
        million. I learned how changing your site's language can completely break those pixel-perfect alignments you
        had. I learned what a trigraph is, how complex geospatial "stuff" can get, that there are two days every
        year that aren't 24 hours long andt that "today" in the US can already be "tomorrow" in UTC.
    </>,
    <>
        And thankfully, I'm still not done learning.
    </>
];