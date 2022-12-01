import fetch from 'node-fetch';
import fs from 'fs';

export class DiscordInvite {
  constructor(private discordToken: string, private channelID: string) {}

  async createInviteLink(
    path: string,
    maxUses: number,
    linkCount: number,
    expiresInDay: number
  ) {
    try {
      const unique = linkCount > 1 ? true : false;
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${this.discordToken}`,
        },
        body: JSON.stringify({
          max_uses: maxUses,
          unique,
          max_age: expiresInDay * 86400,
        }),
      };

      let x = 1;

      const fetchDataWithoutBlock = setInterval(async () => {
        checkLimit(x);
        const inviteCode = await fetch(
          `https://discordapp.com/api/channels/${this.channelID}/invites`,
          requestOptions
        )
          .then((data: any) => data.json())
          .then((data: any) => data.code);
        fs.appendFile(
          `${__dirname}/${path}.txt`,
          `https://discord.gg/${inviteCode}\n`,
          (err: any) => {
            if (err) throw new Error(err);
          }
        );

        x++;
      }, 5000);

      function checkLimit(createdCount: Number) {
        if (createdCount === linkCount) clearInterval(fetchDataWithoutBlock);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}