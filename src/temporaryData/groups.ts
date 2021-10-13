import guilds from "./guilds"
import { Group } from "./types"

const groups: Array<Group> = [
  {
    id: 1,
    name: "My first group",
    urlName: "my-first-group",
    guilds: guilds.filter((guild) => guild.id === 2),
    members: [],
    owner: {
      id: 1,
      addresses: [""],
    },
  },
  {
    id: 2,
    name: "Guildhall's group",
    urlName: "guildhalls-group",
    guilds: guilds,
    members: ["0x2893b7e6E8a5aF81d262024a550a3159b1F65217"],
    owner: {
      id: 2,
      addresses: [""],
    },
  },
]

export default groups
