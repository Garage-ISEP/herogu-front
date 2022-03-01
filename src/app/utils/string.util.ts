export function makeid(length: number): string {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export function parseEnvFile(env: string): [string, string][] {
  const lines = env.split(/\r?\n/);
  const res: [string, string][] = [];
  for (const line of lines) {
    const match = line.match(/^([^=#]+)=(.*)$/);
    if (match) {
      res.push([match[1], match[2]]);
    }
  }
  return res;
}