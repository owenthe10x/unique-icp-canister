import { Canister, text, query } from 'azle'


function encrypt(word: string, amount: number): string {
  let result = '';
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const offset = isUpperCase ? 65 : 97;
      const encryptedChar = String.fromCharCode((char.charCodeAt(0) - offset + amount) % 26 + offset);
      result += isUpperCase ? encryptedChar : encryptedChar.toLowerCase();
    } else {
      result += char;
    }
  }
  return result;
}

export default Canister({
  Encrypt : query([text, text], text, (text, amt) => {
    const amountOfShift = parseInt(amt);
    if (isNaN(amountOfShift)) {
      throw new Error('Shift parameter must be a valid integer');
    }
    return encrypt(text, amountOfShift);
  }),
});