export function validateHex(inputHex: string) {
  const hexaPattern = /^[0-9a-fA-F]+$/;
  return inputHex.match(hexaPattern);
}
