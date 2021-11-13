import {
  GridItem,
  HStack,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useColorMode
} from "@chakra-ui/react"
import AddCard from "components/common/AddCard"
import Layout from "components/common/Layout"
import CategorySection from "components/index/CategorySection"
import GuildCard from "components/index/GuildCard"
import HallsGuildsNav from "components/index/HallsGuildsNav"
import useFilteredData from "components/index/hooks/useFilteredData"
import useUsersHallsGuilds from "components/index/hooks/useUsersHallsGuilds"
import OrderSelect from "components/index/OrderSelect"
import SearchBar from "components/index/SearchBar"
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { Guild } from "temporaryData/types"
import fetchApi from "utils/fetchApi"

type Props = {
  guilds: Guild[]
}

const Page = ({ guilds: guildsInitial }: Props): JSX.Element => {
  const { data: guilds } = useSWR<Array<Guild>>("/guild", {
    fallbackData: guildsInitial,
  })
  const [searchInput, setSearchInput] = useState("")
  const [orderedGuilds, setOrderedGuilds] = useState(guilds)

  const { usersGuildsIds } = useUsersHallsGuilds()
  const [usersGuilds, filteredGuilds, filteredUsersGuilds] = useFilteredData(
    orderedGuilds,
    usersGuildsIds,
    searchInput
  )
  const [barrelRoll, setBarrelRoll] = useState(false);
  const [runAway, setRunAway] = useState(false);

  // Setting up the dark mode, because this is a "static" page
  const { setColorMode } = useColorMode()

  useEffect(() => {
    setColorMode("dark")
  }, [])
  useEffect(() => {
    if (searchInput === "barrelroll") {
      setBarrelRoll(true);
    }
    else if (searchInput === "runaway") {
      setRunAway(true);
    }
    else {
      setBarrelRoll(false);
      setRunAway(false);
    }
  },[searchInput])
  const listener = (event) => {
    console.log(barrelRoll);
      setBarrelRoll((barrelRoll)=>!barrelRoll);
    }

  return (
    <Layout
      title="Guild"
      description="A place for Web3 guilds"
      imageUrl="/guildLogos/logo.svg"
      imageBg="transparent"
    >
                        <div className={`${runAway ? "run" : ""}`}>

      <SimpleGrid
        templateColumns={{ base: "auto 50px", md: "1fr 1fr 1fr" }}
        gap={{ base: 2, md: "6" }}
        mb={16}
      >

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <SearchBar placeholder="Search guilds" setSearchInput={setSearchInput} />
        </GridItem>
        <OrderSelect data={guilds} setOrderedData={setOrderedGuilds} />

      </SimpleGrid>
                  </div>

      <HallsGuildsNav />

      <Stack spacing={12}>
        <CategorySection
          title={
            usersGuilds.length ? "Your guilds" : "You're not part of any guilds yet"
          }
          fallbackText={`No results for ${searchInput}`}
        >
          {usersGuilds.length ? (
            filteredUsersGuilds.length &&
            filteredUsersGuilds
              .map((guild) => <div className={`${barrelRoll?"barrel":""}`}><GuildCard key={guild.id} guildData={guild} /></div>)
              .concat(
                <AddCard
                  key="create-guild"
                  text="Create guild"
                  link="/create-guild"
                />
              )
          ) : (
            <AddCard text="Create guild" link="/create-guild" />
          )}
        </CategorySection>
        <CategorySection
          title={
            <HStack spacing={2} alignItems="center">
              <Text as="span">All guilds</Text>
              <Tag size="sm">{filteredGuilds.length}</Tag>
            </HStack>
          }
          fallbackText={
            orderedGuilds.length
              ? `No results for ${searchInput}`
              : "Can't fetch guilds from the backend right now. Check back later!"
          }
        >
          {filteredGuilds.length &&
            filteredGuilds.map((guild) => (
              <div className={`${barrelRoll?"barrel":""}`}><GuildCard key={guild.id} guildData={guild} /></div>
            ))}
        </CategorySection>
      </Stack>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const guilds = await fetchApi("/guild")

  return {
    props: { guilds },
    revalidate: 10,
  }
}

export default Page
