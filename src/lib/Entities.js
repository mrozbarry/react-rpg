import uuid from "uuid"

export const entityCreate = (id, type) => {
  return {
    id: id || uuid.v4(),
    type: type
  }
}

export const entityCreateCharacter = (id) => {
  return Object.assign(
    {},
    entityCreate(id, "character"),
    {
      inventory: [],
      attributes: {
      },
      traits: {
        maxHealth: 100,
        maxEnergy: 100,
        reflexes: 1
      }
    }
  )
}
