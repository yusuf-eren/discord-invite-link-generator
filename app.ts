import fetch from 'node-fetch';
import fs from 'fs';

interface InviteLink {
  path: string;
  maxUsage: number;
  numberOfLinks: number;
  expiresInDays: number;
}

interface InviteConstructor {
  discordToken: string;
  channelID: string;
}

export class DiscordInvite {
  constructor(private AuthOptions: InviteConstructor) {}

  async createInviteLink({
    numberOfLinks,
    maxUsage,
    expiresInDays,
    path,
  }: InviteLink) {
    const { discordToken, channelID } = this.AuthOptions;
    try {
      const unique = numberOfLinks > 1 ? true : false;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${discordToken}`,
        },
        body: JSON.stringify({
          max_uses: maxUsage,
          unique,
          max_age: expiresInDays * 86400,
        }),
      };

      let x = 1;

      const fetchDataWithoutBlock = setInterval(async () => {
        checkLimit(x);
        const inviteCode = await fetch(
          `https://discordapp.com/api/channels/${channelID}/invites`,
          requestOptions
        )
          .then((data: any) => data.json())
          .then((data: any) => data.code);
        fs.appendFile(
          `${__dirname}/${path}`,
          `https://discord.gg/${inviteCode}\n`,
          (err: any) => {
            if (err) throw new Error(err);
          }
        );

        x++;
      }, 5000);

      function checkLimit(createdCount: Number) {
        if (createdCount === numberOfLinks)
          clearInterval(fetchDataWithoutBlock);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
