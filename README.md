# Discord Invite Link Generator

## Why I built this code?
My client needed a link creator to create and send to clients one usage links. Because this discord link will be redirected to a premium channel.
So I built this code in 1 hour.
## Usage Scenarios
If you have a community and you have premium discord channel sale on your website you can automate the link generator.
Just use events that reports Order Completed like 'payment', 'success_payment' or anything else. You can trigger this with your email sender.
## Setup & Installation
install package
```
npm install @yusuferen/discord-invite-link-generator
```
create an instance of the class
```
import { DiscordInvite } from '@yusuferen/discord-invite-link-generator'
const inviteGenerator = new DiscordInvite("<YOUR-DISCORD-TOKEN>", "YOUR-CHANNEL-ID");
```
### We have 4 different params here,
1. Path and name of the files will be written,
2. Max usage of the link,
3. Count of the links will be created,
4. Expire date of the links in Days,
```
inviteGenerator.createInviteLink("./inviteLinks.txt", 1, 5, 1);
```
### Questions
1. Q: Why it is working slowly? A: Because discord is using a "Sliding Window" rate limiting algorithm. So, I wrote a code that bypasses this limit and it takes a while.
2. Q: Can I automate this with my mailing server? A: Yes, it is possible. If you are using third party mail sender it will be easier. As an example; integrate it with senderblue API. So you can send the links in successful order emails.

### Contact: erenyusuf170@gmail.com
### Repo: https://github.com/yusuf-eren/discord-invite-link-generator
# Final words
If you liked the application please give it a star :)
