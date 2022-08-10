export function toPascalCase(word: string) {
  let roles = word.split(" ");
  let fixedRoles: string[] = [];
  
  for (let role of roles) {
    if (role) {
      const firstChar = role.slice(0, 1);
      const lastChars = role.slice(1);
      role = firstChar.toUpperCase() + lastChars.toLowerCase();
      fixedRoles.push(role);
    }
  }

  const result = fixedRoles.join(" ").trim();
  return result;
}

