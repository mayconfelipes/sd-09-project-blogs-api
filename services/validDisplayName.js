function validDisplayName(name) {
  if (name.length < 8) return '"displayName" length must be at least 8 characters long';
  return true;
}

module.exports = validDisplayName;
