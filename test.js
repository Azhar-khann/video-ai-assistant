import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transcript = `now this is a binomial okay it's a , 0:00 - 0:02
binomial because biotin is two and a , 0:02 - 0:05
nominal means it's in this context that , 0:05 - 0:06
means terms okay so this topic is also , 0:06 - 0:08
sometimes called binomial expansions , 0:08 - 0:14
now what they do is they take binomials , 0:14 - 0:16
like this and we raise them to different , 0:16 - 0:18
powers and we expand them and we see , 0:18 - 0:19
what happens okay now if you're like me , 0:19 - 0:21
you're kind of like what does this have , 0:21 - 0:22
to do with anything this is like the , 0:22 - 0:24
worst segue in all history okay so stay , 0:24 - 0:26
with me this is a pretty simple one , 0:26 - 0:28
right to the power of one nothing , 0:28 - 0:30
happens okay , 0:30 - 0:32
but when you raise the powers things , 0:32 - 0:34
start to get a bit interesting , 0:34 - 0:36
okay for starters here i know you know , 0:36 - 0:38
what this expansion is but i'm gonna , 0:38 - 0:40
write it like this for a second i'm , 0:40 - 0:42
gonna do it in full long hand okay cause , 0:42 - 0:44
i'm gonna try and make the connection , 0:44 - 0:45
between algebra , 0:45 - 0:47
and arrangements okay , 0:47 - 0:49
now if i actually take each term , 0:49 - 0:51
and i think about order right so i'm , 0:51 - 0:54
gonna go a times a , 0:54 - 0:57
then a times b , 0:57 - 1:00
then b times a , 1:00 - 1:02
then b times b , 1:02 - 1:05
okay now i have four combinations here , 1:05 - 1:08
okay four different ways of doing this , 1:08 - 1:10
that four comes from it's , 1:10 - 1:12
2 to the power of 2. see why that's , 1:12 - 1:15
important in a second okay , 1:15 - 1:16
all right now when you put that together , 1:16 - 1:18
you get this result , 1:18 - 1:20
which is quite familiar okay , 1:20 - 1:24
but get this two it's really important , 1:24 - 1:27
okay we'll come back into it into a , 1:27 - 1:29
second , 1:29 - 1:30
let's do the next one up , 1:30 - 1:33
okay again i'm gonna expand it out long , 1:33 - 1:35
ways okay so i'm gonna get a plus b , 1:35 - 1:38
times uh this guy right which is , 1:38 - 1:40
actually this , 1:40 - 1:45
okay , 1:45 - 1:46
you're wondering why i'm making you do , 1:46 - 1:47
all this extra writing just stay with us , 1:47 - 1:49
okay , 1:49 - 1:50
let's write all out this time i'm going , 1:50 - 1:52
to get a a a , 1:52 - 1:54
a a b , 1:54 - 1:56
a b a , 1:56 - 1:59
okay and again but with the b out the , 1:59 - 2:02
front , 2:02 - 2:08
okay now how many terms are there here , 2:08 - 2:13
there are eight terms , 2:13 - 2:15
namely two cubed can you see why it's , 2:15 - 2:18
too cute , 2:18 - 2:20
think about it as an arrangement , 2:20 - 2:21
question can you see why this is two , 2:21 - 2:23
cubed , 2:23 - 2:25
because i'm i'm now trying to think of , 2:25 - 2:28
three different things i'm trying to , 2:28 - 2:29
fill three boxes every term that i get , 2:29 - 2:32
out here has three terms right uh three , 2:32 - 2:35
bits and then each time i've got two , 2:35 - 2:38
options for how to fill them right , 2:38 - 2:41
that's two cubes right that's why there , 2:41 - 2:42
are eight here okay , 2:42 - 2:44
all right let's combine it all together , 2:44 - 2:46
so i get a cubed , 2:46 - 2:49
now the way we write this in algebra by , 2:49 - 2:51
collecting like terms we don't really , 2:51 - 2:53
care about order , 2:53 - 2:55
notice that okay so we're actually , 2:55 - 2:56
turning it into an , 2:56 - 2:58
npr to an ncr okay watch that , 2:58 - 3:02`

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You will help understand and clarify any content from video transcript." },
        {role: "user", content: transcript},
        {role: "user", content: "Could not understand why the terms were 2^3"}
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();