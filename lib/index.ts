import { forceCasing } from './utils/forceCasing';

type Encoding = Record<string, string>;

export class Codx {
  constructor(
    private readonly encoding: Encoding,
    private readonly casing: 'lower' | 'upper' | 'mixed'
  ) {}

  public encode(msg: string) {
    if (!msg.length) throw new Error('Message for encoding cannot be empty.');

    const casedMsg =
      this.casing === 'mixed' ? msg : forceCasing(this.casing, msg);
    let result: string[] = [];

    for (let i = 0; i < msg.length; i++) {
      if (!(casedMsg[i] in this.encoding)) {
        throw new Error(
          `Encoding error: Encoding has no match for ${casedMsg[i]}.`
        );
      }

      result.push(`${this.encoding[casedMsg[i]]}`);
    }

    return result;
  }

  public decode(arr: string[]) {
    if (!arr.length) throw new Error('Array for decoding cannot be empty.');

    let result = '';

    for (let i = 0; i < arr.length; i++) {
      if (!Object.values(this.encoding).includes(arr[i])) {
        throw new Error(`Decoding error: Encoding has no match for ${arr[i]}`);
      }

      result += Object.keys(this.encoding).find(
        (k) => this.encoding[k] === arr[i]
      );
    }

    return result;
  }
}
