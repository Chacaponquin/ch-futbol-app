export const dataMap = (from) => {
  const deleteProperty = (field, obj) => {
    const id = from[field];

    return { id, ...obj };
  };

  switch (from.__typename) {
    case "Player": {
      const { playerID, ...rest } = from;
      return deleteProperty("playerID", rest);
    }
    case "User": {
      const { userID, ...rest } = from;
      return deleteProperty("userID", rest);
    }
    case "Team": {
      const { teamID, ...rest } = from;
      return deleteProperty("teamID", rest);
    }
    case "Trainer": {
      const { teamID, ...rest } = from;
      return deleteProperty("trainerID", rest);
    }
    default:
      return from;
  }
};
