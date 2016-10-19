import { entityCreateCharacter } from "lib/Entities"


export const entityAddPlayer = (entities, action) => {
  const character = Object.assign(
    {},
    entityCreateCharacter(action.id, action.position), { isPlayer: true }
  )

  return entities
           .filter((entity) => !(entity.type == "character" && entity.isPlayer))
           .concat(character)
}


export default (entities, action) => {
  switch (action.type) {
  case "entityAddPlayer":
    return entityAddPlayer(entities, action)
  default:
    return entities
  }
}
